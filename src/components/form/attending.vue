<template>
    <div>
        <h2 class="text-2xl mb-6 text-center">{{inputs[0].title}}</h2>
        <p class="text-gray-400 text-sm mb-6">{{inputs[1].title}}</p>
        <div class="options flex justify-between items-center mb-6">
            <input class="hidden" type="radio" id="attending-1" value="1" name="attending" v-model="numberAttendingModel">
            <label for="attending-1">
                <span>1</span>
            </label>
            <input class="hidden" type="radio" id="attending-2" value="2" name="attending" v-model="numberAttendingModel">
            <label for="attending-2">
                <span>2</span>
            </label>
            <input class="hidden" type="radio" id="attending-3" value="3" name="attending" v-model="numberAttendingModel">
            <label for="attending-3">
                <span>3</span>
            </label>
            <input class="hidden" type="radio" id="attending-4" value="4" name="attending" v-model="numberAttendingModel">
            <label for="attending-4">
                <span>4</span>
            </label>
            <input class="hidden" type="radio" id="attending-5" value="5" name="attending" v-model="numberAttendingModel">
            <label for="attending-5">
                <span>5</span>
            </label>
            <input class="hidden" type="radio" id="attending-6" value="6" name="attending" v-model="numberAttendingModel">
            <label for="attending-6">
                <span>6</span>
            </label>
            <input class="hidden" type="radio" id="attending-7" value="7+" name="attending" v-model="numberAttendingModel">
            <label for="attending-7">
                <span>7+</span>
            </label>
        </div>
        <span class="text-xs text-red-500 mt-1 font-heading" v-if="showValidationError">This information is required</span>
    </div>
</template>

<script>
    import { mapState, mapMutations, mapGetters } from 'vuex';

    export default {
        computed: {
            numberAttendingModel: {
                get() {
                    return this.numberAttending
                },
                set(value) {
                    this.setNumberAttending(value)
                }
            },
            inputs() {
                return this.getNumberInputs()
            },
            ...mapState('storeLanding/storeForm', [
                'numberAttending', 'showErrors'
            ]),
            ...mapGetters('storeLanding/storeForm',[
                'validateField'
            ]),
            ...mapGetters('storeManageForm',[
                'isRequiredField'
            ]),
            showValidationError() {
                return this.showErrors && this.isRequiredField('Number') && ! this.validateField('Number')
            },
        },
        methods: {
            ...mapMutations('storeLanding/storeForm',[
                'setNumberAttending', 'nextStep'
            ]),
            ...mapGetters('storeManageForm', [
                'getNumberInputs',
            ]),
            // done(){
            //     this.nextStep()
            // }
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
