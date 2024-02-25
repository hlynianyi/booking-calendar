<template>
  <nav class="nav">
    <button class="nav-button" @click="previousWeek">
      <img src="@/assets/back_arrow.svg" alt="previous week" />
    </button>
    <button class="nav-button" @click="nextWeek">
      <img src="@/assets/forward_arrow.svg" alt="next week" />
    </button>
    <button class="nav-button" @click="resetWeek">Today</button>
  </nav>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "NavigationButtons",
  computed: {
    ...mapState(["currentWeek"]),
    ...mapGetters({
      todayWeek: "todayWeek",
    }),
  },
  methods: {
    resetWeek() {
      this.$store.commit("updateCurrentWeek", this.todayWeek);
    },
    previousWeek() {
      let startDate = new Date(this.currentWeek[0]);
      startDate.setDate(startDate.getDate() - 7);
      this.updateWeek(startDate);
    },
    nextWeek() {
      let endDate = new Date(this.currentWeek[this.currentWeek.length - 1]);
      endDate.setDate(endDate.getDate() + 1);
      this.updateWeek(endDate);
    },
    updateWeek(startDate) {
      let newWeek = [];
      for (let i = 0; i < 7; i++) {
        let newDate = new Date(startDate);
        newDate.setDate(newDate.getDate() + i);
        newWeek.push(this.formatDate(newDate));
      }
      this.$store.commit("updateCurrentWeek", newWeek);
    },
    formatDate(date) {
      return date.toISOString().split("T")[0];
    },
  },
};
</script>

<style scoped>
.nav {
  display: flex;
  gap: 6px;
  height: 50px;
  padding: 6px;
}
.nav-button {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1em;
  padding: 4px 16px;
  color: white;
  border: none;
  border-radius: 4px;
  background-color: #0c0f39;
}
</style>
