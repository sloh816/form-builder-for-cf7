<template>
    <FormPreviewField>
        <template #preview>
            <p v-html="formatTextToHtml()" :style="computedStyles"></p>
        </template>

        <template #options>
            <FieldOptionsFormWrapper :id="props.id" fieldType="Text block">
                <TextArea :id="`text-${props.id}`" label="Text" :value="props.text || ''" :inputFunction="(value:any) => updateProps('text', value)" />
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
        [propKey]: value,
    };
    updateFormField?.(props.id, newProps);
}

const computedStyles = computed(() => {
    const textStyles = props.currentForm.styles?.find((style) => style.label === "Text");
    return {
        // "font-size": textStyles?.properties[`h${props.headingLevel}FontSize`] + "px",
        // color: textStyles?.properties[`h${props.headingLevel}Color`],
        // "font-weight": textStyles?.properties[`h${props.headingLevel}Bold`]
        color: textStyles?.properties.textBlockColor,
        "background-color": textStyles?.properties.textBlockBackgroundColor,
        "padding-top": textStyles?.properties.textBlockPaddingTop + "px",
        "padding-right": textStyles?.properties.textBlockPaddingRight + "px",
        "padding-bottom": textStyles?.properties.textBlockPaddingBottom + "px",
        "padding-left": textStyles?.properties.textBlockPaddingLeft + "px",
        "font-size": textStyles?.properties.textBlockFontSize + "px",
        "border-radius": textStyles?.properties.textBlockBorderRadius + "px",
    };
});
</script>
