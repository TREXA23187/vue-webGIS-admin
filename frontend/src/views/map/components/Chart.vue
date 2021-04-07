<template>
  <div id="chart-container"></div>
</template>

<script>
export default {
  name:'Chart',
  mounted() {
    // this.$utils.chart.createChart(1048,735,580,484);
  }
}
</script>

<style>
#chart-container{
  position: absolute;
  right: 0;
  bottom: 0;
  width: 600px;
  height: 400px;
  background: yellow;
}
</style>
