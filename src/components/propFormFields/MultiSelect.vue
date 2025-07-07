<template>
	<div class="checkbox-group">
		<p class="font-bold mb-2">{{ props.label }}</p>
		<div class="flex gap-x-4 flex-wrap">
			<label v-for="option in props.options">
				<input
					type="checkbox"
					:name="`${props.id}-${option.value}`"
					:value="option.value"
					:checked="option.isSelected"
					@change="(e) => handleChange((e.target as HTMLInputElement))"
				/>
				<span class="ml-2"> {{ option.label }}</span>
			</label>
		</div>
	</div>
</template>

<script setup lang="ts">
interface Option {
	label: string;
	value?: string;
	isSelected: boolean | undefined;
}

interface Props {
	label?: string;
	id: string;
	options: Option[];
	changeFunction: Function;
}

const props = defineProps<Props>();

function handleChange(event: HTMLInputElement) {
	const checkboxGroup = event.closest(".checkbox-group");
	if (!checkboxGroup) return;
	const checkboxes = checkboxGroup.querySelectorAll("input[type='checkbox']");
	const selected: string[] = [];
	checkboxes.forEach((checkbox) => {
		const isChecked = (checkbox as HTMLInputElement).checked;
		const value = (checkbox as HTMLInputElement).value;
		if (isChecked) {
			selected.push(value);
		}
	});

	props.changeFunction(selected);
}
</script>

<style scoped></style>
