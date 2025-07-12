<template>
	<label class="flex items-center justify-between py-2 px-4 rounded">
		<span>{{ props.label }}</span>
		<div class="style-option-toggle">
			<div :data-checked="def" :id="componentId">
				<button
					class="indiga-toggle-switch-button"
					type="button"
					@click="(e) => updateValue((e.currentTarget as HTMLButtonElement))"
				>
					<span class="indiga-toggle-switch-button-inner"></span>
				</button>
			</div>
		</div>
	</label>
</template>

<script setup lang="ts">
import { computed, inject, onMounted } from "vue";
import type { Form, Style } from "../../data/types";

interface Props {
	label: string;
	propKey: string;
	currentForm?: Form;
	defaultValue?: string;
	trueValue?: string;
	falseValue?: string;
}

const props = defineProps<Props>();
const def = props.defaultValue || "false";
const componentId = computed(() =>
	`${props.label}-${props.propKey}-${crypto.randomUUID().substring(2, 8)}`
		.replace(/\s+/g, "-")
		.toLowerCase()
);

onMounted(() => {
	const toggleWrapper = document.getElementById(componentId.value) as HTMLDivElement;
	const toggleButton = toggleWrapper.querySelector("button") as HTMLButtonElement;

	const setCheckedState = () => {
		const isChecked = toggleWrapper.getAttribute("data-checked") === "true";
		if (isChecked) {
			toggleWrapper.setAttribute("data-checked", "false");
		} else {
			toggleWrapper.setAttribute("data-checked", "true");
		}
	};
	// setCheckedState();
	toggleButton?.addEventListener("click", () => setCheckedState());
});

const addStyle = inject<(style: Style) => void>("addStyle");
function updateValue(button: HTMLButtonElement) {
	const toggleWrapper = button.parentElement as HTMLDivElement;
	const checkedValue = !(toggleWrapper.getAttribute("data-checked") === "true");
	const trueValue = props.trueValue || "true";
	const falseValue = props.falseValue || "false";

	const properties: Record<string, any> = {};
	const value = checkedValue ? trueValue : falseValue;
	properties[props.propKey] = value;
	addStyle?.(properties);
}
</script>
