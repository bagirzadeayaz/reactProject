import { useState } from 'react';

export const useSelection = (visibleIds: readonly string[]) => {
  const [selected, setSelected] = useState<ReadonlySet<string>>(() => new Set());
  const visible = new Set(visibleIds);
  const selectedIds = [...selected].filter((id) => visible.has(id));
  const visibleSelection: ReadonlySet<string> =
    selectedIds.length === selected.size ? selected : new Set(selectedIds);

  const toggle = (id: string): void => {
    setSelected((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = (): void => {
    const allSelected = visibleIds.every((id) => visibleSelection.has(id));
    setSelected(allSelected ? new Set() : new Set(visibleIds));
  };

  const clear = (): void => {
    setSelected(new Set());
  };

  return { selected: visibleSelection, toggle, toggleAll, clear };
};
