<template>
	<label class="flex items-center justify-between py-2 px-4 rounded">
		<span>{{ props.label }}</span>
		<div class="flex items-center gap-2">
			<div
				class="border w-16 rounded border-slate-600 px-2"
				:style="`background-color:${defaultValue}`"
			>
				<input
					type="color"
					:value="defaultValue"
					class="opacity-0 cursor-pointer"
					@input="(e) => changeColor((e.target as HTMLInputElement).value)"
				/>
			</div>
			<button
				class="text-sm bg-slate-400 p-1 rounded-full cursor-pointer"
				@click="changeColor('transparent')"
			>
				<CrossIcon class="w-2 h-2 fill-indigo-100" />
			</button>
		</div>
	</label>
</template>

<script setup lang="ts">
import { inject, computed } from "vue";
import type { Form } from "../../data/types";
import CrossIcon from "../../assets/cross.svg";

interface Props {
	label: string;
	currentForm?: Form;
	propKey: string;
}

const props = defineProps<Props>();

const defaultValue = computed(() => {
	if (props.currentForm?.styles) {
		return props.currentForm.styles[props.propKey] || "transparent";
	}
});

const addStyle = inject<(style: Record<string, string>) => void>("addStyle");
function changeColor(color: string) {
	const properties: Record<string, any> = {};
	properties[props.propKey] = color;
	addStyle?.(properties);
}
</script>
