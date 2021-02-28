<template>
    <article class="product">
        <div class="product-img-container">
            <img :src="image2.image_url" alt="Product image" />
            <img
                :src="image1.image_url"
                @mouseover="imgHover = true"
                @mouseleave="imgHover = false"
                alt="Product image"
                :class="{ invisible: imgHover }"
            />
        </div>
        <div class="product-label">
            <p class="product-name">{{ product.name }}</p>

            <div class="product-prices">
                <strong>
                    <p
                        v-if="product.type != 'voucher'"
                        class="main-product-price"
                        :class="{
                            'product-old-price': isOnSale
                        }"
                    >
                        {{ product.price }} zł
                    </p>
                </strong>
                <strong>
                    <p
                        class="main-product-price"
                        :class="{ 'new-price': isOnSale }"
                        v-if="isOnSale"
                    >
                        {{ product.discountPrice }} zł
                    </p>
                </strong>
            </div>
        </div>
    </article>
</template>

<script>
export default {
    props: {
        product: Object,
        image1: Object,
        image2: Object
    },
    data() {
        return {
            isOnSale: false,
            imgHover: false
        };
    },
    mounted() {
        if (
            this.product.discountPrice < this.product.price &&
            this.product.discountPrice != 0
        ) {
            this.isOnSale = true;
        }
    }
};
</script>

<style lang="scss">
@import "~@/_variables";

.product {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 5rem;
}

.product-img-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    img {
        max-width: 60%;
        transition: all 0.2s ease-in;
    }

    img:last-of-type {
        position: absolute;
    }
}

.product-label {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-top: 1rem;
    min-width: 40%;
    padding: 10px 15px 10px 15px;
    background-color: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.product-prices {
    display: flex;
    align-items: center;
}

.invisible {
    opacity: 0;
}

.product-name {
    font-size: 15pt;
    color: #1a1a1a;
    font-weight: 200;
    margin: 0 !important;
}
.main-product-price {
    font-weight: 200;
    color: #1a1a1a;
    font-size: $product-price-font-size;
    margin-left: 10px;
}
.product-old-price {
    text-decoration: line-through;
}
.new-price {
    color: $product-sale-price-color;
    margin-left: 5px;
}
@media only screen and (min-width: 768px) {
    .product-name {
        font-size: 7pt;
    }
    .main-product-price {
        font-size: 7pt;
    }
    .product-old-price {
        font-size: 7pt;
    }
    .product-name-price {
        margin-top: -10px;
    }
}
@media only screen and (min-width: 1200px) {
    .product-name {
        font-size: 9pt;
    }
    .main-product-price {
        font-size: 9pt;
    }
    .product-old-price {
        font-size: 9pt;
    }
    .product-name-price {
        margin-top: -10px;
    }
}
@media only screen and (min-width: 1400px) {
    .product-name {
        font-size: 11pt;
    }
    .main-product-price {
        font-size: 11pt;
    }
    .product-old-price {
        font-size: 11pt;
    }
    .product-name-price {
        margin-top: -15px;
    }
}
@media only screen and (min-width: 1750px) {
    .product-name {
        font-size: 13pt;
    }
    .main-product-price {
        font-size: 13pt;
    }
    .product-old-price {
        font-size: 13pt;
    }
    .product-name-price {
        margin-top: -20px;
    }
}
@media only screen and (min-width: 2100px) {
    .product-name {
        font-size: 15pt;
    }
    .main-product-price {
        font-size: $product-price-font-size;
    }
    .product-old-price {
        font-size: $product-sale-price-font-size;
    }
    .product-name-price {
        margin-top: -20px;
    }
}
</style>
