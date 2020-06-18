<template>
    <div>
        <h1>MERCHANT SIGNUP</h1> 
        <form @submit="signup">
        <label>USERNAME</label>
        <input type="text" v-model="username" placeholder="YOUR USERNAME" required />
        <br><br>
        <label>EMAIL </label>
        <input type="email" v-model="usermail" placeholder="YOUR EMAIL" required />
        <br /><br>
        <label>PASSWORD</label>
        <input type="password" v-model="userpass" placeholder="YOUR PASSWORD" autocomplete="on" required />
        <br /><br>
        <label>MOBILE</label>
        <input type="tel" v-model="usermobile" pattern="[6-9]{1}[0-9]{9}" placeholder="YOUR MOBILE NUMBER" required />
        <br /><br>
        <input type="submit" value="REGISTER" />
        </form>
        <br>
        <router-link to="/sellerlogin">CLICK HERE TO LOGIN! </router-link>
   </div>
</template>

<style scoped>
h1 , a
{
  color:black;
}

label
{
 float: left;
 margin-left: 475px;
 margin-top: 10px;
}

input[type="text"],input[type="password"],input[type="email"],input[type="tel"] 
{
  float: right;
  width: 25%;
  padding: 12px;
  border: 2px solid #339933;
  margin-right: 475px; 
 
}
input[type="submit"]:hover {
  background-color: white;
}

input[type="submit"]
{
  margin-top: 20px;
  width: 10%;
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
  name: 'SellerSignup',
  data () {
    return {
      username: '',
      usermail: '',
      userpass: '',
      usermobile: ''
    }
  },
  methods: 
  {
    async signup () 
    {
      const response = await Service.sellersignup
      ({
        merchant_name: this.username,
        email_id: this.usermail,
        password: this.userpass,
        phone_number: this.usermobile,
      })
      if(response.data=="valid")
        {
          window.alert("Signup Successfull! Login to Continue");
          this.$router.push('sellerlogin');
        }
      else if(response.data=="invalid")
      {
        window.alert("Name already exists try a different name to signup!...");
        this.username=""
      }
      else
        {
          window.alert("Error! Signup Again");
        }  
    }
  }
}
</script>

<style scoped>