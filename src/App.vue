<template>
	<div class="flex flex-col min-h-screen">
		<Header :isSaved="currentFormIsSaved" />
		<main class="flex grow mt-16">
			<FormInfo v-if="currentForm" :formName="currentForm.name" :savedForms="forms" />
			<div class="bg-white shadow-md w-full px-6">
				<div class="flex items-start justify-between">
					<PreviewOptions :showingFormPreview="showFormPreview" />
					<DuplicateAndDelete />
				</div>
				<FormPreview v-if="showFormPreview" :currentForm="currentForm" />
				<EmailPreview v-else :currentForm="currentForm" />
			</div>
			<div class="min-w-[350px]">
				<h2 class="font-bold text-xl p-4">Styles</h2>
				<div class="mt-8">
					<StyleDropdown label="Body">
						<ColorInput
							label="Background color"
							:shaded="true"
							:currentForm="currentForm"
							section="Body"
							propKey="backgroundColor"
						/>
						<NumberInput
							label="Padding top"
							:shaded="false"
							:currentForm="currentForm"
							section="Body"
							propKey="paddingTop"
							unit="px"
						/>
						<NumberInput
							label="Padding bottom"
							:shaded="true"
							:currentForm="currentForm"
							section="Body"
							propKey="paddingBottom"
							unit="px"
						/>
						<NumberInput
							label="Padding left"
							:shaded="false"
							:currentForm="currentForm"
							section="Body"
							propKey="paddingLeft"
							unit="px"
						/>
						<NumberInput
							label="Padding right"
							:shaded="true"
							:currentForm="currentForm"
							section="Body"
							propKey="paddingRight"
							unit="px"
						/>
						<NumberInput
							label="Border radius"
							:shaded="false"
							:currentForm="currentForm"
							section="Body"
							propKey="borderRadius"
							unit="px"
						/>
					</StyleDropdown>
					<StyleDropdown label="Text"></StyleDropdown>
					<StyleDropdown label="Input"></StyleDropdown>
					<StyleDropdown label="Radio, checkboxes and toggle"></StyleDropdown>
					<StyleDropdown label="Submit button"></StyleDropdown>
				</div>
			</div>
		</main>
	</div>
	<FormFieldsModal />
	<GenerateCode v-if="showCodeModal" :form="currentForm" />
	<p class="fixed bottom-6 left-6 text-sm text-slate-600">
		Made with 💜 by <a href="#" class="text-indigo-700 underline">Shannon L.</a>
	</p>
</template>

<script setup lang="ts">
import Header from "./components/Header.vue";
import FormInfo from "./components/FormInfo.vue";
import PreviewOptions from "./components/PreviewOptions.vue";
import FormFieldsModal from "./components/FormFieldsModal.vue";
import FormPreview from "./components/FormPreview.vue";
import DuplicateAndDelete from "./components/DuplicationAndDelete.vue";
import GenerateCode from "./components/GenerateCode.vue";
import EmailPreview from "./components/EmailPreview.vue";
import StyleDropdown from "./components/StyleDropdown.vue";

// style inputs
import NumberInput from "./components/styleInputs/NumberInput.vue";
import ColorInput from "./components/styleInputs/ColorInput.vue";

import { ref, provide, onMounted } from "vue";
import type { Form, FormField, Style } from "./data/types";

const forms = ref<Form[]>([]);
const currentForm = ref<Form>({
	id: "",
	name: "",
	email: "",
	fields: []
});
const currentFormIsSaved = ref(false);
const showCodeModal = ref(false);
const showFormPreview = ref(true);
const addFormFieldIndex = ref<number | null>(null);

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
				email: "",
				fields: []
			};

			forms.value.push(currentForm.value);
		}
	} else {
		// Check if there are any saved forms
		if (forms.value.length > 0) {
			currentForm.value = forms.value[0];
		} else {
			// Create a new form with default values
			currentForm.value = {
				id: crypto.randomUUID(),
				name: "Untitled Form 1",
				email: "",
				fields: []
			};

			forms.value.push(currentForm.value);
		}
	}

	// Save the form with Control + S
	window.addEventListener("keydown", (event) => {
		if ((event.ctrlKey || event.metaKey) && event.key === "s") {
			event.preventDefault(); // Prevent the default save action
			saveForm();
		}
	});

	// if you click outside the form-preview-field__options modal, close it
	document.addEventListener("click", (event) => {
		const target = event.target as HTMLElement;
		const optionsModal = document.querySelector(".form-preview-field__options:not(.hidden)");
		if (
			optionsModal &&
			!target.closest(".form-preview-field__options") &&
			!target.closest(".form-preview-field")
		) {
			optionsModal.classList.add("hidden");
		}
	});

	// check if showFormPreview exists in sessionStorage
	const showFormPreviewSession = sessionStorage.getItem("showFormPreview");
	if (showFormPreviewSession) {
		showFormPreview.value = showFormPreviewSession === "true";
	} else {
		showFormPreview.value = true; // Default to showing form preview
	}
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
			fields: JSON.parse(JSON.stringify(currentForm.value.fields)), // Deep copy the fields
			email: currentForm.value.email,
			domain: currentForm.value.domain,
			subject: currentForm.value.subject,
			introText: currentForm.value.introText
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

		// Update the field IDs to ensure uniqueness
		currentForm.value.fields.forEach((field) => {
			if (field.props.id) {
				field.props.id =
					field.props.id.split("-")[0] + "-" + crypto.randomUUID().substring(2, 8);
			}
		});

		currentFormIsSaved.value = false; // Mark the form as unsaved
		console.log("Form duplicated!");
	}
}

