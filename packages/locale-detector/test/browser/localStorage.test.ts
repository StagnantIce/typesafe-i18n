import type { Locale } from '../../../core/src/core'

import { suite } from 'uvu'
import * as assert from 'uvu/assert'

import { initLocalStorageDetector } from '../../src/detectors/browser/localstorage-detector'

const test = suite('detector:localStorage')

// --------------------------------------------------------------------------------------------------------------------

const testDetector = (
	name: string,
	items: Record<string, string> | undefined,
	expected: Locale[],
	itemKey: string | undefined = undefined,
) =>
	test(`localStorage ${name}`, () => {
		//@ts-ignore
		globalThis.window = {
			localStorage: {
				getItem: (key: string) => items?.[key],
			} as Storage,
		}

		const detector = initLocalStorageDetector(itemKey)
		assert.equal(detector(), expected)
	})

testDetector('undefined', undefined, [])

testDetector('empty', {}, [])

testDetector('single value', { lang: 'de-AT' }, ['de-AT'])

testDetector('single value with custom key', { locale: 'en-US' }, ['en-US'], 'locale')

testDetector('single value with custom key not specified', { locale: 'fr' }, [])

testDetector('single value with wrong custom key not specified', { lang: 'fr' }, [], 'locale')

testDetector(
	'multiple values',
	{
		id: '1234',
		lang: 'it',
	},
	['it'],
)

testDetector('multiple values with custom key', { param: 'test123', 'user-lang': 'es' }, ['es'], 'user-lang')

testDetector('multiple values without lang', { param1: 'some-value', param2: 'another-value' }, [])

// --------------------------------------------------------------------------------------------------------------------

test.run()
