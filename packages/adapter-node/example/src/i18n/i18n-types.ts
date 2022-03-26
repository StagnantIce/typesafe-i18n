// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type { BaseTranslation as BaseTranslationType, LocalizedString, RequiredParams } from 'typesafe-i18n'

export type BaseTranslation = BaseTranslationType
export type BaseLocale = 'en'

export type Locales =
	| 'de'
	| 'en'
	| 'it'

export type Translation = RootTranslation

export type Translations = RootTranslation

type RootTranslation = {
	/**
	 * Hello {name}!
	 * @param {string} name
	 */
	HI: RequiredParams<'name'>
	/**
	 * Please navigate to "http://localhost:3001/:locale", where ":locale" is one of following: "en", "de" or "it" e.g. <a href="http://localhost:3001/en">http://localhost:3001/en</a>
	 */
	INSTRUCTIONS_LOCALE: string
	/**
	 * Please navigate to "http://localhost:3001/en/:name", where ":name" is your name e.g. <a href="http://localhost:3001/en/John">http://localhost:3001/en/John</a>
	 */
	INSTRUCTIONS_NAME: string
}

export type TranslationFunctions = {
	/**
	 * Hello {name}!
	 */
	HI: (arg: { name: string }) => LocalizedString
	/**
	 * Please navigate to "http://localhost:3001/:locale", where ":locale" is one of following: "en", "de" or "it" e.g. <a href="http://localhost:3001/en">http://localhost:3001/en</a>
	 */
	INSTRUCTIONS_LOCALE: () => LocalizedString
	/**
	 * Please navigate to "http://localhost:3001/en/:name", where ":name" is your name e.g. <a href="http://localhost:3001/en/John">http://localhost:3001/en/John</a>
	 */
	INSTRUCTIONS_NAME: () => LocalizedString
}

export type Formatters = {}