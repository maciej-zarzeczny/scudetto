<template>
    <section class="section gallery" id="gallery">
        <div class="text-separator-parent">
            <div class="text-separator"></div>
        </div>

        <div v-if="imagesReady">
            <div
                class="columns"
                v-for="index in Math.ceil(images.length / 4)"
                :key="index"
            >
                <div class="column" v-for="columnIndex in 4" :key="columnIndex">
                    <figure class="image gallery-image">
                        <img
                            :src="images[imageIndex].url"
                            alt="Gallery image"
                            v-show="renderImage"
                            v-once
                            @click="showBigPhoto(index, columnIndex, 1)"
                        />
                    </figure>
                    {{ renderGallery(1) }}
                </div>
            </div>

            <div
                class="about__icon"
                v-show="!showMorePhotos"
                @click="getMorePhotos()"
                v-if="images.length == 8"
            >
                <span class="icon large-icon">
                    <i class="far fa-caret-square-down"></i>
                </span>
            </div>
        </div>
        <div v-if="showMorePhotos">
            <div
                class="columns"
                v-for="index in Math.ceil(hiddenImages.length / 4)"
                :key="index"
            >
                <div class="column" v-for="columnIndex in 4" :key="columnIndex">
                    <figure class="image gallery-image">
                        <img
                            :src="hiddenImages[hiddenImagesIndex].url"
                            alt="Gallery image"
                            v-show="renderHiddenImage"
                            v-once
                            @click="showBigPhoto(index, columnIndex, 2)"
                        />
                    </figure>
                    {{ renderGallery(2) }}
                </div>
            </div>
        </div>

        <div class="container">
            <div class="modal" :class="{ 'is-active': showModal }">
                <div class="modal-background" @click="showModal = false"></div>
                <div class="modal-content big-photo-container">
                    <p class="image">
                        <button
                            @click="changeImage(0)"
                            class="button arrow-button is-medium"
                        >
                            <span class="icon is-small">
                                <i class="fas fa-arrow-left"></i>
                            </span>
                        </button>
                        <img :src="imageUrl" alt="Zdjęcie z galerii" />
                        <button
                            @click="changeImage(1)"
                            class="button arrow-button is-medium"
                        >
                            <span class="icon is-small">
                                <i class="fas fa-arrow-right"></i>
                            </span>
                        </button>
                    </p>
                </div>
                <button
                    class="modal-close is-large"
                    aria-label="close"
                    @click="showModal = false"
                ></button>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            animate: false,
            imageUrl: "",
            showModal: false,
            number: 0,
            showMorePhotos: false,
            images: [],
            hiddenImages: [],
            imageIndex: 0,
            hiddenImagesIndex: 0,
            renderImage: true,
            renderHiddenImage: true,
            imagesReady: false,
            imagesUrls: []
        };
    },
    methods: {
        renderGallery(option) {
            if (option == 1) {
                if (this.imageIndex < this.images.length - 1) {
                    this.imageIndex += 1;
                } else {
                    this.renderImage = false;
                }
            } else {
                if (this.hiddenImagesIndex < this.hiddenImages.length - 1) {
                    this.hiddenImagesIndex += 1;
                } else {
                    this.renderHiddenImage = false;
                }
            }
        },
        async getMorePhotos() {
            const response = await axios.get("gallery-get/second");

            this.hiddenImages = response.data;
            this.showMorePhotos = true;
            this.imagesUrls = this.images.concat(response.data);
        },
        visibilityChanged(isVisible, entry) {
            if (isVisible) {
                this.animate = true;
            }
        },
        showBigPhoto(index, columnIndex, option) {
            if (option == 1) {
                var imageNumber = (index - 1) * 4 + columnIndex;
                this.imageUrl = this.imagesUrls[imageNumber - 1].url;
                this.number = imageNumber - 1;
                this.showModal = true;
            } else {
                var imageNumber = (index - 1) * 4 + columnIndex + 8;
                this.imageUrl = this.imagesUrls[imageNumber - 1].url;
                this.number = imageNumber - 1;
                this.showModal = true;
            }
        },
        changeImage(direction) {
            if (direction == 0) {
                this.number -= 1;
            } else if (direction == 1) {
                this.number += 1;
            }
            if (this.number >= this.imagesUrls.length) {
                this.number = 0;
            } else if (this.number < 0) {
                this.number = this.imagesUrls.length - 1;
            }
            this.imageUrl = this.imagesUrls[this.number].url;
        },
        keyPressed(event) {
            if (event.which == 39) {
                this.changeImage(1);
            } else if (event.which == 37) {
                this.changeImage(0);
            } else if (event.which == 27) {
                this.showModal = false;
            }
        }
    },
    created() {
        window.addEventListener("keyup", this.keyPressed);
    },
    async mounted() {
        const response = await axios.get("/gallery-get/first");

        this.images = response.data;
        this.imagesReady = true;
        this.imagesUrls = response.data;
    }
};
</script>

<style lang="scss">
@import "~@/_bulma-variables.scss";
@import "~@/_variables.scss";

.image > button:first-child {
    position: absolute;
    top: 45%;
    left: 1%;
}
.image > button:last-child {
    position: absolute;
    top: 45%;
    right: 1%;
}
.arrow-button {
    background-color: #000000 !important;
    opacity: 0.2;
    border: none;
}
.arrow-button > span > i {
    color: white;
}
.arrow-button:hover {
    opacity: 0.5;
    border: none;
}
article > figure:hover {
    cursor: pointer;
    opacity: 0.8;
}
.text-separator-parent {
    width: 100%;
    display: flex;
    justify-content: center;
}
.text-separator {
    background-color: $accent-color;
    margin-bottom: 150px;
    min-height: 2px;
    width: 80% !important;
}
.gallery-image:hover {
    cursor: pointer;
    opacity: 0.9;
}
html {
    overflow: scroll;
    overflow-x: hidden;
}
::-webkit-scrollbar {
    width: 0px; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
}
</style>
