<template>
	<FormFieldWrapper>
		<div class="form-field form-title">
			<h1 :style="style">{{ title }}</h1>
		</div>
	</FormFieldWrapper>
</template>

<script setup lang="ts">
import FormFieldWrapper from "@/components/FormFieldWrapper.vue";

interface Props {
	title: string;
	style: Object | string;
}

const props = withDefaults(defineProps<Props>(), {
	title: "Untitled form...",
	style: "font-weight:bold;font-size:32px"
});
</script>
