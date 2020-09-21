<template>
    <div class="cart-container container cart-container">        
        <div class="title-container">
            <h1 class="about-us-title">{{ $t('messages.cart') }}</h1>
        </div>            
        <div class="cart-separator"></div>
        <section class="products">                                
            <cart-item v-for="product in cartProducts" :key="product.index" :product="product"></cart-item>            
            <p class="buttons cart-buttons">
                <a class="button continue-button" href="/products">
                    <span class="icon is-small">
                        <i class="fas fa-arrow-left"></i>
                    </span>
                    <span>{{ $t('messages.continue_shopping') }}</span>
                </a>
                <div class="coupon-section">
                    <input class="input" type="text" :placeholder="$t('messages.discount-code')" v-model="coupon" v-show="!couponUsed">
                    <a class="button continue-button" @click="applyCoupon()" v-show="!couponUsed">{{ $t('messages.apply-coupon') }}</a>
                    <p class="code-used box" v-if="couponUsed">{{ usedCoupon.name }} - {{ usedCoupon.discount }} %</p>
                    <button class="delete" v-show="couponUsed" @click="removeCoupon()"></button>
                    <a href="/checkout" class="button checkout-button is-outlined">
                        <span>{{ $t('messages.checkout') }}</span>                    
                    </a>
                </div>                
            </p>            
        </section>                
    </div>
</template>

<script>
export default {
    data() {
        return {
            cartProducts: [],
            coupon: '',
            couponUsed: false,
            usedCoupon: null
        }
    },
    methods: {
        applyCoupon() {
            axios.post('/coupons/check', {
                coupon: this.coupon
            }).then(response => {
                if (response.data == 'not valid') {
                    alert('Wprowadzony kod rabatowy jest niepoprawny');
                } else {
                    this.usedCoupon = response.data;
                    localStorage.setItem('coupon', JSON.stringify(response.data));       
                    this.couponUsed = true;            
                }
            });
        },
        removeCoupon() {
            this.coupon = '',
            this.couponUsed = false;
            localStorage.removeItem('coupon');
        }
    },
     mounted() {
        this.cartProducts = cart.products;  
        if (localStorage.getItem('coupon') != null) {
            this.usedCoupon = JSON.parse(localStorage.getItem('coupon'));     
            this.couponUsed = true;       
        }
     }
}
</script>

<style lang="scss">
    @import '~@/_bulma-variables';    
    @import '~@/_variables';    

    // .title-container {
    //     padding: 10px 15px 10px 15px;                
    //     background-color: white;
    //     box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);     
    // }
    .cart-separator {
        background-color: $accent-color;
        margin-bottom: 20px;
        min-height: 2.5px;
        max-width: 20%;
    }
    .cart-container {
        padding: 0 20px 0 20px; 
    }    
    .coupon-section {
        display: flex;      
        align-items: center;                 
        max-width: 50%;   
        margin-bottom: 10px;
    }
    .coupon-section>input {
        margin-left: 2%;   
        margin-bottom: 5px; 
    }
    .coupon-section>a, .coupon-section>button {
        margin-left: 10px;
        margin-bottom: 5px;    
        margin-top: 5px;            
    }
    .coupon-section>.box {
        padding: 20px;        
        margin: 0 !important;
    }    
    .cart-container {
        margin-top: 150px !important;
    }
    .cart-header {
        background-color: #1A1A1A;           
    }
    .cart-header>.hero-body>.container>* {
        color: $accent_color !important;
        padding-right: 0;
        margin-right: 0;
    }    
    .cart-buttons {
        margin-top: 50px;
    }
    .continue-button {
        background-color: #1A1A1A !important;
        color: $accent_color !important;
        border: none !important;
        transition: all .2s ease-in-out !important;
    }
    .continue-button:hover {        
        opacity: 0.8 !important;
    }
    .checkout-button {
        border: 1px solid #1A1A1A !important;
        color: #1A1A1A !important;   
        transition: all .3s ease-in-out;     
        margin-top: 5px;
    }    
    .checkout-button:hover {
        border-color: #1A1A1A !important;
        color: $accent_color !important;
        background-color: #1A1A1A !important;
    }

    @media only screen and (max-width: 960px) {
        .coupon-section {
            display: block;
        }
    }
</style>
