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
				<CopyButton :copyText="props.form.subject ?? ''" />
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
import Checkbox from "../assets/checkbox.svg";
import { onMounted, ref, inject } from "vue";
import CopyButton from "../components/CopyButton.vue";
import { formCss, defaultCss } from "../data/form-css";
import { formJs } from "../data/form-js";

interface FormField {
	component: string;
	props: Record<string, any>;
}

interface Form {
	id: string;
	name: string;
	fields: FormField[];
	email: string;
	domain?: string;
	subject?: string;
	introText?: string;
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
	css.value = generateCss(formCss, props.form);
	js.value = getJs(formJs, props.form);
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
				const rows = field.props.rows || 4;

				const templateCode = `[textarea${required} ${field.props.id} rows:${rows}]`;

				return `<div class="indiga-field"><label data-field-id="${field.props.id}"><span class="indiga-label">${field.props.label}${required}</span>${templateCode}</label></div>`;
			}

			if (field.component === "RadioButtons") {
				const required = field.props.required ? "*" : "";

				const options = field.props.options
					.map((option: string) => `"${option}"`)
					.join(" ");
				const templateCode = `[radio ${field.props.id} use_label_element default:1 ${options}]`;

				return `<fieldset class="indiga-field indiga-radio-buttons-group"><legend class="indiga-label">${field.props.label}${required}</legend>${templateCode}</fieldset>`;
			}

			if (field.component === "Checkboxes") {
				const required = field.props.required ? "*" : "";

				const options = field.props.options
					.map((option: string) => `"${option}"`)
					.join(" ");
				const templateCode = `[checkbox${required} ${field.props.id} use_label_element ${options}]`;

				return `<fieldset class="indiga-field indiga-checkboxes-group"><legend class="indiga-label">${field.props.label}${required}</legend>${templateCode}</fieldset>`;
			}

			if (field.component === "DropdownSelect") {
				const required = field.props.required ? "*" : "";

				const options = field.props.options
					.map((option: string) => `"${option}"`)
					.join(" ");
				const templateCode = `[select${required} ${field.props.id} ${options}]`;

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
				const toggledCurrently = field.props.default
					? field.props.onLabel
					: field.props.offLabel;

				const defaultState = field.props.default ? "1" : "2";

				const radioButtons = `[radio ${field.props.id} use_label_element default:${defaultState} "${field.props.onLabel}" "${field.props.offLabel}"]`;

				const dataChecked = field.props.default ? "true" : "false";

				const toggleButton = `<div class="indiga-toggle-switch-button-wrapper" data-checked="${dataChecked}" style="display: none;"><button class="indiga-toggle-switch-button" aria-label="Toggle ${field.props.label}" aria-description="Currently toggled: ${toggledCurrently}" type="button"><span class="indiga-toggle-switch-button-inner"></span></button><span class="indiga-toggle-button-label">${toggledCurrently}</span></div>`;

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

		const header = `<h1>${subject}</h1><p>${introText}</p>`;

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
						.map((field: any) => {
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

function convertFormForEmailPreview(form: Form): any[] {
	// split the form into tables and heading/text
	const formEmailPreview: any[] = [];
	let tableOpen: any[] = [];
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
function generateCss(css: string, form: Form): string {
	const addPx = ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "borderRadius"];

	if (form) {
		return css
			.replace(/\[\[([^\]]+)\]\]/g, (match, p1) => {
				const [label, property] = p1.split(".");
				const style = form.styles?.find((s) => s.label === label);

				if (style && style.properties[property]) {
					return style.properties[property] + (addPx.includes(property) ? "px" : "");
				}

				return match;
			})
			.replace(/\[\[([^\]]+)\]\]/g, (match, p1) => {
				const [label, property] = p1.split(".");
				const defaultStyle = defaultCss.find((s) => s.label === label);
				if (defaultStyle && defaultStyle.properties[property]) {
					return (
						defaultStyle.properties[property] + (addPx.includes(property) ? "px" : "")
					);
				}
				return match; // return original match if not found
			});
	}

	return "";
}
// #endregion

function getJs(js: string, form: Form): string {
	if (form) {
		const toggleField = form.fields.find((field) => field.component === "Toggle");
		if (toggleField) {
			return js;
		}
	}

	return "// No JavaScript needed for this form";
}

const hideCodeModal = inject<(event: MouseEvent) => void>("hideCodeModal");
</script>
