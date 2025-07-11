<template>
	<FormPreviewField>
		<template #preview>
			<div class="indiga-file-upload indiga-field" :style="computedWrapperFieldStyles">
				<label>
					<span class="indiga-label" :style="computedStyles"
						>{{ props.label }}<span v-if="props.required">*</span></span
					>
					<div class="indiga-note-wrapper">
						<span class="indiga-note">Maximum file size: {{ getFileSizeLimit() }}</span>
						<span class="indiga-note"
							>Acceptable file types: {{ getAcceptableFileTypes() }}</span
						>
					</div>
					<span class="wpcf7-form-control-wrap" data-name="file-936">
						<input
							type="file"
							size="40"
							class="wpcf7-form-control wpcf7-file"
							accept="audio/*,video/*,image/*"
							aria-invalid="false"
							name="file-936"
							disabled
							:style="computedFieldStyles"
						/>
					</span>
				</label>
			</div>
		</template>

		<template #options>
			<FieldOptionsFormWrapper :id="props.id" fieldType="File input">
				<TextInput
					:id="`label-${props.id}`"
					label="Label"
					:value="props.label || ''"
					:inputFunction="(value: any) => updateProps('label', value)"
				/>

				<Boolean
					:id="`required-${props.id}`"
					:isChecked="props.required"
					:changeFunction="(value: any) => updateProps('required', value)"
					label="Required"
				/>

				<NumberInput
					:id="`fileSizeLimit-${props.id}`"
					label="File Size Limit (KB)"
					:value="props.fileSizeLimit"
					:inputFunction="(value: any) => updateProps('fileSizeLimit', value)"
				/>

				<MultiSelect
					label="Allowed file types"
					:id="`fileTypes-${props.id}`"
					:options="
						fileTypesMap.map((type) => ({
							label: type.label,
							value: type.value,
							isSelected: props.fileTypes.includes(type.value)
						}))
					"
					:changeFunction="(arr: any) => updateProps('fileTypes', arr)"
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
import NumberInput from "../../components/propFormFields/NumberInput.vue";
import MultiSelect from "../../components/propFormFields/MultiSelect.vue";

interface Props {
	id: string;
	label?: string;
	required?: Boolean;
	fileTypes: string[];
	fileSizeLimit: number; // in KB
	currentForm: Form;
}

const props = defineProps<Props>();

const fileTypesMap = [
	{ label: "Image", value: "image/*" },
	{ label: "Plain text", value: "text/plain" },
	{
		label: "Word documents",
		value: "application/msword|application/vnd.openxmlformats-officedocument.wordprocessingml.document"
	},
	{ label: "PDF", value: "application/pdf" },
	{ label: "Audio", value: "audio/*" },
	{ label: "Video", value: "video/*" },
	{ label: "CSV", value: "text/csv" },
	{ label: "Excel", value: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
	{ label: "Zip folders", value: "application/zip" },
	{ label: "All files", value: "*" }
];

function getFileSizeLimit() {
	// if KB is greater than 1000, conver to MB
	if (props.fileSizeLimit >= 1000) {
		return `${(props.fileSizeLimit / 1000).toFixed(2).replace(".00", "")}MB`;
	}
	return `${props.fileSizeLimit}KB`;
}

function getAcceptableFileTypes() {
	if (props.fileTypes.length === 0) {
		return "All files";
	}
	return props.fileTypes
		.map((type) => {
			const foundType = fileTypesMap.find((t) => t.value === type);
			return foundType ? foundType.label : type;
		})
		.join(", ");
}

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

const computedWrapperFieldStyles = computed(() => {
	const inputStyles = props.currentForm.styles?.find((style) => style.label === "Input");
	return {
		"border-color": inputStyles?.properties.inputFieldBorderColor,
		"border-width": inputStyles?.properties.inputFieldBorderWidth + "px",
		"border-radius": inputStyles?.properties.inputFieldBorderRadius + "px",
		"padding-top": inputStyles?.properties.inputFieldPaddingTop + "px",
		"padding-bottom": inputStyles?.properties.inputFieldPaddingBottom + "px",
		"padding-left": inputStyles?.properties.inputFieldPaddingLeft + "px",
		"padding-right": inputStyles?.properties.inputFieldPaddingRight + "px",
		"border-style": inputStyles?.properties.inputFieldBorderStyle
	};
});

const updateFormField = inject<Function>("updateFormField");
function updateProps(propKey: string, value: any) {
	const newProps = {
		id: props.id,
		label: props.label,
		required: props.required,
		fileTypes: props.fileTypes,
		fileSizeLimit: props.fileSizeLimit,
		[propKey]: value
	};
	updateFormField?.(props.id, newProps);
}
</script>
