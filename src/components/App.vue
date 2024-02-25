<template>
  <div id="app">
    <CalendarGrid />
  </div>
</template>

<script>
import CalendarGrid from "./CalendarGrid.vue";

export default {
  name: "app",
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
  margin: 0;
  font-size: 16px;
  --border-color: #ccc;
  --date-grid: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  --common-border: 1px solid var(--border-color);
}
</style>
