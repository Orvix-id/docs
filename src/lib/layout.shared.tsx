import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: appName,
    },
    i18n: {
      defaultLanguage: 'en',
      languages: [
        { locale: 'en', text: 'English' },
        { locale: 'id', text: 'Bahasa Indonesia' },
      ],
    },
  };
}
