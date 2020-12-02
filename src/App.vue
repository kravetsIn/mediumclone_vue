<template>
  <div id="app">
    <McvHeader></McvHeader>
    <router-view/>
  </div>
</template>
<script>
import McvHeader from '@/components/Header.vue';

export default {
  components: { McvHeader },
};
</script>
