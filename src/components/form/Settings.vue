<template>
    <div class="settings">
        <h2 class="mb-4 cursor-pointer text-gray-400 inline-flex items-center" @click="isOpenModel = !isOpenModel"><i class="uil text-xl" :class="[ isOpenModel ? 'uil-angle-down' : 'uil-angle-right']"></i> Form Settings<i class="uil uil-cog"></i></h2>
        <div class="mb-4 border border-dotted border-gray-400 border-dashed p-4 mb-6" v-if="isOpenModel">
            <form action="" @submit.prevent="_saveSettings">
                <div class="flex mb-4">
                    <div class="w-full">
                        <label for="" class="text-gray-400 text-sm mb-0">Title</label>
                        <input type="text" class="form-input block" placeholder="Title" v-model="titleModel">
                    </div>
                </div>
                <div class="flex mb-4 ">
                    <div class="w-32 mr-2 block">
                        <label for="" class="text-gray-400 text-sm mb-0">Previous</label>
                        <input type="text" class="form-input block w-32" placeholder="Previous" v-model="previousModel">
                    </div>
                    <div class="w-32 block">
                        <label for="" class="text-gray-400 text-sm mb-0">Next</label>
                        <input type="text" class="form-input block w-32" placeholder="Next" v-model="nextModel">
                    </div>
                </div>
                <div class="flex mb-4">
                    <div class="w-1/2">
                        <label for="" class="text-gray-400 text-sm mb-0">Step</label>
                        <input type="text" class="form-input block" placeholder="Step" v-model="stepModel">
                    </div>
                </div>
                <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                    :class="{'opacity-50 cursor-not-allowed': processing}"
                >{{ processing ? 'Processing...' : 'Save Settings' }}</button>
            </form>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
export default {
    name: 'LandingFormSettings',

    data() {
        return {
            processing: false,
        }
    },

    computed: {
        isOpenModel: {
            get() { return this.isOpen },
            set(value){ return this.setIsOpen(value) }
        },
        titleModel: {
            get() { return this.title },
            set(value){ return this.setTitle(value) }
        },
        previousModel: {
            get() { return this.previous },
            set(value){ return this.setPrevious(value) }
        },
        nextModel: {
            get() { return this.next },
            set(value){ return this.setNext(value) }
        },
        stepModel: {
            get() { return this.step },
            set(value){ return this.setStep(value) }
        },
        ...mapState('storeManageForm/storeSettings', [
            'title', 'previous', 'next', 'step', 'isOpen'
        ])
    },
    methods: {
        ...mapMutations({
            setTitle: 'storeManageForm/storeSettings/setTitle',
            setPrevious: 'storeManageForm/storeSettings/setPrevious',
            setNext: 'storeManageForm/storeSettings/setNext',
            setStep: 'storeManageForm/storeSettings/setStep',
            setData: 'storeManageForm/storeSettings/setData',
            setIsOpen: 'storeManageForm/storeSettings/setIsOpen',
        }),
        ...mapActions({
            saveSettings: 'storeManageForm/storeSettings/saveSettings'
        }),
        _saveSettings() {
            this.processing = true
            this.saveSettings().then(response => {
                console.log(response)
                this.setData(response.data.settings)
                this.processing = false
                 window.showToast('👍 successfully saved.')
            }).catch(error => {
                this.processing = false
                console.log(error)
                window.showToast("✋ That didn't work! <br>Please check and try again.", 'danger');
            })
        }
    }
}
</script>