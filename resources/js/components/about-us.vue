<template>
    <section class="about">
        <div class="about__slideshow">
            <img
                src="/images/page/landing-page/3.jpg"
                alt="About us"
                class="slideshow__slide"
                :class="{ 'slideshow__slide--active': currentImage === 3 }"
            />
            <img
                src="/images/page/landing-page/2.jpg"
                alt="About us"
                class="slideshow__slide"
                :class="{ 'slideshow__slide--active': currentImage === 2 }"
            />
            <img
                src="/images/page/landing-page/1.jpg"
                alt="About us"
                class="slideshow__slide"
                :class="{ 'slideshow__slide--active': currentImage === 1 }"
            />
            <div class="slideshow__progress">
                <div
                    v-for="i in imagesNumber"
                    :key="i"
                    class="progress__circle"
                    :class="{ 'progress__circle--active': currentImage === i }"
                />
            </div>
        </div>
        <div class="about__content">
            <h1 class="about__title">{{ $t("messages.about_us") }}</h1>
            <p class="about__text">{{ $t("messages.about-us-content") }}</p>
            <div class="about__icon">
                <span class="icon large-icon" v-scroll-to="'#gallery'">
                    <i class="far fa-caret-square-down"></i>
                </span>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            currentImage: 1,
            imagesNumber: 3,
            slideShowDelay: 4,
            slideInterval: null
        };
    },
    mounted() {
        this.slideInterval = setInterval(() => {
            if (this.currentImage < this.imagesNumber) {
                this.currentImage += 1;
            } else {
                this.currentImage = 1;
            }
        }, this.slideShowDelay * 1000);
    },
    unmounted() {
        clearInterval(this.slideInterval);
    }
};
</script>

<style lang="scss">
@import "~@/_bulma-variables.scss";
@import "~@/_variables.scss";

.about {
    max-width: 70%;
    min-height: 90vh;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

.about__slideshow {
    width: 50%;
    min-height: 600px;
    height: fit-content;
    position: relative;
    padding-right: 2rem;
}
.slideshow__slide {
    position: absolute;
    top: 50%;
    left: 50%;
    max-height: 600px;
    transform: translate(-50%, -50%);
    transition: opacity 1s ease-in-out;
    opacity: 0;
    border-radius: 10px;
}
.slideshow__slide--active {
    opacity: 1;
}
.slideshow__progress {
    position: absolute;
    bottom: 0;
    left: 50%;
    display: flex;
    transform: translate(-50%, -50%);
}
.progress__circle {
    border-radius: 50%;
    background-color: #1a1a1a;
    opacity: 0.5;
    width: 16px;
    height: 16px;
    margin: 0 0.5rem;
    transition: all 1s ease-in-out;
}
.progress__circle--active {
    background-color: $accent-color;
    opacity: 1;
}

.about__content {
    width: 50%;
    padding-left: 2rem;
}
.about__title {
    font-size: 40px !important;
    font-weight: 500 !important;
    margin-bottom: 1rem;
}
.about__text {
    font-size: 18px !important;
    text-align: justify;
    line-height: 1.9;
}
.large-icon {
    font-size: 40pt;
    margin-top: 50px;
    color: $accent-color;
    margin-left: 10px;
}
.large-icon:hover {
    cursor: pointer;
    opacity: 0.8;
}
.about__icon {
    display: flex;
    justify-content: center;
}
.about-us-text-separator {
    background-color: $accent-color;
    margin-bottom: 20px;
    min-height: 2.5px;
    width: 40% !important;
}

@media only screen and (max-width: 1280px) {
    .about__title {
        font-size: 25px !important;
        font-weight: normal !important;
    }
    .about__text {
        font-size: 16px !important;
        text-align: justify;
    }
    .about {
        display: block;
    }
    .about__slideshow {
        width: 100%;
        margin: 0;
    }
    .about__content {
        width: 100%;
        padding: 0;
    }
}
@media only screen and (max-width: 700px) {
    .about__slideshow {
        min-height: 300px;
    }

    .slideshow__slide {
        max-height: 300px;
    }

    .about__text {
        line-height: 1.5;
    }
}
</style>
