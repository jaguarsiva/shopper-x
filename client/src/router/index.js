import Vue from 'vue'
import VueRouter from 'vue-router'

import ProductList from "../components/ProductList";
import Product from "../components/Product";
import Cart from '../components/Cart'
import Myorders from '../components/Myorders'
import AddProduct from '../components/AddProduct'
import UpdateProduct from '../components/UpdateProduct'
import RemoveProduct from '../components/RemoveProduct'
import ProductValuesUpdate from '../components/ProductValuesUpdate'
import CustomerProfile from '../components/CustomerProfile'
import MerchantProfile from '../components/MerchantProfile'
import Order from '../components/Order'
import MerchantOrders from '../components/MerchantOrders'
import MerchantOrder from '../components/MerchantOrder'

import Login from '../views/Login'
import Signup from '../views/Signup'
import Checkout from '../views/Checkout'
import SellerLogin from '../views/SellerLogin'
import SellerSignup from '../views/SellerSignup'
import Merchant from '../views/Merchant'
import Customer from '../views/Customer'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {
      name: "productlist"
    }
  },
  {
    path: '/productlist',
    name: 'productlist',
    component: ProductList
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/sellerlogin',
    name: 'SellerLogin',
    component: SellerLogin
  },
  {
    path: '/sellersignup',
    name: 'SellerSignup',
    component: SellerSignup
  },
  {
    path: '/merchant',
    name: 'Merchant',
    component: Merchant
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: Product
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout
  },
  {
    path: '/myorders',
    name: 'Myorders',
    component: Myorders
  },
  {
    path: '/addproduct',
    name: 'AddProduct',
    component: AddProduct
  },
  {
    path: '/updateproduct',
    name: 'UpdateProduct',
    component: UpdateProduct
  },
  {
    path: '/removeproduct',
    name: 'RemoveProduct',
    component: RemoveProduct
  },
  {
    path: '/updateproductvalues/:id',
    name: 'ProductValuesUpdate',
    component: ProductValuesUpdate
  },
  {
    path: '/customer',
    name: 'Customer',
    component: Customer
  },
  {
    path: '/customerprofile',
    name: 'CustomerProfile',
    component: CustomerProfile
  },
  {
    path: '/order/:id',
    name: 'Order',
    component: Order
  },
  {
    path: '/merchantorder/:id',
    name: 'MerchantOrder',
    component: MerchantOrder
  },
  {
    path: '/merchantprofile',
    name: 'MerchantProfile',
    component: MerchantProfile
  },
  {
    path: '/merchantorders',
    name: 'MerchantOrders',
    component: MerchantOrders
  }
]

const router = new VueRouter({
  routes
})

export default router
