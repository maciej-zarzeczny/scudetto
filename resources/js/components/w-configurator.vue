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
                :src="'/images/creator/female/' + kroj.name + '.png'"
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
                  v-once
                  v-for="columnIndex in 3"
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
                    '/images/creator/female/' +
                    kroj.name +
                    '/' +
                    tkaniny[tkaninyNumber].name +
                    '.png'
                  "
                  v-if="tkaninyReady && krojeReady"
                />
                <img
                  :src="
                    '/images/creator/female/' +
                    kroj.name +
                    '/' +
                    guzik.name +
                    '.png'
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
                  :src="podszewki[podszewkiNumber].back_female_image_url"
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
                <th>34</th>
                <th>36</th>
                <th>38</th>
                <th>40</th>
                <th>42</th>
                <th>44</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Obwód klatki piersiowej</th>
                <td>77-80</td>
                <td>81-84</td>
                <td>85-88</td>
                <td>89-92</td>
                <td>93-96</td>
                <td>97-100</td>
              </tr>
              <tr>
                <th>Obwód talii</th>
                <td>59-62</td>
                <td>63-66</td>
                <td>67-70</td>
                <td>71-74</td>
                <td>75-78</td>
                <td>79-82</td>
              </tr>
              <tr>
                <th>Długość pleców</th>
                <td>48</td>
                <td>48,5</td>
                <td>49</td>
                <td>49,5</td>
                <td>50</td>
                <td>50,5</td>
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
        product.female = "1";
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
    axios.get("kroj/female").then((response) => {
      this.kroje = response.data;
      this.kroj = this.kroje[0];
      this.krojeReady = true;
    });
    axios.get("sizes/female").then((response) => {
      this.sizes = response.data;
    });
    axios.get("tkanina/female").then((response) => {
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
    axios.get("button/female").then((response) => {
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
</style>
