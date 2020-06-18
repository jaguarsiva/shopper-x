<template>
    <div id="Logbar">
        <button @click="GoBack" class="gb" >GO BACK</button> 
        <router-link v-if="ismerchant" to="/merchant">MY MERCHANT</router-link>
        <router-link v-if="iscustomer" to="/customer">MY CUSTOMER</router-link>
        <router-link v-if="!iscustomer && !ismerchant" to="/login">CUSTOMER</router-link>
        <router-link v-if="!iscustomer && !ismerchant" to="/sellerlogin">MERCHANT</router-link>
        <router-link to="/productlist">PRODUCTS</router-link>
        <router-link v-if="iscustomer" to="/cart">CART</router-link>
        <router-link v-if="ismerchant" to="/merchantorders">ORDERS</router-link>
        <button v-if="iscustomer || ismerchant" @click="logout" style="float:right;">LOGOUT</button>
        
    </div>
</template>

<script>
import Service from '../services/Service'

export default {
    name:'Logbar',
    computed:
    {
        iscustomer()
        {
            return this.$store.state.iscustomer
        },
        ismerchant()
        {
            return this.$store.state.ismerchant
        }
    },
    methods:
    {
        async checkUser ()
        {
            const response = await Service.checkuser()
            const logged = response.data;     
            if( logged === "customer" )
              {
                this.$store.commit('setCustomer',true);
                this.$store.commit('setMerchant',false);
              }  
            else if (logged === "merchant" )
              {
                this.$store.commit('setCustomer',false);
                this.$store.commit('setMerchant',true);
              } 
            else
              {
                this.$store.commit('setCustomer',false);
                this.$store.commit('setMerchant',false);
              }
        },
        async logout()
        {
          await Service.logout()    
          this.$store.commit('setCustomer',false);
          this.$store.commit('setMerchant',false);
          window.alert("Log out Successful!..");
          this.$router.push("/productlist");
        },
        GoBack()
        {
          this.$router.go(-1)
        }
    },
    created ()
    {
      this.checkUser()
    }
}
</script>>

<style lang="scss" scoped>
#Logbar
{
    height: 60px;
    margin: 5px;
    background-color: #42b983;
}

a,button
{
  background-color: #42b983;
  text-decoration: none;
  color: white;
  padding: 13px;
  margin: 0px 30px;
  border: none;
  font-weight: bold;
  font-family: 'Trebuchet MS';
  font-size: 25px;
}

a:hover,button:hover
{
  border: 3px solid black;
  color: black;
}

button{
  height: 60px;
}

.router-link-exact-active {
      color: black;
      border-bottom: 3px solid black;
    }
</style>