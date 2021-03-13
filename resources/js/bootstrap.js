import Vue from "vue";
import axios from "axios";
import Bulma from "bulma";
import VueScrollTo from "vue-scrollto";
import VueObserveVisibility from "vue-observe-visibility";
import VueRouter from "vue-router";
import ZoomOnHover from "vue-zoom-on-hover";

window.Vue = Vue;
window.axios = axios;
window.Bulma = Bulma;
window.Event = new Vue();

Vue.use(VueScrollTo, {
    container: "body",
    duration: 1000,
    easing: "ease-in-out",
    offset: 20,
    force: true,
    x: false,
    y: true
});
window.VueScrollTo = VueScrollTo;
Vue.use(VueObserveVisibility);
Vue.use(VueRouter);
Vue.use(ZoomOnHover);

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
} else {
    console.error(
        "CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token"
    );
}
