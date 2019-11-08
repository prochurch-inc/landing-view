<template>
    <!--<section class="text-content" :class="{'with-video': page.show_video }">-->
    <section class="text-content">
        <div class="text-wrapper" v-html="parseTags(textBody)">
        </div>
        <ul v-if="textBulletPoints.length > 0" class="fancy-bullets">
            <li v-for="item in textBulletPoints" class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.18 21.18" class="h-4 inline-block mr-4">
                    <path id="np_checklist_1688724_000000" d="M18.076,3.1a10.591,10.591,0,1,0,0,14.978,10.593,10.593,0,0,0,0-14.978ZM4.337,10.717a1.159,1.159,0,0,1,1.631,0L8.448,13.2l6.707-7.666a1.152,1.152,0,1,1,1.734,1.517L9.372,15.644a1.155,1.155,0,0,1-1.69.046L4.337,12.348a1.157,1.157,0,0,1,0-1.631Z" transform="translate(0.002 0.001)" :fill="styleMainColor"/>
                </svg>
                {{parseTags(item.text)}}</li>
        </ul>
    </section>
</template>

<script>
    import { mapState } from 'vuex';
    import copymixin from './copymixin.js';

    export default {
        mixins: [copymixin],
        computed: {
            ...mapState('storeLanding', ['team', 'user']),
            ...mapState('storeLanding/storeText', {
                textIsOpen: 'isOpen',
                textChangeStatus: 'changeStatus',
                textBody: 'body',
                textBulletPoints: 'bulletPoints',
            }),
            ...mapState('storeLanding/storeStyles', {
                styleMainColor: 'mainColor',
            }),
        },
        methods: {
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
