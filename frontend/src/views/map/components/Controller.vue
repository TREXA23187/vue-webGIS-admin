<template>
  <div id="controller-container">
    <el-col :span="6">
      <el-row type="flex" justify="row">
          <el-select name="state_name" v-model="statesForm.select" filterable placeholder="states">
            <el-option v-for="state in states" :value="state"></el-option>
          </el-select>
          <el-input v-model="statesForm.select" placeholder="search..." id="state_input"></el-input>
          <el-button type="danger" id="search">search</el-button>
      </el-row>
      <el-row type="flex" justify="left">
        <el-button type="info" id="showAll">show all</el-button>
        <el-button type="warning" id="removeAll">remove all</el-button>
      </el-row>
    </el-col>


  </div>
</template>

<script>
import axios from "axios";
import L from "leaflet";

export default {
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      statesForm:{
        select:''
      },
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
  methods:{
    submitForm(){
      const state_name = this.statesForm.select
      // const obj = $.ajax({url:`/usa?state_name=${state_name}`,async:false})
      axios({
        method: 'get',
        url: `/usa?state_name=${state_name}`,
      })
          .then(function (response) {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  }
}
</script>
<style lang="less">
el-select{
  width: 100px;
}

</style>
