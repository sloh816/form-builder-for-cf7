<template>
    <FormPreviewField>
        <template #preview>
            <!-- <pre>{{ props }}</pre> -->
            <div class="indiga-field">
                <p class="indiga-label">{{ props.label }}<span v-if="props.required">*</span></p>
                <p>
                    <span class="wpcf7-form-control-wrap" :data-name="props.id">
                        <select class="wpcf7-form-control wpcf7-select" aria-invalid="false" :name="props.id">
                            <option v-for="option in options" :value="option">{{ option }}</option>
                        </select>
                    </span>
                </p>
            </div>
        </template>

        <template #options>
            <FieldOptionsFormWrapper :id="props.id" fieldType="">
                <TextInput :id="`label-${props.id}`" label="Label" :value="props.label" :inputFunction="(value) => updateProps('label', value)" />

                <TextArea :id="`options-${props.id}`" label="Options" description="One line per option" :value="props.options?.join('\n').trim()" :inputFunction="(value) => updateOptions(value)" />

                <Boolean :id="`required-${props.id}`" :isChecked="props.required" :changeFunction="(value) => updateProps('required', value)" label="Required" />
            </FieldOptionsFormWrapper>
        </template>
    </FormPreviewField>
</template>

<script setup lang="ts">
import { inject } from "vue";
import FieldOptionsFormWrapper from "@/components/FieldOptionsFormWrapper.vue";
import FormPreviewField from "@/components/FormPreviewField.vue";

import TextInput from "@/components/propFormFields/TextInput.vue";
import Boolean from "@/components/propFormFields/Boolean.vue";
import TextArea from "@/components/propFormFields/TextArea.vue";

interface Props {
    id: string;
    label?: string;
    required?: true | false;
    options: String[];
}

const props = defineProps<Props>();

const updateFormField = inject<Function>("updateFormField");
function updateProps(propKey: string, value: any) {
    const newProps = { ...props, [propKey]: value };
    updateFormField(props.id, newProps);
}

function updateOptions(value: string) {
    const optionsArray = value
        .split("\n")
        .map((option) => option.trim())
        .filter((option) => option);
    const newProps = { ...props, options: optionsArray };
    updateFormField(props.id, newProps);
}
</script>
