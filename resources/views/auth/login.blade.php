@extends('layouts.master')

@section('content')
    <dark-navbar isloginpage></dark-navbar>
    @if ($errors->any())        
        <login-form csrf="{{ csrf_token() }}" failed></login-form>
    @else
        <login-form csrf="{{ csrf_token() }}"></login-form>
    @endif
@endsection
