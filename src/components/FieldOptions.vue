<template>
	<ul class="flex gap-4 flex-wrap justify-center max-w-4xl">
		<li v-for="(option, index) in options" :key="option.label">
			<FieldOption
				:label="option.label"
				:description="option.description"
				:icon="option.icon"
			/>
		</li>
	</ul>
</template>

<script setup lang="ts">
import FieldOption from "./FieldOption.vue";

//icons
import TextInput from "@/assets/textinput.svg";
import Checkbox from "@/assets/checkbox.svg";
import DatePicker from "@/assets/date-picker.svg";
import Dropdown from "@/assets/dropdown.svg";
import Heading from "@/assets/heading.svg";
import Radio from "@/assets/radio.svg";
import SubmitButton from "@/assets/submit-button.svg";
import TextAlign from "@/assets/text-align.svg";
import Textarea from "@/assets/textarea.svg";
import Title from "@/assets/title.svg";
import Doc from "@/assets/document.svg";
import Upload from "@/assets/upload.svg";

const options = [
	{
		label: "Text input",
		description: "A single line text field",
		icon: TextInput
	},
	{
		label: "Text area",
		description: "A multi-line text field",
		icon: Textarea
	},
	{
		label: "Checkboxes",
		description: "Select more than one option",
		icon: Checkbox
	},
	{
		label: "Radio buttons",
		description: "Select one option from a set",
		icon: Radio
	},
	{
		label: "Checkbox",
		description: "True or false selection",
		icon: Checkbox
	},
	{
		label: "Submit button",
		description: "A button to submit the form",
		icon: SubmitButton
	},
	{
		label: "Dropdown select",
		description: "A dropdown select field",
		icon: Dropdown
	},
	{
		label: "File input",
		description: "Upload a file",
		icon: Upload
	},
	{
		label: "Date picker",
		description: "Input a date",
		icon: DatePicker
	},
	{
		label: "Form title",
		description: "Add a title to the form",
		icon: Title
	},
	{
		label: "Heading",
		description: "Add a heading to the form",
		icon: Heading
	},
	{
		label: "Text block",
		description: "Write some text",
		icon: TextAlign
	}
];
</script>
