import Vue from "vue";
import Vuex from "vuex";
import jsonData from "../static/bookings.json";
import { formatJson } from "../utils/jsonFormatter";
import { formatDate } from "../utils/formatDate";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    data: formatJson(jsonData),
    currentDay: new Date(),
    currentWeek: [],
  },
  getters: {
    todayWeek(state) {
      const today = state.currentDay;
      const weekStart =
        today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1);
      let week = [];
      for (let i = 0; i < 7; i++) {
        let day = new Date(today.setDate(weekStart + i));
        week.push(formatDate(day));
      }

      return week;
    },
    reservationsOnCurrentWeek(state) {
      const dates = state.currentWeek;
      const filteredObject = Object.keys(state.data)
        .filter(
          (key) =>
            dates.includes(state.data[key].start) ||
            dates.includes(state.data[key].end)
        )
        .reduce((obj, key) => {
          obj = [...obj, state.data[key]];
          return obj;
        }, []);
      return filteredObject;
    },
  },
  mutations: {
    updateCurrentWeek(state, newWeek) {
      state.currentWeek = newWeek;
    },
    updateToday(state) {
      state.currentDay = new Date();
    },
  },
  actions: {
    // Действие для инициализации или обновления текущей недели
    initializeOrUpdateWeek({ commit, state }) {
      const today = state.currentDay;
      const weekStart =
        today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1);
      let week = [];

      for (let i = 0; i < 7; i++) {
        let day = new Date(
          today.getFullYear(),
          today.getMonth(),
          weekStart + i
        );
        week.push(formatDate(day));
      }

      commit("updateCurrentWeek", week);
    },
    resetWeek({ commit, getters }) {
      const week = getters.todayWeek;
      // Получаем текущую неделю из геттеров и коммитим новую неделю в состояние
      commit("updateCurrentWeek", week);
    },
  },
});
