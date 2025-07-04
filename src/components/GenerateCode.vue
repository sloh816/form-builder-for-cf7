<template>
	<div
		class="form-code-modal fixed inset-0 bg-slate-900/75 flex items-start justify-center z-20 overflow-y-auto"
		@click.self="hideCodeModal"
	>
		<div class="bg-white p-12 rounded shadow-lg relative w-5xl my-8">
			<h2 class="font-bold text-xl text-indigo-700">Step 1: Form code</h2>
			<p class="text-sm text-slate-500 mb-4">
				Paste the code below into the 'Form' field of your Contact Form 7 form.
			</p>
			<div class="relative">
				<CopyButton class="absolute top-3 right-6" :copyText="formCode" />
				<textarea class="border w-full h-64 rounded-lg p-2 font-mono text-sm" readonly>{{
					formCode
				}}</textarea>
			</div>

			<h2 class="font-bold text-xl text-indigo-700 mt-8">Step 2: Mail code</h2>
			<p class="text-sm text-slate-500 mb-4">
				Click on the 'Mail' tab in your Contact Form 7 form and paste the code below into
				the relevant fields.
			</p>

			<div class="flex items-start gap-4 mt-4">
				<p class="font-bold w-32">To</p>
				<input
					class="border w-full rounded-lg p-2 font-mono text-sm"
					:value="props.form.email"
					readonly
				/>
				<CopyButton :copyText="props.form.email" />
			</div>

			<div class="flex items-start gap-4 mt-4">
				<p class="font-bold w-32">From</p>
				<input
					class="border w-full rounded-lg p-2 font-mono text-sm"
					:value="`[_site_title] <wordpress@${props.form.domain}>`"
					readonly
				/>
				<CopyButton :copyText="`[_site_title] <wordpress@${props.form.domain}>`" />
			</div>

			<div class="flex items-start gap-4 mt-4">
				<p class="font-bold w-32">Subject</p>
				<input
					class="border w-full rounded-lg p-2 font-mono text-sm"
					:value="props.form.subject"
					readonly
				/>
				<CopyButton :copyText="props.form.subject" />
			</div>

			<div class="flex items-start gap-4 mt-4">
				<p class="font-bold w-32">Additional headers</p>
				<div class="relative w-full">
					<CopyButton class="absolute top-3 right-3" :copyText="additionalHeaders" />
					<textarea
						class="border w-full h-32 rounded-lg p-2 font-mono text-sm"
						readonly
						>{{ additionalHeaders }}</textarea
					>
				</div>
			</div>

			<div class="flex items-start gap-4 mt-4">
				<p class="font-bold w-32">Message body</p>
				<div class="relative w-full">
					<CopyButton class="absolute top-3 right-6" :copyText="messageBody" />
					<textarea
						class="border w-full h-64 rounded-lg p-2 font-mono text-sm"
						readonly
						>{{ messageBody }}</textarea
					>
				</div>
			</div>

			<div class="flex items-center gap-2 my-8 ml-32">
				<Checkbox class="w-8 h-8 fill-indigo-700" />
				<span class="font-bold text-lg">Use HTML content type</span>
			</div>

			<div class="flex items-start gap-4 mt-4">
				<p class="font-bold w-32">File attachments</p>
				<div class="relative w-full">
					<CopyButton class="absolute top-3 right-3" :copyText="fileAttachments" />
					<textarea
						class="border w-full h-32 rounded-lg p-2 font-mono text-sm"
						readonly
						>{{ fileAttachments }}</textarea
					>
				</div>
			</div>

			<h2 class="font-bold text-xl text-indigo-700 mt-16">Step 3: CSS</h2>
			<p class="text-sm text-slate-500 mb-4">Add the following CSS to your website.</p>
			<div class="relative">
				<CopyButton class="absolute top-3 right-6" :copyText="css" />
				<textarea class="border w-full h-64 rounded-lg p-2 font-mono text-sm" readonly>{{
					css
				}}</textarea>
			</div>

			<h2 class="font-bold text-xl text-indigo-700 mt-8">Step 4: JavaScript</h2>
			<p class="text-sm text-slate-500 mb-4">
				If your form includes a toggle button, it will need JavaScript to function properly.
				Add the following JavaScript to your website.
			</p>
			<div class="relative">
				<CopyButton class="absolute top-3 right-6" :copyText="js" />
				<textarea class="border w-full h-64 rounded-lg p-2 font-mono text-sm">{{
					js
				}}</textarea>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Checkbox from "@/assets/checkbox.svg";
