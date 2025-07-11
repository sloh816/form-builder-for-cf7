<template>
	<FormPreviewField>
		<template #preview>
			<!-- <pre>{{ props }}</pre> -->
			<div class="indiga-field">
				<p class="indiga-label" :style="computedStyles">
					{{ props.label }}<span v-if="props.required">*</span>
				</p>
				<p>
					<span class="wpcf7-form-control-wrap" :data-name="props.id">
						<select
							class="wpcf7-form-control wpcf7-select"
							aria-invalid="false"
							:name="props.id"
							:style="computedFieldStyles"
						>
							<option v-for="option in options" :value="option">{{ option }}</option>
						</select>
					</span>
				</p>
			</div>
		</template>

		<template #options>
			<FieldOptionsFormWrapper :id="props.id" fieldType="">
				<TextInput
					:id="`label-${props.id}`"
					label="Label"
					:value="props.label"
					:inputFunction="(value: any) => updateProps('label', value)"
				/>

				<TextArea
					:id="`options-${props.id}`"
					label="Options"
					description="One line per option"
					:value="props.options?.join('\n').trim()"
					:inputFunction="(value: any) => updateOptions(value)"
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
import { inject, computed } from "vue";
import FieldOptionsFormWrapper from "../../components/FieldOptionsFormWrapper.vue";
import FormPreviewField from "../../components/FormPreviewField.vue";
import type { Form } from "../../data/types";

import TextInput from "../../components/propFormFields/TextInput.vue";
import Boolean from "../../components/propFormFields/Boolean.vue";
import TextArea from "../../components/propFormFields/TextArea.vue";

interface Props {
	id: string;
	label?: string;
	required?: Boolean;
	options: String[];
	currentForm: Form;
}

const props = defineProps<Props>();

const computedStyles = computed(() => {
	const textStyles = props.currentForm.styles?.find((style) => style.label === "Text");
	return {
		"font-size": textStyles?.properties.labelFontSize + "px",
		color: textStyles?.properties.labelColor,
		"font-weight": textStyles?.properties.labelBold
	};
});

const computedFieldStyles = computed(() => {
	const inputStyles = props.currentForm.styles?.find((style) => style.label === "Input");
	return {
		"border-color": inputStyles?.properties.textFieldBorderColor,
		"border-width": inputStyles?.properties.textFieldBorderWidth + "px",
		"border-radius": inputStyles?.properties.textFieldBorderRadius + "px",
		"padding-top": inputStyles?.properties.textFieldPaddingTop + "px",
		"padding-bottom": inputStyles?.properties.textFieldPaddingBottom + "px",
		"padding-left": inputStyles?.properties.textFieldPaddingLeft + "px",
		"padding-right": inputStyles?.properties.textFieldPaddingRight + "px",
		"font-size": inputStyles?.properties.textFieldFontSize + "px",
		color: inputStyles?.properties.textFieldColor,
		"background-color": inputStyles?.properties.textFieldBackgroundColor,
		"font-weight": inputStyles?.properties.textFieldBold,
		"border-style": inputStyles?.properties.textFieldBorderStyle
	};
});

const updateFormField = inject<Function>("updateFormField");
function updateProps(propKey: string, value: any) {
	const newProps = { ...props, [propKey]: value };
	updateFormField?.(props.id, newProps);
}

function updateOptions(value: string) {
	const optionsArray = value
		.split("\n")
		.map((option) => option.trim())
		.filter((option) => option);
	const newProps = { ...props, options: optionsArray };
	updateFormField?.(props.id, newProps);
}
</script>
