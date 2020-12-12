<template>
  <div>
    <section class="hero is-info welcome is-small">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Produkty</h1>
          <h2 class="subtitle">Wszystkie produkty dostępne w sklepie</h2>
        </div>
      </div>
    </section>
    <section class="products">
      <table class="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nazwa</th>
            <th>Cena</th>
            <th>Cena promocyjna</th>
            <th>Rodzaj</th>
            <th>Stan magazynowy</th>
            <th>Akcja</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th>Id</th>
            <th>Nazwa</th>
            <th>Cena</th>
            <th>Cena promocyjna</th>
            <th>Rodzaj</th>
            <th>Stan magazynowy</th>
            <th>Akcja</th>
          </tr>
        </tfoot>
        <tbody>
          <tr v-for="product in products" v-bind:key="product.id">
            <th>{{ product.id }}</th>
            <td>{{ product.name }}</td>
            <td
              :class="{
                'not-on-sale':
                  product.discountPrice < product.price &&
                  product.discountPrice != 0,
              }"
            >
              {{ product.price }} zł
            </td>
            <td
              class="not-on-sale"
              :class="{ 'is-on-sale': product.discountPrice != 0 }"
            >
              {{ product.discountPrice }} zł
            </td>
            <td>{{ type(product.type) }}</td>
            <td>
              <span v-for="(size, index) in product.sizes" :key="index">{{
                size.sizeName + "-" + size.pivot.quantity + " "
              }}</span>
            </td>
            <td>
              <input
                type="checkbox"
                :id="product.id"
                :value="product.id"
                v-model="checkedProducts"
                @change="showProductEdit = false"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <p class="buttons">
        <a class="button is-info" @click="editProduct()">
          <span class="icon is-small">
            <i class="far fa-edit"></i>
          </span>
          <span>Edytuj</span>
        </a>
        <a class="button is-danger is-outlined" @click="deleteProducts()">
          <span>Usuń</span>
          <span class="icon is-small">
            <i class="fas fa-times"></i>
          </span>
        </a>
      </p>
    </section>
    <section class="product-edit" v-show="showProductEdit">
      <form>
        <label class="label">Nazwa</label>
        <div class="field">
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Nazwa"
              v-model="productName"
            />
          </div>
        </div>
        <label class="label">Krótki opis</label>
        <div class="field">
          <div class="control">
            <textarea
              class="textarea has-fixed-size"
              placeholder="Krótki opis produktu"
              rows="3"
              v-model="shortDescription"
            ></textarea>
            <p class="is-pulled-right char-counter">
              {{ shortDescription.length }}/{{ maxChars }}
            </p>
          </div>
        </div>
        <label class="label">Krótki opis po angielsku</label>
        <div class="field">
          <div class="control">
            <textarea
              class="textarea has-fixed-size"
              placeholder="English short description"
              rows="3"
              v-model="shortEnglishDescription"
            ></textarea>
            <p class="is-pulled-right char-counter">
              {{ shortEnglishDescription.length }}/{{ maxChars }}
            </p>
          </div>
        </div>
        <br />
        <label class="label">Cena oraz cena promocyjna</label>
        <div class="field is-horizontal">
          <div class="field-body">
            <div class="field">
              <div class="control is-expanded">
                <input
                  class="input"
                  type="text"
                  placeholder="Cena"
                  v-model="price"
                />
              </div>
            </div>
            <div class="field">
              <div class="control is-expanded">
                <input
                  class="input"
                  type="text"
                  placeholder="Cena promocyjna"
                  v-model="discountPrice"
                />
              </div>
            </div>
          </div>
        </div>
        <label class="label">Długi opis</label>
        <div class="field">
          <div class="control">
            <textarea
              class="textarea has-fixed-size"
              placeholder="Długi opis produktu"
              rows="8"
              v-model="longDescription"
            ></textarea>
          </div>
        </div>
        <label class="label">Długi opis po angielsku</label>
        <div class="field">
          <div class="control">
            <textarea
              class="textarea has-fixed-size"
              placeholder="English long description"
              rows="8"
              v-model="longEnglishDescription"
            ></textarea>
          </div>
        </div>
        <label class="label">Opis materiałów</label>
        <div class="field">
          <div class="control">
            <textarea
              class="textarea has-fixed-size"
              placeholder="Opis materiałów"
              rows="3"
              v-model="materialsDescription"
            ></textarea>
          </div>
        </div>
        <label class="label">Opis materiałów po angielsku</label>
        <div class="field">
          <div class="control">
            <textarea
              class="textarea has-fixed-size"
              placeholder="English materials description"
              rows="3"
              v-model="englishMaterials"
            ></textarea>
          </div>
        </div>

        <section class="hero is-info welcome is-small">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">Rozmiary i stan magazynowy</h1>
              <h2 class="subtitle">
                Wybierz dostępne rozmiary oraz ich stan magazynowy
              </h2>
            </div>
          </div>
        </section>

        <div class="field" v-for="(size, index) in sizes" :key="index">
          <div class="control">
            <label class="checkbox">
              <input
                type="checkbox"
                @click="onSizeChanged(size.sizeName, index)"
                v-model="sizesChecked[index]"
              />
              {{ size.sizeName }}
            </label>
          </div>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Stan magazynowy"
              v-if="sizesNames[index]"
              v-model="quantities[index]"
            />
          </div>
        </div>

        <p class="buttons">
          <a
            class="button is-success"
            @click="submitEditedProduct(editedProduct)"
          >
            <span class="icon is-small">
              <i class="fas fa-save"></i>
            </span>
            <span>Zapisz</span>
          </a>
          <a
            class="button is-danger is-outlined"
            @click="showProductEdit = false"
          >
            <span>Anuluj</span>
            <span class="icon is-small">
              <i class="fas fa-times"></i>
            </span>
          </a>
        </p>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      sizes: [],
      checkedProducts: [],
      showProductEdit: false,
      i: 0,
      productName: "",
      shortDescription: "",
      shortEnglishDescription: "",
      price: "",
      discountPrice: "",
      longDescription: "",
      materialsDescription: "",
      longEnglishDescription: "",
      englishMaterials: "",
      maxChars: 255,
      editedProduct: Object,
      sizesNames: [],
      sizesChecked: [],
      quantities: [],
    };
  },
  methods: {
    deleteProducts() {
      if (this.checkedProducts.length == 0) {
        alert("Wybierz produkty do usunięcia");
      } else {
        for (this.i = 0; this.i < this.checkedProducts.length; this.i++) {
          axios.delete("/products/" + this.checkedProducts[this.i]);
        }
        axios.get("/admin/products/get").then((response) => {
          this.products = response.data;
        });
      }
    },
    editProduct() {
      if (this.checkedProducts.length > 1) {
        alert("Mozna edytowac tylko jeden produkt");
      } else if (this.checkedProducts.length == 0) {
        alert("Wybierz produkt do edycji");
      } else {
        for (this.i = 0; this.i < this.products.length; this.i++) {
          if (this.products[this.i].id == this.checkedProducts[0]) {
            let product = this.products[this.i];
            this.productName = product.name;
            this.shortDescription = product.shortDescription;
            this.shortEnglishDescription = product.shortEnglishDescription;
            this.price = product.price;
            this.discountPrice = product.discountPrice;
            this.longDescription = product.longDescription;
            this.materialsDescription = product.materials;
            this.longEnglishDescription = product.longEnglishDescription;
            this.englishMaterials = product.englishMaterials;
            this.sizesNames = [];
            this.quantities = [];
            axios.get("admin/sizes/" + product.id).then((response) => {
              var tempSizes = response.data;
              var j = 0;
              var k = 0;
              for (j = 0; j < this.sizes.length; j++) {
                for (k = 0; k < tempSizes.length; k++) {
                  if (this.sizes[j].sizeName == tempSizes[k].sizeName) {
                    this.sizesChecked[j] = true;
                    this.sizesNames[j] = tempSizes[k].sizeName;
                    this.quantities[j] = tempSizes[k].pivot.quantity;
                  }
                }
              }
              this.editedProduct = product;
              this.showProductEdit = true;
            });
          }
        }
      }
    },
    submitEditedProduct(editedProduct) {
      axios
        .put("/products/" + editedProduct.id, {
          name: this.productName,
          shortDescription: this.shortDescription,
          longDescription: this.longDescription,
          materials: this.materialsDescription,
          shortEnglishDescription: this.shortEnglishDescription,
          longEnglishDescription: this.longEnglishDescription,
          englishMaterials: this.englishMaterials,
          price: this.price,
          discountPrice: this.discountPrice,
          quantities: JSON.stringify(this.quantities),
          sizes: JSON.stringify(this.sizesNames),
        })
        .then((response) => {
          this.clearDataFields();
          this.showProductEdit = false;
          axios.get("/admin/products/get").then((response) => {
            this.products = response.data;
          });
          alert("Uaktualniono produkt");
        })
        .catch((error) => {
          alert("Wystąpił błąd " + error);
        });
    },
    onSizeChanged(name, index) {
      if (this.sizesNames[index]) {
        this.sizesNames[index] = null;
      } else {
        this.sizesNames[index] = name;
      }
    },
    type(productType) {
      switch(productType) {
        case 'male':
          return 'Męska';
        case 'female':
          return 'Damska';
        case 'kid':
          return 'Dziecięca';
        case 'voucher':
          return 'Voucher';
      }
    },
    clearDataFields() {
      this.productName = "";
      this.shortDescription = "";
      this.price = "";
      this.discountPrice = "";
      this.longDescription = "";
      this.materialsDescription = "";
      this.sizesNames = [];
      this.sizesChecked = [];
      this.quantities = [];
    },
  },
  created() {
    axios.get("/admin/products/get").then((response) => {
      this.products = response.data;
    });
    axios.get("admin/sizes/get").then((response) => {
      this.sizes = response.data;
    });
  },
};
</script>

<style lang="scss">
@import "~@/_variables";

.products {
  margin-top: 20px;
}
.not-on-sale {
  text-decoration: line-through;
}
.is-on-sale {
  text-decoration: none !important;
  color: $product-sale-price-color;
  font-weight: bold;
}
.product-edit {
  margin-top: 40px;
}
</style>
