<template>
    <div>
        <h2 class="text-2xl mb-6 text-center">{{inputs[0].title}}</h2>
        <div class="flex items-center justify-between my-6">
            <div class="flex items-center justify-between">
                <input type="number" id="1" v-model="number1" @keyup="nextInput(2)" class="border p-2 h-10 w-10 text-center text-xl mr-2" min="0" max="9">
                <input type="number" id="2" v-model="number2" @keyup="nextInput(3)" class="border p-2 h-10 w-10 text-center text-xl mr-2" min="0" max="9">
                <input type="number" id="3" v-model="number3" @keyup="nextInput(4)" class="border p-2 h-10 w-10 text-center text-xl" min="0" max="9">
            </div>
            <span>-</span>
            <div class="flex items-center justify-between">
                <input type="number" id="4" v-model="number4" @keyup="nextInput(5)" class="border p-2 h-10 w-10 text-center text-xl mr-2" min="0" max="9">
                <input type="number" id="5" v-model="number5" @keyup="nextInput(6)" class="border p-2 h-10 w-10 text-center text-xl mr-2" min="0" max="9">
                <input type="number" id="6" v-model="number6" @keyup="nextInput(7)" class="border p-2 h-10 w-10 text-center text-xl" min="0" max="9">
            </div>
            <span>-</span>
            <div class="flex items-center justify-between">
                <input type="number" id="7" v-model="number7" @keyup="nextInput(8)" class="border p-2 h-10 w-10 text-center text-xl mr-2" min="0" max="9">
                <input type="number" id="8" v-model="number8" @keyup="nextInput(9)" class="border p-2 h-10 w-10 text-center text-xl mr-2" min="0" max="9">
                <input type="number" id="9" v-model="number9" @keyup="nextInput(10)" class="border p-2 h-10 w-10 text-center text-xl mr-2" min="0" max="9">
                <input type="number" id="10" v-model="number10" @keyup="_setPhone" class="border p-2 h-10 w-10 text-center text-xl" min="0" max="9">
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapMutations, mapGetters } from 'vuex';

    export default {
        data(){
            return {
                number1: this.phoneModel != null ? this.phoneModel.substr(1, 1) : null,
                number2: this.phoneModel != null ? this.phoneModel.substr(2, 1) : null,
                number3: this.phoneModel != null ? this.phoneModel.substr(3, 1) : null,
                number4: this.phoneModel != null ? this.phoneModel.substr(6, 1) : null,
                number5: this.phoneModel != null ? this.phoneModel.substr(7, 1) : null,
                number6: this.phoneModel != null ? this.phoneModel.substr(8, 1) : null,
                number7: this.phoneModel != null ? this.phoneModel.substr(12, 1) : null,
                number8: this.phoneModel != null ? this.phoneModel.substr(13, 1) : null,
                number9: this.phoneModel != null ? this.phoneModel.substr(14, 1) : null,
                number10: this.phoneModel != null ? this.phoneModel.substr(15, 1) : null,
            }
        },
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
                'phone',
            ]),
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
                'getPhoneInputs',
            ]),
            nextInput(num){
                var inputN = document.getElementById(num);
                inputN.focus();
            },
            _setPhone(){
                if(this.number1 && this.number2 && this.number3 && this.number4 && this.number5 && this.number6 && this.number7 && this.number8 && this.number9 && this.number10){
                    this.phoneModel = `(${this.number1}${this.number2}${this.number3}) ${this.number4}${this.number5}${this.number6} - ${this.number7}${this.number8}${this.number9}${this.number10}`;

                    //this.nextStep()
                }
            }
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
