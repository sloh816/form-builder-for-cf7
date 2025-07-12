<template>
	<span v-if="isCurrent" class="font-bold text-indigo-700 text-sm">{{ formName }}</span>
	<a v-else class="text-slate-700 text-sm" :href="`?id=${props.id}`">{{ formName }}</a>
</template>

<script setup lang="ts">
interface Props {
	formName: string;
	isCurrent: boolean | undefined;
	id: string;
}

const props = defineProps<Props>();
</script>
