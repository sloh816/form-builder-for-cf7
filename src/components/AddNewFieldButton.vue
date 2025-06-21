<template>
	<button
		class="bg-indigo-100 border border-dashed border-indigo-700 rounded p-4 mt-8 text-indigo-700 font-bold hover:bg-indigo-200 transition-colors cursor-pointer w-full"
		@click="openFieldsModal"
	>
		+ Add a new field
	</button>
</template>

<script setup lang="ts"></script>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	methods: {
		openFieldsModal(event: MouseEvent) {
			const modal = document.querySelector(".fields-modal");
			modal?.classList.remove("hidden");
		}
	}
});
</script>

<style scoped></style>
