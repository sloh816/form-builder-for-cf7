<template>
	<p class="font-bold text-2xl mt-4">{{ props.title }}</p>
	<FieldOptionsFormWrapper :id="props.id">
		<SelectOptions
			:id="`heading-level-${props.id}`"
			label="Heading Level"
			:options="[
				{ label: 'H1', value: '1', isSelected: props.headingLevel === 1 },
				{ label: 'H2', value: '2', isSelected: props.headingLevel === 2 },
				{ label: 'H3', value: '3', isSelected: props.headingLevel === 3 }
			]"
			:changeFunction="(value) => updateHeadingLevel(value)"
		/>
	</FieldOptionsFormWrapper>
</template>

<script setup lang="ts">
import { inject } from "vue";
import FieldOptionsFormWrapper from "@/components/FieldOptionsFormWrapper.vue";
import SelectOptions from "@/components/propFormFields/SelectOptions.vue";

interface Props {
	title: string;
	headingLevel?: number;
	id: string;
}

const props = defineProps<Props>();

const updateFormField = inject<Function>("updateFormField");
function updateHeadingLevel(level: string) {
	const newHeadingLevel = parseInt(level);
	const newProps = {
		...props,
		headingLevel: newHeadingLevel
	};

	updateFormField?.(props.id, newProps);
}
</script>
