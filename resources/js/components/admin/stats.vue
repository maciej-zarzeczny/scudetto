<template>
    <div>
        <section class="hero is-info welcome is-small">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        Statystyki
                    </h1>
                    <h2 class="subtitle">
                        Ogólne statystyki 
                    </h2>
                </div>
            </div>
        </section> 
        <section class="info-tiles">
            <div class="tile is-ancestor has-text-centered">
                <div class="tile is-parent">
                    <article class="tile is-child box">
                        <p class="title">{{ users }}</p>
                        <p class="subtitle">Użytkowników</p>
                    </article>
                </div>
                <div class="tile is-parent">
                    <article class="tile is-child box">
                        <p class="title">{{ products }}</p>
                        <p class="subtitle">Produktów</p>
                    </article>
                </div>
                <div class="tile is-parent">
                    <article class="tile is-child box">
                        <p class="title">{{ orders }}</p>
                        <p class="subtitle">Zamówień</p>
                    </article>
                </div>                        
            </div>
        </section>   
    </div>     
</template>

<script>
export default {
    data() {
        return {
            products: null,
            orders: null,
            users: null
        }
    },
    created() {
        axios.get('admin/stats').then(response => {
            this.products = response.data.products;
            this.orders = response.data.orders;
            this.users = response.data.users;
        }).catch(error => {
            alert("Wystąpił błąd podczas ładowania danych")
        });
    }
}
</script>

<style lang="scss">
    .info-tiles {
        margin-top: 20px !important;
    }
</style>

