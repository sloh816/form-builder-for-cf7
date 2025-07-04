<template>
    <div class="form-preview mb-16">
        <!-- <pre>{{ currentForm }}</pre> -->
        <div class="form-preview__fields grid gap-4 relative">
            <div v-for="(field, index) in props.currentForm.fields" :key="index" class="relative">
                <button class="text-sm text-indigo-700 absolute flex items-center gap-2 -top-[16px] cursor-pointer opacity-0 hover:opacity-100 transition-all duration-200 left-0 z-10" :style="{ width: 'calc(100% + 60px)' }" @click="openFieldsModal(index)">
                    <span class="block h-[1px] bg-indigo-700 w-full"></span>
                    <span class="block text-nowrap">Insert field above</span>
                </button>
                <component :is="componentMap[field.component]" v-bind="field.props" />
            </div>
        </div>
        <AddNewFieldButton />
    </div>
</template>

<script setup lang="ts">
import AddNewFieldButton from "../components/AddNewFieldButton.vue";
import { markRaw, inject } from "vue";

// form builder components
import FormTitle from "../components/formbuilder/FormTitle.vue";
import TextInput from "../components/formbuilder/TextInput.vue";
import TextArea from "../components/formbuilder/TextArea.vue";
import Heading from "../components/formbuilder/Heading.vue";
import RadioButtons from "../components/formbuilder/RadioButtons.vue";
import FileInput from "../components/formbuilder/FileInput.vue";
import SubmitButton from "../components/formbuilder/SubmitButton.vue";
import TextBlock from "../components/formbuilder/TextBlock.vue";
import Checkboxes from "../components/formbuilder/Checkboxes.vue";
import Toggle from "../components/formbuilder/Toggle.vue";
import DropdownSelect from "../components/formbuilder/DropdownSelect.vue";
import DatePicker from "../components/formbuilder/DatePicker.vue";

const componentMap: Record<string, any> = {
    FormTitle: markRaw(FormTitle),
    TextInput: markRaw(TextInput),
    TextArea: markRaw(TextArea),
    Heading: markRaw(Heading),
    RadioButtons: markRaw(RadioButtons),
    FileInput: markRaw(FileInput),
    SubmitButton: markRaw(SubmitButton),
    TextBlock: markRaw(TextBlock),
    Checkboxes: markRaw(Checkboxes),
    Toggle: markRaw(Toggle),
    DropdownSelect: markRaw(DropdownSelect),
    DatePicker: markRaw(DatePicker),
};

interface FormField {
    component: string;
    props: Record<string, any>;
}

interface Form {
    id: string;
    name: string;
    fields: FormField[];
}

interface Props {
    currentForm: Form;
}

const props = defineProps<Props>();

const setAddFormFieldIndex = inject("setAddFormFieldIndex");

function openFieldsModal(index: number | null) {
    if (typeof setAddFormFieldIndex === "function") {
        setAddFormFieldIndex(index); // Reset the index to null when opening the modal
    }
    const modal = document.querySelector(".fields-modal");
    modal?.classList.remove("hidden");
}
</script>
