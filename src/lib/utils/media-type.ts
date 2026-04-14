/**
 * Supported media types for our helper
 */
type MediaType = 'image' | 'video' | 'unknown';

/**
 * Determines if a filename belongs to an image or video based on its extension.
 * @param filename - The name or path of the file
 * @returns MediaType - 'image', 'video', or 'unknown'
 */
export const get_media_type = (filename: string): MediaType => {
	const extension = filename.split('.').pop()?.toLowerCase();

	if (!extension) return 'unknown';

	const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'avif'];
	const videoExtensions = ['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv'];

	if (imageExtensions.includes(extension)) {
		return 'image';
	}

	if (videoExtensions.includes(extension)) {
		return 'video';
	}

	return 'unknown';
};
