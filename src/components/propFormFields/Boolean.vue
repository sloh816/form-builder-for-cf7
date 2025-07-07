<template>
	<label>
		<input
			type="checkbox"
			:id="props.id"
			:checked="props.isChecked"
			@change="(e) => changeFunction((e.target as HTMLInputElement).checked)"
		/>
		<span class="ml-1">{{ props.label }}</span>
	</label>
</template>

<script setup lang="ts">
interface Props {
	id: string;
	isChecked: any;
	changeFunction: Function;
	label?: string;
}

const props = defineProps<Props>();
</script>
