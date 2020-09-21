@extends('layouts.master')

@section('fb-events')
    fbq('track', 'CompleteRegistration');
@endsection

@section('content')
    <dark-navbar isloginpage></dark-navbar>
    @if ($errors->any())
        <register-form csrf="{{ csrf_token() }}" failed></register-form>
    @else
        <register-form csrf="{{ csrf_token() }}"></register-form>
    @endif    
@endsection
