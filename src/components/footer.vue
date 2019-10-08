<template>
    <section class="footer user-bg-color p-20 text-center text-white" :style="{background: styleMainColor}">
        <div class="logo flex items-center w-32 mx-auto" v-if="styleLogo">
            <img :src="styleLogo" alt="" class="logo">
        </div>
        <div class="church_name w-32 flex items-center mx-auto mb-4" v-if="!styleLogo && styleChurchName">
            <h2>{{styleChurchName}}</h2>
        </div>
        <p class="text-sm">Powered by ProChurch</p>
    </section>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        computed: {

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
        }
    }

</script>

<style scoped>

</style>
