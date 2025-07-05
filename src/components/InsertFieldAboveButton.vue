<template>
	<button
		class="text-sm text-indigo-600 flex items-center gap-2 cursor-pointer opacity-0 hover:opacity-100 transition-all duration-200"
		:style="{ width: 'calc(100% + 60px)' }"
		@click="openFieldsModal(index)"
	>
		<span class="block h-[1px] bg-indigo-600 w-full"></span>
		<span class="block text-nowrap bg-indigo-100 px-2 rounded">+ Insert field above</span>
	</button>
</template>

<script setup lang="ts">
import { inject } from "vue";

const setAddFormFieldIndex = inject("setAddFormFieldIndex");
function openFieldsModal(index: number | null) {
	if (typeof setAddFormFieldIndex === "function") {
		setAddFormFieldIndex(index); // Reset the index to null when opening the modal
	}
	const modal = document.querySelector(".fields-modal");
	modal?.classList.remove("hidden");
}
</script>
