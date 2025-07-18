<template>
	<ul class="flex gap-4 flex-wrap justify-center max-w-4xl">
		<li v-for="option in options" :key="option.label">
			<FieldButton
				:label="option.label"
				:description="option.description"
				:icon="option.icon"
				:component="option.component"
				:defaultProps="option.defaultProps"
			/>
		</li>
	</ul>
</template>

<script setup lang="ts">
import FieldButton from "./FieldButton.vue";

//icons
import TextInput from "../assets/textinput.svg";
import Checkbox from "../assets/checkbox.svg";
import DatePicker from "../assets/date-picker.svg";
import Dropdown from "../assets/dropdown.svg";
import Heading from "../assets/heading.svg";
import Radio from "../assets/radio.svg";
import SubmitButton from "../assets/submit-button.svg";
import TextAlign from "../assets/text-align.svg";
import Textarea from "../assets/textarea.svg";
import Title from "../assets/title.svg";
import Upload from "../assets/upload.svg";

const options = [
	{
		label: "Text input",
		description: "A single line text field",
		icon: TextInput,
		component: "TextInput",
		defaultProps: {
			label: "Text input label",
			type: "text",
			placeholder: "Enter text here...",
			required: false
		}
	},
	{
		label: "Text area",
		description: "A multi-line text field",
		icon: Textarea,
		component: "TextArea",
		defaultProps: {
			label: "Your message",
			placeholder: "Type your message here...",
			required: false,
			rows: 4,
			maxlength: null
		}
	},
	{
		label: "Checkboxes",
		description: "Select more than one option",
		icon: Checkbox,
		component: "Checkboxes",
		defaultProps: {
			label: "Select options",
			options: ["Option 1", "Option 2", "Option 3"],
			required: false
		}
	},
	{
		label: "Radio buttons",
		description: "Select one option from a set",
		icon: Radio,
		component: "RadioButtons",
		defaultProps: {
			label: "Select an option",
			options: ["Option 1", "Option 2", "Option 3"]
		}
	},
	{
		label: "Toggle switch",
		description: "True or false selection",
		icon: Checkbox,
		component: "Toggle",
		defaultProps: {
			label: "Toggle switch",
			onLabel: "On",
			offLabel: "Off",
			required: false,
			default: false
		}
	},
	{
		label: "Submit button",
		description: "A button to submit the form",
		icon: SubmitButton,
		component: "SubmitButton",
		defaultProps: {
			label: "Submit"
		}
	},
	{
		label: "Dropdown select",
		description: "A dropdown select field",
		icon: Dropdown,
		component: "DropdownSelect",
		defaultProps: {
			label: "Select an option",
			options: ["Option 1", "Option 2", "Option 3"],
			required: false
		}
	},
	{
		label: "File input",
		description: "Upload a file",
		icon: Upload,
		component: "FileInput",
		defaultProps: {
			label: "Upload a file",
			fileTypes: ["*"],
			fileSizeLimit: 2048, // in KB
			required: false
		}
	},
	{
		label: "Date picker",
		description: "Input a date",
		icon: DatePicker,
		component: "DatePicker",
		defaultProps: {
			label: "Select a date",
			minDate: "",
			maxDate: "",
			required: false
		}
	},
	{
		label: "Form title",
		description: "Add a title to the form",
		icon: Title,
		component: "FormTitle",
		defaultProps: {
			headingLevel: 1
		}
	},
	{
		label: "Heading",
		description: "Add a heading to the form",
		icon: Heading,
		component: "Heading",
		defaultProps: {
			headingLevel: 2,
			heading: "Subheading"
		}
	},
	{
		label: "Text block",
		description: "Write some text",
		icon: TextAlign,
		component: "TextBlock",
		defaultProps: {
			text: "This is a text block. You can write anything here..."
		}
	}
];
</script>
