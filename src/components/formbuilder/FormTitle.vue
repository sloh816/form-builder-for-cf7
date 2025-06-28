<template>
	<p class="font-bold text-2xl mt-4">{{ props.title }}</p>

	<form class="text-input-options border border-slate-300 shadow-md rounded p-4">
		<label :for="`label-${props.id}`" class="font-semibold">Label </label>
		<select @change="updateHeadingLevel($event.target.value)">
			<option value="1" :selected="props.headingLevel === 1">Heading 1</option>
			<option value="2" :selected="props.headingLevel === 2">Heading 2</option>
			<option value="3" :selected="props.headingLevel === 3">Heading 3</option>
		</select>
	</form>
</template>

<script setup lang="ts">
import { inject } from "vue";

interface Props {
	title: string;
	headingLevel?: number;
	id: string;
}

const props = defineProps<Props>();

const updateFormField = inject<Function>("updateFormField");
function updateHeadingLevel(level: string) {
	const newHeadingLevel = parseInt(level);
	const newProps = {
		...props,
		headingLevel: newHeadingLevel
	};

	updateFormField?.(props.id, newProps);
}
</script>
