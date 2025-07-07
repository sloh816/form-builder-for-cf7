<template>
	<div class="max-w-3xl mb-16">
		<label class="flex gap-4 items-center mb-4">
			<span class="w-30"><strong>To:</strong></span>
			<input
				class="border border-slate-300 p-2 rounded w-full"
				type="text"
				placeholder="Email address to send to..."
				:value="props.currentForm.email"
				@input="updateEmail(($event.target as HTMLInputElement)?.value ?? '')"
			/>
		</label>
		<label class="flex gap-4 items-center mb-4">
			<span class="w-30"><strong>Your domain:</strong></span>
			<input
				class="border border-slate-300 p-2 rounded w-full"
				type="text"
				placeholder="Your website domain... eg. example.com"
				:value="props.currentForm.domain"
				@input="updateDomain(($event.target as HTMLInputElement)?.value ?? '')"
			/>
		</label>
		<label class="flex gap-4 items-center mb-4">
			<span class="w-30"><strong>Subject:</strong></span>
			<input
				class="border border-slate-300 p-2 rounded w-full"
				type="text"
				:value="subject"
				@input="updateSubject(($event.target as HTMLInputElement)?.value ?? '')"
			/>
		</label>

		<h1 class="text-3xl font-bold mt-8 mb-4">{{ subject }}</h1>
		<textarea
			class="w-full min-h-20 hover:outline outline-indigo-600 rounded-sm outline-offset-4 leading-relaxed"
			name="intro-text"
		>
The '{{ props.currentForm.name }}' form was submitted on your website ({{ domain }}).
The response is below:
</textarea
		>

		<div v-for="(field, index) in emailPreviewArray" :key="index">
			<component
				v-if="field.component === 'Heading'"
				:is="'h' + field.props.headingLevel"
				class="text-2xl font-bold mb-4 mt-8"
			>
				{{ field.props.heading }}
			</component>

			<component
				v-if="field.component === 'Table'"
				is="table"
				class="w-full mb-8 border border-slate-600"
			>
				<tr>
					<th class="w-1/2 bg-slate-600 text-white py-2 px-3 text-left">Field</th>
					<th class="w-1/2 bg-slate-600 text-white py-2 px-3 text-left">Response</th>
				</tr>
				<tr v-for="formField in field.props.fields" :key="formField.props.name">
					<td
						class="font-bold py-2 px-3 border-b border-slate-600 border-r border-slate-600"
					>
						{{ formField.props.name }}
						{{ formField.props.label }}
					</td>
					<td class="py-2 px-3 border-b border-slate-600">Submission response here...</td>
				</tr>
			</component>
		</div>

		<!-- <pre>{{ props.currentForm }}</pre> -->
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from "vue";
import type { Form, FormField } from "../data/types";

interface Props {
	currentForm: Form;
}

const props = defineProps<Props>();

const subject = ref(props.currentForm.name + " submission received");
const domain = ref("example.com");
const emailPreviewArray = ref<any[]>([]);

onMounted(() => {
	if (props.currentForm) {
		// split the form into tables and heading/text
		const formEmailPreview: any[] = [];
		let tableOpen: FormField[] = [];

		props.currentForm.fields.forEach((field, index) => {
			const pushLastTable = () => {
				if (index === props.currentForm.fields.length - 1 && tableOpen.length > 0) {
					formEmailPreview.push({
						component: "Table",
						props: {
							fields: tableOpen
						}
					});
				}
			};

			if (
				field.component === "FormTitle" ||
				field.component === "TextBlock" ||
				field.component === "SubmitButton"
			) {
				pushLastTable();
				return;
			} else if (field.component === "Heading") {
				if (tableOpen.length > 0) {
					formEmailPreview.push({
						component: "Table",
						props: {
							fields: tableOpen
						}
					});

					tableOpen = [];
				}

				formEmailPreview.push(field);
			} else {
				tableOpen.push(field);
			}

			pushLastTable();
		});

		emailPreviewArray.value = formEmailPreview;
	}

	updateSubject(props.currentForm.name + " submission received");
});

const updateField = inject<Function>("updateField");
function updateEmail(email: string) {
	if (updateField) {
		updateField("email", email);
	}
}

function updateDomain(value: string) {
	domain.value = value;

	if (updateField) {
		updateField("domain", value);
	}
}

function updateSubject(value: string) {
	subject.value = value;

	if (updateField) {
		updateField("subject", value);
	}
}
</script>
