<template>
	<details>
		<summary
			class="cursor-pointer border-t border-slate-200 p-4 flex items-center justify-between font-bold"
		>
			<span>{{ props.label }}</span>
			<DownIcon class="w-4 h-4" />
		</summary>
		<div class="mx-4 pb-4"><slot /></div>
	</details>
</template>

<script setup lang="ts">
import DownIcon from "../assets/down.svg";

interface Props {
	label: string;
}

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
details[open] summary svg {
	transition: 0.3s;
	transform: rotate(180deg);
}
</style>
