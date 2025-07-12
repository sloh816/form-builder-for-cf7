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

const computedWrapperFieldStyles = getComputedStyles([
	{ "border-color": "inputFieldBorderColor" },
	{ "border-width": "inputFieldBorderWidth" },
	{ "border-radius": "inputFieldBorderRadius" },
	{ "padding-top": "inputFieldPaddingTop" },
	{ "padding-bottom": "inputFieldPaddingBottom" },
	{ "padding-left": "inputFieldPaddingLeft" },
	{ "padding-right": "inputFieldPaddingRight" },
	{ "border-style": "inputFieldBorderStyle" }
]);

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
