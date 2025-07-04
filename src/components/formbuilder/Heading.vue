<template>
    <FormPreviewField>
        <template #preview>
            <p class="font-bold text-2xl mt-4">{{ props.heading }}</p>
        </template>

        <template #options>
            <FieldOptionsFormWrapper :id="props.id" fieldType="Heading">
                <TextInput :id="`heading-${props.id}`" label="Heading Text" :value="props.heading" :inputFunction="(value: any) => updateHeadingText(value)" />

                <SelectOptions
                    :id="`heading-level-${props.id}`"
                    label="Heading Level"
                    :options="[
                        { label: 'H1', value: '1', isSelected: props.headingLevel === 1 },
                        { label: 'H2', value: '2', isSelected: props.headingLevel === 2 },
                        { label: 'H3', value: '3', isSelected: props.headingLevel === 3 },
                        { label: 'H4', value: '4', isSelected: props.headingLevel === 4 },
                        { label: 'H5', value: '5', isSelected: props.headingLevel === 5 },
                        { label: 'H6', value: '6', isSelected: props.headingLevel === 6 },
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

interface Props {
    heading: string;
    headingLevel?: number;
    id: string;
}

const props = defineProps<Props>();

const updateFormField = inject<Function>("updateFormField");

function updateHeadingLevel(level: string) {
    const newHeadingLevel = parseInt(level);
    const newProps = {
        ...props,
        headingLevel: newHeadingLevel,
    };

    updateFormField?.(props.id, newProps);
}

function updateHeadingText(text: string) {
    const newProps = {
        ...props,
        heading: text,
    };

    updateFormField?.(props.id, newProps);
}
</script>
