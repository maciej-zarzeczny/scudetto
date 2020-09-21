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
    
    <div id="shop-page">
        <section class="section shop-section">
            <div class="content">                       
                @for ($i = 0; $i < count($products); $i++)
                    @if ($i % 3 == 0 && $i == 0)
                        <div class="columns">                        
                    @elseif ($i % 3 == 0)
                        </div>
                        <div class="columns">
                    @endif
                    <div class="column is-one-third">
                        <a href="products/{{ $products[$i]->id }}"><product-item :product="{{ $products[$i] }}" :image1="{{ $products[$i]->images->get(0) }}" :image2="{{ $products[$i]->images->get(1) }}"></product-item></a>
                    </div>
                @endfor
            </div>
        </section>
    </div>    
@endsection