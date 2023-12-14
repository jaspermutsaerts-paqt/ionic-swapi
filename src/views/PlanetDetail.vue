<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>{{ planet.name }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-card>
                <img v-if="image" alt="Picture of {{planet.name}}" :src="image" />
                <ion-card-header>
                    <ion-card-title>{{ planet.name }}</ion-card-title>
                    <ion-card-subtitle
                        >Population:
                        {{
                            isNaN(planet.population) ? planet.population : Number(planet.population).toLocaleString()
                        }}</ion-card-subtitle
                    >
                    <ion-card-subtitle>Diameter: {{ Number(planet.diameter).toLocaleString() }} km</ion-card-subtitle>
                </ion-card-header>
            </ion-card>
        </ion-content>
    </ion-page>
</template>

<script>
import {
    IonBackButton,
    IonButtons,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/vue'
import { useRoute } from 'vue-router'
import { useSwapi } from '@/composables/useSwapi'
import { useImageApi } from '@/composables/useImageApi'

export default {
    components: {
        IonPage,
        IonButtons,
        IonBackButton,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle,
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
    },
    name: 'PlanetDetail',

    data() {
        return {
            planet: [],
            image: null,
        }
    },

    setup() {
        const route = useRoute()
        const url = decodeURIComponent(route.params.url)
        const { getPlanet } = useSwapi()
        const { getPlanetImage } = useImageApi()

        return {
            url,
            getPlanet,
            getPlanetImage,
        }
    },

    mounted() {
        this.getPlanet(this.url).then((planet) => {
            this.planet = planet

            return this.getPlanetImage(planet).then((image) => {
                this.image = image
            })
        })
    },
}
</script>
