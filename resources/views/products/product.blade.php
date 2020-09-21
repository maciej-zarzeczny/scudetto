@extends('layouts.master')

@section('additional-meta')
    <meta property="og:title" content="{{ $product->name }}">

    <meta property="og:description" content="{{ $product->shortDescription }}">

    <meta property="og:url" content="https://scudetto.store/products/{{ $product->id }}">

    <meta property="og:image" content="https://scudetto.store{{ $product->images[0]->image_url }}">

    <meta property="product:brand" content="Scudetto">

    <meta property="product:availability" content="in stock">

    <meta property="product:condition" content="new">

    <meta property="product:price:amount" content="{{ $product->price }}">

    <meta property="product:price:currency" content="PLN">

    <meta property="product:retailer_item_id" content="scudettoVest_{{ $product->id }}">
@endsection

@section('fb-events')
    fbq('track', 'ViewContent', {
        content_type: 'product',
        content_ids: ['{{ $product->id }}'],
        content_name: '{{ $product->name }}',
    });
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

    <product-overview :product="{{ $product }}" :sizes="{{ $product->sizes }}" :images="{{ $product->images }}">
        {{-- <template slot="description-tab">
            {{ $product->longDescription }}
        </template>
        <template slot="materials-tab">
            {{ $product->materials }}
        </template> --}}
    </product-overview>    
    
@endsection