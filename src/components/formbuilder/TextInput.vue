<template>
	<FormFieldWrapper>
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
			/>
		</div>
	</FormFieldWrapper>
</template>

<script setup lang="ts">
import FormFieldWrapper from "@/components/FormFieldWrapper.vue";

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
</script>
