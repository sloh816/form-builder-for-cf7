<template>
	<FormPreviewField>
		<template #preview>
			<p class="text-2xl mt-4" :style="computedStyles">{{ props.heading }}</p>
		</template>

		<template #options>
			<FieldOptionsFormWrapper :id="props.id" fieldType="Heading">
				<TextInput
					:id="`heading-${props.id}`"
					label="Heading Text"
					:value="props.heading"
					:inputFunction="(value: any) => updateHeadingText(value)"
				/>

				<SelectOptions
					:id="`heading-level-${props.id}`"
					label="Heading Level"
					:options="[
						{ label: 'H1', value: '1', isSelected: props.headingLevel === 1 },
						{ label: 'H2', value: '2', isSelected: props.headingLevel === 2 },
						{ label: 'H3', value: '3', isSelected: props.headingLevel === 3 },
						{ label: 'H4', value: '4', isSelected: props.headingLevel === 4 }
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
import TextInput from "../../components/propFormFields/TextInput.vue";
import FormPreviewField from "../../components/FormPreviewField.vue";
import type { Form } from "../../data/types"; // Adjust the import path as necessary

interface Props {
	heading: string;
	headingLevel?: number;
	id: string;
	currentForm: Form;
}

const props = defineProps<Props>();

const updateFormField = inject<Function>("updateFormField");

function updateHeadingLevel(level: string) {
	const newHeadingLevel = parseInt(level);
	const newProps = {
		heading: props.heading,
		id: props.id,
		headingLevel: newHeadingLevel
	};

	updateFormField?.(props.id, newProps);
}

function updateHeadingText(text: string) {
	const newProps = {
		id: props.id,
		headingLevel: props.headingLevel,
		heading: text
	};

	updateFormField?.(props.id, newProps);
}

const getComputedStyles = inject<Function>("getComputedStyles");

const computedStyles = getComputedStyles?.([
	{ "font-size": `h${props.headingLevel}FontSize` },
	{ color: `h${props.headingLevel}Color` },
	{ "font-weight": `h${props.headingLevel}Bold` }
]);
</script>
