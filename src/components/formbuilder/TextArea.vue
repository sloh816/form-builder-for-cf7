<template>
	<FormPreviewField>
		<template #preview>
			<label>
				<span class="indiga-label"
					>{{ props.label }}<span v-if="props.required">*</span></span
				>
				<span class="wpcf7-form-control-wrap" data-name="textarea-210">
					<textarea
						cols="40"
						:maxlength="props.maxlength ?? null"
						:rows="props.rows"
						class="wpcf7-form-control wpcf7-textarea pointer-events-none"
						aria-invalid="false"
						name="textarea-210"
						:placeholder="props.placeholder"
						disabled
					></textarea>
				</span>
			</label>
		</template>
		<template #options>
			<FieldOptionsFormWrapper :id="props.id" fieldType="Text area">
				<TextInput
					:id="`label-${props.id}`"
					label="Label"
					:value="props.label"
					:inputFunction="(value) => updateProps('label', value)"
				/>

				<TextInput
					:id="`placeholder-${props.id}`"
					label="Placeholder"
					:value="props.placeholder"
					:inputFunction="(value) => updateProps('placeholder', value)"
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
					:value="props.maxlength ?? null"
					:inputFunction="(value) => updateProps('maxlength', value)"
					description="Maximum number of characters allowed"
				/>

				<Boolean
					:id="`required-${props.id}`"
					:isChecked="props.required"
					:changeFunction="(value) => updateProps('required', value)"
					label="Required"
				/>

				<TextInput
					:id="`id-${props.id}`"
					label="Field ID"
					:value="props.id"
					:inputFunction="(value) => updateProps('id', value)"
				/>
			</FieldOptionsFormWrapper>
		</template>
	</FormPreviewField>
</template>

<script setup lang="ts">
import DeleteFieldButton from "@/components/DeleteFieldButton.vue";
import TextInput from "@/components/propFormFields/TextInput.vue";
import Boolean from "@/components/propFormFields/Boolean.vue";
import NumberInput from "@/components/propFormFields/NumberInput.vue";
import FieldOptionsFormWrapper from "@/components/FieldOptionsFormWrapper.vue";
import FormPreviewField from "@/components/FormPreviewField.vue";
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
