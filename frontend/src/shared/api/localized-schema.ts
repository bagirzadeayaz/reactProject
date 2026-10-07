import { z } from 'zod';
import type { LocalizedString } from './localized';

export const localizedString = z.object({
  en: z.string().min(1),
  ru: z.string().min(1),
});

export const _localizedShape = (value: z.infer<typeof localizedString>): LocalizedString => value;
export const _localizedType = (value: LocalizedString): z.infer<typeof localizedString> => value;
