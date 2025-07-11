<template>
	<FormPreviewField>
		<template #preview>
			<!-- <pre>{{ props }}</pre> -->

			<div class="indiga-toggle-switch" :data-field-id="props.id">
				<p class="indiga-label" :style="computedStyles">
					{{ props.label }}<span v-if="props.required">*</span>
				</p>

				<span class="wpcf7-form-control-wrap" :data-name="props.id">
					<span class="text-sm text-red-500"
						>If this is showing as a radio button, try save and refresh the page.</span
					>
					<span class="wpcf7-form-control wpcf7-radio">
						<span class="wpcf7-list-item first">
							<label>
								<input type="radio" name="radio-18" :value="props.onLabel" />
								<span class="wpcf7-list-item-label">{{ props.onLabel }}</span>
							</label>
						</span>
						<span class="wpcf7-list-item last">
							<label>
								<input
									type="radio"
									name="radio-18"
									:value="props.offLabel"
									checked
								/>
								<span class="wpcf7-list-item-label">{{ props.offLabel }}</span>
							</label>
						</span>
					</span>
				</span>

				<div
					class="indiga-toggle-switch-button-wrapper"
					:data-checked="props.default ? 'true' : 'false'"
					style="display: none"
				>
					<button
						class="indiga-toggle-switch-button"
						:aria-label="`Toggle ${props.label} `"
						:aria-description="`Currently toggled: ${
							props.default ? props.onLabel : props.offLabel
						}`"
						type="button"
					>
						<span class="indiga-toggle-switch-button-inner"></span>
					</button>
					<span class="indiga-toggle-button-label">{{
						props.default ? props.onLabel : props.offLabel
					}}</span>
				</div>
			</div>
		</template>

		<template #options>
			<FieldOptionsFormWrapper :id="props.id" fieldType="Toggle Switch">
				<p class="text-sm bg-yellow-100 p-2 rounded-lg">
					<strong>Note:</strong> This toggle switch relies on JavaScript to function
					properly. Without JavaScript, it will display as standard radio buttons. The
					necessary JavaScript code will be generated and must be added to your WordPress
					site for full functionality.
				</p>
				<TextInput
					:id="`label-${props.id}`"
					label="Label"
					:value="props.label"
					:inputFunction="(value: any) => updateProps('label', value)"
				/>

				<TextInput
					:id="`onLabel-${props.id}`"
					label="On Label"
					:value="props.onLabel"
					:inputFunction="(value: any) => updateProps('onLabel', value)"
				/>

				<TextInput
					:id="`offLabel-${props.id}`"
					label="Off Label"
					:value="props.offLabel"
					:inputFunction="(value: any) => updateProps('offLabel', value)"
				/>

				<Boolean
					:id="`default-${props.id}`"
					:isChecked="props.default"
					:changeFunction="(value: any) => updateProps('default', value)"
					label="Default on?"
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

interface Props {
	id: string;
	label: string;
	required?: Boolean;
	onLabel: string;
	offLabel: string;
	default: boolean | undefined;
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

const updateFormField = inject<Function>("updateFormField");
function updateProps(propKey: string, value: any) {
	const newProps = {
		id: props.id,
		label: props.label,
		required: props.required,
		onLabel: props.onLabel,
		offLabel: props.offLabel,
		default: props.default,
		[propKey]: value
	};
	updateFormField?.(props.id, newProps);
}
</script>
