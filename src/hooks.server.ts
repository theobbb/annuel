import { pocketbase } from '$lib/pocketbase';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.background = '';

	return resolve(event, {
		transformPageChunk: ({ html }) => {
			const color = event.locals.background;
			if (!color) return html;
			return html.replace('<html', `<html style="--color-background: ${color}"`);
		}
	});
};
