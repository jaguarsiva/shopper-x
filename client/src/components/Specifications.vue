<template>
          
        
        <div id="specs">
            <h2 id="hr">SPECIFICATIONS</h2>
                
            <table v-if="category==='smartphone'">
                <tr><td> RAM</td><td> {{specs.RAM}}</td></tr>
                <tr><td> INTERNAL STORAGE</td><td>{{specs.Internal_Storage}} </td></tr>
                <tr><td> PRIMARY CAMERA</td><td>{{specs.Primary_Camera}} </td></tr>
                <tr><td> SECONDARY CAMERA</td><td> {{specs.Secondary_Camera}} </td></tr>
                <tr><td> SIM TYPE</td><td> {{specs.Sim_Type}} </td></tr>
                <tr><td> DISPLAY SIZE</td><td> {{specs.Display_Size}} </td></tr>
                <tr><td> OS</td><td> {{specs.OS}}</td> </tr>
                <tr><td> NETWORK TYPE</td><td>{{specs.Network_Type}}  </td></tr>
                <tr><td> REMOVABLE BATTERY</td><td>{{specs.Removable_Battery}}  </td></tr>
                <tr><td> BATTERY CAPACITY</td><td> {{specs.Battery_Capacity}} </td></tr>
            </table>
        </div>

</template>

<style scoped>
#specs{
    margin-top: 150px;
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
    width: 40%;
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
    name:'Product',
    data(){
        return{
            specs:[],
        }
    },
    props: ['category'],
    methods:
    {
        async fetchProduct(ID)
        {
            const response = await Service.getproductspecs({ id:ID })
            this.specs = response.data[0]
        }
    },
    created()
    {
        const ID = Number(this.$route.params.id);
        this.fetchProduct(ID);
    }
}
</script>