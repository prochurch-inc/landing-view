<template>
    <div>
        <h2 class="text-2xl mb-6 text-center">{{inputs[0].title}}</h2>
        <div class="inputgroup block">
           <textarea name="notes" class="form-textarea block w-full rounded-sm" rows="5" id="notes" v-model="notesModel"></textarea>
           <span class="text-xs text-red-500 mt-1 font-heading" v-if="showValidationError">This information is required</span>
        </div>
    </div>
</template>
<script>
    import { mapState, mapMutations, mapGetters } from 'vuex';

    export default {

        mounted() {
            document.getElementById('notes').focus();
        },

        computed: {
            notesModel: {
                get() {
                    return this.notes
                },
                set(value) {
                    this.setNotes(value)
                }
            },
            inputs() {
                return this.getNotesInputs()
            },
            ...mapState('storeLanding/storeForm', [
                'notes',
            ]),
            ...mapGetters('storeManageForm',[
                'isRequiredField'
            ]),
            ...mapGetters('storeLanding/storeForm',[
                'validateField'
            ]),
            showValidationError() {
                return this.showErrors && this.isRequiredField('Notes') && ! this.validateField('Notes')
            },
        },

        methods: {
            ...mapMutations('storeLanding/storeForm',[
                'setNotes', 'nextStep'
            ]),
            ...mapGetters('storeManageForm', [
                'getNotesInputs'
            ]),
        }
    }
</script>
