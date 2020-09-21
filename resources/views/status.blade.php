@extends('layouts.master')

@section('content')
    <div id="confirmation-page">    
        @auth
            @if (auth()->user()->isAdmin())
                <dark-navbar isloggedin isAdmin></dark-navbar>
            @else
                <dark-navbar isloggedin></dark-navbar>
            @endif        
        @else        
            <dark-navbar></dark-navbar>        
        @endauth    
        
    <payment-status basicauth="{{ $basic_auth }}"></payment-status>
    </div>
@endsection