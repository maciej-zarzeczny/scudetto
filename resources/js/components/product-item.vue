<template>
    <div class="card" id="product-item">
        <div class="card-image">
            <div class="shop-image-parent">             
                <img src="/images/page/shop_border.png" alt="Product border" class="border-image" @mouseover="imgHover = true" @mouseleave="imgHover = false">                    
                <img :src="image2.image_url" alt="Product image">
                <img :src="image1.image_url" alt="Product image" :class="{ 'invisible': imgHover }">                
            </div>            
        </div>  
        <div class="card-content product-name-price">      
            <div class="level-parent">
                <div class="level">
                    <div class="level-left">
                        <div class="level-item">
                            <p class="product-name">{{ product.name }}</p>
                        </div>
                    </div>
                    <div class="level-right">
                        <div class="level-item">
                            <div class="prices">
                                <strong><p class="main-product-price" :class="{ 'product-old-price': isOnSale }">{{ product.price }} zł</p></strong>
                                <strong><p class="main-product-price" :class="{ 'new-price': isOnSale }" v-if="isOnSale">{{ product.discountPrice }} zł</p></strong>
                            </div>                      
                        </div>
                    </div>
                </div>            
            </div>                  
        </div>
    </div>
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
            imgHover: false,                        
        }
    },    
    methods: {
        onWindowResize() {
            var width = window.innerWidth;        
            var imageContainer = document.getElementsByClassName('shop-image-parent');
            for (var i=0; i<imageContainer.length; i++) {
                if (width >= 769) {
                    imageContainer[i].style.height = 0.3 * width + 'px';
                } else if (width >= 400) {
                    imageContainer[i].style.height = 0.87 * width + 'px';
                } else {
                    imageContainer[i].style.height = 0.8 * width + 'px';
                }
            }
        }
    },
    mounted() {
        if (this.product.discountPrice < this.product.price && this.product.discountPrice != 0) {
            this.isOnSale  = true;
        }   

        window.addEventListener('resize', this.onWindowResize);     
        this.onWindowResize();   
    }
}
</script>

<style lang="scss">
    @import '~@/_variables';    
        
    .invisible {
        opacity: 0;
    }        
    .shop-image-parent {
        position: relative;        
    }
    .shop-image-parent img {
        transition: all .2s ease-in;
        position: absolute;                
    }    
    .shop-image-parent img:not(.border-image) {
        max-width: 55%;
        left: 22%;
        margin-top: 11.5%;
    }
    .border-image {
        z-index: 10;
        left: 10%;
        max-width: 80%;
    }    
    .product-name {
        font-size: 15pt;
        color: #1a1a1a;
        font-weight: 200;
    }
    .main-product-price {
        font-weight: 200;
        color: #1a1a1a;
        font-size: $product-price-font-size;
        margin-left: 10px;
    }
    .prices {
        display: flex;
        justify-content: left;
        align-items: center;
    }
    .product-old-price {
        text-decoration: line-through;                        
    }
    .new-price {
        color: $product-sale-price-color;
        margin-left: 5px;
    }           
    .product-name-price {                
        display: flex;
        justify-content: center;
        padding: 0 !important;
    }
    .product-name-price>.level-parent {                                       
        padding: 10px 15px 10px 15px;
        min-width: 40%;
        background-color: white;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);        
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
