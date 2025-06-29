<template>
	<div class="flex flex-col min-h-screen">
		<Header :isSaved="currentFormIsSaved" />
		<main class="flex grow mt-16">
			<FormInfo v-if="currentForm" :formName="currentForm.name" :savedForms="forms" />
			<div class="bg-white shadow-md w-full px-6">
				<div class="flex items-start justify-between">
					<PreviewOptions />
					<div class="flex items-center gap-2 mt-2">
						<button
							class="px-4 py-2 hover:bg-slate-100 cursor-pointer"
							@click="duplicateForm"
						>
							Duplicate
						</button>
						<button class="px-4 py-2 hover:bg-slate-100 cursor-pointer">Delete</button>
					</div>
				</div>
				<div class="form-preview mb-16">
					<!-- <pre>{{ currentForm }}</pre> -->
					<div class="form-preview__fields grid gap-4 relative">
						<div v-for="(field, index) in currentForm.fields" :key="index">
							<component :is="componentMap[field.component]" v-bind="field.props" />
						</div>
					</div>
					<AddNewFieldButton />
				</div>
				<div class="email-preview hidden">Email preview</div>
			</div>
			<div class="min-w-[350px]">Styles panel</div>
		</main>
	</div>
	<FormFieldsModal />
</template>

<script setup lang="ts">
import Header from "./components/Header.vue";
import FormInfo from "./components/FormInfo.vue";
import PreviewOptions from "./components/PreviewOptions.vue";
import FormFieldsModal from "@/components/FormFieldsModal.vue";
import AddNewFieldButton from "@/components/AddNewFieldButton.vue";
import Cross from "@/assets/cross.svg";

// form builder components
import FormTitle from "@/components/formbuilder/FormTitle.vue";
import TextInput from "@/components/formbuilder/TextInput.vue";
import TextArea from "@/components/formbuilder/TextArea.vue";
import Heading from "@/components/formbuilder/Heading.vue";
import RadioButtons from "@/components/formbuilder/RadioButtons.vue";
import FileInput from "@/components/formbuilder/FileInput.vue";
import SubmitButton from "@/components/formbuilder/SubmitButton.vue";
import TextBlock from "@/components/formbuilder/TextBlock.vue";
import Checkboxes from "@/components/formbuilder/Checkboxes.vue";

import type { Component } from "vue";
import { ref, markRaw, provide, onMounted, inject } from "vue";

interface FormField {
	component: string;
	props: Record<string, any>;
}

interface Form {
	id: string;
	name: string;
	fields: FormField[];
}

const componentMap = {
	FormTitle: markRaw(FormTitle),
	TextInput: markRaw(TextInput),
	TextArea: markRaw(TextArea),
	Heading: markRaw(Heading),
	RadioButtons: markRaw(RadioButtons),
	FileInput: markRaw(FileInput),
	SubmitButton: markRaw(SubmitButton),
	TextBlock: markRaw(TextBlock),
	Checkboxes: markRaw(Checkboxes)
};

const forms = ref<Form[]>([]);
const currentForm = ref<Form>({});
const currentFormIsSaved = ref(false);

onMounted(() => {
	// Load saved forms from localStorage
	const savedForms = localStorage.getItem("indigaForms");
	if (savedForms) {
		forms.value = JSON.parse(savedForms) as Form[];
	}

	// Get query string
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const formId = urlParams.get("id");

	// if formId is provided, find the form
	if (formId) {
		const foundForm = forms.value.find((form) => form.id === formId);
		if (foundForm) {
			currentForm.value = foundForm;
		} else {
			// create a new form with the provided id
			currentForm.value = {
				id: formId,
				name: "Untitled Form",
				fields: []
			};
			forms.value.push(currentForm.value);
		}
	} else {
		// Check if there are any saved forms
		if (forms.value.length > 0) {
			// load the first saved form
			currentForm.value = forms.value[0];
		} else {
			// Create a new form with default values
			currentForm.value = {
				id: crypto.randomUUID(),
				name: "Untitled Form 1",
				fields: []
			};
			forms.value.push(currentForm.value);
		}
	}

	// Save the form with Control + S
	window.addEventListener("keydown", (event) => {
		if (event.ctrlKey && event.key === "s") {
			event.preventDefault(); // Prevent the default save action
			saveForm();
		}
	});
});

