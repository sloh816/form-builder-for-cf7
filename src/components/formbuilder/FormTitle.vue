<template>
	<FormPreviewField>
		<template #preview>
			<p class="text-3xl" :style="computedStyles">{{ props.title }}</p>
		</template>

		<template #options>
			<FieldOptionsFormWrapper :id="props.id" fieldType="Form title">
				<SelectOptions
					:id="`heading-level-${props.id}`"
					label="Heading Level"
					:options="[
						{ label: 'H1', value: '1', isSelected: props.headingLevel === 1 },
						{ label: 'H2', value: '2', isSelected: props.headingLevel === 2 },
						{ label: 'H3', value: '3', isSelected: props.headingLevel === 3 }
					]"
					:changeFunction="(value: any) => updateHeadingLevel(value)"
				/>
			</FieldOptionsFormWrapper>
		</template>
	</FormPreviewField>
</template>

<script setup lang="ts">
import { inject } from "vue";
import FieldOptionsFormWrapper from "../../components/FieldOptionsFormWrapper.vue";
import SelectOptions from "../../components/propFormFields/SelectOptions.vue";
import FormPreviewField from "../../components/FormPreviewField.vue";
import type { Form } from "../../data/types";

interface Props {
	title: string;
	headingLevel?: number;
	id: string;
	currentForm: Form;
}

const props = defineProps<Props>();

const updateFormField = inject<Function>("updateFormField");
function updateHeadingLevel(level: string) {
	const newHeadingLevel = parseInt(level);
	const newProps = {
		title: props.title,
		id: props.id,
		headingLevel: newHeadingLevel
	};

	updateFormField?.(props.id, newProps);
}

const getComputedStyles = inject<Function>("getComputedStyles");

const computedStyles = getComputedStyles?.([
	{ "font-size": "formTitleFontSize" },
	{ color: "formTitleColor" },
	{ "font-weight": "formTitleBold" }
]);
</script>
