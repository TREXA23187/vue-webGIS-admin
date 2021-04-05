<template>
  <div id="detail-container">
    <button id="btn_details">details</button>
    <div id="details">123465</div>
  </div>
</template>

<script>
export default {
  name:'Detail'
}
</script>

<style>
#detail-container{
  position: absolute;
  right: 0;
  top: 0;
  width: 250px;
  height: 300px;
  background: pink;
}
#details{
  position: absolute;
  width: 100%;
  height: 100%;
  background: gray;
}
</style>
