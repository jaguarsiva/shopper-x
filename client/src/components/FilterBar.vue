<template>
    <div id="bar">
        <form class="example">
            <input type="text" placeholder="Search.." v-model="searchkey">
            <button class="clear" @click="clear"><i class="fa fa-times"></i></button>
            <button class="search" @click="search" ><i class="fa fa-search"></i></button>
        </form>
    </div>
</template>

<style scoped>
#bar
{
    margin: 5px;
    font-family: 'Trebuchet MS';
    text-transform: uppercase;
    height: 60px;
    background: #42b983;
}

form.example input[type=text] {
  padding: 10px;
  font-size: 17px;
  border-width: 1.5px 0px 1.5px 1.5px;
  border-style: solid;
  border-color: black;
  width: 250px;
  margin-top: 8px;
}

.search{
  width: 60px;
  padding: 10px;
  background: #42b983;
  color: white;
  font-size: 17px;
  border: 1.5px solid black;
  border-left: none;
  cursor: pointer;
}

.search:hover{
  background: #42a083;
  color:black;
}

.clear{
    border-width:1.5px 1.5px 1.5px 0px;
    border-style: solid;
    border-color: black;
    font-size: 17px;
    padding: 10px;
    background: white;
}

.clear:hover{
    color:#42a083;
}
</style>

<script>
import Service from '../services/Service'

export default {
    name:'Filterbar',
    data(){
        return{
            searchkey:""
        }
    },
    methods:{
        async search(){
            const response = await Service.Search({"key":this.searchkey})
            if(response.data)
                this.$store.commit('setProducts',response.data)
            else
                window.alert("No Match Found!..");
        },
        async clear(){
            this.searchkey=''
            const response = await Service.getproducts()
            this.$store.commit('setProducts',response.data)
        }
    }
}
</script>