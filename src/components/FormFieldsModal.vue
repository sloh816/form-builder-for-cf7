<template>
	<div
		class="fields-modal fixed inset-0 bg-slate-900/75 flex items-center justify-center z-20 hidden"
		@click.self="closeFieldsModal"
	>
		<div class="bg-white p-12 rounded shadow-lg relative">
			<h2 class="font-bold text-xl text-center mb-8">Select a field</h2>
			<FieldButtons />
			<button
				class="font-bold absolute top-4 right-4 cursor-pointer w-8 h-8 p-2 rounded block fill-slate-300 hover:fill-slate-600 transition-colors"
				@click="closeFieldsModal"
			>
				<Cross class="w-full h-full" />
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import FieldButtons from "@/components/FieldButtons.vue";
import Cross from "@/assets/cross.svg";
</script>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	methods: {
		closeFieldsModal() {
			const modal = document.querySelector(".fields-modal");
			if (modal) {
				modal.classList.add("hidden");
			}
		}
	}
});
</script>
