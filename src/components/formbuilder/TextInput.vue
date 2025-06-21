<template>
	<button
		class="text-left rounded hover:outline outline-indigo-700 outline-offset-8 cursor-pointer"
		type="button"
		@click="handleClick"
	>
		<div class="form-field text-input">
			<label :for="name" :style="labelStyle">{{ label }}</label>
			<input
				:style="inputStyle"
				type="text"
				size="40"
				maxlength="400"
				class="wpcf7-form-control wpcf7-text"
				aria-invalid="false"
				:name="name"
				:id="name"
				disabled
			/>
		</div>
	</button>
</template>

<script setup lang="ts">
interface Props {
	label: string;
	name: string;
	labelStyle: Object | string;
	inputStyle: Object | string;
}

const props = withDefaults(defineProps<Props>(), {
	labelStyle: "font-weight: bold; margin-bottom: 4px; display: block",
	inputStyle: "width: 100%; border: 1px solid #ccc; padding: 8px; border-radius: 4px"
});

function handleClick() {
	// This function can be used to handle click events if needed
	console.log(`Text input with label "${props.label}" clicked.`);
}
</script>