import { onMounted, ref, inject } from "vue";
import CopyButton from "@/components/CopyButton.vue";

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
	form: Form;
}

const props = defineProps<Props>();

const formCode = ref<string>("???");
const additionalHeaders = ref<string>("");
const messageBody = ref<string>("");
const fileAttachments = ref<string>("");
const css = ref<string>("");
const js = ref<string>("");

onMounted(() => {
	formCode.value = generateFormCode(props.form);
	additionalHeaders.value = generateAdditionalHeaders(props.form);
	messageBody.value = generateMessageBody(props.form);
	fileAttachments.value = generateFileAttachments(props.form);
	css.value = generateCss(props.form);
	js.value = getJs(props.form);
});

function generateFormCode(form: Form): string {
	if (form) {
		const formCodeArray = form.fields.map((field) => {
			if (field.component === "FormTitle") {
				return `<h${field.props.headingLevel} class="indiga-field indiga-form-title">${field.props.title}</h${field.props.headingLevel}>`;
			}

			if (field.component === "TextBlock") {
				return `<p class="indiga-field indiga-text-block">${field.props.text.replace(
					/\n/g,
					"<br>"
				)}</p>`;
			}

			if (field.component === "Heading") {
				return `<h${field.props.headingLevel} class="indiga-field indiga-heading">${field.props.heading}</h${field.props.headingLevel}>`;
			}

			if (field.component === "TextInput") {
				const required = field.props.required ? "*" : "";
				let type = "text";
				let autocomplete = "";

				if (field.props.type === "name") {
					type = "text";
					autocomplete = " autocomplete:name";
				} else if (field.props.type === "email") {
					type = "email";
					autocomplete = " autocomplete:email";
				} else if (field.props.type === "phone") {
					type = "tel";
					autocomplete = " autocomplete:phone";
				}

				const templateCode = `[${type}${required} ${field.props.id}${autocomplete}]`;

				return `<div class="indiga-field"><label data-field-id="${field.props.id}"><span class="indiga-label">${field.props.label}${required}</span>${templateCode}</label></div>`;
			}

			if (field.component === "TextArea") {
				const required = field.props.required ? "*" : "";
				const templateCode = `[textarea${required} ${field.props.id}]`;

				return `<div class="indiga-field"><label data-field-id="${field.props.id}"><span class="indiga-label">${field.props.label}${required}</span>${templateCode}</label></div>`;
			}

			if (field.component === "RadioButtons") {
				const required = field.props.required ? "*" : "";

				const options = field.props.options
					.map((option: string) => `"${option}"`)
					.join(" ");
				const templateCode = `[radio ${field.props.id} use_label_element ${options}]`;

				return `<div class="indiga-field indiga-radio-buttons-group"><p class="indiga-label">${field.props.label}${required}</p>${templateCode}</div>`;
			}

			if (field.component === "Checkboxes") {
				const required = field.props.required ? "*" : "";

				const options = field.props.options
					.map((option: string) => `"${option}"`)
					.join(" ");
				const templateCode = `[checkbox ${field.props.id} use_label_element ${options}]`;

				return `<div class="indiga-field indiga-checkboxes-group"><p class="indiga-label">${field.props.label}${required}</p>${templateCode}</div>`;
			}

			if (field.component === "DropdownSelect") {
				const required = field.props.required ? "*" : "";

				const options = field.props.options
					.map((option: string) => `"${option}"`)
					.join(" ");
				const templateCode = `[select ${field.props.id} ${options}]`;

				return `<div class="indiga-field"><p class="indiga-label">${field.props.label}${required}</p>${templateCode}</div>`;
			}

			if (field.component === "FileInput") {
				const required = field.props.required ? "*" : "";
				const getFileSizeLimit = () => {
					// if KB is greater than 1000, conver to MB
					if (field.props.fileSizeLimit >= 1000) {
						return `${(field.props.fileSizeLimit / 1000)
							.toFixed(2)
							.replace(".00", "")}MB`;
					}
					return `${field.props.fileSizeLimit}KB`;
				};

				const fileTypesMap = [
					{ label: "Image", value: "image/*" },
					{ label: "Plain text", value: "text/plain" },
					{
						label: "Word documents",
						value: "application/msword|application/vnd.openxmlformats-officedocument.wordprocessingml.document"
					},
					{ label: "PDF", value: "application/pdf" },
					{ label: "Audio", value: "audio/*" },
					{ label: "Video", value: "video/*" },
					{ label: "CSV", value: "text/csv" },
					{
						label: "Excel",
						value: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
					},
					{ label: "Zip folders", value: "application/zip" },
					{ label: "All files", value: "*" }
				];

				const getAcceptableFileTypes = () => {
					if (field.props.fileTypes.length === 0) {
						return "All files";
					}
					return field.props.fileTypes
						.map((type: string) => {
							const foundType = fileTypesMap.find((t) => t.value === type);
							return foundType ? foundType.label : type;
						})
						.join(", ");
				};

				const note = `<span class="indiga-note-wrapper"><span class="indiga-note">Maximum file size: ${getFileSizeLimit()}</span><span class="indiga-note">Acceptable file types: ${getAcceptableFileTypes()}</span>`;

				const templateCode = `[file ${
					field.props.id
				} filetypes:${field.props.fileTypes.join("|")} limit:${getFileSizeLimit()}]`;

				return `<div class="indiga-field indiga-file-upload"><label><span class="indiga-label">${field.props.label}${required}</span>${note}</span>${templateCode}</label></div>`;
			}

			if (field.component === "SubmitButton") {
				return `<div class="indiga-field">[submit "${field.props.label}"]</div>`;
			}

			if (field.component === "Toggle") {
				const required = field.props.required ? "*" : "";
				const radioButtons = `[radio ${field.props.id} use_label_element "${field.props.onLabel}" "${field.props.offLabel}"]`;

				const toggleButton = `<div class="indiga-toggle-switch-button-wrapper" data-checked="${
					field.props.default ? "true" : "false"
				}" style="display: none;"><button class="indiga-toggle-switch-button" aria-label="Toggle currently: ${
					field.props.default ? field.props.onLabel : field.props.offLabel
				}. Click to toggle ${
					!field.props.default ? field.props.onLabel : field.props.offLabel
				}" type="button"><span class="indiga-toggle-switch-button-inner"></span></button><span class="indiga-toggle-button-label">${
					field.props.default ? field.props.onLabel : field.props.offLabel
				}</span></div>`;

				return `<div class="indiga-toggle-switch"><p class="indiga-label">${field.props.label}${required}</p>${radioButtons}${toggleButton}</div>`;
			}

			if (field.component === "DatePicker") {
				const required = field.props.required ? "*" : "";
				const minDate = field.props.minDate ? ` min:${field.props.minDate}` : "";
				const maxDate = field.props.maxDate ? ` max:${field.props.maxDate}` : "";
				const templateCode = `[date ${field.props.id}${minDate}${maxDate}]`;

				const minDateNote = field.props.minDate
					? `<span class="indiga-note">Minimum date: ${field.props.minDate}</span>`
					: "";
				const maxDateNote = field.props.maxDate
					? `<span class="indiga-note">Maximum date: ${field.props.maxDate}</span>`
					: "";

				const note = `<div class="indiga-note-wrapper">${minDateNote}${maxDateNote}</div>`;

				return `<div class="indiga-field"><label data-field-id="${
					field.props.id
				}"><span class="indiga-label">${field.props.label}${required}</span>${
					minDateNote || maxDateNote ? note : ""
				}${templateCode}</label></div>`;
			}
		});

		return (
			"<!-- This code was generated by Indiga -->" +
			formCodeArray.join("") +
			"<!-- End code generated by Indiga -->"
		);
	}

	return "<!-- No form fields found -->";
}

