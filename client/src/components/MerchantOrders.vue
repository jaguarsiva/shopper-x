<template>
    <div>
        <h1>MERCHANT ORDERS</h1>
        <div id="order" v-for="(order,i) in orderitems" :key="i">
                <router-link :to="'/merchantorder/'+order.Order_id">
                 Order Id : {{order.Order_id}}
                </router-link>
      </div>
    </div>
</template>

<script>
import Service from '../services/Service'

export default {
    name:'MerchantOrders',
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
            const response = await Service.getMerchantOrders()
            this.orderitems = response.data
            if(!this.orderitems.length)
                window.alert("You have no orders to deliver!...");
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
</style>