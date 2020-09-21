<template>
    <section class="hero is-fullheight" id="about-us">
        <div class="hero-body">
            <div class="container">
                <div class="columns is-vcentered">
                    <div class="column">
                        <div class="column">
                            <figure class="image">
                                <img src="/images/page/piotrek.png">
                            </figure>
                        </div>
                    </div>
                    <div class="column is-5 about-us-main-column">
                        <h1 class="about-us-title">{{ $t('messages.about_us') }}</h1>
                        <div class="about-us-text-separator"></div>
                        <h2 class="about-us-subtitle">
                            {{ $t('messages.about-us-content') }}
                        </h2>                       
                        <div class="icon-parent">
                            <span class="icon large-icon" v-scroll-to="'#gallery'">
                                <i class="far fa-caret-square-down"></i>
                            </span>                       
                        </div>                          
                    </div>
                    <div class="column">
                         <div class="column">
                            <figure class="image">
                                <img src="/images/page/mariusz.png">
                            </figure>
                        </div>                        
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            animate: false
        }
    },
    methods: {
        visibilityChanged (isVisible, entry) {            
            if (isVisible) {
                this.animate = true;
            }
        }
    }
}
</script>

<style lang="scss">
    @import '~@/_bulma-variables.scss';
    @import '~@/_variables.scss';

    .about-us-title {
        font-size: 35pt !important;
        font-weight: lighter !important;        
    }
    .about-us-subtitle {
        font-size: 14pt !important;
        text-align: justify;
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
    .icon-parent {
        display: flex;
        justify-content: center;
        width: 100%;
    }
    .about-us-text-separator {
        background-color: $accent-color;
        margin-bottom: 20px;
        min-height: 2.5px;
        width: 40% !important;
    }    
    .about-us-main-column {
        margin-left: 30px;
        margin-right: 30px;
    }
    @media only screen and (max-width: 1280px) {
        .about-us-title {
            font-size: 30pt !important;
            font-weight: normal !important;        
        }
        .about-us-subtitle {
            font-size: 12pt !important;
            text-align: justify;
        }
        .about-us-image {
            max-width: 80%;
        }
    }

</style>
