@component('mail::message')

@component('mail::panel')
Drogi kliencie, 
dziękujemy za zakup.
<br>
@endcomponent

<p>
    Po zaksięgowaniu należności wybrana przez Ciebie kamizelka trafi do produkcji. Nasze kamizelki szyte są pod konkretne zamówienie, maksymalny czas oczekiwania to 21 dni, ale stajemy na głowie by towar pojawił się u Ciebie jak najszybciej. Ciesz się dniem, czekaj cierpliwie, a my ruszamy dopieszczać Twoją kamizelkę.
    <br>    
</p>
<p><strong>Numer zamówienia:</strong> {{ $order->id }}</p>
<p><strong>Kwota zamówienia:</strong> {{ $amount }} zł</p>
<div style="display:flex; justify-content: center; min-width: 100%;">
    <div>
        <img src="http://scudetto.store/images/page/mail_photo1.jpg" alt="Mail photo" style="max-width: 80px; max-height: 80px; margin-right: 10px;">
        <img src="http://scudetto.store/images/page/mail_photo2.jpg" alt="Mail photo" style="max-width: 80px; max-height: 80px; margin-right: 10px;">
        <img src="http://scudetto.store/images/page/mail_photo3.jpg" alt="Mail photo" style="max-width: 80px; max-height: 80px; margin-right: 10px;">
    </div>    
</div>
<br>
Pozdrawiamy,
<br>
{{ config('app.name') }} Team
<br>
<a href="http://scudetto.store">www.scudetto.store</a>
@endcomponent
