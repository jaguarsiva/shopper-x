<template>
    <div>
        <div id="nav">
          <router-link to="/merchant">HOME</router-link> |
          <router-link to="/addproduct">ADD</router-link> |
          <router-link to="/updateproduct">UPDATE</router-link> | 
          <router-link to="/removeproduct">REMOVE</router-link>|
          <router-link to="/merchantprofile">PROFILE</router-link>
        </div>
        <h1>MERCHANT PROFILE</h1>

        <div id="input" v-for="(detail,i) in details" :key="i">
        <form @submit="UpdateDetails">
        <label>ID </label>
        <input type="number" v-model="detail.Merchant_id" style="background-color:#c2c2d6;" readonly/>
        <br><br>
        <label>NAME </label>
        <input type="text" v-model="detail.Merchant_Name"/>
        <br /><br>
        <label>EMAIL </label>
        <input type="email" v-model="detail.Email_id"/>
        <br /><br>
        <label>MOBILE</label>
        <input type="number" v-model="detail.Phone_Number"/>
        <br /><br>
        <input type="submit" value="UPDATE" />
        </form>
      </div>
      
      <div id="output" v-for="detail in details" :key="detail.id">
        <div id="o2">
        <h3>NAME : {{ detail.Merchant_Name}}</h3>
        <h3>EMAIL : {{ detail.Email_id}}</h3>
        <h3>MOBILE : {{ detail.Phone_Number}}</h3>
        </div>
      </div>

      <button id="changepass" @click="ChangePass">CHANGE PASSWORD</button>
      <div v-if="isChange" id="pass">
        <form @submit="UpdatePass">
        <label class="lab">OLD PASSWORD</label>
        <input type="password" v-model="OldPass"/>
        <br><br>
        <label class="lab">NEW PASSWORD</label>
        <input type="password" v-model="NewPass"/>
        <br /><br>
        <input type="submit" value="UPDATE PASSWORD" id="updte"/>
        </form>
      </div>

    </div>
</template>

<style lang="scss" scoped>
#updte
{
  clear: both;
  margin-right: 550px;
}
.lab
{
  clear: both;
  margin-left: 350px;
}
#pass
{
  clear: both;
  height: 250px;
}

#changepass
{
  clear: both;
  margin-top: -100px;
  margin-right: 600px;
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
    font-family: 'Trebuchet MS';
    font-weight: bold;
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
 margin-left: 100px;
}

input[type="text"],input[type="number"],input[type="email"] 
{
  margin-top: 25px;
  float: right;
  margin-right: 200px;
  width: 30%;
  padding: 12px;
  border: 2px solid #339933;

}
input[type="password"]
{
  margin-top: 25px;
  float: right;
  margin-right: 500px;
  width: 25%;
  padding: 12px;
  border: 2px solid #339933;
}

input[type="submit"]:hover, button:hover {
  background-color: white;
}

input[type="submit"] , button
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

<script>
import Service from '../services/Service'

export default {
    name:'MerchantProfile',
    data(){
        return{
            details:[],
            isChange:false,
            OldPass:"",
            NewPass:""
        }
    },
    methods:
    {
        async fetchDetails()
        {
            const response = await Service.GetMerchantDetails()
            this.details = response.data
        },
        async UpdateDetails()
        {
            const response = await Service.UpdateMerchantDetails
            ({
                  name : this.details[0].Merchant_Name,
                  email : this.details[0].Email_id,
                  mobile : this.details[0].Phone_Number,
            })
            if(response.data)
              {
                window.alert("Updated Sucessfully!..")
                this.$router.push("/merchant");
              }
            else
              window.alert("Update Error! Try Agian!..")
        },
        ChangePass()
        {
          this.isChange= !this.isChange
        },
        async UpdatePass()
        {
            const response = await Service.UpdateMerchantPassword
            ({
                  old : this.OldPass,
                  new : this.NewPass
            })
            if(response.data=="valid")
              {
                window.alert("Password Updated Successfully! \nLogging you out ! \nLogin with the new password!..")
                this.$store.commit('setMerchant',false);
                this.$router.push("/sellerlogin");
              }
            else if(response.data=="invalid")
              {
                window.alert("Old Password is wrong!\n Type the Correct password!..")
                this.OldPass =""
              }  
            else
              window.alert("Update Error! Try Agian!..")
        }
    },
    created()
    {
      this.fetchDetails();
    }
}
</script>