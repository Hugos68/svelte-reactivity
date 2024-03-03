import { Ref } from './ref.svelte.js';

export function debug<T extends Ref<unknown>[]>(...refs: T) {
	const inspection = $inspect(refs);
	return inspection;
}
