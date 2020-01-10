<template>
    <div>
        <div @click="hideform" class="absolute w-full h-screen z-20"></div>
        <div class="max-w-xl mx-auto w-full z-30" >
            <h1 class="text-white text-center font-bold text-4xl mb-6">{{ settingsTitle }}</h1>
            <div class="box w-full p-8 bg-white" v-for="(item, index) in getActiveSections" :key="index" v-if="step == index">
                <transition name="slide-fade" appear>
                <form-attending v-if="item.name == 'Number' && item.use"></form-attending>
                </transition>
                 <transition name="slide-fade" appear>
                <form-name  v-if="item.name == 'Name' && item.use"></form-name>
                 </transition>
                 <transition name="slide-fade" appear>
                <form-email v-if="item.name == 'Email' && item.use"></form-email>
                </transition>
                 <transition name="slide-fade" appear>
                <form-phone v-if="item.name == 'Phone' && item.use"></form-phone>
                </transition>
                 <transition name="slide-fade" appear>
                <form-service v-if="item.name == 'Times' && item.use"></form-service>
                </transition>
                 <transition name="slide-fade" appear>
                <form-notes v-if="item.name == 'Notes' && item.use" ></form-notes>
                </transition>
            </div>
            <div class="form-navigation flex items-center w-full p-6 text-white mb-6" :class="[step > 0 ? 'justify-between' : 'justify-end']" :style="{background: styleMainColor}">
                <button class="text-xl inline-flex items-center hover:text-gray-200" @click="_previousStep" v-if="step > 0"><i class='uil uil-arrow-left text-2xl mr-1'></i> {{ settingsPrevious }}</button>
                <button class="text-xl inline-flex items-center hover:text-gray-200" @click="_nextStep" v-if="step < (formNumber - 1)">         {{ settingsNext }} <i class='uil uil-arrow-right text-2xl ml-1'></i>
                </button>
                <button class="text-xl inline-flex items-center font-bold hover:text-gray-200" @click="done" v-if="step == (formNumber - 1)">Finish</button>
            </div>
            <div class="text-center w-full flex flex-col items-center justify-center p-12">
                <div class="step-wrapper w-full bg-gray-500 h-2 rounded mb-4">
                    <div class="step-progress h-2 rounded" :style="{background: styleMainColor, width:stepPercent + '%'}"></div>
                </div>
                <p :style="{color: styleMainColor}">{{settingsStep}} {{step + 1}} of {{formNumber}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import formAttending from './form/attending.vue';
    import formName from './form/name.vue';
    import formEmail from './form/email.vue';
    import formPhone from './form/phone.vue';
    import formService from './form/service.vue';
    import formNotes from './form/notes.vue';
    import TWEEN from '@tweenjs/tween.js';
    import _ from 'lodash';
    import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';

    export default {
        components: {
            formAttending,
            formName,
            formEmail,
            formPhone,
            formService,
            formNotes
        },
        computed: {
            isOpenModel: {
                get() {
                    return this.isOpen
                },
                set(value) {
                    this.setIsOpen(value)
                }
            },
            stepModel: {
                get() {
                    return this.step
                },
                set(value) {
                    this.setStep(value)
                }
            },
            ...mapGetters('storeManageForm', [
                'getActiveSections', 'getCurrentSectionIndex'
            ]),
            ...mapGetters('storeLanding/storeForm', [
                'validateField'
            ]),
            ...mapState('storeManageForm', [
                'requiredFields', 'sections'
            ]),
            ...mapState('storeManageForm/storeSettings',{
                settingsTitle: 'title',
                settingsNext: 'next',
                settingsPrevious: 'previous',
                settingsStep: 'step',
            }),
            ...mapState('storeLanding/storeStyles',{
                styleMainColor: 'mainColor'
            }),
            ...mapState('storeLanding/storeForm',[
                'step', 'isOpen', 'numberAttending', 'firstName', 'lastName', 'emailAddress', 'phone', 'service', 'notes'
            ]),
            ...mapState('storeLanding',[
                'preview', 'preview'
            ]),
            ...mapState('storeThankYou',[
                'showThankYou',
            ]),
            formNumber(){
                return this.getActiveSections.length
            },
            stepPercent(){
                return ((this.step + 1)/this.formNumber)*100
            },
            currentFormStepName() {
                return this.getActiveSections[this.stepModel].name
            }
        },
        watch: {
            getCurrentSectionIndex() {
                let activeSection = this.sections[this.getCurrentSectionIndex]
                let index = this.getActiveSections.indexOf(activeSection)

                if (index == -1) {
                    index = this.stepModel
                }

                if(this.getCurrentSectionIndex == -1) {
                    index = 0
                }

                this.stepModel = index
            }
        },
        methods: {
            ...mapActions({
                submitLandingForm: 'storeLanding/storeForm/submitLandingForm'
            }),
            ...mapMutations('storeLanding/storeForm', [
                'nextStep', 'previousStep', 'setIsOpen', 'setStep', 'setShowErrors'
            ]),
            ...mapMutations('storeThankYou', [
                'setShowThankYou'
            ]),
            hideform(){
                this.isOpenModel = false
            },
            done(){
                if(! this.validateForm()) {
                    this.setShowErrors(true)
                    swal('Form Error', 'Please correct the form errors and try again.', 'error')
                    return
                }

                if(this.preview) {
                    swal("Note", "You are in preview mode, form can not be submitted.", "info")
                    return;
                }

                this.submitLandingForm().then(response => {
                    // Show thankyou modal
                    this.hideform()
                    this.setShowThankYou(true)
                }).catch(error => {
                    swal({
                        title: "There was an error...",
                        icon: "error",
                        text: error.response.data.message,
                    })
                })
            },
            _nextStep(){
                if((this.step + 1) < this.formNumber){
                    this.nextStep()
                }
            },
            _previousStep(){
                this.previousStep()
            },

            validateForm() {
                return this.getActiveSections
                    .filter(section => this.requiredFields.includes(section.name))
                    .every(section => {
                        return !! this.validateField(section.name)
                    })
            },
        }
    }
</script>

<style scoped>
.step-progress {
    transition: width 2s ease;
}
.slide-fade-enter-active {
  transition: all 2s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  /* transform: translateX(-50px); */
  opacity: 0;
}

</style>
