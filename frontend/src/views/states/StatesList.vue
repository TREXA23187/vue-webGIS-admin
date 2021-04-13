<template>
  <div class="user-admin-container">
    <el-button @click.native="handleAddUser" style="margin-bottom: 10px" type="primary" icon="el-icon-plus">Add</el-button>
    <el-table
      :data="search?tableData.filter(data=>data.state_name.toLowerCase().includes(search.toLowerCase())):renderData"
      style="width: 100%"
      border
      :header-cell-style="{backgroundColor:'#eee'}"
    >
      <el-table-column
        label="state_name"
        prop="state_name">
      </el-table-column>
      <el-table-column
        label="sub_region"
        prop="sub_region">
      </el-table-column>
      <el-table-column
        label="state_abbr"
        prop="state_abbr">
      </el-table-column>
      <el-table-column
        label="land_km"
        prop="land_km">
      </el-table-column>
      <el-table-column
        label="water_km"
        prop="water_km">
      </el-table-column>
      <el-table-column
        label="persons"
        prop="persons">
      </el-table-column>
      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">Edit
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="tableData.length"
      :page-size="this.pageSize"
      @current-change="handlePageChange"
      :current-page="currentPage"
      :style="{margin:'10px 0','text-align':'right'}"
    >
    </el-pagination>
    <UsersAdd :visible.sync="dialogFormVisible"></UsersAdd>
  </div>
</template>

<script>
import {getUsersList, deleteUser} from "@/api/users-admin";
import{getStatesList} from "@/api/states-admin"
import UsersAdd from "@/views/users/UsersAdd";

export default {
  components:{
    UsersAdd
  },
  created() {
    this.pageSize = 4
  },
  data() {
    return {
      tableData: [],
      renderData: [],
      search: '',
      currentPage: 1,
      dialogFormVisible:false
    }
  },
  methods: {
    _sliceData(currentPage) {
      let start = currentPage * this.pageSize
      let end = start + this.pageSize
      this.renderData = this.tableData.slice(start, end)
    },
    _loadData() {
      return getStatesList().then(result => {
        // console.log(result)
        this.tableData = result.data.map(v => ({
          state_name: v.STATE_NAME,
          sub_region: v.SUB_REGION,
          state_abbr:v.STATE_ABBR,
          land_km:v.LAND_KM,
          water_km:v.WATER_KM,
          persons:v.PERSONS
        }))
        this._sliceData(this.currentPage - 1)
      })
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      // console.log(index, row);
      deleteUser(row.id).then(async (result) => {
        // console.log(result)
        await this._loadData()
        if (this.renderData.length === 0) {
          this.currentPage--
          this._sliceData(this.currentPage - 1)
        }
      })

    },
    handlePageChange(index) {
      this._sliceData(index - 1)
      // let start = (index - 1) * this.pageSize
      // let end = start + this.pageSize
      // this.renderData = this.tableData.slice(start, end)
      this.currentPage = index
    },
    handleAddUser(){
      this.dialogFormVisible = true
    }
  },
  mounted() {
    this._loadData()
  }
}
</script>
<style scoped>
.user-admin-container {
  padding: 20px;
}
</style>

