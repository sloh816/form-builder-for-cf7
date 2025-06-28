<template>
	<button
		type="button"
		@click="deleteField(props.id)"
		class="cursor-pointer mt-4 text-red-600 text-sm"
	>
		Delete
	</button>
</template>

<script setup lang="ts">
import { inject } from "vue";

interface Props {
	id: string;
}

const props = defineProps<Props>();
const deleteField = inject<Function>("deleteField");
</script>

<style scoped></style>
