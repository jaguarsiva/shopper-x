<template>
    <div>
        <h1>ORDER ID : {{id}}</h1>
        <div id="prt" v-for="(order,i) in orderitems" :key="i">
            <p class="count">{{i+1}}</p> 
            <img :src="products[i].Image_url" :alt="products[i].Brand" height="230"/>
            <p>{{products[i].Brand}} {{products[i].Model}}</p>
            <p>Price Rs {{products[i].Price}} /-</p>
            <p>Quantity {{order.Quantity}}</p>
            <p v-if="order.Quantity>1">Total Price {{order.Quantity*products[i].Price}} /-</p>
        </div>

        <div>
            <h1 id="hr">DELIVERY DETAILS</h1>
            <table>
                <tr><td> CUSTOMER ID</td><td> {{customer.Customer_id}}</td></tr>
                <tr><td> ACCOUNT USER NAME</td><td> {{customer.User_name}}</td></tr>
                <tr><td> NAME</td><td>{{delivery.toName}} </td></tr>
                <tr><td> EMAIL</td><td> {{delivery.toEmail}} </td></tr>
                <tr><td> ADDRESS LINE 1</td><td> {{delivery.toLine1}} </td></tr>
                <tr><td> ADDRESS LINE 2</td><td> {{delivery.toLine2}} </td></tr>
                <tr><td> PHONE NUMBER</td><td> {{delivery.toNumber}} </td></tr>
            </table>
        </div>
    </div>
</template>

<style lang="scss" scoped>
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
    margin-top: -70px;
    margin-left: 100px;
    float: left;
}
p{
    text-transform: uppercase;
    font-weight: bold;
    font-family: "Trebuchet MS";
}

table
{
    margin-left: 100px;
    margin-top: -32px;
    margin-bottom: 50px;
    font-family: "Trebuchet MS";
    border-collapse: collapse;
    width: 80%;
}
table td
{
    padding: 8px;
    border: 3px solid #ddd;
}

table tr:nth-child(even){background-color: #f2f2f2;}

table tr:hover {background-color: #ddd;}

#hr {
  font-family: "Trebuchet MS";
  width: 79%;
  margin-left: 100px;
  padding: 8px;
  background-color: #42b983;
  color: white;
}
</style>

<script>
import Service from '../services/Service'
export default {
    name:'MerchantOrder',
    data(){
        return{
            orderitems:[],
            products:[],
            customer:{},
            delivery:{},
            id:""
        }
    },
    methods:{
        async fetchOrderItems(ID)
        {
            this.id=ID
            const response = await Service.getMerchantOrderItems({"id":ID})
            this.orderitems = response.data
            this.fetchEachProductDetails()
            this.fetchOrderCustomerDetails(ID)
        },
        async fetchEachProductDetails()
        {
            const response = await Service.getCartItemsDetails({"items":this.orderitems})
            this.products = response.data
        },
        async fetchOrderCustomerDetails(ID)
        {
            const response = await Service.getOrdersCustomerDetails({"id":ID})
            this.customer = response.data[0]
            this.delivery = response.data[1]
        }
    },
    created()
    {
        const ID = Number(this.$route.params.id);
        this.fetchOrderItems(ID)
    } 
}
</script>