export type ToastTone = 'info' | 'success' | 'error';

export interface Toast {
  id: string;

  message: string;
  tone: ToastTone;

  duration: number;
}

export type ToastInput = Omit<Toast, 'id' | 'tone' | 'duration'> &
  Partial<Pick<Toast, 'tone' | 'duration'>>;

export interface ToastContextValue {
  toasts: readonly Toast[];

  show: (toast: ToastInput) => string;
  dismiss: (id: string) => void;
}

export const DEFAULT_TOAST_DURATION = 5000;
