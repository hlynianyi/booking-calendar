<template>
  <main>
    <nav class="nav">
      <button class="button" @click="previousWeek">Backward</button>
      <button class="button" @click="resetWeek">Today</button>
      <button class="button" @click="nextWeek">Forward</button>
    </nav>
    <!-- calendar section -->
    <section class="container">
      <div class="dates-container">
        <div class="center date-item" v-for="date in currentWeek" :key="date">
          {{ date }}
        </div>
      </div>
      <!-- rooms section -->
      <div
        class="center"
        :class="`room${index + 1}`"
        v-for="(room, index) in rooms"
        :key="index"
      >
        {{ room }}
      </div>
      <!-- check case if booking is day-to-day e.g. 2024-04-02..-->
      <!-- dates section -->
      <div class="room1-dates">
        <div
          class="dates-item center"
          v-for="(date, index) in currentWeek"
          :key="`day-${index}`"
          :id="`room-1_day-${index}`"
          @click="handleClick"
        >
          day: {{ index }}
          <span
            class="booked-overlay center"
            :class="dayStatus(date, 'Premier Suite')"
            v-show="dayStatus(date, 'Premier Suite')"
          ></span>
        </div>
      </div>
      <div class="room2-dates">
        <div
          class="dates-item center"
          v-for="(date, index) in currentWeek"
          :key="`day-${index}`"
          :id="`room-2_day-${index}`"
          @click="handleClick"
        >
          day: {{ index }}
          <span
            class="booked-overlay center"
            :class="dayStatus(date, 'Superior Room')"
            v-show="dayStatus(date, 'Superior Room')"
          ></span>
        </div>
      </div>

      <div class="room3-dates" ref="room3">
        <div
          class="dates-item center"
          v-for="(date, index) in currentWeek"
          :key="`day-${index}`"
          :id="`room-3_day-${index}`"
          @click="handleClick"
        >
          day: {{ index }}
          <span
            v-if="isBooked(date, 'Grand Executive')"
            class="booked-overlay center"
            :style="getOverlayStyle('Grand Executive')"
            :data-name="getOverlayStyle('Grand Executive').dataName"
          ></span>
        </div>
      </div>
      <div class="room4-dates">
        <div
          class="dates-item center"
          v-for="(date, index) in currentWeek"
          :key="`day-${index}`"
          :id="`room-4_day-${index}`"
          @click="handleClick"
        >
          day: {{ index }}
          <span
            class="booked-overlay center"
            :class="dayStatus(date, 'Suite Luxury')"
            v-show="dayStatus(date, 'Suite Luxury')"
          ></span>
        </div>
      </div>
      <div class="room5-dates">
        <div
          class="dates-item center"
          v-for="(date, index) in currentWeek"
          :key="`day-${index}`"
          :id="`room-5_day-${index}`"
          @click="handleClick"
        >
          day: {{ index }}
          <span
            class="booked-overlay center"
            :class="dayStatus(date, 'Suite Classic Room')"
            v-show="dayStatus(date, 'Suite Classic Room')"
          ></span>
        </div>
      </div>
      <div class="room6-dates">
        <div
          class="dates-item center"
          v-for="(date, index) in currentWeek"
          :key="`day-${index}`"
          :id="`room-6_day-${index}`"
          @click="handleClick"
        >
          day: {{ index }}
          <span
            class="booked-overlay center"
            :class="dayStatus(date, 'Penthouse Suite')"
            v-show="dayStatus(date, 'Penthouse Suite')"
          ></span>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "CalendarContainer",
  data() {
    return {
      rooms: [
        "Premier Suite",
        "Superior Room",
        "Grand Executive",
        "Suite Luxury",
        "Suite Classic Room",
        "Penthouse Suite",
      ],
    };
  },
  mounted() {
    this.$store.dispatch("initializeOrUpdateWeek");
  },
  computed: {
    ...mapState(["currentWeek"]),
    ...mapGetters({
      allEvents: "allEvents",
      todayWeek: "todayWeek",
      reservationsOnCurrentWeek: "reservationsOnCurrentWeek",
    }),
  },
  methods: {
    resetWeek() {
      // todo: fix
      let startDate = new Date(this.todayWeek);
      this.updateWeek(startDate);
    },
    previousWeek() {
      let startDate = new Date(this.currentWeek[0]);
      startDate.setDate(startDate.getDate() - 7);
      this.updateWeek(startDate);
    },
    nextWeek() {
      let endDate = new Date(this.currentWeek[this.currentWeek.length - 1]);
      endDate.setDate(endDate.getDate() + 1); // начало следующей недели
      this.updateWeek(endDate);
    },
    updateWeek(startDate) {
      let newWeek = [];
      for (let i = 0; i < 7; i++) {
        let newDate = new Date(startDate);
        newDate.setDate(newDate.getDate() + i);
        newWeek.push(this.formatDate(newDate));
      }
      console.log("------------- :>> ");
      this.$store.commit("updateCurrentWeek", newWeek);
    },
    formatDate(date) {
      return date.toISOString().split("T")[0];
    },
    handleClick(event) {
      const clickedItemId = event.target.id;
      console.log(clickedItemId); // Вы можете использовать ID для дальнейшей логики
    },
    isDateStart(date, roomType) {
      return this.reservationsOnCurrentWeek.some(
        (reservation) =>
          reservation.roomDetails.name === roomType &&
          reservation.start === date
      );
    },
    isDateEnd(date, roomType) {
      return this.reservationsOnCurrentWeek.some(
        (reservation) =>
          reservation.roomDetails.name === roomType && reservation.end === date
      );
    },
    isDateTransit(date, roomType) {
      return this.reservationsOnCurrentWeek.some((reservation) => {
        if (reservation.roomDetails.name !== roomType) {
          return false;
        }
        const startDate = new Date(reservation.start);
        const endDate = new Date(reservation.end);
        const checkDate = new Date(date);

        return checkDate > startDate && checkDate < endDate;
      });
    },
    dayStatus(date, roomType) {
      // console.log(this.reservationsOnCurrentWeek);
      if (this.isDateStart(date, roomType)) {
        return "booked-overlay__start";
      } else if (this.isDateEnd(date, roomType)) {
        return "booked-overlay__end";
      } else if (this.isDateTransit(date, roomType)) {
        return "booked-overlay__transit";
      }
      return "";
    },
    isBooked(date, roomType) {
      return this.isDateStart(date, roomType);
      // || this.isDateEnd(date, roomType)
      // || this.isDateTransit(date, roomType)
    },
    getOverlayStyle(roomType) {
      const dates = this.currentWeek.map((day) => new Date(day));
      let startDayIndex = null;
      let endDayIndex = null;
      let reservationName;
      // Найдем индексы начала и конца бронирования
      this.reservationsOnCurrentWeek.forEach((reservation) => {
        if (reservation.roomDetails.name === roomType) {
          reservationName = reservation.name;
          console.log("reservation :>> ", reservation);
          const startIndex = dates.findIndex(
            (date) => date.toISOString().split("T")[0] === reservation.start
          );
          const endIndex = dates.findIndex(
            (date) => date.toISOString().split("T")[0] === reservation.end
          );
          console.log("startIndex, endIndex :>> ", startIndex, endIndex);

          if (startIndex > 0) {
            startDayIndex = startIndex;
          }

          if (endIndex > 0) {
            endDayIndex = endIndex;
          } else {
            endDayIndex = 7;
          }
        }
      });

      if (startDayIndex === null || endDayIndex === null) {
        // Если не найдено бронирование, ничего не отображаем
        return {
          display: "none",
        };
      }
      const startWidth = 0.5;
      const endWidth = endDayIndex === 7 ? 1 : 0.5;
      const fullDaysWidth =
        endDayIndex === 7
          ? (endDayIndex - startDayIndex - 2) * 1
          : (endDayIndex - startDayIndex - 1) * 1;

      const width = (startWidth + endWidth + fullDaysWidth) * 100;
      console.log(
        "info sw + ew + fdw * 100 :>> ",
        startWidth,
        endWidth,
        fullDaysWidth,
        (startWidth + endWidth + fullDaysWidth) * 100
      );

      return {
        position: "absolute",
        left: `${47}%`,
        width: `${width}%`,
        top: "0",
        height: "100%", // высота оверлея должна соответствовать контейнеру
        backgroundColor: "darkslateblue", // Пример цвета фона
        // Остальные стили по необходимости
        borderRadius: `20px 0 0 20px`,
        dataName: reservationName,
      };
    },
  },
};
</script>

