import Vue from 'vue'
import Vuex from 'vuex'
import mountainAPI from '../apis/mountainAPI'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    mountains: [],
    mytrips: [],
    alltrip: [],
    getDate: null,
    chats: []
  },
  mutations: {
    SET_ISLOGIN: function (state, status) {
      state.isLogin = status
    },
    SET_MOUNTAINS: function(state, payload){
      state.mountains = payload
    },
    SET_MYTRIP: function(state, payload){
      state.mytrips = payload
    },
    SET_ALLTRIP: function(state, payload){
      state.alltrip = payload
    },
    PUSH_MESSAGE: function(state, payload){
      state.chats.push(payload)
    }
  },
  actions: {
    googleLogin: function(context, idToken){
      try {
        return mountainAPI.post('/oauth', { idToken })
      } catch (err) {
        this.$toasted.show(err).goAway(2000)
      }
    },
    getMountains: function({commit}){
      mountainAPI.get('/mountains', { 
        headers: {
          access_token: localStorage.getItem('access_token')
        }
       })
       .then(response => {
        commit('SET_MOUNTAINS', response.data)
       })
       .catch(err => {
        this.$toasted.error(err.response.data, {theme: "bubble",position: "top-center",fullWidth: true}).goAway(2000);
       })
    },
    createTrip: function(context, payload){
      return mountainAPI.post('/addtrip', payload, {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    getMyTrip: function({commit}){
      mountainAPI.get('/mytrip', {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      .then(response => {
        commit('SET_MYTRIP', response.data.Trips)
      })
      .catch(err => {
        console.log(err);
      })
    },
    getAllTrip: function({commit}){
      mountainAPI.get('/alltrip')
      .then(response => {
        commit('SET_ALLTRIP', response.data)
      })
      .catch(err => {
        console.log(err);
      })
    },
    joinTrip: function(context, payload){
      return mountainAPI.post('/jointrip', payload, {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    deleteTrip: function(context, id){
      return mountainAPI.delete(`/deleteTrip/${id}`, {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    getWeather: function(context, location){
      return mountainAPI.get('/weather', {
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        params:{
          location
        }
      })
    },

    postEquipment: function(context, payload){
      return mountainAPI.post('/equipment', payload, {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },

    getEquipmentById: function(context, id){
      return mountainAPI.get(`/equipment/${id}`, {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },

    postUserEquipment: function(context, payload){
      return mountainAPI.post('/equipmentuser', payload, {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },

    decrementEquipment: function(context, payload){
      return mountainAPI.delete('/equipmentuser', {
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        params: payload
      })
    },

    deleteEquipment: function(context, EquipmentId){
      return mountainAPI.delete('/equipment', {
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        params: {EquipmentId}
      })
    },
  }
})
