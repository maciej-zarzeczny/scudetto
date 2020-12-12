<template>
  <div class="orders-container container">
    <section class="hero welcome is-small orders-header">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">{{ $t('messages.orders') }}</h1>
          <h2 class="subtitle">{{ $t('messages.orders_subtitle') }}</h2>
        </div>
      </div>
    </section>
    <section class="orders">
      <table class="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>{{ $t('messages.order_number') }}</th>
            <th>{{ $t('messages.order_status') }}</th>
            <th>{{ $t('messages.order_date') }}</th>
            <th>{{ $t('messages.order_amount') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in parsedOrders" :key="index">
            <th>{{ order.id }}</th>
            <td>{{ order.status }}</td>
            <td>{{ order.created_at }}</td>
            <td>{{ totalPrice(order) }} zł</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    orders: {}
  },
  data() {
    return {
      parsedOrders: []
    };
  },
  methods: {
    totalPrice(order) {
      var i = 0;
      var total = 0;
      var product = "";
      for (i = 0; i < order.products.length; i++) {
        product = order.products[i];
        if (product.type != 'voucher') {
          if (
          product.discountPrice <= product.price &&
          product.discountPrice != 0
          ) {
            total += product.discountPrice * product.pivot.quantity;
          } else {
            total += product.price * product.pivot.quantity;
          }
        } else {
          const size = product.pivot.size;
          const quantity = product.pivot.quantity;
          switch (size) {
            case 'Dla par':
              total += 550 * quantity;
              break;
            case 'Tata i Syn':
              total += 500 * quantity;
              break;
            case 'Mama i Syn':
              total += 450 * quantity;
              break;
            case 'Kamizelka męska':
              total += 380 * quantity;
              break;
            case 'Kamizelka damska':
              total += 290 * quantity;
              break;
          }
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
    }
  },
  mounted() {
    this.parsedOrders = JSON.parse(this.orders);
  }
};
</script>

<style lang="scss">
@import "~@/_bulma-variables";
@import "~@/_variables";

.orders-container {
  margin-top: 150px !important;
}
.orders-header {
  background-color: #1a1a1a;
}
.orders-header > .hero-body > .container > * {
  color: $accent-color !important;
  padding-right: 0;
  margin-right: 0;
}
</style>
