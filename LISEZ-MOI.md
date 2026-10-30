# Site KOZ SERVICES — mode d'emploi

## Les fichiers
- `index.html` accueil · `catalogue.html` catalogue · `vehicule.html` fiche d'un véhicule (`vehicule.html?id=...`)
- `services.html` services et simulateur · `contact.html` contact · `mentions-legales.html` · `404.html`
- `css/style.css` : tout le style du site (une seule feuille)
- `js/vehicles-data.js` : **la liste des véhicules**. C'est le seul fichier à modifier pour ajouter, retirer ou changer un véhicule.
- `js/site.js` : panier, favoris, recherche, menu, horaires, mode clair / sombre · un fichier `js/...` par page
- `sitemap.xml`, `robots.txt`, `site.webmanifest`, `img/og-koz.jpg` (image de partage WhatsApp / Facebook)

## Votre logo (à faire en premier)
- Copiez votre logo dans le dossier `img/` et nommez-le **`logo.png`** (de préférence sur fond transparent). Il apparaît alors en haut et en bas de toutes les pages.
- Facultatif : une version blanche du logo nommée **`logo-blanc.png`**, utilisée en mode sombre et dans le pied de page. Sans elle, le logo normal s'affiche sur une petite plaque blanche.
- Tant qu'il n'y a pas de logo dans `img/`, le nom « KOZ SERVICES » s'affiche à la place.

## Mode clair et mode sombre
- Le bouton lune / soleil en haut de chaque page change le mode. Le choix du visiteur est retenu d'une page à l'autre.
- À la première visite, le site suit le réglage du téléphone ou de l'ordinateur du visiteur.
- Les couleurs des deux modes sont en haut de `css/style.css` (section 1).

## Avant la mise en ligne
1. **Nom de domaine** : remplacez partout `https://www.kozservices.com` par votre vraie adresse (Rechercher / Remplacer dans tout le dossier, avec VS Code). Fichiers concernés : toutes les pages `.html`, `sitemap.xml`, `robots.txt`.
2. **Mentions légales** : complétez RCCM, IFU et hébergeur dans `mentions-legales.html`.
3. **Réseaux sociaux** : remplacez les liens de recherche Facebook et TikTok par les liens de vos vraies pages.
4. **Photos** : mettez vos propres photos dans `img/vehicules/` et indiquez-les dans `images: [...]` de chaque véhicule. Un véhicule sans photo affiche l'emplacement « Photo bientôt ».
5. **Page 404** : si votre hébergeur le permet, indiquez `404.html` comme page d'erreur.

## Référencement (SEO) déjà en place
- Un titre et une description différents pour chaque page, avec les mots que tapent vos clients (« voiture d'occasion Ouagadougou », « import véhicule Canada Burkina »…).
- Un seul titre principal (H1) par page, des textes alternatifs sur les images.
- Fiche entreprise Google (adresse, horaires, téléphones), fil d'Ariane, liste du catalogue, FAQ et fiche de chaque véhicule (prix en FCFA, état, disponibilité) en données structurées.
- `sitemap.xml` avec les 30 fiches véhicules, `robots.txt`.
- Image d'aperçu quand le lien est partagé sur WhatsApp ou Facebook.
- Site rapide (une seule feuille de style, scripts différés, images en chargement progressif) et adapté au téléphone.
- Du contenu utile : guide d'inspection en 9 points, FAQ, textes sur l'achat à Ouagadougou.

## Après la mise en ligne (à faire par vous)
1. **Google Search Console** : ajoutez le site et envoyez `sitemap.xml`.
2. **Google Business Profile** (fiche Google Maps) : créez la fiche « KOZ SERVICES » à Tampouy avec les mêmes horaires et téléphones que le site, et des photos du showroom.
3. **Liens entrants (backlinks)** : mettez le lien du site dans la bio Facebook et TikTok, sur WhatsApp Business, et inscrivez KOZ SERVICES dans les annuaires burkinabè (par exemple GoAfricaOnline). Demandez à vos partenaires (transitaires, garages) un lien vers votre site.
4. **Suivi** : installez Google Analytics ou regardez les statistiques de Search Console chaque mois (visites, mots-clés, pages vues).
5. **Contenu** : gardez le catalogue à jour. Un véhicule vendu doit être retiré de `vehicles-data.js`.
