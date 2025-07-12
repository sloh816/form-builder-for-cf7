<template>
	<FormPreviewField>
		<template #preview>
			<!-- <pre>{{ props }}</pre> -->

			<div class="indiga-field">
				<label :data-field-id="props.id">
					<span class="indiga-label" :style="computedStyles">
						{{ props.label }}<span v-if="props.required">*</span>
					</span>
					<span class="indiga-note-wrapper">
						<span v-if="props.minDate" class="indiga-note"
							>Minimum date: {{ formatDate(props.minDate) }}</span
						>
						<span v-if="props.maxDate" class="indiga-note"
							>Maximum date: {{ formatDate(props.maxDate) }}</span
						>
					</span>
					<p>
						<span class="wpcf7-form-control-wrap" :data-name="props.id">
							<input
								class="wpcf7-form-control wpcf7-date wpcf7-validates-as-date"
								aria-invalid="false"
								value=""
								type="date"
								:name="props.id"
								:min="props.minDate"
								:max="props.maxDate"
								:style="computedFieldStyles"
							/>
						</span>
					</p>
				</label>
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

				<DateInput
					:id="`min-date-${props.id}`"
					label="Min date"
					:value="props.minDate"
					:inputFunction="(value: any) => updateProps('minDate', value)"
				/>

				<DateInput
					:id="`max-date-${props.id}`"
					label="Max date"
					:value="props.maxDate"
					:inputFunction="(value: any) => updateProps('maxDate', value)"
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
import { inject } from "vue";
import FieldOptionsFormWrapper from "../../components/FieldOptionsFormWrapper.vue";
import FormPreviewField from "../../components/FormPreviewField.vue";
import type { Form } from "../../data/types";

import TextInput from "../../components/propFormFields/TextInput.vue";
import Boolean from "../../components/propFormFields/Boolean.vue";
import DateInput from "../../components/propFormFields/DateInput.vue";

interface Props {
	id: string;
	label?: string;
	required?: Boolean;
	minDate?: string;
	maxDate?: string;
	currentForm: Form;
}

const props = defineProps<Props>();
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

const updateFormField = inject<Function>("updateFormField");
function updateProps(propKey: string, value: any) {
	const newProps = {
		id: props.id,
		label: props.label,
		required: props.required,
		minDate: props.minDate,
		maxDate: props.maxDate,
		[propKey]: value
	};
	updateFormField?.(props.id, newProps);
}

function formatDate(date: string): string {
	// formate YYYY-MM-DD to Date Month Year
	// e.g. 2023-10-01 to 1 October 2023
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	];
	const [year, month, day] = date.split("-");
	const monthIndex = parseInt(month, 10) - 1; // Convert month to zero-based index
	return `${parseInt(day, 10)} ${months[monthIndex]} ${year}`;
}
</script>
