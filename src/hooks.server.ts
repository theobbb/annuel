import { pocketbase } from '$lib/pocketbase';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.background = '';
	//if (event.route.id != '/[year]/projets/[project]') return resolve(event);
	//const settings = await pocketbase.collection('settings').getFirstListItem('');

	return resolve(event, {
		transformPageChunk: ({ html }) => {
			const color = event.locals.background;
			if (!color) return html;
			return html.replace('<html', `<html style="background-color: ${color}"`);
		}
	});
};
