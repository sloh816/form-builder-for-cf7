<template>
	<button
		class="form-field form-title text-left rounded hover:outline outline-indigo-700 outline-offset-8 cursor-pointer"
		type="button"
		@click="showFieldOptions"
	>
		<div>
			<h1 :style="style">{{ title }}</h1>
		</div>
	</button>
	<div
		class="field-options shadow-sm border border-slate-300 p-4 fixed top-48 bg-white left-4 w-[275px] rounded"
	>
		Field options
	</div>
</template>

<script setup lang="ts">
interface Props {
	title: string;
	style: Object | string;
}

const props = withDefaults(defineProps<Props>(), {
	title: "Untitled form...",
	style: "font-weight:bold;font-size:32px"
});

function showFieldOptions(event: MouseEvent) {
	const fieldOptions = document.querySelectorAll(".field-options");
	fieldOptions.forEach((option) => {
		option.classList.add("hidden");
	});

	const target = event.currentTarget as HTMLElement;
	const thisFieldOptions = target.nextElementSibling as HTMLElement;
	if (thisFieldOptions) {
		thisFieldOptions.classList.remove("hidden");
	}
}
</script>
