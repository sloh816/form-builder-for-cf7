<template>
    <div class="radio-button-group" :id="props.id">
        <p class="font-bold mb-2">{{ props.label }}</p>
        <div class="flex gap-4">
            <label v-for="option in props.options">
                <input type="radio" :name="props.id" :value="option.value" :checked="option.isChecked" @change="(e) => changeFunction((e.target as HTMLInputElement).value)" />
                <span class="ml-2"> {{ option.label }}</span>
            </label>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Input {
    isChecked: boolean;
    label: string;
    value: string;
}

interface Props {
    id: string;
    options: Input[];
    label: string;
    changeFunction: Function;
}

const props = defineProps<Props>();
</script>
