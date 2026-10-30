/* ===================================================================
   KOZ SERVICES — DONNÉES DES VÉHICULES (30 véhicules)
   Sélection représentative du marché automobile en Afrique de l'Ouest.

   IMPORTANT :
   - Prix, kilométrages : EXEMPLES à remplacer par tes vraies données.
   - Photos : vraies photos Pexels (libres de droits) quand une
     correspondance fiable existait ; sinon "" à compléter toi-même sur
     pexels.com/search/<modèle> (ou une photo générique indiquée).
   - Fiche technique enrichie : moteur, puissance, couple, consommation,
     traction, coffre/charge utile, réservoir, garantie, équipements.
=================================================================== */

/* Photos : liens vers des photos libres (Pexels, Wikimedia Commons).
   Remplacez-les par vos propres photos dans img/vehicules/ dès que possible.
   Un véhicule sans photo affiche un emplacement « Photo bientôt ». */
const VEHICLES = [
  // ===== SUV (11) =====
  {
    id: "toyota-land-cruiser-300", brand: "Toyota", model: "Land Cruiser 300", year: 2025, condition: "Neuf",
    category: "SUV", fuel: "Diesel", transmission: "Automatique", mileage: 0, price: 65000000, currency: "FCFA",
    availability: "Sur commande", featured: true,
    images: ["https://images.pexels.com/photos/20584984/pexels-photo-20584984.jpeg?auto=compress&cs=tinysrgb&w=1200", "https://images.pexels.com/photos/17744273/pexels-photo-17744273.jpeg?auto=compress&cs=tinysrgb&w=1200"],
    description: "Le fleuron Toyota, conçu pour l'excellence tout-terrain comme pour le confort de conduite au quotidien.",
    specifications: { moteur: "3.3L V6 Turbo Diesel", puissance: "305 ch", couple: "700 Nm", consommation: "9.8 L/100km", traction: "4x4 permanent", transmission_detail: "10 rapports automatique", coffre: "1 131 L", reservoir: "110 L", garantie: "3 ans / 100 000 km", couleur: "Blanc nacré", places: 7, climatisation: "Automatique tri-zone", equipements: "Caméra 360°, régulateur adaptatif, sièges chauffants" }
  },
  {
    id: "toyota-land-cruiser-prado", brand: "Toyota", model: "Land Cruiser Prado", year: 2024, condition: "Neuf",
    category: "SUV", fuel: "Diesel", transmission: "Automatique", mileage: 0, price: 48000000, currency: "FCFA",
    availability: "Disponible", featured: true,
    images: ["https://images.pexels.com/photos/18029631/pexels-photo-18029631.jpeg?auto=compress&cs=tinysrgb&w=1200"],
    description: "Version intermédiaire de la gamme Land Cruiser, très répandue pour les missions terrain en Afrique de l'Ouest.",
    specifications: { moteur: "2.8L Turbo Diesel", puissance: "204 ch", couple: "500 Nm", consommation: "8.5 L/100km", traction: "4x4 permanent", transmission_detail: "6 rapports automatique", coffre: "620 L", reservoir: "87 L", garantie: "3 ans / 100 000 km", couleur: "Noir", places: 7, climatisation: "Automatique bi-zone", equipements: "Caméra de recul, régulateur de vitesse, sièges cuir" }
  },
  {
    id: "toyota-rav4", brand: "Toyota", model: "RAV4", year: 2022, condition: "Occasion",
    category: "SUV", fuel: "Essence", transmission: "Automatique", mileage: 24000, price: 22000000, currency: "FCFA",
    availability: "Disponible", featured: false,
    images: ["https://images.pexels.com/photos/18029616/pexels-photo-18029616.jpeg?auto=compress&cs=tinysrgb&w=1200"],
    description: "Un SUV compact fiable, parfait équilibre entre confort urbain et capacités tout-terrain.",
    specifications: { moteur: "2.5L 4 cylindres", puissance: "203 ch", couple: "243 Nm", consommation: "7.1 L/100km", traction: "4x2", transmission_detail: "8 rapports automatique", coffre: "580 L", reservoir: "55 L", garantie: "Véhicule inspecté", couleur: "Blanc", places: 5, climatisation: "Automatique", equipements: "Caméra de recul, Bluetooth, vitres électriques" }
  },
  {
    id: "hyundai-tucson", brand: "Hyundai", model: "Tucson", year: 2022, condition: "Occasion",
    category: "SUV", fuel: "Essence", transmission: "Automatique", mileage: 28000, price: 14900000, currency: "FCFA",
    availability: "Disponible", featured: false,
    images: ["https://images.pexels.com/photos/28833276/pexels-photo-28833276.jpeg?auto=compress&cs=tinysrgb&w=1200"],
    description: "Un SUV confortable et élégant, idéal pour la ville comme pour les longs trajets.",
    specifications: { moteur: "2.0L 4 cylindres", puissance: "156 ch", couple: "192 Nm", consommation: "7.8 L/100km", traction: "4x2", transmission_detail: "6 rapports automatique", coffre: "620 L", reservoir: "62 L", garantie: "Véhicule inspecté", couleur: "Gris", places: 5, climatisation: "Manuelle bi-zone", equipements: "Écran tactile, capteurs de stationnement" }
  },
  {
    id: "kia-sportage", brand: "Kia", model: "Sportage", year: 2022, condition: "Occasion",
    category: "SUV", fuel: "Essence", transmission: "Automatique", mileage: 19000, price: 16700000, currency: "FCFA",
    availability: "Disponible", featured: false,
    images: ["https://commons.wikimedia.org/wiki/Special:FilePath/Kia%20Sportage%201.6%20T-GDI%20HEV%202WD%20(2022).jpg"],
    description: "Un SUV moderne et bien équipé, alternative intéressante aux références japonaises.",
    specifications: { moteur: "2.0L 4 cylindres", puissance: "155 ch", couple: "192 Nm", consommation: "7.9 L/100km", traction: "4x2", transmission_detail: "6 rapports automatique", coffre: "591 L", reservoir: "62 L", garantie: "Véhicule inspecté", couleur: "Bleu", places: 5, climatisation: "Automatique", equipements: "Écran tactile 10 pouces, caméra de recul" }
  },
  {
    id: "nissan-patrol", brand: "Nissan", model: "Patrol", year: 2022, condition: "Occasion",
    category: "SUV", fuel: "Essence", transmission: "Automatique", mileage: 22000, price: 38500000, currency: "FCFA",
    availability: "Sur commande", featured: true,
    images: ["https://images.pexels.com/photos/28833277/pexels-photo-28833277.jpeg?auto=compress&cs=tinysrgb&w=1200"],
    description: "Un SUV premium 7 places, taillé pour les familles nombreuses et les longs voyages.",
    specifications: { moteur: "5.6L V8", puissance: "400 ch", couple: "560 Nm", consommation: "14.5 L/100km", traction: "4x4 permanent", transmission_detail: "7 rapports automatique", coffre: "467 L", reservoir: "140 L", garantie: "Garantie disponible", couleur: "Noir", places: 7, climatisation: "Automatique tri-zone", equipements: "Toit ouvrant, sièges cuir chauffants, caméra 360°" }
  },
  {
    id: "nissan-qashqai", brand: "Nissan", model: "Qashqai", year: 2021, condition: "Occasion",
    category: "SUV", fuel: "Essence", transmission: "Automatique", mileage: 33000, price: 12500000, currency: "FCFA",
    availability: "Disponible", featured: false,
    images: ["https://commons.wikimedia.org/wiki/Special:FilePath/2021%20Nissan%20Qashqai%20Premiere%20Edition%20DIG-T%20-%201332cc%201.3%20(140PS)%20Petrol%20-%20Arctic%20White%20-%2004-2024%2C%20Front.jpg"],
    description: "Un SUV compact économique, parfait premier véhicule familial.",
    specifications: { moteur: "1.3L Turbo", puissance: "140 ch", couple: "240 Nm", consommation: "6.5 L/100km", traction: "4x2", transmission_detail: "CVT automatique", coffre: "504 L", reservoir: "55 L", garantie: "Véhicule inspecté", couleur: "Gris", places: 5, climatisation: "Automatique", equipements: "Écran tactile, régulateur de vitesse" }
  },
  {
    id: "suzuki-vitara", brand: "Suzuki", model: "Vitara", year: 2022, condition: "Neuf",
    category: "SUV", fuel: "Essence", transmission: "Manuelle", mileage: 0, price: 13200000, currency: "FCFA",
    availability: "Disponible", featured: false,
    images: ["https://commons.wikimedia.org/wiki/Special:FilePath/Suzuki%20Vitara%201.4%20BoosterJet%20Limited%20AllGrip%202021%20(52430355596).jpg"],
    description: "Un SUV compact léger et économique, très prisé pour la ville et les trajets courts.",
    specifications: { moteur: "1.6L 4 cylindres", puissance: "120 ch", couple: "156 Nm", consommation: "6.2 L/100km", traction: "4x2", transmission_detail: "5 rapports manuelle", coffre: "375 L", reservoir: "47 L", garantie: "3 ans constructeur", couleur: "Rouge", places: 5, climatisation: "Manuelle", equipements: "Bluetooth, vitres électriques" }
  },
  {
    id: "mitsubishi-pajero", brand: "Mitsubishi", model: "Pajero", year: 2021, condition: "Occasion",
    category: "SUV", fuel: "Diesel", transmission: "Automatique", mileage: 41000, price: 24500000, currency: "FCFA",
    availability: "Disponible", featured: false,
    images: ["https://commons.wikimedia.org/wiki/Special:FilePath/Mitsubishi%20Pajero%20012.JPG"],
    description: "Un tout-terrain réputé pour sa fiabilité mécanique, apprécié sur les pistes africaines.",
    specifications: { moteur: "3.2L Turbo Diesel", puissance: "190 ch", couple: "441 Nm", consommation: "9.5 L/100km", traction: "4x4 enclenchable", transmission_detail: "5 rapports automatique", coffre: "660 L", reservoir: "88 L", garantie: "Véhicule inspecté", couleur: "Gris", places: 7, climatisation: "Automatique bi-zone", equipements: "Caméra de recul, sièges cuir" }
  },
  {
    id: "renault-duster", brand: "Renault", model: "Duster", year: 2021, condition: "Occasion",
    category: "SUV", fuel: "Diesel", transmission: "Manuelle", mileage: 41000, price: 12400000, currency: "FCFA",
    availability: "Disponible", featured: false,
    images: [""],
    description: "Un SUV robuste et abordable, très bon compromis pour un usage mixte ville/piste.",
    specifications: { moteur: "1.5L Diesel", puissance: "115 ch", couple: "260 Nm", consommation: "5.3 L/100km", traction: "4x4", transmission_detail: "6 rapports manuelle", coffre: "475 L", reservoir: "50 L", garantie: "Véhicule inspecté", couleur: "Orange", places: 5, climatisation: "Manuelle", equipements: "Régulateur de vitesse, radio Bluetooth" }
  },
  {
    id: "honda-crv", brand: "Honda", model: "CR-V", year: 2022, condition: "Occasion",
    category: "SUV", fuel: "Essence", transmission: "Automatique", mileage: 20000, price: 19800000, currency: "FCFA",
    availability: "Disponible", featured: false,
    images: [""],
    description: "Un SUV réputé pour sa fiabilité mécanique et son faible coût d'entretien.",
    specifications: { moteur: "1.5L Turbo", puissance: "193 ch", couple: "243 Nm", consommation: "7.4 L/100km", traction: "4x2", transmission_detail: "CVT automatique", coffre: "561 L", reservoir: "57 L", garantie: "Véhicule inspecté", couleur: "Blanc", places: 5, climatisation: "Automatique", equipements: "Caméra de recul, écran tactile" }
  },

  // ===== PICK-UP (6) =====
  {
    id: "toyota-hilux-double-cabine", brand: "Toyota", model: "Hilux Double Cabine", year: 2023, condition: "Occasion",
    category: "Pick-up", fuel: "Diesel", transmission: "Automatique", mileage: 12000, price: 18500000, currency: "FCFA",
    availability: "Disponible", featured: true,
    images: ["https://images.pexels.com/photos/18240251/pexels-photo-18240251.jpeg?auto=compress&cs=tinysrgb&w=1200"],
    description: "Un pick-up robuste et fiable, parfaitement adapté aux routes du Burkina Faso.",
    specifications: { moteur: "2.8L Turbo Diesel", puissance: "204 ch", couple: "500 Nm", consommation: "8.9 L/100km", traction: "4x4 enclenchable", transmission_detail: "6 rapports automatique", charge_utile: "1 000 kg", reservoir: "80 L", garantie: "Garantie disponible", couleur: "Blanc", places: 5, climatisation: "Manuelle", equipements: "Caméra de recul, barres de benne" }
  },
  {
    id: "toyota-land-cruiser-70", brand: "Toyota", model: "Land Cruiser 70 Pick-up", year: 2022, condition: "Occasion",
    category: "Pick-up", fuel: "Diesel", transmission: "Manuelle", mileage: 31000, price: 32500000, currency: "FCFA",
    availability: "Disponible", featured: true,
    images: [""],
    description: "Le véhicule de référence des ONG et missions de terrain — increvable, taillé pour les pistes les plus difficiles.",
    specifications: { moteur: "4.2L Diesel", puissance: "165 ch", couple: "430 Nm", consommation: "11.5 L/100km", traction: "4x4 enclenchable", transmission_detail: "5 rapports manuelle", charge_utile: "1 060 kg", reservoir: "130 L", garantie: "Garantie disponible", couleur: "Blanc", places: 5, climatisation: "Manuelle", equipements: "Treuil disponible en option, protection sous moteur" }
  },
  {
    id: "ford-ranger", brand: "Ford", model: "Ranger", year: 2021, condition: "Occasion",
    category: "Pick-up", fuel: "Diesel", transmission: "Manuelle", mileage: 45000, price: 16200000, currency: "FCFA",
    availability: "Disponible", featured: false,
    images: [""],
    description: "Un pick-up polyvalent, économique à l'entretien, parfait pour le travail au quotidien.",
    specifications: { moteur: "2.2L Diesel", puissance: "160 ch", couple: "385 Nm", consommation: "8.4 L/100km", traction: "4x4 enclenchable", transmission_detail: "6 rapports manuelle", charge_utile: "985 kg", reservoir: "80 L", garantie: "Véhicule inspecté", couleur: "Rouge", places: 5, climatisation: "Manuelle", equipements: "Bluetooth, capteurs de recul" }
  },
  {
    id: "nissan-navara", brand: "Nissan", model: "Navara", year: 2021, condition: "Occasion",
    category: "Pick-up", fuel: "Diesel", transmission: "Automatique", mileage: 36000, price: 17800000, currency: "FCFA",
    availability: "Disponible", featured: false,
    images: [""],
    description: "Un pick-up moderne et confortable, alternative solide au Hilux pour le travail comme le quotidien.",
    specifications: { moteur: "2.3L Bi-Turbo Diesel", puissance: "190 ch", couple: "450 Nm", consommation: "8.1 L/100km", traction: "4x4 enclenchable", transmission_detail: "7 rapports automatique", charge_utile: "1 020 kg", reservoir: "80 L", garantie: "Véhicule inspecté", couleur: "Gris", places: 5, climatisation: "Automatique", equipements: "Caméra 360°, sièges cuir" }
  },
  {
    id: "mitsubishi-l200", brand: "Mitsubishi", model: "L200", year: 2020, condition: "Occasion",
    category: "Pick-up", fuel: "Diesel", transmission: "Manuelle", mileage: 54000, price: 15500000, currency: "FCFA",
    availability: "Disponible", featured: false,
    images: [""],
    description: "Un pick-up réputé pour sa fiabilité et son excellent rapport qualité-prix.",
    specifications: { moteur: "2.4L Diesel", puissance: "154 ch", couple: "380 Nm", consommation: "7.8 L/100km", traction: "4x4 enclenchable", transmission_detail: "6 rapports manuelle", charge_utile: "1 045 kg", reservoir: "75 L", garantie: "Véhicule inspecté", couleur: "Blanc", places: 5, climatisation: "Manuelle", equipements: "Radio Bluetooth, barres de benne" }
  },
  {
    id: "isuzu-dmax", brand: "Isuzu", model: "D-Max", year: 2022, condition: "Neuf",
    category: "Pick-up", fuel: "Diesel", transmission: "Manuelle", mileage: 0, price: 19500000, currency: "FCFA",
    availability: "Sur commande", featured: false,
    images: [""],
    description: "Un pick-up très utilisé par les ONG et administrations pour sa robustesse mécanique.",
    specifications: { moteur: "1.9L Turbo Diesel", puissance: "150 ch", couple: "350 Nm", consommation: "7.5 L/100km", traction: "4x4 enclenchable", transmission_detail: "6 rapports manuelle", charge_utile: "1 080 kg", reservoir: "76 L", garantie: "3 ans constructeur", couleur: "Blanc", places: 5, climatisation: "Manuelle", equipements: "Bluetooth, protection sous moteur" }
  },

  // ===== BERLINE (6) =====
  {
    id: "toyota-corolla", brand: "Toyota", model: "Corolla", year: 2023, condition: "Neuf",
    category: "Berline", fuel: "Essence", transmission: "Automatique", mileage: 8500, price: 11800000, currency: "FCFA",
    availability: "Disponible", featured: false,
    images: [""],
    description: "Une berline fiable et économique, référence en matière de faible consommation.",
    specifications: { moteur: "1.8L 4 cylindres", puissance: "140 ch", couple: "177 Nm", consommation: "5.9 L/100km", traction: "4x2", transmission_detail: "CVT automatique", coffre: "471 L", reservoir: "50 L", garantie: "Garantie disponible", couleur: "Blanc", places: 5, climatisation: "Automatique", equipements: "Caméra de recul, écran tactile" }
  },
  {
    id: "toyota-camry", brand: "Toyota", model: "Camry", year: 2020, condition: "Occasion",
    category: "Berline", fuel: "Essence", transmission: "Automatique", mileage: 52000, price: 13500000, currency: "FCFA",
    availability: "Disponible", featured: false,
    images: [""],
    description: "Une berline spacieuse et confortable, très appréciée pour les trajets urbains et interurbains.",
    specifications: { moteur: "2.5L 4 cylindres", puissance: "178 ch", couple: "231 Nm", consommation: "7.0 L/100km", traction: "4x2", transmission_detail: "8 rapports automatique", coffre: "524 L", reservoir: "60 L", garantie: "Véhicule inspecté", couleur: "Gris", places: 5, climatisation: "Automatique bi-zone", equipements: "Sièges cuir, régulateur de vitesse" }
  },
  {
    id: "hyundai-elantra", brand: "Hyundai", model: "Elantra", year: 2021, condition: "Occasion",
    category: "Berline", fuel: "Essence", transmission: "Automatique", mileage: 30000, price: 10200000, currency: "FCFA",
    availability: "Disponible", featured: false,
    images: [""],
    description: "Une berline compacte moderne, très bon rapport équipement/prix.",
    specifications: { moteur: "2.0L 4 cylindres", puissance: "147 ch", couple: "179 Nm", consommation: "6.5 L/100km", traction: "4x2", transmission_detail: "6 rapports automatique", coffre: "458 L", reservoir: "50 L", garantie: "Véhicule inspecté", couleur: "Blanc", places: 5, climatisation: "Automatique", equipements: "Écran tactile, Bluetooth" }
  },
  {
    id: "peugeot-405", brand: "Peugeot", model: "405", year: 2015, condition: "Occasion",
    category: "Berline", fuel: "Essence", transmission: "Manuelle", mileage: 112000, price: 3200000, currency: "FCFA",
    availability: "Disponible", featured: false,
    images: [""],
    description: "Un classique increvable des routes burkinabè, économique à l'achat comme à l'entretien.",
    specifications: { moteur: "1.9L 4 cylindres", puissance: "94 ch", couple: "154 Nm", consommation: "7.5 L/100km", traction: "4x2", transmission_detail: "5 rapports manuelle", coffre: "430 L", reservoir: "70 L", garantie: "Véhicule d'occasion", couleur: "Blanc", places: 5, climatisation: "Manuelle", equipements: "Radio, vitres manuelles" }
  },
  {
    id: "peugeot-508", brand: "Peugeot", model: "508", year: 2021, condition: "Occasion",
    category: "Berline", fuel: "Diesel", transmission: "Automatique", mileage: 26000, price: 15900000, currency: "FCFA",
    availability: "Disponible", featured: false,
    images: [""],
    description: "Une berline élégante et bien équipée, alternative française aux références japonaises.",
    specifications: { moteur: "1.5L BlueHDi Diesel", puissance: "130 ch", couple: "300 Nm", consommation: "4.4 L/100km", traction: "4x2", transmission_detail: "8 rapports automatique", coffre: "487 L", reservoir: "53 L", garantie: "Véhicule inspecté", couleur: "Gris", places: 5, climatisation: "Automatique bi-zone", equipements: "Écran tactile 10 pouces, sièges cuir" }
  },
  {
    id: "kia-rio", brand: "Kia", model: "Rio", year: 2020, condition: "Occasion",
    category: "Berline", fuel: "Essence", transmission: "Manuelle", mileage: 38000, price: 7200000, currency: "FCFA",
    availability: "Disponible", featured: false,
    images: [""],
    description: "Une petite berline économique, idéale pour un premier véhicule ou un usage urbain.",
    specifications: { moteur: "1.4L 4 cylindres", puissance: "100 ch", couple: "133 Nm", consommation: "5.8 L/100km", traction: "4x2", transmission_detail: "5 rapports manuelle", coffre: "325 L", reservoir: "45 L", garantie: "Véhicule inspecté", couleur: "Rouge", places: 5, climatisation: "Manuelle", equipements: "Bluetooth, vitres électriques avant" }
  },

  // ===== UTILITAIRE (3) =====
  {
    id: "toyota-hiace", brand: "Toyota", model: "Hiace", year: 2019, condition: "Occasion",
    category: "Utilitaire", fuel: "Diesel", transmission: "Manuelle", mileage: 68000, price: 12900000, currency: "FCFA",
    availability: "Disponible", featured: false,
    images: [""],
    description: "Le minibus de référence pour le transport de personnes ou de marchandises.",
    specifications: { moteur: "3.0L Diesel", puissance: "136 ch", couple: "300 Nm", consommation: "10.2 L/100km", traction: "4x2", transmission_detail: "5 rapports manuelle", charge_utile: "1 500 kg", reservoir: "70 L", garantie: "Véhicule inspecté", couleur: "Blanc", places: 15, climatisation: "Manuelle avant/arrière", equipements: "Portes coulissantes, sièges rabattables" }
  },
  {
    id: "hyundai-h100", brand: "Hyundai", model: "H100", year: 2020, condition: "Occasion",
    category: "Utilitaire", fuel: "Diesel", transmission: "Manuelle", mileage: 62000, price: 9800000, currency: "FCFA",
    availability: "Disponible", featured: false,
    images: [""],
    description: "Un utilitaire léger très répandu pour le transport de marchandises en ville comme en zone rurale.",
    specifications: { moteur: "2.5L Diesel", puissance: "78 ch", couple: "186 Nm", consommation: "9.0 L/100km", traction: "4x2", transmission_detail: "5 rapports manuelle", charge_utile: "1 200 kg", reservoir: "60 L", garantie: "Véhicule inspecté", couleur: "Blanc", places: 3, climatisation: "Manuelle", equipements: "Radio, benne basculante en option" }
  },
  {
    id: "peugeot-partner", brand: "Peugeot", model: "Partner", year: 2020, condition: "Occasion",
    category: "Utilitaire", fuel: "Diesel", transmission: "Manuelle", mileage: 55000, price: 8500000, currency: "FCFA",
    availability: "Disponible", featured: false,
    images: [""],
    description: "Un fourgon compact économique, adapté aux livraisons et petits transports professionnels.",
    specifications: { moteur: "1.6L BlueHDi Diesel", puissance: "100 ch", couple: "254 Nm", consommation: "5.3 L/100km", traction: "4x2", transmission_detail: "5 rapports manuelle", charge_utile: "850 kg", reservoir: "60 L", garantie: "Véhicule inspecté", couleur: "Blanc", places: 3, climatisation: "Manuelle", equipements: "Portes battantes arrière, séparation cabine/charge" }
  },

  // ===== PREMIUM (4) =====
  {
    id: "mercedes-classe-c", brand: "Mercedes", model: "Classe C", year: 2023, condition: "Neuf",
    category: "Premium", fuel: "Hybride", transmission: "Automatique", mileage: 6000, price: 32000000, currency: "FCFA",
    availability: "Sur commande", featured: true,
    images: [""],
    description: "Une berline premium allemande, confort et prestige pour un usage professionnel haut de gamme.",
    specifications: { moteur: "2.0L Hybride", puissance: "204 ch", couple: "300 Nm", consommation: "5.5 L/100km", traction: "4x2", transmission_detail: "9 rapports automatique", coffre: "455 L", reservoir: "52 L", garantie: "3 ans constructeur", couleur: "Gris", places: 5, climatisation: "Automatique quadri-zone", equipements: "Sièges cuir chauffants, caméra 360°, assistant de conduite" }
  },
  {
    id: "bmw-x5", brand: "BMW", model: "X5", year: 2022, condition: "Occasion",
    category: "Premium", fuel: "Diesel", transmission: "Automatique", mileage: 19000, price: 36900000, currency: "FCFA",
    availability: "Disponible", featured: false,
    images: ["https://images.pexels.com/photos/18029642/pexels-photo-18029642.jpeg?auto=compress&cs=tinysrgb&w=1200"],
    description: "Un SUV premium allemand, puissance et raffinement pour une clientèle exigeante.",
    specifications: { moteur: "3.0L Diesel", puissance: "265 ch", couple: "620 Nm", consommation: "7.2 L/100km", traction: "4x4 xDrive", transmission_detail: "8 rapports automatique", coffre: "650 L", reservoir: "80 L", garantie: "Véhicule inspecté", couleur: "Bleu", places: 5, climatisation: "Automatique quadri-zone", equipements: "Toit panoramique, caméra 360°, sièges massants" }
  },
  {
    id: "lexus-rx", brand: "Lexus", model: "RX 350", year: 2021, condition: "Occasion",
    category: "Premium", fuel: "Essence", transmission: "Automatique", mileage: 28000, price: 34500000, currency: "FCFA",
    availability: "Disponible", featured: true,
    images: [""],
    description: "Un SUV premium japonais réputé pour sa fiabilité mécanique et son confort silencieux.",
    specifications: { moteur: "3.5L V6", puissance: "295 ch", couple: "370 Nm", consommation: "9.8 L/100km", traction: "4x4", transmission_detail: "8 rapports automatique", coffre: "612 L", reservoir: "72 L", garantie: "Véhicule inspecté", couleur: "Noir", places: 5, climatisation: "Automatique tri-zone", equipements: "Sièges cuir ventilés, toit ouvrant, caméra 360°" }
  },
  {
    id: "range-rover-sport", brand: "Land Rover", model: "Range Rover Sport", year: 2020, condition: "Occasion",
    category: "Premium", fuel: "Diesel", transmission: "Automatique", mileage: 35000, price: 42000000, currency: "FCFA",
    availability: "Sur commande", featured: true,
    images: [""],
    description: "Le SUV britannique de référence en matière de prestige et de capacités tout-terrain.",
    specifications: { moteur: "3.0L V6 Turbo Diesel", puissance: "306 ch", couple: "700 Nm", consommation: "8.9 L/100km", traction: "4x4 permanent", transmission_detail: "8 rapports automatique", coffre: "780 L", reservoir: "86 L", garantie: "Véhicule inspecté", couleur: "Noir", places: 5, climatisation: "Automatique quadri-zone", equipements: "Suspension pneumatique, caméra 360°, sièges massants" }
  }
];

const KOZ_WHATSAPP = "22606591523";
