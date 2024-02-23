<template>
  <div id="app">
    <CalendarGrid />
  </div>
</template>

<script>
import CalendarGrid from "./CalendarGrid.vue";

export default {
  name: "App",
  components: {
    CalendarGrid,
  },
  computed: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-size: 16px;
}
</style>
