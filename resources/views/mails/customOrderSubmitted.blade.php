@component('mail::message')

@component('mail::panel')
Złozono zamówienie z konfiguratora
@endcomponent
<p><strong>Numer zamówienia:</strong> {{ $order->id }}</p>
<p><strong>Kwota zamówienia:</strong> 299 zł</p>
<p><strong>Tkanina: </strong>{{ $product->tkanina }}</p>
<p><strong>Podszewka: </strong>{{ $product->podszewka }}</p>
<p><strong>Guziki: </strong>{{ $product->guziki }}</p>
<p><strong>Rozmiar: </strong>{{ $product->size }}</p>
<p><strong>Imię zamawiającego: </strong>{{ $order->name }}</p>
<p><strong>Adres zamawiającego: </strong>{{ $order->address }}, {{ $order->post_code }}</p>
<p><strong>Numer: </strong>{{ $order->phone_number }}</p>
<p><strong>Adres email: </strong>{{ $order->email }}</p>
<p><strong>Dodatkowe informacje: </strong>{{ $order->additional_info }}</p>
@endcomponent
