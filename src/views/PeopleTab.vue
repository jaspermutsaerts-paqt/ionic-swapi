<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>People</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-list :key="person" v-for="person in people" >
        <ion-list-item>
          <ion-item>
            <ion-avatar slot="start">
              <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg"/>
            </ion-avatar>
            <ion-label>{{ person.name }}</ion-label>
          </ion-item>

        </ion-list-item>
      </ion-list>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {defineComponent, watch} from 'vue';
import {Person, usePeople} from "@/composables/usePeople";

export default defineComponent({
  name: 'PeoplePage',

  data() {
    return {people: []}
  },

  mounted() {
    const {getPeople} = usePeople();
    getPeople().then((result) => {
      this.people = result.results
      console.log(result.results)
    })
  },


})
</script>
