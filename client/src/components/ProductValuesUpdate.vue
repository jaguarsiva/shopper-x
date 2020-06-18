<template>
    <div>

        <div id="nav">
          <router-link to="/merchant">HOME</router-link> |
          <router-link to="/addproduct">ADD</router-link> |
          <router-link to="/updateproduct">UPDATE</router-link> | 
          <router-link to="/removeproduct">REMOVE</router-link>|
          <router-link to="/merchantprofile">PROFILE</router-link>
        </div>
      
        <div id="input">
          <form @submit="UpdateProduct">
          <label>ID</label>
          <input type="number" v-model="details.Product_id" style="background-color:#c2c2d6;" readonly/>
          <br><br>
          <label>PRICE</label>
          <input type="number" v-model="details.Price"/>
          <br /><br>
          <label>STOCK</label>
          <input type="number" v-model="details.Stock"/>
          <br /><br>
          <label>IMAGE </label>
          <input type="text" v-model="details.Image_url"/>
          <br /><br>
          <input type="submit" value="UPDATE" />
          </form>
        </div>
      
        <div id="output" >
          <div id="o1">
            <img :src="details.Image_url" :alt="details.brand" height="200px"/>
          </div>
          <div id="o2">
            <h3>ID : {{ details.Product_id}}</h3>
            <h3>TITLE : {{ details.Brand}} {{ details.Model}}</h3>
            <h3>PRICE : {{ details.Price}}</h3>
            <h3>STOCK : {{ details.Stock}}</h3>
          </div>
        </div>    
    </div>
</template>

<script>
import Service from '../services/Service'

export default {
    name:'ProductValuesUpdate',
    data(){
        return{
          details:[]
        }
    },
    methods:
    {
        async fetchProduct(ID)
        {
            const response = await Service.getproductspecs({ id:ID })
            this.details = response.data[1]
        },
        async UpdateProduct()
        {
            const response = await Service.UpdateProduct
            ({
                  "id" : this.details.Product_id,
                  "price" : this.details.Price,
                  "stock" : this.details.Stock,
                  "image" : this.details.Image_url
            })
            if(response.data)
              window.alert("Updated Sucessfully!..")
            else
              window.alert("Update Error! Try Agian!..")
        }
    },
    created()
    {
      const ID = Number(this.$route.params.id);
      this.fetchProduct(ID);
    }
}
</script>
<style lang="scss" scoped>
#o1
{
float: right;
margin-right: 50px;
margin-top: 50px;
}
#o2
{
margin-left: 20px;
float: left;
}
#input
{
    margin-top: 20px;
    margin-left: 20px;
    float: left;    width: 48%;
    height: 460px;
}
#output
{
    margin-right: 30px;
    margin-top: 40px;
    float: right;
    border: 3px solid black;
    width: 48%;
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
label
{
 float: left;
 margin-top: 38px;
 margin-left: 150px;
}

input[type="text"],input[type="number"] 
{
  margin-top: 25px;
  float: right;
  margin-right: 200px;
  width: 30%;
  padding: 12px;
  border: 2px solid #339933;

}

input[type="submit"]:hover {
  background-color: white;
}

input[type="submit"]
{
  margin-top: 25px;
  width: 20%;
  float: right;
  margin-right: 250px;
  color: black;
  font-weight: bold;
  font-size: 25px;
  padding: 12px;
  border: 2px solid #339933;
  background-color: rgb(0, 204, 102);
}
</style>