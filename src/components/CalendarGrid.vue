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
        <div
          class="center date-item"
          v-for="date in currentWeek"
          :key="date"
          :style="isDayToday(date)"
        >
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
      <!-- dates section -->
      <div class="room1-dates">
        <div
          class="dates-item center"
          v-for="(date, index) in currentWeek"
          :key="`day-${index}`"
          :style="isDayToday(date)"
        >
          <span
            v-if="isDateStart(date, 'Premier Suite')"
            class="booked-overlay center"
            :style="getOverlayStyle('Premier Suite', 'start')"
            :data-name="getOverlayStyle('Premier Suite', 'start').dataName"
            @click="showModal('Premier Suite', date, 'start')"
          ></span>
          <span
            v-if="isDateEnd(date, 'Premier Suite')"
            class="booked-overlay center"
            :style="getOverlayStyle('Premier Suite', 'end')"
            :data-name="getOverlayStyle('Premier Suite', 'end').dataName"
            @click="showModal('Premier Suite', date, 'end')"
          ></span>
        </div>
        <ModalReservationInfo
          v-show="isModalVisible"
          @close="closeModal"
          :room="selectedRoom"
          :date="selectedDate"
          :reservations="this.reservationsOnCurrentWeek"
          :actionType="actionType"
        />
      </div>
      <div class="room2-dates">
        <div
          class="dates-item center"
          v-for="(date, index) in currentWeek"
          :key="`day-${index}`"
          :style="isDayToday(date)"
        >
          <span
            v-if="isDateStart(date, 'Superior Room')"
            class="booked-overlay center"
            :style="getOverlayStyle('Superior Room', 'start')"
            :data-name="getOverlayStyle('Superior Room', 'start').dataName"
            @click="showModal('Superior Room', date, 'start')"
          ></span>
          <span
            v-if="isDateEnd(date, 'Superior Room')"
            class="booked-overlay center"
            :style="getOverlayStyle('Superior Room', 'end')"
            :data-name="getOverlayStyle('Superior Room', 'end').dataName"
            @click="showModal('Superior Room', date, 'end')"
          ></span>
        </div>
        <ModalReservationInfo
          v-show="isModalVisible"
          @close="closeModal"
          :room="selectedRoom"
          :date="selectedDate"
          :reservations="this.reservationsOnCurrentWeek"
          :actionType="actionType"
        />
      </div>

      <div class="room3-dates">
        <div
          class="dates-item center"
          v-for="(date, index) in currentWeek"
          :key="`day-${index}`"
          :style="isDayToday(date)"
        >
          <span
            v-if="isDateStart(date, 'Grand Executive')"
            class="booked-overlay center"
            :style="getOverlayStyle('Grand Executive', 'start')"
            :data-name="getOverlayStyle('Grand Executive', 'start').dataName"
            @click="showModal('Grand Executive', date, 'start')"
          ></span>
          <span
            v-if="isDateEnd(date, 'Grand Executive')"
            class="booked-overlay center"
            :style="getOverlayStyle('Grand Executive', 'end')"
            :data-name="getOverlayStyle('Grand Executive', 'end').dataName"
            @click="showModal('Grand Executive', date, 'end')"
          ></span>
        </div>
        <ModalReservationInfo
          v-show="isModalVisible"
          @close="closeModal"
          :room="selectedRoom"
          :date="selectedDate"
          :reservations="this.reservationsOnCurrentWeek"
          :actionType="actionType"
        />
      </div>
      <div class="room4-dates">
        <div
          class="dates-item center"
          v-for="(date, index) in currentWeek"
          :key="`day-${index}`"
          :style="isDayToday(date)"
        >
          <span
            v-if="isDateStart(date, 'Suite Luxury')"
            class="booked-overlay center"
            :style="getOverlayStyle('Suite Luxury', 'start')"
            :data-name="getOverlayStyle('Suite Luxury', 'start').dataName"
            @click="showModal('Suite Luxury', date, 'start')"
          ></span>
          <span
            v-if="isDateEnd(date, 'Suite Luxury')"
            class="booked-overlay center"
            :style="getOverlayStyle('Suite Luxury', 'end')"
            :data-name="getOverlayStyle('Suite Luxury', 'end').dataName"
            @click="showModal('Suite Luxury', date, 'end')"
          ></span>
        </div>
        <ModalReservationInfo
          v-show="isModalVisible"
          @close="closeModal"
          :room="selectedRoom"
          :date="selectedDate"
          :reservations="this.reservationsOnCurrentWeek"
          :actionType="actionType"
        />
      </div>
      <div class="room5-dates">
        <div
          class="dates-item center"
          v-for="(date, index) in currentWeek"
          :key="`day-${index}`"
          :style="isDayToday(date)"
        >
          <span
            v-if="isDateStart(date, 'Suite Classic Room')"
            class="booked-overlay center"
            :style="getOverlayStyle('Suite Classic Room', 'start')"
            :data-name="getOverlayStyle('Suite Classic Room', 'start').dataName"
            @click="showModal('Suite Classic Room', date, 'start')"
          ></span>
          <span
            v-if="isDateEnd(date, 'Suite Classic Room')"
            class="booked-overlay center"
            :style="getOverlayStyle('Suite Classic Room', 'end')"
            :data-name="getOverlayStyle('Suite Classic Room', 'end').dataName"
            @click="showModal('Suite Classic Room', date, 'end')"
          ></span>
        </div>
        <ModalReservationInfo
          v-show="isModalVisible"
          @close="closeModal"
          :room="selectedRoom"
          :date="selectedDate"
          :reservations="this.reservationsOnCurrentWeek"
          :actionType="actionType"
        />
      </div>
      <div class="room6-dates">
        <div
          class="dates-item center"
          v-for="(date, index) in currentWeek"
          :key="`day-${index}`"
          :style="isDayToday(date)"
        >
          <span
            v-if="isDateStart(date, 'Penthouse Suite')"
            class="booked-overlay center"
            :style="getOverlayStyle('Penthouse Suite', 'start')"
            :data-name="getOverlayStyle('Penthouse Suite', 'start').dataName"
            @click="showModal('Penthouse Suite', date, 'start')"
          ></span>
          <span
            v-if="isDateEnd(date, 'Penthouse Suite')"
            class="booked-overlay center"
            :style="getOverlayStyle('Penthouse Suite', 'end')"
            :data-name="getOverlayStyle('Penthouse Suite', 'end').dataName"
            @click="showModal('Penthouse Suite', date, 'end')"
          ></span>
        </div>
        <ModalReservationInfo
          v-show="isModalVisible"
          @close="closeModal"
          :room="selectedRoom"
          :date="selectedDate"
          :reservations="this.reservationsOnCurrentWeek"
          :actionType="actionType"
        />
      </div>
    </section>
  </main>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import ModalReservationInfo from "./ModalReservationInfo.vue";
