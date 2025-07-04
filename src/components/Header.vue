<template>
    <header class="bg-white shadow-md flex items-center justify-between px-4 py-3 z-10 fixed w-full h-16">
        <div class="flex items-center gap-4">
            <p class="font-bold text-2xl text-indigo-700">Indiga</p>
            <p class="text-xs text-slate-400 mt-1">Form Builder for Contact Form 7</p>
        </div>
        <div class="flex items-center gap-4">
            <button type="button" class="text-indigo-700 px-4 py-2 rounded cursor-pointer hover:bg-indigo-100" @click="saveForm && saveForm()">
                Save form
                <span v-if="props.isSaved" class="text-green-600 font-bold">✓</span>
                <span v-if="!props.isSaved" class="text-red-700">*</span>
            </button>
            <button type="button" class="bg-indigo-700 text-white font-bold px-4 py-2 rounded cursor-pointer hover:bg-indigo-800" @click="showCodeModal && showCodeModal()">Generate code</button>
        </div>
    </header>
</template>

<script setup lang="ts">
import { inject } from "vue";

interface Props {
    isSaved?: boolean;
}
const props = defineProps<Props>();

const saveForm = inject<Function>("saveForm");
const showCodeModal = inject<Function>("showCodeModal");
</script>
