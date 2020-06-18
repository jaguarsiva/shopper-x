<template>
    <div>
            <img :src="details.Image_url" :alt="details.Brand" />
        <div id="tag">
            <p> {{details.Brand}} {{details.Model}} </p>
            <p> Price INR {{details.Price}} /-</p>
            <p v-if="(details.Stock > 10) && !ismerchant"> In Stock!</p>
            <p v-else-if="0 < details.Stock && details.Stock < 11 && !ismerchant"> Hurry , Only {{details.Stock}} Left! ,  Order Soon! </p>
            <p v-else-if="0 === details.Stock && !ismerchant"> Sorry! Its Out of Stock !</p>
            <p v-if="ismerchant">STOCK IS {{details.Stock}}</p>
            <button v-if="details.Stock && !ismerchant" class="btn" @click="addtocart" >Add to Cart</button>
        </div>    
       
        <Specifications :category=details.Category />

        <SellerDetails :merchants="merchants"/>
         
    </div>
</template>

<style scoped>
.btn {
  float:clear-both;
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
img
{
    height: 300px;
    margin-left: -700px;
    margin-top: 50px;
}
#tag
{
    margin-top: -300px;
    margin-left: 500px;
    margin-bottom: 100px;
}

</style>

<script>
import Service from '../services/Service'
import Specifications from './Specifications'
import SellerDetails from './SellerDetails'

export default {
    name:'Product',
    components :{
        Specifications,
        SellerDetails
    },
    data(){
        return{
            details:[],
            merchants:[],
        }
    },
    computed:
    {
        ismerchant()
        {
            return this.$store.state.ismerchant
        }
    },
    methods:
    {
        async fetchProduct(ID)
        {
            const response = await Service.getproductspecs({ id:ID })
            this.details = response.data[1]
            this.merchants = response.data[2]
        },
        async addtocart()
        {
            const response1 = await Service.checkuser()
            if(response1.data)
            {
                const response2 = await Service.setCartItems({'id' : this.details.Product_id })
                if(response2.data)
                {
                    window.alert("Added to cart!")
                    this.details.Stock--
                }
                else
                    window.alert("Server Error! Add Again")
            }
            else
            {
                window.alert("Please Login to Continue!..")
                this.$router.push('/login')
            }           
        },
        async addProducttoCart(context,pid)
        {
        
        }
    },
    created()
    {
        const ID = Number(this.$route.params.id);
        this.fetchProduct(ID);
    }
}
</script>>