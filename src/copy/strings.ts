export const strings = {
  en: {
    learn_path_title: 'Learning Path',
    finish: 'Finish',
    next: 'Next',
  },
};

export type LocaleKey = keyof typeof strings;
export function t(locale: LocaleKey, key: keyof (typeof strings)['en']) {
  return strings[locale][key];
}
