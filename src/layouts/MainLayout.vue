<script setup>
// import
import {ref, onMounted, onBeforeUnmount} from "vue";

import MainHeader from "@/layouts/MainHeader.vue"

// variable
const layout = ref({ header: `main`, title: ``});
const isScrolled = ref(false);

/*************************************************
** function
***************************************************/
const classHandleScroll = () => {
    // 스크롤할 때 5px 이상이면 active 클래스 추가
    if (layout.value.header === `subCntsArticle`) {
        isScrolled.value = window.scrollY > 5;
        console.log(window.scrollY);
    }
};

// aos 상태바 대응 함수 들어가는 자리
const setAndroidSafeAreaTop = () => {
    // 내용 들어갈 자리
    const elem = document.body;
    const userAgent = navigator.userAgent;
    const aosApp = /Neward_AOS/i;
    const ios = /iPhone|iPad/i;
    const aos = /Android/i;
    console.log(`gpt 참조`);

    // 안드 상단 상태바 겹침 대응
    if(aosApp.test(userAgent)){
        try {
            // top margin 값
            let topMargin = navigator.userAgent.split("TopMargin/")[1].split(" ")[0] * 1;
            topMargin = Math.floor(topMargin);

            // bottom margin 값
            let bottomMargin = navigator.userAgent.split("BottomMargin/")[1]?.split(" ")[0] * 1 || 0;
            bottomMargin = Math.floor(bottomMargin);

            document.documentElement.style.setProperty(`--sat`, `${topMargin}px`);
            document.documentElement.style.setProperty(`--sab`, `${bottomMargin}px`);
        } catch (e) {
            console.log(e);
        }
    }
    // ios 체크 후, class="ios" 추가
    if (ios.test(userAgent)){
        elem.classList.add(`ios`);
    }
    // aos 체크 후, class="aos" 추가
    if (aos.test(userAgent)){
        elem.classList.add(`aos`);
    }
}



// event
onMounted(() => {
    // 컴포넌트가 마운트될 때 스크롤 이벤트 등록
    window.addEventListener('scroll', classHandleScroll);
    // 안드 상태바 함수 마운트
    setAndroidSafeAreaTop();
});
onBeforeUnmount(() => {
    // 컴포넌트가 언마운트될 때 스크롤 이벤트 해제
    window.removeEventListener('scroll', classHandleScroll);
});

// 적용된 함수 =>> 스크롤하면 header 투명 효과 및 안드 상태바 대응
</script>

<template>
    <!-- scroll 할 때, class active 추가 -->
    <div class="wrap" :class="{active: isScrolled, article: layout.header === `subCntsArticle`}">
        <MainHeader :layout="layout" />
        <router-view @setLayout="layout = $event" />
    </div>
</template>
