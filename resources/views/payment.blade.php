@extends('layouts.master')

@section('script-imports')
    <script
        src="https://www.paypal.com/sdk/js?client-id=ATA914NA5bAb3CNzFhcKDsmtKaSHhb0JsCVSxdXM49rm3_9TVizRnkRwfmNZ5IpD1woxhLZYvISSi9lR&currency=PLN">
    </script>
@endsection

@section('fb-events')
    fbq('track', 'AddPaymentInfo');
@endsection

@section('content')
    <div id="payment-page">    
        @auth
            @if (auth()->user()->isAdmin())
                <dark-navbar isloggedin isAdmin></dark-navbar>
            @else
                <dark-navbar isloggedin></dark-navbar>
            @endif        
        @else        
            <dark-navbar></dark-navbar>        
        @endauth            

    <payment number="{{ $number }}" amount="{{ $amount }}" discountamount="{{ $discountAmount }}" email="{{ $email }}"></payment>     
    </div>

    @section('additional-scripts')
        <script>
            paypal.Buttons({
                createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                    amount: {
                        value: {{ $discountAmount }} != 0 ? {{ $discountAmount }} : {{ $amount }}
                    }
                    }]
                });
                },
                onApprove: function(data, actions) {
                // Capture the funds from the transaction
                return actions.order.capture().then(function(details) {
                    // Show a success message to your buyer
                    window.location.href = "/confirmation/" + {{ $number }};       
                });
                }
            }).render('#paypal-button-container');
        </script>
    @endsection    
@endsection