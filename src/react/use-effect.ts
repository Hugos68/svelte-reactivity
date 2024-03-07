import { untrack } from 'svelte';

export function useEffect(callback: () => void, deps: unknown[]) {
	$effect(() => {
		for (const dep of deps) {
			dep;
		}
		untrack(() => callback());
	});
}
