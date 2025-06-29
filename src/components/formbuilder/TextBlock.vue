<template>
	<FormPreviewField>
		<template #preview>
			<p v-html="formatTextToHtml()"></p>
		</template>

		<template #options>
			<FieldOptionsFormWrapper :id="props.id" fieldType="">
				<TextArea
					:id="`text-${props.id}`"
					label="Text"
					:value="props.text"
					:inputFunction="(value) => updateProps('text', value)"
				/>
			</FieldOptionsFormWrapper>
		</template>
	</FormPreviewField>
</template>

<script setup lang="ts">
import { inject } from "vue";
import FieldOptionsFormWrapper from "@/components/FieldOptionsFormWrapper.vue";
import FormPreviewField from "@/components/FormPreviewField.vue";

import TextArea from "@/components/propFormFields/TextArea.vue";

interface Props {
	id: string;
	text?: string;
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
	const newProps = { ...props, [propKey]: value };
	updateFormField(props.id, newProps);
}
</script>
