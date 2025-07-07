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
					defaultValue="true"
				/>
			</template>
			<h4 class="border-b border-indigo-400 font-semibold mb-2">Body</h4>
			<ColorInput
				label="Colour"
				:currentForm="currentForm"
				section="Text"
				:propKey="`bodyColor`"
			/>
			<ColorInput
				label="Background colour"
				:currentForm="currentForm"
				section="Text"
				propKey="bodyBackgroundColor"
			/>
			<NumberInput
				label="Font size"
				:currentForm="currentForm"
				section="Text"
				:propKey="`bodyFontSize`"
				unit="px"
			/>
			<NumberInput
				label="Padding top"
				:currentForm="currentForm"
				section="Text"
				propKey="bodyPaddingTop"
				unit="px"
			/>
			<NumberInput
				label="Padding bottom"
				:currentForm="currentForm"
				section="Text"
				propKey="bodyPaddingBottom"
				unit="px"
			/>
			<NumberInput
				label="Padding left"
				:currentForm="currentForm"
				section="Text"
				propKey="bodyPaddingLeft"
				unit="px"
			/>
			<NumberInput
				label="Padding right"
				:currentForm="currentForm"
				section="Text"
				propKey="bodyPaddingRight"
				unit="px"
			/>
		</StyleDropdown>
		<StyleDropdown label="Input"></StyleDropdown>
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
