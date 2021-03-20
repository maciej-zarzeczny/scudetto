<template>
    <nav
        class="navbar is-fixed-top is-transparent dark-navbar"
        role="navigation"
        aria-label="main navigation"
    >
        <div class="navbar-brand">
            <a class="navbar-item navbar-logo" href="/">
                <img src="/images/logo/navbar-logo.png" alt="Scudetto logo" />
            </a>

            <a
                role="button"
                class="navbar-burger burger"
                aria-label="menu"
                aria-expanded="false"
                data-target="navbarBasicExample"
                :class="{ 'is-active': showMobileMenu }"
                v-on:click="showMenu()"
            >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div class="navbar-menu" :class="{ 'is-active': showMobileMenu }">
            <div class="navbar-end">
                <a href="/products" class="navbar-item">
                    <strong>{{ $t("messages.shop") }}</strong>
                </a>

                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-item">
                        <strong>{{ $t("messages.configurator") }}</strong>
                    </a>

                    <div class="navbar-dropdown dropdown-dark">
                        <a href="/configurator/male" class="navbar-item">{{
                            $t("messages.male_configurator")
                        }}</a>
                        <a href="/configurator/female" class="navbar-item">{{
                            $t("messages.female_configurator")
                        }}</a>
                    </div>
                </div>

                <a href="/" class="navbar-item">
                    <strong>{{ $t("messages.about_us") }}</strong>
                </a>

                <!-- <a href="/" class="navbar-item">
                    <strong>{{ $t('messages.guide') }}</strong>
        </a>-->

                <a href="/" class="navbar-item">
                    <strong>{{ $t("messages.gallery") }}</strong>
                </a>

                <a href="/cart" class="navbar-item" v-if="emptyCart">
                    <span class="icon is-small">
                        <i class="fas fa-shopping-cart"></i>
                    </span>
                </a>

                <div
                    class="navbar-item has-dropdown is-hoverable"
                    v-if="loggedIn && !loginPage"
                >
                    <a class="navbar-link">
                        <span class="icon is-small">
                            <i class="far fa-user-circle"></i>
                        </span>
                    </a>

                    <div class="navbar-dropdown dropdown-dark">
                        <a href="/admin" class="navbar-item" v-if="admin"
                            >Przedjź do panelu</a
                        >
                        <a href="/orders" class="navbar-item" v-if="!admin">{{
                            $t("messages.orders")
                        }}</a>
                        <a class="navbar-item" @click="Logout()">{{
                            $t("messages.logout")
                        }}</a>
                    </div>
                </div>

                <div
                    class="navbar-item has-dropdown is-hoverable"
                    v-if="!loggedIn && !loginPage"
                >
                    <a class="navbar-link">
                        <span class="icon is-small">
                            <i class="far fa-user-circle"></i>
                        </span>
                    </a>

                    <div class="navbar-dropdown dropdown-dark">
                        <a href="/login" class="navbar-item">{{
                            $t("messages.login")
                        }}</a>
                        <a href="/register" class="navbar-item" v-if="!admin">{{
                            $t("messages.register")
                        }}</a>
                    </div>
                </div>

                <div class="navbar-item">
                    <a href="/setLocale/pl">
                        <img
                            src="/images/page/polish_flag.png"
                            alt="Polish flag button to change language to Polish"
                        />
                    </a>
                </div>
                <div class="navbar-item">
                    <a href="/setLocale/en">
                        <img
                            src="/images/page/english_flag.png"
                            alt="English flag button to change language to English"
                        />
                    </a>
                </div>
            </div>
        </div>
    </nav>
</template>

<style lang="scss">
@import "~@/_bulma-variables.scss";
@import "~@/_variables.scss";

.navbar-logo > img {
    min-height: 75px;
    margin-left: 50px;
}
.dark-navbar {
    background-color: $dark-navbar-background-color !important;
}
.is-active > .navbar-end > a:hover {
    background-color: transparent !important;
}
.navbar-burger:hover {
    color: $accent_color;
}
.navbar,
.navbar-brand,
.navbar-menu {
    transition: all 0.5s ease-in-out !important;
}
.navbar-end > .navbar-item:last-child {
    padding-right: 100px !important;
}
.first-item {
    padding-left: 100px !important;
}
.dropdown-dark {
    background-color: $dark-navbar-background-color !important;
    border-top-color: $dark-navbar-background-color !important;
}
.dropdown-dark > a:hover {
    color: $accent_color !important;
}
</style>

<script>
export default {
    props: {
        isloggedin: Boolean,
        isloginpage: Boolean,
        isadmin: Boolean
    },
    data() {
        return {
            showMobileMenu: false,
            loggedIn: this.isloggedin,
            loginPage: this.isloginpage,
            admin: this.isadmin
        };
    },
    computed: {
        emptyCart() {
            return !cart.emptyCart;
        }
    },
    methods: {
        showMenu() {
            this.showMobileMenu = !this.showMobileMenu;
        },
        Logout() {
            axios
                .post("/logout")
                .then(response => {
                    window.location.href = "/products";
                })
                .catch(error => {
                    alert("Wystąpił błąd: " + error);
                });
        },
        isCartEmpty() {
            if (cart.products.length > 0) {
                return true;
            }
            return false;
        }
    }
};
</script>
