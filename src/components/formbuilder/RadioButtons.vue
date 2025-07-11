<template>
	<FormPreviewField>
		<template #preview>
			<fieldset class="indiga-radio-buttons-group">
				<legend class="indiga-label">{{ props.label }}<span>*</span></legend>
				<p>
					<span class="wpcf7-form-control-wrap" data-name="radio-844">
						<span class="wpcf7-form-control wpcf7-radio">
							<span
								v-for="(option, index) in props.options ?? []"
								:class="[
									'wpcf7-list-item',
									{
										first: index === 0,
										last: index === (props.options?.length ?? 0) - 1
									}
								]"
							>
								<label>
									<input
										type="radio"
										:name="props.id"
										:value="option"
										:checked="index === 0"
									/><span class="wpcf7-list-item-label">{{ option }}</span>
								</label>
							</span>
						</span>
					</span>
				</p>
			</fieldset>
		</template>

		<template #options>
			<FieldOptionsFormWrapper :id="props.id" fieldType="Radio buttons">
				<p class="text-sm bg-yellow-100 p-2 rounded-lg w-full">
					Radio buttons have the first item selected by default.
				</p>
				<TextInput
					:id="`label-${props.id}`"
					label="Label"
					:value="props.label"
					:inputFunction="(value: any) => updateLabel(value)"
				/>

				<TextArea
					:id="`options-${props.id}`"
					label="Options"
					description="One line per option"
					:value="props.options?.join('\n').trim() ?? ''"
					:inputFunction="(value: any) => updateOptions(value)"
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
import TextArea from "../../components/propFormFields/TextArea.vue";
import Boolean from "../../components/propFormFields/Boolean.vue";

interface Props {
	id: string;
	options?: String[];
	label: string;
}

const props = defineProps<Props>();

const updateFormField = inject<Function>("updateFormField");

function updateLabel(value: string) {
	const newProps = { ...props, label: value };
	updateFormField?.(props.id, newProps);
}

function updateOptions(value: string) {
	const optionsArray = value.split("\n");
	updateFormField?.(props.id, {
		...props,
		options: optionsArray
	});
}

function updateRequired(value: boolean) {
	updateFormField?.(props.id, {
		...props,
		required: value
	});
}
</script>
