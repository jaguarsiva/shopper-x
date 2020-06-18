import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store
({
  state:
  {
    products: [],
    iscustomer: '',
    ismerchant: ''
  },
  mutations:
  {
    setProducts(state,products)
    {
      state.products = products
    },
    setCustomer(state,logged)
    {
      state.iscustomer = logged
    },
    setMerchant(state,logged)
    {
      state.ismerchant = logged
    }
  }
})
