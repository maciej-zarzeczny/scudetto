<template>
  <div class="configurator-container container is-fluid" id="configurator-page">
    <section class="configurator has-text-centered">
      <span class="txt">{{ $t("messages.kroj") }}</span>
      <div class="choice-container-parent">
        <p class="buttons choice-container" v-if="krojeReady">
          <a
            class="button"
            v-for="(kroj, index) in kroje"
            :key="index"
            @click="changeKroj(kroj)"
          >
            <figure class="image is-64x64 style-button">
              <img
                :src="'/images/creator/' + kroj.name + '.png'"
                alt="Cut image"
              />
            </figure>
          </a>
        </p>
      </div>

      <div class="sizes-parent">
        <span class="txt">{{ $t("messages.size") }}</span>
        <div class="buttons are-small size-buttons sizes-container">
          <a
            class="button"
            v-for="size in sizes"
            :key="size.id"
            :class="{ 'active-size': size.id == selected }"
            @click="selected = size.id"
            >{{ size.sizeName }}</a
          >
        </div>
        <button
          class="button sizes-button is-outlined"
          @click="showModal = true"
        >
          <span>{{ $t("messages.sizes-table") }}</span>
        </button>
        <p class="price-text" v-if="krojeReady">
          {{ $t("messages.configurator-price") }}
          <span class="price-text-green">{{ calculatePrice() }} zł</span>
        </p>
      </div>

      <div class="columns">
        <!-- TKANINY -->
        <div class="column" :class="columnSize">
          <span class="txt">{{ $t("messages.tkanina") }}</span>
          <div class="choice-container-parent">
            <div v-if="tkaninyReady">
              <p
                class="buttons choice-container"
                v-for="index in Math.ceil(tkaniny.length / 3)"
                :key="index"
              >
                <a
                  class="button"
                  v-for="columnIndex in 3"
                  v-once
                  :key="columnIndex"
                  :disabled="tkaniny[tkaninyIndex].quantity == 0"
                >
                  <figure
                    class="image is-32x32"
                    @click="tkaninaChange(index, columnIndex)"
                  >
                    <img
                      v-once
                      :src="tkaniny[tkaninyIndex].icon_url"
                      alt="Material icon"
                      v-show="renderTkaniny"
                    />
                  </figure>
                  {{ incrementTkaniny() }}
                </a>
              </p>
            </div>
          </div>
        </div>
        <!-- PREVIEW -->
        <div class="column images-container" :class="mainColumnSize">
          <div class="columns">
            <div class="column">
              <figure class="image config-img-parent">
                <img
                  :src="
                    '/images/creator/' +
                    podszewki[podszewkiNumber].name +
                    '.png'
                  "
                  v-if="podszewkiReady"
                />
                <img
                  :src="
                    '/images/creator/' +
                    kroj.name +
                    '/' +
                    tkaniny[tkaninyNumber].name +
                    '.png'
                  "
                  v-if="tkaninyReady && krojeReady"
                />
                <img
                  :src="
                    '/images/creator/' + kroj.name + '/' + guzik.name + '.png'
                  "
                  v-if="guzikiReady && krojeReady"
                />
              </figure>
            </div>
            <div class="column">
              <figure class="image config-img-parent" v-if="tkaninyReady">
                <img
                  :src="tkaniny[tkaninyNumber].back_image_url"
                  v-show="!tylPodszewka"
                />
                <img
                  :src="podszewki[podszewkiNumber].back_image_url"
                  v-show="tylPodszewka"
                  v-if="podszewkiReady"
                />
                <img
                  :src="tkaniny[tkaninyNumber].single_addon_url"
                  v-show="!showKolnierz"
                />
                <img
                  :src="tkaniny[tkaninyNumber].addon_with_collar_url"
                  v-show="showKolnierz"
                />
              </figure>
            </div>
          </div>
        </div>
        <!-- PODSZEWKI -->
        <div class="column" :class="columnSize">
          <span class="txt">{{ $t("messages.podszewka") }}</span>
          <div class="choice-container-parent">
            <div v-if="podszewkiReady">
              <p
                class="buttons choice-container"
                v-for="index in Math.ceil(podszewki.length / 3)"
                :key="index"
              >
                <a
                  class="button"
                  v-once
                  v-for="columnIndex in 3"
                  :key="columnIndex"
                  :disabled="podszewki[podszewkiIndex].quantity == 0"
                >
                  <figure
                    class="image is-32x32"
                    @click="podszewkaChange(index, columnIndex)"
                  >
                    <img
                      v-once
                      :src="podszewki[podszewkiIndex].icon_url"
                      alt="Fleece icon"
                      v-show="renderPodszewki"
                    />
                  </figure>
                  {{ incrementPodszewki() }}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <span class="txt">{{ $t("messages.tyl") }}</span>
      <div class="choice-container-parent">
        <div class="control">
          <label class="radio">
            <input
              type="radio"
              :checked="!tylPodszewka"
              @click="changeBack(1)"
            />
            {{ $t("messages.tkanina") }}
          </label>
          <label class="radio">
            <input
              type="radio"
              :checked="tylPodszewka"
              @click="changeBack(2)"
            />
            {{ $t("messages.podszewka") }}
          </label>
        </div>
      </div>

      <!-- GUZIKI -->
      <span class="txt">{{ $t("messages.buttons") }}</span>
      <p class="buttons choice-container2" v-if="guzikiReady">
        <a class="button" v-for="(guzik, index) in guziki" :key="index">
          <figure class="image is-32x32" @click="changeGuziki(guzik)">
            <img :src="guzik.icon_url" alt="Button icon" />
          </figure>
        </a>
      </p>

      <button class="button ready-button is-outlined" @click="makeOrder()">
        <span>{{ $t("messages.add_to_cart") }}</span>
      </button>
      <p class="small-txt">{{ $t("messages.vest-color") }}</p>
      <div class="modal" :class="{ 'is-active': showModal }">
        <div class="modal-background" @click="showModal = false"></div>
        <div class="modal-content">
          <table class="table sizes-modal is-fullwidth">
            <thead>
              <tr>
                <th>Rozmiar</th>
                <th>44</th>
                <th>46</th>
                <th>48</th>
                <th>50</th>
                <th>52</th>
                <th>54</th>
                <th>56</th>
                <th>58</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Obwód klatki piersiowej</th>
                <td>89-92</td>
                <td>93-96</td>
                <td>97-100</td>
                <td>101-104</td>
                <td>105-108</td>
                <td>109-112</td>
                <td>113-116</td>
                <td>117-120</td>
              </tr>
              <tr>
                <th>Obwód talii</th>
                <td>83-86</td>
                <td>87-90</td>
                <td>91-94</td>
                <td>95-98</td>
                <td>99-102</td>
                <td>103-106</td>
                <td>107-110</td>
                <td>111-114</td>
              </tr>
              <tr>
                <th>Długość pleców</th>
                <td>57</td>
                <td>57,5</td>
                <td>58</td>
                <td>58,5</td>
                <td>59</td>
                <td>59,5</td>
                <td>60</td>
                <td>60,5</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button
          class="modal-close is-large"
          aria-label="close"
          @click="showModal = false"
        ></button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tylPodszewka: false,
      tkanina: null,
      podszewka: null,
      guzik: null,
      kroj: null,
      showKolnierz: false,

      tkaniny: [],
      tkaninyIndex: 0,
      tkaninyReady: false,
      renderTkaniny: true,
      tkaninyNumber: 0,

      podszewki: [],
      podszewkiIndex: 0,
      podszewkiReady: false,
      renderPodszewki: true,
      podszewkiNumber: 0,

      kroje: [],
      krojeReady: false,

      guziki: [],
      guzikiReady: false,
      guzikiNumber: 0,

      sizes: [],
      selected: "",
      showModal: false,
      windowWidth: null,
      xLargeScreen: false,
    };
  },
  methods: {
    tkaninaChange(index, columnIndex) {
      let idx = (index - 1) * 3 + columnIndex - 1;
      if (this.tkaniny[idx].quantity == 0) return;

      this.tkaninyNumber = idx;
    },
    podszewkaChange(index, columnIndex) {
      let idx = (index - 1) * 3 + columnIndex - 1;
      if (this.podszewki[idx].quantity == 0) return;

      this.podszewkiNumber = idx;
    },
    changeKroj(kroj) {
      this.kroj = kroj;
      if (this.kroj.has_collar == "true") {
        this.showKolnierz = true;
      } else {
        this.showKolnierz = false;
      }
    },
    changeGuziki(guzik) {
      this.guzik = guzik;
    },
    changeBack(id) {
      if (id == "1") {
        this.tylPodszewka = false;
      } else {
        this.tylPodszewka = true;
      }
    },
    calculatePrice() {
      var basicPrice = 340;
      var calculatedPrice = basicPrice;
      if (this.kroj.has_collar == "true") {
        calculatedPrice += 20;
      }
      if (this.tylPodszewka == false) {
        calculatedPrice += 30;
      }

      return calculatedPrice;
    },
    makeOrder() {
      if (this.selected == "") {
        alert("Wybierz rozmiar");
      } else {
        var tyl = "";
        if (this.tylPodszewka) {
          tyl = "podszewka";
        } else {
          tyl = "tkanina";
        }
        var guzikNumber = 0;
        for (var i = 0; i < this.guziki.length; i++) {
          if (this.guzik.id == this.guziki[i].id) {
            guzikNumber = i + 1;
          }
        }
        var krojNumber = 0;
        for (var i = 0; i < this.kroje.length; i++) {
          if (this.kroj.id == this.kroje[i].id) {
            krojNumber = i + 1;
          }
        }

        axios.put("/tkanina/" + String(this.tkaniny[this.tkaninyNumber].id), {
          quantity: this.tkaniny[this.tkaninyNumber].quantity - 1,
        });
        axios.put(
          "/podszewka/" + String(this.podszewki[this.podszewkiNumber].id),
          {
            quantity: this.podszewki[this.podszewkiNumber].quantity - 1,
          }
        );

        var product = {};
        product.customProduct = true;
        product.name = this.$t("messages.custom_product");
        product.price = this.calculatePrice();
        product.amount = 1;
        product.tkanina = String(this.tkaninyNumber + 1);
        product.podszewka = String(this.podszewkiNumber + 1);
        product.guziki = String(guzikNumber);
        product.tyl = tyl;
        product.kroj = String(krojNumber);
        product.female = "0";
        var i = 0;
        var sizeName = "";
        for (i = 0; i < this.sizes.length; i++) {
          if (this.sizes[i].id == this.selected) {
            sizeName = this.sizes[i].sizeName;
          }
        }
        product.size = sizeName;
        cart.addProduct(product);
        window.location.href = "/cart";
      }
    },
    incrementTkaniny() {
      if (this.tkaninyIndex < this.tkaniny.length - 1) {
        this.tkaninyIndex++;
      } else {
        this.renderTkaniny = false;
      }
    },
    incrementPodszewki() {
      if (this.podszewkiIndex < this.podszewki.length - 1) {
        this.podszewkiIndex++;
      } else {
        this.renderPodszewki = false;
      }
    },
    resizeHandler() {
      var width = (this.windowWidth = window.innerWidth);
      if (width >= 2000) {
        this.xLargeScreen = true;
      } else {
        this.xLargeScreen = false;
      }
    },
    print(value) {
      console.log(value);
    },
  },
  computed: {
    columnSize: function () {
      if (this.xLargeScreen) {
        return "is-3";
      } else {
        return "is-2";
      }
    },
    mainColumnSize: function () {
      if (this.xLargeScreen) {
        return "is-6";
      } else {
        return "is-8";
      }
    },
  },
  created() {
    axios.get("kroj/male").then((response) => {
      this.kroje = response.data;
      this.kroj = this.kroje[0];
      this.krojeReady = true;
    });
    axios.get("sizes/male").then((response) => {
      this.sizes = response.data;
    });
    axios.get("tkanina/male").then((response) => {
      this.tkaniny = response.data;
      this.tkaninyReady = true;

      for (let i = 0; i < this.tkaniny.length; i++) {
        if (this.tkaniny[i].quantity != 0) {
          this.tkaninyNumber = i;
          break;
        }
      }
    });
    axios.get("podszewka/get").then((response) => {
      this.podszewki = response.data;
      this.podszewkiReady = true;

      for (let i = 0; i < this.podszewki.length; i++) {
        if (this.podszewki[i].quantity != 0) {
          this.podszewkiNumber = i;
          break;
        }
      }
    });
    axios.get("button/male").then((response) => {
      this.guziki = response.data;
      this.guzik = this.guziki[0];
      this.guzikiReady = true;
    });

    window.addEventListener("resize", this.resizeHandler);
    this.resizeHandler();
  },
};
</script>

