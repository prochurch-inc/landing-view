<template>
    <section class="map" id="map" v-if="mapShowMap">
        <iframe width="100%" height="450" frameborder="0" style="border:0" :src="'https://www.google.com/maps/embed/v1/search?q=' + searchString + '&key=' + apiKey + '&zoom=' + mapZoomLevel" allowfullscreen></iframe>

        <!-- <a href="https://www.google.com/maps/place/Bible+Baptist+Church+Mattoon+IL/"><img :src="'https://maps.googleapis.com/maps/api/staticmap?autoscale=10&size=640x250&maptype=roadmap&key=AIzaSyCMA3IQw1slMs9NU9OjjzvSrCt8Rok5BLw&format=png&visual_refresh=true&markers=size:mid%7Ccolor:0x1be90e%7Clabel:1%7C' + page.address" alt="Google Map of Bible Baptist Church Mattoon IL" ></a> -->
    </section>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        data() {
            return {
                apiKey: 'AIzaSyCTJResaJYhiMvyM2fPyPPxsEGj5HLGtZU'
            }
        },
        computed: {
            searchString() {
                if (this.mapUseAlternate && this.mapAlternateAddress) {
                    return this.mapAlternateAddress.replace(" ", "%20");
                } else {
                    return this.landingString.replace(" ", "%20");
                }
            },

            landingString() {
                let location = this.locations.find(location => {
                    return location.id == this.mapLocationId;
                });

                if (! location) {
                    return 'United States';
                }

                return `${location.streetAddress}, ${location.addressLocality}, ${location.addressRegion} ${location.postalCode}, ${location.addressCountry}`;
            },
            ...mapState("storeLanding",['locations']),
            ...mapState("storeLanding/storeMap",{
                mapIsOpen: 'isOpen',
                mapChangeStatus: 'changeStatus',
                mapShowMap: 'showMap',
                mapLocationId: 'locationId',
                mapUseAlternate: 'useAlternate',
                mapAlternateAddress: 'alternateAddress',
                mapZoomLevel: 'zoomLevel',
            }),
        },
    }

</script>

<style lang="scss">
section.map {
    a {
        width: 100%;
        height: 436px;
    img {
        width: 100%;
        height: 436px;
        object-fit: cover;
    }
    }
}

</style>
