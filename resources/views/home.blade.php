@extends('layouts.master')

@section('content')    
    @auth        
        @if (auth()->user()->isAdmin())
            <navbar isloggedin isAdmin></navbar> 
        @else
            <navbar isloggedin></navbar>
        @endif
    @else
        <navbar></navbar>
    @endauth        
    <video-header></video-header>    

    <div id="home-page">
        <about-us></about-us>        
        <gallery></gallery>
        <site-footer></site-footer>
    </div>   
    @endsection