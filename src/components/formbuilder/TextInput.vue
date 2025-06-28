<template>
	<!-- <pre>{{ props }}</pre> -->
	<form class="field-options border border-slate-300 shadow-md rounded p-4">
		<TextInput
			:id="`label-${props.id}`"
			label="Label"
			:value="props.label"
			:inputFunction="(value) => updateProps('label', value)"
		/>

		<RadioButtons
			:id="`type-${props.id}`"
			label="Input type"
			:options="[
				{ label: 'Name', isChecked: props.type === 'name', value: 'name' },
				{ label: 'Email', isChecked: props.type === 'email', value: 'email' },
				{ label: 'Phone', isChecked: props.type === 'phone', value: 'phone' },
				{ label: 'Other', isChecked: props.type === 'text', value: 'text' }
			]"
			:changeFunction="(value) => updateProps('type', value)"
		/>

		<Boolean
			:id="`required-${props.id}`"
			:isChecked="props.required"
			:changeFunction="(value) => updateProps('required', value)"
			label="Required"
		/>

		<TextInput
			:id="`placeholder-${props.id}`"
			label="Placeholder"
			:value="props.placeholder"
			:inputFunction="(value) => updateProps('placeholder', value)"
		/>

		<TextInput
			:id="`id-${props.id}`"
			label="Field ID"
			:value="props.id"
			:inputFunction="(value) => updateProps('id', value)"
		/>

		<DeleteFieldButton :id="props.id" />
	</form>
</template>

<script setup lang="ts">
import DeleteFieldButton from "@/components/DeleteFieldButton.vue";
import TextInput from "@/components/propFormFields/TextInput.vue";
import Boolean from "@/components/propFormFields/Boolean.vue";
import RadioButtons from "@/components/propFormFields/RadioButtons.vue";
import { ref, inject } from "vue";

interface Props {
	label: string;
	type?: string;
	placeholder?: string;
	required?: True | false;
	id?: string;
}

const props = defineProps<Props>();

const updateFormField = inject<Function>("updateFormField");

function updateProps(propKey: string, value: any) {
	const newProps = { ...props };
	newProps[propKey] = value;
	updateFormField?.(props.id, newProps);
}
</script>
