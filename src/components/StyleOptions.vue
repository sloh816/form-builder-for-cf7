<template>
	<div class="mt-8">
		<StyleDropdown v-for="section in formSections" :key="section.label" :label="section.label">
			<template v-for="group in section.groups" :key="group.title">
				<h4 v-if="group.title" class="border-b border-indigo-400 font-semibold mb-2">
					{{ group.title }}
				</h4>
				<div class="grid grid-cols-1 gap-2">
					<component
						v-for="field in group.fields"
						:key="field.propKey"
						:is="getComponent(field.type)"
						:label="field.label"
						:currentForm="currentForm"
						:section="section.dataSection"
						:propKey="field.propKey"
						v-bind="field.props"
					/>
				</div>
			</template>
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

// Component mapping
const componentMap = {
	color: ColorInput,
	number: NumberInput,
	toggle: Toggle,
	dropdown: DropdownSelect
};

const getComponent = (type: keyof typeof componentMap) => componentMap[type];

// Helper functions for common field patterns
const createPaddingFields = (prefix: string) => [
	{
		label: "Padding top",
		propKey: `${prefix}PaddingTop`,
		type: "number" as const,
		props: { unit: "px" }
	},
	{
		label: "Padding bottom",
		propKey: `${prefix}PaddingBottom`,
		type: "number" as const,
		props: { unit: "px" }
	},
	{
		label: "Padding left",
		propKey: `${prefix}PaddingLeft`,
		type: "number" as const,
		props: { unit: "px" }
	},
	{
		label: "Padding right",
		propKey: `${prefix}PaddingRight`,
		type: "number" as const,
		props: { unit: "px" }
	}
];

const createBorderFields = (prefix: string) => [
	{
		label: "Border style",
		propKey: `${prefix}BorderStyle`,
		type: "dropdown" as const,
		props: { options: ["solid", "dashed", "dotted"] }
	},
	{ label: "Border colour", propKey: `${prefix}BorderColor`, type: "color" as const, props: {} },
	{
		label: "Border Width",
		propKey: `${prefix}BorderWidth`,
		type: "number" as const,
		props: { unit: "px" }
	},
	{
		label: "Border radius",
		propKey: `${prefix}BorderRadius`,
		type: "number" as const,
		props: { unit: "px" }
	}
];

const createTextHeadingFields = (propKey: string) => [
	{ label: "Colour", propKey: `${propKey}Color`, type: "color" as const, props: {} },
	{
		label: "Font size",
		propKey: `${propKey}FontSize`,
		type: "number" as const,
		props: { unit: "px" }
	},
	{
		label: "Bold",
		propKey: `${propKey}Bold`,
		type: "toggle" as const,
		props: {
			defaultValue: propKey === "label" ? "false" : "true",
			trueValue: "bold",
			falseValue: "normal"
		}
	}
];

// Configuration object
const formSections = [
	{
		label: "Body",
		dataSection: "Body",
		groups: [
			{
				title: null,
				fields: [
					{
						label: "Background color",
						propKey: "backgroundColor",
						type: "color" as const,
						props: {}
					},
					{
						label: "Width",
						propKey: "maxWidth",
						type: "number" as const,
						props: { unit: "px" }
					},
					{
						label: "Border radius",
						propKey: "borderRadius",
						type: "number" as const,
						props: { unit: "px" }
					},
					...createPaddingFields("body")
				]
			}
		]
	},
	{
		label: "Text",
		dataSection: "Text",
		groups: [
			// Dynamic text heading groups
			...["label", "formTitle", "h2", "h3", "h4"].map((propKey) => ({
				title: {
					label: "Labels",
					formTitle: "Form title",
					h2: "H2",
					h3: "H3",
					h4: "H4"
				}[propKey],
				fields: createTextHeadingFields(propKey)
			})),
			{
				title: "Text block",
				fields: [
					{
						label: "Colour",
						propKey: "textBlockColor",
						type: "color" as const,
						props: {}
					},
					{
						label: "Background colour",
						propKey: "textBlockBackgroundColor",
						type: "color" as const,
						props: {}
					},
					{
						label: "Border radius",
						propKey: "textBlockBorderRadius",
						type: "number" as const,
						props: { unit: "px" }
					},
					{
						label: "Font size",
						propKey: "textBlockFontSize",
						type: "number" as const,
						props: { unit: "px" }
					},
					...createPaddingFields("textBlock")
				]
			}
		]
	},
	{
		label: "Inputs",
		dataSection: "Input",
		groups: [
			{
				title: "Fields",
				fields: [
					{
						label: "Background colour",
						propKey: "textFieldBackgroundColor",
						type: "color" as const,
						props: {}
					},
					{
						label: "Text colour",
						propKey: "textFieldColor",
						type: "color" as const,
						props: {}
					},
					{
						label: "Font size",
						propKey: "textFieldFontSize",
						type: "number" as const,
						props: { unit: "px" }
					},
					{
						label: "Bold",
						propKey: "textFieldBold",
						type: "toggle" as const,
						props: {
							defaultValue: "false",
							trueValue: "bold",
							falseValue: "normal"
						}
					},
					...createBorderFields("textField"),
					...createPaddingFields("textField")
				]
			},
			{
				title: "File input fields",
				fields: [...createBorderFields("inputField"), ...createPaddingFields("inputField")]
			}
		]
	},
	{
		label: "Radio, checkboxes and toggle",
		dataSection: "Radio",
		groups: [
			{
				title: null,
				fields: []
			}
		]
	},
	{
		label: "Submit button",
		dataSection: "Button",
		groups: [
			{
				title: null,
				fields: []
			}
		]
	}
];
</script>
