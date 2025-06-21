<template>
	<div class="form-info bg-slate-200 w-96 p-4 flex flex-col gap-6">
		<div class="flex flex-col">
			<h2 class="font-bold mb-2">Form name</h2>
			<input
				type="text"
				placeholder="Untitled form..."
				class="bg-white p-2 rounded text-sm border border-slate-300 mx-2 block"
				@input="handleClick"
			/>
		</div>
		<div class="flex flex-col">
			<h2 class="font-bold mb-2">Saved forms</h2>
			<div class="flex flex-col gap-3 mt-2">
				<a href="#" class="text-slate-600 text-sm ml-4">Contact form 1</a>
				<a href="#" class="text-slate-600 text-sm ml-4">Contact form 1</a>
				<a href="#" class="text-indigo-700 text-sm ml-4 font-bold">Contact form 1</a>
			</div>
			<button
				class="bg-indigo-100 border border-dashed border-indigo-700 rounded p-2 mt-4 text-indigo-700 font-bold hover:bg-indigo-200 transition-colors cursor-pointer"
			>
				+ Create a new form
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { inject } from "vue";

// Inject the function from parent to add a form field
const updateFormName = inject<Function>("updateFormName");

function handleClick(event: Event) {
	updateFormName(event.target.value);
}
</script>
