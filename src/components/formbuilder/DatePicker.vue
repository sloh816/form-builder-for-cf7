<template>
    <FormPreviewField>
        <template #preview>
            <!-- <pre>{{ props }}</pre> -->

            <div class="indiga-field">
                <label :data-field-id="props.id">
                    <span class="indiga-label">{{ props.label }}<span v-if="props.required">*</span></span>
                    <span class="indiga-note-wrapper">
                        <span v-if="props.minDate" class="indiga-note">Minimum date: {{ formatDate(props.minDate) }}</span>
                        <span v-if="props.maxDate" class="indiga-note">Maximum date: {{ formatDate(props.maxDate) }}</span>
                    </span>
                    <p>
                        <span class="wpcf7-form-control-wrap" :data-name="props.id">
                            <input class="wpcf7-form-control wpcf7-date wpcf7-validates-as-date" aria-invalid="false" value="" type="date" :name="props.id" :min="props.minDate" :max="props.maxDate" />
                        </span>
                    </p>
                </label>
            </div>
        </template>

        <template #options>
            <FieldOptionsFormWrapper :id="props.id" fieldType="">
                <TextInput :id="`label-${props.id}`" label="Label" :value="props.label" :inputFunction="(value) => updateProps('label', value)" />

                <DateInput :id="`min-date-${props.id}`" label="Min date" :value="props.minDate" :inputFunction="(value) => updateProps('minDate', value)" />

                <DateInput :id="`max-date-${props.id}`" label="Max date" :value="props.maxDate" :inputFunction="(value) => updateProps('maxDate', value)" />

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
import DateInput from "@/components/propFormFields/DateInput.vue";

interface Props {
    id: string;
    label?: string;
    required?: true | false;
    minDate?: string;
    maxDate?: string;
}

const props = defineProps<Props>();

const updateFormField = inject<Function>("updateFormField");
function updateProps(propKey: string, value: any) {
    const newProps = { ...props, [propKey]: value };
    updateFormField(props.id, newProps);
}

function formatDate(date: string): string {
    // formate YYYY-MM-DD to Date Month Year
    // e.g. 2023-10-01 to 1 October 2023
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [year, month, day] = date.split("-");
    const monthIndex = parseInt(month, 10) - 1; // Convert month to zero-based index
    return `${parseInt(day, 10)} ${months[monthIndex]} ${year}`;
}
</script>
