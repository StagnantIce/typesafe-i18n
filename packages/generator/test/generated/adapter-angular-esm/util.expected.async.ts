// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */

import { initFormatters } from './formatters-template.actual'
import type { Locales, Translations } from './types.actual.js'
import { loadedFormatters, loadedLocales, locales } from './util.actual'

const localeTranslationLoaders = {
	en: () => import('./en/index.js'),
}

const updateDictionary = (locale: Locales, dictionary: Partial<Translations>) =>
	loadedLocales[locale] = { ...loadedLocales[locale], ...dictionary }

export const loadLocaleAsync = async (locale: Locales) => {
	updateDictionary(locale, (await localeTranslationLoaders[locale]()).default)
	loadFormatters(locale)
}

export const loadAllLocalesAsync = () => Promise.all(locales.map(loadLocaleAsync))

export const loadFormatters = (locale: Locales) =>
	void (loadedFormatters[locale] = initFormatters(locale))
