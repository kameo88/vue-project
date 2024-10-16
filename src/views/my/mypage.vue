
<script setup>
/**********************
 * [Import]
 **********************/
import { onMounted, ref } from "vue";

import CntsImgVideo from '@/components/CntsImgVideo.vue';

/**********************
 * [Variable] 
 **********************/
const layout = ref({
    header: "subCntsArticle",
    navTitle: "중간 타이틀"
});
const Emits = defineEmits(["setLayout"]);

/**********************
 * [Function] 
 **********************/

 /**********************
 * [Event] 
 **********************/
onMounted(function () {
    Emits("setLayout", layout.value);
});
</script>

<template>
    <main class="content mypage" style="height: 1200px;">
        <section class="section">contents 1</section>
        <section class="section_f">contents full 2</section>
        <CntsImgVideo
            :option="{
                type: 'video',
                controlsUI: `custom`,
                size: `portrait`
            }" 
        />
        <!-- 가로형 -->
        <CntsImgVideo
            :option="{
                type: `video`,
                size: `landscape`
            }"
            />
    </main>
</template>