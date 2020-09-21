<template>
    <div class="container" id="login-page">               
        <section class="login-section">                                    
            <form action="/login" method="post" class="login-box">               
                <div class="image-parent">
                    <figure class="image is-64x64">
                        <img src="/images/logo/logo.png">
                    </figure>
                </div>         
                <div class="notification is-danger form-field" v-if="error">
                <p>{{ $t('messages.wrong_login') }}</p>
                </div>       
                <div class="field form-field">
                    <p class="control has-icons-left">
                        <input class="input is-medium" type="email" placeholder="Email" id="email" name="email" @focus="error = false">
                        <span class="icon is-small is-left">
                            <i class="fas fa-envelope"></i>
                        </span>            
                    </p>
                </div>
                <div class="field">
                    <p class="control has-icons-left">
                    <input class="input is-medium" type="password" :placeholder="$t('messages.password')" id="password" name="password" @focus="error = false">
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                    </p>
                </div>                
                <p class="register-paragraph">{{ $t('messages.no_account') }}<a href="/register">{{ $t('messages.register') }}</a></p>
                <input type="hidden" name="_token" :value="token">
                <div class="field">
                    <p class="control has-text-centered">
                        <button type="submit" class="button is-success login-button-form">
                            {{ $t('messages.login') }}
                        </button>
                    </p>
                </div>  
            </form>    
        </section>                
    </div>    
</template>

<script>
export default {
    props: {
        csrf: String,
        failed: Boolean
    },
    data() {
        return {
            token: this.csrf,
            error: ''
        }
    },
    created() {
        this.error = this.failed;
    }
}
</script>

<style lang="scss">
    @import '~@/_bulma-variables.scss';

    .form-field {
        margin-top: 50px;
    }
    .login-button-form {
        background-color: transparent !important;
        color: #1A1A1A !important;
        border-color: #1A1A1A !important; 
        transition: all .3s ease-in-out;
        margin-top: 15px;
    }
    .login-button-form:hover {
        background-color: #1A1A1A !important;
        color: $accent-color !important;        
    }
    .login-box {
        max-width: 60% !important;
        min-width: 40% !important;        
    }
    .login-section {        
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
    .input {
        border-width: .5px !important;
    }
    .image-parent {
        display: flex;
        justify-content: center;
        margin-bottom: 15px;
    }
    .register-paragraph {
        font-size: 10pt !important;
        color: #B5B5B5;
    }
</style>

