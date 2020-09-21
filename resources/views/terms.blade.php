@extends('layouts.master')

@section('content')
    @auth        
    @if (auth()->user()->isAdmin())
        <dark-navbar isloggedin isAdmin></dark-navbar> 
    @else
        <dark-navbar isloggedin></dark-navbar>
    @endif
    @else
    <dark-navbar></dark-navbar>
    @endauth    
    
    <div id="terms-page">
        <div class="container">
            <div class="content">
                <div class="box">
                    <div class="has-text-centered">
                        <p><strong>{{ __('messages.terms-title') }}</strong></p>
                    </div>                    
                    <br>
                    <br>
                    <ol>
                        <li>{{ __('messages.terms-contact-0') }}<a href="https://www.facebook.com/Scudetto-1127607537444039/?modal=admin_todo_tour" target="_blank">{{ __('messages.terms-contact-1') }}</a>{{ __('messages.terms-contact-2') }}</li>
                        <li>{{ __('messages.terms-time') }}</li>
                        <li>{{ __('messages.terms-refunds') }}</li>
                        <li>{{ __('messages.terms-payments') }}</li>
                        <li>{{ __('messages.terms-rodo') }}</li>
                    </ol>    
                    <br>
                <a href="{{ url()->previous() }}" class="button checkout-button is-outlined">
                        <span>Powrót</span>                    
                    </a>
                </div>
            </div>
        </div>
    </div>
@endsection