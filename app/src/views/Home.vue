<template>
    <div v-if='isInClient'>
        <h1>Start a meeting to use this app</h1>
    </div>
    <template v-else>
        <div>
            <button @click="loadParticipants">Get Participants</button>
            <button @click="listParticipants">List Participants</button>
            
            <h2>Participants Done</h2>
            <h2>Current Participant</h2>
            <h2>Next Participant</h2>
            <h2>Remaining Participants</h2>
            <li v-for="participant in participantsFromStore">
                {{ participant.screenName}}
            </li>
        </div>
    </template>
</template>

<script setup lang='ts'>
import Editor from '@/components/Editor';
import { useStore } from 'vuex';
import { computed, inject, ref } from 'vue';
import { ZoomSDK, Participant } from '../types';
import testData from '@/Testing/mockParticipants';

const mock = true;

const zoomSdk = inject('zoomSdk') as ZoomSDK;
const store = useStore();

const content = computed(() => store.state.content);
const isInClient = computed(() => store.state.context === 'isMainClient');
const participantsFromStore = computed(() => store.state.participants);

zoomSdk.addEventListener("onMessage", (eventInfo) => { console.log("received:", eventInfo) })
zoomSdk.addEventListener("")
async function loadParticipants(){
    let meetingParticipants = await zoomSdk.getMeetingParticipants();
    //console.log("Participants stored again");
    console.log(meetingParticipants);
    store.commit('setParticipants', meetingParticipants);
}

async function listParticipants(){
    console.log(participantsFromStore);
    console.log(JSON.stringify(participantsFromStore.toString()));
}

(async () => {
    const conf = await zoomSdk.config({
        capabilities: [
            'connect',
            'getMeetingUUID',
            'getRunningContext',
            'getUserContext',
            'getMeetingParticipants',
            'onConnect',
            'onMeeting',
            'onMessage',
            'onParticipantChange',
            'postMessage',
        ],
    });
    console.debug('Configuration', conf);

    const participants = ref()

    store.commit('setContext', conf.runningContext);

    if (isInClient) {
        await zoomSdk.connect();
        const user = await zoomSdk.getUserContext();
        store.commit('setUser', user);
        // let meetingParticipants = await zoomSdk.getMeetingParticipants();
        // console.log("Participants in meeting: ");
        // store.commit('setParticipants', meetingParticipants)
        // console.log(meetingParticipants);

        const { meetingUUID } = await zoomSdk.getMeetingUUID();
        store.commit('setMeetingUUID', meetingUUID);
    }
})();
</script>
