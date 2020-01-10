<template>
    <div>
        <h2 class="text-2xl mb-6 text-center">{{inputs[0].title}}</h2>
       <div class="flex justify-between items-center">
           <div class="inputgroup">
               <label for="first_name">{{inputs[1].title}}</label>
               <input type="text" id="first_name" v-model="firstNameModel" style="display:block;">
           </div>
           <div class="inputgroup">
               <label for="last_name">{{inputs[2].title}}</label>
               <br>
               <input type="text" id="last_name" v-model="lastNameModel" style="display:block;">
           </div>
       </div>
        <span class="text-xs text-red-500 mt-1 font-heading" v-if="showValidationError">This information is required</span>
    </div>
</template>

<script>
    import { mapState, mapMutations, mapGetters } from 'vuex';

    export default {

        computed: {
            firstNameModel: {
                get() {
                    return this.firstName
                },
                set(value) {
                    this.setFirstName(value)
                }
            },
            lastNameModel: {
                get() {
                    return this.lastName
                },
                set(value) {
                    this.setLastName(value)
                }
            },
            inputs() {
                return this.getNameInputs()
            },
            ...mapState('storeLanding/storeForm', [
                'firstName',
                'lastName',
                'showErrors'
            ]),
            ...mapGetters('storeLanding/storeForm',[
                'validateField'
            ]),
            ...mapGetters('storeManageForm',[
                'isRequiredField'
            ]),
            showValidationError() {
                return this.showErrors && this.isRequiredField('Name') && ! this.validateField('Name')
            },
        },
        mounted(){
            document.getElementById('first_name').focus();
        },
        methods: {
            ...mapMutations('storeLanding/storeForm',[
                'setFirstName', 'setLastName', 'nextStep'
            ]),
            ...mapGetters('storeManageForm', [
                'getNameInputs'
            ]),
            // done(){
            //     if(this.firstNameModel && this.lastNameModel){
            //         this.nextStep()
            //     }
            // }
        }
    }
</script>

<style scoped>
div.inputgroup {
    @apply block justify-between items-center font-heading;
}
div.inputgroup label {
    @apply mr-6 text-sm w-32 text-gray-400;
}
div.inputgroup.check label {
    @apply mr-0 text-sm w-full;
}

div.inputgroup input[type=text] {
    @apply flex-grow py-3 px-6 border rounded-sm border-gray-300;
}
div.inputgroup input[type=date] {
    @apply flex-grow py-3 px-6 border rounded-sm border-gray-300;
}



div.inputgroup input[type=text]:required {
    box-shadow: none;
}
div.inputgroup input[type=date]:required {
    box-shadow: none;
}

div.inputgroup input.error {
    @apply border-red-500 bg-red-100;
}
</style>
