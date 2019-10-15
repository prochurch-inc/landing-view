<template>
    <section class="logoSection w-full flex items-center justify-center p-3 text-white relative "
        :style="{background:mainColor}">
        <div class="logo flex items-center h-32 mt-6" v-if="logo">
            <img :src="logoView" alt="" class="logo h-24">
        </div>
        <div class="logo_alt h-24 flex items-center mt-6" v-if="!logo && churchName">
            <h2 class="text-3xl">{{churchName}}</h2>
        </div>
    </section>
</template>

<script>
import { mapState } from 'vuex';
    export default {

        computed: {
            ...mapState('storeLanding/storeStyles', [
                'mainColor', 'logo', 'churchName'
            ]),
            ...mapState('storeLanding',{
                parent: 'parent',
            }),
            logoView(){
               return this.includes('http') ? this.logo : `${this.parent}/storage/${this.logo}`;
            }
        }
    }

</script>

<style scoped>

</style>
