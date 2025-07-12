<template>
	<div class="mt-8">
		<StyleDropdown label="Body">
			<ColorInput
				label="Background color"
				:currentForm="currentForm"
				propKey="backgroundColor"
			/>
			<NumberInput label="Width" :currentForm="currentForm" propKey="maxWidth" unit="px" />
			<NumberInput
				label="Padding top"
				:currentForm="currentForm"
				propKey="bodyPaddingTop"
				unit="px"
			/>
			<NumberInput
				label="Padding bottom"
				:currentForm="currentForm"
				propKey="bodyPaddingBottom"
				unit="px"
			/>
			<NumberInput
				label="Padding left"
				:currentForm="currentForm"
				propKey="bodyPaddingLeft"
				unit="px"
			/>
			<NumberInput
				label="Padding right"
				:currentForm="currentForm"
				propKey="bodyPaddingRight"
				unit="px"
			/>
			<NumberInput
				label="Border radius"
				:currentForm="currentForm"
				propKey="borderRadius"
				unit="px"
			/>
		</StyleDropdown>
		<StyleDropdown label="Headings">
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
		</StyleDropdown>
		<StyleDropdown label="Text">
			<h4 class="border-b border-indigo-400 font-semibold mb-2">Labels</h4>
			<ColorInput
				label="Colour"
				:currentForm="currentForm"
				section="Text"
				:propKey="`labelColor`"
			/>
			<NumberInput
				label="Font size"
				:currentForm="currentForm"
				section="Text"
				:propKey="`labelFontSize`"
				unit="px"
			/>
			<Toggle
				label="Bold"
				:currentForm="currentForm"
				section="Text"
				:propKey="`labelBold`"
				defaultValue="false"
				trueValue="bold"
				falseValue="normal"
			/>
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
		<StyleDropdown label="Input fields">
			<ColorInput
				label="Background colour"
				:currentForm="currentForm"
				:propKey="`textFieldBackgroundColor`"
			/>
			<ColorInput
				label="Text colour"
				:currentForm="currentForm"
				:propKey="`textFieldColor`"
			/>
			<NumberInput
				label="Font size"
				:currentForm="currentForm"
				:propKey="`textFieldFontSize`"
				unit="px"
			/>
			<Toggle
				label="Bold"
				:currentForm="currentForm"
				:propKey="`textFieldBold`"
				defaultValue="false"
				trueValue="bold"
				falseValue="normal"
			/>
			<DropdownSelect
				label="Border style"
				:currentForm="currentForm"
				:propKey="`textFieldBorderStyle`"
				:options="['solid', 'dashed', 'dotted']"
			/>
			<ColorInput
				label="Border colour"
				:currentForm="currentForm"
				:propKey="`textFieldBorderColor`"
			/>
			<NumberInput
				label="Border Width"
				:currentForm="currentForm"
				:propKey="`textFieldBorderWidth`"
				unit="px"
			/>
			<NumberInput
				label="Border radius"
				:currentForm="currentForm"
				:propKey="`textFieldBorderRadius`"
				unit="px"
			/>
			<NumberInput
				label="Padding top"
				:currentForm="currentForm"
				:propKey="`textFieldPaddingTop`"
				unit="px"
			/>
			<NumberInput
				label="Padding bottom"
				:currentForm="currentForm"
				:propKey="`textFieldPaddingBottom`"
				unit="px"
			/>
			<NumberInput
				label="Padding left"
				:currentForm="currentForm"
				:propKey="`textFieldPaddingLeft`"
				unit="px"
			/>
			<NumberInput
				label="Padding right"
				:currentForm="currentForm"
				:propKey="`textFieldPaddingRight`"
				unit="px"
			/>
		</StyleDropdown>
		<StyleDropdown label="File input fields">
			<DropdownSelect
				label="Border style"
				:currentForm="currentForm"
				:propKey="`inputFieldBorderStyle`"
				:options="['solid', 'dashed', 'dotted']"
			/>
			<ColorInput
				label="Border colour"
				:currentForm="currentForm"
				:propKey="`inputFieldBorderColor`"
			/>
			<NumberInput
				label="Border Width"
				:currentForm="currentForm"
				:propKey="`inputFieldBorderWidth`"
				unit="px"
			/>
			<NumberInput
				label="Border radius"
				:currentForm="currentForm"
				:propKey="`inputFieldBorderRadius`"
				unit="px"
			/>
			<NumberInput
				label="Padding top"
				:currentForm="currentForm"
				:propKey="`inputFieldPaddingTop`"
				unit="px"
			/>
			<NumberInput
				label="Padding bottom"
				:currentForm="currentForm"
				:propKey="`inputFieldPaddingBottom`"
				unit="px"
			/>
			<NumberInput
				label="Padding left"
				:currentForm="currentForm"
				:propKey="`inputFieldPaddingLeft`"
				unit="px"
			/>
			<NumberInput
				label="Padding right"
				:currentForm="currentForm"
				:propKey="`inputFieldPaddingRight`"
				unit="px"
			/>
		</StyleDropdown>
		<StyleDropdown label="Radio and checkbox fields">
			<NumberInput
				label="Font size"
				:currentForm="currentForm"
				propKey="radioCheckboxFontSize"
				unit="px"
			/>
			<NumberInput
				label="Button size"
				:currentForm="currentForm"
				propKey="radioCheckboxSize"
				unit="px"
			/>
			<NumberInput
				label="Gap"
				:currentForm="currentForm"
				propKey="radioCheckboxGap"
				unit="px"
			/>
		</StyleDropdown>
		<StyleDropdown label="Toggle button">
			<ColorInput label="On Colour" :currentForm="currentForm" propKey="toggleOnColor" />
			<ColorInput label="Off Colour" :currentForm="currentForm" propKey="toggleOffColor" />
			<NumberInput
				label="Font size"
				:currentForm="currentForm"
				propKey="toggleLabelFontSize"
				unit="px"
			/>
			<Toggle
				label="Bold"
				:currentForm="currentForm"
				propKey="toggleLabelBold"
				defaultValue="true"
				trueValue="bold"
				falseValue="normal"
			/>
		</StyleDropdown>
		<StyleDropdown label="Submit button">
			<NumberInput
				label="Font size"
				:currentForm="currentForm"
				section="Button"
				propKey="buttonFontSize"
				unit="px"
			/>
			<ColorInput
				label="Label colour"
				:currentForm="currentForm"
				propKey="buttonLabelColor"
			/>
			<ColorInput
				label="Background colour"
				:currentForm="currentForm"
				propKey="buttonBackgroundColor"
			/>
			<Toggle
				label="Bold"
				:currentForm="currentForm"
				propKey="buttonBold"
				defaultValue="true"
				trueValue="bold"
				falseValue="normal"
			/>
			<NumberInput
				label="Padding top"
				:currentForm="currentForm"
				propKey="buttonPaddingTop"
				unit="px"
			/>
			<NumberInput
				label="Padding bottom"
				:currentForm="currentForm"
				propKey="buttonPaddingBottom"
				unit="px"
			/>
			<NumberInput
				label="Padding left"
				:currentForm="currentForm"
				propKey="buttonPaddingLeft"
				unit="px"
			/>
			<NumberInput
				label="Padding right"
				:currentForm="currentForm"
				propKey="buttonPaddingRight"
				unit="px"
			/>
			<NumberInput
				label="Border radius"
				:currentForm="currentForm"
				propKey="buttonBorderRadius"
				unit="px"
			/>
			<DropdownSelect
				label="Width"
				:currentForm="currentForm"
				propKey="buttonWidth"
				:options="['auto', '100%', '50%']"
			/>
		</StyleDropdown>
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
	{ label: "Form title", propKey: "formTitle" },
	{ label: "H2", propKey: "h2" },
	{ label: "H3", propKey: "h3" },
	{ label: "H4", propKey: "h4" }
];
</script>
