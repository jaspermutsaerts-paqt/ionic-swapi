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
import { getPlanet, useSwapi } from '@/composables/useSwapi'

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
        return { planet: [] }
    },

    setup() {
        const route = useRoute()
        const url = decodeURIComponent(route.params.url)
        return { url }
    },

    mounted() {
        const { getPlanet } = useSwapi()
        getPlanet(this.url).then((planet) => (this.planet = planet))
    },
}
</script>
