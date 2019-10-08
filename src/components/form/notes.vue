<template>
    <div>
        <h2 class="text-2xl mb-6 text-center">{{inputs[0].title}}</h2>
        <div class="inputgroup">
           <textarea name="notes" class="form-textarea w-full rounded-sm" rows="5" id="notes" v-model="notesModel"></textarea>
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
        },

        methods: {
            ...mapMutations('storeLanding/storeForm',[
                'setNotes', 'nextStep'
            ]),
            ...mapGetters('storeManageForm', [
                'getNotesInputs',
            ]),
        }
    }
</script>
