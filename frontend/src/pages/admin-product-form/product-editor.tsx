import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ProductForm, useProductForm, type ProductFormValues } from '../../features/product-form';
import { useToast } from '../../shared/ui';
import { UnsavedChangesGuard } from './unsaved-changes-guard';

export interface ProductEditorProps {
  mode: 'create' | 'edit';
  initialValues?: ProductFormValues;
  onSave: (values: ProductFormValues) => Promise<void>;

  onDone: () => void;
}

export const ProductEditor = ({ mode, initialValues, onSave, onDone }: ProductEditorProps) => {
  const { t } = useTranslation('admin');
  const toast = useToast();
  const form = useProductForm(initialValues);
  const [saved, setSaved] = useState(false);

  const submit = async (values: ProductFormValues): Promise<void> => {
    try {
      await onSave(values);
      toast.show({ message: mode === 'edit' ? t('updated') : t('created'), tone: 'success' });
      setSaved(true);
    } catch {
      toast.show({ message: t('saveFailed'), tone: 'error' });
    }
  };

  useEffect(() => {
    if (saved) onDone();
  }, [saved, onDone]);

  return (
    <>
      <UnsavedChangesGuard when={form.formState.isDirty && !saved} />
      <ProductForm form={form} mode={mode} onSubmit={submit} onCancel={onDone} />
    </>
  );
};
