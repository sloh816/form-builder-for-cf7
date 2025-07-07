<template>
	<label
		:class="`flex items-center justify-between py-2 px-4 rounded${
			shaded ? ' bg-indigo-50' : ''
		}`"
	>
		<span>{{ props.label }}</span>
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
	</label>
</template>

<script setup lang="ts">
import { inject, computed } from "vue";
import type { Form, Style } from "../../data/types";

interface Props {
	label: string;
	currentForm?: Form;
	shaded: boolean;
	section: string;
	propKey: string;
}

const props = defineProps<Props>();

const defaultValue = computed(() => {
	if (props.currentForm?.styles) {
		const style = props.currentForm.styles.find((style) => style.label === props.section);
		if (style && style.properties[props.propKey]) {
			return style.properties[props.propKey];
		}
	}
});

const addStyle = inject<(style: Style) => void>("addStyle");
function changeColor(color: string) {
	const properties: Record<string, any> = {};
	properties[props.propKey] = color;

	if (addStyle) {
		addStyle({
			label: props.section,
			properties: properties
		});
	}
}
</script>