function deleteForm() {
	if (currentForm.value) {
		// Get the previous form if it exists
		const indexOfCurrent = forms.value.findIndex((form) => form.id === currentForm.value.id);

		let previousForm = null;

		if (indexOfCurrent > 0) {
			previousForm = forms.value[indexOfCurrent - 1];
		} else if (indexOfCurrent === 0 && forms.value.length > 1) {
			previousForm = forms.value[1]; // If the first form is deleted, set the second form as previous
		} else if (indexOfCurrent === 0 && forms.value.length === 1) {
			previousForm = null; // If it's the only form, there is no previous form
		}

		// Remove the current form from the forms array
		forms.value = forms.value.filter((form) => form.id !== currentForm.value.id);

		if (previousForm) {
			currentForm.value = previousForm; // Set the current form to the previous form
		} else {
			const formNumber = forms.value.length + 1;

			currentForm.value = {
				id: crypto.randomUUID(),
				name: "Untitled Form " + formNumber,
				email: "",
				fields: []
			};
		}

		// Update the URL to remove the form ID
		const url = new URL(window.location.href);
		url.searchParams.delete("id");
		window.history.pushState({}, "", url.toString());

		saveForm();
		console.log("Form deleted!");
	}
}

provide("updateField", (key: string, value: any) => {
	if (currentForm.value) {
		(currentForm.value as Record<string, any>)[key] = value;
		currentFormIsSaved.value = false; // Mark the form as unsaved
	}
});

provide("setFormPreview", (value: boolean) => {
	showFormPreview.value = value;
	sessionStorage.setItem("showFormPreview", value.toString());
});

provide("duplicateForm", () => {
	duplicateForm();
});

provide("deleteForm", () => {
	deleteForm();
});

provide("showCodeModal", () => {
	showCodeModal.value = true;
});

provide("hideCodeModal", () => {
	showCodeModal.value = false;
});

provide("setAddFormFieldIndex", (index: number | null) => {
	addFormFieldIndex.value = index;
});

provide("addFormField", (field: FormField) => {
	if (currentForm.value) {
		if (field.component === "FormTitle") {
			field.props.title = currentForm.value.name;
		}

		if (addFormFieldIndex.value !== null && addFormFieldIndex.value >= 0) {
			// Insert the field at the specified index
			currentForm.value.fields.splice(addFormFieldIndex.value, 0, field);
			addFormFieldIndex.value = null; // Reset the index after adding
		} else {
			// Add the field to the current form
			currentForm.value.fields.push(field);
		}

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

	currentFormIsSaved.value = false; // Mark the form as unsaved
});

provide("saveForm", () => {
	saveForm();
});

provide("createNewForm", () => {
	if (currentForm.value) {
		saveForm(); // Save the current form before creating a new one
		const formNumber = forms.value.length + 1;
		currentForm.value = {
			id: crypto.randomUUID(),
			name: "Untitled Form " + formNumber,
			email: "",
			fields: []
		};
		forms.value.push(currentForm.value);
		currentFormIsSaved.value = false; // Mark the form as unsaved
	}
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

provide("addStyle", (style: Style) => {
	if (currentForm.value) {
		if (!currentForm.value.styles) {
			currentForm.value.styles = [];
		}

		// check if object with the same label already exists
		const existingStyleIndex = currentForm.value.styles.findIndex(
			(s) => s.label === style.label
		);
		if (existingStyleIndex !== -1) {
			// Update existing style
			currentForm.value.styles[existingStyleIndex].properties = {
				...currentForm.value.styles[existingStyleIndex].properties,
				...style.properties
			};
		} else {
			// Add new style
			currentForm.value.styles.push(style);
		}
	}
});
</script>
