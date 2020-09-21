<template>
  <section class="hero is-fullheight main-video" v-observe-visibility="visibilityChanged">
    <div class="hero-video">
      <div class="video-wrapper"></div>
      <div class="video-container">
        <video autoplay loop muted poster="/images/page/video_poster.png" class="video-child">
          <source src="images/page/video.mp4" type="video/mp4" />
        </video>
      </div>
    </div>

    <div class="cookies-popup" v-if="showCookiesPopup">
      <p class="cookies-popup-text">{{ $t('messages.cookies-message') }}</p>
      <button
        class="cookies-popup-button"
        @click="acceptCookies"
      >{{ $t('messages.cookies-confirm') }}</button>
    </div>
    <div class="hero-body">
      <!-- <div class="container has-text-centered motto-container">
                <h1 class="title">MOTTO</h1>
                <div class="separator-parent">
                    <div class="separator"></div>
                </div>
                <h2 class="subtitle">Lorem ipsum</h2>
      </div>-->
    </div>
  </section>
</template>

<style lang="scss">
@import "~@/_variables.scss";

.cookies-popup {
  position: absolute;
  width: 100vw;
  bottom: 0;
  z-index: 10;
  padding: 25px;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1a1a1a;
  opacity: 0.8;

  .cookies-popup-text {
    color: white;
  }

  .cookies-popup-button {
    cursor: pointer;
    margin-left: 10px;
    color: #dabc60;
    font-weight: bold;
    background-color: transparent;
    outline: none;
    border: none;
    opacity: 1;

    &:hover {
      opacity: 0.8;
      text-decoration: underline;
    }
  }
}

@media screen and (max-width: 768px) {
  .hero-video {
    display: inherit !important;
  }
}
.main-video {
  margin-top: 150px;
}
.motto-container {
  z-index: 3;
}
.motto-container > h1 {
  color: white;
  font-size: 60pt;
}
.motto-container > .subtitle {
  color: white;
  font-size: 30pt;
  margin-top: 15px;
}
.separator-parent {
  display: flex;
  justify-content: center;
}
.separator {
  background-color: white;
  min-height: 5px;
  width: 10% !important;
}
.hero-video {
  background-color: #000 !important;
}
.video-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
  top: 0;
  left: 0;
  background-color: $landing-video-overlay;
}
.video-child {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
    
<script>
export default {
  data() {
    return {
      showCookiesPopup: false,
    };
  },
  methods: {
    visibilityChanged(isVisible, entry) {
      Event.$emit("visibilityChanged", isVisible);
    },
    acceptCookies() {
      this.showCookiesPopup = false;
      localStorage.setItem("cookiesAccepted", true);
    },
  },
  mounted() {
    if (!localStorage.getItem("cookiesAccepted")) {
      this.showCookiesPopup = true;
    }
  },
};
</script>
