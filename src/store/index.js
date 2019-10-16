import Vue from 'vue'
import Vuex from 'vuex'
import db from '../firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    entries: []
  },
  getters: {
    filteredResults: (state) => (term) => {
      return state.entries.filter(entry => ~entry.title.toLowerCase().indexOf(term.toLowerCase()))
    }
  },
  mutations: {
    setEntries (state, payload) {
      state.entries = payload.entries
    }
  },
  actions: {
    fetchEntries (context) {
      db.ref('entries').on('value', snap => {
        context.commit('setEntries', { entries: snap.val() })
      })
    },
    deleteEntry (context, payload) {
      let cloneEntries = context.state.entries.slice()
      cloneEntries.splice(payload.index, 1)
      return new Promise((resolve, reject) => {
        db.ref('entries').set(
          cloneEntries,
          error => {
            if (error) {
              console.error(error)
              reject(error)
            } else {
              context.commit('setEntries', { entries: cloneEntries })
              resolve()
            }
          }
        )
      })
    },
    addEntry (context, payload) {
      let cloneEntries = context.state.entries.slice()
      cloneEntries.push(payload.entry)
      return new Promise((resolve, reject) => {
        db.ref('entries').set(
          cloneEntries,
          error => {
            if (error) {
              console.error(error)
              reject(error)
            } else {
              context.commit('setEntries', { entries: cloneEntries })
              resolve()
            }
          }
        )
      })
    }
  }
})
