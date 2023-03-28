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
        <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg"/>
        <ion-card-header>
          <ion-card-title>{{ person.name }}</ion-card-title>
          <ion-card-subtitle>Birth year: {{ person.birth_year }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content v-if="person.homeworld">
          <ion-button @click="() => router.push(`/planets/${encodeURIComponent(person.homeworld)}`)">Visit home
            planet
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
  IonToolbar
} from '@ionic/vue';
import {useRoute, useRouter} from 'vue-router';
import {usePeople} from '@/composables/usePeople';

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
    IonToolbar
  },

  name: "PersonDetail",

  data() {
    return {person: []}
  },

  setup() {
    const route = useRoute();
    const router = useRouter();
    const url = decodeURIComponent(route.params.url)
    return {router, url};
  },

  mounted() {
    const {getPerson} = usePeople();
    getPerson(this.url).then((person) => this.person = person)
  },
}
</script>

<style scoped>

</style>
