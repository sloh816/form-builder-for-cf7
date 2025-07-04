<template>
    <form class="bg-white grid justify-items-start gap-4 p-4 shadow-md rounded-lg border border-indigo-700 mb-8 relative" :data-field-id="props.id">
        <button type="button" class="close-field-options" @click="(e) => closeFieldOptions(e)">
            <Cross />
        </button>
        <p class="text-sm text-slate-600 mb-2 flex items-center gap-4">
            <span
                >Input type: <strong>{{ props.fieldType }}</strong></span
            >
            <span>
                Field ID:
                <strong>{{ props.id }}</strong>
            </span>
        </p>

        <slot />
        <div class="flex items-center justify-between w-full">
            <div class="flex gap-4">
                <MoveButton :id="props.id" direction="up" />
                <MoveButton :id="props.id" direction="down" />
            </div>
            <DeleteFieldButton :id="props.id" />
        </div>
    </form>
</template>

<script setup lang="ts">
import DeleteFieldButton from "../components/DeleteFieldButton.vue";
import MoveButton from "../components/MoveButton.vue";
import Cross from "../assets/cross.svg";

interface Props {
    id: string;
    fieldType?: string;
}

const props = defineProps<Props>();

function closeFieldOptions(event: Event) {
    const target = event.target as HTMLElement;
    const fieldOptions = target.closest(".form-preview-field__options");
    fieldOptions?.classList.add("hidden");
}
</script>

<style scoped>
.close-field-options {
    position: absolute;
    top: 16px;
    right: 16px;
    background-color: transparent;
    border: none;
    cursor: pointer;
}

.close-field-options svg {
    width: 12px;
    height: 12px;
    fill: grey;
}
</style>
