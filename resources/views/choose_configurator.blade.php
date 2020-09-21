@extends('layouts.master')

@section('fb-events')
    fbq('track', 'CustomizeProduct');
@endsection

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

    <choose-configurator></choose-configurator>
@endsection