<template>
    <div>
        <h1>MERCHANT LOGIN</h1> 
        <form @submit="sellerlogin">
        <h3>USERNAME</h3>
        <input type="text" v-model="username" placeholder="YOUR USERNAME" required />
        <h3>PASSWORD</h3>
        <input type="password" v-model="userpass" placeholder="YOUR PASSWORD" autocomplete="on" required />
        <br />
        <input type="submit" value="LOGIN" />
        </form>
        <br>
        <router-link to="/sellersignup">CREATE AN ACCOUNT! </router-link>
   </div>
</template>

<script>
import Service from '../services/Service'

export default {
  name: 'SellerLogin',
  data () {
    return {
      username: '',
      userpass: ''
    }
  },
  methods: 
  {
    async sellerlogin () 
    {
      const response = await Service.sellerlogin
      ({
        username: this.username,
        userpass: this.userpass
      })
      if(response.data=="valid")
        {
         window.alert("Login Successfull! ,  Welcome "+this.username);
          this.$store.commit('setMerchant',true);
          this.$router.push('merchant');
        }
      else if(response.data==="invalid")
        {
          window.alert("You have entered a incorrect Password!. Kindly enter the correct password");
          this.userpass=""
        }
      else
        {
          window.alert("You are not an Registered user!.. Kindly Register!..");
          this.$router.push("/sellersignup")
        }
    }
  }
}
</script>

<style scoped>

h1 ,h3, a
{
  color:black;
}

input[type="text"],input[type="password"] 
{
  margin-top: -10px;
  width: 25%;
  padding: 12px 20px;
  border: 2px solid #339933;
}

input[type="submit"]:hover 
{
  background-color: white;
}

input[type="submit"]
{
  margin-top: 20px;
  width: 10%;
  color: black;
  font-weight: bold;
  font-size: 25px;
  padding: 12px 20px;
  border: 2px solid #339933;
  background-color: rgb(0, 204, 102);
}

</style>