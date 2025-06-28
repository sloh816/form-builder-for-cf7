<template>
	<div class="form-preview-field">
		<button
			class="form-preview-field__preview text-left outline-indigo-500 hover:outline outline-offset-4 rounded-sm cursor-pointer"
			@click="toggleOptions"
		>
			<slot name="preview" />
		</button>

		<div class="form-preview-field__options hidden">
			<slot name="options" />
		</div>
	</div>
</template>

<script setup lang="ts">
function toggleOptions(event) {
	const button = event.currentTarget;
	const options = button.nextElementSibling;

	// toggle the visibility of the options
	if (options.classList.contains("hidden")) {
		options.classList.remove("hidden");
	} else {
		options.classList.add("hidden");
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

<style scoped></style>
