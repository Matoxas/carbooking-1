<a href='https://cbooking.lt'>
   <img src='https://raw.githubusercontent.com/nfqakademija/carbooking/master/public/images/logoOrange.jpg' width="420" />
 </a>

Automobilių nuomavimosi sistema
============

[![Build Status](https://api.travis-ci.com/programeriss/carbooking.svg?token=ocmvJx1sYZzKwL5Pycus&branch=master)](https://travis-ci.com/programeriss/carbooking)

# Turinys

 - [Projekto aprašymas](#Projekto_aprašymas)
 - [Reikalavimai](#Reikalavimai)
 - [Projekto paleidimas](#Projekto_paleidimas)
 - [Patogiai darbo aplinkai](#Patogiai_darbo_aplinkai)
 - [Komanda](#Komanda)

# Projekto aprašymas

Populiarėjant automobilių nuomai iš kitų žmonių, sukūrėme tinklapį - [**CarBooking**](https://cbooking.lt), 
taip siekdami sutraukti tikslinę auditoriją į vieną vietą ir sutaupyti laiką automobilių paieškose.

Šio tinklapio dėka, galime išsinuomoti patikusį automobilį arba 
įkelti savo automobilį nuomai. Naudotojo patogumui buvo sukurta filtravimo, rikiavimo, puslapiavimo sistema. 
Taip pat įgyvendinta galimybė užsiprenumeruoti pranešimus atsiradus nuomoje norimam automobiliui... Žemėlapis ir t.t.
Nepamiršta ir administracijos pusė! Iš jos galima keisti/trinti netinkamus skelbimus ir komentarus!

# Reikalavimai

* docker: `18.x-ce`
* docker-compose: `1.20.1`


# Projekto paleidimas

* Pasileidžiama infrastruktūrą per `docker`:
```bash
scripts/start.sh
```

* Įsidiegiame PHP ir JavaScript bibliotekas:
```bash
scripts/install-prod.sh
```

* Įkeliame iš anksto paruoštus testinius duomenis(Nepamirškime prieš tai atnaujinti `.env` failo):
```bash
$ php bin/console d:d:c
$ php bin/console d:m:m
$ php bin/console d:f:l
```

* Pasižiūrime, ar veikia.
  Naršyklėje atidarius [`http://127.0.0.1:8000/`](http://127.0.0.1:8000/)

* Senų, ir nebereikalingų duomenų valymas:
```bash
$ php bin/console app:delete-old-users --outdated 20d.
$ php bin/console app:delete-old-cars --outdated 20d.
```

* Pabaigus, gražiai išjungiame:
```bash
scripts/stop.sh
```

### Patogiai darbo aplinkai

* _Development_ režimas (detalesnė informacija apie klaidas, automatiškai generuojami JavaScript/CSS):
```bash
scripts/install-dev.sh
```

* Jei norite pridėti PHP biblioteką arba dirbti su Symfony karkasu per komandinę eilutę:
```bash
scripts/backend.sh
```

* Jei norite pridėti JavaScript/CSS biblioteką arba dirbti su Symfony Encore komponentu per komandine eilutę:
```bash
scripts/frontend.sh
```

* Jei norite dirbti su MySql duomenų baze:
```bash
scripts/mysql.sh
```

* Jei nesuprantate, kas vyksta su infrastruktūra, praverčia pažiūrėti į `Log`'us:
```bash
scripts/logs.sh
```

* Jei kažką stipriai sugadinote ir niekaip nepavyksta atstatyti.
  Viską pravalyti (**naudokite atsakingai**) galima su:
```bash
scripts/clean-and-start-fresh.sh
```

### Komanda

#### Mentoriai:

 - Monika
 - Tomas

#### Programuotojai:

 - Aidas
 - Matas
 - Adomas
