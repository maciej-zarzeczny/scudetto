@component('mail::message')

@component('mail::panel')
Twoje zamówienie numer {{ $order->id }} zmieniło swój status na: <b>{{ $order->status }}</b>
@endcomponent
<p>Informujemy, ze otrzymaliśmy płatnośc za zamówienie i jest one przygotowywane do wysłania.</p>

Pozdrawiamy, zespół
{{ config('app.name') }}
@endcomponent
