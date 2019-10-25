import { camelActual } from "@/utils/helpers";
import Vue from "vue";
import VueI18n from "vue-i18n";
import en from "@/lang/en";
import es from "@/lang/es";
import * as langs from "@/lang";

Vue.use(VueI18n);

// Used for translations on js files
export const i18n = createI18n();

export function createI18n() {
  let locale = navigator.language;

  /*if (ssrContext && ssrContext.lang) {
    locale = ssrContext.lang;
  } else if (typeof document !== "undefined") {
    locale = document.documentElement.lang;
  }*/

  const localePath = camelActual(locale);
  const messages = { en, es };

  if (locale !== "en" && langs[localePath]) {
    messages[locale] = langs[localePath];
  }

  return new VueI18n({
    locale: locale.slice(0, 2), //hotfix: cut 'es-US' to 'es' and 'en' remains equal. TODO: improve this
    fallbackLocale: locale,
    messages
  });
}