import { formatDate } from "../helpers/formatDate";

export default {
  name: "calendar-container",
  components: {
    ModalReservationInfo,
  },
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
      isModalVisible: false,
      selectedRoom: "",
      selectedDate: null,
      actionType: null,
    };
  },
  mounted() {
    this.$store.dispatch("initializeOrUpdateWeek");
  },
  computed: {
    ...mapState(["currentWeek", "currentDay"]),
    ...mapGetters({
      allEvents: "allEvents",
      todayWeek: "todayWeek",
      reservationsOnCurrentWeek: "reservationsOnCurrentWeek",
    }),
  },
  methods: {
    showModal(room, date, type) {
      this.selectedRoom = room;
      this.selectedDate = date;
      this.actionType = type;
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    isDayToday(date) {
      if (formatDate(this.currentDay) === date) {
        return {
          backgroundColor: "lightgreen",
        };
      }
    },
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
      console.log("------------- :>> ", newWeek);
      this.$store.commit("updateCurrentWeek", newWeek);
    },
    formatDate(date) {
      return date.toISOString().split("T")[0];
    },
    isDateStart(date, roomType) {
      return this.reservationsOnCurrentWeek.some(
        (reservation) =>
          reservation.roomDetails.name === roomType &&
          reservation.start === date
      );
    },
    isDateEnd(date, roomType) {
      return this.reservationsOnCurrentWeek.some((reservation) => {
        return (
          reservation.roomDetails.name === roomType &&
          reservation.end === date &&
          !this.currentWeek.includes(reservation.start)
        );
      });
    },
    getOverlayStyle(roomType, actionType) {
      const dates = this.currentWeek.map((day) => new Date(day));
      let startWidth = 0.5;
      let endWidth = 0.5;

      let startDayIndex = null;
      let endDayIndex = null;
      let reservationName = "";

      this.reservationsOnCurrentWeek.forEach((reservation) => {
        if (reservation.roomDetails.name === roomType) {
          switch (actionType) {
            case "start":
              {
                const startIndex = dates.findIndex(
                  (date) =>
                    date.toISOString().split("T")[0] === reservation.start
                );
                const endIndex = dates.findIndex(
                  (date) => date.toISOString().split("T")[0] === reservation.end
                );

                if (startIndex > 0) {
                  startDayIndex = startIndex;
                }

                if (endIndex > 0) {
                  endDayIndex = endIndex;
                } else {
                  endDayIndex = 7;
                  endWidth = 1;
                }
                // Проверяем, совпадает ли индекс дня с началом или концом бронирования
                if (
                  (actionType === "start" && startIndex >= 0) ||
                  (actionType === "end" && endIndex >= 0)
                ) {
                  reservationName = reservation.name; // Устанавливаем имя для отображения
                }
              }
              break;
            case "end": {
              startDayIndex = 0;
              const endIndex = dates.findIndex(
                (date) => date.toISOString().split("T")[0] === reservation.end
              );
              if (endIndex > 0) {
                endDayIndex = endIndex;
                startWidth = 1;
              }
              // Проверяем, совпадает ли индекс дня с началом или концом бронирования
              if (
                (actionType === "start" && startDayIndex >= 0) ||
                (actionType === "end" && endIndex >= 0)
              ) {
                reservationName = reservation.name; // Устанавливаем имя для отображения
              }
              break;
            }
          }
        }
      });

      if (
        startDayIndex === null ||
        endDayIndex === null ||
        reservationName === ""
      ) {
        return {
          display: "none",
        };
      }

      const fullDaysWidth =
        endDayIndex === 7
          ? (endDayIndex - startDayIndex - 2) * 1
          : (endDayIndex - startDayIndex - 1) * 1;

      const width = (startWidth + endWidth + fullDaysWidth) * 100;

      const style = {
        position: "absolute",
        width: `${width}%`,
        height: "70%",
        bottom: "5px",
        backgroundColor: "royalblue",
        dataName: reservationName,
        ...(actionType === "start" && { left: `${47}%` }),
        ...(actionType === "end" && { right: `${47}%` }),
        ...(startDayIndex > 0 &&
          endDayIndex !== 7 && { borderRadius: "20px 20px 20px 20px" }),
        ...(actionType === "start" &&
          endDayIndex === 7 && { borderRadius: "20px 0 0 20px" }),
        ...(actionType === "start" &&
          endDayIndex < startDayIndex && { borderRadius: "20px 0 0 20px" }),
        ...(actionType === "end" &&
          endDayIndex !== 7 && { borderRadius: "0px 20px 20px 0px" }),
      };

      return style;
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
  border: 0;
  position: relative;
  width: auto;
  margin-top: 12px;
  display: grid;
  grid-template-columns: 0.4fr 1.6fr;
  grid-template-rows: repeat(7, 1fr);
  grid-auto-columns: 1fr;
  grid-auto-rows: 1fr;
  grid-auto-flow: row;
  height: 90vh;
}
.dates-item {
  position: relative;
}
.booked-overlay {
  position: absolute;
  color: white;
  z-index: 10;
  background-color: cornflowerblue;
}
.booked-overlay::after {
  content: attr(data-name);
  font-size: 14px;
  padding: 0 12px;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}

.dates-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas: ". . . . . . .";
  grid-area: 1 / 2 / 2 / 3;
  border: 1px solid #ccc;
  margin-bottom: 4px;
}

.date-item {
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.date-item:last-child {
  border-right: none;
}
.room1,
.room2,
.room3,
.room4,
.room5,
.room6 {
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  color: green;
}
.room1 {
  border-top: 1px solid #ccc;
  grid-area: 2 / 1 / 3 / 2;
}
.room2 {
  grid-area: 3 / 1 / 4 / 2;
}

.room3 {
  grid-area: 4 / 1 / 5 / 2;
}

.room4 {
  grid-area: 5 / 1 / 6 / 2;
}

.room5 {
  grid-area: 6 / 1 / 7 / 2;
}

.room6 {
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
}

.room1-dates {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas: ". . . . . . .";
  grid-area: 2 / 2 / 3 / 3;
}

.dates-item {
  position: relative;
  border: 1px solid #ccc;
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
}

.room4-dates {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas: ". . . . . . .";
  grid-area: 5 / 2 / 6 / 3;
}

.room5-dates {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas: ". . . . . . .";
  grid-area: 6 / 2 / 7 / 3;
}

.room6-dates {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas: ". . . . . . .";
  grid-area: 7 / 2 / 8 / 3;
}
</style>
