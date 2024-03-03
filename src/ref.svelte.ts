import { tick } from 'svelte';

export type Ref<T> = { value: T };
export type ReadonlyRef<T> = { readonly value: T };
export type MaybeRef<T> = Ref<T> | T;
export type StartStopNotifier<T> = (ref: Ref<T>) => (() => void) | void;

export function isRef<T>(maybeRef: MaybeRef<T>): maybeRef is Ref<T> {
	return (
		!!maybeRef &&
		typeof maybeRef === 'object' &&
		'value' in maybeRef &&
		Object.keys(maybeRef).length === 1
	);
}

export function ref<T>(init?: MaybeRef<T>, start?: StartStopNotifier<T>): Ref<T> {
	let value = $state(unref(init)) as T;
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

export function unref<T>(maybeRef: MaybeRef<T>) {
	return isRef(maybeRef) ? maybeRef.value : maybeRef;
}

export function toRef<T>(maybeRef: MaybeRef<T>) {
	return isRef(maybeRef) ? maybeRef : ref(maybeRef);
}
