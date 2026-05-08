<script lang="ts">
	import { afterNavigate } from '$app/navigation';

	let has_history = $state(false);
	afterNavigate(({ from }) => {
		if (from) has_history = true;
	});

	function on_back(event: MouseEvent) {
		if (has_history) {
			event.preventDefault();
			window.history.back();
		}
	}
</script>

<div class="grid-10 my-2.5 leading-tight">
	<div class="col-span-full mb-12">
		<a href="/" onclick={on_back} class="-mx-2 -my-1 flex w-fit items-center gap-1 px-2 py-1">
			<div class="icon-[ri--arrow-left-long-line]"></div>
			Retour
		</a>
	</div>
	<div class="col-span-5">
		<span class="inline-block pb-0.5 text-muted">
			<span class="whitespace-nowrap">Site web</span>
			<span class="whitespace-nowrap">fait par</span>
		</span>
		<a href="https://ecartelement.dev/" class="" target="_blank">ecartelement </a>
	</div>
	<div class="col-span-5">
		<span class="inline-block pb-0.5 text-muted"
			>Police de <span class="whitespace-nowrap">caractères :</span></span
		>
		<a href="https://www.instagram.com/p/DXeo0_LkTI8" target="_blank" class="whitespace-nowrap">
			EP Programma
		</a>

		<a href="https://instagram.com/emilepainchaud.qc.ca/" target="_blank" class="whitespace-nowrap">
			(<span class="">Émile Painchaud</span>)
		</a>
	</div>
	<div class="col-span-full [&_a]:inline-block [&_a]:py-0.5">
		<div class="ml-4 pb-0.5 text-muted md:ml-8">Avec l’aide de :</div>
		<div class="ml-8 md:ml-16">
			<div>
				<a href="https://annuel-design.uqam.ca/2026/finissant-es/bczhvgxsbll9p92">
					Darline Sophie Jocelyn
				</a>
			</div>

			<div>
				<a href="https://annuel-design.uqam.ca/2026/finissant-es/q5rwuzu2z0hrbas"
					>Emmanuelle Seguin</a
				>
			</div>
		</div>
		<div class="ml-16 md:ml-32">
			<div>
				<a href="https://annuel-design.uqam.ca/2026/finissant-es/n070prkt1g74t1i">Kev Bourgeois</a>
			</div>
			<div>
				<a href="https://annuel-design.uqam.ca/2026/finissant-es/5pbynfcnme2flx6">
					Cesar Enrique Ramos Irausquin
				</a>
			</div>
		</div>
		<div class="ml-24 md:ml-48">
			<div>
				<a href="https://www.instagram.com/lux.4eterna/">Daniel Alvarez</a>
			</div>
			<div>
				<a href="https://www.instagram.com/urbainjamin/">Benjamin Perrault</a>
			</div>
		</div>
		<div class="ml-32 md:ml-64">
			<div>
				<a href="https://design.uqam.ca/professeur/simon-matthew-seguin/">Simon-Matthew Séguin</a>
			</div>
		</div>
	</div>
</div>
