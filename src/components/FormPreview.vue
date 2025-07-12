<template>
	<div class="form-preview mb-16">
		<div class="form-preview__fields grid gap-4 relative" :style="computedStyles">
			<div
				v-for="(field, index) in currentForm.fields"
				:key="field.props.id"
				class="form-preview-field-wrapper relative"
				:id="field.props.id"
			>
				<InsertFieldAboveButton :index="index" class="absolute -top-[16px] left-0 z-10" />
				<component
					:is="componentMap[field.component]"
					v-bind="field.props"
					:currentForm="currentForm"
				/>
			</div>
		</div>
		<AddNewFieldButton />
	</div>
</template>

<script setup lang="ts">
import AddNewFieldButton from "../components/AddNewFieldButton.vue";
import InsertFieldAboveButton from "../components/InsertFieldAboveButton.vue";
import { markRaw, computed, provide } from "vue";
import type { Form } from "../data/types";

// Form builder components
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

interface Props {
	currentForm: Form;
}

const { currentForm } = defineProps<Props>();

function getComputedStyles(styleProps: Record<string, string>[]) {
	return computed(() => {
		return styleProps.map((prop) => {
			const cssProp = Object.keys(prop)[0];
			const styleKey = prop[cssProp];
			let value = currentForm.styles[styleKey];

			// if value string is a number, append 'px'
			if (!isNaN(Number(value))) {
				value += "px";
			}

			return {
				[cssProp]: value || ""
			};
		});
	});
}

const computedStyles = getComputedStyles([
	{ "background-color": "backgroundColor" },
	{ "padding-top": "bodyPaddingTop" },
	{ "padding-bottom": "bodyPaddingBottom" },
	{ "padding-left": "bodyPaddingLeft" },
	{ "padding-right": "bodyPaddingRight" },
	{ "border-radius": "borderRadius" },
	{ "max-width": "maxWidth" }
]);

provide("getComputedStyles", getComputedStyles);
</script>
