import { createStore } from 'vuex';
import { Participant } from '../types';

export default createStore({
    state: {
        content: '',
        user: {
            id: 0,
            screenName: '',
            role: '',
        },
        context: '',
        meetingUUID: '',
        participants: [],
    },
    getters: {},
    mutations: {
        setContext(state, context) {
            state.context = context;
        },
        setContent(state, content) {
            state.content = content;
        },
        setUser(state, user) {
            state.user = user;
        },
        setMeetingUUID(state, uuid) {
            state.meetingUUID = uuid;
        },
        setParticipants(state, participants){
            state.participants = participants.participants;
        }
    },
    actions: {},
    modules: {},
});
