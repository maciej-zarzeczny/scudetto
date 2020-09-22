<template>
  <div>
    <section class="hero is-info welcome is-small">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Galeria</h1>
          <h2 class="subtitle">Edytuj zdjęcia w galerii</h2>
        </div>
      </div>
    </section>
    <section class="galley-section">
      <div class="add-image-section">
        <div class="file has-name">
          <label class="file-label">
            <input
              class="file-input"
              multiple
              type="file"
              name="resume"
              v-on:change="onImageChange"
            />
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload"></i>
              </span>
              <span class="file-label">Wybierz zdjęcia...</span>
            </span>
            <span class="file-name" v-if="uploadImages.length > 0">
              <span v-for="image in uploadImages" :key="image.id">{{ image.name + ' ' }}</span>
            </span>
          </label>
        </div>
        <div class="control">
          <button class="button is-primary" @click="addNewPhotos()">Dodaj</button>
        </div>
      </div>
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>Zdjęcie</th>
            <th>Ścieżka do zdjęcia</th>
            <th>Akcja</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(image, index) in images" :key="index">
            <td @click="bigPhotoUrl = image.url; showModal = true">
              <figure class="image gallery-image-icon">
                <img :src="image.url" alt="Gallery image icon" />
              </figure>
            </td>
            <td @click="bigPhotoUrl = image.url; showModal = true">{{ image.url }}</td>
            <td>
              <a class="button is-danger is-outlined" @click="deleteImage(image.id)">
                <span>Usuń</span>
                <span class="icon is-small">
                  <i class="fas fa-times"></i>
                </span>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="modal" :class="{ 'is-active' : showModal }">
        <div class="modal-background" @click="showModal = false"></div>
        <div class="modal-content">
          <figure class="image">
            <img :src="bigPhotoUrl" alt="Big gallery image" />
          </figure>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="showModal = false"></button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [],
      uploadImages: [],
      uploadImagesNames: [],
      showModal: false,
      bigPhotoUrl: "",
    };
  },
  methods: {
    onImageChange(e) {
      this.uploadImages = e.target.files;
    },
    addNewPhotos() {
      if (this.uploadImages.length > 0) {
        for (var i = 0; i < this.uploadImages.length; i++) {
          this.uploadImagesNames[i] =
            "/images/gallery/" + new Date().getTime() + i + ".png";
        }

        const config = {
          headers: { "content-type": "multipart/form-data" },
        };
        let formData = new FormData();
        formData.append("imagesNames", JSON.stringify(this.uploadImagesNames));
        for (var i = 0; i < this.uploadImages.length; i++) {
          let image = this.uploadImages[i];
          formData.append("images[" + i + "]", image);
        }
        axios
          .post("/gallery", formData, config)
          .then((response) => {
            if (response.data == "success") {
              axios.get("/gallery").then((response) => {
                this.images = response.data;
              });
            }
          })
          .catch((error) => {
            alert("Wystąpił błąd " + error);
          });
      } else {
        alert("Wybierz przynajmniej jedno zdjęcie");
      }
    },
    deleteImage(index) {
      axios.post("/gallery/delete/" + index).then((response) => {
        if (response.data == "success") {
          axios.get("/gallery").then((response) => {
            this.images = response.data;
          });
        }
      });
    },
  },
  async mounted() {
    const response = await axios.get("/gallery");

    this.images = response.data;
  },
};
</script>

<style lang="scss">
.gallery-image-icon {
  max-width: 64px;
}
.add-image-section {
  margin: 20px 0 20px 0;
  display: flex;
}
.add-image-section .control {
  margin-left: 10px;
}
</style>