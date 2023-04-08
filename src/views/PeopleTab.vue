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
                    <ion-item :router-link="`/people/${encodeURIComponent(person.url)}`">
                        <ion-avatar slot="start">
                            <img
                                alt="Silhouette of a person's head"
                                src="https://ionicframework.com/docs/img/demos/avatar.svg"
                            />
                        </ion-avatar>
                        <ion-label>{{ person.name }}</ion-label>
                    </ion-item>
                </ion-list>
                <ion-infinite-scroll position="bottom" @ionInfinite="onInfiniteScroll">
                    <ion-infinite-scroll-content></ion-infinite-scroll-content>
                </ion-infinite-scroll>
            </div>
            <div v-else>
                <ion-list>
                    <ion-item>
                        <ion-avatar slot="start">
                            <img
                                alt="Silhouette of a person's head"
                                src="https://ionicframework.com/docs/img/demos/avatar.svg"
                            />
                        </ion-avatar>
                        <ion-skeleton-text animated style="width: 65%"></ion-skeleton-text>
                    </ion-item>
                </ion-list>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { useSwapi } from '@/composables/useSwapi'
import { Person } from '@/types/Person'
import {
    InfiniteScrollCustomEvent,
    IonAvatar,
    IonContent,
    IonHeader,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonItem,
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

    name: 'PeoplePage',

    data() {
        return {
            people: [] as Person[],
            next: null as string | null,
            isReady: false,
        }
    },

    mounted() {
        const { getPeoplePage } = useSwapi()
        getPeoplePage().then(this.onRetrievedPage)
    },

    methods: {
        onRetrievedPage: function (page: Page<Person>) {
            this.people = this.people.concat(page.items)
            this.isReady = true
            this.next = page.next
        },
        onInfiniteScroll: function (event: InfiniteScrollCustomEvent) {
            if (this.next === null) {
                event.target.complete()
                return
            }

            const { getPeoplePage } = useSwapi()

            getPeoplePage(this.next).then((page) => {
                this.onRetrievedPage(page)
                event.target.complete()
            })
        },
    },
})
</script>
