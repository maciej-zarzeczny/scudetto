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

Vue.component("navbar", () => import("./components/navbar.vue"));
Vue.component("dark-navbar", () => import("./components/dark-navbar.vue"));
Vue.component("video-header", () => import("./components/video-header.vue"));
Vue.component("product-item", () => import("./components/product-item.vue"));
Vue.component("product-overview", () =>
    import("./components/product-overview.vue")
);
Vue.component("admin-menu", () => import("./components/admin/admin-menu.vue"));
Vue.component("login-form", () => import("./components/login-form.vue"));
Vue.component("register-form", () => import("./components/register-form.vue"));
Vue.component("cart-view", () => import("./components/cart-view.vue"));
Vue.component("cart-item", () => import("./components/cart-item.vue"));
Vue.component("orders-view", () => import("./components/orders-view.vue"));
Vue.component("order-details", () =>
    import("./components/admin/order-details.vue")
);
Vue.component("gallery-edit", () => import("./components/admin/gallery.vue"));
Vue.component("creator", () => import("./components/admin/creator.vue"));
Vue.component("coupons", () => import("./components/admin/coupons.vue"));
Vue.component("checkout-view", () => import("./components/checkout-view.vue"));
Vue.component("about-us", () => import("./components/about-us.vue"));
Vue.component("guide", () => import("./components/guide.vue"));
Vue.component("gallery", () => import("./components/gallery.vue"));
Vue.component("payment", () => import("./components/payment.vue"));
Vue.component("confirmation", () => import("./components/confirmation.vue"));
Vue.component("payment-status", () =>
    import("./components/payment-status.vue")
);
Vue.component("choose-configurator", () =>
    import("./components/choose-configurator.vue")
);
Vue.component("configurator", () => import("./components/configurator.vue"));
Vue.component("w-configurator", () =>
    import("./components/w-configurator.vue")
);
Vue.component("site-footer", () => import("./components/site-footer.vue"));

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
