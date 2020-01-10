<template>
    <div>
        <h2 class="text-2xl mb-6 text-center">{{inputs[0].title}}</h2>
        <div class="flex items-center justify-center my-6">
            <the-mask :mask="'(###) ###-####'" v-model="phoneModel" class="py-3 px-6 border text-center rounded-sm"/>
            <span class="text-xs text-red-500 mt-1 font-heading" v-if="showValidationError">This information is required</span>
        </div>
    </div>
</template>

<script>
    import { TheMask } from 'vue-the-mask'
    import { mapState, mapMutations, mapGetters } from 'vuex';

    export default {
        components: { TheMask },
        computed: {
            phoneModel: {
                get() {
                    return this.phone
                },
                set(value) {
                    this.setPhone(value)
                }
            },
            inputs() {
                return this.getPhoneInputs()
            },
            ...mapState('storeLanding/storeForm', [
                'phone', 'showErrors'
            ]),
            ...mapGetters('storeLanding/storeForm', [
                'validateField'
            ]),
            ...mapGetters('storeManageForm',[
                'isRequiredField'
            ]),
            showValidationError() {
                return this.showErrors && this.isRequiredField('Phone') && ! this.validateField('Phone')
            },
        },
        mounted(){
            //  Wait half a second before focusing on the 1 field so as not to inadvertantly advance to the second field.
             setTimeout(()=> {
                document.getElementById('1').focus();
             }, 500)
        },
        methods: {
            ...mapMutations('storeLanding/storeForm',[
                'setPhone', 'nextStep'
            ]),
            ...mapGetters('storeManageForm', [
                'getPhoneInputs'
            ]),
        }
    }
</script>

<style scoped>
input[type=number] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance:textfield;
}
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  margin: 0;
}
</style>
