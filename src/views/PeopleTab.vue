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
                <ion-infinite-scroll position="top" @ionInfinite="onInfiniteScroll">
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
import { usePeople } from '@/composables/usePeople'
import { Person } from '@/types/Person'
import {
    IonAvatar,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonSkeletonText,
    IonTitle,
    IonToolbar,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    InfiniteScrollCustomEvent,
} from '@ionic/vue'
import { defineComponent } from 'vue'

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
        const { getPeople } = usePeople()
        getPeople().then((result) => {
            this.people = result.results
            this.isReady = true
            this.next = result.next
        })
    },

    methods: {
        onInfiniteScroll: function (event: InfiniteScrollCustomEvent) {
            this.isReady = false

            if (this.next === null) {
                event.target.complete()
                return
            }

            const { getPeople } = usePeople()

            getPeople(this.next).then((result) => {
                this.people = this.people.concat(result.results)
                this.isReady = true
                this.next = result.next
                console.log('new result', this.people.length, 'next:' + this.next)
                event.target.complete()
            })
        },
    },
})
</script>
