<script lang="ts">
	import { marked } from 'marked';

	const { text }: { text: string } = $props();

	// 1. Create a custom renderer
	const renderer = new marked.Renderer();

	// 2. Override everything except what you want
	// By returning just 'text', we skip the HTML tags for these elements
	renderer.heading = (text) => text + ' ';
	renderer.blockquote = (text) => text;
	renderer.strong = (text) => text;
	renderer.em = (text) => text;
	renderer.codespan = (text) => text;
	renderer.code = (text) => text;
	renderer.image = () => ''; // Completely block images

	// 3. Keep links and lists (don't override them, or customize them)
	// Example: forcing links to open in a new tab
	renderer.link = ({ href, text }) => {
		return `<a href="${href}" target="_blank" rel="noopener">${text}</a>`;
	};

	const html = $derived(marked.parse(text, { renderer }));
</script>

<div class="prose">
	{@html html}
</div>
