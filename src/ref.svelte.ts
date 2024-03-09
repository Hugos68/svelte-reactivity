import { tick } from 'svelte';

declare const RefSymbol: unique symbol;

export type Ref<T> = {
	value: T;
};

export type MaybeRef<T> = T | Ref<T>;
export type ReadonlyRef<T> = { readonly value: T };
export type StartStopNotifier<T> = (ref: Ref<T>) => (() => void) | void;

export function isRef(ref: any): ref is Ref<unknown> {
	return !!ref && typeof ref === 'object' && Object.keys(ref).length === 1 && 'value' in ref;
}

export function ref<T>(init?: T, start?: StartStopNotifier<T>): Ref<T> {
	let value = $state(init) as T;
	let subscriber_count = 0;
	let stop: ReturnType<StartStopNotifier<T>> | null = null;
	return {
		get value() {
			if ($effect.active() && !!start) {
				$effect(() => {
					if (subscriber_count++ === 0) {
						stop = start(this);
					}
					return () => {
						tick().then(() => {
							if (--subscriber_count === 0) {
								stop?.();
								stop = null;
							}
						});
					};
				});
			}
			return value;
		},
		set value(new_value) {
			value = new_value;
		},
	};
}
