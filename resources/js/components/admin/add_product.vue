<template>
  <div>
    <section class="add-product">
      <form @submit.prevent="addNewProduct()">
        <section class="hero is-info welcome is-small">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">Podstawowe informacje</h1>
            </div>
          </div>
        </section>
        <div class="field">
          <div class="control">
            <input class="input" type="text" placeholder="Nazwa" v-model="productName" name="name" />
          </div>
        </div>
        <div class="field">
          <div class="control">
            <textarea
              class="textarea has-fixed-size"
              placeholder="Krótki opis produktu"
              rows="3"
              v-model="shortDescription"
              name="sentence"
            ></textarea>
            <p class="is-pulled-right char-counter">{{ shortDescription.length }}/{{ maxChars }}</p>
          </div>
          <div class="control">
            <textarea
              class="textarea has-fixed-size"
              placeholder="Short product description"
              rows="3"
              v-model="shortEnglishDescription"
              name="sentence"
            ></textarea>
            <p
              class="is-pulled-right char-counter"
            >{{ shortEnglishDescription.length }}/{{ maxChars }}</p>
          </div>
        </div>
        <br />
        <div class="field is-horizontal">
          <div class="field-body">
            <div class="field">
              <div class="control is-expanded">
                <input class="input" type="text" placeholder="Cena" v-model="price" name="number" />
              </div>
            </div>
            <div class="field">
              <div class="control is-expanded">
                <input
                  class="input"
                  type="text"
                  placeholder="Cena promocyjna"
                  v-model="discountPrice"
                  name="number"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <textarea
              class="textarea has-fixed-size"
              placeholder="Długi opis produktu"
              rows="8"
              v-model="longDescription"
              name="paragraph"
            ></textarea>
          </div>
          <div class="control">
            <textarea
              class="textarea has-fixed-size english-long-description"
              placeholder="Long product description"
              rows="8"
              v-model="longEnglishDescription"
              name="paragraph"
            ></textarea>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <textarea
              class="textarea has-fixed-size"
              placeholder="Opis materiałów"
              rows="3"
              v-model="materialsDescription"
              name="paragraph"
            ></textarea>
          </div>
          <div class="control">
            <textarea
              class="textarea has-fixed-size english-long-description"
              placeholder="Materials description"
              rows="3"
              v-model="englishMaterials"
              name="paragraph"
            ></textarea>
          </div>
        </div>

        <section class="hero is-info welcome is-small">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">Rozmiary i stan magazynowy</h1>
              <h2 class="subtitle">Wybierz dostępne rozmiary oraz ich stan magazynowy</h2>
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
              v-model="quantities[index]"
            />
          </div>
        </div>

        <section class="hero is-info welcome is-small">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">Zdjęcia</h1>
            </div>
          </div>
        </section>

        <div class="file has-name is-boxed is-centered is-info">
          <label class="file-label">
            <input
              class="file-input"
              type="file"
              multiple
              name="resume"
              v-on:change="onImageChange"
            />
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload"></i>
              </span>
              <span class="file-label">Dodaj zdjęcia...</span>
            </span>
            <span class="file-name" v-if="images.length > 0">
              <span v-for="image in images" :key="image.id">{{ image.name + ' ' }}</span>
            </span>
          </label>
        </div>

        <div class="control">
          <button v-bind:class="['button is-primary', {'is-loading': isLoading}]">Dodaj</button>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productName: "",
      shortDescription: "",
      price: "",
      discountPrice: "",
      longDescription: "",
      materialsDescription: "",
      shortEnglishDescription: "",
      longEnglishDescription: "",
      englishMaterials: "",
      maxChars: 255,
      sizes: [],
      images: [],
      imagesNames: [],
      sizesChecked: [],
      sizesNames: [],
      quantities: [],
      isLoading: false,
    };
  },
  methods: {
    onImageChange(e) {
      this.images = e.target.files;
    },
    addNewProduct() {
      var i = 0;
      for (i = 0; i < this.images.length; i++) {
        this.imagesNames[i] = "/images/" + new Date().getTime() + i + ".jpg";
      }
      if (this.discountPrice == "") {
        alert("Nalezy podac cenę promocyjną (0 w przypadku braku promocji)");
      } else {        
        this.isLoading = true;
        const config = {
          headers: { "content-type": "multipart/form-data" },
        };
        let formData = new FormData();
        formData.append("imagesNames", JSON.stringify(this.imagesNames));
        formData.append("name", this.productName);
        formData.append("shortDescription", this.shortDescription);
        formData.append("longDescription", this.longDescription);
        formData.append("materials", this.materialsDescription);
        formData.append(
          "shortEnglishDescription",
          this.shortEnglishDescription
        );
        formData.append("longEnglishDescription", this.longEnglishDescription);
        formData.append("englishMaterials", this.englishMaterials);
        formData.append("price", this.price);
        formData.append("discountPrice", this.discountPrice);
        formData.append("sizes", JSON.stringify(this.sizesNames));
        formData.append("quantities", JSON.stringify(this.quantities));
        var i = 0;
        for (i = 0; i < this.images.length; i++) {
          let image = this.images[i];
          formData.append("images[" + i + "]", image);
        }
        axios
          .post("/products", formData, config)
          .then((response) => {
            this.clearDataFields();
            this.isLoading = false;
            this.images = [];

            alert("Pomyślnie dodano nowy produkt");
          })
          .catch((error) => {
            this.isLoading = false;
            alert("Wystąpił błąd " + error);
          });
      }
    },
    onSizeChanged(name, index) {
      if (this.sizesNames[index]) {
        this.sizesNames[index] = null;
      } else {
        this.sizesNames[index] = name;
      }
    },
    clearDataFields() {
      this.productName = "";
      this.shortDescription = "";
      this.shortEnglishDescription = "";
      this.price = "";
      this.discountPrice = "";
      this.longDescription = "";
      this.materialsDescription = "";
      this.longEnglishDescription = "";
      this.englishMaterials = "";
      this.sizesChecked = [];
      this.sizesNames = [];
      this.quantities = [];
    },
  },
  created() {
    axios.get("admin/sizes/get").then((response) => {
      this.sizes = response.data;
    });
  },
};
</script>

<style lang="scss">
.english-long-description {
  margin-top: 15px;
}
.add-product {
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
}
.char-counter {
  font-size: 10pt;
}

.welcome {
  margin-bottom: 30px;
}

.checkboxes {
  margin-bottom: 30px;
}
</style>
