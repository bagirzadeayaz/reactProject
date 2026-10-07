import { z } from 'zod';
import { localizedString } from '../../../shared/api/localized-schema';

export const reviewSchema = z.object({
  id: z.string().min(1),
  author: z.string().min(1),
  avatarUrl: z.string().min(1),

  rating: z.number().int().min(1).max(5),
  text: localizedString,

  productId: z.string().min(1).optional(),
});

export type Review = z.infer<typeof reviewSchema>;
