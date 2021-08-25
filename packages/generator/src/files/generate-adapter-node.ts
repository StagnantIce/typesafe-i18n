import { writeFileIfContainsChanges } from '../file-utils'
import { GeneratorConfigWithDefaultValues } from '../generate-files'
import { prettify } from '../generator-util'
import { OVERRIDE_WARNING, tsCheck } from '../output-handler'

const getNodeUtils = ({ utilFileName, loadLocalesAsync, banner }: GeneratorConfigWithDefaultValues) => {
	return `${OVERRIDE_WARNING}${tsCheck}
${banner}

import { i18nString, i18nObject${loadLocalesAsync ? '' : ', i18n'} } from './${utilFileName}';
${
	loadLocalesAsync
		? ''
		: `
const L = i18n()
`
}
export { i18nString, i18nObject${loadLocalesAsync ? '' : ', L'} }
${
	loadLocalesAsync
		? ''
		: `
export default L
`
}`
}

export const generateNodeAdapter = async (config: GeneratorConfigWithDefaultValues): Promise<void> => {
	const { outputPath } = config

	const nodeUtils = getNodeUtils(config)

	const fileName = config.adapterFileName || 'i18n-node'
	await writeFileIfContainsChanges(outputPath, fileName, prettify(nodeUtils))
}
