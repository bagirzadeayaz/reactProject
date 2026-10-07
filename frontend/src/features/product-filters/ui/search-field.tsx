import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '../../../shared/ui';

export interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const DEBOUNCE_MS = 300;

export const SearchField = ({ value, onChange }: SearchFieldProps) => {
  const { t } = useTranslation('catalog');
  const [draft, setDraft] = useState(value);
  const [seen, setSeen] = useState(value);
  const [pushed, setPushed] = useState(value);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (value !== seen) {
    setSeen(value);
    if (value !== pushed) {
      setPushed(value);
      setDraft(value);
    }
  }

  useEffect(
    () => () => {
      if (timer.current !== null) clearTimeout(timer.current);
    },
    [],
  );

  const handleChange = (next: string): void => {
    setDraft(next);
    if (timer.current !== null) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      timer.current = null;
      setPushed(next);
      onChange(next);
    }, DEBOUNCE_MS);
  };

  return (
    <Input
      type="search"
      name="search"
      label={t('searchLabel')}
      placeholder={t('searchPlaceholder')}
      value={draft}
      onChange={(event) => {
        handleChange(event.target.value);
      }}
      autoComplete="off"
    />
  );
};
