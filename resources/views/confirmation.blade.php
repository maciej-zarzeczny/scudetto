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
        
    <confirmation number="{{ $order_id }}" error="{{ $error }}"></confirmation>
    </div>
@endsection