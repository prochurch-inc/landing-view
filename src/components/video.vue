<template>
    <section class="video " :class="'video-rounding-' + styleStyleId" v-if="headerVideoUrl && headerShowVideo">
        <iframe width="560" height="315" :src="'https://www.youtube.com/embed/' + videoID" frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
            v-if="youtube"></iframe>
        <iframe :src="vimeourl" width="560" height="315" frameborder="0"
            allow="autoplay; fullscreen" allowfullscreen v-if="vimeo && vimeoId"></iframe>
    </section>
</template>

<script>
    import axios from 'axios';
    import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';

    export default {
        // props: ['landingpage'],
        data() {
            return {
                //page: this.landingpage,
                vimeoId: null
            }
        },
        methods: {
            getvimeoid(){
                 if(this.headerVideoUrl.includes('vimeo')){
                    console.log(this.headerVideoUrl);
                    axios.post('/api/vimeoid', {
                        video: this.headerVideoUrl
                    }).then(response => {
                        // console.log(response.data.)
                        this.vimeoId = response.data.video_id;
                    });
                 };
            }
        },
        created(){
            this.getvimeoid();
        },
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
                headerUseCustomVideoUrl: 'useCustomVideoUrl',
                headerChangeStatus: 'changeStatus',
                headerIsOpen: 'isOpen',
                headerDefaultImages: 'defaultImages',
                headerDefaultVideos: 'defaultVideos',
                headerCategoryId: 'categoryId',
            }),
            vimeourl(){
                var autoplay = this.headerVideoAutoplay ? '1' : '0';
                var loop = this.headerVideoLoop ? '1' : '0';
                return `https://player.vimeo.com/video/${this.vimeoId}?autoplay=${autoplay}&loop=${loop}`
            },
            youtubeurl(){
                var autoplay = this.headerVideoAutoplay ? '1' : '0';
                var loop = this.headerVideoLoop ? '1' : '0';
                return ` https://www.youtube.com/embed/${this.videoID}?autoplay=${autoplay}&loop=${loop}&playlist=${this.videoID}`
            },
            youtube(){
                if(this.headerVideoUrl.includes('youtube')){
                    return true
                }
            },
            vimeo(){
                if(this.headerVideoUrl.includes('vimeo')){
                    return true;
                }
            },
            videoID(){
                if(this.headerVideoUrl.includes('youtube')){
                    // run through regex to return youtube id
                     var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
                     var match = this.headerVideoUrl.match(regExp);
                     return (match&&match[7].length==11) ? match[7] : false;
                } else {
                    return false;
                };
            }
        }
    }

</script>

<style scoped>

</style>
