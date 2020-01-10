<template>
    <div>
        <h2 class="text-2xl mb-6 text-center">{{inputs[0].title}}</h2>
       <div class="flex justify-center items-center">
           <div class="inputgroup w-full px-12">
               <label for="email">{{inputs[1].title}}</label>
               <input type="email" id="email" v-model="emailAddressModel" class="w-full" @blur="done">
                <span class="text-xs text-red-500 mt-1 font-heading" v-if="showValidationError">This information is required</span>
           </div>
       </div>
    </div>
</template>

<script>
    import { mapState, mapMutations, mapGetters } from 'vuex';

    export default {
        computed: {
            emailAddressModel: {
                get() {
                    return this.emailAddress
                },
                set(value) {
                    this.setEmailAddress(value)
                }
            },
            inputs() {
                return this.getEmailInputs()
            },
            ...mapState('storeLanding/storeForm', [
                'emailAddress', 'showErrors'
            ]),
            ...mapGetters('storeLanding/storeForm',[
                'validateField'
            ]),
            ...mapGetters('storeManageForm',[
                'isRequiredField'
            ]),
            showValidationError() {
                return this.showErrors && this.isRequiredField('Email') && ! this.validateField('Email')
            },
        },
        mounted(){
            document.getElementById('email').focus();
        },
        methods: {
            ...mapMutations('storeLanding/storeForm',[
                'setEmailAddress', 'nextStep'
            ]),
            ...mapGetters('storeManageForm', [
                'getEmailInputs'
            ]),
            done(){
                // Check to see if the email is an actual email using the regex here before firing done.
                var emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
                if(this.emailAddressModel && (this.emailAddressModel.search(emailRegEx)) === 0){
                    //this.nextStep()
                }
            }
        }
    }
</script>

<style scoped>
div.inputgroup {
    @apply block font-heading;
}
div.inputgroup label {
    @apply mr-6 text-sm w-32 text-gray-400;
}
div.inputgroup.check label {
    @apply mr-0 text-sm w-full;
}

div.inputgroup input[type=email] {
    @apply flex-grow py-3 px-6 border rounded-sm border-gray-300;
}
div.inputgroup input[type=date] {
    @apply flex-grow py-3 px-6 border rounded-sm border-gray-300;
}



div.inputgroup input[type=email]:required {
    box-shadow: none;
}
div.inputgroup input[type=date]:required {
    box-shadow: none;
}

div.inputgroup input.error {
    @apply border-red-500 bg-red-100;
}
</style>
