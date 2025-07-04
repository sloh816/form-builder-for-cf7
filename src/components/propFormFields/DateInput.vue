<template>
    <div class="flex flex-col gap-1 w-full">
        <label :for="props.id" class="font-semibold">{{ props.label }} </label>
        <span v-if="props.description" class="text-gray-500 text-sm">{{ props.description }}</span>
        <div class="flex items-center gap-2">
            <input class="border border-[#ccc] p-2 rounded-sm max-w-[150px]" type="date" :value="props.value" @input="(e) => inputFunction((e.target as HTMLInputElement).value)" :id="props.id" />
            <button class="text-sm text-slate-500 cursor-pointer" @click="clearDateInput">Clear</button>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    id: string;
    label?: string;
    value: string;
    description?: string;
    inputFunction: Function;
}

const props = defineProps<Props>();

function clearDateInput(event: Event) {
    event.preventDefault();
    const inputElement = document.getElementById(props.id) as HTMLInputElement;
    inputElement.value = "";
    props.inputFunction("");
}
</script>
