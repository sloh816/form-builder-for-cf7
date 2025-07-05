<template>
	<div class="form-preview-field">
		<div class="relative hover:outline outline-indigo-700 outline-offset-4 rounded">
			<slot name="preview" />
			<button
				class="edit-button bg-slate-200 p-3 absolute top-0 -right-[56px] cursor-pointer opacity-0 hover:opacity-100 transition-all duration-200 fill-slate-800 rounded-full"
				@click="toggleOptions"
			>
				<EditIcon class="w-5 h-5" />
			</button>
		</div>

		<div class="form-preview-field__options hidden">
			<slot name="options" />
		</div>
	</div>
</template>

<script setup lang="ts">
import EditIcon from "../assets/edit.svg";

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
</script>
