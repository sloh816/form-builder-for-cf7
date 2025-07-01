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
            <textarea class="border w-full h-64 rounded-lg p-2 font-mono text-sm"></textarea>

            <h2 class="font-bold text-xl text-indigo-700 mt-8">Step 4: JavaScript</h2>
            <p class="text-sm text-slate-500 mb-4">If your form includes a toggle button, it will need JavaScript to function properly. Add the following JavaScript to your website.</p>
            <textarea class="border w-full h-64 rounded-lg p-2 font-mono text-sm"></textarea>
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

onMounted(() => {
    formCode.value = generateFormCode(props.form);
    additionalHeaders.value = generateAdditionalHeaders(props.form);
    messageBody.value = generateMessageBody(props.form);
    fileAttachments.value = generateFileAttachments(props.form);
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

                const templateCode = `[file ${field.props.id} filetypes:${field.props.fileTypes.join("|")} limit:${getFileSizeLimit()}]`;

                return `<div class="indiga-field indiga-file-upload"><label><span class="indiga-label">${field.props.label}${required}</span><div class="indiga-note-wrapper"><span class="indiga-note">Maximum file size: ${getFileSizeLimit()}</span><span class="indiga-note">Acceptable file types: ${getAcceptableFileTypes()}</span></div>${templateCode}</label></div>`;
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

const hideCodeModal = inject<(event: MouseEvent) => void>("hideCodeModal");
</script>
