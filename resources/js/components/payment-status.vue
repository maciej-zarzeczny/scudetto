<template>
  <div class="status"></div>
</template>

<script>
export default {
  props: {
    basicauth: "",
  },
  mounted() {
    const transfers24Payment = localStorage.getItem("transfers24Payment");

    if (transfers24Payment) {
      const sessionId = localStorage.getItem("sessionId");

      let config = {
        crossDomain: true,
        processData: false,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + this.basicauth,
          "cache-control": "no-cache",
        },
      };

      axios
        .get(
          "https://sandbox.przelewy24.pl/api/v1/transaction/by/sessionId/" +
            sessionId,
          config
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
};
</script>

<style lang="scss">
</style>
