<template>
	<FormPreviewField>
		<template #preview>
			<label :data-field-id="props.id">
				<span class="indiga-label"
					>{{ props.label }}<span v-if="props.required">*</span></span
				>

				<span class="wpcf7-form-control-wrap" :data-name="props.id">
					<input
						size="40"
						maxlength="400"
						class="wpcf7-form-control wpcf7-text pointer-events-none"
						aria-invalid="false"
						value=""
						type="text"
						:name="props.id"
						:placeholder="props.placeholder"
						:id="props.id"
						disabled
					/>
				</span>
			</label>
		</template>
		<template #options>
			<FieldOptionsFormWrapper :id="props.id" fieldType="Text input">
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

				<TextInput
					:id="`placeholder-${props.id}`"
					label="Placeholder"
					:value="props.placeholder"
					:inputFunction="(value) => updateProps('placeholder', value)"
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
import RadioButtons from "@/components/propFormFields/RadioButtons.vue";
import FieldOptionsFormWrapper from "@/components/FieldOptionsFormWrapper.vue";
import FormPreviewField from "@/components/FormPreviewField.vue";
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
