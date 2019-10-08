<template>
    <ul class="countdown list-none mb-16">
        <li v-if="days > 0"  class="mr-4" :class="'rounding-' + rounding" :style="{borderColor:color}">
            <p class="digit text-white">{{ days | twoDigits }}</p>
            <p class="text" :style="{color:color}">{{ days > 1 ? 'days' : 'day' }}</p>
        </li>
        <li class="mr-4" :class="'rounding-' + rounding" :style="{borderColor:color}">
            <p class="digit text-white">{{ hours | twoDigits }}</p>
            <p class="text" :style="{color:color}">{{ hours > 1 ? 'hours' : 'hour' }}</p>
        </li>
        <li class="mr-4" :class="'rounding-' + rounding" :style="{borderColor:color}">
            <p class="digit text-white">{{ minutes | twoDigits }}</p>
            <p class="text" :style="{color:color}">min</p>
        </li>
        <li :class="'rounding-' + rounding"  :style="{borderColor:color}">
            <p class="digit text-white">{{ seconds | twoDigits }}</p>
            <p class="text" :style="{color:color}">Sec</p>
        </li>
    </ul>
</template>

<script>
let interval = null;
export default {
    name: 'vuejsCountDown',
    props: {
        color: String,
        countdowntitle: String,
        rounding: String,
        type: String,
        deadline: String,
        day: String,
        endingtime: String,
        end: String,
        stop: Boolean
    },
    data() {
        return {
            now: moment().unix(),
            diff: 0
        }
    },
    mounted() {
        this.initInterval()
    },
    computed: {
        seconds() {
            return moment.duration(this.diff, 'seconds').seconds() || 0
        },

        minutes() {
            return moment.duration(this.diff, 'seconds').minutes() || 0
        },

        hours() {
            return moment.duration(this.diff, 'seconds').hours() || 0
        },

        days() {
            return moment.duration(this.diff, 'seconds').days() || 0
        },
        computedDate() {
            let date = moment()

            // Get the next occorance of the specified date
            if (this.type == 'single') {
                if (! this.deadline) {
                    return;
                }

                date = moment(this.deadline);
            }
            else if (this.type == 'evergreen') {
                if (! this.day || ! this.endingtime) {
                    return null;
                }

                let time = moment(this.endingtime);
                date = moment().isoWeekday(this.day);

                date.set({
                   'hour': time.get('hour'),
                   'minute': time.get('minute'),
                   'second': 0,
                   'millisecond': 0,
                });

                // if the date is from the current week
                // move the date to the next week
                if (date.isBefore()) {
                    date.add(1, 'weeks')
                }
            }

            return date.unix();
        }
    },
    watch: {
        computedDate() {
            this.initInterval()
        },
        now(value) {
            this.diff = this.computedDate - this.now;
            if(this.diff <= 0 || this.stop){
                this.diff = 0;
                // Remove interval
                clearInterval(interval);
            } else {
                this.initInterval()
            }
        }
    },
    filters: {
        twoDigits(value) {
            if ( value.toString().length <= 1 ) {
                return '0'+value.toString()
            }
            return value.toString()
        }
    },
    destroyed() {
        clearInterval(interval);
    },
    methods: {
        initInterval() {
            interval = setInterval(() => {
                this.now = moment().unix();
            }, 1000);
        }
    }
}
</script>
