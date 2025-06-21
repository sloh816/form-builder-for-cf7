<template>
	<button
		class="border border-slate-300 p-4 rounded w-64 text-left hover:border-indigo-700 transition-colors cursor-pointer"
		@click="handleClick"
	>
		<div class="flex items-center gap-4">
			<div
				class="svg-icon bg-indigo-100 p-2 rounded w-12 h-12 flex items-center justify-center"
			>
				<component :is="icon" />
			</div>
			<div>
				<p class="font-bold text-base">{{ label }}</p>
				<p class="text-xs text-slate-600">{{ description }}</p>
			</div>
		</div>
	</button>
</template>

<script setup lang="ts">
import { inject } from "vue";

interface Props {
	label: string;
	description: string;
	icon: Component;
}

const props = defineProps<Props>();

// Inject the function from parent to add a form field
const addFormField = inject<Function>("addFormField");

function handleClick() {
	addFormField(props.label);
}
</script>

<style scoped>
.svg-icon {
	svg {
		@apply w-full h-full;
		fill: #4f46e5; /* Indigo 700 */
	}
}
</style>
