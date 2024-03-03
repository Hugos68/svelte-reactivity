import { untrack } from 'svelte';
import { type Ref } from './ref.svelte.js';

export type WatchEffectCallback = () => void;

export type WatchEffectOptions = {
	flush?: 'pre' | 'post' | 'sync';
};

export function watchEffect(
	callback: WatchEffectCallback,
	options: WatchEffectOptions = { flush: 'post' },
) {
	if (options.flush === 'pre') {
		$effect.pre(callback);
	} else if (options.flush === 'post') {
		$effect(callback);
	} else if (options.flush === 'sync') {
		throw Error(`Unknown value for 'flush': "${options.flush}". Expected "pre", "post"`);
	}
}

export function watch<const T extends Ref<unknown> | Ref<unknown>[]>(
	refOrRefs: T,
	callback: (oldValue: T, newValue: T) => void,
	options: WatchEffectOptions = { flush: 'post' },
) {
	const deps = Array.isArray(refOrRefs) ? refOrRefs : [refOrRefs];
	let oldValue = Array.isArray(refOrRefs) ? refOrRefs.map((ref) => ref.value) : refOrRefs.value;
	watchEffect(() => {
		for (const dep of deps) {
			dep.value; // Reference the value to track the dependency
		}
		untrack(() => {
			const newValue = Array.isArray(refOrRefs)
				? refOrRefs.map((ref) => ref.value)
				: refOrRefs.value;
			callback(oldValue, newValue);
			oldValue = newValue;
		});
	}, options);
}
