<template>
    <section class="bg-white" v-if="galleryShowGallery" >
        <div class="flex">
        <!-- <vue-masonry-gallery :imgsArr="page.gallery" :imgWidth="475" height="500px" :gap="0" :loadingTimeOut="200"></vue-masonry-gallery>  -->
        <div v-for="item in galleryImages" class="grid-item " :style="{background: 'url(' + item.src + ') no-repeat center center', backgroundSize: 'cover', 'height': heightInPx, 'width': itemWidth}">

        </div>
        </div>
    </section>
</template>

<script>
    import { mapState } from 'vuex';
    // import VueMasonryGallery from "vue-masonry-gallery";
    export default {
        components: {
            // VueMasonryGallery
        },
        methods: {
        },
        computed: {

            itemWidth() {
                if(this.galleryImages.length <= 0)
                    return

                let totalImages = this.galleryImages.length
                let width = parseFloat(100 / totalImages);

                return `${width}%`
            },
            heightInPx(){
                // allow max height to 500px and set min height to 200px
                let height = parseInt(this.galleryHeight)
                let calculatedHeight = parseInt(height * 5);
                if(calculatedHeight <= 200)
                    return '200px'

                return `${calculatedHeight}px`;
            },
            ...mapState('storeLanding/storeGallery', {
                galleryIsOpen: 'isOpen',
                galleryChangeStatus: 'changeStatus',
                galleryImages: 'images',
                galleryShowGallery: 'showGallery',
                galleryHeight: 'height',
            })
        }

    }

</script>

<style lang="scss">

</style>
