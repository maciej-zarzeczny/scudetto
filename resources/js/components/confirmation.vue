<template>
  <div class="confirmation-container container">
    <section class="steps-section">
      <ul class="steps is-medium has-content-centered">
        <li class="steps-segment">
          <span class="steps-marker">
            <span class="icon">
              <i class="fa fa-shopping-cart"></i>
            </span>
          </span>
          <div class="steps-content">
            <p class="heading">{{ $t("messages.cart") }}</p>
          </div>
        </li>
        <li class="steps-segment">
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
          <div class="steps-content is-active">
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
    <section class="confirmation-info container">
      <div class="box has-text-centered">
        <div class="content" v-if="!this.error">
          <h3>{{ $t("messages.thank_you") }}</h3>
          <p>
            <strong>{{ $t("messages.order_number") }}</strong>
            {{ number }}
          </p>
          <p>{{ $t("messages.order_final_note") }}</p>
        </div>

        <div class="content" v-if="this.error">
          <h3>{{ $t("messages.confirmation-error") }}</h3>
          <p>{{ $t("messages.confirmation-error-message") }}</p>
        </div>
      </div>
      <a class="button payment-button-checkout" @click="backClicked()">
        <span class="icon is-small">
          <i class="fas fa-arrow-left"></i>
        </span>
        <span>{{ $t("messages.back_button") }}</span>
      </a>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    number: "",
    error: "",
  },
  methods: {
    backClicked() {
      window.location.href = "https://scudetto.store/products";
      // window.location.href = "/products";
    },
  },

  mounted() {
    if (!this.error) {
      cart.removeAllProducts();
      localStorage.removeItem("coupon");
      localStorage.removeItem("transfers24Payment");
      localStorage.removeItem("sessionId");
    }
  },
};
</script>

<style lang="scss">
@import "~@/_bulma-variables";
@import "~@/_variables";

.confirmation-container {
  padding-top: 150px !important;
}
</style>
