<template>
    <div>
        <div id="nav">
          <router-link to="/customer">HOME</router-link> |
          <router-link to="/cart">MY CART</router-link> |
          <router-link to="/myorders">MY ORDERS</router-link> |
          <router-link to="/customerprofile">PROFILE</router-link>
        </div>
          <router-link to="/cart"><div id="add"><h3>MY CART</h3><img src="../assets/cart.png" /></div></router-link>
          <router-link to="/myorders"><div id="add"><h3>MY ORDERS</h3><img src="../assets/orders.jpg" /></div></router-link>
          <router-link to="/customerprofile"><div id="add"><h3>MY PROFILE</h3><img src="../assets/profile.png" /></div></router-link>
    </div>
</template>

<script>
import Service from '../services/Service'

export default {
  name: 'Customer'
}
</script>

<style lang="scss" scoped>
img
{
  height: 250px;
  padding: 15px;
}
#add
{
margin-left: 60px;
margin-right: 60px;
width: 25%;
float: left;
}
h3{
  color: #42b983;
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
</style>