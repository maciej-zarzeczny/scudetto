<template>
    <div class="payment-container container">
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
                <li class="steps-segment is-active">
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
        <section class="choose-payment-title-container">
            <h1 class="title">Wybierz metodę płatności</h1>
        </section>
        <section class="payment-info container">
            <div class="columns">
                <div class="column paypal-container">
                    <div id="paypal-button-container"></div>
                </div>
                <div class="column has-text-centered">
                    <img
                        src="/images/page/Przelewy24_logo.svg"
                        alt="Przelewy24"
                        class="przelewy24-button"
                        @click="transfers24Payment()"
                    />
                    <!-- <div class="box has-text-centered" id="normal-payment-box">
            <div class="content">
              <h3>{{ $t('messages.info_for_payment') }}</h3>
              <p>Scudetto S.C.</p>
              <p>
                <strong>33 1140 2004 0000 3102 7922 8673</strong>
              </p>
              <p>
                <strong>{{ $t('messages.payment_title') }}:</strong>
                Opłata za zamówienie nr. {{ number }}
              </p>
              <p>
                <strong>{{ $t('messages.payment_amount') }}:</strong>
                <span
                  class="normal-price"
                  :class="{ 'line-through-price' : isOnDiscount }"
                >{{ amount }}</span>
                <span class="discount-price" v-if="isOnDiscount">{{ discountamount }}</span>
                <span :class="{ 'green-currency' : isOnDiscount}">zł</span>
              </p>
            </div>
          </div>-->
                </div>
            </div>
            <!-- <a class="button payment-button-checkout" @click="nextClicked()">
        <span>{{ $t('messages.next') }}</span>
        <span class="icon is-small">
          <i class="fas fa-arrow-right"></i>
        </span>
      </a>-->
        </section>
    </div>
</template>

<script>
export default {
    props: {
        email: null,
        number: null,
        amount: null,
        discountamount: null
    },
    data() {
        return {
            isOnDiscount: false
        };
    },
    methods: {
        setCookie(name, value, days) {
            let expires = "";
            if (days) {
                let date = new Date();
                date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
                expires = "; expires=" + date.toUTCString();
            }

            document.cookie = name + "=" + (value || "") + expires + "; path=/";
        },
        transfers24Payment() {
            const timestamp = Date.now();
            const sessionId = "session_" + timestamp;

            localStorage.setItem("transfers24Payment", true);
            this.setCookie("sessionId", sessionId, 1);
            this.setCookie("orderId", this.number, 1);

            axios
                .post("/payments/register", {
                    email: this.email,
                    amount:
                        this.discountamount == 0
                            ? this.amount
                            : this.discountamount,
                    sessionId: sessionId
                })
                .then(res => {
                    console.log(res);
                    console.log(res.data.data.token);
                    if (res.data.data.token != undefined) {
                        window.location.href =
                            "https://secure.przelewy24.pl/trnRequest/" +
                            res.data.data.token;
                    }
                })
                .catch(error => {
                    alert(
                        error +
                            "\n\nSpróbuj ponowie, w przypadku powtarzającego się błędu skontaktuj się z właścicielem sklepu."
                    );
                });
        },
        nextClicked() {
            // window.location.href =
            //   "https://scudetto.store/confirmation/" + this.number;
            // window.location.href = "/confirmation/" + this.number;
        }
    },
    mounted() {
        if (this.discountamount != 0) {
            this.isOnDiscount = true;
        }
    }
};
</script>

<style lang="scss">
@import "~@/_bulma-variables";
@import "~@/_variables";

.choose-payment-title-container {
    margin: 50px 0;
    text-align: center;

    h1 {
        font-size: inherit;
    }
}

.przelewy24-button {
    cursor: pointer;
    max-width: 80%;

    &:hover {
        opacity: 0.8;
    }
}

.payment-container {
    padding-top: 150px !important;
}
.normal-price {
    margin-left: 10px;
}
.line-through-price {
    text-decoration: line-through;
}
.discount-price {
    font-size: 15pt;
    margin-left: 5px;
    color: $product-price-color;
}
.green-currency {
    color: $product-price-color;
}
.paypal-container {
    z-index: 0;
}
</style>
