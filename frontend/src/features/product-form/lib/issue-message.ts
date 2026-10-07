import type { z } from 'zod';

export type ValidationTranslate = (
  key:
    | 'required'
    | 'tooShort'
    | 'tooLong'
    | 'notANumber'
    | 'negative'
    | 'notWhole'
    | 'invalidUrl'
    | 'duplicateOption'
    | 'invalid',
  values?: Record<string, number>,
) => string;

export const issueMessage = (issue: z.core.$ZodRawIssue, t: ValidationTranslate): string => {
  switch (issue.code) {
    case 'custom':
      return t('duplicateOption');
    case 'too_small': {
      if (issue.origin === 'number') return t('negative');
      const min = Number(issue.minimum);
      return min <= 1 ? t('required') : t('tooShort', { min });
    }
    case 'too_big':
      return t('tooLong', { max: Number(issue.maximum) });
    case 'invalid_type':
      if (issue.expected === 'int') return t('notWhole');
      if (issue.expected === 'number') return t('notANumber');
      return t('required');
    case 'invalid_format':
      return issue.format === 'url' ? t('invalidUrl') : t('invalid');
    default:
      return t('invalid');
  }
};
