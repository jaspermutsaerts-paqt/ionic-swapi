<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="person" href="/people">
          <ion-icon :icon="person"/>
          <ion-label>People</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="planets" href="/planets">
          <ion-icon :icon="planet"/>
          <ion-label>Planets</ion-label>
        </ion-tab-button>

      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet} from '@ionic/vue';
import {person, planet} from 'ionicons/icons';
</script>
