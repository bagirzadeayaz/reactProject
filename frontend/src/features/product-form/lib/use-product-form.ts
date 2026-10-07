import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { productDraftSchema } from '../../../entities/product/model/schema';
import { EMPTY_PRODUCT, type ProductFormValues } from './form-values';
import { issueMessage } from './issue-message';

export const useProductForm = (
  initialValues: ProductFormValues | undefined,
): UseFormReturn<ProductFormValues> => {
  const { t } = useTranslation('validation');

  return useForm<ProductFormValues>({
    defaultValues: initialValues ?? EMPTY_PRODUCT,
    resolver: zodResolver(productDraftSchema, {
      error: (issue) => issueMessage(issue, (key, values) => t(key, values ?? {})),
    }),
    mode: 'onTouched',
  });
};
