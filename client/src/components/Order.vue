<template>
    <div>
        <div id="nav">
          <router-link to="/customer">HOME</router-link> |
          <router-link to="/cart">MY CART</router-link> |
          <router-link to="/myorders">MY ORDERS</router-link> |
          <router-link to="/customerprofile">PROFILE</router-link>
        </div>

        <h1>ORDER ID : {{id}}</h1>
        <div id="prt" v-for="(order,i) in orderitems" :key="i">
            <p class="count">{{i+1}}</p> 
            <img :src="products[i].Image_url" :alt="products[i].Brand" height="250" width="250"/>
            <p>{{products[i].Brand}} {{products[i].Model}}</p>
            <p>Price Rs {{products[i].Price}} /-</p>
            <p>Quantity {{order.Quantity}}</p>
            <p v-if="order.Quantity>1">Total Price {{order.Quantity*products[i].Price}} /-</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
#nav {
  padding: 30px;
  a {
    text-decoration: none;
    font-weight: bold;
    font-size: 20px;
    color: #2c3e50;
    padding: 30px;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
#prt{
    background-color: #66ffc2;
    border:3px solid black;
    border-radius: 12px;
    height: 250px;
    width:70%;
    margin: 50px 220px;
    text-transform: uppercase;
}
.count
{
    float: left;
    margin-left: 20px;
}
img{
    clear: both;
    margin-top: -80px;
    margin-left: 50px;
    float: left;
}
p{
    text-transform: uppercase;
    font-weight: bold;
    font-family: "Trebuchet MS";
}
</style>

<script>
import Service from '../services/Service'
export default {
    name:'Order',
    data(){
        return{
            orderitems:[],
            products:[],
            id:""
        }
    },
    methods:{
        async fetchOrderItems(ID)
        {
            this.id=ID
            const response = await Service.getOrderItems({"id":ID})
            this.orderitems = response.data
            this.fetchEachProductDetails()
        },
        async fetchEachProductDetails()
        {
            const response = await Service.getCartItemsDetails({"items":this.orderitems})
            this.products = response.data
        }
    },
    created()
    {
        const ID = Number(this.$route.params.id);
        this.fetchOrderItems(ID)
    } 
}
</script>