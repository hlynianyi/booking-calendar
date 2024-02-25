<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" v-if="matchingReservation">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          <h1>
            <strong>{{ matchingReservation.name }}</strong>
          </h1>
        </header>
        <section class="modal-body" id="modalDescription">
          <div class="contacts-info">
            <h4>{{ matchingReservation.phone }}</h4>
            <h4>{{ matchingReservation.email }}</h4>
          </div>
          <div class="booking-info">
            <h3>{{ matchingReservation.typeOfApartments }}</h3>
            <h4>
              <strong> {{ matchingReservation.roomDetails.name }} </strong>
            </h4>
            <h4>
              Start date: <strong>{{ matchingReservation.start }}</strong>
            </h4>
            <h4>
              End date: <strong>{{ matchingReservation.end }}</strong>
            </h4>
            <br />
            <h3><strong>Number of Guests:</strong></h3>
            <h4>Adults: {{ matchingReservation.guestInfo.adults }}</h4>
            <h4>Children: {{ matchingReservation.guestInfo.children }}</h4>
          </div>
        </section>
        <br />
        <footer class="modal-footer">
          <button
            type="button"
            class="btn-darkblue"
            @click="close"
            aria-label="Close modal"
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ModalReservationInfo",
  props: {
    room: String,
    date: String,
    reservations: Array,
    actionType: String,
  },
  computed: {
    matchingReservation() {
      const searchingDate = this.actionType === "start" ? "start" : "end";
      return this.reservations.find((reservation) => {
        return (
          reservation.roomDetails.name === this.room &&
          reservation[searchingDate] === this.date
        );
      });
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style>
h1 {
  margin: 0;
  font-size: 1.75rem;
}
h2,
h3,
h4,
h5 {
  margin: 0;
  font-weight: 500;
}
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal {
  background: #ffffff;
  padding: 14px 66px 16px 16px;
  width: auto;
  color: #0c0f39;
  box-shadow: 5px 5px 25px -11px rgba(155, 155, 155, 1);
  border-radius: 10px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 15px 0;
  display: flex;
}
.modal-header {
  position: relative;
}
.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
}
.modal-body {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-weight: normal;
}
.contacts-info {
  font-size: 1.15rem;
}
.booking-info {
  font-size: 1.25rem;
}
.btn-darkblue {
  width: 50%;
  padding: 8px;
  font-size: 1.5em;
  color: white;
  background: #0c0f39;
  border: 1px solid #4aae9b;
  border-radius: 6px;
}
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0.2;
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
