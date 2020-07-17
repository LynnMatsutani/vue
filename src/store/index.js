import Vue from 'vue'
import Vuex from 'vuex'
import gasApi from '../api/gasApi'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isEnable: false,
    alertMessage: '',
    status: 'success',
    companyList: []
  },
  mutations: {
    saveCompanyList(state, companyList) {
      state.companyList = companyList
    },
    setAlertMessage(state, message, status = null) {
      state.alertMessage = message
      if (status) {
        state.status = status
      }
    },
    setEnable(state) {
      state.isEnable = true
    },
    setDisable(state) {
      state.isEnable = false
    },
    setMessage(state, message) {
      state.alertMessage = message
    }
  },
  actions: {
    async getCompany({commit}) {
      try {
        const res = await gasApi.get();
        let list = [];
        for (let i = 0; i < res.data.data.length; i++) {
          list[i] = {
            text: res.data.data[i],
            value: res.data.data[i]
          };
        }
        commit('setAlertMessage', res.data.message, 'success')
        commit('saveCompanyList', list)
      } catch(e) {
        commit('setAlertMessage', {message: e}, 'error')
      }
    },
    async storeLog({commit}, params) {
      console.log(params)
      try {
        const res = await gasApi.post(params);
        console.log(res.data.message)
        commit('setAlertMessage', res.data.message, 'success')
      } catch(e) {
        commit('setAlertMessage', {message: e}, 'error')
      }
    },
    async storeCompany({commit}, params) {
      try {
        await gasApi.post(params);
      } catch(e) {
        commit('setErrorMessage', {message: e}, 'error')
      }
    },
    clearForm({commit}) {
      commit('clearForm')
    },
    saveCompanyList({commit}, companyList) {
      commit('saveCompanyList', companyList)
    },
    snackOn({commit}) {
      commit('setEnable')
    },
    snackOff({commit}) {
      commit('setDisable')
    },
  },
  getters: {
    getCompanyList(state) {
      return state.companyList
    },
    status: state => {
      return state.isEnable
    },
    message: state => {
      return state.alertMessage
    }
  },
})
