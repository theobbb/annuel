import { pocketbase } from '$lib/pocketbase';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.background = '';
	event.locals.foreground_white = false;

	return resolve(event, {
		transformPageChunk: ({ html }) => {
			const background = event.locals.background;
			if (!background) return html;
			return html.replace(
				'<html',
				`<html style="--color-background: ${background}" class="${event.locals.foreground_white ? 'foreground-white' : ''}"`
			);
		}
	});
};
