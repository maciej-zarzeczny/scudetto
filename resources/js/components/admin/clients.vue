<template>
    <div>
        <section class="hero is-info welcome is-small">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        Klienci
                    </h1>
                    <h2 class="subtitle">
                        Wszyscy użytkownicy
                    </h2>
                </div>
            </div>
        </section> 
        <section class="clients-info">
            <table class="table is-fullwidth is-striped">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Imię</th>
                        <th>Adres email</th>
                        <th>Numer telefonu</th>
                        <th>Data założenia konta</th>
                        <th>Ilość zamówień</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, index) in users" :key="index">
                        <th>{{ user.id }}</th>
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.phone }}</td>
                        <td>{{ user.created_at }}</td>
                        <td>{{ user.orders.length }}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            users: null
        }
    },
    created() {
        axios.get('admin/users').then(response => {
            this.users = response.data;
        }).catch(error => {
            alert("Wystąpił błąd podczas ładowania danych")
        });
    }
}
</script>

<style lang="scss">
    @import '~@/_bulma-variables';    
    @import '~@/_variables';
</style>
