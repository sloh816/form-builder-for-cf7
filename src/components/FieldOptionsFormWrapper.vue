<template>
	<form class="field-options border border-slate-300 shadow-md rounded p-4">
		<slot />
		<DeleteFieldButton :id="props.id" />
	</form>
</template>

<script setup lang="ts">
import DeleteFieldButton from "@/components/DeleteFieldButton.vue";

interface Props {
	id: string;
}

const props = defineProps<Props>();
</script>

<style scoped></style>
