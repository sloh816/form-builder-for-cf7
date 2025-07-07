<template>
	<label class="flex items-center justify-between py-2 px-4 rounded">
		<span>{{ props.label }}</span>
		<div>
			<input
				type="checkbox"
				class="border rounded border-slate-600 w-8 h-8 bg-white cursor-pointer hidden"
				@input="(e) => updateNumber((e.target as HTMLInputElement).value)"
				:checked="def === 'true' ? true : false"
			/>
			<div data-checked="false" :id="componentId">
				<button class="indiga-toggle-switch-button" type="button">
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
	section: string;
	propKey: string;
	currentForm?: Form;
	defaultValue?: string;
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
	const input = toggleWrapper.previousElementSibling as HTMLInputElement;

	const setCheckedState = () => {
		if (input.checked) {
			toggleWrapper.setAttribute("data-checked", "true");
		} else {
			toggleWrapper.setAttribute("data-checked", "false");
		}
	};

	setCheckedState();
	toggleButton?.addEventListener("click", () => {
		input.checked = !input.checked;
		setCheckedState();
	});
});

const addStyle = inject<(style: Style) => void>("addStyle");
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
