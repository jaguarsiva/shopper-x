
import Api from './Api'

export default{
  signup (credentials) {
    return Api().post('/signup', credentials)
  },
  login (credentials) {
    return Api().post('/login', credentials)
  },
  sellerlogin (credentials) {
    return Api().post('/sellerlogin', credentials)
  },
  sellersignup (credentials) {
    return Api().post('/sellersignup', credentials)
  },
  checkuser () {
    return Api().get('/checkuser')
  },
  logout () {
    return Api().get('/logout')
  },
  //PRODUCTS
  //GET ALL PRODUCTS
  getproducts () {
    return Api().get('/getproducts')
  },
  //GET THE SPECS OF A PRODUCT BY ID
  getproductspecs (credentials) {
    return Api().post('/getproductspecs', credentials)
  },
  addproduct (credentials) {
    return Api().post('/addproduct', credentials)
  },
  RemoveProduct(credentials){
    return Api().post('/removeproduct', credentials)
  },
  UpdateProduct(credentials){
    return Api().post('/updateproduct', credentials)
  },
  //CART
  setCartItems (credentials) {
    return Api().post('/setcartitems', credentials)
  },
  getCartItems () {
    return Api().get('/getcartitems')
  },
  getCartItemsDetails (credentials) {
    return Api().post('/getcartitemsdetails',credentials)
  },
  RemoveItemFromCart (credentials) {
    return Api().post('/removeitemfromcart', credentials)
  },
  Checkout (credentials) {
    return Api().post('/Checkout', credentials)
  },
  //ORDER
  getOrderItems (credentials) {
    return Api().post('/getorderitems',credentials)
  },
  getMerchantOrderItems (credentials) {
    return Api().post('/getmerchantorderitems',credentials)
  },
  getOrdersCustomerDetails (credentials) {
    return Api().post('/getorderscustomerdetails',credentials)
  },
  getOrderid () {
    return Api().get('/getorderid')
  },
  getMerchantOrders () {
    return Api().get('/getmerchantorders')
  },
  getmerchantproducts(){
    return Api().get('/getproductsbymerchant')
  },
  //MERCHANT PROFILE
  GetMerchantDetails(){
    return Api().get('/getmerchantdetails')
  },
  UpdateMerchantDetails(credentials){
    return Api().post('/updatemerchantdetails', credentials)
  },
  UpdateMerchantPassword(credentials){
    return Api().post('/updatemerchantpassword', credentials)
  },
  //CUSTOMER PROFILE
  GetCustomerDetails(){
    return Api().get('/getcustomerdetails')
  },
  UpdateCustomerDetails(credentials){
    return Api().post('/updatecustomerdetails', credentials)
  },
  UpdateCustomerPassword(credentials){
    return Api().post('/updatecustomerpassword', credentials)
  },
  Search(credentials){
    return Api().post('/search', credentials)
  }
}