<template>
    <div>
        <skeleton-container>
            <div slot="builder">
                <h1 class="text-3xl font-thin tracking-wide mt-6 mb-8 font-heading">Sign Up Form</h1>
                    <Settings />
                    <draggable v-model="sectionsModel" handle=".handle" tag="div">
                        <div class="w-full bg-white rounded mb-6 mr-6" v-for="(section, index) in sectionsModel">
                            <form-title-bar class="cursor-pointer"
                                :open="section.open" :title="section.title" @toggle="_toggleSection(index)" :change-status="section.change_status">
                                <div class="form-switch inline-block align-middle" v-if="section.removable">
                                    <input type="checkbox" :name="`use_form_${section.name}`" :id="`use_form_${section.name}`"
                                        class="form-switch-checkbox" :checked="section.use" @change="updateSectionUse({index: index, value: $event.target.checked})" />
                                    <label class="form-switch-label" :for="`use_form_${section.name}`" id="use_highlights_label"></label>
                                </div>
                            </form-title-bar>
                            <div class="contentSection p-8 border-t-4 border-gray-100" v-show="section.open">
                                <input type="text" :key="inputIndex" class="form-input block mb-4 w-full" v-for="(input, inputIndex) in section.inputs"
                                    :value="input.title" @input="_updateSectionInputTitle({sectionIndex: index, inputIndex, value: $event.target.value})">
                            </div>
                        </div>
                    </draggable>
                    <div class="buttons text-center mt-12">
                        <button type="button"  @click.prevent="_saveSignUpForm"
                            class="bg-blue-500 block w-full py-5 px-12 my-4 text-white rounded uppercase hover:bg-blue-700 focus:outline-none">
                            Continue to Next Step
                        </button>
                    </div>
            </div>
            <div slot="preview">
                <landing-preview ></landing-preview>
            </div>
        </skeleton-container>
    </div>
</template>
<script>
    import skeletonContainer from '../Skeleton.vue';
    import axios from 'axios';
    import FormTitleBar from './formTitleBar.vue';
    import draggable from 'vuedraggable';
    import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
    import Settings from './Settings'


    export default {
        props: ['campaignProp', 'teamProp'],

        //mixins: [defaultLandingPageData],

        components: {
            FormTitleBar,
            draggable,
            skeletonContainer,
            Settings
        },

        created() {
            this.setCampaignLandingData(this.campaignProp.landing);
            this.setCampaignCampaign(this.campaignProp);
            this.setCampaignLandingId(this.campaignProp.landing.id);
            this.setCampaignTeam(this.teamProp);

            this.setManageFormData(this.campaignProp.landing.form)
            this.setSignupFormSettingsData(this.campaignProp.landing.form_settings)

            this.setStylesData(this.campaignProp.landing.style)
            this.setHeaderData(this.campaignProp.landing.header)
            this.setTextData(this.campaignProp.landing.text)

            this.setFeatureData(this.campaignProp.landing.highlights)
            if (this.campaignProp.landing.highlights != null) {
                this.setShowHighlights(this.campaignProp.landing.show_highlights)
            }

            this.setTestimonialsData(this.campaignProp.landing.testimonials)
            if (this.campaignProp.landing.testimonials != null) {
                this.setShowTestimonials(this.campaignProp.landing.show_testimonials)
            }

            this.setGalleryData(this.campaignProp.landing.gallery)
            if (this.campaignProp.landing.gallery != null) {
                this.setShowGallery(this.campaignProp.landing.show_gallery)
            }

            this.setCtaData(this.campaignProp.landing.cta)
            if (this.campaignProp.landing.cta != null) {
                this.setShowCta(this.campaignProp.landing.show_cta)
            }

            this.setMapData(this.campaignProp.landing.map)
            if (this.campaignProp.landing.map != null) {
                this.setShowMap(this.campaignProp.landing.show_map)
            }

            this.setThankYouData(this.campaignProp.landing.thankyou)

            this.setFormIsOpen(true)
        },

        computed: {
            sectionsModel: {
                get() {
                    return this.sections
                },
                set(value) {
                    return this.setSections(value)
                }
            },
            landingIdModel: {
                get() {
                    return this.landingId
                },
                set(value) {
                    return this.setLandingId(value)
                }
            },
            ...mapState('storeLanding', [
                'campaign',
                'team',
                'landingData',
                'uploadCarePublic'
            ]),
            ...mapState('storeManageForm', [
                'sections',
                'landingId'
            ]),
            ...mapGetters('storeManageForm', [
                'getActiveSections', 'getCurrentSectionIndex',
            ]),
            ...mapState('storeLanding/storeForm', [
                'step',
            ]),
        },
        watch: {
            step() {
                let section = this.getActiveSections[this.step];
                let sectionIndex = this.sectionsModel.indexOf(section);
                this.toggleSection(sectionIndex);
            }
        },
        methods: {
            ...mapActions({
                saveSignUpForm: 'storeManageForm/saveSignUpForm'
            }),
            ...mapMutations({
                setCampaignLandingData: 'storeLanding/setLandingData',
                setCampaignCampaign: 'storeLanding/setCampaign',
                setCampaignLandingId: 'storeLanding/setLandingId',
                setCampaignLocations: 'storeLanding/setLocations',
                setCampaignTeam: 'storeLanding/setTeam',

                setStylesData: 'storeLanding/storeStyles/setData',
                setHeaderData: 'storeLanding/storeHeader/setData',
                setTextData: 'storeLanding/storeText/setData',

                setFeatureData: 'storeLanding/storeFeatures/setData',
                setShowHighlights: 'storeLanding/storeFeatures/setShowHighlights',

                setTestimonialsData: 'storeLanding/storeTestimonials/setData',
                setShowTestimonials: 'storeLanding/storeTestimonials/setShowTestimonials',

                setGalleryData: 'storeLanding/storeGallery/setData',
                setShowGallery: 'storeLanding/storeGallery/setShowGallery',

                setCtaData: 'storeLanding/storeCta/setData',
                setShowCta: 'storeLanding/storeCta/setShowCta',

                setMapData: 'storeLanding/storeMap/setData',
                setShowMap: 'storeLanding/storeMap/setShowMap',

                setThankYouData: 'storeThankYou/setData',

                setFormIsOpen: 'storeLanding/storeForm/setIsOpen',

                setManageFormData: 'storeManageForm/setData',
                setSections: 'storeManageForm/setSections',
                toggleSection: 'storeManageForm/toggleSection',
                updateSectionUse: 'storeManageForm/updateSectionUse',
                updateSectionInputTitle: 'storeManageForm/updateSectionInputTitle',

                setSignupFormSettingsData: 'storeManageForm/storeSettings/setData',
            }),
            _saveSignUpForm() {
                this.saveSignUpForm().then(response => {
                    this.setManageFormData(response.data.landingForm)
                    window.location.href = `/campaigns/${this.campaign.id}/thank-you-page`;
                    // window.showToast('👍 successfully saved.')
                }).catch(error => {
                    console.log(error)
                    window.showToast("✋ That didn't work! <br>Please check and try again.", 'danger');
                })
            },

            _toggleSection(index) {
                this.toggleSection(index)
            },

            _updateSectionInputTitle({sectionIndex, inputIndex, value}) {
                this.updateSectionInputTitle({sectionIndex, inputIndex, value})
            }

        }
    }

</script>
