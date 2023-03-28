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
    <ion-content :fullscreen="true">
      <ion-card>
        <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg"/>
        <ion-card-header>
          <ion-card-title>{{ person.name }}</ion-card-title>
          <ion-card-subtitle>Birth year: {{ person.birth_year }}</ion-card-subtitle>
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
  IonToolbar
} from '@ionic/vue';
import {useRoute} from 'vue-router';
import {usePeople} from '@/composables/usePeople';

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
    IonToolbar
  },

  name: "PersonDetail",

  data() {
    return {person: []}
  },

  setup() {
    const route = useRoute();
    const url = decodeURIComponent(route.params.url)
    return {url};
  },

  mounted() {
    const {getPerson} = usePeople();
    getPerson(this.url).then((person) => this.person = person)
  },
}
</script>

<style scoped>

</style>
