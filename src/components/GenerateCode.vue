<template>
    <div class="form-code-modal fixed inset-0 bg-slate-900/75 flex items-start justify-center z-20 overflow-y-auto" @click.self="hideCodeModal">
        <div class="bg-white p-12 rounded shadow-lg relative w-5xl my-8">
            <h2 class="font-bold text-xl text-indigo-700">Step 1: Form code</h2>
            <p class="text-sm text-slate-500 mb-4">Paste the code below into the 'Form' field of your Contact Form 7 form.</p>
            <textarea class="border w-full h-64 rounded-lg p-2 font-mono text-sm">{{ formCode }}</textarea>

            <h2 class="font-bold text-xl text-indigo-700 mt-8">Step 2: Mail code</h2>
            <p class="text-sm text-slate-500 mb-4">Click on the 'Mail' tab in your Contact Form 7 form and paste the code below into the relevant fields.</p>
            <div class="flex items-start gap-4">
                <p class="font-bold w-32">Additional headers</p>
                <textarea class="border w-full h-32 rounded-lg p-2 font-mono text-sm">{{ additionalHeaders }}</textarea>
            </div>
            <div class="flex items-start gap-4 mt-4">
                <p class="font-bold w-32">Message body</p>
                <textarea class="border w-full h-64 rounded-lg p-2 font-mono text-sm">{{ messageBody }}</textarea>
            </div>

            <div class="flex items-center gap-2 my-8 ml-32">
                <Checkbox class="w-8 h-8 fill-indigo-700" />
                <span class="font-bold text-lg">Use HTML content type</span>
            </div>

            <div class="flex items-start gap-4 mt-4">
                <p class="font-bold w-32">File attachments</p>
                <textarea class="border w-full h-32 rounded-lg p-2 font-mono text-sm">{{ fileAttachments }}</textarea>
            </div>

            <h2 class="font-bold text-xl text-indigo-700 mt-16">Step 3: CSS</h2>
            <p class="text-sm text-slate-500 mb-4">Add the following CSS to your website.</p>
            <textarea class="border w-full h-64 rounded-lg p-2 font-mono text-sm">{{ css }}</textarea>

            <h2 class="font-bold text-xl text-indigo-700 mt-8">Step 4: JavaScript</h2>
            <p class="text-sm text-slate-500 mb-4">If your form includes a toggle button, it will need JavaScript to function properly. Add the following JavaScript to your website.</p>
            <textarea class="border w-full h-64 rounded-lg p-2 font-mono text-sm">{{ js }}</textarea>
        </div>
    </div>
</template>