function generateAdditionalHeaders(form: Form): string {
	if (form) {
		const emailField = form.fields.find(
			(field) => field.component === "TextInput" && field.props.type === "email"
		);

		if (emailField) {
			return `Reply-To: [${emailField.props.id}]`;
		}
	}

	return "";
}

function generateMessageBody(form: Form): string {
	if (form) {
		const formForEmailPreview = convertFormForEmailPreview(form);

		const subject = form.subject || `${form.name} submission received`;

		const domain = form.domain ? ` (${form.domain})` : "";

		const introText = form.introText
			? form.introText
			: `The '${form.name}' form was submitted on your website${domain}.<br/>The response is below:`;

		const header = `<h1>${form.subject}</h1><p>${introText}</p>`;

		let currentHeadingLevel = 2;
		let difference = 0;
		let firstHeadingFound = false;
		const body = formForEmailPreview
			.map((field) => {
				if (field.component === "Heading") {
					if (!firstHeadingFound) {
						firstHeadingFound = true;
						if (field.props.headingLevel > currentHeadingLevel) {
							difference = field.props.headingLevel - currentHeadingLevel;
						}
					}
					const headingLevel = field.props.headingLevel - difference;
					return `<h${headingLevel}>${field.props.heading}</h${headingLevel}>`;
				}

				if (field.component === "Table") {
					const tableBody = field.props.fields
						.map((field) => {
							return `<tr><td style="text-align:left;font-weight:bold;"><p style="margin:0">${field.props.label}</p></td><td><p style="margin:0">[${field.props.id}]</p></td></tr>`;
						})
						.join("");

					return `<table border="1" cellpadding="5" width="600" style="border-collapse: collapse; border-color:#45556c"><thead><tr><th style="background:#45556c; color:white; width:50%"><p style="margin:0">Field</p></th><th style="background:#45556c; color:white; width:50%"><p style="margin:0">Response</p></th></tr></thead><tbody>${tableBody}</tbody></table>`;
				}
			})
			.join("");

		return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"></head><body style="font-family:ui-sans-serif, system-ui, sans-serif;">${header}${body}</body></html>`;
	}

	return "";
}

