<template>
	<div class="form-preview-field">
		<div class="relative hover:outline outline-indigo-700 outline-offset-4 rounded">
			<slot name="preview" />
			<div class="flex gap-1 items-center absolute -top-2 -right-[84px] flex-wrap w-[70px]">
				<button
					class="action-button bg-slate-200 p-2 cursor-pointer opacity-0 transition-all duration-200 fill-slate-800 rounded-full"
					@click="toggleOptions"
				>
					<EditIcon class="w-4 h-4" />
				</button>
				<button
					class="action-button bg-slate-200 p-2 cursor-pointer opacity-0 transition-all duration-200 fill-slate-800 rounded-full"
					@click="duplicateFieldHandler"
				>
					<DuplicateIcon class="w-4 h-4" />
				</button>
				<button
					class="action-button bg-red-200 p-2 cursor-pointer opacity-0 transition-all duration-200 fill-red-800 rounded-full"
					@click="deleteFieldHandler"
				>
					<BinIcon class="w-4 h-4" />
				</button>
			</div>
		</div>

		<div class="form-preview-field__options hidden">
			<slot name="options" />
		</div>
	</div>
</template>

<script setup lang="ts">
import EditIcon from "../assets/edit.svg";
import DuplicateIcon from "../assets/duplicate.svg";
import BinIcon from "../assets/bin.svg";
import { inject } from "vue";

function toggleOptions(event: Event) {
	const button = event.currentTarget;
	const formField = (button as HTMLElement).closest(".form-preview-field");
	const options = formField?.querySelector(".form-preview-field__options");

	// toggle the visibility of the options
	if ((options as HTMLElement).classList.contains("hidden")) {
		(options as HTMLElement).classList.remove("hidden");
	} else {
		(options as HTMLElement).classList.add("hidden");
	}

	// hide all options
	const allOptions = document.querySelectorAll(".form-preview-field__options");
	allOptions.forEach((option) => {
		if (option !== options) {
			option.classList.add("hidden");
		}
	});
}
const duplicateField = inject<(fieldId: string) => void>("duplicateField");
function duplicateFieldHandler(event: Event) {
	const button = event.currentTarget;
	const formField = (button as HTMLElement).closest(".form-preview-field-wrapper");
	const fieldId = formField?.id;

	if (fieldId && duplicateField) {
		duplicateField(fieldId);
	}
}

const deleteField = inject<(fieldId: string) => void>("deleteField");
function deleteFieldHandler(event: Event) {
	const button = event.currentTarget;
	const formField = (button as HTMLElement).closest(".form-preview-field-wrapper");
	const fieldId = formField?.id;

	if (fieldId && duplicateField) {
		deleteField?.(fieldId);
	}
}
</script>

<style scoped>
.form-preview-field:hover .action-button {
	opacity: 1;
}
</style>
