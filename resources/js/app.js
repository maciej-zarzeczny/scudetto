import "./bootstrap";
import VueInternationalization from "vue-i18n";
import Locale from "./vue-i18n-locales.generated";
import router from "./admin/routes";

Vue.use(VueInternationalization);
const lang = document.documentElement.lang.substr(0, 2);
const i18n = new VueInternationalization({
    locale: lang,
    messages: Locale
});

Vue.component("navbar", require("./components/navbar.vue").default);
Vue.component("dark-navbar", require("./components/dark-navbar.vue").default);
Vue.component("video-header", require("./components/video-header.vue").default);
Vue.component("product-item", require("./components/product-item.vue").default);
Vue.component(
    "product-overview",
    require("./components/product-overview.vue").default
);
Vue.component(
    "admin-menu",
    require("./components/admin/admin-menu.vue").default
);
Vue.component("login-form", require("./components/login-form.vue").default);
Vue.component(
    "register-form",
    require("./components/register-form.vue").default
);
Vue.component("cart-view", require("./components/cart-view.vue").default);
Vue.component("cart-item", require("./components/cart-item.vue").default);
Vue.component("orders-view", require("./components/orders-view.vue").default);
Vue.component(
    "order-details",
    require("./components/admin/order-details.vue").default
);
Vue.component(
    "gallery-edit",
    require("./components/admin/gallery.vue").default
);
Vue.component("creator", require("./components/admin/creator.vue").default);
Vue.component("coupons", require("./components/admin/coupons.vue").default);
Vue.component(
    "checkout-view",
    require("./components/checkout-view.vue").default
);
Vue.component("about-us", require("./components/about-us.vue").default);
Vue.component("guide", require("./components/guide.vue").default);
Vue.component("gallery", require("./components/gallery.vue").default);
Vue.component("payment", require("./components/payment.vue").default);
Vue.component("confirmation", require("./components/confirmation.vue").default);
Vue.component(
    "payment-status",
    require("./components/payment-status.vue").default
);
Vue.component(
    "choose-configurator",
    require("./components/choose-configurator.vue").default
);
Vue.component("configurator", require("./components/configurator.vue").default);
Vue.component(
    "w-configurator",
    require("./components/w-configurator.vue").default
);
Vue.component("site-footer", require("./components/site-footer.vue").default);
Vue.component("pulse-loader", require("vue-spinner/src/PulseLoader.vue").default);

var Cart = Vue.extend({
    data() {
        return {
            products: [],
            emptyCart: true
        };
    },
    methods: {
        addProduct(product) {
            this.products.push(product);
            this.saveProducts();
        },
        removeProduct(product) {
            this.products.splice(this.products.indexOf(product), 1);
            this.saveProducts();
            if (this.products.length <= 0) {
                window.location.href = "/products";
            }
        },
        removeAllProducts() {
            this.products = [];
            this.saveProducts();
        },
        getTotalPrice() {},
        saveProducts() {
            const parsed = JSON.stringify(this.products);
            localStorage.setItem("products", parsed);
            this.checkCart();
        },
        checkCart() {
            if (this.products.length > 0) {
                this.emptyCart = false;
            } else {
                this.emptyCart = true;
            }
        }
    },
    created() {
        if (localStorage.getItem("products")) {
            try {
                this.products = JSON.parse(localStorage.getItem("products"));
            } catch (e) {
                localStorage.removeItem("products");
            }
        }
        this.checkCart();
    }
});

window.cart = new Cart();

if (process.env.MIX_APP_ENV === "production") {
    Vue.config.devtools = false;
    Vue.config.debug = false;
    Vue.config.silent = true;
}

new Vue({
    el: "#app",
    i18n,
    router
});
