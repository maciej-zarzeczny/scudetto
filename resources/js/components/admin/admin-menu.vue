<template>
    <div class="parent">
        <nav class="navbar admin-navbar" role="navigation" aria-label="dropdown navigation">
            <div class="navbar-menu">
                <div class="navbar-end">
                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link admin-link">
                            Konto
                        </a>    
                        <div class="navbar-dropdown is-right admin-dropdown">
                            <a href="/" class="navbar-item">
                                Przejdź do sklepu
                            </a>                                                        
                            <hr class="navbar-divider admin-divider">
                            <a class="navbar-item" @click="Logout()">
                                Wyloguj
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <div class="container admin-dashboard">
            <div class="columns">
                <div class="column is-3 ">
                    <aside class="menu is-hidden-mobile">
                        <p class="menu-label">
                            Ogólne
                        </p>
                        <ul class="menu-list">
                            <li><router-link to="/" exact>Statystyki</router-link></li>
                            <li><router-link to="clients" exact>Klienci</router-link></li>
                        </ul>    
                        <p class="menu-label">
                            Zarządzaj sklepem    
                        </p>     
                        <ul class="menu-list">
                            <li><router-link to="products" exact>Wszystkie produkty</router-link></li>
                            <li><router-link to="add_product" exact>Dodaj produkt</router-link></li>
                            <li><router-link to="orders" exact>Zamówienia</router-link></li>
                            <li><router-link to="coupons" exact>Kody rabatowe</router-link></li>
                        </ul>     
                        <p class="menu-label">
                            Zarządzaj stroną
                        </p>     
                        <ul class="menu-list">
                            <li><router-link to="gallery" exact>Galeria</router-link></li>
                            <li><router-link to="creator" exact>Kreator</router-link></li>                            
                        </ul>                                                           
                    </aside>
                </div>            
                <div class="column is-9">                               
                    <router-view></router-view>                          
                </div>            
            </div>        
        </div>        
    </div>
</template>

<script>
export default {            
    methods: {
        Logout() {
            axios.post('/logout').then(response => {
                window.location.href = '/';
            }).catch(error => {
                alert('Wystąpił błąd: ' + error);
            });
        }
    }
}
</script>

<style lang="scss">
    .admin-dashboard {
       margin-top: 40px !important;
    }
    .admin-navbar { 
        background-color: rgb(243, 243, 243) !important;
    }
    .admin-link {
        color: #3273DB !important;
        background-color: rgb(243, 243, 243) !important;
        margin-right: 100px;
    }
    .admin-dropdown {
        background-color: rgb(243, 243, 243) !important;
    }
    .admin-dropdown>a {
        color: black !important;
    }
    .admin-divider { 
        background-color: #DBDBDB !important;
    }
</style>
