<script setup>
/**********************
 * [Import]
 **********************/
import { ref } from "vue";

/**********************
 * [Variable] 
 **********************/
const article = ref({
  title: `동영상 관련 컴포넌트`,
  video1: `/src/assets/images/movie.mp4`,
  video2: `/src/assets/images/movie.mp4`,
  thumImg: `/src/assets/images/common/bg.png`,
});

// popup
const showDialog = ref(false);
const settingsListDialog = ref(false);

// 동영상 controls
const isPlaying = ref(null);
// const isMuted = ref(null);
const currentTime = ref(0);
const duration = ref(0);
const videoControlsVisible = ref(true);

const video = ref(null);
const progressPercentage = ref(0); //progress in percentage

// video controls animation
const animationClassVisible = ref(false);
let addAnimationTimeout = ref(null);
let hideControlsTimeout = ref(null);

// 동영상 full screen 관련
const IsActive = ref(false);
const IsScreenIcon = ref(true);

const Props = defineProps ({
  option: Object,
  // showNativeControls: false, 
  // native controls 사용여부
});

/**********************
 * [Function] 
 **********************/
const TogglePlayPause = () => {
  if(video.value.pause || video.value.ended) {
    video.value.play();
    isPlaying.value = true;
  } else {
    video.value.pause();
    isPlaying.value = false;
  }
};

const SetMaxProgress = () => {
  duration.value = video.value.duration;
};
const UpdateProgress = () => {
  currentTime.value = video.value.currentTime;
  progressPercentage.value = (currentTime.value / duration.value) * 100 //update progress in percentage
};
const Seek = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const pos = (e.clientX - rect.left) / rect.width;
  video.value.currentTime = pos * video.value.duration;
  currentTime.value = video.value.currentTime;
};

// video controls animation 함수
const ShowControls = () => {
  if(!videoControlsVisible.value) {
    videoControlsVisible.value = true;
  }
  // animation 타이머 초기화 및 재설정
  if (addAnimationTimeout) {
    clearTimeout(addAnimationTimeout);
  }
  if (hideControlsTimeout) {
    clearTimeout(hideControlsTimeout);
  }
  addAnimationTimeout = setTimeout(() => {
    // 3초 animation class 추가
    animationClassVisible.value = true ;

    // 1초 후, video controls 숨김
    hideControlsTimeout = setTimeout(() => {
      videoControlsVisible.value = false;
      animationClassVisible.value = false ;

    }, 1000);

  }, 3000);
};

const toggleFullscreen = () => {
  IsActive.value = !IsActive.value;
  IsScreenIcon.value = !IsScreenIcon.value;
};


 /**********************
 * [Event] 
 **********************/

</script>

<template>
  <section class="section_f">
    <div class="title_area">
      <h3 class="title" v-html="article.title"></h3>
    </div>
    <div 
      class="cnts_img_wrap"
      :class="[ 
        { landscape: option.size === `landscape` },
        { portrait: option.size === `portrait` },
      ]"
    >
        <div class="cnts_img_area video"
          :class="{ fixed : IsActive }"
          @touchstart="ShowControls"
          v-if="option.type === `video`"
        >
          <div class="video_thum"
          :style="{ backgroundImage: 'url(' + article.thumImg +  ')' }"
          >
          </div>
            <!-- 고유 속성 값을 바인딩 -->
            <!-- :controls ="option.controlsUI === `native`" -->
          <video
            class="video_palyer" 
            playsinline
            ref="video"
            :src="article.video1"
            @loadedmetadata="SetMaxProgress"
            @timeupdate="UpdateProgress"
            v-if="option.size === `landscape`"
            />
            <!-- :controls ="option.controlsUI === `native`" -->
          <video
            class="video_palyer" 
            playsinline
            ref="video"
            :src="article.video2"
            @loadedmetadata="SetMaxProgress"
            @timeupdate="UpdateProgress"
            v-if="option.size === `portrait`"
            />
            <!-- v-if="opiton.controlsUI === `custom`" -->
          <div 
            class="video_controls"
            :class="{ animation : animationClassVisible }"
            v-show="videoControlsVisible"
            >
            <div class="btn_area">
              <button type="button" class="icon icon_prev">
                <span class="blind">10초 앞으로</span>
              </button>
              <button type="button" 
                class="icon"
                :class="isPlaying ? `icon_pause` : `icon_play`"
                @click="TogglePlayPause"
                >
                <span class="blind">{{ isPlaying ? "Pause" : "Play" }}</span>
              </button>
              <!-- <button type="button" @click="StopVideo">
                <span class="blind">stop</span>
              </button>
              <button type="button" @click="ToggleMute">
                {{ isMuted ? "Unmute" : "Mute" }}
              </button> -->
              <button type="button" class="icon icon_next">
                <span class="blind">10초 뒤로</span>
              </button>
            </div>
            <div class="settings">
              <button type="button" 
                class="icon icon_settings"
                @click="settingsListDialog = true"
                >
                <span class="blind">동영상 설정</span>
              </button>
              <button type="button" 
                class="icon icon_close"
                @click="showDialog = true"
                >
                <span class="blind">동영상 닫기</span>
              </button>
            </div>
            <div class="info">
              <div class="time">
                <span class="current">03:11</span>
                <span class="total">10:00</span>
              </div>
              <button type="button" 
                class="icon"
                :class="IsScreenIcon ? `icon_video_full` : `icon_video_small`"
                @click="toggleFullscreen"
                >
                <span class="blind"> {{ IsScreenIcon ? `확대` : `축소` }} </span>
              </button>
            </div>
            <!-- video progress -->
            <div class="progress_video" @click="Seek">
              <div 
              class="progress_filled"
              :style="{ width: progressPercentage + `%` }"
              ></div>
            </div>
          </div>
        </div>
    </div>
    
  </section>
</template>