<template>
    <button type="button" @click="move()" class="cursor-pointer mt-4 text-slate-600 text-sm">Move {{ props.direction }}</button>
</template>

<script setup lang="ts">
import { inject } from "vue";

interface Props {
    id: string;
    direction: "up" | "down";
}

const props = defineProps<Props>();
const moveField = inject<Function>("moveField");

function move() {
    if (props.direction === "up") {
        moveField?.(props.id, "up");
    } else if (props.direction === "down") {
        moveField?.(props.id, "down");
    }
}
</script>
