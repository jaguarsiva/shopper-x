<template>
          
      <div>
          <h2 id="hr">SELLER DETAILS</h2>
            
            <table>
                <tr><td> MERCHANT ID</td><td> {{merchants.Merchant_id}}</td></tr>
                <tr><td> MERCHANT NAME</td><td>{{merchants.Merchant_Name}} </td></tr>
                <tr><td> MERCHANT MAIL</td><td> {{merchants.Email_id}} </td></tr>
                <tr><td> MERCHANT PHONE NUMBER</td><td> {{merchants.Phone_Number}} </td></tr>
            </table>
        </div>  

</template>

<style scoped>
div
{
    margin-top: 50px;
    margin-bottom: 50px;
}

table
{
    margin-left: 100px;
    margin-top: -32px;
    font-family: "Trebuchet MS";
    border-collapse: collapse;
    width: 80%;
}
table td
{
    padding: 8px;
    border: 3px solid #ddd;
}

table tr:nth-child(even){background-color: #f2f2f2;}

table tr:hover {background-color: #ddd;}

#hr {
  font-family: "Trebuchet MS";
  width: 79%;
  margin-left: 100px;
  padding: 8px;
  background-color: #42b983;
  color: white;
}

</style>

<script>
import Service from '../services/Service'

export default {
    name:'SellerDetails',
    props: ['merchants']
}
</script>