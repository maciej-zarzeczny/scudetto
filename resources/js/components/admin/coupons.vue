<template>
    <div>
        <section class="hero is-info welcome is-small">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        Kupony rabatowe
                    </h1>
                    <h2 class="subtitle">
                        Dodawaj i edytuj kupony rabatowe
                    </h2>
                </div>
            </div>
        </section>
         <section class="coupons">                    
            <table class="table is-fullwidth">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nazwa</th>
                        <th>Zniżka</th>                        
                        <th>Akcja</th>                                
                    </tr>
                </thead>                 
                <tbody>
                    <tr v-for="(coupon, index) in coupons" v-bind:key="index">
                        <th>{{ index+1 }}</th>
                        <td>{{ coupon.name }}</td>
                        <td>{{ coupon.discount }} %</td>
                        <td>
                            <a class="button is-danger is-outlined" @click="deleteCoupon(index)">
                                <span>Usuń</span>
                                <span class="icon is-small">
                                    <i class="fas fa-times"></i>
                                </span>
                            </a>
                        </td>
                    </tr>    
                </tbody>                                         
            </table>  
        </section>  
        <section class="add-coupon">
            <input class="input" type="text" placeholder="Nazwa" v-model="newCoupon">
            <input class="input" type="tel" placeholder="Zniżka (1 - 99 %)" v-model="newDiscount">
            <a class="button is-primary" @click="addNewCoupon()">Dodaj</a>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            coupons: [],
            newCoupon: '',
            newDiscount: ''
        }
    },
    methods: {
        deleteCoupon(index) {
            var id = this.coupons[index].id;
            axios.delete('/coupons/' + id).then(resposne => {
                this.coupons.splice(index, 1);
            }).catch(error => {
                alert('Wystąpił błąd: ' + error);
            });
        },
        addNewCoupon() {
            if (this.newCoupon == '' || this.newDiscount == '') {
                alert('Wprowadź wszystkie dane');
                return;
            } else if (parseInt(this.newDiscount) < 1 || parseInt(this.newDiscount) > 99) {
                alert('Wprowadź wartośc kuponu w przedziale: 1 - 99 %');
                return;
            }
            
            axios.post('/coupons', {
                name: this.newCoupon,
                discount: parseInt(this.newDiscount)
            }).then (response => {
                axios.get('/coupons').then(response => {
                    this.coupons = response.data;
                    this.newCoupon = '';
                    this.newDiscount = '';
                });
            }).catch(error => {
                alert('Wystąpił błąd: ' + error);
            });
        }
    },
    mounted() {
        axios.get('coupons').then(response => {
            this.coupons = response.data;
        });
    }
}
</script>

<style lang="scss">
    .add-coupon {
        margin-top: 30px;
        display: flex;
        max-width: 40%;
    }
    .add-coupon>a {
        margin-left: 10px;
    }
    .add-coupon>input:last-of-type {
        margin-left: 10px;
    }
</style>