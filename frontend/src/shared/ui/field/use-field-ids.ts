import { useId } from 'react';

export interface FieldIds {
  inputId: string;
  descriptionId: string | undefined;
  errorId: string | undefined;

  describedBy: string | undefined;
  hasError: boolean;
}

export const useFieldIds = (
  hasDescription: boolean,
  error: string | undefined,
  providedId: string | undefined,
): FieldIds => {
  const generatedId = useId();
  const inputId = providedId ?? generatedId;
  const descriptionId = hasDescription ? `${inputId}-description` : undefined;
  const errorId = error !== undefined && error !== '' ? `${inputId}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;

  return {
    inputId,
    descriptionId,
    errorId,
    describedBy,
    hasError: errorId !== undefined,
  };
};
