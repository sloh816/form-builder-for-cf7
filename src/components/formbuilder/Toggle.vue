<template>
	<FormPreviewField>
		<template #preview>
			<!-- <pre>{{ props }}</pre> -->

			<div class="indiga-toggle-switch" :data-field-id="props.id">
				<p class="indiga-label">{{ props.label }}<span v-if="props.required">*</span></p>

				<span class="wpcf7-form-control-wrap" :data-name="props.id">
					<span class="wpcf7-form-control wpcf7-radio">
						<span class="wpcf7-list-item first">
							<label>
								<input type="radio" name="radio-18" :value="props.onLabel" />
								<span class="wpcf7-list-item-label">{{ props.onLabel }}</span>
							</label>
						</span>
						<span class="wpcf7-list-item last">
							<label>
								<input
									type="radio"
									name="radio-18"
									:value="props.offLabel"
									checked
								/>
								<span class="wpcf7-list-item-label">{{ props.offLabel }}</span>
							</label>
						</span>
					</span>
				</span>

				<div
					class="indiga-toggle-switch-button-wrapper"
					:data-checked="props.default ? 'true' : 'false'"
					style="display: none"
				>
					<button
						class="indiga-toggle-switch-button"
						:aria-label="`Toggle currently: ${
							props.default ? props.onLabel : props.offLabel
						}. Click to toggle ${!props.default ? props.onLabel : props.offLabel}`"
						type="button"
					>
						<span class="indiga-toggle-switch-button-inner"></span>
					</button>
					<span class="indiga-toggle-button-label">{{
						props.default ? props.onLabel : props.offLabel
					}}</span>
				</div>
			</div>
		</template>

		<template #options>
			<FieldOptionsFormWrapper :id="props.id" fieldType="Toggle Switch">
				<p class="text-sm bg-yellow-100 p-2 rounded-lg">
					<strong>Note:</strong> This toggle switch relies on JavaScript to function
					properly. Without JavaScript, it will display as standard radio buttons. The
					necessary JavaScript code will be generated and must be added to your WordPress
					site for full functionality.
				</p>
				<TextInput
					:id="`label-${props.id}`"
					label="Label"
					:value="props.label"
					:inputFunction="(value) => updateProps('label', value)"
				/>

				<TextInput
					:id="`onLabel-${props.id}`"
					label="On Label"
					:value="props.onLabel"
					:inputFunction="(value) => updateProps('onLabel', value)"
				/>

				<TextInput
					:id="`offLabel-${props.id}`"
					label="Off Label"
					:value="props.offLabel"
					:inputFunction="(value) => updateProps('offLabel', value)"
				/>

				<Boolean
					:id="`default-${props.id}`"
					:isChecked="props.default"
					:changeFunction="(value) => updateProps('default', value)"
					label="Default on?"
				/>

				<Boolean
					:id="`required-${props.id}`"
					:isChecked="props.required"
					:changeFunction="(value) => updateProps('required', value)"
					label="Required"
				/>
			</FieldOptionsFormWrapper>
		</template>
	</FormPreviewField>
</template>

<script setup lang="ts">
import { inject, onMounted } from "vue";
import FieldOptionsFormWrapper from "@/components/FieldOptionsFormWrapper.vue";
import FormPreviewField from "@/components/FormPreviewField.vue";

import TextInput from "@/components/propFormFields/TextInput.vue";
import Boolean from "@/components/propFormFields/Boolean.vue";

interface Props {
	id: string;
	label?: string;
	required?: True | false;
	onLabel: string;
	offLabel: string;
	default: True | false;
}

const props = defineProps<Props>();

const updateFormField = inject<Function>("updateFormField");
function updateProps(propKey: string, value: any) {
	const newProps = { ...props, [propKey]: value };
	updateFormField(props.id, newProps);
}

function toggleSwitch() {
	const toggleSwtiches = document.querySelectorAll(".indiga-toggle-switch");

	toggleSwtiches.forEach((toggle) => {
		console.log(toggle);
		const toggleButtonWrapper = toggle.querySelector(".indiga-toggle-switch-button-wrapper");
		toggleButtonWrapper.style.display = "flex";

		const radioInputs = toggle.querySelector(".wpcf7-form-control-wrap");
		radioInputs.style.display = "none";

		const toggleButton = toggleButtonWrapper.querySelector(".indiga-toggle-switch-button");
		toggleButton.addEventListener("click", () => {
			console.log(toggleButtonWrapper);
			console.log(toggleButton);
		});
	});
}
</script>
