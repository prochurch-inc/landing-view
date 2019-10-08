<template>
    <div>
        <div class=" flex items-center" @click="togglestarter">
                    <div class="handle flex w-16 border-r-2 border-gray-100 mr-2 justify-center items-center self-stretch hover:text-orange-500">
                        <svg class="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.4 12"><path id="np_menu_1111407_FFFFFF" d="M9.8,20a.8.8,0,1,0,0,1.6H24.6a.8.8,0,1,0,0-1.6Zm0,5.2a.8.8,0,1,0,0,1.6H24.6a.8.8,0,1,0,0-1.6Zm0,5.2a.8.8,0,1,0,0,1.6H24.6a.8.8,0,1,0,0-1.6Z" transform="translate(-9 -20)" /></svg>
                    </div>
                    <div class="flex p-5 items-center flex-grow">
                    <img src="/images/toggle-open.svg" alt="toggle" class="mr-6" v-if="open">
                    <img src="/images/toggle-closed.svg" alt="toggle" class="mr-6" v-else>

                    <div class="title flex-grow mr-6 flex flex-col justify-center">
                        <p class="text-xs text-orange-400 uppercase tracking-wid leading-tight" v-if="subtitle">{{subtitle}}</p>
                        <h2 class="text-lg w-full tracking-wide mb-0">{{title}}</h2>
                    </div>
                    <slot></slot>
                    <img src="/images/info-circle.svg" alt="" v-if="changeStatus == 'default-saved'">
                    <img src="/images/done.svg" alt="" v-else-if="changeStatus == 'modified'">
                    <img src="/images/info-circle-disabled.svg" alt="" v-else>
                    </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['completed', 'open', 'title', 'subtitle', 'defaultContent', 'changeStatus'],
        methods: {
            togglestarter(){
                this.$emit('toggle')
                Bus.$emit('show-form-step', {title: this.title})
            }
        }
    }
</script>
<style scoped>
    .handle {
        transition: color 0.2s ease-in-out;
    }
</style>
