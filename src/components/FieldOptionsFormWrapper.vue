<template>
	<form
		class="bg-white grid justify-items-start gap-4 p-4 shadow-md rounded-lg border border-indigo-700 mb-8"
		:data-field-id="props.id"
	>
		<p class="text-sm text-slate-600 mb-2">
			Input type: <strong>{{ props.fieldType }}</strong>
		</p>

		<slot />
		<div class="flex items-center justify-between w-full">
			<div class="flex gap-4">
				<MoveButton :id="props.id" direction="up" />
				<MoveButton :id="props.id" direction="down" />
			</div>
			<DeleteFieldButton :id="props.id" />
		</div>
	</form>
</template>

<script setup lang="ts">
import DeleteFieldButton from "@/components/DeleteFieldButton.vue";
import MoveButton from "@/components/MoveButton.vue";

interface Props {
	id: string;
	fieldType?: string;
}

const props = defineProps<Props>();
</script>

<style scoped></style>
