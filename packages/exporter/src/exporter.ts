import { resolve } from 'path'
import ts from 'typescript'
import { getConfigWithDefaultValues } from '../../config/src/config'
import type { GeneratorConfigWithDefaultValues } from '../../config/src/types'
import { configureOutputHandler } from '../../generator/src/output-handler'
import { getAllLanguages, parseLanguageFile } from '../../generator/src/parse-language-file'
import { parseTypescriptVersion } from '../../generator/src/utils/generator.utils'
import { createLogger } from '../../generator/src/utils/logger'
import { findAllNamespacesForLocale } from '../../generator/src/utils/namespaces.utils'
import type { BaseTranslation, ExportLocaleMapping, Locale } from '../../runtime/src/core'

const logger = createLogger(console, true)

// --------------------------------------------------------------------------------------------------------------------

const setup = async (): Promise<GeneratorConfigWithDefaultValues> => {
	const config = await getConfigWithDefaultValues()

	const version = parseTypescriptVersion(ts.versionMajorMinor)
	configureOutputHandler(config, version)

	return config
}

const readTranslation = async (
	locale: Locale,
	outputPath: string,
	tempPath: string,
	typesFileName: string,
): Promise<ExportLocaleMapping> => {
	logger.info(`exporting translations for locale '${locale}' ...`)

	const translations = await parseLanguageFile(outputPath, resolve(tempPath, locale), locale, typesFileName)
	if (!translations) {
		logger.error(`could not find locale file '${locale}'`)
		return { locale, translations: {}, namespaces: [] }
	}

	const namespaces = findAllNamespacesForLocale(locale, outputPath)
	for (const namespace of namespaces) {
		logger.info(`adding namespace '${locale}/${namespace}' ...`)
		;(translations as Record<string, BaseTranslation>)[namespace] =
			(await parseLanguageFile(outputPath, resolve(tempPath, locale, namespace), locale, namespace)) || {}
	}

	logger.info(`exporting translations for locale '${locale}' completed`)

	return { locale, translations: translations as BaseTranslation, namespaces }
}

// --------------------------------------------------------------------------------------------------------------------

export const readTranslationFromDisk = async (locale: Locale): Promise<ExportLocaleMapping> => {
	const config = await setup()
	const { outputPath, tempPath, typesFileName } = config

	return await readTranslation(locale, outputPath, tempPath, typesFileName)
}

// --------------------------------------------------------------------------------------------------------------------

export const readTranslationsFromDisk = async (): Promise<ExportLocaleMapping[]> => {
	const config = await setup()
	const { outputPath, tempPath, typesFileName } = config

	const locales = await getAllLanguages(outputPath)

	const promises: Promise<ExportLocaleMapping>[] = locales.map((locale) =>
		readTranslation(locale, outputPath, tempPath, typesFileName),
	)

	return Promise.all(promises)
}
