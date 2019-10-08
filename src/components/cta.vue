<template>
    <section class="footer-cta
            py-24 px-12 text-center bg-cover bg-center bg-black"
        :style="{background: 'linear-gradient(rgba(0, 0, 0, .6) 0%,  rgba(0, 0, 0, .6) 100%), url('+ backgroundImage + ')'}" v-if="ctaShowCta">
        <h4 class="text-white text-xl  font-medium mb-2">{{ ctaHeading }}</h4>
        <h5 class="text-white text-lg font-medium mb-6">{{ ctaSubHeading }}</h5>
        <special-button
            :main-text="ctaButtonText"
            :sub-text="ctaButtonSubtext"
        />
    </section>
</template>

<script>
    import { mapState, mapMutations } from 'vuex';
    import SpecialButton from './SpecialButton'

    export default {
        components: { SpecialButton },
        computed: {
            backgroundImage(){
                if(this.ctaImage){
                    if(this.ctaImage.includes('http')){
                        return this.ctaImage;
                    }else{
                        return `/storage/${this.ctaImage}`;
                    }
                }
            },
            ...mapState('storeLanding/storeStyles', {
                styleShowLogo: 'showLogo',
                styleChurchName: 'churchName',
                styleLogo: 'logo',
                styleMainColor: 'mainColor',
                styleAccentColor: 'accentColor',
                styleBackgroundColor: 'backgroundColor',
                styleBackgroundOpacity: 'backgroundOpacity',
                styleFontId: 'fontId',
                styleStyleId: 'styleId',
            }),
            ...mapState('storeLanding/storeCta', {
                ctaIsOpen: 'isOpen',
                ctaChangeStatus: 'changeStatus',
                ctaDefaultImages: 'defaultImages',
                ctaShowCta: 'showCta',
                ctaShowPeopleTip: 'showPeopleTip',
                ctaRoundingchoices: 'roundingchoices',
                ctaCategoryId: 'categoryId',
                ctaImage: 'image',
                ctaHeading: 'heading',
                ctaSubHeading: 'subHeading',
                ctaButtonText: 'buttonText',
                ctaButtonSubtext: 'buttonSubtext',
                ctaButtonStyle: 'buttonStyle',
                ctaUseCustomImageBackground: 'useCustomImageBackground',
            }),
        },
        methods: {
        }
    }

</script>

<style scoped>

</style>
