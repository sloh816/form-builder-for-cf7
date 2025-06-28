<template>
	<div class="flex flex-col min-h-screen">
		<Header />
		<main class="flex grow">
			<FormInfo v-if="currentForm" :formName="currentForm.name" :savedForms="forms" />
			<div class="form-builder bg-white shadow-md w-full px-6">
				<PreviewOptions />
				<div class="form-preview max-w-3xl mb-16">
					<div class="TEMP-WRAPPER grid grid-cols-2 items-start gap-10 mb-4">
						<pre>{{ currentForm }}</pre>
						<div class="form-builder-preview grid gap-4 relative">
							<div v-for="(field, index) in currentForm.fields" :key="index">
								<component
									:is="componentMap[field.component]"
									v-bind="field.props"
								/>
							</div>
						</div>
					</div>
					<AddNewFieldButton />
				</div>
			</div>
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
	TextArea: markRaw(TextArea)
};

const forms = ref<Form[]>([]);
const currentForm = ref<Form>({});

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
			// create a new form with the provided name
			currentForm.value = {
				id: crypto.randomUUID(),
				name: formName,
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
}

provide("addFormField", (field: FormField) => {
	if (currentForm.value) {
		if (field.component === "FormTitle") {
			field.props.title = currentForm.value.name;
		}

		// Add the field to the current form
		currentForm.value.fields.push(field);
	}
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
});

provide("saveForm", () => {
	saveForm();
});

provide("createNewForm", () => {
	if (currentForm.value) {
		// call saveForm from inject function
		const saveForm = inject("saveForm") as () => void;
		if (saveForm) saveForm();
	}

	// Create a new form with default values
	const formNumber = forms.value.length + 1;
	currentForm.value = {
		id: crypto.randomUUID(),
		name: "Untitled Form " + formNumber,
		fields: []
	};
	forms.value.push(currentForm.value);
});

provide("updateFormField", (id: string, newProps: Record<string, any>) => {
	if (currentForm.value) {
		const field = currentForm.value.fields.find((f) => f.props.id === id);
		if (field) {
			field.props = newProps;
		}
	}
});

provide("deleteField", (id: string) => {
	if (currentForm.value) {
		currentForm.value.fields = currentForm.value.fields.filter(
			(field) => field.props.id !== id
		);
	}
});
</script>
