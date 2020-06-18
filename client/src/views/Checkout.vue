<template>
    <div>
        <h3>CONFIRM THE DETAILS BELOW TO CHECKOUT</h3>
        <h4>EDIT THE DETAILS IF YOU WANT!</h4>
        <br><br>
        <form @submit="Checkout">
        <label>FIRST NAME</label>
        <input type="text" v-model="firstname" placeholder="YOUR FIRSTNAME" required />
        <br><br>
        <label>LAST NAME</label>
        <input type="text" v-model="lastname" placeholder="YOUR LASTNAME" required />
        <br><br>
        <label>EMAIL</label>
        <input type="email" v-model="deliverymail" placeholder="YOUR EMAIL" required />
        <br /><br>
        <label>ADDRESS LINE 1</label>
        <input type="text" v-model="deliveryaddress1" placeholder="YOUR ADDRESS" required />
        <br /><br>
        <label>ADDRESS LINE 2</label>
        <input type="text" v-model="deliveryaddress2" placeholder="YOUR ADDRESS" required />
        <br /><br>
        <label>MOBILE NO</label>
        <input type="number" v-model="deliverymobile" placeholder="YOUR MOBILE NUMBER" required />
        <br /><br>
        <input type="submit" value="CHECKOUT" />
        </form>
    </div>
</template>

<script>
import Service from '../services/Service'

export default 
{
    name:'Checkout',
    data () {
    return {
      firstname: '',
      lastname: '',
      deliverymail: '',
      deliveryaddress1: '',
      deliveryaddress2: '',
      deliverymobile: ''
    }
  },
    methods:
    {
        async Checkout()
        {
            const response = await Service.Checkout({
                "firstname":this.firstname,
                "lastname":this.lastname,
                "mail":this.deliverymail,
                "Line1":this.deliveryaddress1,
                "Line2":this.deliveryaddress2,
                "mobile":this.deliverymobile
            });
            if(response.data)
            {
              const orderid = response.data
              window.alert("Order Placed Your Order id is "+orderid)
                this.$router.push("/myorders");
            }
            else
              window.alert("Error in Placing Order ! Kindly Try Again!...")
        },
        async Autofill()
        {
          const response = await Service.GetCustomerDetails()
          const results = response.data
          this.firstname = results[0].Firstname
          this.lastname = results[0].Lastname
          this.deliverymail = results[0].Email_id
          this.deliverymobile = results[0].Phone_Number
        }
    },
    created()
    {
      this.Autofill();
    }
}
</script>

<style scoped>

label
{
 float: left;
 margin-left: 410px;
 margin-top: 10px;
}

input[type="text"],input[type="password"],input[type="email"],input[type="number"] 
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
  margin: 20px;
  width: 15%;
  color: black;
  font-weight: bold;
  font-size: 25px;
  padding: 12px;
  border: 2px solid #339933;
  background-color: rgb(0, 204, 102);
}
</style>