<template>
    <div>
        <h1>CUSTOMER SIGNUP</h1> 
        <form @submit="signup">
        <label>FIRSTNAME</label>
        <input type="text" v-model="firstname" placeholder="YOUR FIRSTNAME" required />
        <br><br>
        <label>LASTNAME</label>
        <input type="text" v-model="lastname" placeholder="YOUR LASTNAME" required />
        <br><br>
        <label>USERNAME</label>
        <input type="text" v-model="username" placeholder="YOUR USERNAME" required />
        <br><br>
        <label>EMAIL </label>
        <input type="email" v-model="email_id" placeholder="YOUR EMAIL" required />
        <br /><br>
        <label>PASSWORD</label>
        <input type="password" v-model="password" placeholder="YOUR PASSWORD" autocomplete="on" required />
        <br /><br>
        <label>MOBILE NO</label>
        <input type="tel" v-model="phone_number" pattern="[6-9]{1}[0-9]{9}" placeholder="YOUR MOBILE NUMBER" required />
        <br /><br>
        <input type="submit" value="REGISTER" />
        </form>
        <br>
        <router-link to="/login">CLICK HERE TO LOGIN! </router-link>
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
 margin-left: 450px;
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
  name: 'Signup',
  data () {
    return {
      firstname: '',
      lastname: '',
      username: '',
      email_id: '',
      password: '',
      phone_number: ''
    }
  },
  methods: 
  {
    async signup () 
    {
      const response = await Service.signup
      ({
        firstname: this.firstname,
        lastname: this.lastname,
        username: this.username,
        email_id: this.email_id,
        password: this.password,
        phone_number: this.phone_number
      })
      if(response.data=="valid")
        {
          window.alert("Signup Successfull!\n Login to Continue");
          this.$router.replace('login');
        }
      else if(response.data=="invalid")
      {
        window.alert("Name already exists.!\n Try a different name to signup!...");
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