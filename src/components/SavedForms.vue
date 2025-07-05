<template>
	<div class="flex flex-col">
		<h2 class="font-bold mb-2">Saved forms</h2>
		<div class="flex flex-col gap-3 mt-2 ml-4 mb-4">
			<SavedFormButton
				v-for="form in savedForms"
				:key="form.name"
				:formName="form.name"
				:isCurrent="props.currentFormName === form.name"
				:id="form.id"
			/>
		</div>
		<button
			class="bg-indigo-100 border border-dashed border-indigo-700 rounded p-2 mt-4 text-indigo-700 font-bold hover:bg-indigo-200 transition-colors cursor-pointer"
			@click="createNewForm"
		>
			+ Create a new form
		</button>
	</div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import SavedFormButton from "../components/SavedFormButton.vue";

interface FormField {
	component: string;
	props: Record<string, any>;
}

interface Form {
	id: string;
	name: string;
	email: string;
	domain?: string;
	subject?: string;
	introText?: string;
	fields: FormField[];
}

interface Props {
	savedForms: Form[];
	currentFormName?: string;
}

const props = defineProps<Props>();
const createNewForm = inject<(event: MouseEvent) => void>("createNewForm");
</script>

<style scoped></style>