<script setup lang="ts">
import Checkbox from "@/assets/checkbox.svg";
import { onMounted, ref, inject } from "vue";

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
    console.log("Generating form code for:", form);

    if (form) {
        const formCodeArray = form.fields.map((field) => {
            if (field.component === "FormTitle") {
                return `<h${field.props.headingLevel} class="indiga-field indiga-form-title">${field.props.title}</h${field.props.headingLevel}>`;
            }

            if (field.component === "TextBlock") {
                return `<p class="indiga-field indiga-text-block">${field.props.text.replace(/\n/g, "<br>")}</p>`;
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

                const options = field.props.options.map((option: string) => `"${option}"`).join(" ");
                const templateCode = `[radio ${field.props.id} use_label_element ${options}]`;

                return `<div class="indiga-field indiga-radio-buttons-group"><p class="indiga-label">${field.props.label}${required}</p>${templateCode}</div>`;
            }

            if (field.component === "Checkboxes") {
                const required = field.props.required ? "*" : "";

                const options = field.props.options.map((option: string) => `"${option}"`).join(" ");
                const templateCode = `[checkbox ${field.props.id} use_label_element ${options}]`;

                return `<div class="indiga-field indiga-checkboxes-group"><p class="indiga-label">${field.props.label}${required}</p>${templateCode}</div>`;
            }

            if (field.component === "DropdownSelect") {
                const required = field.props.required ? "*" : "";

                const options = field.props.options.map((option: string) => `"${option}"`).join(" ");
                const templateCode = `[select ${field.props.id} ${options}]`;

                return `<div class="indiga-field"><p class="indiga-label">${field.props.label}${required}</p>${templateCode}</div>`;
            }

            if (field.component === "FileInput") {
                const required = field.props.required ? "*" : "";
                const getFileSizeLimit = () => {
                    // if KB is greater than 1000, conver to MB
                    if (field.props.fileSizeLimit >= 1000) {
                        return `${(field.props.fileSizeLimit / 1000).toFixed(2).replace(".00", "")}MB`;
                    }
                    return `${field.props.fileSizeLimit}KB`;
                };

                const fileTypesMap = [
                    { label: "Image", value: "image/*" },
                    { label: "Plain text", value: "text/plain" },
                    {
                        label: "Word documents",
                        value: "application/msword|application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    },
                    { label: "PDF", value: "application/pdf" },
                    { label: "Audio", value: "audio/*" },
                    { label: "Video", value: "video/*" },
                    { label: "CSV", value: "text/csv" },
                    { label: "Excel", value: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
                    { label: "Zip folders", value: "application/zip" },
                    { label: "All files", value: "*" },
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

                const note = `<div class="indiga-note-wrapper"><span class="indiga-note">Maximum file size: ${getFileSizeLimit()}</span><span class="indiga-note">Acceptable file types: ${getAcceptableFileTypes()}</span>`;

                const templateCode = `[file ${field.props.id} filetypes:${field.props.fileTypes.join("|")} limit:${getFileSizeLimit()}]`;

                return `<div class="indiga-field indiga-file-upload"><label><span class="indiga-label">${field.props.label}${required}</span>${note}</div>${templateCode}</label></div>`;
            }

            if (field.component === "SubmitButton") {
                return `<div class="indiga-field">[submit "${field.props.label}"]</div>`;
            }

            if (field.component === "Toggle") {
                const required = field.props.required ? "*" : "";
                const radioButtons = `[radio ${field.props.id} use_label_element "${field.props.onLabel}" "${field.props.offLabel}"]`;

                const toggleButton = `<div class="indiga-toggle-switch-button-wrapper" data-checked="${field.props.default ? "true" : "false"}" style="display: none;"><button class="indiga-toggle-switch-button" aria-label="Toggle currently: ${field.props.default ? field.props.onLabel : field.props.offLabel}. Click to toggle ${!field.props.default ? field.props.onLabel : field.props.offLabel}" type="button"><span class="indiga-toggle-switch-button-inner"></span></button><span class="indiga-toggle-button-label">${field.props.default ? field.props.onLabel : field.props.offLabel}</span></div>`;

                return `<div class="indiga-toggle-switch"><p class="indiga-label">${field.props.label}${required}</p>${radioButtons}${toggleButton}</div>`;
            }

            if (field.component === "DatePicker") {
                const required = field.props.required ? "*" : "";
                const minDate = field.props.minDate ? ` min:${field.props.minDate}` : "";
                const maxDate = field.props.maxDate ? ` max:${field.props.maxDate}` : "";
                const templateCode = `[date ${field.props.id}${minDate}${maxDate}]`;

                const minDateNote = field.props.minDate ? `<span class="indiga-note">Minimum date: ${field.props.minDate}</span>` : "";
                const maxDateNote = field.props.maxDate ? `<span class="indiga-note">Maximum date: ${field.props.maxDate}</span>` : "";

                const note = `<div class="indiga-note-wrapper">${minDateNote}${maxDateNote}</div>`;

                return `<div class="indiga-field"><label data-field-id="${field.props.id}"><span class="indiga-label">${field.props.label}${required}</span>${minDateNote || maxDateNote ? note : ""}${templateCode}</label></div>`;
            }
        });

        return "<!-- This code was generated by Indiga -->" + formCodeArray.join("") + "<!-- End code generated by Indiga -->";
    }

    return "<!-- No form fields found -->";
}

function generateAdditionalHeaders(form: Form): string {
    console.log("Generating additional headers for:", form);

    if (form) {
        const emailField = form.fields.find((field) => field.component === "TextInput" && field.props.type === "email");

        if (emailField) {
            return `Reply-To: [${emailField.props.id}]`;
        }
    }

    return "";
}

function generateMessageBody(form: Form): string {
    console.log("Generating message body for:", form);
    return "";
}

function generateFileAttachments(form: Form): string {
    console.log("Generating file attachments for:", form);

    if (form) {
        return form.fields
            .filter((field) => field.component === "FileInput")
            .map((field) => `[${field.props.id}]`)
            .join("");
    }

    return "";
}

function generateCss(form: Form): string {
    console.log("Generating CSS for:", form);

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
