<template>
  <nav class="navbar is-fixed-top is-transparent" role="navigation" aria-label="main navigation">
    <div class="navbar-brand" :class="{ 'dark-menu': menuMinimized }">
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

    <div class="navbar-menu" :class="{ 'is-active': showMobileMenu, 'dark-menu': menuMinimized }">
      <div class="navbar-end">
        <a href="/products" class="navbar-item">
          <strong>{{ $t('messages.shop') }}</strong>
        </a>

        <a href="/choose" class="navbar-item">
          <strong>{{ $t('messages.configurator') }}</strong>
        </a>

        <a v-scroll-to="'#about-us'" class="navbar-item">
          <strong>{{ $t('messages.about_us') }}</strong>
        </a>

        <!-- <a v-scroll-to="'#guide'" class="navbar-item">
                    <strong>{{ $t('messages.guide') }}</strong>
        </a>-->

        <a v-scroll-to="'#gallery'" class="navbar-item">
          <strong>{{ $t('messages.gallery') }}</strong>
        </a>

        <a href="/cart" class="navbar-item" v-if="emptyCart">
          <span class="icon is-small">
            <i class="fas fa-shopping-cart"></i>
          </span>
        </a>

        <div class="navbar-item has-dropdown is-hoverable" v-if="loggedIn">
          <a class="navbar-link">
            <span class="icon is-small">
              <i class="far fa-user-circle"></i>
            </span>
          </a>

          <div class="navbar-dropdown" :class="setDropdownClass()">
            <a href="/admin" class="navbar-item" v-if="admin">Przedjź do panelu</a>
            <a href="/orders" class="navbar-item" v-if="!admin">{{ $t('messages.orders') }}</a>
            <a class="navbar-item" @click="Logout()">{{ $t('messages.logout') }}</a>
          </div>
        </div>

        <div class="navbar-item has-dropdown is-hoverable" v-if="!loggedIn">
          <a class="navbar-link">
            <span class="icon is-small">
              <i class="far fa-user-circle"></i>
            </span>
          </a>

          <div class="navbar-dropdown" :class="setDropdownClass()">
            <a href="/login" class="navbar-item">{{ $t('messages.login') }}</a>
            <a href="/register" class="navbar-item" v-if="!admin">{{ $t('messages.register') }}</a>
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

.navbar-logo > img {
  min-height: 75px;
  margin-left: 50px;
}
.menu-expanded {
  background-color: $navbar-background-color-minimized;
}
.dark-menu {
  background-color: $navbar-background-color-minimized;
}
.is-active > .navbar-end > a:hover {
  background-color: transparent !important;
}
.is-active > .navbar-end > .has-dropdown a:hover {
  background-color: transparent !important;
}
.burger-minimized {
  max-height: 4rem !important;
}
.navbar-burger:hover {
  color: $accent_color;
}
.navbar,
.navbar-brand,
.navbar-menu {
  transition: all 0.5s ease-in-out !important;
}
.minimized {
  background-color: $navbar-background-color-minimized !important;
  min-height: $navbar-height-minimized !important;
  max-height: $navbar-height-minimized !important;
}
.navbar-end > .navbar-item:last-child {
  padding-right: 100px;
}
.first-item {
  padding-left: 100px;
}
.dropdown {
  background-color: $navbar-background-color !important;
}
.dropdown > a:hover {
  color: $accent_color !important;
}
.login-button {
  color: white !important;
  border-color: white !important;
  transition: all 0.3s ease-in-out;
}
.login-button:hover {
  background-color: white !important;
  color: black !important;
}
.register-button {
  color: black !important;
}
@media only screen and (max-width: 600px) {
  .navbar-logo > img {
    min-height: 50px;
    margin-left: 10px;
  }
}
</style>

<script>
export default {
  props: {
    isloggedin: Boolean,
    isadmin: Boolean
  },
  data() {
    return {
      showMobileMenu: false,
      menuMinimized: false,
      loggedIn: this.isloggedin,
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
    isMenuExpanded() {
      if (this.showMobileMenu && this.menuMinimized) {
        return true;
      } else {
        return false;
      }
    },
    Logout() {
      axios
        .post("/logout")
        .then(response => {
          window.location.href = "/";
        })
        .catch(error => {
          alert("Wystąpił błąd: " + error);
        });
    },
    setDropdownClass() {
      if (this.menuMinimized) {
        return "dropdown-dark";
      } else {
        return "dropdown";
      }
    }
  },
  mounted() {
    Event.$on("visibilityChanged", visible => {
      if (visible) {
        this.menuMinimized = false;
      } else {
        this.menuMinimized = true;
      }
    });
  },

  created() {
    const sleep = milliseconds => {
      return new Promise(resolve => setTimeout(resolve, milliseconds));
    };
  }
};
</script>