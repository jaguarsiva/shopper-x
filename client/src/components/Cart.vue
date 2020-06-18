
<template>
    <div>

        <div id="nav">
          <router-link to="/customer">HOME</router-link> |
          <router-link to="/cart">MY CART</router-link> |
          <router-link to="/myorders">MY ORDERS</router-link> |
          <router-link to="/customerprofile">PROFILE</router-link>
        </div>
        
        <div id="total">
            <h1>YOUR CART ITEMS</h1>
            <h2>TOTAL PRODUCTS : {{cartitems.length}}</h2>
            <h2>TOTAL PRICE INR : {{cartvalue}} /-</h2>
            <router-link v-if="cartitems.length>0" class="check" to="/checkout">checkout</router-link> 
        </div>

        <div id="card" v-for="(cart,i) in cartitems" :key="i">
                <img :src="products[i].Image_url" :alt="products[i].Brand" height="200" width="220"/>
                <p> {{products[i].Brand}} {{products[i].Model}}</p>
                <p> Price Rs {{products[i].Price}} /-</p>
                <p> Quantity {{cart.Quantity}}</p>
                <p v-if="cart.Quantity>1">Total Price {{cart.Quantity*products[i].Price}}</p>
                <button id="rm" class="btn" @click="RemoveFromCart(cart.Product_id,cart.Quantity)" >REMOVE FROM CART</button>
        </div> 
    </div>
</template>

<script>
import Service from '../services/Service'

export default 
{
    name:"Cart",
    data(){
        return{
            cartitems:[],
            products:[],
            cartvalue:0
        }
    },
    methods:
    {
        async fetchCartItems()
        {
            const response = await Service.getCartItems()
            this.cartitems = response.data
            if(!this.cartitems.length)
                window.alert("Cart is empty")
            else
                this.fetchCartItemsDetails()
        },
        async fetchCartItemsDetails()
        {
            const response = await Service.getCartItemsDetails({"items":this.cartitems})
            this.products = response.data
            let sum = 0
            for (const row of Object.keys(this.cartitems))
                sum=sum+this.cartitems[row].Quantity*this.products[row].Price
            this.cartvalue = sum
        },
        async RemoveFromCart(id,q)
        {
            const response = await Service.RemoveItemFromCart({'id' : id , "qty":q})
            if(response.data)
                this.fetchCartItems();        
        }
    },
    created()
    {
        this.fetchCartItems()
    }
}
</script>

<style lang="scss" scoped>
#total a {
  background-color: #42b983;
  color: white;
  border:2px groove black;
  border-radius:12px;
  text-transform: uppercase;
  font-size:20px;
  font-family: "Trebuchet MS";
  padding: 15px 20px;
  text-decoration: none;
  display: inline-block;
}

#totall a:hover{
  background-color: #42a183;
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
.btn
{
  border: 2px solid black;
  background-color: #42b983;
  color: black;
  padding: 14px 28px;
  font-size: 16px;
  cursor: pointer;
  color: black;

}

.btn:hover {
  background: rgb(255,128,44);
  color: white;
}

#card
{
    margin: 100px 30px 100px 30px;
    background-color: rgb(153, 255, 204);
    width:20%;
    border: 3px groove black;
    border-radius: 8px;
    float: left;
}

#rm
{
    margin: 20px;
}
</style>