import { untrack } from 'svelte';
import type { Ref } from './ref.svelte.js';

export type WatchEffectOptions = {
	flush?: 'pre' | 'post' | 'sync';
};

export function watchEffect(fn: () => void, options: WatchEffectOptions = { flush: 'post' }) {
	if (options.flush === 'pre') {
		$effect.pre(fn);
	} else if (options.flush === 'post') {
		$effect(fn);
	} else if (options.flush === 'sync') {
		throw Error(`Unknown value for 'flush': "${options.flush}". Expected "pre", "post"`);
	}
}

export function watch(
	refOrRefs: Ref<unknown> | Ref<unknown>[],
	fn: () => void,
	options: WatchEffectOptions = { flush: 'post' },
) {
	const refs = Array.isArray(refOrRefs) ? refOrRefs : [refOrRefs];
	watchEffect(() => {
		for (const ref of refs) {
			ref.value;
		}
		untrack(() => fn());
	}, options);
}
