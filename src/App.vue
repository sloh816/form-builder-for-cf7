<template>
	<div class="flex flex-col min-h-screen">
		<Header :isSaved="currentFormIsSaved" />
		<main class="flex grow mt-16">
			<FormInfo v-if="currentForm" :currentFormId="currentForm.id" :savedForms="forms" />
			<div class="bg-white shadow-md w-full px-6">
				<div class="flex items-start justify-between">
					<PreviewOptions :showingFormPreview="showFormPreview" />
					<DuplicateAndDelete />
				</div>
				<pre>{{ currentForm.styles }}</pre>
				<FormPreview v-if="showFormPreview" :currentForm="currentForm" />
				<EmailPreview v-else :currentForm="currentForm" />
			</div>
			<div class="min-w-[350px]">
				<div class="fixed min-w-[350px] overflow-y-auto h-screen pb-50">
					<h2 class="font-bold text-xl p-4">Styles</h2>
					<StyleOptions :currentForm="currentForm" />
				</div>
			</div>
		</main>
	</div>
	<FormFieldsModal />
	<GenerateCode v-if="showCodeModal" :form="currentForm" />
	<p class="fixed bottom-6 left-6 text-sm text-slate-600">
		Made with 💜 by <a href="#" class="text-indigo-700 underline">Shannon L.</a><br />GitHub |
		Report a problem
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
import StyleOptions from "./components/StyleOptions.vue";

import { ref, provide, onMounted } from "vue";
import type { Form, FormField, Style } from "./data/types";
import { defaultCss } from "./data/form-css";

const forms = ref<Form[]>([]);
const currentForm = ref<Form>(createDefaultForm(crypto.randomUUID()));
const currentFormIsSaved = ref(false);
const showCodeModal = ref(false);
const showFormPreview = ref(true);
const addFormFieldIndex = ref<number | null>(null);

function createDefaultForm(id: string): Form {
	return {
		id,
		name: "Untitled Form",
		email: "",
		domain: "",
		subject: "",
		introText: "",
		fields: [],
		styles: defaultCss
	};
}

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

	const loadCss = (form: Form) => {
		const styles = form.styles || [];
		const defaultStyles = defaultCss;

		// merge default styles with form styles
		const mergedStyles = defaultStyles.map((defaultStyle) => {
			const formStyle = styles.find((s) => s.label === defaultStyle.label);
			return {
				...defaultStyle,
				properties: {
					...defaultStyle.properties,
					...formStyle?.properties
				}
			};
		});

		currentForm.value.styles = mergedStyles;
	};

	// if formId is provided, find the form
	if (formId) {
		const foundForm = forms.value.find((form) => form.id === formId);
		if (foundForm) {
			currentForm.value = foundForm;
			loadCss(currentForm.value);
			currentFormIsSaved.value = true; // Mark the form as saved
		} else {
			// create a new form with the provided id
			currentForm.value = createDefaultForm(formId);
			forms.value.push(currentForm.value);
		}
	} else {
		// Check if there are any saved forms
		if (forms.value.length > 0) {
			currentForm.value = forms.value[0];
		} else {
			// Create a new form with default values
			currentForm.value = createDefaultForm(crypto.randomUUID());
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
	console.log(forms.value);
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

		saveForm();
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

provide("duplicateField", (fieldId: string) => {
	// find field by id from currentForm
	if (currentForm.value) {
		const field: FormField | undefined = currentForm.value.fields.find(
			(f) => f.props.id === fieldId
		);
		if (field) {
			// Create a deep copy of the field
			const newField: FormField = JSON.parse(JSON.stringify(field));
			newField.props.id =
				field.props.id.split("-")[0] + "-" + crypto.randomUUID().substring(2, 8); // Generate a new ID for the duplicated field

			// Add the new field to the current form
			currentForm.value.fields.push(newField);
			currentFormIsSaved.value = false; // Mark the form as unsaved
			console.log("Field duplicated!");
		}
	}
});

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
		const newForm: Form = createDefaultForm(crypto.randomUUID());

		forms.value.push(newForm);
		currentForm.value = newForm; // Set the current form to the new form

		console.log(currentForm.value);
	}
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

		currentFormIsSaved.value = false; // Mark the form as unsaved
	}
});
</script>
