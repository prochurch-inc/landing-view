<template>
    <div >
        <div class="text-center max-w-lg mt-24">
        <h1 class="text-white text-5xl mb-12">{{heading}}</h1>
        <div class="text-white leading-loose mb-12" v-html="body">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco</p>
        </div>
        <special-button
            :button-link="buttonLink"
            :main-text="buttonText"
        />
        </div>
    </div>
</template>

<script>
    import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
    import SpecialButton from './SpecialButton'

    export default {
        props: ['landingpage'],

        components: {
            SpecialButton
        },

        computed: {
            ...mapState('storeThankYou', [
                'heading','body','image','buttonText','buttonLink','imageChangeStatus','copyChangeStatus','buttonChangeStatus',
            ]),
        }
    }
</script>

<style scoped>

</style>
