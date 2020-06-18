<template>
    <div id="home">
        <router-link to="/"><img src="../assets/icon.png" height="90px" width="100px"/>   
        <h1>SHOPPER - X</h1></router-link>
        <Logbar />
        <router-view />
    </div>
</template>
<script>

import Logbar from "../components/Logbar";
import Service from '../services/Service'

export default {
    name:'Home',
    components : 
    {
        Logbar
    }
}
</script>>

<style scoped>
img
{
    margin-left: -300px;
}
h1
{
    margin-left: 150px;
    margin-top: -75px;
    font-size: 50px;
    color: rgb(255,128,44);
}
Logbar
{
    clear: both;
}
a
{
    text-decoration: none;
}

</style>