<template>
  <div class="box-wrap">
    <div class="home">
      <div class="box-in"></div>
      <div class="box-in2"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingShimmerComponent',
}
</script>

<style lang="scss" scoped>
.box-wrap {
  position: relative;
  height: 55vmin;
  width: 100%;
  //   padding: 1.4286em;
  border: 1px solid #ddd;
  // border-radius: 0.5em;
  background: #f5f5f5;
  //   display: flex;
  //   flex-direction: column;
  //   align-items: flex-end;
  //   padding-top: 10em;

  .home {
    position: absolute;
    padding-left: 1.4286em;
    bottom: 2em;
    left: 0;
    right: 0;
    .box-in {
      animation-duration: 1s;
      animation-fill-mode: forwards;
      animation-iteration-count: infinite;
      animation-name: skeletonshimmer;
      animation-timing-function: linear;
      width: 50%;
      height: 10px;
      position: relative;
      background: #d8d8d8;
      background-image: linear-gradient(
        to right,
        #d8d8d8 0%,
        #bdbdbd 20%,
        #d8d8d8 40%,
        #d8d8d8 100%
      );
      background-repeat: no-repeat;
    }

    .box-in2 {
      animation-duration: 1s;
      animation-fill-mode: forwards;
      animation-iteration-count: infinite;
      animation-name: skeletonshimmer;
      animation-timing-function: linear;
      width: 30%;
      margin-top: 1em;
      height: 10px;
      position: relative;
      background: #d8d8d8;
      background-image: linear-gradient(
        to right,
        #d8d8d8 0%,
        #bdbdbd 20%,
        #d8d8d8 40%,
        #d8d8d8 100%
      );
      background-repeat: no-repeat;
    }
  }

  @keyframes skeletonshimmer {
    0% {
      background-position: -33.4286em 0;
    }
    100% {
      background-position: 33.4286em 0;
    }
  }
}
</style>
