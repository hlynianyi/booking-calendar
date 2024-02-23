import Vue from "vue";
import Vuex from "vuex";
import jsonData from "../assets/bookings.json";
import { formatJson } from "../helpers/jsonFormatter";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    data: formatJson(jsonData),
    date: {
      today: new Date(),
    },
    currentWeek: [], // Добавляем новое состояние для хранения текущей недели
    // todo: busyDaysOnWeek = [],

  },
  getters: {
    allEvents(state) {
      return state.data;
    },
    todayWeek(state) {
      function formatDate(date) {
        return new Intl.DateTimeFormat("ru-RU", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
          .format(date)
          .replace(/(\d{2})\.(\d{2})\.(\d{4})/, "$3-$2-$1");
      }
      const today = state.date.today;
      const weekStart =
        today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1); // Понедельник как первый день недели
      let week = [];

      for (let i = 0; i < 7; i++) {
        let day = new Date(today.setDate(weekStart + i));
        week.push(formatDate(day));
      }

      return week;
    },
    reservationsOnCurrentWeek(state, getters) {
      // todo: реализовать логику в которой отображаются дни промежутка, не только start-end
      const dates = getters.todayWeek;
      const filteredObject = Object.keys(state.data)
        .filter(
          (key) =>
            dates.includes(state.data[key].start) ||
            dates.includes(state.data[key].end)
        )
        .reduce((obj, key) => {
          // obj[key] = state.data[key];
          obj = [...obj, state.data[key]]
          return obj;
        }, []);
      return filteredObject;
    },
  },
  mutations: {
    // Мутация для обновления текущей недели
    updateCurrentWeek(state, newWeek) {
      state.currentWeek = newWeek;
    },
    // Мутация для обновления сегодняшней даты (если потребуется)
    updateToday(state, newDate) {
      state.date.today = newDate;
    },
    //todo: updateBusyDaysOnWeek
  },
  actions: {
    // Действие для инициализации или обновления текущей недели
    initializeOrUpdateWeek({ commit, state }) {
      function formatDate(date) {
        return new Intl.DateTimeFormat("ru-RU", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
          .format(date)
          .replace(/(\d{2})\.(\d{2})\.(\d{4})/, "$3-$2-$1");
      }
      const today = state.date.today;
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
    // todo: initializeOrUpdateBusyDaysOnWeek
  },
});
