<template>
	<label class="flex items-center justify-between py-2 px-4 rounded">
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
import type { Form } from "../../data/types";

interface Props {
	label: string;
	unit: string;
	propKey: string;
	currentForm?: Form;
}

const props = defineProps<Props>();

const defaultValue = computed(() => {
	if (props.currentForm?.styles) {
		return props.currentForm.styles[props.propKey] || 0;
	}
});

const addStyle = inject<(style: Record<string, string>) => void>("addStyle");
function updateNumber(num: string) {
	const properties: Record<string, any> = {};
	properties[props.propKey] = num !== "" ? parseInt(num) : 0;
	addStyle?.(properties);
}
</script>
