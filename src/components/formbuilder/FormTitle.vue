<template>
	<button
		class="text-left rounded hover:outline outline-indigo-700 outline-offset-8 cursor-pointer"
		type="button"
	>
		<div class="form-field form-title">
			<h1 :style="style">{{ title }}</h1>
		</div>
	</button>
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
</script>
