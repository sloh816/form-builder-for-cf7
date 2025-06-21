<template>
	<div class="flex flex-col min-h-screen">
		<Header />
		<main class="flex grow">
			<FormInfo />
			<div class="form-builder bg-white shadow-md w-full px-6">
				<PreviewOptions />
				<div class="form-preview max-w-3xl">
					<div class="form-builder-preview grid gap-4">
						<component
							v-for="(field, index) in formFields"
							:key="index"
							:is="field.component"
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
import { ref, markRaw, provide } from "vue";

interface FormField {
	component: Component;
	props: Record<string, any>;
}

const formFields = ref<FormField[]>([]);

const formName = ref<string>("Untitled form...");

//provide a function to add a form field
provide("addFormField", (field: string) => {
	if (field === "Form title") {
		formFields.value.push({
			component: markRaw(FormTitle),
			props: {
				title: formName,
				style: "font-weight:bold;font-size:32px"
			}
		});
	} else if (field === "Text input") {
		formFields.value.push({
			component: markRaw(TextInput),
			props: {
				label: "Your label here",
				name: "text-input"
			}
		});
	}

	// close modal
	const modal = document.querySelector(".fields-modal");
	modal?.classList.add("hidden");
});

provide("updateFormName", (name: string) => {
	formName.value = name;
});
</script>
