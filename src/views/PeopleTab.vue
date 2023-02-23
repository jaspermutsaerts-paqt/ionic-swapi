<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>People</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div v-if="isReady">
        <ion-list :key="person.url" v-for="person in people">
          <ion-list-item @click="() => router.push(`/person/${encodeURIComponent(person.url)}`)">
            <ion-item>
              <ion-avatar slot="start">
                <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg"/>
              </ion-avatar>
              <ion-label>{{ person.name }}</ion-label>
            </ion-item>
          </ion-list-item>
        </ion-list>
      </div>
      <div v-else>
        <ion-list>
          <ion-item>
            <ion-avatar slot="start">
              <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg"/>
            </ion-avatar>
            <ion-skeleton-text animated style="width: 65%"></ion-skeleton-text>
          </ion-item>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useRouter} from "vue-router";
import {usePeople} from "@/composables/usePeople";
import {Person} from "@/types/Person";

export default defineComponent({
  name: 'PeoplePage',

  data() {
    return {
      people: [] as Person[],
      isReady: false,
    }
  },

  setup() {
    const router = useRouter();
    return {router};
  },

  mounted() {
    const {getPeople} = usePeople();
    getPeople().then((result) => {
      this.people = result.results
      this.isReady = true
    })
  },


})
</script>
