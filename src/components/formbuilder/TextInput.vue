<template>
	<!-- <pre>{{ props }}</pre> -->
	<form class="text-input-options border border-slate-300 shadow-md rounded p-4">
		<label :for="`label-${props.id}`" class="font-semibold">Label </label>
		<input
			type="text"
			:value="props.label"
			@input="updateProps('label', $event.target.value)"
			:id="`label-${props.id}`"
		/>

		<div class="text-input-type radio-button-group flex gap-4 mt-4">
			<label>
				<input
					type="radio"
					:id="`type-${props.id}`"
					:name="`type-${props.id}`"
					value="name"
					:checked="props.type === 'name'"
					@change="updateProps('type', $event.target.value)"
				/>
				<span> Name</span>
			</label>
			<label>
				<input
					type="radio"
					:id="`type-${props.id}`"
					:name="`type-${props.id}`"
					value="email"
					:checked="props.type === 'email'"
					@change="updateProps('type', $event.target.value)"
				/>
				<span> Email</span>
			</label>
			<label>
				<input
					type="radio"
					:id="`type-${props.id}`"
					:name="`type-${props.id}`"
					value="phone"
					:checked="props.type === 'phone'"
					@change="updateProps('type', $event.target.value)"
				/>
				<span> Phone</span>
			</label>
			<label>
				<input
					type="radio"
					:id="`type-${props.id}`"
					:name="`type-${props.id}`"
					value="text"
					:checked="props.type === 'text'"
					@change="updateProps('type', $event.target.value)"
				/>
				<span> Other</span>
			</label>
		</div>

		<label>
			<input
				type="checkbox"
				:id="`required-${props.id}`"
				:checked="props.required"
				@change="updateProps('required', $event.target.checked)"
			/>
			<span> Required</span>
		</label>

		<label :for="`placeholder-${props.id}`" class="font-semibold">Placeholder </label>
		<input
			type="text"
			:value="props.placeholder"
			@input="updateProps('placeholder', $event.target.value)"
			:id="`placeholder-${props.id}`"
		/>

		<label :for="`id-${props.id}`" class="font-semibold">Field ID </label>
		<input
			type="text"
			:value="props.id"
			@input="updateProps('id', $event.target.value)"
			:id="`id-${props.id}`"
		/>
	</form>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";

interface Props {
	label: string;
	type?: string;
	placeholder?: string;
	required?: boolean;
	id?: string;
}

const props = defineProps<Props>();

const updateFormField = inject<Function>("updateFormField");

function updateProps(propKey: string, value: any) {
	const newProps = { ...props };
	newProps[propKey] = value;
	updateFormField?.(props.id, newProps);
}
</script>
