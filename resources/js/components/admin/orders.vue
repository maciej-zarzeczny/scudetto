<template>
  <div>
    <section class="hero is-info welcome is-small">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Zamówienia</h1>
          <h2 class="subtitle">Wszystkie zamówienia złożone w sklepie</h2>
        </div>
      </div>
    </section>
    <section class="orders">
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>Numer zamówienia</th>
            <th>Status zamówienia</th>
            <th>Data złożenia zamówienia</th>
            <th>Kwota zamówienia</th>
            <th>Zniżka</th>
            <th>Szczegóły</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(order, index) in orders"
            :key="index"
            @click="$set(showModal, index, true)"
            :class="setColor(order.status)"
          >
            <th>{{ order.id }}</th>
            <td>{{ order.status }}</td>
            <td>{{ order.created_at }}</td>
            <td>{{ totalPrice(order) }} zł</td>
            <td>{{ (order.discount != null && order.discount != 0) ? order.discount : 0 }} %</td>
            <td class="has-text-centered">
              <i class="fas fa-info-circle"></i>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        v-for="(order, index) in orders"
        :key="index"
        class="modal"
        :class="{ 'is-active' : showModal[index] == true }"
      >
        <div class="modal-background" @click="closeModal(index)"></div>
        <div class="modal-content">
          <order-details :order="order"></order-details>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="closeModal(index)"></button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: [],
      showModal: []
    };
  },
  methods: {
    totalPrice(order) {
      var i = 0;
      var total = 0;
      var product = "";
      for (i = 0; i < order.products.length; i++) {
        product = order.products[i];
        if (
          product.discountPrice <= product.price &&
          product.discountPrice != 0
        ) {
          total += product.discountPrice * product.pivot.quantity;
        } else {
          total += product.price * product.pivot.quantity;
        }
      }
      if (order.custom_order) {
        total += order.custom_order_price;
      }

      if (order.discount != null && order.discount != 0) {
        total *= 1 - order.discount / 100;
      }

      if (order.shipping == "1") {
        total += 15;
      } else if (order.shipping == "2") {
        total += 50;
      }

      return total;
    },
    closeModal(index) {
      this.$set(this.showModal, index, false);
      axios.get("/admin/orders/get").then(response => {
        this.orders = response.data;
      });
    },
    setColor(status) {
      if (status == "Oczekujące na płatność") {
        return "pending";
      } else if (status == "Zamówienie wysłane") {
        return "success";
      } else if (status == "Zamówienie anulowane") {
        return "failed";
      } else if (status == "W trakcie pakowania") {
        return "packed";
      }
    }
  },
  created() {
    axios.get("/admin/orders/get").then(response => {
      this.orders = response.data;
    });
  }
};
</script>

<style lang="scss">
@import "~@/_bulma-variables";
@import "~@/_variables";

tbody > tr:hover {
  cursor: pointer;
}
.packed {
  background-color: $packed-order;
}
.pending {
  background-color: $pending-order;
}
.success {
  background-color: $success-order;
}
.failed {
  background-color: $failed-order;
}
</style>
