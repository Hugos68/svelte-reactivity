import type { ReadonlyRef } from './ref.svelte.js';

export function computed<T>(fn: () => T): ReadonlyRef<T> {
	const value = $derived.by(fn);
	return {
		get value() {
			return value;
		},
	};
}
