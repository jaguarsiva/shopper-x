<template>
    <div>
        <div id="nav">
          <router-link to="/merchant">HOME</router-link> |
          <router-link to="/addproduct">ADD</router-link> |
          <router-link to="/updateproduct">UPDATE</router-link> |
          <router-link to="/removeproduct">REMOVE</router-link> |
          <router-link to="/merchantprofile">PROFILE</router-link>
        </div>
          <router-link to="/addproduct"><div id="add"><h3>ADD A PRODUCT</h3><img src="../assets/add.png" /></div></router-link>
          <router-link to="/updateproduct"><div id="add"><h3>UPDATE A PRODUCT</h3><img src="../assets/update.png" /></div></router-link>
          <router-link to="/removeproduct"><div id="add"><h3>REMOVE A PRODUCT</h3><img src="../assets/remove.png" /></div></router-link>
          <router-link to="/merchantprofile"><div id="add"><h3>PROFILE</h3><img src="../assets/profile.png" /></div></router-link>
    </div>
</template>

<script>
import Service from '../services/Service'

export default {
  name: 'Merchant'
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
margin-left: 30px;
margin-right: 30px;
width: 21%;
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