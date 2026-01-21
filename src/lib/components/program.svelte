<script>
	const { name } = $props();

	const splitted = name.split(',').join(' *');
</script>

{splitted}
