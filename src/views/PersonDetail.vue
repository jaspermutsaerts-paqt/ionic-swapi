<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>{{ person.name }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content align="center">
            <ion-card>
                <div v-if="image">
                    <img alt="Picture of {{person.name}}" :src="image" />
                </div>
                <ion-card-header>
                    <ion-card-title>{{ person.name }}</ion-card-title>
                    <ion-card-subtitle>Birth year: {{ person.birth_year }}</ion-card-subtitle>
                </ion-card-header>
                <ion-card-content v-if="person.homeworld">
                    <ion-button :router-link="`/planets/${encodeURIComponent(person.homeworld)}`">
                        Visit home planet
                    </ion-button>
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>

<script>
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
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
        IonButton,
        IonButtons,
        IonBackButton,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle,
        IonCardContent,
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
    },

    name: 'PersonDetail',

    data() {
        return {
            person: [],
            image: null,
        }
    },

    setup() {
        const route = useRoute()
        const url = decodeURIComponent(route.params.url)
        const { getPerson } = useSwapi()
        const { getPersonImage } = useImageApi()

        return {
            url,
            getPerson,
            getPersonImage,
        }
    },

    mounted() {
        this.getPerson(this.url).then((person) => {
            this.person = person

            return this.getPersonImage(person).then((image) => {
                this.image = image
            })
        })
    },
}
</script>
