<template>
    <div class="builder-container" >
       <div class="grid-builder overflow-y-auto">
            <slot name="builder"></slot>
       </div>
       <div class="grid-preview" :class="[formIsOpen || showThankYou ? 'overflow-hidden' : 'overflow-y-auto']">
          <slot name="preview"></slot>
       </div>
       <div class="mobile-preview" v-if="showPreview" :class="[formIsOpen || showThankYou ? 'overflow-hidden' : 'overflow-y-auto']">
          <slot name="preview"></slot>
       </div>
        <div class="preview-switcher">
                <button @click="showPreview = false" class="mr-4">Edit</button>
                <button @click="showPreview = true">Preview</button>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
        data(){
            return {
                showPreview: false,
            }
        },
        computed: {
            ...mapState('storeLanding/storeForm',{
                formIsOpen: 'isOpen',
            }),
            ...mapState('storeThankYou',[
                'showThankYou',
                'image'
            ]),
        }
    }
</script>

<style lang="scss">
    .builder-container {
        display: grid;
        position: fixed;
        height: calc(100vh - 8rem);
        width: calc(100% - 4rem);
        top: 8rem;
        left: 4rem;
        bottom: 0;
    }
    .preview-switcher {
        width: calc(100vh-4rem);
        margin-left: 4rem;
        @apply bg-black p-4 fixed bottom-0 left-0 right-0 z-30 text-white flex items-center justify-center;
    }
    .grid-builder {
        @apply bg-gray-200;
    }


    @media screen and (max-width: 750px){
        .builder-container {
            grid-template-columns: 1fr;
        }
        .grid-builder {
            @apply p-6;
        }
        .grid-preview {
            display: none;
        }
        .mobile-preview {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            z-index: 20;
            height: calc(100vh-140px);
            @apply bg-white;
        }

    }
    @media screen and (min-width: 751px){
        .preview-switcher {
            @apply hidden;
        }
         .builder-container {
            grid-template-columns: minmax(375px, 450px) minmax(375px, 1fr);
         }
          .grid-builder {
            /*background: blue;*/
            height: calc(100vh - 140px);
            @apply p-4;
            /*height: 100vh;*/

        }
        .grid-preview {
            height: calc(100vh - 140px);
            /*overflow-y: auto;*/
            /*height: 100vh;*/
            @apply bg-white;
        }
        .mobile-preview {
            display: none;
        }
    }


</style>
