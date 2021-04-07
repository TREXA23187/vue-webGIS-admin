<template>
  <div id="layout-container">
    <el-container>
      <el-header height="50px">Header</el-header>
      <el-container>
        <el-aside width="400px">Aside</el-aside>
        <el-container>
          <el-main>
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="date"
                label="日期"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="180">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址">
              </el-table-column>
            </el-table>
          </el-main>
          <el-footer height="200px">Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>

  </div>
</template>
<script>
import Detail from "./components/Detail";
import Map from './components/Map'
import Chart from "./components/Chart";
import Controller from "./components/Controller";
export default {
  components:{
    Map
  }
}
</script>
<style>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
