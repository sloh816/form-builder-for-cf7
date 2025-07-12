<template>
	<FormPreviewField>
		<template #preview>
			<p>
				<input
					class="wpcf7-form-control wpcf7-submit has-spinner"
					type="submit"
					:value="props.label"
					disabled
					:style="computedStyles"
				/>
				<span class="wpcf7-spinner"></span>
			</p>
		</template>

		<template #options>
			<FieldOptionsFormWrapper :id="props.id" fieldType="Submit button">
				<TextInput
					:id="`label-${props.id}`"
					label="Label"
					:value="props.label"
					:inputFunction="(value: any) => updateProps('label', value)"
				/>
			</FieldOptionsFormWrapper>
		</template>
	</FormPreviewField>
</template>

<script setup lang="ts">
import { inject } from "vue";
import FieldOptionsFormWrapper from "../../components/FieldOptionsFormWrapper.vue";
import FormPreviewField from "../../components/FormPreviewField.vue";

import TextInput from "../../components/propFormFields/TextInput.vue";

interface Props {
	id: string;
	label: string;
}

const props = defineProps<Props>();
const getComputedStyles = inject<Function>("getComputedStyles");

const computedStyles = getComputedStyles?.([
	{ "font-weight": "buttonBold" },
	{ "font-size": "buttonFontSize" },
	{ "background-color": "buttonBackgroundColor" },
	{ color: "buttonLabelColor" },
	{ "padding-top": "buttonPaddingTop" },
	{ "padding-right": "buttonPaddingRight" },
	{ "padding-bottom": "buttonPaddingBottom" },
	{ "padding-left": "buttonPaddingLeft" },
	{ "border-radius": "buttonBorderRadius" },
	{ width: "buttonWidth" }
]);

const updateFormField = inject<Function>("updateFormField");
function updateProps(propKey: string, value: any) {
	const newProps = { ...props, [propKey]: value };
	updateFormField?.(props.id, newProps);
}
</script>
