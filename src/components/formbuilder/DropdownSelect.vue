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

const getComputedStyles = inject<Function>("getComputedStyles");

const computedStyles = getComputedStyles([
	{ "font-size": "labelFontSize" },
	{ color: "labelColor" },
	{ "font-weight": "labelBold" }
]);

const computedFieldStyles = getComputedStyles([
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
