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

    <cart-view></cart-view>
@endsection