<template>
  <main class="container">
    <!-- week section -->
    <header class="dates-container">
      <div
        class="center date-item"
        v-for="date in currentWeek"
        :key="date"
        :style="isDayToday(date)"
      >
        {{ date }}
      </div>
    </header>
    <!-- rooms section -->
    <aside
      class="center"
      :class="`room${index + 1}`"
      v-for="(room, index) in rooms"
      :key="index"
    >
      {{ room }}
    </aside>
    <!-- days sections -->
    <section
      v-for="(room, roomId) in rooms"
      :class="`room${roomId + 1}-dates`"
      :key="room"
    >
      <div
        class="dates-item center"
        v-for="(date, index) in currentWeek"
        :key="`day-${room}-${index}`"
        :style="isDayToday(date)"
      >
        <span
          v-if="isDateStart(date, room)"
          class="booked-overlay center"
          @click="showModal(room, date, 'start')"
          :style="getOverlayStyle(room, date, 'start')"
          :data-name="getOverlayStyle(room, date, 'start').dataName"
        ></span>
        <span
          v-if="isDateEnd(date, room)"
          class="booked-overlay center"
          @click="showModal(room, date, 'end')"
          :style="getOverlayStyle(room, date, 'end')"
          :data-name="getOverlayStyle(room, date, 'end').dataName"
        ></span>
      </div>
      <ModalReservationInfo
        name="modal"
        v-show="isModalVisible"
        @close="closeModal"
        :room="selectedRoom"
        :date="selectedDate"
        :reservations="reservationsOnCurrentWeek"
        :actionType="actionType"
      />
    </section>
  </main>
</template>

<script>
import ModalReservationInfo from "./ModalReservationInfo.vue";
import { mapState, mapGetters } from "vuex";
import { formatDate } from "../utils/formatDate";

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
          backgroundColor: "palegreen",
        };
      }
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
    getOverlayStyle(roomType, date, actionType) {
      const dates = this.currentWeek.map(
        (day) => new Date(day).toISOString().split("T")[0]
      );

      const reservation = this.reservationsOnCurrentWeek.find(
        (res) => res[actionType] === date && roomType === res.roomDetails.name
      );
      let reservationName = reservation.name ?? "";

      const monday = dates[0];
      const sunday = dates[dates.length - 1];

      let startDayIndex = dates.indexOf(reservation.start) ?? -1;
      let endDayIndex = dates.indexOf(reservation.end) ?? dates.length;

      const startedOnThisWeek = startDayIndex !== -1;
      const finishedOnThisWeek = endDayIndex !== -1;

      let startWidth = startDayIndex === -1 ? 1 : 0.5;
      let endWidth = endDayIndex === dates.length ? 1 : 0.5;

      if (startDayIndex === -1 && reservation.start < monday) {
        startDayIndex = 0;
        startWidth = 1;
      }
      if (endDayIndex === -1 && reservation.end > sunday) {
        endWidth = 1;
      }

      const fullDaysWidth = () => {
        if (actionType === "start" && finishedOnThisWeek === false) {
          return 6 - startDayIndex - 1;
        } else {
          return endDayIndex - startDayIndex - 1;
        }
      };

      const width = (startWidth + endWidth + fullDaysWidth()) * 100;

      const borderRadius = () => {
        if (startedOnThisWeek && finishedOnThisWeek) {
          return "20px";
        } else if (startedOnThisWeek && !finishedOnThisWeek) {
          return "20px 0 0 20px";
        } else {
          return "0 20px 20px 0";
        }
      };

      return {
        position: "absolute",
        width: `${width}%`,
        height: "70%",
        bottom: "5px",
        backgroundColor: "royalblue",
        dataName: reservationName,
        borderRadius: `${borderRadius()}`,
        left: actionType === "start" ? `${50}%` : undefined,
        right: actionType === "end" ? `${50}%` : undefined,
      };
    },
  },
};
</script>

<style scoped>
main {
  position: relative;
  display: grid;
  grid-template-columns: 0.6fr 2fr;
  grid-template-rows: auto 1fr 1fr;
  grid-auto-columns: 1fr;
  grid-auto-rows: 1fr;
  grid-auto-flow: row;
  height: calc(100vh - 50px);
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
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas: ". . . . . . .";
  grid-area: 1 / 2 / 2 / 3;
  border: 1px solid #ccc;
  height: 50px;
  margin-bottom: 12px;
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
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas: ". . . . . . .";
  grid-area: 3 / 2 / 4 / 3;
}

.room1-dates {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 1fr;
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
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 1fr;
  grid-auto-flow: row;
  grid-template-areas: ". . . . . . .";
  grid-area: 4 / 2 / 5 / 3;
}
.room4-dates {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 1fr;
  grid-auto-flow: row;
  grid-template-areas: ". . . . . . .";
  grid-area: 5 / 2 / 6 / 3;
}

.room5-dates {
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas: ". . . . . . .";
  grid-area: 6 / 2 / 7 / 3;
}

.room6-dates {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 1fr;
  grid-auto-flow: row;
  grid-template-areas: ". . . . . . .";
  grid-area: 7 / 2 / 8 / 3;
}
</style>
