<template>
    <FormPreviewField>
        <template #preview>
            <pre>{{ props }}</pre>
            <p>
                <div class="indiga-toggle-switch">
                    <span class="wpcf7-form-control-wrap" data-name="radio-18">
                        <span class="wpcf7-form-control wpcf7-radio">
                            <span class="wpcf7-list-item first">
                                <input type="radio" name="radio-18" value="Yes" data-gtm-form-interact-field-id="0" />
                                <span class="wpcf7-list-item-label">Yes</span>
                            </span>
                            <span class="wpcf7-list-item last">
                                <input type="radio" name="radio-18" value="No" data-gtm-form-interact-field-id="1" />
                                <span class="wpcf7-list-item-label">No</span>
                            </span>
                        </span>
                    </span>
                </div>
            </p>
        </template>

        <template #options>
            <FieldOptionsFormWrapper :id="props.id" fieldType="">
                <TextInput :id="`label-${props.id}`" label="Label" :value="props.label" :inputFunction="(value) => updateProps('label', value)" />

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

interface Props {
    id: string;
    label?: string;
    required?: True | false;
    onLabel: string;
    offLabel: string;
    isChecked: True | false;
}

const props = defineProps<Props>();

const updateFormField = inject<Function>("updateFormField");
function updateProps(propKey: string, value: any) {
    const newProps = { ...props, [propKey]: value };
    updateFormField(props.id, newProps);
}
</script>
