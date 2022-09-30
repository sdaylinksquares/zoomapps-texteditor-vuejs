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
        currentParticipant: {},
        nextParticipant: {},
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
    actions: {
        randomizeParticipants({commit, state}){
            commit('setParticipants', shuffle(state.participants));
        }
    },
    modules: {},
});

function shuffle(array:string[]) {
    var m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
  }
