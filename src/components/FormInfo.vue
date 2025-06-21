<template>
	<div class="form-info bg-slate-200 w-96 p-4 flex flex-col gap-6">
		<div class="flex flex-col">
			<h2 class="font-bold mb-2">Form name</h2>
			<input
				type="text"
				placeholder="Untitled form..."
				class="bg-white p-2 rounded text-sm border border-slate-300 mx-2 block"
				@input="handleClick"
				:value="formName"
			/>
		</div>
		<!-- <SavedForms /> -->
	</div>
</template>

<script setup lang="ts">
import SavedForms from "@/components/SavedForms.vue";
import { inject } from "vue";

interface Props {
	formName: string;
}

const props = defineProps<Props>();

// Inject the function from parent to add a form field
const updateFormName = inject<Function>("updateFormName");

function handleClick(event: Event) {
	localStorage.setItem("formName", event.target.value);
	updateFormName(event.target.value);
}
</script>
