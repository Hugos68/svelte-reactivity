import { ref, type StartStopNotifier } from './ref.svelte.js';

export type Readonly<T> = {
	readonly value: T;
};

export function readonly<T>(init?: T, start?: StartStopNotifier<T>): Readonly<T> {
	const r = ref<T>(init, start);
	return {
		get value() {
			return r.value;
		},
	};
}
