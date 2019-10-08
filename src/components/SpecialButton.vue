<template>
    <a class="cta-button px-8 py-2 user-bg-color shadow inline-flex items-center justify-center hover:bg-gray-400"
        :style="{background: 'linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 14.2%, rgba(0, 0, 0, .30) 100%), ' + accentColor, 'color': textColor}"
        :class="'rounding-' + styleId"
        @click.prevent="onClick">
        <span class="ml-4">
            <p v-if="mainText" :style="{'color': textColor}">{{ mainText }}</p>
            <p class="text-xs font-normal tracking-wide" :style="{'color': textColor}" v-if="subText">{{ subText }}</p>
        </span>
        <i class='uil uil-arrow-right text-4xl' :style="{'color': textColor}" v-if="icon"></i>
    </a>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';

export default {
    name: 'SpecialButton',
    props: {
        onClick: {
            type: Function,
            default: () => {}
        },
        buttonLink: {
            type: String,
            default: '#',
        },
        mainText: {
            type: String,
            required: true,
            default: ''
        },
        subText: {
            type: String,
            default: ''
        },
        icon: {
            type: Boolean,
            default: true,
        }
    },

    computed: {
        ...mapState('storeLanding/storeStyles', [
            'styleId', 'accentColor'
        ]),
        bgRgb() {
            if(!this.accentColor)
                return;

            let hexToRgb = function(hex) {
                // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
                var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
                hex = hex.replace(shorthandRegex, function(m, r, g, b) {
                    return r + r + g + g + b + b;
                });

                var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                return result ? {
                    r: parseInt(result[1], 16),
                    g: parseInt(result[2], 16),
                    b: parseInt(result[3], 16)
                } : null;
            }

            return hexToRgb(this.accentColor)
        },
        bgColourIsLight() {
            if(!this.bgRgb)
                return false;

            var a = 1 - (0.299 * this.bgRgb.r + 0.587 * this.bgRgb.g + 0.114 * this.bgRgb.b) / 255;
            return (a < 0.5);
        },
        textColor() {
            if(!this.bgRgb)
                return 'white'

            return this.bgColourIsLight ? 'black' : 'white';
        }
    }
}
</script>