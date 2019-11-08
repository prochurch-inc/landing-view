<template>
    <section class="footer-cta
            py-24 px-12 text-center bg-cover bg-center bg-black"
        :style="{background: 'linear-gradient(rgba(0, 0, 0, .6) 0%,  rgba(0, 0, 0, .6) 100%), url('+ backgroundImage + ')'}" v-if="ctaShowCta">
        <h4 class="text-white text-xl  font-medium mb-2">{{ parseTags(ctaHeading) }}</h4>
        <h5 class="text-white text-lg font-medium mb-6">{{ parseTags(ctaSubHeading) }}</h5>
        <special-button
            :main-text="parseTags(ctaButtonText)"
            :sub-text="parseTags(ctaButtonSubtext)"
            :on-click="showForm"
        />
    </section>
</template>

<script>
    import { mapState, mapMutations } from 'vuex';
    import SpecialButton from './SpecialButton';
    import copymixin from './copymixin.js';

    export default {
        mixins: [copymixin],
        components: { SpecialButton },
        computed: {
            ...mapState('storeLanding', ['team', 'user']),
            backgroundImage(){
                if(this.ctaImage){
                    if(this.ctaImage.includes('http')){
                        return this.ctaImage;
                    }else{
                        return `${this.parent}/storage/${this.ctaImage}`;
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
            ...mapState('storeLanding',{
                parent: 'parent',
                preview: 'preview',
            }),
        },
        methods: {
            ...mapMutations({
                setFormIsOpen: 'storeLanding/storeForm/setIsOpen',
            }),
            showForm(){
                if(this.preview == false)
                    this.setFormIsOpen(true);
            },
            parseTags(string) {
                if (typeof string != 'string') {
                    return '';
                }

                return this.replaceTags(string, this.user, this.team)
            }
        }
    }

</script>

<style scoped>

</style>
