import { mfmLanguage } from './language';
import { MfmForest } from './prelude';
import { normalize } from './normalize';

export function parse(source: string): MfmForest {
	if (source == null || source == '') {
		return [];
	}

	return normalize(mfmLanguage.root.tryParse(source));
}

export function parsePlain(source: string): MfmForest {
	if (source == null || source == '') {
		return [];
	}

	return normalize(mfmLanguage.plain.tryParse(source));
}
