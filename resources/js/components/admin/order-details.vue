<template>
  <section style="background-color: white;">
    <section class="products-info">
      <table class="table is-fullwidth" v-show="order.products.length > 0">
        <thead>
          <tr>
            <th>Nazwa produktu</th>
            <th>Rozmiar</th>
            <th>Ilość</th>
            <th>Cena</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in order.products" :key="index">
            <td>{{ product.name }}</td>
            <td>{{ product.pivot.size }}</td>
            <td>{{ product.pivot.quantity }}</td>
            <td>{{ price(product) }} zł</td>
          </tr>
        </tbody>
      </table>

      <table class="table is-fullwidth" v-show="order.custom_order">
        <thead>
          <tr>
            <th>Nazwa produktu</th>
            <th>Rodzaj</th>
            <th>Rozmiar</th>
            <th>Krój</th>
            <th>Tkanina</th>
            <th>Podszewka</th>
            <th>Guziki</th>
            <th>Materiał na tyle</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(id, index) in tkaniny" :key="index">
            <td>Specjalne zamówienie</td>
            <td>{{ females[index] == 1 ? 'Damska' : 'Męska' }}</td>
            <td>{{ sizes[index] }}</td>
            <td>{{ kroje[index] }}</td>
            <td>{{ tkaniny[index] }}</td>
            <td>{{ podszewki[index] }}</td>
            <td>{{ guziki[index] }}</td>
            <td>{{ tyly[index] }}</td>
          </tr>
        </tbody>
      </table>
    </section>
    <section class="address-info">
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>Imię</th>
            <th>Adres</th>
            <th>Adres email</th>
            <th>Numer telefonu</th>
            <th>Metoda wysyłki</th>
            <th>Dodatkowe informacje</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ order.name }}</td>
            <td>{{ order.address }}, {{ order.post_code }}</td>
            <td>{{ order.email }}</td>
            <td>{{ order.phone_number }}</td>
            <td>{{ shippingMethod(order.shipping) }}</td>
            <td>{{ order.additional_info }}</td>
          </tr>
        </tbody>
      </table>
    </section>
    <section class="buttons">
      Zmień status zamówienia:
      <div class="select">
        <select v-model="status" v-on:change="statusChanged()">
          <option>Wybierz nowy status</option>
          <option>Zamówienie wysłane</option>
          <option>Zamówienie anulowane</option>
        </select>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  props: {
    order: Object
  },
  data() {
    return {
      status: "Wybierz nowy status",
      tkaniny: [],
      podszewki: [],
      guziki: [],
      sizes: [],
      kroje: [],
      tyly: [],
      females: []
    };
  },
  methods: {
    price(product) {
      if (product.discountPrice < product.price && product.discountPrice != 0) {
        return product.discountPrice * product.pivot.quantity;
      } else {
        return product.price * product.pivot.quantity;
      }
    },
    statusChanged() {
      axios
        .put("/orders/" + this.order.id, {
          status: this.status
        })
        .catch(error => {
          alert("Wystąpił błąd: " + error);
        });
    },
    string_to_array(str) {
      return str.trim().split(" ");
    },
    shippingMethod(val) {
      if (val == "1") {
        return "Przesyłka krajowa";
      } else if (val == "2") {
        return "Przesyłka między-krajowa";
      } else {
        return "Odbiór osobisty";
      }
    }
  },
  created() {
    if (this.order.custom_order) {
      this.tkaniny = this.string_to_array(this.order.tkanina);
      this.podszewki = this.string_to_array(this.order.podszewka);
      this.guziki = this.string_to_array(this.order.guziki);
      this.sizes = this.string_to_array(this.order.custom_size);
      this.kroje = this.string_to_array(this.order.kroj);
      this.tyly = this.string_to_array(this.order.tyl);
      this.females = this.string_to_array(this.order.female);
    }
  }
};
</script>

<style lang="scss">
.address-info {
  margin-top: 20px;
  padding-bottom: 10px;
}
.buttons {
  padding: 10px;
}
</style>
