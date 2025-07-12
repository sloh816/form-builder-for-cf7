<template>
	<label class="flex items-center justify-between py-2 px-4 rounded">
		<span>{{ props.label }}</span>
		<select
			class="style-option-dropdown border w-24 rounded border-slate-600 p-2 cursor-pointer bg-white"
			@change="(e) => updateValue(e.target as HTMLSelectElement)"
		>
			<option
				v-for="option in props.options"
				:value="option"
				:key="option"
				:selected="defaultValue === option"
			>
				{{ option }}
			</option>
		</select>
	</label>
</template>

<script setup lang="ts">
import { inject, computed } from "vue";
import type { Form, Style } from "../../data/types";

interface Props {
	label: string;
	propKey: string;
	currentForm?: Form;
	options: string[];
}

const props = defineProps<Props>();

const defaultValue = computed(() => {
	if (props.currentForm?.styles) {
		return props.currentForm.styles[props.propKey];
	}
});

const addStyle = inject<(style: Style) => void>("addStyle");
function updateValue(select: HTMLSelectElement) {
	const properties: Record<string, any> = {};
	properties[props.propKey] = select.value;
	addStyle?.(properties);
}
</script>