function generateFileAttachments(form: Form): string {
	if (form) {
		return form.fields
			.filter((field) => field.component === "FileInput")
			.map((field) => `[${field.props.id}]`)
			.join("");
	}

	return "";
}

function convertFormForEmailPreview(form: Form): string {
	// split the form into tables and heading/text
	const formEmailPreview = [];
	let tableOpen = [];
	form.fields.forEach((field, index) => {
		const pushLastTable = () => {
			if (index === form.fields.length - 1 && tableOpen.length > 0) {
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

	return formEmailPreview;
}

// #region Generate CSS
function generateCss(form: Form): string {
	if (form) {
		return `/* This CSS was generated by Indiga */

.indiga-field p {
    margin: 0;
    padding: 0;
}

.indiga-label,
p.indiga-label {
    display: block;
    margin-bottom: 4px;
}

.indiga-note-wrapper {
    margin: 8px 0;
}

.indiga-note {
    display: block;
    font-size: 14px;
    color: #555;
}

.indiga-checkboxes-group .indiga-label,
.indiga-radio-buttons-group .indiga-label,
.indiga-toggle-switch .indiga-label {
    margin-bottom: 16px;
}

.indiga-checkboxes-group .wpcf7-form-control-wrap,
.indiga-radio-buttons-group .wpcf7-form-control-wrap,
.indiga-toggle-switch .wpcf7-form-control-wrap {
    margin-left: 8px;
}

.wpcf7-form-control-wrap {
    display: block;
}

.wpcf7-form-control {
    border: 1px solid #ccc;
    width: 100%;
    border-radius: 4px;
    padding: 8px;
    font-size: 16px;
}

.wpcf7-radio,
.wpcf7-checkbox {
    border: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin: 8px 0;
}

.wpcf7-list-item {
    display: block;
    margin-left: 4px;
}

.wpcf7-list-item label {
    display: inline-flex;
    gap: 8px;
    cursor: pointer;
    align-items: center;
}

.wpcf7-list-item input[type="radio"],
.wpcf7-list-item input[type="checkbox"] {
    width: 24px;
    height: 24px;
}

.wpcf7-file::file-selector-button {
    background-color: #e0e0e1;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
    margin-right: 16px;
}

.wpcf7-submit {
    background-color: #1d4ed8;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
    margin-right: 16px;
    width: unset;
}

.indiga-toggle-switch-button {
    display: block;
    background: #cbd5e1;
    width: 60px;
    height: 36px;
    border-radius: 1000px;
    position: relative;
    border: none;
    cursor: pointer;
}

.indiga-toggle-switch-button-wrapper,
.indiga-toggle-switch-button-wrapper > * {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: bold;
    margin: 0;
}

.indiga-toggle-switch-button-inner {
    background: white;
    width: 28px;
    height: 28px;
    display: block;
    border-radius: 50%;
    position: absolute;
    top: 4px;
    left: 4px;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    transition: 0.3s ease-out;
}

[data-checked="true"] .indiga-toggle-switch-button {
    background: #3b82f6;
}

[data-checked="true"] .indiga-toggle-switch-button .indiga-toggle-switch-button-inner {
    transform: translateX(24px);
}

.indiga-file-upload {
    border: 1px solid #ccc;
    padding: 16px;
    border-radius: 8px;
}

.wpcf7-date {
    width: 150px;
}

.indiga-field {
    margin: 20px 0;
}

/* End of CSS generated by Indiga */
`;
	}

	return "";
}
// #endregion

function getJs(form: Form): string {
	if (form) {
		const toggleField = form.fields.find((field) => field.component === "Toggle");
		if (toggleField) {
			return `/* This JavaScript was generated by Indiga */

const toggleSwitches = document.querySelectorAll(".indiga-toggle-switch");

toggleSwitches.forEach((toggle) => {
	addFunctionToToggle(toggle);
});

function addFunctionToToggle(toggle) {
	const toggleButtonWrapper = toggle.querySelector(".indiga-toggle-switch-button-wrapper");
	toggleButtonWrapper.style.display = "flex";

	const radioButtons = toggle.querySelector(".wpcf7-form-control-wrap");
	radioButtons.style.display = "none";

	const toggleButton = toggleButtonWrapper.querySelector("button");

	toggleButton.addEventListener("click", () => {
		const isChecked = toggleButtonWrapper.getAttribute("data-checked") === "true";
		toggleButtonWrapper.setAttribute("data-checked", !isChecked);

		const toggleButtonLabel = toggle.querySelector(".indiga-toggle-button-label");
		if (!isChecked === true) {
			const firstRadio = radioButtons.querySelector('.first input[type="radio"]');
			firstRadio.checked = true;
			toggleButtonLabel.textContent = firstRadio.value;
		} else {
			const lastRadio = radioButtons.querySelector('.last input[type="radio"]');
			lastRadio.checked = true;
			toggleButtonLabel.textContent = lastRadio.value;
		}
	});
}

/* End of JavaScript generated by Indiga */`;
		}
	}

	return "// No JavaScript needed for this form";
}

const hideCodeModal = inject<(event: MouseEvent) => void>("hideCodeModal");
</script>
