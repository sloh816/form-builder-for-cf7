<template>
    <div>
        <label :for="props.id" class="font-semibold">{{ props.label }} </label>
        <select @change="(e) => changeFunction((e.target as HTMLInputElement).value)" :id="props.id">
            <option v-for="option in props.options" :key="option.value" :value="option.value" :selected="option.isSelected">
                {{ option.label }}
            </option>
        </select>
    </div>
</template>

<script setup lang="ts">
interface Option {
    label: string;
    value: string;
    isSelected: boolean;
}

interface Props {
    label?: string;
    id: string;
    options: Option[];
    changeFunction: Function;
}

const props = defineProps<Props>();
</script>

<style scoped></style>
