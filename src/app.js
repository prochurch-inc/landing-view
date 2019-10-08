import Vue from 'vue'
import LandingPreview from './components/landing'

export default {
    install(Vue, options) {
        Vue.component('landing-preview', LandingPreview)
    }
}