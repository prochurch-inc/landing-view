<template>
    <div>
        <section
            class="header flex flex-col items-center text-center py-24 w-full min-h-header bg-cover bg-center bg-bottom bg-no-repeat text-white bg-fixed"
            :class="[styleChurchName || styleLogo ? 'justify-start' : 'justify-center' ]" v-if="headerImage"
           :style="headerbackground" >
            <h1 v-if="headerTitle">{{parseTags(headerTitle)}}</h1>
            <h5 v-if="headerSubtitle">{{ parseTags(headerSubtitle) }}</h5>
            <special-button
                :main-text="parseTags(headerButtonTitle)"
                :sub-text="parseTags(headerButtonSubtitle)"
                :on-click="showForm"
            />
             <div v-if="headerShowCountdown">
                <p class="text-sm mb-2" :style="{color: styleAccentColor}" v-text="parseTags(headerCountdownTitle)"></p>
                <countdown-timer :color="styleAccentColor" :rounding="styleStyleId" :deadline="headerCountdownDate" :endingtime="headerCountdownTime" :day="headerCountdownDay" :type="headerCountdownType" :countdowntitle="parseTags(headerCountdownTitle)" ></countdown-timer>
            </div>
        </section>
        <section
            class="header flex flex-col items-center text-center py-8 w-full min-h-header bg-cover bg-center bg-bottom bg-no-repeat text-white bg-fixed"
            :class="[styleChurchName || styleLogo ? 'justify-start' : 'justify-center' ]" v-else
            style="background-image: url('/images/landing/header-background.jpg')">
            <h1 v-if="headerTitle">{{ parseTags(headerTitle)}}</h1>
            <h5 v-if="headerSubtitle">{{ parseTags(headerSubtitle) }}</h5>
            <special-button
                :main-text="parseTags(headerButtonTitle)"
                :sub-text="parseTags(headerButtonSubtitle)"
                :on-click="showForm"
            />
            <countdown-timer :deadline="headerCountdownDate" :rounding="styleStyleId" v-if="headerCountdownDate" :color="styleAccentColor"></countdown-timer>
        </section>
    </div>
</template>

<script>
    import countdownTimer from './CountdownTimer';
    import hexRgb from 'hex-rgb';
    import { mapState, mapMutations } from 'vuex';
    import SpecialButton from './SpecialButton'
    import copymixin from './copymixin.js';

    export default {
        components: { countdownTimer, SpecialButton },

        mixins: [copymixin],

        computed: {
            headerbackground(){
                let color = hexRgb(this.styleBackgroundColor);
                let colorBackground = `rgba(${color.red}, ${color.green}, ${color.blue}, .${this.styleBackgroundOpacity})`;
                let image = this.headerImage.includes('http') ? this.headerImage : `${this.parent}/storage/${this.headerImage}`;
                return  `background: linear-gradient(${colorBackground} 0%, ${colorBackground} 100%), url(${image});`
            },
            ...mapState('storeLanding', ['team', 'user']),
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
            ...mapState('storeLanding/storeHeader', {
                headerTitle: 'title',
                headerSubtitle: 'subtitle',
                headerImage: 'image',
                headerUseCustomImageBackground: 'useCustomImageBackground',
                headerShowCountdown: 'showCountdown',
                headerCountdownTitle: 'countdownTitle',
                headerCountdownType: 'countdownType',
                headerCountdownDay: 'countdownDay',
                headerCountdownTime: 'countdownTime',
                headerCountdownDate: 'countdownDate',
                headerShowVideo: 'showVideo',
                headerVideoUrl: 'videoUrl',
                headerVideoAutoplay: 'videoAutoplay',
                headerVideoLoop: 'videoLoop',
                headerButtonTitle: 'buttonTitle',
                headerButtonSubtitle: 'buttonSubtitle',
                headerUseCustomVideoUrl: 'useCustomVideoUrl',
                headerChangeStatus: 'changeStatus',
                headerIsOpen: 'isOpen',
                headerDefaultImages: 'defaultImages',
                headerDefaultVideos: 'defaultVideos',
                headerCategoryId: 'categoryId',
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
            showForm() {
                if(this.preview == false)
                    this.setFormIsOpen(true);
            },
            parseTags(string) {
                if (typeof string != 'string') {
                    return '';
                }

                return this.replaceTags(string, this.user, this.team)
            }
        },
    }

</script>
