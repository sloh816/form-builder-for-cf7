<template>
	<label
		:class="`flex items-center justify-between py-2 px-4 rounded${
			shaded ? ' bg-indigo-50' : ''
		}`"
	>
		<span>{{ props.label }}</span>
		<div>
			<input
				type="number"
				class="border w-16 rounded border-slate-600 px-2 py-1 bg-white"
				:value="defaultValue"
				@input="(e) => updateNumber((e.target as HTMLInputElement).value)"
			/>
			<span class="ml-2">{{ props.unit }}</span>
		</div>
	</label>
</template>

<script setup lang="ts">
import { computed, inject } from "vue";

interface FormField {
	component: string;
	props: Record<string, any>;
}

interface Style {
	label: string;
	properties: Record<string, any>;
}

interface Form {
	id: string;
	name: string;
	email: string;
	domain?: string;
	subject?: string;
	introText?: string;
	fields: FormField[];
	styles?: Style[];
}

interface Props {
	label: string;
	shaded: boolean;
	unit: string;
	section: string;
	propKey: string;
	currentForm?: Form;
}

const props = defineProps<Props>();

const defaultValue = computed(() => {
	if (props.currentForm?.styles) {
		const style = props.currentForm.styles.find((style) => style.label === props.section);
		if (style && style.properties[props.propKey]) {
			return style.properties[props.propKey];
		}
	}
	return props.defaultValue || 0;
});

const addStyle = inject<(Style) => void>("addStyle");
function updateNumber(num: string) {
	const properties: Record<string, any> = {};
	properties[props.propKey] = num;

	if (addStyle) {
		addStyle({
			label: props.section,
			properties: properties
		});
	}
}
</script>
