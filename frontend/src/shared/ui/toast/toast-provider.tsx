import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react';
import { ToastContext } from './toast-context';
import { ToastItem } from './toast-item';
import { DEFAULT_TOAST_DURATION, type Toast, type ToastInput } from './types';

export interface ToastProviderProps {
  headless?: boolean;

  latestOnly?: boolean;
  children: ReactNode;

  regionLabel: string;

  dismissLabel: string;
}

export const ToastProvider = ({
  children,
  regionLabel,
  dismissLabel,
  headless = false,
  latestOnly = false,
}: ToastProviderProps) => {
  const [toasts, setToasts] = useState<readonly Toast[]>([]);
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());
  const nextId = useRef(0);
  const messages = useRef(new Map<string, string>());

  const dismiss = useCallback((id: string): void => {
    const timer = timers.current.get(id);
    if (timer !== undefined) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
    setToasts((current) => current.filter((toast) => toast.id !== id));
    for (const [message, messageId] of messages.current) {
      if (messageId === id) messages.current.delete(message);
    }
  }, []);

  const show = useCallback(
    ({ message, tone = 'info', duration = DEFAULT_TOAST_DURATION }: ToastInput): string => {
      if (latestOnly) {
        timers.current.forEach(clearTimeout);
        timers.current.clear();
        messages.current.clear();
      }
      const lifetime = latestOnly && duration <= 0 ? DEFAULT_TOAST_DURATION : duration;
      const messageKey = JSON.stringify([tone, message]);
      const existingId = messages.current.get(messageKey);
      const id = existingId ?? `toast-${String(++nextId.current)}`;
      messages.current.set(messageKey, id);
      const previousTimer = timers.current.get(id);
      if (previousTimer !== undefined) clearTimeout(previousTimer);
      setToasts((current) => [
        ...(latestOnly ? [] : current.filter((toast) => toast.id !== id)),
        { id, message, tone, duration: lifetime },
      ]);

      if (lifetime > 0) {
        timers.current.set(
          id,
          setTimeout(() => {
            dismiss(id);
          }, lifetime),
        );
      }
      return id;
    },
    [dismiss, latestOnly],
  );

  const value = useMemo(() => ({ toasts, show, dismiss }), [toasts, show, dismiss]);

  return (
    <ToastContext value={value}>
      {children}
      {!headless && (
        <div
          role="region"
          aria-label={regionLabel}
          tabIndex={-1}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              toasts.forEach((toast) => {
                dismiss(toast.id);
              });
            }
          }}
          className="toast-viewport pointer-events-none fixed bottom-6 right-6 z-50 flex w-full max-w-sm flex-col gap-3"
        >
          {toasts.map((toast) => (
            <ToastItem
              key={toast.id}
              toast={toast}
              onDismiss={dismiss}
              dismissLabel={dismissLabel}
            />
          ))}
        </div>
      )}
    </ToastContext>
  );
};
