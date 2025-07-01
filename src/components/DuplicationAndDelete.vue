<template>
    <div class="flex items-center gap-2 mt-2">
        <button class="bg-slate-200 p-3 rounded-full cursor-pointer fill-slate-800 hover:bg-slate-300" @click="duplicateForm">
            <Duplicate class="w-5 h-5" />
        </button>
        <button class="bg-red-200 p-3 rounded-full cursor-pointer fill-red-800 hover:bg-red-600 hover:fill-white" @click="deleteForm">
            <Bin class="w-5 h-5" />
        </button>
    </div>
</template>

<script setup lang="ts">
import Bin from "@/assets/bin.svg";
import Duplicate from "@/assets/duplicate.svg";
import { inject } from "vue";

const duplicateForm = inject<Function>("duplicateForm");
const deleteForm = inject<Function>("deleteForm");
</script>
