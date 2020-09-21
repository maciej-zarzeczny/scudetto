<template>
    <div class="container" id="register-page">
        <section class="register-section">
            <form action="/register" method="POST" class="register-box">            
                <div class="image-parent">
                    <figure class="image is-64x64">
                        <img src="/images/logo/logo.png">
                    </figure>
                </div>             
                <div class="notification is-danger form-field" v-if="error">
                    <p>{{ $t('messages.email_exists') }}</p>
                </div>
                <div class="field is-horizontal form-field">                    
                    <div class="field-body">
                        <div class="field">
                            <p class="control is-expanded has-icons-left">
                                <input class="input is-medium" type="text" id="name" name="name" :placeholder="$t('messages.name')" required>
                                <span class="icon is-small is-left">
                                    <i class="fas fa-user"></i>
                                </span>
                            </p>
                        </div>
                        <div class="field is-expanded">
                            <div class="field has-addons">
                                <p class="control">
                                    <a class="button is-static is-medium">
                                        +48
                                    </a>                                    
                                </p>    
                                <p class="control is-expanded">
                                    <input class="input is-medium" type="tel" id="phone" name="phone" :placeholder="$t('messages.number')" required>
                                </p>                                
                            </div>                            
                        </div>                        
                    </div>                    
                </div>                

                <div class="field is-horizontal">                    
                    <div class="field-body">
                        <div class="field">
                            <p class="control is-expanded has-icons-left">
                                <input class="input is-medium" type="email" id="email" name="email" placeholder="Email" required @focus="error = false">
                                <span class="icon is-small is-left">
                                    <i class="fas fa-envelope"></i>
                                </span>                                
                            </p>
                        </div>
                    </div>
                </div>

                <div class="field">                    
                    <div class="control has-icons-left">
                        <input class="input is-medium" :class="{ 'passwords-match': passwordsMatch }" type="password" id="password" name="password" :placeholder="$t('messages.password')" v-model="password" required>
                        <span class="icon is-small is-left">
                            <i class="fas fa-lock" :class="{ 'passwords-match': passwordsMatch }"></i>
                        </span>
                    </div>
                </div>
                <div class="field">                    
                    <div class="control has-icons-left">
                        <input class="input is-medium" :class="{ 'passwords-match': passwordsMatch }" v-on:keyup="checkPasswords()" type="password" id="password-confirm" name="password_confirmation" :placeholder="$t('messages.password_repeat')" v-model="repeatPassword" required>
                        <span class="icon is-small is-left">
                            <i class="fas fa-lock" :class="{ 'passwords-match': passwordsMatch }"></i>
                        </span>
                    </div>
                </div>                
                <p class="register-paragraph">{{ $t('messages.have_account') }}<a href="login">{{ $t('messages.login')   }}</a></p>
                <input type="hidden" name="_token" :value="token">            
                <div class="control has-text-centered">
                    <button type="submit" class="button is-primary register-button-form" :disabled="!passwordsMatch">{{ $t('messages.register') }}</button>
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
            password: '',
            repeatPassword: '',
            passwordsMatch: false,
            error: ''
        }
    },
    methods: {
        checkPasswords() {
            if (this.password == this.repeatPassword && this.password != '') {
                this.passwordsMatch = true;
            } else {
                this.passwordsMatch = false;
            }
        }
    },
    created() {
        this.error = this.failed;
    }
}
</script>

<style lang="scss">
    @import '~@/_bulma-variables.scss';
    @import '~@/_variables.scss';

    .register-button-form {
        background-color: transparent !important;
        color: #1A1A1A !important;
        border-color: #1A1A1A !important; 
        transition: all .3s ease-in-out;
        margin-top: 15px;
    }
    .register-button-form:hover {
        background-color: #1A1A1A !important;
        color: $accent-color !important;        
    }
    .register-box {
        max-width: 60% !important;
        min-width: 40% !important;        
    }
    .register-section {        
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
        margin-top: 50px;
    }
    .register-paragraph {
        font-size: 10pt !important;
        color: #B5B5B5;
    }    
    .passwords-match {
        border-color: $green-alert-color !important;
        color: $green-alert-color !important;
    }
    .passwords-mismatch {
        border-color: $red-alert-color !important;
        color: $red-alert-color !important;
    }
</style>