<style lang="scss">
@import "~@/_bulma-variables.scss";
@import "~@/_variables.scss";

.configurator-container {
  padding-top: 150px;
  height: 100vh;
}
.configurator-header > .hero-body > .container > * {
  color: $accent_color !important;
  padding-right: 0;
  margin-right: 0;
}
.choice-container-parent {
  width: 100%;
  display: flex;
  justify-content: center;
}
.choice-container-parent > .control > label {
  margin-bottom: 30px !important;
}
.choice-container {
  margin-top: 15px;
}
.choice-container2 {
  margin-top: 15px;
  width: 100%;
  display: flex;
  justify-content: center;
}
.choice-container > .button {
  outline: none;
  border: none;
  padding: 0;
  margin: 0;
  padding-left: 5px;
}
.choice-container > .button > figure {
  transition: all 0.2s ease-in-out;
}
.choice-container > .button > figure:hover {
  transform: scale(2);
  z-index: 10;
}
.choice-container2 > .button {
  outline: none;
  border: none;
  padding: 0;
  margin: 0;
  padding-left: 5px;
}
.choice-container2 > .button > figure {
  transition: all 0.2s ease-in-out;
}
.choice-container2 > .button > figure:hover {
  transform: scale(1.5);
  z-index: 10;
}
.txt {
  font-size: 16pt;
  font-weight: 600;
}
.image-column {
  display: flex;
  justify-content: center;
  min-height: 200px;
  margin-bottom: 250px;
  margin-top: -30px;
}
.image-column2 {
  display: flex;
  justify-content: center;
  min-height: 200px;
  margin-bottom: 250px;
  margin-top: -30px;
}
.ready-button {
  margin-top: 50px;
  border: 1px solid #1a1a1a !important;
  color: #1a1a1a !important;
  background-color: transparent;
  transition: all 0.3s ease-in-out;
}
.ready-button:hover {
  border-color: #1a1a1a !important;
  color: $accent_color !important;
  background-color: #1a1a1a !important;
}
.sizes-button {
  margin-top: -20px;
  border: 1px solid #1a1a1a !important;
  color: #1a1a1a !important;
  background-color: transparent;
  transition: all 0.3s ease-in-out;
}
.sizes-button:hover {
  border-color: #1a1a1a !important;
  color: $accent_color !important;
  background-color: #1a1a1a !important;
}
.small-txt {
  margin-top: 5px;
  padding-bottom: 50px;
  font-size: 10pt;
}
.price-text {
  color: #4a4a4a;
  font-size: 15pt;
  font-weight: 500;
  margin-top: 10px;
}
.price-text-green {
  color: $product-price-color;
}
.sizes-parent {
  margin-top: 50px;
}
.sizes-container {
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 10 !important;
}
.choice-container > .button {
  background-color: transparent !important;
}
.choice-container2 > .button {
  background-color: transparent !important;
}
.images-container {
  background-image: url(/../images/creator/creator_border.png);
  background-size: contain;
  background-repeat: no-repeat;
  min-height: 680px;
  padding: 60px;
}
.images-container > .columns > .column:first-child {
  margin-top: -15px;
}
.config-img-parent > * {
  position: absolute;
  top: 0;
  left: 0;
}
.sizes-modal {
  background-color: #1a1a1a;
}
.sizes-modal > thead > tr > th,
.sizes-modal > tbody > tr > th,
.sizes-modal > tbody > tr > td {
  color: $accent_color;
  border-color: $accent_color;
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (max-width: 525px) {
  .images-container {
    background-image: none;
  }
  .images-container > .columns > .column:last-child {
    margin-top: 325px;
    margin-bottom: 325px;
    margin-right: 0;
  }
}
@media only screen and (min-width: 525px) {
  .images-container {
    background-image: none;
  }
  .images-container > .columns > .column:last-child {
    margin-top: 500px;
    margin-bottom: 500px;
    margin-right: 0;
  }
}
/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 772px) {
  .images-container {
    background-image: url(/../images/creator/creator_border.png);
    min-height: 375px;
  }
  .images-container > .columns > .column:last-child {
    margin-top: 0;
    margin-bottom: 0;
    margin-right: 0;
  }
}

// /* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 1200px) {
  .images-container {
    min-height: 450px;
  }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1380px) {
  .images-container {
    min-height: 500px;
  }
}

@media only screen and (min-width: 1600px) {
  .images-container {
    min-height: 575px;
  }
}
@media only screen and (min-width: 1725px) {
  .images-container {
    min-height: 650px;
  }
}

@media only screen and (min-width: 2000px) {
  .images-container {
    min-height: 550px;
  }
}
@media only screen and (min-width: 2200px) {
  .images-container {
    min-height: 600px;
  }
}
@media only screen and (min-width: 2400px) {
  .images-container {
    min-height: 680px;
  }
}
</style>
