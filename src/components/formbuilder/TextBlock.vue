<template>
	<FormPreviewField>
		<template #preview>
			<p v-html="formatTextToHtml()" :style="computedStyles"></p>
		</template>

		<template #options>
			<FieldOptionsFormWrapper :id="props.id" fieldType="Text block">
				<TextArea
					:id="`text-${props.id}`"
					label="Text"
					:value="props.text || ''"
					:inputFunction="(value:any) => updateProps('text', value)"
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

import TextArea from "../../components/propFormFields/TextArea.vue";

interface Props {
	id: string;
	text?: string;
	currentForm: Form;
}

const props = defineProps<Props>();

function formatTextToHtml() {
	// Convert newlines to <br> tags
	if (props.text) {
		return props.text.replace(/\n/g, "<br>");
	} else {
		return "";
	}
}

const updateFormField = inject<Function>("updateFormField");
function updateProps(propKey: string, value: any) {
	const newProps = {
		id: props.id,
		text: props.text,
		[propKey]: value
	};
	updateFormField?.(props.id, newProps);
}

const getComputedStyles = inject<Function>("getComputedStyles");
const computedStyles = getComputedStyles([
	{ "font-size": "textBlockFontSize" },
	{ color: "textBlockColor" },
	{ "background-color": "textBlockBackgroundColor" },
	{ "padding-top": "textBlockPaddingTop" },
	{ "padding-right": "textBlockPaddingRight" },
	{ "padding-bottom": "textBlockPaddingBottom" },
	{ "padding-left": "textBlockPaddingLeft" },
	{ "border-radius": "textBlockBorderRadius" }
]);
</script>
