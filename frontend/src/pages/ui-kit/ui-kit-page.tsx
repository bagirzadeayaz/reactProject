import { LanguageSwitcher } from '../../features/language-switcher';
import { Container } from '../../shared/ui';
import { ButtonsSection } from './sections/buttons-section';
import { FeedbackSection } from './sections/feedback-section';
import { FieldsSection } from './sections/fields-section';
import { LayoutSection } from './sections/layout-section';
import { OverlaysSection } from './sections/overlays-section';

const COPY = {
  heading: 'UI kit',
  lead: 'Every primitive in src/shared/ui. Development builds only.',
} as const;

export const UiKitPage = () => (
  <>
    <Container as="main" className="py-16">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <h1 className="text-h1 font-(--font-weight-heading) text-ink">{COPY.heading}</h1>
        <LanguageSwitcher />
      </div>
      <p className="mt-4 text-md text-ink-muted">{COPY.lead}</p>
    </Container>
    <ButtonsSection />
    <FieldsSection />
    <LayoutSection />
    <FeedbackSection />
    <OverlaysSection />
  </>
);
