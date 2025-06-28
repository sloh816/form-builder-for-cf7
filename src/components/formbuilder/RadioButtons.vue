<template>
	<FormPreviewField>
		<template #preview>
			<div>
				<p class="indiga-label">{{ props.label }}</p>
				<p>
					<span class="wpcf7-form-control-wrap" data-name="radio-844">
						<span class="wpcf7-form-control wpcf7-radio">
							<span
								v-for="(option, index) in props.options"
								:class="[
									'wpcf7-list-item',
									{ first: index === 0, last: index === props.options.length - 1 }
								]"
							>
								<label>
									<input type="radio" :name="props.id" :value="option" /><span
										class="wpcf7-list-item-label"
										>{{ option }}</span
									>
								</label>
							</span>
						</span>
					</span>
				</p>
			</div>
		</template>

		<template #options>
			<FieldOptionsFormWrapper :id="props.id" fieldType="Radio buttons">
				<TextInput
					:id="`label-${props.id}`"
					label="Label"
					:value="props.label"
					:inputFunction="(value) => updateLabel(value)"
				/>
				<TextArea
					:id="`options-${props.id}`"
					label="Options"
					description="One line per option"
					:value="props.options?.join('\n').trim()"
					:inputFunction="(value) => updateOptions(value)"
				/>

				<Boolean
					:id="`required-${props.id}`"
					:isChecked="props.required ?? false"
					:changeFunction="(value) => updateRequired(value)"
					label="Required"
				/>

				<TextInput
					:id="`id-${props.id}`"
					label="Field ID"
					:value="props.id"
					:inputFunction="(value) => updateProps('id', value)"
				/>
			</FieldOptionsFormWrapper>
		</template>
	</FormPreviewField>
</template>

<script setup lang="ts">
import { inject } from "vue";
import FieldOptionsFormWrapper from "@/components/FieldOptionsFormWrapper.vue";
import FormPreviewField from "@/components/FormPreviewField.vue";

import TextInput from "@/components/propFormFields/TextInput.vue";
import TextArea from "@/components/propFormFields/TextArea.vue";
import Boolean from "@/components/propFormFields/Boolean.vue";

interface Props {
	id: string;
	options?: String[];
	label?: string;
	required?: True | false;
}

const props = defineProps<Props>();

const updateFormField = inject<Function>("updateFormField");

function updateLabel(value: string) {
	const newProps = { ...props, label: value };
	updateFormField(props.id, newProps);
}

function updateOptions(value: string) {
	const optionsArray = value.split("\n");
	updateFormField(props.id, {
		...props,
		options: optionsArray
	});
}

function updateRequired(value: boolean) {
	updateFormField(props.id, {
		...props,
		required: value
	});
}
</script>
