
<script setup>
// [import]
import { onMounted, ref } from "vue";

//[variable]
const layout = ref({
    header: "subCntsArticle",
    navTitle: "중간 타이틀"
});
const Emits = defineEmits(["setLayout"]);

// event
onMounted(function () {
    Emits("setLayout", layout.value);
});
</script>

<template>
    <main class="content mypage">
        mypage contents
    </main>
</template>