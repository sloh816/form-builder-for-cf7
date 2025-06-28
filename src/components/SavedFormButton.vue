<template>
	<span v-if="isCurrent" class="font-bold text-indigo-700 text-sm">{{ formName }}</span>
	<a v-if="!isCurrent" class="text-slate-700 text-sm" :href="`?id=${props.id}`">{{ formName }}</a>
</template>

<script setup lang="ts">
interface Props {
	formName: string;
	isCurrent: boolean;
	id: string;
}

const props = defineProps<Props>();
</script>
