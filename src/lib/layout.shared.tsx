import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: appName,
    },
    i18n: {
      defaultLanguage: 'en',
      languages: ['en', 'id'],
    },
  };
}
