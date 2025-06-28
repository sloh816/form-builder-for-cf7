<template>
	<div class="flex flex-col gap-1">
		<label :for="props.id" class="font-semibold">{{ props.label }} </label>
		<span v-if="props.description" class="text-gray-500 text-sm">{{ props.description }}</span>
		<textarea rows="5" @input="(e) => inputFunction(e.target.value)">{{
			props.value
		}}</textarea>
	</div>
</template>

<script setup lang="ts">
interface Props {
	id: string;
	label?: string;
	value: string;
	description?: string;
	inputFunction: Function;
}

const props = defineProps<Props>();
</script>
