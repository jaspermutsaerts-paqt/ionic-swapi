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
          <ion-item @click="() => router.push(`/planet/${encodeURIComponent(planet.url)}`)">
            <ion-avatar slot="start">
              <ion-icon :icon="planetIcon" size="large"></ion-icon>
            </ion-avatar>
            <ion-label>{{ planet.name }}</ion-label>
          </ion-item>
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
import {defineComponent} from "vue";
import {useRouter} from "vue-router";
import {usePlanets} from "@/composables/usePlanets";
import {Planet} from "@/types/Planet";
import {planet as planetIcon} from "ionicons/icons";
import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSkeletonText,
  IonTitle,
  IonToolbar
} from "@ionic/vue";


export default defineComponent({
  components: {
    IonAvatar,
    IonPage,
    IonIcon,
    IonLabel,
    IonList,
    IonItem,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonSkeletonText,
  },
  name: 'PlanetsPage',

  data() {
    return {
      planets: [] as Planet[],
      isReady: false,
    }
  },

  setup() {
    const router = useRouter();
    return {router, planetIcon};
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
