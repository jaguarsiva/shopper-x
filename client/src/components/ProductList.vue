<template>
    <div>
        <Filterbar />
        <h1>PRODUCTS</h1>
        <div id="card" v-for="(product,index) in products" :key="index">
           <router-link :to="'/product/'+product.Product_id">
           <img :src="product.Image_url" :alt="product.Brand" />
           <h3> {{product.Brand}} {{product.Model}}</h3>
           <h3> Rs.{{product.Price}} /-</h3>
           </router-link>
           <p><button v-if="product.Stock" @click="addtocart(index)">Add to Cart</button></p>
        </div>    
    </div>

</template>

<script>
import Filterbar from "../components/FilterBar";
import Service from '../services/Service'

export default
{
    name : 'ProductList',
    components : 
    {
        Filterbar
    },
    computed:{
        products()
        {
            return this.$store.state.products
        }
    },
    methods:
    {
        async getProducts ()
        {
            const response = await Service.getproducts()
            this.$store.commit('setProducts',response.data)
        },
        async addtocart(i)
        {
            const response1 = await Service.checkuser()
            if(response1.data)
            {
                const response2 = await Service.setCartItems({'id' : this.products[i].Product_id })
                if(response2.data)
                {
                    window.alert("Added to cart!")
                    this.products[i].Stock--
                }
                else
                    window.alert("Server Error! Add Again")
            }
            else
            {
                window.alert("Please Login to Continue!..")
                this.$router.push('/login')
            }     
        }
    },
    created()
    {
        this.getProducts()
    }
}
</script>

<style scoped>

*
{
  text-align: center;
  font-family: 'Trebuchet MS';
  text-transform: uppercase;
  font-weight: bold;
}

#card
{
  float: left;
  box-shadow: 0 4px 8px 0 black;
  height: 480px;
  width: 320px;
  margin: 25px 25px 50px 25px;
}

#card:hover{
    background-color:#42b983;
}

button {
  border: none;
  outline: 0;
  padding: 12px;
  color: white;
  background-color: #000;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
}

button:hover {
  opacity: 0.7;
}

img
{
    height: 50%;
    margin:10px;
}

a
{
    color: black;
    font-size: 25px;
    text-decoration: none;
}

</style>