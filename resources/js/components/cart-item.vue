<template>
    <article class="media product-item">
        <figure class="media-left">
            <p class="image is-64x64">
                <img :src="imageUrl(product.imageUrl)">
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <p>{{ product.name }} - <strong>{{ product.size }}</strong> {{ amount(product.amount) }}</p>
                <p class="price">{{ price(product.price, product.amount) }} zł</p>
            </div>            
        </div>
        <div class="media-right">
            <button class="delete" @click="removeFromCart(product)"></button>
        </div>
    </article>
</template>

<script>
export default {    
    props: {
        product: Object,
        image: Object
    },
    methods: {
        imageUrl(url) {
            if (url != null) {
                return url;
            } else {
                return "/images/logo/logo.png";
            }
        },        
        price(value, amount) {
            if (this.product.discountPrice != 0 && this.product.discountPrice < value) {
                return this.product.discountPrice * amount;
            } else {
                return value * amount;
            }
            
        },
        amount(amount) {
            if (amount > 1) {
                return '(' + amount + ')';
            } else {
                return '';
            }
        },
        removeFromCart(product) {            
            cart.removeProduct(product);
        }
    }
}
</script>

<style lang="scss">
    @import '~@/_variables';    

    .product-item {
        margin-top: 50px !important;
    }
    .media {
        margin-top: 20px;
    }
    .price {
        color: $product-price-color;
    }
</style>
