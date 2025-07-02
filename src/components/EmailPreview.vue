<template>
    <div>
        <pre>{{ props.currentForm }}</pre>
    </div>
</template>

<script setup lang="ts">
interface FormField {
    component: string;
    props: Record<string, any>;
}

interface Form {
    id: string;
    name: string;
    fields: FormField[];
}

interface Props {
    currentForm: Form;
}

const props = defineProps<Props>();
</script>
