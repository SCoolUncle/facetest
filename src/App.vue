<script setup lang="ts">
import StepForm from './views/info-sub/index.vue'
import {useRouter} from 'vue-router'
import {Button} from 'ant-design-vue'
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
</script>

<template>
  <!-- <StepForm></StepForm> -->
  <router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 400;
  /* text-align: center; */
  color: #2c3e50;
}
</style>
