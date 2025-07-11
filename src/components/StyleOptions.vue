<template>
	<div class="mt-8">
		<StyleDropdown label="Body">
			<ColorInput
				label="Background color"
				:currentForm="currentForm"
				section="Body"
				propKey="backgroundColor"
			/>
			<NumberInput
				label="Width"
				:currentForm="currentForm"
				section="Body"
				propKey="maxWidth"
				unit="px"
			/>
			<NumberInput
				label="Padding top"
				:currentForm="currentForm"
				section="Body"
				propKey="paddingTop"
				unit="px"
			/>
			<NumberInput
				label="Padding bottom"
				:currentForm="currentForm"
				section="Body"
				propKey="paddingBottom"
				unit="px"
			/>
			<NumberInput
				label="Padding left"
				:currentForm="currentForm"
				section="Body"
				propKey="paddingLeft"
				unit="px"
			/>
			<NumberInput
				label="Padding right"
				:currentForm="currentForm"
				section="Body"
				propKey="paddingRight"
				unit="px"
			/>
			<NumberInput
				label="Border radius"
				:currentForm="currentForm"
				section="Body"
				propKey="borderRadius"
				unit="px"
			/>
		</StyleDropdown>
		<StyleDropdown label="Text">
			<template v-for="heading in TextHeadings" :key="heading.propKey">
				<h4 class="border-b border-indigo-400 font-semibold mb-2">{{ heading.label }}</h4>
				<ColorInput
					label="Colour"
					:currentForm="currentForm"
					section="Text"
					:propKey="`${heading.propKey}Color`"
				/>
				<NumberInput
					label="Font size"
					:currentForm="currentForm"
					section="Text"
					:propKey="`${heading.propKey}FontSize`"
					unit="px"
				/>
				<Toggle
					label="Bold"
					:currentForm="currentForm"
					section="Text"
					:propKey="`${heading.propKey}Bold`"
					:defaultValue="heading.propKey === 'label' ? 'false' : 'true'"
					trueValue="bold"
					falseValue="normal"
				/>
			</template>
			<h4 class="border-b border-indigo-400 font-semibold mb-2">Text block</h4>
			<ColorInput
				label="Colour"
				:currentForm="currentForm"
				section="Text"
				propKey="textBlockColor"
			/>
			<ColorInput
				label="Background colour"
				:currentForm="currentForm"
				section="Text"
				propKey="textBlockBackgroundColor"
			/>
			<NumberInput
				label="Border radius"
				:currentForm="currentForm"
				section="Text"
				propKey="`textBlockBorderRadius"
				unit="px"
			/>
			<NumberInput
				label="Font size"
				:currentForm="currentForm"
				section="Text"
				propKey="textBlockFontSize"
				unit="px"
			/>
			<NumberInput
				label="Padding top"
				:currentForm="currentForm"
				section="Text"
				propKey="textBlockPaddingTop"
				unit="px"
			/>
			<NumberInput
				label="Padding bottom"
				:currentForm="currentForm"
				section="Text"
				propKey="textBlockPaddingBottom"
				unit="px"
			/>
			<NumberInput
				label="Padding left"
				:currentForm="currentForm"
				section="Text"
				propKey="textBlockPaddingLeft"
				unit="px"
			/>
			<NumberInput
				label="Padding right"
				:currentForm="currentForm"
				section="Text"
				propKey="textBlockPaddingRight"
				unit="px"
			/>
		</StyleDropdown>
		<StyleDropdown label="Input">
			<h4 class="border-b border-indigo-400 font-semibold mb-2">Fields</h4>
			<ColorInput
				label="Background colour"
				:currentForm="currentForm"
				section="Input"
				:propKey="`textFieldBackgroundColor`"
			/>
			<ColorInput
				label="Text colour"
				:currentForm="currentForm"
				section="Input"
				:propKey="`textFieldColor`"
			/>
			<NumberInput
				label="Font size"
				:currentForm="currentForm"
				section="Input"
				:propKey="`textFieldFontSize`"
				unit="px"
			/>
			<Toggle
				label="Bold"
				:currentForm="currentForm"
				section="Input"
				:propKey="`textFieldBold`"
				defaultValue="false"
				trueValue="bold"
				falseValue="normal"
			/>
			<DropdownSelect
				label="Border style"
				:currentForm="currentForm"
				section="Input"
				:propKey="`textFieldBorderStyle`"
				:options="['solid', 'dashed', 'dotted']"
			/>
			<ColorInput
				label="Border colour"
				:currentForm="currentForm"
				section="Input"
				:propKey="`textFieldBorderColor`"
			/>
			<NumberInput
				label="Border Width"
				:currentForm="currentForm"
				section="Input"
				:propKey="`textFieldBorderWidth`"
				unit="px"
			/>
			<NumberInput
				label="Border radius"
				:currentForm="currentForm"
				section="Input"
				:propKey="`textFieldBorderRadius`"
				unit="px"
			/>
			<NumberInput
				label="Padding top"
				:currentForm="currentForm"
				section="Input"
				:propKey="`textFieldPaddingTop`"
				unit="px"
			/>
			<NumberInput
				label="Padding bottom"
				:currentForm="currentForm"
				section="Input"
				:propKey="`textFieldPaddingBottom`"
				unit="px"
			/>
			<NumberInput
				label="Padding left"
				:currentForm="currentForm"
				section="Input"
				:propKey="`textFieldPaddingLeft`"
				unit="px"
			/>
			<NumberInput
				label="Padding right"
				:currentForm="currentForm"
				section="Input"
				:propKey="`textFieldPaddingRight`"
				unit="px"
			/>
			<h4 class="border-b border-indigo-400 font-semibold mb-2 mt-6">File input fields</h4>
			<DropdownSelect
				label="Border style"
				:currentForm="currentForm"
				section="Input"
				:propKey="`inputFieldBorderStyle`"
				:options="['solid', 'dashed', 'dotted']"
			/>
			<ColorInput
				label="Border colour"
				:currentForm="currentForm"
				section="Input"
				:propKey="`inputFieldBorderColor`"
			/>
			<NumberInput
				label="Border Width"
				:currentForm="currentForm"
				section="Input"
				:propKey="`inputFieldBorderWidth`"
				unit="px"
			/>
			<NumberInput
				label="Border radius"
				:currentForm="currentForm"
				section="Input"
				:propKey="`inputFieldBorderRadius`"
				unit="px"
			/>
			<NumberInput
				label="Padding top"
				:currentForm="currentForm"
				section="Input"
				:propKey="`inputFieldPaddingTop`"
				unit="px"
			/>
			<NumberInput
				label="Padding bottom"
				:currentForm="currentForm"
				section="Input"
				:propKey="`inputFieldPaddingBottom`"
				unit="px"
			/>
			<NumberInput
				label="Padding left"
				:currentForm="currentForm"
				section="Input"
				:propKey="`inputFieldPaddingLeft`"
				unit="px"
			/>
			<NumberInput
				label="Padding right"
				:currentForm="currentForm"
				section="Input"
				:propKey="`inputFieldPaddingRight`"
				unit="px"
			/>
		</StyleDropdown>
		<StyleDropdown label="Radio, checkboxes and toggle"></StyleDropdown>
		<StyleDropdown label="Submit button"></StyleDropdown>
	</div>
</template>

<script lang="ts" setup>
import StyleDropdown from "./StyleDropdown.vue";
import type { Form } from "../data/types";

// style inputs
import NumberInput from "./styleInputs/NumberInput.vue";
import ColorInput from "./styleInputs/ColorInput.vue";
import Toggle from "./styleInputs/Toggle.vue";
import DropdownSelect from "./styleInputs/DropdownSelect.vue";

interface Props {
	currentForm: Form;
}

const { currentForm } = defineProps<Props>();

const TextHeadings = [
	{ label: "Labels", propKey: "label" },
	{ label: "Form title", propKey: "formTitle" },
	{ label: "H2", propKey: "h2" },
	{ label: "H3", propKey: "h3" },
	{ label: "H4", propKey: "h4" }
];
</script>
