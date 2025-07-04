<template>
    <button class="border border-slate-300 p-4 rounded w-64 text-left hover:border-indigo-700 transition-colors cursor-pointer" @click="handleClick">
        <div class="flex items-center gap-4">
            <div class="svg-icon bg-indigo-100 p-2 rounded w-12 h-12 flex items-center justify-center">
                <component :is="icon" />
            </div>
            <div>
                <p class="font-bold text-base">{{ label }}</p>
                <p class="text-xs text-slate-600">{{ description }}</p>
            </div>
        </div>
    </button>
</template>

<script setup lang="ts">
import { inject } from "vue";

interface Props {
    label: string;
    description: string;
    icon: any;
    component: string;
    defaultProps?: Record<string, any>;
}

const props = defineProps<Props>();

// Inject the function from parent to add a form field
const addFormField = inject<Function>("addFormField");

function handleClick() {
    const defaultProps = { ...(props.defaultProps || {}) };

    const randomId = Math.random().toString(36).substring(2, 8); // Generate a unique ID for the field
    defaultProps.id = `${props.component.toLowerCase()}-${randomId}`;

    addFormField?.({
        component: props.component,
        props: defaultProps,
    });

    // Hide the modal after adding a field
    const modal = document.querySelector(".fields-modal");
    modal?.classList.add("hidden");
}
</script>

<style scoped>
.svg-icon {
    svg {
        @apply w-full h-full;
        fill: #4f46e5; /* Indigo 700 */
    }
}
</style>
