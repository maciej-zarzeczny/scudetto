<template>
     <section class="section shop-section">
        <div class="content">
            <div class="columns">                
                <div class="column">
                    <figure class="image is-centered is-pulled-right">
                        <button @click="changeImage(0)" class="button arrow-button is-medium">
                            <span class="icon is-small">
                                <i class="fas fa-arrow-left"></i>
                            </span>
                        </button>
                        <img :src="imageSrc" class="product-image">
                        <button @click="changeImage(1)" class="button arrow-button is-medium">
                            <span class="icon is-small">
                                <i class="fas fa-arrow-right"></i>
                            </span>    
                        </button>
                    </figure>                                                                   
                </div>
                <div class="column">
                    <h1>{{ product.name }}</h1>
                    <div class="prices">
                        <strong><p class="product-price" :class="{ 'old-price': isOnSale }">{{ product.price }} zł</p></strong>
                        <strong><p class="product-price" :class="{ 'new-price': isOnSale }" v-if="isOnSale">{{ product.discountPrice }} zł</p></strong>
                    </div>
                    <p class="product-description">{{ lang == 'pl' ? product.shortDescription : product.shortEnglishDescription }}</p>

                    <div class="product-separator"></div>
                    
                    <p class="label">{{ $t('messages.size') }}</p>

                    <div class="buttons are-small size-buttons">
                        <a class="button" v-for="size in sizes" :key="size.id" :disabled="checkQuantity(size)" :class="{ 'active-size':size.id == selected }" @click="selectSize(size)">{{ size.sizeName }}</a>                        
                    </div>

                    <p class="label">{{ $t('messages.quantity') }}</p>

                    <div class="quantity-container">
                        <button class="button quantity-button" @click="decreaseQuantity()">
                            <span class="icon is-small">
                                <i class="fas fa-minus"></i>
                            </span>
                        </button>
                        <input type="text" class="quantity-input has-text-centered" disabled v-model="quantity">
                        <button class="button quantity-button" @click="increaseQuantity()">
                            <span class="icon is-small">
                                <i class="fas fa-plus"></i>
                            </span>
                        </button>
                        <button class="button add-to-cart-button" @click="addToCart()" :disabled="selected == ''">{{ $t('messages.add_to_cart') }}</button>                             
                        <span class="tag added-to-cart-tag" :class="{ 'added-to-cart-active': addedToCart }">
                            {{ $t('messages.product-added-to-cart') }}          
                            <i class="fas fa-lg fa-check added-icon"></i>                        
                        </span>                            
                    </div>                                        

                    <!-- TABS -->            
                    <div class="tabs is-boxed description-tabs">
                        <ul>
                            <li :class="{ 'is-active': activeTabs[0] }" @click="changeTab(0)"><a>{{ $t('messages.product_description') }}</a></li>
                            <li :class="{ 'is-active': activeTabs[1] }" @click="changeTab(1)"><a>{{ $t('messages.product_materials') }}</a></li>                               
                        </ul>
                    </div>
                    <div class="tabs-details description-tabs-details">
                        <div class="first-tab-details" v-if="activeTabs[0]">
                            <p>
                                {{ lang == 'pl' ? product.longDescription : product.longEnglishDescription }}
                            </p>
                        </div>
                        <div class="first-tab-details" v-if="activeTabs[1]">
                            <p>
                                {{ lang == 'pl' ? product.materials : product.englishMaterials }}
                            </p>
                        </div>                
                    </div>
                </div>
            </div>            
        </div>        
    </section>
</template>

<script>
export default {
    props: {
        product: Object,
        sizes: {},
        images: {}
    },
    data() {
        return {
            quantity: 1,
            isOnSale: false,
            activeTabs: [true, false],
            selected: '',
            addedToCart: false,
            imageSrc: '',
            number: 0,     
            lang: null       
        }
    },
    methods: {
        changeImage(direction) {   
            if (direction == 0) {
                this.number -= 1;
            }
            else if (direction == 1) {
                this.number += 1;
            }
            if (this.number >= this.images.length) {
                this.number = 0;                
            } 
            else if (this.number < 0) {
                this.number = this.images.length - 1;
            }                        
            this.imageSrc = this.images[this.number].image_url;
        },
        selectSize(size) {
            if (size.pivot.quantity > 0) {
                this.selected = size.id;
                if (this.quantity >= size.pivot.quantity - 1) {
                    this.quantity = size.pivot.quantity;
                }
            }         
        },
        checkQuantity(size) {
            if (size.pivot.quantity > 0) {
                return false;
            } else {
                return true;
            }
        },
        decreaseQuantity() {
            this.quantity -= 1;
            if (this.quantity <= 1) this.quantity = 1;
        },
        increaseQuantity() {            
            if (this.selected != '') {
                var selectedSize = '';            
                for (var i=0; i<this.sizes.length; i++) {                
                    if (this.sizes[i].id == this.selected) {
                        selectedSize = this.sizes[i];
                    }
                }         
                if (this.quantity >= selectedSize.pivot.quantity -1 ) {
                    this.quantity = selectedSize.pivot.quantity- 1;
                }
            } else {
                return;
            }
            this.quantity += 1;
        },
        changeTab(tab_number) {
            this.activeTabs = [false, false];
            this.activeTabs[tab_number] = true;            
        },
        addToCart() {                        
            var selectedSize = '';
            for (var i=0; i<this.sizes.length; i++) {                
                if (this.sizes[i].id == this.selected) {
                    selectedSize = this.sizes[i].sizeName;
                }
            }         
            if (selectedSize == '') {
                alert('Wybierz rozmiar');
            } else {   

                this.addedToCart = true;     
                this.product.amount = this.quantity;  
                this.product.size = selectedSize;
                this.product.imageUrl = this.images[0].image_url;
                cart.addProduct(this.product);
                var self = this;
                setTimeout(function() {
                    self.addedToCart = false;                    
                }, 1000);  
            }            
        }
    },
    created() {        
        if (this.product.discountPrice < this.product.price && this.product.discountPrice != 0) {
            this.isOnSale  = true;
        }        
        this.sizes.sort((a, b) => {
            var sizeA = a.sizeName.toLowerCase(), sizeB = b.sizeName.toLowerCase()
            if (sizeA < sizeB)
                return -1 
            if (sizeA > sizeB)
                return 1
            return 0 
        })
        this.imageSrc = this.images[0].image_url;
        axios.get('/language').then(response => {
            this.lang = response.data
        });
    }    
}
</script>

