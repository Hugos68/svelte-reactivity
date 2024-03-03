export function watch(
	callback: () => void,
	options: { flush: 'pre' | 'post' } = { flush: 'post' },
) {
	if (options.flush === 'pre') {
		$effect.pre(callback);
	} else if (options.flush === 'post') {
		$effect(callback);
	} else {
		throw new Error(`Invalid flush option: '${options.flush}'. Expected 'pre' or 'post'.`);
	}
}
