<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Planets</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div v-if="isReady">
        <ion-list :key="planet.url" v-for="planet in planets">
          <ion-list-item @click="() => router.push(`/planet/${encodeURIComponent(planet.url)}`)">
            <ion-item>
              <ion-icon :icon="planet"/>
              <ion-label>{{ planet.name }}</ion-label>
            </ion-item>
          </ion-list-item>
        </ion-list>
      </div>
      <div v-else>
        <ion-list>
          <ion-item>
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
import {usePlanets} from "@/composables/usePlanets";
import {planet} from "ionicons/icons";

export default defineComponent({
  name: 'PlanetsPage',

  data() {
    return {
      planets: [],
      isReady: false,
    }
  },

  setup() {
    const router = useRouter();
    return {router};
  },

  mounted() {
    const {getPlanets} = usePlanets();
    getPlanets().then((result) => {
      this.planets = result.results
      this.isReady = true
    })
  },


})
</script>
