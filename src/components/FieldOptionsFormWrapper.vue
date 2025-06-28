<template>
	<form class="bg-white grid gap-4 p-4 shadow-md rounded-lg border border-slate-300 mb-8">
		<p class="text-sm text-slate-600 mb-2">
			Input type: <strong>{{ props.fieldType }}</strong>
		</p>

		<slot />
		<DeleteFieldButton :id="props.id" />
	</form>
</template>

<script setup lang="ts">
import DeleteFieldButton from "@/components/DeleteFieldButton.vue";

interface Props {
	id: string;
	fieldType?: string;
}

const props = defineProps<Props>();
</script>

<style scoped></style>
