import { Signal } from "./signal.svelte.js";

class Computed<T> extends Signal<T> {
	public value = $derived.by(() => this.fn());
	private fn: () => T = () => this.value;

	public constructor(fn: () => T) {
		super();
		this.fn = fn;
	}
}

type Parameters<T> = ConstructorParameters<typeof Computed<T>>;

const computed = <T>(fn: Parameters<T>[0]) => new Computed(fn);

export { computed, Computed };
