<template>
    <div id="add">
        
        <div id="nav">
          <router-link to="/merchant">HOME</router-link> |
          <router-link to="/addproduct">ADD</router-link> |
          <router-link to="/updateproduct">UPDATE</router-link> | 
          <router-link to="/removeproduct">REMOVE</router-link>|
          <router-link to="/merchantprofile">PROFILE</router-link>
        </div>

        <h1>UPDATE PRODUCT</h1>
        <div id="card" v-for="(item,i) in items" :key="i">
          <router-link :to="'/updateproductvalues/'+item.Product_id">
          <img :src="item.Image_url" :alt="item.Brand" height="150" weight="200" />
          <p> {{item.Brand}} {{item.Model}} </p>
          </router-link>
        </div>
        
    </div> 
  
</template>>

<script>
import Service from '../services/Service'

export default {
    name:'UpdateProduct',
    data()
    {
        return{
            items:[]
        }
    }, 
    methods:
    {
        async getProducts ()
        {
            const response = await Service.getmerchantproducts()
            this.items = response.data;
        }
    },
    created()
    {
        this.getProducts()
    }
}
</script>

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
a{
  color: #000;
  text-decoration: none;
}
#card
{
  border: 3px solid black;
  width: 20%;
  margin: 30px;
  float: left;
}
</style>