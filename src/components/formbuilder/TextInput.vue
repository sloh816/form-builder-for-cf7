<template>
	<FormPreviewField>
		<template #preview>
			<label :data-field-id="props.id">
				<span class="indiga-label" :style="computedStyles"
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
						:style="computedFieldStyles"
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
					:inputFunction="(value: any) => updateProps('label', value)"
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
					:changeFunction="(value: any) => updateProps('type', value)"
				/>

				<TextInput
					:id="`placeholder-${props.id}`"
					label="Placeholder"
					:value="props.placeholder || ''"
					:inputFunction="(value: any) => updateProps('placeholder', value)"
				/>

				<Boolean
					:id="`required-${props.id}`"
					:isChecked="props.required"
					:changeFunction="(value: any) => updateProps('required', value)"
					label="Required"
				/>
			</FieldOptionsFormWrapper>
		</template>
	</FormPreviewField>
</template>

<script setup lang="ts">
import TextInput from "../../components/propFormFields/TextInput.vue";
import Boolean from "../../components/propFormFields/Boolean.vue";
import RadioButtons from "../../components/propFormFields/RadioButtons.vue";
import FieldOptionsFormWrapper from "../../components/FieldOptionsFormWrapper.vue";
import FormPreviewField from "../../components/FormPreviewField.vue";
import { inject } from "vue";
import type { Form } from "../../data/types";

interface Props {
	label: string;
	type?: string;
	placeholder?: string;
	required?: Boolean;
	id: string;
	currentForm: Form;
}

const props = defineProps<Props>();

const updateFormField = inject<Function>("updateFormField");
const getComputedStyles = inject<Function>("getComputedStyles");

const computedStyles = getComputedStyles?.([
	{ "font-size": "labelFontSize" },
	{ color: "labelColor" },
	{ "font-weight": "labelBold" }
]);

const computedFieldStyles = getComputedStyles?.([
	{ "border-color": "textFieldBorderColor" },
	{ "border-width": "textFieldBorderWidth" },
	{ "border-radius": "textFieldBorderRadius" },
	{ "padding-top": "textFieldPaddingTop" },
	{ "padding-bottom": "textFieldPaddingBottom" },
	{ "padding-left": "textFieldPaddingLeft" },
	{ "padding-right": "textFieldPaddingRight" },
	{ "font-size": "textFieldFontSize" },
	{ color: "textFieldColor" },
	{ "background-color": "textFieldBackgroundColor" },
	{ "font-weight": "textFieldBold" },
	{ "border-style": "textFieldBorderStyle" }
]);

function updateProps(propKey: keyof Props, value: any) {
	const newProps = {
		label: props.label,
		type: props.type,
		placeholder: props.placeholder,
		required: props.required,
		id: props.id
	} as Record<string, any>;
	newProps[propKey] = value;
	updateFormField?.(props.id, newProps);
}
</script>
