<template>
	<FormPreviewField>
		<template #preview>
			<fieldset class="indiga-checkboxes-group">
				<legend class="indiga-label">
					{{ props.label }}<span v-if="props.required">*</span>
				</legend>
				<p>
					<span class="wpcf7-form-control-wrap" :data-name="props.id">
						<span class="wpcf7-form-control wpcf7-checkbox">
							<span
								v-for="(option, index) in props.options"
								:class="[
									'wpcf7-list-item',
									{ first: index === 0, last: index === props.options.length - 1 }
								]"
							>
								<label>
									<input
										type="checkbox"
										:name="`${props.id}[]`"
										:value="option"
									/>
									<span class="wpcf7-list-item-label">{{ option }}</span>
								</label>
							</span>
						</span>
					</span>
				</p>
			</fieldset>
		</template>

		<template #options>
			<FieldOptionsFormWrapper :id="props.id" fieldType="Checkboxes">
				<TextInput
					:id="`label-${props.id}`"
					label="Label"
					:value="props.label"
					:inputFunction="(value: any) => updateProps('label', value)"
				/>

				<TextArea
					:id="`options-${props.id}`"
					label="Options"
					description="One line per option"
					:value="props.options?.join('\n').trim()"
					:inputFunction="(value: any) => updateOptions(value)"
				/>

				<Boolean
					:id="`required-${props.id}`"
					:isChecked="props.required"
					:changeFunction="(value: any) => updateProps('required', value)"
					label="Required"
				/>
			</FieldOptionsFormWrapper>
		</template>
	</FormPreviewField>
</template>

<script setup lang="ts">
import { inject } from "vue";
import FieldOptionsFormWrapper from "../../components/FieldOptionsFormWrapper.vue";
import FormPreviewField from "../../components/FormPreviewField.vue";

import TextInput from "../../components/propFormFields/TextInput.vue";
import Boolean from "../../components/propFormFields/Boolean.vue";
import TextArea from "../../components/propFormFields/TextArea.vue";

interface Props {
	id: string;
	label?: string;
	required?: Boolean;
	options: String[];
}

const props = defineProps<Props>();

const updateFormField = inject<Function>("updateFormField");
function updateProps(propKey: string, value: any) {
	const newProps = { ...props, [propKey]: value };
	updateFormField?.(props.id, newProps);
}

function updateOptions(value: string) {
	const optionsArray = value
		.split("\n")
		.map((option) => option.trim())
		.filter((option) => option);
	const newProps = { ...props, options: optionsArray };
	updateFormField?.(props.id, newProps);
}
</script>
