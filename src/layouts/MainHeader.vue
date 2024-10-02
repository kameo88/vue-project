<template>
    <!-- 
        다른 방식 class binding
        :class="[`header_wrap`, {bg_none: layout.header === `subCntsArticle`}]"
     -->
     <!-- v-if 조건문으로 분기 -->
    <header class="header_wrap" 
        :class="{bg_none: layout.header === `subCntsArticle`}" 
        v-if="layout.header != `default`"
    >
        <div class="inner">
            <div class="left">좌측 menu</div>
            <!-- header 설정 값에 따라 -->
            <h2 class="title center"
                v-if="layout.header === `detail` || layout.header === `detailEvent` "
            >
                {{ layout.navTitle }}
            </h2>
            <div class="right">
                우측 menu
                <button type="button" class="icon icon_bookmark"
                    :class="{on: IsActive}"
                    @click="ToggleClass"
                >
                    <span class="blind">저장</span>
                </button>
            </div>
        </div>
        <div class="progress_page"
            :style="{ width: `${scrollProgress}%`}"
            v-if="layout.header === `subCntsArticle`"
        ></div>
    </header>
</template>

<script setup>
// import
import {ref, onMounted, onBeforeUnmount} from "vue";

// variable
const scrollProgress = ref(0);
const IsActive = ref(false);

const props = defineProps ({
    layout: Object, // {header, title}
})


// funtion
const ToggleClass = () => {
    IsActive.value = !IsActive.value;
    console.log('북마크 아이콘 변경');
}

// 상단 페이지 진행바
const HandleScroll = () => {
    const scrollTop = window.scrollY; // 현재 스크롤
    const docHeight = document.documentElement.scrollHeight - window.innerHeight; // 문서 전체 높이에서 화면 높이 제외
    const progress = (scrollTop / docHeight) * 100; //스크롤 진행률 계산
    scrollProgress.value = Math.round(progress);// 소수점 반올림해서 정수 계산
}

// event
onMounted(() => {
    // 컴포넌트가 마운트될 때 페이지 진행바 스크롤 이벤트 등록
    window.addEventListener('scroll', HandleScroll);
});
onBeforeUnmount(() => {
    // 컴포넌트가 언마운트될 때 페이지 진행바 스크롤 이벤트 해제
    window.removeEventListener('scroll', HandleScroll);
});


// 적용된 함수 =>> 페이지 스크롤 진행바 class="progress_page" 항목
</script>
