import { untrack } from 'svelte';

export function useMemo(callback: () => void, deps: unknown[]) {
	return $derived.by(() => {
		for (const dep of deps) {
			dep;
		}
		untrack(() => callback());
	});
}
