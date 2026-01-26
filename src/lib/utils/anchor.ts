/**
 * Determines the anchor point of a DOMRect based on its
 * proximity to the viewport edges.
 */
export type AnchorPosition = ['top' | 'bottom', 'left' | 'right'];

export function get_anchor_pos(rect: DOMRect): AnchorPosition {
	const { innerWidth, innerHeight } = window;

	// Determine if the element is further from the left edge than the right
	const isFurtherLeft = rect.left > innerWidth - rect.right;

	// Determine if the element is further from the top edge than the bottom
	const isFurtherTop = rect.top > innerHeight - rect.bottom;

	const x = isFurtherLeft ? 'left' : 'right';
	const y = isFurtherTop ? 'top' : 'bottom';

	return [y, x];
}
