<template>
    <div>
        
        <div id="nav">
          <router-link to="/merchant">HOME</router-link> |
          <router-link to="/addproduct">ADD</router-link> |
          <router-link to="/updateproduct">UPDATE</router-link> | 
          <router-link to="/removeproduct">REMOVE</router-link>|
          <router-link to="/merchantprofile">PROFILE</router-link>
        </div>

        <h1 id="add">REMOVE PRODUCT</h1>
        <div id="card" v-for="(item,i) in items" :key="i">
            <img :src="item.Image_url" :alt="item.Brand" height="150" weight="200" />
            <p> {{item.Brand}} {{item.Model}} </p>
          <button id="rm" class="btn" @click="RemoveProduct(item.Product_id)">REMOVE</button>         
      </div> 
     
    </div>
</template>>

<script>
import Service from '../services/Service'

export default {
    name:'RemoveProduct',
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
        },
        async RemoveProduct(id)
        {
            const response = await Service.RemoveProduct({'id' : id})
            if(response.data)
                this.getProducts();        
        }
    },
    created()
    {
        this.getProducts()
    }
}
</script>

<style lang="scss" scoped>
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

#rm
{
    margin: 20px;
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
  border: 3px solid black;
  width: 20%;
  margin: 30px;
  float: left;
}
</style>