<template>
	<div>
		<FieldOptionsFormWrapper :id="props.id">
			<TextInput
				:id="`label-${props.id}`"
				label="Label"
				:value="props.label"
				:inputFunction="(value) => updateProps('label', value)"
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

			<NumberInput
				:id="`id-${props.id}`"
				label="Rows"
				:value="props.rows"
				:inputFunction="(value) => updateProps('rows', value)"
				description="Height of the text area in lines"
			/>

			<NumberInput
				:id="`id-${props.id}`"
				label="Max Length"
				:value="props.maxlength"
				:inputFunction="(value) => updateProps('maxlength', value)"
				description="Maximum number of characters allowed"
			/>
		</FieldOptionsFormWrapper>
	</div>
</template>

<script setup lang="ts">
import DeleteFieldButton from "@/components/DeleteFieldButton.vue";
import TextInput from "@/components/propFormFields/TextInput.vue";
import Boolean from "@/components/propFormFields/Boolean.vue";
import NumberInput from "@/components/propFormFields/NumberInput.vue";
import FieldOptionsFormWrapper from "@/components/FieldOptionsFormWrapper.vue";
import { inject } from "vue";

interface Props {
	label?: string;
	placeholder?: string;
	required?: True | false;
	rows?: number;
	maxlength?: number;
	id?: string;
}

const props = defineProps<Props>();

const updateFormField = inject<Function>("updateFormField");
function updateProps(key: string, value: any) {
	if (updateFormField) {
		updateFormField(props.id, { ...props, [key]: value });
	}
}
</script>

<style scoped></style>
