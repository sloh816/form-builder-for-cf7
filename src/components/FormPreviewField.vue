<template>
	<div class="form-preview-field">
		<button
			class="form-preview-field__preview text-left outline-indigo-500 hover:outline outline-offset-4 rounded-sm cursor-pointer"
			@click="toggleOptions"
		>
			<slot name="preview" />
		</button>

		<div class="form-preview-field__options" v-if="showOptions">
			<slot name="options" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const showOptions = ref(false);

function toggleOptions() {
	showOptions.value = !showOptions.value;
}
</script>

<style scoped></style>
