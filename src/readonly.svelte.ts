import { ref } from './ref.svelte.js';

export type Readonly<T> = {
	readonly value: T;
};

export function readonly<T>(init: T): Readonly<T> {
	const r = ref(init);
	return {
		get value() {
			return r.value;
		},
	};
}
