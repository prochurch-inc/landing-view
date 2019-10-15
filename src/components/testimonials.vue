<template>
    <section class="testimonials p-8 md:pt-16 md:px-16 bg-white" v-if="testimonialsShowTestimonials && testimonialsTestimonials.length > 0">
        <h1 class="text-center max-w-md mx-auto mb-12">Reviews of Our Church</h1>
          <carousel :per-page="3"  :mouse-drag="false" class="max-w-2xl mx-auto">
            <slide v-for="(test, key) in testimonialsTestimonials" :key="key" class="mx-auto">
                <img :src="test.image.includes('http') ? test.image : `${this.parent}/storage/${test.image}`" alt="">
                <h4 class="user-color" :style="{color: styleMainColor}">{{test.name}}</h4>
                <h5 class="user-color" :style="{color: styleMainColor}">{{test.title}}</h5>
                <star-rating :read-only="true" :show-rating="false" :rating="test.rating" :star-size="30" :inline="true" class="mb-4" :active-color=" styleMainColor"></star-rating>
                <p>{{test.text}}</p>
            </slide>
          </carousel>
    </section>
</template>

<script>
    import { Carousel, Slide } from 'vue-carousel';
    import StarRating from 'vue-star-rating';
    import { mapState } from 'vuex';

    export default {
        components: {
            Carousel,
            Slide,
            StarRating
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
            ...mapState('storeLanding/storeTestimonials', {
                testimonialsIsOpen: 'isOpen',
                testimonialsShowTestimonials: 'showTestimonials',
                testimonialsChangeStatus: 'changeStatus',
                testimonialsTestimonials: 'testimonials',
            }),
            ...mapState('storeLanding',{
                parent: 'parent',
            }),
        }
    }

</script>

<style scoped>

</style>
