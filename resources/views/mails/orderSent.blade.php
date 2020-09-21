@component('mail::message')

@component('mail::panel')
Drogi kliencie,
@endcomponent
<div style="display:flex; justify-content: center; min-width: 100%;">
    <div>
        <img src="http://scudetto.store/images/page/mail_photo4.jpg" alt="Mail photo" style="max-width: 120px; max-height: 120px; margin-right: 10px;">
        <img src="http://scudetto.store/images/page/mail_photo5.jpg" alt="Mail photo" style="max-width: 120px; max-height: 120px; margin-right: 10px;"> 
        <img src="http://scudetto.store/images/page/mail_photo6.jpg" alt="Mail photo" style="max-width: 120px; max-height: 120px; margin-right: 10px;">        
    </div>    
</div>
<br>
<p>z radością informujemy, że wybrana przez Ciebie kamizelka została z czułością uszyta, dokładnie sprawdzona przez komisję kontroli jakości, starannie zapakowana i przekazana kurierowi. Mamy nadzieję, że będzie to Twoja ulubiona część garderoby, chętnie przyjmiemy opinie o naszym produkcie, w który wkładamy tyle serca. Nie zapomnij też oznaczyć nas w mediach społecznościowych: #scudetto @scudetto.store</p>

<br>
Pozdrawiamy,
<br>
{{ config('app.name') }} Team
<br>
<a href="http://scudetto.store">www.scudetto.store</a>
@endcomponent
