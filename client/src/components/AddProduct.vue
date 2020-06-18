<template>
    <div id="add">

        <div id="nav">
          <router-link to="/merchant">HOME</router-link> |
          <router-link to="/addproduct">ADD</router-link> |
          <router-link to="/updateproduct">UPDATE</router-link> | 
          <router-link to="/removeproduct">REMOVE</router-link>|
          <router-link to="/merchantprofile">PROFILE</router-link>
        </div>

        <h3>ADD A NEW PRODUCT</h3> 
        <form @submit="addproduct">
        <label>BRAND</label>
        <input type="text" v-model="brand" placeholder="BRAND NAME" required />
        <br /><br>
        <label>MODEL</label>
        <input type="text" v-model="model" placeholder="MODEL NAME" required />
        <br /><br>
        <label>PRICE IN ₹</label>
        <input type="number" v-model="price" placeholder="PRODUCT'S PRICE" required />
        <br /><br>
        <label>STOCK</label>
        <input type="number" v-model="stock" placeholder="QUANTITY AVAILABLE" required />
        <br /><br>
        <label>IMAGE URL</label>
        <input type="text" v-model="image" placeholder="PASTE YOUR IMAGE URL" required />
        <br /><br>
        <label>CATEGORY</label>
        <select v-model="category" required>
          <option disabled value="">Select A Category</option>
          <option value="smartphone">Smart Phone</option>
          <option value="watch">Watch</option>
          <option value="memorycard">Memory Card</option>
        </select>
        <br /><br>
        <div id="sm" v-if="category==='smartphone'">
          <h3>ENTER THE SPECS</h3>
        <label>RAM</label>
        <input type="text" v-model="ram" placeholder="RAM" required />
        <br /><br>
        <label>INTERNAL STORAGE</label>
        <input type="text" v-model="internal" placeholder="INTERNAL STORAGE" required />
        <br /><br>
        <label>PRIMARY CAMERA</label>
        <input type="text" v-model="cam1" placeholder="PRIMARY CAMERA" required />
        <br /><br>
        <label>SECONDARY CAMERA</label>
        <input type="text" v-model="cam2" placeholder="SECONDARY CAMERA" required />
        <br /><br>
        <label>SIM TYPE</label>
        <select v-model="sim" required>
          <option disabled value="">Select A Type</option>
          <option value="single">Single</option>
          <option value="dual">Dual</option>
          <option value="triple">Triple</option>
        </select>
        <br /><br>
        <label>DISPLAY SIZE</label>
        <input type="text" v-model="display" placeholder="DISPLAY SIZE" required />
        <br /><br>
        <label>OS</label>
        <input type="text" v-model="os" placeholder="OPERATING SYSTEM" required />
        <br /><br>
        <label>NETWORK TYPE</label>
        <h4>
        <input class="container" type="checkbox" value="3G" v-model="net">3G 
        <input type="checkbox" value="4G" v-model="net"> 4G 
        <input type="checkbox" value="5G" v-model="net">5G 
        </h4>
        <label>REMOVABLE BATTERY</label>
        <input type="text" v-model="rmbt" placeholder="YES OR NO" required />
        <br /><br>
        <label>BATTERY CAPACITY</label>
        <input type="text" v-model="btcp" placeholder="CAPACITY IN MAH" required />
        <br /><br>
        </div>
        <input type="submit" value="NEXT" />
        </form>

    </div>
</template>>

<script>
import Service from '../services/Service'

export default {
    name:'AddProduct',
    data () {
    return {
      brand: '',
      model: '',
      price: '',
      stock: '',
      image: '',
      category:'',
      ram:'',
      internal:'',
      cam1:'',
      cam2:'',
      sim:'',
      display:'',
      os:'',
      net:[],
      btcp:'',
      rmbt:''
    }
  },
  methods: 
  {
    async addproduct () 
    {
      const response = await Service.addproduct
      ({
        "brand": this.brand,
        "model": this.model,
        "price": this.price,
        "stock": this.stock,
        "image": this.image,
        "category": this.category,
        "ram": this.ram,
        "internal": this.internal,
        "cam1": this.cam1,
        "cam2": this.cam2,
        "sim": this.sim,
        "display": this.display,
        "os": this.os,
        "net":this.net,
        "rmbt":this.rmbt,
        "btcp":this.btcp
      })
      if(response.data)
      {
        window.alert("Producted Added Successfully!");
        this.$router.push('merchant');
      }       
      else
        window.alert("Error! Add Again");
    }
  }
}
</script>

<style lang="scss" scoped>
.container
{
  margin-left: -450px;
}
h4
{
  margin-top: 10px;
  margin-left: 10px;
}
input[type="checkbox"]
{
  height: 20px;
  width: 20px;
}

label
{
 float: left;
 margin-left: 325px;
 margin-top: 10px;
}

select
{
  float: right;
  width: 27%;
  padding: 12px;
  border: 2px solid #339933;
  margin-right: 475px; 
  font-size: 16px;
  font-weight: italic;
}

input[type="text"],input[type="number"] 
{
  float: right;
  width: 25%;
  padding: 12px;
  border: 2px solid #339933;
  margin-right: 475px; 
 
}

input[type="submit"]:hover
{
  background-color: white;
}

input[type="submit"]
{
  margin-top: 20px;
  margin-bottom: 100px;
  width: 10%;
  color: black;
  font-weight: bold;
  font-size: 25px;
  padding: 12px;
  border: 2px solid #339933;
  background-color: rgb(0, 204, 102);
}

#nav 
  {
  padding: 30px;
  a 
  {
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

</style>