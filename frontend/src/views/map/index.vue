<template>
  <div id="map-container">
    <!--    <div id="map"></div>-->
    <Map></Map>
    <Detail>detail</Detail>
    <Chart>chart</Chart>
    <div id="control">
      <form action="/api/usa">
        <!--    <input type="text" placeholder="search..." name="state_name">-->
        <select name="state_name" v-model="select">
          <option disabled value="">states</option>
          <!--          <option value="Illinois">Illinois</option>-->
          <!--          <option value="Delaware">Delaware</option>-->
          <option v-for="(state,index) in states" :value="state">{{state}}</option>
        </select>
        <input type="submit" value="submit">
      </form>
      <button id="search">search</button>
      <input type="text" placeholder="search..." name="state_name" id="state_input" v-model="select">
      <button id="showAll">show all</button>
      <button id="removeAll">remove all</button>
      <!--      <Controller></Controller>-->
    </div>
  </div>


</template>

<script>
// import states from '@/assets/js/states'
import Detail from "./components/Detail";
import Map from './components/Map'
import Chart from "./components/Chart";

export default {
  name: "mapView",
  data(){
    return{
      select:"",
      states:[
        "Illinois",
        "District of Columbia",
        "Delaware",
        "West Virginia",
        "Maryland",
        "Colorado",
        "Kentucky",
        "Kansas",
        "Virginia",
        "Missouri",
        "Arizona",
        "Oklahoma",
        "North Carolina",
        "Tennessee",
        "Texas",
        "New Mexico",
        "Alabama",
        "Mississippi",
        "Georgia",
        "South Carolina",
        "Arkansas",
        "Louisiana",
        "Florida",
        "Michigan",
        "Montana",
        "Maine",
        "North Dakota",
        "South Dakota",
        "Wyoming",
        "Wisconsin",
        "Idaho",
        "Vermont",
        "Minnesota",
        "Oregon",
        "New Hampshire",
        "Iowa",
        "Massachusetts",
        "Nebraska",
        "New York",
        "Pennsylvania",
        "Connecticut",
        "Rhode Island",
        "New Jersey",
        "Indiana",
        "Nevada",
        "Utah",
        "California",
        "Ohio",
        "Washington"
      ]
    }
  },
  components: {
    Map,
    Detail,
    Chart,

  },
  methods:{
    countStates(){
      console.log(states)
    }
  }
  // mounted() {
  //   this.map = this.$utils.map.createMap();
  // }
};
</script>
<style lang="less">
#map-container {
  position: relative;
  width: 1050px;
  height: 600px;
  background: purple;
  #control{
    position: absolute;
    height: 100px;
    left: 0;
    bottom: 0;
    background: blue;
  }
}

#map {
  position: absolute;
  left: 0;
  top: 0;
  width: 800px;
  height: 500px;
}
#control{
  position: absolute;
  left: 0;
  bottom: 0;
}
.info {
  padding: 6px 8px;
  font: 14px/16px Arial, Helvetica, sans-serif;
  background: white;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}

.info h4 {
  margin: 0 0 5px;
  color: #777;
}

.legend {
  text-align: left;
  line-height: 18px;
  color: #555;
}

.legend i {
  width: 18px;
  height: 18px;
  float: left;
  margin-right: 8px;
  opacity: 0.7;
}
</style>
