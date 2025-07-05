<template>
	<div class="form-preview mb-16">
		<!-- <pre>{{ currentForm.styles }}</pre> -->
		<div
			class="form-preview__fields grid gap-4 relative"
			:style="`background-color:${backgroundColor}; padding-top:${paddingTop}; padding-bottom:${paddingBottom}; padding-left: ${paddingLeft}; padding-right:${paddingRight}; border-radius:${borderRadius};`"
		>
			<div v-for="(field, index) in props.currentForm.fields" :key="index" class="relative">
				<InsertFieldAboveButton :index="index" class="absolute -top-[16px] left-0 z-10" />
				<component :is="componentMap[field.component]" v-bind="field.props" />
			</div>
		</div>
		<AddNewFieldButton />
	</div>
</template>

<script setup lang="ts">
import AddNewFieldButton from "../components/AddNewFieldButton.vue";
import InsertFieldAboveButton from "../components/InsertFieldAboveButton.vue";
import { markRaw, ref, computed } from "vue";

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
	DatePicker: markRaw(DatePicker)
};

interface FormField {
	component: string;
	props: Record<string, any>;
}

interface Style {
	label: string;
	properties: Record<string, any>;
}

interface Form {
	id: string;
	name: string;
	email: string;
	domain?: string;
	subject?: string;
	introText?: string;
	fields: FormField[];
	styles?: Style[];
}

interface Props {
	currentForm: Form;
}

const props = defineProps<Props>();

const backgroundColor = computed(() => {
	return (
		props.currentForm.styles?.find((style) => style.label === "Body")?.properties
			.backgroundColor || "#ffffff"
	);
});

const paddingTop = computed(() => {
	return (
		props.currentForm.styles?.find((style) => style.label === "Body")?.properties.paddingTop +
			"px" || "0px"
	);
});

const paddingBottom = computed(() => {
	return (
		props.currentForm.styles?.find((style) => style.label === "Body")?.properties
			.paddingBottom + "px" || "0px"
	);
});

const paddingRight = computed(() => {
	return (
		props.currentForm.styles?.find((style) => style.label === "Body")?.properties.paddingRight +
			"px" || "0px"
	);
});

const paddingLeft = computed(() => {
	return (
		props.currentForm.styles?.find((style) => style.label === "Body")?.properties.paddingLeft +
			"px" || "0px"
	);
});

const borderRadius = computed(() => {
	return (
		props.currentForm.styles?.find((style) => style.label === "Body")?.properties.borderRadius +
			"px" || "0px"
	);
});
</script>
