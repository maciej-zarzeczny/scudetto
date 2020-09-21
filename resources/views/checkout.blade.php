@extends('layouts.master')

@section('content')    
    @auth
        @if (auth()->user()->isAdmin())
            <div id="checkout-page">
                <dark-navbar isloggedin isAdmin></dark-navbar>
                <checkout-view userobject="{{ auth()->user() }}"></checkout-view>
            </div>
        @else
            <div id="checkout-page">
                <dark-navbar isloggedin></dark-navbar>
                <checkout-view userobject="{{ auth()->user() }}"></checkout-view>
            </div>
        @endif        
    @else        
        <div id="checkout-page">
            <dark-navbar></dark-navbar>
            <checkout-view></checkout-view>
        </div>        
    @endauth    
@endsection