function saveForm() {
	const formsData = JSON.stringify(forms.value);
	localStorage.setItem("indigaForms", formsData);
	console.log("Form saved!");
	currentFormIsSaved.value = true; // Mark the form as saved
}

function duplicateForm() {
	if (currentForm.value) {
		// Create a new form with the same fields as the current form
		const newForm: Form = {
			id: crypto.randomUUID(),
			name: currentForm.value.name + " (Copy)",
			fields: JSON.parse(JSON.stringify(currentForm.value.fields)) // Deep copy the fields
		};

		// Add the new form to the forms array
		forms.value.push(newForm);
		currentForm.value = newForm; // Set the current form to the new form

		// Update any FormTitle components
		currentForm.value.fields.forEach((field) => {
			if (field.component === "FormTitle") {
				field.props.title = newForm.name; // Update the title to match the new form name
			}
		});

		currentFormIsSaved.value = false; // Mark the form as unsaved
		console.log("Form duplicated!");
	}
}

provide("addFormField", (field: FormField) => {
	if (currentForm.value) {
		if (field.component === "FormTitle") {
			field.props.title = currentForm.value.name;
		}

		// Add the field to the current form
		currentForm.value.fields.push(field);

		// toggle the form options
		setTimeout(() => {
			const fieldOptionsModal = document.querySelector(
				`.form-preview-field__options:has(form[data-field-id="${field.props.id}"])`
			);
			if (fieldOptionsModal) {
				fieldOptionsModal.classList.toggle("hidden");
			}
		}, 300);
	}
	currentFormIsSaved.value = false; // Mark the form as unsaved
});

provide("updateFormName", (newName: string) => {
	if (currentForm.value) {
		currentForm.value.name = newName;
	}

	// loop through current form fields
	currentForm.value.fields.forEach((field) => {
		if (field.component === "FormTitle") {
			field.props.title = newName;
		}
	});

	// Update the query string in the URL
	const url = new URL(window.location.href);
	currentFormIsSaved.value = false; // Mark the form as unsaved
});

provide("saveForm", () => {
	saveForm();
});

provide("createNewForm", () => {
	if (currentForm.value) {
		saveForm(); // Save the current form before creating a new one
	}

	// Create a new form with default values
	const formNumber = forms.value.length + 1;
	currentForm.value = {
		id: crypto.randomUUID(),
		name: "Untitled Form " + formNumber,
		fields: []
	};
	forms.value.push(currentForm.value);
	currentFormIsSaved.value = false; // Mark the form as unsaved
});

provide("updateFormField", (id: string, newProps: Record<string, any>) => {
	if (currentForm.value) {
		const field = currentForm.value.fields.find((f) => f.props.id === id);
		if (field) {
			field.props = newProps;
		}
		currentFormIsSaved.value = false; // Mark the form as unsaved
	}
});

provide("deleteField", (id: string) => {
	if (currentForm.value) {
		currentForm.value.fields = currentForm.value.fields.filter(
			(field) => field.props.id !== id
		);
	}
	currentFormIsSaved.value = false; // Mark the form as unsaved
});

provide("moveField", (id: string, direction: "up" | "down") => {
	if (currentForm.value) {
		const fields = currentForm.value.fields;
		const index = fields.findIndex((field) => field.props.id === id);
		if (index === -1) return; // Field not found

		if (direction === "up" && index > 0) {
			// Swap with the previous field
			[fields[index], fields[index - 1]] = [fields[index - 1], fields[index]];
		} else if (direction === "down" && index < fields.length - 1) {
			// Swap with the next field
			[fields[index], fields[index + 1]] = [fields[index + 1], fields[index]];
		}
	}
	currentFormIsSaved.value = false; // Mark the form as unsaved
});
</script>
