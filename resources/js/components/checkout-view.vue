<template>
  <div class="checkout-container container">
    <section class="steps-section">
      <ul class="steps is-medium has-content-centered">
        <li class="steps-segment">
          <a href="/cart" class="steps-marker">
            <span class="icon">
              <i class="fa fa-shopping-cart"></i>
            </span>
          </a>
          <div class="steps-content">
            <p class="heading">{{ $t("messages.cart") }}</p>
          </div>
        </li>
        <li class="steps-segment is-active">
          <span href="#" class="steps-marker">
            <span class="icon">
              <i class="fas fa-user"></i>
            </span>
          </span>
          <div class="steps-content">
            <p class="heading">{{ $t("messages.sending_data") }}</p>
          </div>
        </li>
        <li class="steps-segment">
          <span class="steps-marker">
            <span class="icon">
              <i class="fas fa-dollar-sign"></i>
            </span>
          </span>
          <div class="steps-content">
            <p class="heading">{{ $t("messages.payment_step") }}</p>
          </div>
        </li>
        <li class="steps-segment">
          <span class="steps-marker">
            <span class="icon">
              <i class="fas fa-check"></i>
            </span>
          </span>
          <div class="steps-content">
            <p class="heading">
              {{ $t("messages.confirmation_step") }}
            </p>
          </div>
        </li>
      </ul>
    </section>
    <section class="checkout-form">
      <form @submit.prevent="makeOrder()">
        <div class="field">
          <label class="label">
            {{ $t("messages.checkout_name") }}
            <span class="star">*</span>
          </label>
          <div class="control">
            <input
              class="input is-medium"
              type="text"
              v-model="name"
              :class="{ 'is-danger': errors.includes('name') }"
              @focus="eraseErrors()"
            />
          </div>
        </div>

        <div class="field">
          <label class="label">
            {{ $t("messages.checkout_email") }}
            <span class="star">*</span>
          </label>
          <div class="control">
            <input
              class="input is-medium"
              type="email"
              v-model="email"
              :class="{ 'is-danger': errors.includes('email') }"
              @focus="eraseErrors()"
            />
          </div>
        </div>

        <label class="label">{{ $t("messages.checkout_phone") }}</label>
        <div class="field has-addons">
          <div class="control">
            <a class="button is-static is-medium">+48</a>
          </div>
          <div class="control is-expanded">
            <input class="input is-medium" type="tel" v-model="phone_number" />
          </div>
        </div>

        <div class="field">
          <label class="label">
            {{ $t("messages.checkout_address") }}
            <span class="star">*</span>
          </label>
          <div class="control">
            <input
              class="input is-medium is-medium"
              type="text"
              v-model="address"
              :class="{ 'is-danger': errors.includes('address') }"
              @focus="eraseErrors()"
            />
          </div>
        </div>

        <div class="field">
          <label class="label">
            {{ $t("messages.checkout_post_code") }}
            <span class="star">*</span>
          </label>
          <div class="control">
            <input
              class="input is-medium"
              type="text"
              v-model="postCode"
              :class="{
                'is-danger': errors.includes('postCode'),
              }"
              @focus="eraseErrors()"
            />
          </div>
        </div>

        <div class="field">
          <label class="label">{{ $t("messages.checkout-shipping") }}</label>
          <div class="control">
            <div class="select">
              <select v-model="shippingMethod">
                <option value="1">
                  {{ $t("messages.shipping-method-1") }}
                </option>
                <option value="2">
                  {{ $t("messages.shipping-method-2") }}
                </option>
                <option value="3">
                  {{ $t("messages.shipping-method-3") }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div class="field">
          <label class="label">{{ $t("messages.checkout_info") }}</label>
          <div class="control">
            <textarea
              class="textarea has-fixed-size"
              v-model="additionalInfo"
            ></textarea>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <label
              class="checkbox"
              :class="{ 'no-terms': errors.includes('terms') }"
            >
              <input type="checkbox" v-model="terms" />
              <span>
                {{ $t("messages.checkout_accept") }}
                <a href="/terms">
                  {{ $t("messages.checkout_terms") }}
                  <span class="star">*</span>
                </a>
              </span>
            </label>
          </div>
        </div>

        <div class="notification is-danger" v-if="errors.length">
          <p>{{ $t("messages.required_fields") }}</p>
        </div>

        <a
          class="button payment-button-checkout"
          :class="{ 'is-loading': btnLoading }"
          @click="makeOrder()"
        >
          <span>{{ $t("messages.next") }}</span>
          <span class="icon is-small">
            <i class="fas fa-arrow-right"></i>
          </span>
        </a>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    userobject: String,
  },
  data() {
    return {
      errors: [],
      cartProducts: [],
      name: null,
      address: null,
      postCode: null,
      shippingMethod: "1",
      additionalInfo: null,
      email: null,
      phone_number: null,
      terms: null,
      user: null,
      btnLoading: false,
      payWithPaypal: false,
    };
  },
  methods: {
    eraseErrors() {
      this.errors = [];
    },
    makeOrder() {
      this.errors = [];

      if (!this.name) {
        this.errors.push("name");
      }
      if (!this.email) {
        this.errors.push("email");
      }
      if (!this.address) {
        this.errors.push("address");
      }
      if (!this.postCode) {
        this.errors.push("postCode");
      }
      if (!this.terms) {
        this.errors.push("terms");
      }

      if (this.errors.length) {
        return;
      }

      this.btnLoading = true;
      var discount = null;
      if (localStorage.getItem("coupon") != null) {
        discount = JSON.parse(localStorage.getItem("coupon")).discount;
      }

      axios
        .post("/orders", {
          name: this.name,
          phoneNumber: this.phone_number,
          email: this.email,
          address: this.address,
          postCode: this.postCode,
          additionalInfo: this.additionalInfo,
          status: "Oczekujące na płatność",
          products: JSON.stringify(this.cartProducts),
          discount: discount != null ? discount : 0,
          shipping: this.shippingMethod,
        })
        .then((response) => {
          var i = 0;
          for (i = 0; i < this.cartProducts.length; i++) {
            var custom = false;
            var custom_tkanina = "";
            var custom_podszewka = "";
            if (this.cartProducts[i].customProduct != null) {
              custom = true;
              custom_tkanina = this.cartProducts[i].tkanina;
              custom_podszewka = this.cartProducts[i].podszewka;
              this.cartProducts[i].id = 0;
            }
            axios
              .post("products/updateSize/" + this.cartProducts[i].id, {
                choosedSize: this.cartProducts[i].size,
                choosedAmount: this.cartProducts[i].amount,
                customProduct: custom,
                tkanina: custom_tkanina,
                podszewka: custom_podszewka,
              })
              .catch((error) => {
                console.log("Size update error" + error);
              });
          }
          window.location.href =
            // "https://scudetto.store/payment/" + response.data;
            window.location.href = "/payment/" + response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    string_to_array(str) {
      return str.trim().split(" ");
    },
  },
  mounted() {
    this.cartProducts = cart.products;
    if (this.userobject != null) {
      this.user = JSON.parse(this.userobject);
      this.name = this.user.name;
      this.email = this.user.email;
      this.phone_number = this.user.phone;
    }
  },
};
</script>

<style lang="scss">
@import "~@/_bulma-variables";
@import "~@/_variables";

.steps-marker > span {
  color: white !important;
}
.steps-section {
  padding-top: 50px;
  margin-bottom: 70px;
}
.checkout-container {
  padding-top: 150px !important;
}
.checkout-header {
  background-color: $accent_color;
}
.checkout-header > .hero-body > .container > * {
  color: white !important;
  padding-right: 0;
  margin-right: 0;
}
.payment-button-checkout {
  margin-top: 20px;
  margin-bottom: 50px;
  padding: 15px;
  border-color: #1a1a1a !important;
  color: #1a1a1a !important;
  transition: all 0.3s ease-in-out;
}
.payment-button-checkout:hover {
  background-color: #1a1a1a !important;
  color: $accent_color !important;
}
.star {
  color: $red-alert-color;
}
.no-terms > * {
  color: $red-alert-color;
}
</style>
