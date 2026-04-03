<script lang="ts">
	import Header from '../header.svelte';
	import Programs from './programs.svelte';
</script>

<Header>
	<div
		class={['relative z-100 col-span-2 col-start-9 flex justify-end max-lg:hidden lg:row-start-1']}
	>
		<Programs />
	</div>
</Header>
<div class="grid grid-cols-10 gap-x-6 gap-y-3 max-md:mt-4">
	<!-- <div
		class="col-span-3 row-start-2 flex md:row-start-1 md:justify-end lg:col-span-1 lg:col-start-7"
	>
		<Views {view} />
	</div> -->

	<!-- <div class="col-span-full lg:col-span-3 lg:col-start-8">
		<Search />
	</div> -->
	<div class={['col-span-7 flex justify-end lg:hidden']}>
		<Programs />
	</div>
</div>
