import { useEffect } from 'react';

export interface DocumentMetaProps {
  title: string;
  description?: string;

  robots?: string;
}

const setMeta = (name: string, content: string | undefined): void => {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (content === undefined) {
    tag?.remove();
    return;
  }
  if (!tag) {
    tag = document.createElement('meta');
    tag.name = name;
    document.head.append(tag);
  }
  tag.content = content;
};

export const DocumentMeta = ({ title, description, robots }: DocumentMetaProps) => {
  useEffect(() => {
    document.title = title;
    setMeta('description', description);
    setMeta('robots', robots);
  }, [title, description, robots]);

  return null;
};