<style lang="scss">
    @import '~@/_bulma-variables';        
    @import '~@/_variables';      
    
    .description-tabs {
        margin-left: -3%;
        margin-top: 2%;
    }
    .description-tabs-details {
        margin-left: 1%;
        margin-right: 15%;
    }
    .quantity-container {
        margin-left: 1%;
    }
    figure>button:first-child {
        position: absolute;    
        top: 45%;
        left: 1%;    
    }
    figure>button:last-child {
        position: absolute;
        top: 45%;
        right: 1%;
    }
    .arrow-button {
        background-color: #000000 !important;
        opacity: 0.2;
        border: none;        
    }
    .arrow-button>span>i {
        color: white;
    }
    .arrow-button:hover {
        opacity: 0.5;
        border: none;
    }
    .product-image {
        max-width: 80%;        
    }
    .quantity-input { 
        max-width: 50px;
        height: 45px !important;
        border: 1px solid rgb(228, 228, 228);
        border-radius: 5px;
    }
    .quantity-input:focus {
        outline: none;
    }
    .quantity-button {
        border: 1px solid rgb(228, 228, 228);
        border-radius: 5px;
        height: 45px !important;        
    }
    .add-to-cart-button { 
        border: 1px solid rgb(228, 228, 228);
        border-radius: 0;
        margin-left: 5px;        
        height: 45px !important;
        transition: all .2s ease-in-out;
    }
    .add-to-cart-button:hover:not(:disabled) {
        color: white !important;
        background-color: $accent_color;
    }
    .added-to-cart-tag {
        border: 1px solid $accent_color;
        background-color: transparent !important;
        height: 45px !important;
        transition: all .2s ease-in-out;
        font-size: 12pt !important;      
        color: $accent_color !important;     
        opacity: 0;     
    }    
    .prices {
        display: flex;
        justify-content: left;
        align-items: center;
    }
    .old-price {
        text-decoration: line-through;        
        font-size: $product-sale-price-font-size;
    }
    .new-price {
        color: $product-sale-price-color;
        margin-left: 10px;
    }
    .tabs ul { 
        align-items: baseline !important;
    }     
    .product-separator {
        width: 100%;
        height: 1px;
        background-color: #DBDBDB;
        margin-bottom: 20px;        
    }
    .size-buttons {
        padding: 0;
        margin-bottom: 20px;        
    }
    .size-buttons>a {
        transition: all .2s ease-in-out;
        min-width: 40px;        
    }
    .size-buttons>a:hover {
        background-color: $accent_color;
        color: white;
    }
    .active-size {
        background-color: $accent_color !important;
        color: white !important;
        border-color: $accent_color !important;
    }
    p.label {        
        font-size: 10pt;
    }
    .added-icon {
        margin-left: 10px;        
        color: $accent_color;
        transition: all .2s ease-in-out;          
    }        
    .added-to-cart-active {
        opacity: 1;
    }
    .old-price {
        text-decoration: line-through;        
        font-size: $product-sale-price-font-size;
    }
    .new-price {
        color: $product-sale-price-color;
        margin-left: 10px;
    }    
    .product-price {
        color: $product-price-color;
        font-size: $product-price-font-size;
    }
    @media only screen and (max-width: 768px) {
        .description-tabs {
            margin-left: -8%;
        }
    }
    @media only screen and (min-width: 768px) {
        .description-tabs {
            margin-left: -8%;
        }
    }
    @media only screen and (min-width: 1500px) {
        .description-tabs {
            margin-left: -3.5%;
        }
    }
    @media only screen and (min-width: 2000px) {
        .description-tabs {
            margin-left: -3%;
        }
    }
</style>
