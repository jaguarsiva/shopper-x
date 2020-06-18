<template>
  <div>
    <div id="nav">
          <router-link to="/customer">HOME</router-link> |
          <router-link to="/cart">MY CART</router-link> |
          <router-link to="/myorders">MY ORDERS</router-link> |
          <router-link to="/customerprofile">PROFILE</router-link>
        </div>
      <h1>My Orders</h1>
      
      <div id="order" v-for="(order,i) in orderitems" :key="i">
                <router-link :to="'/order/'+order.Order_id">
                 Order Id : {{order.Order_id}}
                </router-link>
      </div>
  </div>
</template>

<script>
import Service from '../services/Service'

export default {
  name:'Myorders',
  data()
    {
        return{
            orderitems:[]
        }
    },
  methods:
  {
    async fetchOrderItems()
        {
            const response = await Service.getOrderid()
            this.orderitems = response.data
            if(!this.orderitems.length)
                window.alert("You haven't ordered yet!...");
        }
  },
  created()
  {
        this.fetchOrderItems()
  }
}
</script>

<style lang="scss" scoped>
#order a{
  background-color: #42b983;
  color: white;
  border:2px groove black;
  border-radius:12px;
  text-transform: uppercase;
  font-size:20px;
  font-family: "Trebuchet MS";
  padding: 20px 25px;
  text-decoration: none;
  display: inline-block;
  margin-top:30px ;
}
#order a:hover{
  background-color: #66ffc2;
  color:black;
}
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
#card
{
    margin: 100px 600px 100px 600px;
    background-color: rgb(153, 255, 204);
    width:20%;
    border: 3px solid black;
}
</style>