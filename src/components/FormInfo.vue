<template>
	<div class="form-info bg-slate-200 min-w-[300px] p-4 flex flex-col gap-6">
		<div class="flex flex-col">
			<h2 class="font-bold mb-2">Form name</h2>
			<input
				id="form-name"
				type="text"
				placeholder="Untitled form..."
				class="bg-white p-2 rounded text-sm border border-slate-300 mx-2 block"
				:value="props.formName"
				@input="
					handleInput(($event.target && ($event.target as HTMLInputElement).value) || '')
				"
			/>
		</div>
		<SavedForms :savedForms="props.savedForms" :currentFormId="props.currentFormId" />
	</div>
</template>

<script setup lang="ts">
import SavedForms from "../components/SavedForms.vue";
import { inject } from "vue";
import type { Form } from "../data/types";

interface Props {
	currentFormId?: string;
	savedForms: Form[];
}

const props = defineProps<Props>();

const updateFormName = inject<Function>("updateFormName");
function handleInput(newName: string) {
	updateFormName?.(newName);
}
</script>
