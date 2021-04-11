<template>
  <el-table
    :data="covidTable.filter(data => !search || data.area.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      label="area"
      prop="area">
    </el-table-column>
    <el-table-column
      label="confirm"
      prop="confirm">
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>
<!--      <template slot-scope="scope">-->
<!--        <el-button-->
<!--          size="mini"-->
<!--          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>-->
<!--        <el-button-->
<!--          size="mini"-->
<!--          type="danger"-->
<!--          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>-->
<!--      </template>-->
    </el-table-column>
  </el-table>
</template>

<script>
import axios from 'axios'
import {getCovidInfo} from "@/api/covid";

export default {
  data() {
    return {
      covidTable: [{
        area:'loading...',
        confirm:'loading...'
      }],
      search:''
    }
  },
  methods:{
    _loadData(){
     axios({
       url:'/api/covid',
       method:'GET'
     }).then(response => {
        this.covidTable = response.data.map(v => ({
          area: v.area,
          confirm: v.confirm
        }))
      })
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  },
  mounted() {
    this._loadData()
  }
}
</script>
