import type { ReadonlyRef } from './ref.svelte.js';

export function computed<T>(callback: () => T): ReadonlyRef<T> {
	const value = $derived.by(callback);
	return {
		get value() {
			return value;
		},
	};
}
