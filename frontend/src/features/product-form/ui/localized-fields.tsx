import { useTranslation } from 'react-i18next';
import type { UseFormReturn } from 'react-hook-form';
import { LOCALES, type Locale } from '../../../shared/api';
import { Input, Textarea } from '../../../shared/ui';
import type { ProductFormValues } from '../lib/form-values';

export interface LocalizedFieldsProps {
  form: UseFormReturn<ProductFormValues>;
  field: 'name' | 'description';
  multiline?: boolean;
}

export const LocalizedFields = ({ form, field, multiline = false }: LocalizedFieldsProps) => {
  const { t } = useTranslation('admin');
  const { register, watch, formState } = form;
  const values = watch(field);
  const filled = LOCALES.filter((locale) => values[locale].trim() !== '');
  const missing = filled.length === 1 ? LOCALES.filter((l) => !filled.includes(l)) : [];
  const Control = multiline ? Textarea : Input;

  return (
    <fieldset className="product-editor-localized">
      <legend>{t(`fields.${field}`)}</legend>
      <div className="product-editor-pair">
        {LOCALES.map((locale: Locale) => {
          const error = formState.errors[field]?.[locale]?.message;
          return (
            <Control
              key={locale}
              label={t(`languages.${locale}`)}
              lang={locale}
              {...(error === undefined ? {} : { error })}
              {...register(`${field}.${locale}`)}
            />
          );
        })}
      </div>
      {missing.map((locale) => (
        <p key={locale} role="status" className="text-sm text-ink-muted">
          {t(`languages.missing_${locale}`)}
        </p>
      ))}
    </fieldset>
  );
};
