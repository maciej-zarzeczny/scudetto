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
                        <p><strong>{{ __('messages.company-info-title') }}</strong></p>
                    </div>         
                    <br>
                    <p>Scudetto Mariusz Dąbrowski Piotr Wojdyło spółka cywilna</p>
                    <p>Kasztanowa 7 A</p>
                    <p>32-005 Niepołomice</p>
                    <p>6832106893</p>
                    <br>
                <a href="{{ url()->previous() }}" class="button checkout-button is-outlined">
                        <span>Powrót</span>                    
                    </a>
                </div>
            </div>
        </div>
    </div>
@endsection