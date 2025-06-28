<template>
	<div class="flex flex-col min-h-screen">
		<Header />
		<main class="flex grow">
			<FormInfo :formName="formName" />
			<div class="form-builder bg-white shadow-md w-full px-6">
				<PreviewOptions />
				<div class="form-preview max-w-3xl mb-16">
					<div class="form-builder-preview grid gap-4 relative">
						<component
							v-for="(field, index) in formFields"
							:key="index"
							:is="componentMap[field.component]"
							v-bind="field.props"
						/>
					</div>
					<AddNewFieldButton />
				</div>
			</div>
		</main>
	</div>
	<FieldOptionsModal />
</template>

<script setup lang="ts">
import Header from "./components/Header.vue";
import FormInfo from "./components/FormInfo.vue";
import PreviewOptions from "./components/PreviewOptions.vue";
import FieldOptionsModal from "@/components/FieldOptionsModal.vue";
import AddNewFieldButton from "@/components/AddNewFieldButton.vue";
import Cross from "@/assets/cross.svg";

// form builder components
import FormTitle from "@/components/formbuilder/FormTitle.vue";
import TextInput from "@/components/formbuilder/TextInput.vue";

import type { Component } from "vue";
import { ref, markRaw, provide, onMounted } from "vue";

interface FormField {
	component: string;
	props: Record<string, any>;
}

const formFields = ref<FormField[]>([]);
const formName = ref<string>("Untitled form...");

const componentMap = {
	FormTitle: markRaw(FormTitle),
	TextInput: markRaw(TextInput)
};

onMounted(() => {
	const savedFormName = localStorage.getItem("formName");
	formName.value = savedFormName ? savedFormName : "Untitled form...";

	const savedFields = localStorage.getItem("formFields");

	if (savedFields) {
		formFields.value = JSON.parse(savedFields);
		formFields.value.forEach((field) => {
			if (field.component === "FormTitle") {
				field.props.title = formName;
			}
		});
	}
});

function saveToLocalStorage() {
	localStorage.setItem("formFields", JSON.stringify(formFields.value));
	localStorage.setItem("formName", formName.value);
}

//provide a function to add a form field
provide("addFormField", (field: string) => {
	if (field === "Form title") {
		formFields.value.push({
			component: "FormTitle",
			props: {
				title: formName,
				style: "font-weight:bold;font-size:32px"
			}
		});
	} else if (field === "Text input") {
		formFields.value.push({
			component: "TextInput",
			props: {
				label: "Your label here",
				name: "text-input"
			}
		});
	}

	saveToLocalStorage();

	// close modal
	const modal = document.querySelector(".fields-modal");
	modal?.classList.add("hidden");
});

provide("updateFormName", (name: string) => {
	formName.value = name;
});
</script>
