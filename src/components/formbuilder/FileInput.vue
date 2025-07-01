<template>
    <FormPreviewField>
        <template #preview>
            <div class="indiga-file-upload indiga-field">
                <label>
                    <span class="indiga-label">{{ props.label }}<span v-if="props.required">*</span></span>
                    <div class="indiga-note-wrapper">
                        <span class="indiga-note">Maximum file size: {{ getFileSizeLimit() }}</span>
                        <span class="indiga-note">Acceptable file types: {{ getAcceptableFileTypes() }}</span>
                    </div>
                    <span class="wpcf7-form-control-wrap" data-name="file-936">
                        <input type="file" size="40" class="wpcf7-form-control wpcf7-file" accept="audio/*,video/*,image/*" aria-invalid="false" name="file-936" disabled />
                    </span>
                </label>
            </div>
        </template>

        <template #options>
            <FieldOptionsFormWrapper :id="props.id" fieldType="File input">
                <TextInput :id="`label-${props.id}`" label="Label" :value="props.label" :inputFunction="(value) => updateProps('label', value)" />

                <Boolean :id="`required-${props.id}`" :isChecked="props.required" :changeFunction="(value) => updateProps('required', value)" label="Required" />

                <NumberInput :id="`fileSizeLimit-${props.id}`" label="File Size Limit (KB)" :value="props.fileSizeLimit" :inputFunction="(value) => updateProps('fileSizeLimit', value)" />

                <MultiSelect
                    label="Allowed file types"
                    :id="`fileTypes-${props.id}`"
                    :options="
                        fileTypesMap.map((type) => ({
                            label: type.label,
                            value: type.value,
                            isSelected: props.fileTypes.includes(type.value),
                        }))
                    "
                    :changeFunction="(arr) => updateProps('fileTypes', arr)"
                />
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
import NumberInput from "@/components/propFormFields/NumberInput.vue";
import MultiSelect from "@/components/propFormFields/MultiSelect.vue";

interface Props {
    id: string;
    label?: string;
    required?: True | false;
    fileTypes: string[];
    fileSizeLimit: number; // in KB
}

const props = defineProps<Props>();

const fileTypesMap = [
    { label: "Image", value: "image/*" },
    { label: "Plain text", value: "text/plain" },
    {
        label: "Word documents",
        value: "application/msword|application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    },
    { label: "PDF", value: "application/pdf" },
    { label: "Audio", value: "audio/*" },
    { label: "Video", value: "video/*" },
    { label: "CSV", value: "text/csv" },
    { label: "Excel", value: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
    { label: "Zip folders", value: "application/zip" },
    { label: "All files", value: "*" },
];

function getFileSizeLimit() {
    // if KB is greater than 1000, conver to MB
    if (props.fileSizeLimit >= 1000) {
        return `${(props.fileSizeLimit / 1000).toFixed(2).replace(".00", "")}MB`;
    }
    return `${props.fileSizeLimit}KB`;
}

function getAcceptableFileTypes() {
    if (props.fileTypes.length === 0) {
        return "All files";
    }
    return props.fileTypes
        .map((type) => {
            const foundType = fileTypesMap.find((t) => t.value === type);
            return foundType ? foundType.label : type;
        })
        .join(", ");
}

const updateFormField = inject<Function>("updateFormField");
function updateProps(propKey: string, value: any) {
    const newProps = { ...props, [propKey]: value };
    updateFormField(props.id, newProps);
}
</script>
