<template>
	<div>
		<div class="relative">
			<p
				v-if="copied"
				class="copied bg-indigo-100 text-indigo-700 text-sm py-1 px-2 rounded-lg absolute -top-8 font-semibold -right-[13px]"
			>
				Copied!
			</p>
			<button
				class="rounded-lg bg-slate-200 p-2 hover:bg-slate-300 fill-slate-800 cursor-pointer transition"
				@click="copyToClipboard(props.copyText)"
			>
				<Copy class="w-6 h-6" />
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import Copy from "@/assets/copy.svg";
import { ref } from "vue";

interface Props {
	copyText: string;
}

const props = defineProps<Props>();

const copied = ref(false);

function copyToClipboard(value?: string) {
	// Create a temporary textarea element
	const textarea = document.createElement("textarea");
	textarea.value = value;
	document.body.appendChild(textarea);

	// Select the text and copy it
	textarea.select();
	textarea.setSelectionRange(0, 99999); // For mobile devices
	document.execCommand("copy");

	// Remove the textarea element
	document.body.removeChild(textarea);
	copied.value = true;

	setTimeout(() => {
		copied.value = false;
	}, 2000);
}
</script>

<style lang="scss" scoped>
.copied {
	opacity: 0;
	transform: translateY(6px);
	animation: fadeIn 0.2s ease-in-out forwards;
}

@keyframes fadeIn {
	0% {
		opacity: 0;
		transform: translateY(6px);
	}
	100% {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>
