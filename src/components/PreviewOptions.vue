<template>
	<div class="flex items-center gap-3 mb-8">
		<span
			v-if="showingFormPreview"
			class="bg-indigo-700 text-white py-2 px-4 rounded-bl-lg rounded-br-lg font-bold inline-block text-sm"
			>Form preview</span
		>
		<button
			v-if="showingFormPreview"
			class="bg-slate-200 text-slate-500 py-2 px-4 rounded-bl-lg rounded-br-lg text-sm cursor-pointer"
			@click="setFormPreview && setFormPreview(false)"
		>
			Email preview
		</button>

		<button
			v-if="!showingFormPreview"
			class="bg-slate-200 text-slate-500 py-2 px-4 rounded-bl-lg rounded-br-lg text-sm cursor-pointer"
			@click="setFormPreview && setFormPreview(true)"
		>
			Form preview
		</button>
		<span
			v-if="!showingFormPreview"
			class="bg-indigo-700 text-white py-2 px-4 rounded-bl-lg rounded-br-lg font-bold inline-block text-sm"
			>Email preview</span
		>
	</div>
</template>

<script setup lang="ts">
import { inject } from "vue";

interface Props {
	showingFormPreview: true | false | True;
}

const { showingFormPreview } = defineProps<Props>();

const setFormPreview = inject<Function>("setFormPreview");
</script>
