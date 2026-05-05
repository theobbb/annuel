/**
 * Supported media types for our helper
 */
type MediaType = 'image' | 'gif' | 'video' | 'unknown';

/**
 * Determines if a filename belongs to an image or video based on its extension.
 * @param filename - The name or path of the file
 * @returns MediaType - 'image', 'video', or 'unknown'
 */
export const get_media_type = (filename: string): MediaType => {
	const extension = filename.split('.').pop()?.toLowerCase();

	if (!extension) return 'unknown';

	const image_ext = ['jpg', 'jpeg', 'png', 'webp', 'svg', 'avif'];
	const gif_ext = ['gif'];
	const video_ext = ['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv'];

	if (image_ext.includes(extension)) return 'image';
	if (gif_ext.includes(extension)) return 'gif';

	if (video_ext.includes(extension)) return 'video';

	return 'unknown';
};
