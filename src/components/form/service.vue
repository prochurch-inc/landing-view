<template>
    <div>
        <h2 class="text-2xl mb-6 text-center">{{inputs[0].title}}</h2>
        <div v-for="(service, key) in services" :key="key">
            <p @click="selectService(service)" class="block w-full py-2 px-4 border hover:bg-gray-300 cursor-pointer" :class="{'bg-gray-200': service == serviceModel }">
                <i class='uil mr-4' :class="{'uil-check-circle': service == serviceModel, 'text-blue-500': service == serviceModel, 'uil-circle': service != serviceModel, 'text-gray-400': service != serviceModel }"></i> {{service}}
            </p>
       </div>
        <span class="text-xs text-red-500 mt-1 font-heading" v-if="showValidationError">This information is required</span>
    </div>
</template>

<script>
    import { mapState, mapMutations, mapGetters } from 'vuex';

    export default {
        computed: {
            serviceModel: {
                get() {
                    return this.service
                },
                set(value) {
                    this.setService(value)
                }
            },
            inputs() {
                return this.getTimesInputs()
            },
            services() {
                return this.getServices()
            },
            ...mapState('storeLanding', [
                'team'
            ]),
            ...mapState('storeLanding/storeForm', [
                'service', 'showErrors'
            ]),
            ...mapGetters('storeLanding/storeForm', [
                'validateField'
            ]),
            ...mapGetters('storeManageForm',[
                'isRequiredField'
            ]),
            showValidationError() {
                return this.showErrors && this.isRequiredField('Times') && ! this.validateField('Times')
            },
        },
        mounted(){
        },
        methods:{
            ...mapMutations('storeLanding/storeForm',[
                'setService', 'nextStep'
            ]),
            ...mapGetters('storeLanding/storeForm', [
                'getServices'
            ]),
            ...mapGetters('storeManageForm', [
                'getTimesInputs'
            ]),
            selectService(service){
                this.serviceModel = service
                //this.nextStep()
            }
        }
    }

</script>

<style lang="scss" scoped>
    .options label {
        @apply inline-flex items-center justify-center h-12 w-12 border shadow;
        &:hover {
            @apply bg-gray-200;
        }
    }
    .options input[type="radio"]:checked+label {
        @apply bg-gray-200 border-blue-500;
    }
</style>
