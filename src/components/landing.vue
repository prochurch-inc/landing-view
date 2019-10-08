<template>
    <div>
        <div class="landing relative"
            :class="['body-' + styleFontId, 'heading-' + styleFontId, formIsOpen || showThankYou ? 'overflow-hidden' : 'overflow-y-auto']">
            <logo-view  id="logo"></logo-view>
            <header-view  id="header"></header-view>
            <video-view ></video-view>
            <div id="text"></div>
            <text-view ></text-view>
            <div id="features"></div>
            <features-view></features-view>
            <div id="testimonials"></div>
            <testimonials-view ></testimonials-view>
            <div id="gallery"></div>
            <gallery-view  ></gallery-view>
            <div id="cta"></div>
            <cta-view></cta-view>
            <div id="map"></div>
            <map-view></map-view>
            <footer-view ></footer-view>
            <form-view  v-if="formIsOpen" style="background-color: rgba(0,0,0,.9);" class="absolute top-0 right-0 left-0 bottom-0 w-full h-screen flex items-center justify-center"></form-view>
            <thankyou-view  v-if="showThankYou"  :style="{ backgroundImage: 'linear-gradient( rgba(0, 0, 0, 0.80), rgba(0, 0, 0, 0.80)), url(' +  image + ')' }" class="absolute top-0 right-0 left-0 bottom-0 w-full h-screen flex items-start justify-center bg-cover"></thankyou-view>
        </div>
    </div>
</template>

<script>
    import logoView from "./logo.vue";
    import headerView from "./header.vue";
    import videoView from "./video.vue";
    import textView from "./text.vue";
    import featuresView from "./features.vue";
    import testimonialsView from "./testimonials.vue";
    import galleryView from "./gallery.vue";
    import ctaView from "./cta.vue";
    import mapView from "./map.vue";
    import footerView from "./footer.vue";
    import formView from "./form.vue";
    import thankyouView from "./thankyou.vue";
    import { mapState } from 'vuex';

    export default {
        components: {
            logoView,
            headerView,
            videoView,
            textView,
            featuresView,
            testimonialsView,
            galleryView,
            ctaView,
            mapView,
            footerView,
            formView,
            thankyouView
        },
        computed: {
            ...mapState('storeLanding/storeStyles',{
                styleFontId: 'fontId',
            }),
            ...mapState('storeLanding/storeForm',{
                formIsOpen: 'isOpen',
            }),
            ...mapState('storeThankYou',[
                'showThankYou',
                'image'
            ]),

        },
        methods: {

        }

    }

</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Montserrat:400,700|PT+Sans+Narrow:400,700&display=swap');
    @import url('https://fonts.googleapis.com/css?family=Oswald:500&display=swap');
    @import url('https://fonts.googleapis.com/css?family=Maven+Pro:400,700&display=swap');
    @import url('https://fonts.googleapis.com/css?family=Bitter:700&display=swap');
    @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
    @import url('https://fonts.googleapis.com/css?family=Karla:700|Roboto+Slab&display=swap');
    @import url('https://fonts.googleapis.com/css?family=Lato:400,400i,700|Playfair+Display&display=swap');
    @import url('https://fonts.googleapis.com/css?family=Lato:400,400i,700|Libre+Baskerville:400,400i&display=swap');



    .body-1 blockquote,
    .body-2 blockquote,
    .body-3 blockquote,
    .body-4 blockquote,
    .body-5 blockquote,
    .body-6 blockquote {
        margin-left: 2rem;
        border-left: 2px gray solid;
        padding-left: 1rem;
        font-style: italic;
    }

    .body-1,
    .body-1 p,
    .body-1 li,
    .body-1 ol,
    .body-1 a.cta-button,
    .body-1 div {
        font-family: 'PT Sans Narrow', sans-serif;
        font-weight: 400;
    }

    .heading-1,
    .heading-1 h1,
    .heading-1 h2,
    .heading-1 h3,
    .heading-1 h4,
    .heading-1 h5 {
        font-family: 'Montserrat', sans-serif;
        font-weight: 700;
        line-height: 1.5;
        margin-bottom: 1rem;
    }

    .heading-1 h1,
    .heading-2 h1,
    .heading-3 h1,
    .heading-4 h1,
    .heading-5 h1,
    .heading-6 h1 {
        font-size: 1.5rem;
        /*text-2xl*/
    }

    .body-2,
    .body-2 p,
    .body-2 li,
    .body-2 ol,
    .body-2 div {
        font-family: 'Maven Pro', sans-serif;
        font-weight: 400;
    }

    .heading-2,
    .heading-2 h1,
    .heading-2 h2,
    .heading-2 h3,
    .heading-2 h4,
    .heading-2 h5,
    .heading-2 a.cta-button {
        font-family: 'Oswald', sans-serif;
        font-weight: 500;
        line-height: 1.5;
        margin-bottom: 1rem;
    }

    .body-3,
    .body-3 p,
    .body-3 li,
    .body-3 ol,
    .body-3 div {
        font-family: 'Source Sans Pro', sans-serif;
        font-weight: 400;
    }

    .heading-3,
    .heading-3 h1,
    .heading-3 h2,
    .heading-3 h3,
    .heading-3 h4,
    .heading-3 h5,
    .heading-3 a.cta-button {
        font-family: 'Bitter', serif;
        font-weight: 700;
        line-height: 1.5;
        margin-bottom: 1rem;
    }

    .body-4,
    .body-4 p,
    .body-4 li,
    .body-4 ol,
    .body-4 div {
        font-family: 'Roboto Slab', serif;
        font-weight: 400;
    }

    .heading-4,
    .heading-4 h1,
    .heading-4 h2,
    .heading-4 h3,
    .heading-4 h4,
    .heading-4 h5,
    .heading-4 a.cta-button {
        font-family: 'Karla', sans-serif;
        font-weight: 700;
        line-height: 1.5;
        margin-bottom: 1rem;
    }

    .body-5,
    .body-5 p,
    .body-5 li,
    .body-5 ol,
    .body-5 div {
        font-family: 'Lato', sans-serif;
        font-weight: 400;
    }

    .heading-5,
    .heading-5 h1,
    .heading-5 h2,
    .heading-5 h3,
    .heading-5 h4,
    .heading-5 h5,
    .heading-5 a.cta-button {
        font-family: 'Playfair Display', serif;
        font-weight: 400;
        line-height: 1.5;
        margin-bottom: 1rem;
    }

    .body-6,
    .body-6 p,
    .body-6 li,
    .body-6 ol,
    .body-6 div {
        font-family: 'Lato', sans-serif;
        font-weight: 400;
    }

    .heading-6,
    .heading-6 h1,
    .heading-6 h2,
    .heading-6 h3,
    .heading-6 h4,
    .heading-6 h5,
    .heading-6 a.cta-button {
        font-family: 'Libre Baskerville', serif;
        font-weight: 400;
        font-style: italic;
        line-height: 1.5;
        margin-bottom: 1rem;
    }

    .rounding-1 {
        border-radius: 0;
    }

    .rounding-2 {
        border-radius: .25rem;
    }

    .rounding-3 {
        border-radius: 500px;
    }

    .video-rounding-1 {
        border-radius: 0;
    }

    .video-rounding-2,
    .video-rounding-3 {
        border-radius: .5rem;
    }



</style>
