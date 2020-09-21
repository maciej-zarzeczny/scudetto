import VueRouter from 'vue-router';

let routes = [
    {
        path: '/',
        component: require('../components/admin/stats.vue').default
    },
    {
        path: '/products',
        component: require('../components/admin/products.vue').default
    },
    {
        path: '/add_product',
        component: require('../components/admin/add_product.vue').default
    },
    {
        path: '/orders',
        component: require('../components/admin/orders.vue').default
    },
    {
        path: '/clients',
        component: require('../components/admin/clients.vue').default
    },
    {
        path: '/gallery',
        component: require('../components/admin/gallery.vue').default
    },
    {
        path: '/creator',
        component: require('../components/admin/creator.vue').default
    },
    {
        path: '/coupons',
        component: require('../components/admin/coupons.vue').default
    }
]

export default new VueRouter({
    routes,
    linkActiveClass: 'is-active'    
});