<style scoped>
.nav {
  display: flex;
  gap: 8px;
}
.button {
  font-size: 1em;
  padding: 8px 12px;
  color: white;
  border-radius: 4px;
  background-color: darkslateblue;
}

.container {
  position: relative;
  width: 95vw;
  margin-top: 12px;
  display: grid;
  grid-template-columns: 0.4fr 1.6fr;
  grid-template-rows: 0.5fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-auto-columns: 1fr;
  grid-auto-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  height: 80vh;
  border: 1px solid black;
}
.dates-item {
  position: relative;
}
.booked-overlay {
  position: absolute;
  color: white;
  z-index: 10;
  background-color: cornflowerblue;
  height: 70%;
  width: 55%;
}
.booked-overlay::after {
  content: attr(data-name);
  /* Остальные стили для псевдоэлемента */
}
.booked-overlay__start {
  right: 0;
  border-radius: 20px 0 0 20px;
}
.booked-overlay__end {
  left: 0;
  border-radius: 0 20px 20px 0;
}
.booked-overlay__transit {
  position: absolute;
  width: 102%;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}
.rooms-container {
  grid-area: 2 / 1 / 8 / 2;
  border: 1px solid orange;
}

.dates-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas: ". . . . . . .";
  grid-area: 1 / 2 / 2 / 3;
  border: 1px solid purple;
}

.date-item {
  border-left: 1px solid gray;
}
.room1 {
  grid-area: 2 / 1 / 3 / 2;
  border: 1px solid gray;
}

.room2 {
  grid-area: 3 / 1 / 4 / 2;
  border: 1px solid gray;
}

.room3 {
  grid-area: 4 / 1 / 5 / 2;
  border: 1px solid gray;
}

.room4 {
  grid-area: 5 / 1 / 6 / 2;
  border: 1px solid gray;
}

.room5 {
  grid-area: 6 / 1 / 7 / 2;
  border: 1px solid gray;
}

.room6 {
  border: 1px solid gray;
  grid-area: 7 / 1 / 8 / 2;
}

.room2-dates {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas: ". . . . . . .";
  grid-area: 3 / 2 / 4 / 3;
  border: 1px solid gray;
}

.room1-dates {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas: ". . . . . . .";
  grid-area: 2 / 2 / 3 / 3;
  border-left: 1px solid gray;
}

.dates-item {
  border: 1px solid gray;
  position: relative;
}

.room3-dates {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas: ". . . . . . .";
  grid-area: 4 / 2 / 5 / 3;
  border: 1px solid gray;
}

.room4-dates {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas: ". . . . . . .";
  grid-area: 5 / 2 / 6 / 3;
  border-left: 1px solid gray;
}

.room5-dates {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas: ". . . . . . .";
  grid-area: 6 / 2 / 7 / 3;
  border: 1px solid gray;
}

.room6-dates {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas: ". . . . . . .";
  grid-area: 7 / 2 / 8 / 3;
  border: 1px solid grared;
}
</style>
