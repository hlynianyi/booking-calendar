<template>
  <div id="app">
    <NavigationButtons />
    <CalendarGrid />
  </div>
</template>

<script>
import CalendarGrid from "./CalendarGrid.vue";
import NavigationButtons from "./NavigationButtons.vue";

export default {
  name: "app",
  components: {
    NavigationButtons,
    CalendarGrid,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  --border-color: #ccc;
  --common-border: 1px solid var(--border-color);
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
