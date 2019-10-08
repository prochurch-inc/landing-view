<template>
    <section class="features" v-if="featuresShowHighlights" :style="{background: backgroundStyles }">
        <div class="wrapper w-full max-w-3xl mx-auto p-12">
            <article class="feature" v-for="(item, key) in featuresHighlights" :key="key">
                <div class="item">
                    <div class="text-area">
                        <h2 :style="{color: styleMainColor}">{{item.heading}}</h2>
                        <div class="paragraph" v-html="item.body"></div>
                    </div>
                    <img :src="item.photo" :alt="item.heading">
                </div>
                <div class="buttons text-center mb-12" v-if="featuresShowButtons">
                    <a href="#"
                        class="cta-button user-bg-color shadow inline-flex px-8 py-2 items-center justify-center hover-button"
                        :style="{background: styleAccentColor}"
                        :class="'rounding-' + styleStyleId" @click.prevent="">
                        <span class="ml-4">
                            <p class="text-white">{{ ctaButtonText }}</p>
                            <p class="text-white text-xs font-normal tracking-wide" v-if="featuresShowButtons">Join <span
                                    class="font-bold">24</span> who have also signed up!</p>
                        </span>
                        <i class='uil uil-arrow-right text-4xl text-white'></i>
                    </a>
                </div>
            </article>
        </div>
    </section>
</template>

<script>
    import hexRgb from 'hex-rgb';
    import { mapState, mapMutations } from 'vuex';

    export default {
        computed: {
            backgroundStyles(){
                let color = hexRgb(this.featuresBgColor);
                let color_background = `rgba(${color.red}, ${color.green}, ${color.blue}, .${this.featuresBgOpacity})`;
                return `linear-gradient(${color_background} 0%, ${color_background} 100%), url(/storage/${this.featuresTextureUrl})`
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
            ...mapState('storeLanding/storeFeatures', {
                featuresIsOpen: 'isOpen',
                featuresChangeStatus: 'changeStatus',
                featuresShowButtons: 'showButtons',
                featuresStyle: 'style',
                featuresBgColor: 'bgColor',
                featuresBgOpacity: 'bgOpacity',
                featuresTextureUrl: 'textureUrl',
                featuresHighlights: 'highlights',
                featuresUseHighlights: 'useHighlights',
                featuresBackgroundImages: 'backgroundImages',
                featuresShowTextTip: 'showTextTip',
                featuresShowHighlights: 'showHighlights',
            })
        },
         methods: {
        }
    }

</script>

<style lang="scss">
    .features {
        background: url('/images/funky-lines.png');
        @apply w-full;
    }

    .feature .item {
        @apply flex mb-12;

        img {
            z-index: 1;
            width: 317px;
            height: 293px;
        }
    }

    .feature:nth-child(odd) .item {
        .text-area {
            margin-top: 4rem;
            margin-right: -4rem;
            z-index: 2;
        }
    }

    .feature:nth-child(even) .item {
        flex-direction: row-reverse;

        .text-area {
            margin-top: 4rem;
            margin-left: -4rem;
            z-index: 2;
        }
    }

    .feature .text-area {
        background: rgba(255, 255, 255, .9);
        min-height: 19rem;
        box-shadow: 22px 22px 40px rgba(0, 0, 0, 0.15);
        backdrop-filter: blur(4px);
        @apply p-8 max-w-md flex-grow;

        .paragraph {
            width: 20rem;
        }
    }

    .feature:last-child .buttons {
        display: none;
    }

</style>
