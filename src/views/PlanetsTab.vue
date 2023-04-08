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
                    <ion-item :router-link="`/planets/${encodeURIComponent(planet.url)}`">
                        <ion-avatar slot="start">
                            <ion-icon :icon="planetIcon" size="large"></ion-icon>
                        </ion-avatar>
                        <ion-label>{{ planet.name }}</ion-label>
                    </ion-item>
                </ion-list>
                <ion-infinite-scroll position="bottom" @ionInfinite="onInfiniteScroll">
                    <ion-infinite-scroll-content></ion-infinite-scroll-content>
                </ion-infinite-scroll>
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
import { useSwapi } from '@/composables/useSwapi'
import { Planet } from '@/types/Planet'
import { planet as planetIcon } from 'ionicons/icons'
import {
    InfiniteScrollCustomEvent,
    IonAvatar,
    IonContent,
    IonHeader,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonItem,
    IonIcon,
    IonLabel,
    IonList,
    IonPage,
    IonSkeletonText,
    IonTitle,
    IonToolbar,
} from '@ionic/vue'
import { defineComponent } from 'vue'
import { Page } from '@/types/Page'

export default defineComponent({
    components: {
        IonAvatar,
        IonIcon,
        IonLabel,
        IonItem,
        IonList,
        IonSkeletonText,
        IonContent,
        IonHeader,
        IonPage,
        IonTitle,
        IonToolbar,
        IonInfiniteScroll,
        IonInfiniteScrollContent,
    },

    name: 'PlanetsPage',

    data() {
        return {
            planets: [] as Planet[],
            next: null as string | null,
            isReady: false,
        }
    },

    setup() {
        return { planetIcon }
    },

    mounted() {
        const { getPlanetsPage } = useSwapi()
        getPlanetsPage().then(this.onRetrievedPage)
    },

    methods: {
        onRetrievedPage: function (page: Page<Planet>) {
            this.planets = this.planets.concat(page.items)
            this.isReady = true
            this.next = page.next
        },
        onInfiniteScroll: function (event: InfiniteScrollCustomEvent) {
            if (this.next === null) {
                event.target.complete()
                return
            }

            const { getPlanetsPage } = useSwapi()

            getPlanetsPage(this.next).then((page) => {
                this.onRetrievedPage(page)
                event.target.complete()
            })
        },
    },
})
</script>
