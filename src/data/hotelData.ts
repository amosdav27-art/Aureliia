import { Room, DiningVenue, Amenity, Experience, SpecialOffer, Review, FAQItem, BookingAddon } from '../types/hotel';

// High-fidelity generated imagery
import hotelFacade from '../assets/images/hotel_hero_facade_1790636353212.jpg';
import roomDeluxeKing from '../assets/images/room_deluxe_king_1790636421099.jpg';
import suiteOceanView from '../assets/images/suite_ocean_view_1790636431265.jpg';
import suitePresidential from '../assets/images/suite_presidential_1790636364655.jpg';
import diningRestaurant from '../assets/images/dining_restaurant_1790636375993.jpg';
import loungeCocktails from '../assets/images/lounge_cocktails_1790636395934.jpg';
import terraceBreakfast from '../assets/images/terrace_breakfast_1790636443359.jpg';
import wellnessSpa from '../assets/images/wellness_spa_1790636386948.jpg';

export const HOTEL_IMAGES = {
  heroFacade: hotelFacade,
  hotelFacade,
  roomDeluxeKing,
  suiteOceanView,
  suitePresidential,
  diningRestaurant,
  loungeCocktails,
  terraceBreakfast,
  wellnessSpa,
};

export const HOTEL_INFO = {
  name: "The Aurelia",
  legalName: "The Aurelia Hotel & Residences, LLC",
  tagline: "A Sanctuary of Timeless Elegance & Refined Hospitality",
  category: "Luxury 5-Star Hotel & Residences",
  founded: "2018",
  location: "Riviera Bay, California",
  address: "18 Aurelia Promenade, Riviera Bay, CA 90265",
  phone: "+1 (800) 555-0199",
  conciergePhone: "+1 (800) 555-0188",
  email: "reservations@aureliahotel.com",
  conciergeEmail: "concierge@aureliahotel.com",
  checkInTime: "15:00",
  checkOutTime: "12:00",
  coordinates: {
    lat: 34.0259,
    lng: -118.7798,
  },
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    linkedin: "https://linkedin.com",
  }
};

export const ROOMS_DATA: Room[] = [
  {
    id: "deluxe-king",
    name: "Deluxe King Room",
    category: "deluxe",
    headline: "Serene private sanctuary with bespoke oak finishes and garden balcony",
    description: "Designed for refined solace, the Deluxe King Room offers custom Italian millwork, handwoven wool textiles, and expansive floor-to-ceiling French doors opening onto a private garden-facing veranda.",
    sizeSqm: 52,
    sizeSqft: 560,
    capacity: 2,
    bedType: "Custom Feathered King Bed",
    view: "Manicured Courtyard Gardens",
    basePrice: 420,
    featured: true,
    images: [roomDeluxeKing, suiteOceanView, suitePresidential],
    amenities: [
      "Custom 600-thread count Frette Italian linens",
      "Dyson Supersonic hair care suite",
      "Diptyque Paris bespoke bath amenities",
      "Private furnished garden veranda",
      "Nespresso Vertuo & fine loose-leaf teas",
      "Rainfall marble walk-in shower & soaking tub",
      "Complimentary high-speed fiber Wi-Fi",
      "Bang & Olufsen Bluetooth sound system",
    ],
    features: [
      "Subtle circadian dynamic lighting system",
      "In-room sommelier wine vault and curated mini-bar",
      "Dedicated bespoke packing & unpacking service",
      "Twice-daily housekeeping with artisanal evening turndown",
    ],
    policies: [
      "Check-in: 15:00 · Check-out: 12:00",
      "Non-smoking throughout the residence",
      "Complimentary cancellation up to 48 hours prior to arrival",
      "Valet parking included with suite reservation",
    ]
  },
  {
    id: "executive-ocean-suite",
    name: "Executive Ocean Suite",
    category: "suite",
    headline: "Expansive coastal residence featuring panoramic ocean vistas and separate salon",
    description: "Perched above the azure shoreline, this residence provides a generous living salon with bespoke travertine furnishings, a discrete dining alcove, and panoramic vistas of the pacific horizon.",
    sizeSqm: 88,
    sizeSqft: 947,
    capacity: 3,
    bedType: "California King & Designer Daybed",
    view: "Panoramic Oceanfront & Coastline",
    basePrice: 680,
    featured: true,
    images: [suiteOceanView, suitePresidential, roomDeluxeKing],
    amenities: [
      "Expansive private oceanfront terrace with loungers",
      "Separate entertaining salon and wet bar",
      "Freestanding stone soaking tub overlooking the sea",
      "Custom 600-thread count Frette Italian linens",
      "Sub-Zero in-suite wine preservation collection",
      "Dyson Supersonic hair styling system",
      "Complimentary roundtrip airport Mercedes transfer",
      "Dedicated 24-hour butler assistance",
    ],
    features: [
      "Circadian intelligent climate control",
      "Private dining setup capability for up to 6 guests",
      "Marshall vintage audio system with curated vinyl collection",
      "Evening sunset aperitivo served daily in-suite",
    ],
    policies: [
      "Check-in: 15:00 · Check-out: 12:00",
      "Non-smoking throughout the residence",
      "Complimentary cancellation up to 72 hours prior to arrival",
      "Valet parking included with suite reservation",
    ]
  },
  {
    id: "presidential-suite",
    name: "Presidential Grand Suite",
    category: "suite",
    headline: "The pinnacle of architectural luxury with private library and wraparound terrace",
    description: "The crown jewel of The Aurelia, boasting 160 square meters of curated grandeur. Includes a private formal dining salon, fireplace library, master dressing wing, and an expansive wraparound terrace.",
    sizeSqm: 160,
    sizeSqft: 1720,
    capacity: 4,
    bedType: "Grand Emperor Bed & Second King Suite",
    view: "360-Degree Ocean & Coastal Hills",
    basePrice: 1450,
    featured: true,
    images: [suitePresidential, suiteOceanView, roomDeluxeKing],
    amenities: [
      "Expansive 50-sqm wraparound stone terrace",
      "Private formal dining salon with butler pantry",
      "Hand-carved travertine fireplace and library",
      "Master en-suite with dual rainwater showers & marble spa tub",
      "Private in-suite massage and wellness treatment room",
      "Dedicated 24/7 personal butler and concierge",
      "Complimentary Maybach chauffeur transfers",
      "Exclusive access to the Aurelia Club Lounge",
    ],
    features: [
      "In-suite private chef dining experience available upon request",
      "Custom walk-in dressing wardrobe with cedar paneling",
      "Sonos architectural sound across all salons",
      "Curated original contemporary artwork collection",
    ],
    policies: [
      "Check-in: 14:00 (Guaranteed Early Check-in) · Check-out: 14:00 (Late Check-out)",
      "Non-smoking throughout the residence",
      "Complimentary cancellation up to 7 days prior to arrival",
      "Complimentary private indoor secure garaging",
    ]
  },
  {
    id: "aurelia-penthouse",
    name: "The Aurelia Penthouse Residence",
    category: "penthouse",
    headline: "Two-story private rooftop enclave featuring private plunge pool and helipad transfer",
    description: "Spanning the entire top tier of the hotel, this private residence offers unmatched privacy, double-height ceilings, a private heated rooftop plunge pool, and dedicated private elevator access.",
    sizeSqm: 240,
    sizeSqft: 2580,
    capacity: 6,
    bedType: "Two Master Emperor Suites & One Twin Suite",
    view: "Unobstructed Panoramic Ocean & Horizon",
    basePrice: 2200,
    featured: false,
    images: [suitePresidential, suiteOceanView, hotelFacade],
    amenities: [
      "Private rooftop terrace with heated infinity plunge pool",
      "Private direct-access high-speed elevator",
      "Three master king bedrooms with private en-suites",
      "Chef's kitchen equipped with Gaggenau appliances",
      "Private cinema screening lounge",
      "Personal dedicated executive chef & head butler",
      "Complimentary helicopter or luxury chauffeur airport transfer",
      "Custom cellar stocked with vintage Champagnes & Grand Crus",
    ],
    features: [
      "Bespoke dining menus crafted daily by our Michelin-starred culinary team",
      "Daily 90-minute in-suite spa rituals for all registered guests",
      "Priority VIP access to all resort amenities and private cabanas",
    ],
    policies: [
      "Flexible check-in and check-out times upon confirmation",
      "Non-smoking throughout the penthouse",
      "Deposit required upon reservation guarantee",
      "Complimentary cancellation up to 14 days prior to arrival",
    ]
  }
];

export const DINING_VENUES: DiningVenue[] = [
  {
    id: "the-aurelia-restaurant",
    name: "The Aurelia Restaurant",
    tagline: "Contemporary Mediterranean & European Gastronomy",
    description: "Led by Executive Chef Julian Laurent, The Aurelia delivers an intimate dining experience celebrating seasonal coastal harvests and old-world culinary traditions reimagined through a modern lens.",
    cuisine: "Fine Mediterranean & Coastal European",
    hours: "Dinner: 18:00 – 22:30 (Tuesday to Sunday)",
    dressCode: "Smart Elegant",
    image: diningRestaurant,
    menuHighlights: [
      { name: "Wild Turbot & Sea Urchin Emulsion", description: "Braised fennel, coastal samphire, saffron fumet reduction", price: "$68" },
      { name: "Wagyu A5 Tenderloin", description: "Smoked bone marrow mousseline, chanterelles, black truffle jus", price: "$92" },
      { name: "Riviera Citrus Sphere", description: "Candied Amalfi lemon, white chocolate crumble, basil verbena sorbet", price: "$26" },
      { name: "7-Course Chef Degustation", description: "Paired with rare cellar reserves selected by Head Sommelier", price: "$220" },
    ]
  },
  {
    id: "the-obsidian-lounge",
    name: "The Obsidian Lounge & Library Bar",
    tagline: "Rare Spirits, Artisanal Cocktails & Intimate Conversations",
    description: "A dark walnut and burnished brass sanctuary featuring hand-crafted botanical cocktails, vintage Cognacs, and small savory sharing plates in an ambiance of subdued luxury.",
    cuisine: "Bespoke Cocktails & Caviar Raw Bar",
    hours: "Daily: 16:00 – 01:00",
    dressCode: "Sophisticated Casual",
    image: loungeCocktails,
    menuHighlights: [
      { name: "The Aurelia Reserve Old Fashioned", description: "21-year Japanese single malt, smoked fig bitters, hand-carved ice sphere", price: "$34" },
      { name: "Royal Ossetra Caviar (30g)", description: "Warm buckwheat blinis, cultured crème fraîche, organic quail egg", price: "$145" },
      { name: "Truffled Duck Confit Sliders", description: "Brioche buns, aged Gruyère, caramelized shallot jam", price: "$28" },
      { name: "Botanical Garden Fizz", description: "Distilled floral botanicals, yuzu, sparkling champagne float", price: "$24" },
    ]
  },
  {
    id: "the-terrace-veranda",
    name: "The Terrace Breakfast Veranda",
    tagline: "Sunlit Morning Breakfast & Artisanal Boulangerie",
    description: "Greet each coastal morning on the open-air stone colonnade. Enjoy freshly baked French viennoiseries, cold-pressed juices, and made-to-order morning classics overlooking the sparkling fountain.",
    cuisine: "Artisanal Breakfast & Brunch",
    hours: "Daily: 07:00 – 11:30",
    dressCode: "Resort Casual",
    image: terraceBreakfast,
    menuHighlights: [
      { name: "Eggs Benedict Royale", description: "Poached organic eggs, house-smoked Scottish salmon, yuzu hollandaise", price: "$32" },
      { name: "Artisanal Baker's Basket", description: "Warm croissants, pain au chocolat, sourdough, cultured Normandy butter", price: "$22" },
      { name: "Acai & Wild Blackberry Bowl", description: "Toasted chia, bee pollen, organic Riviera honey, macadamia crunch", price: "$24" },
      { name: "Belgian Brioche French Toast", description: "Caramelized mission figs, pure Vermont maple syrup, vanilla mascarpone", price: "$28" },
    ]
  },
  {
    id: "in-room-dining",
    name: "24-Hour Private In-Suite Dining",
    tagline: "Discreet Culinary Excellence Delivered to Your Residence",
    description: "Whether craving late-night comfort or an intimate five-course dinner on your private terrace, our culinary team delivers freshly prepared masterpieces around the clock.",
    cuisine: "Curated International & Comfort Classics",
    hours: "24 Hours Daily",
    dressCode: "In-Suite Comfort",
    image: roomDeluxeKing,
    menuHighlights: [
      { name: "Dry-Aged Aurelia Prime Burger", description: "Custom blend, aged cheddar, truffle aioli, hand-cut triple-cooked fries", price: "$36" },
      { name: "Handcrafted Tagliolini al Tartufo", description: "Fresh handmade pasta, Parmigiano-Reggiano 36-month, shaved black truffle", price: "$46" },
      { name: "Midnight Charcuterie & Cheese Board", description: "Selected European artisanal cheeses, cured meats, honeycomb, lavosh", price: "$38" },
      { name: "Nightcap Valrhona Warm Molten Cake", description: "Rich chocolate core, Madagascar bourbon vanilla gelato", price: "$22" },
    ]
  }
];

export const AMENITIES_DATA: Amenity[] = [
  {
    id: "wellness-spa",
    title: "The Imperial Spa & Thermal Suite",
    subtitle: "A Sanctuary for Deep Cellular Restoration",
    description: "Immerse yourself in Finnish cedar saunas, Himalayan salt inhalation rooms, marble hammam chambers, and holistic treatments designed with Swiss biological skincare formulas.",
    iconName: "Sparkles",
    hours: "08:00 – 20:00 Daily",
    image: wellnessSpa,
    highlights: ["Hydrothermal steam rooms", "Custom Swiss biological facials", "Private double couples suite", "Cryo-plunge therapy"]
  },
  {
    id: "hydrotherapy-pool",
    title: "Heated Hydrotherapy Infinity Pool",
    subtitle: "Temperature-Controlled Architectural Serenity",
    description: "An indoor-outdoor thermal pool with submerged loungers, soothing mineral water, and views across the coastal gardens, flanked by private daybeds and dedicated beverage attendants.",
    iconName: "Waves",
    hours: "06:00 – 22:00 Daily",
    image: wellnessSpa,
    highlights: ["32°C year-round temperature", "Private linen-draped cabanas", "Poolside seasonal light menu", "Gentle hydro-massage jets"]
  },
  {
    id: "technogym-fitness",
    title: "Technogym Athletic Studio",
    subtitle: "High-Performance Training & Private Coaching",
    description: "Equipped with the latest Technogym Artis collection, Peloton bikes, free weights, and a private yoga studio with certified trainers available for one-on-one sessions.",
    iconName: "Activity",
    hours: "24 Hours Daily for Guests",
    image: hotelFacade,
    highlights: ["Artis cardio & strength equipment", "Private pilates reformer studio", "Personal trainers on request", "Fresh fruit & chilled eucalyptus towels"]
  },
  {
    id: "valet-chauffeur",
    title: "Valet & Mercedes Fleet Chauffeur",
    subtitle: "Effortless Luxury Mobility Across the Coast",
    description: "Our private fleet of Mercedes S-Class and Maybach sedans provides seamless airport transfers, local coastal excursions, and 24-hour valet parking with EV charging stations.",
    iconName: "Car",
    hours: "24 Hours Daily",
    image: hotelFacade,
    highlights: ["Complimentary city transfers (5km)", "Roundtrip airport transfers", "High-speed EV Superchargers", "White-glove luggage handling"]
  },
  {
    id: "concierge-service",
    title: "24/7 Bespoke Clefs d'Or Concierge",
    subtitle: "Privileged Access & Tailored Guest Requests",
    description: "From securing reservations at fully booked Michelin-starred tables to chartering private sailing yachts, our dedicated concierges curate every moment of your itinerary.",
    iconName: "Compass",
    hours: "24 Hours Daily",
    image: loungeCocktails,
    highlights: ["VIP table & theater access", "Private coastal yacht charters", "Bespoke winery introductions", "Personal shopping appointments"]
  },
  {
    id: "business-boardrooms",
    title: "Executive Salons & Boardrooms",
    subtitle: "State-of-the-Art Privacy for Strategic Assemblies",
    description: "Intimate, acoustically isolated executive salons equipped with concealed 4K video conferencing, ultra-fast fiber connectivity, and dedicated private catering service.",
    iconName: "Briefcase",
    hours: "On-demand booking",
    image: suitePresidential,
    highlights: ["High-speed fiber connectivity", "Ultra-wide 4K conferencing displays", "Private dining catering", "Discreet sound-masking technology"]
  }
];

export const EXPERIENCES_DATA: Experience[] = [
  {
    id: "private-yacht-coastal",
    title: "Private Yacht Coastal Voyage",
    tagline: "Exclusive Sunset Cruise with Champagne & Raw Bar",
    description: "Board our custom 65-foot yacht for a half-day exploration of hidden coves along the coastline, complete with an on-board sommelier, fresh oysters, and vintage Krug champagne.",
    duration: "4 Hours",
    pricePerGuest: 380,
    inclusions: ["Private captain and crew", "Fresh seafood raw bar", "Vintage Champagne pairing", "Coastal snorkeling equipment"],
    image: suiteOceanView
  },
  {
    id: "sommelier-cellar-tasting",
    title: "The Reserve Sommelier Wine Journey",
    tagline: "Private Tasting in The Aurelia Vault",
    description: "Head Sommelier Jean-Paul leads an extraordinary exploration through our private subterranean cellar, featuring iconic vintages from Burgundy, Bordeaux, and Napa Valley.",
    duration: "2.5 Hours",
    pricePerGuest: 195,
    inclusions: ["Six premier cru & grand cru pours", "Artisanal affineur cheese board", "Cellar tour & tasting booklet", "Sommelier-guided pairing notes"],
    image: diningRestaurant
  },
  {
    id: "couples-spa-sanctuary",
    title: "In-Suite Balneotherapy Ritual",
    tagline: "Restorative Massage & Botanical Bath for Two",
    description: "Transform your suite into an ultra-private thermal haven. Includes a side-by-side customized 90-minute hot stone massage followed by an aromatic herbal essential oil bath.",
    duration: "2 Hours",
    pricePerGuest: 290,
    inclusions: ["Two 90-minute tailored massages", "Aromatherapy floral soaking bath", "Herbal wellness infusions", "Signature silk robes gift"],
    image: wellnessSpa
  },
  {
    id: "masterclass-culinary",
    title: "Culinary Masterclass with Chef Laurent",
    tagline: "Behind the Scenes in our Michelin Kitchen",
    description: "An exclusive hands-on morning inside our pastry and savory kitchens, learning classical French reduction techniques and plating secrets, concluded with a private kitchen-side luncheon.",
    duration: "3 Hours",
    pricePerGuest: 240,
    inclusions: ["Hands-on cooking masterclass", "3-course luncheon with wine", "Embroidered Aurelia chef apron", "Signed seasonal recipe journal"],
    image: terraceBreakfast
  }
];

export const OFFERS_DATA: SpecialOffer[] = [
  {
    id: "weekend-escape",
    code: "WEEKEND15",
    title: "The Weekend Escapade",
    subtitle: "Rejuvenating 2-Night Coastal Solace",
    description: "Escape the routine with preferential weekend suite rates, chilled Perrier-Jouët Champagne awaiting your arrival, and daily gourmet breakfast for two on the veranda.",
    discountPercentage: 15,
    inclusions: [
      "15% preferential reduction on Suites",
      "Chilled bottle of Perrier-Jouët upon arrival",
      "Daily breakfast for two on The Terrace",
      "Guaranteed late check-out until 14:00"
    ],
    validity: "Valid for Friday through Sunday stays through Dec 2026",
    terms: "Minimum 2-night stay required. Subject to availability at time of reservation.",
    image: suiteOceanView
  },
  {
    id: "romantic-retreat",
    code: "ROMANCE",
    title: "The Romantic Sanctuary",
    subtitle: "Designed for Unhurried Intimacy & Indulgence",
    description: "Celebrate milestones or simply reconnect. Includes a $200 Imperial Spa credit, candlelit dinner for two at The Aurelia Restaurant, and bespoke rose petal turndown service.",
    discountPercentage: 20,
    inclusions: [
      "$200 Imperial Spa treatment credit",
      "4-Course candlelit dinner for two (beverages excluded)",
      "Daily in-suite Champagne breakfast",
      "Bespoke Diptyque gift candle upon departure"
    ],
    validity: "Available year-round with advance reservation",
    terms: "Requires minimum 2 nights. Spa and dinner bookings recommended upon reservation.",
    image: diningRestaurant
  },
  {
    id: "executive-solace",
    code: "CORP2026",
    title: "The Executive Residence",
    subtitle: "Productivity Meets Unrivaled Sophistication",
    description: "Tailored for senior executives requiring discretion and seamless efficiency. Includes complimentary roundtrip chauffeur airport transfers, high-speed boardroom access, and daily garment pressing.",
    discountPercentage: 10,
    inclusions: [
      "Roundtrip luxury Mercedes airport transfer",
      "Complimentary pressing of two garments daily",
      "Priority access to Private Executive Boardrooms",
      "Full daily continental breakfast and barista coffee"
    ],
    validity: "Sunday through Thursday bookings",
    terms: "Must be reserved with a verified business or corporate profile.",
    image: suitePresidential
  },
  {
    id: "extended-residence",
    code: "EXTENDEDSTAY",
    title: "The Extended Coastal Stay",
    subtitle: "Stay 5 Nights, Pay for 4",
    description: "Savor an unhurried sojourn along the coast. Settle in for five nights or more and enjoy one complimentary night, private sommelier cellar tasting, and daily housekeeping tailoring.",
    discountPercentage: 20,
    inclusions: [
      "One complimentary night for every 5 consecutive nights",
      "Complimentary upgrade upon arrival (subject to availability)",
      "Private sommelier cellar tasting for two",
      "Full access to the Aurelia Club Lounge"
    ],
    validity: "All room and suite categories",
    terms: "Minimum 5-night reservation required. Cannot be combined with other promotional codes.",
    image: hotelFacade
  }
];

export const TESTIMONIALS_DATA: Review[] = [
  {
    id: "rev-1",
    quote: "The Aurelia provides an unmatched level of intuitive hospitality. Every detail, from the acoustics in the suites to the quiet mastery of the kitchen, reflects extraordinary discernment.",
    author: "Eleanor Vance-Montague",
    location: "London, United Kingdom",
    stayType: "Stayed 5 nights in Executive Ocean Suite",
    rating: 5,
    date: "August 2026"
  },
  {
    id: "rev-2",
    quote: "The thermal hydrotherapy pool and the tranquility of the private verandas made our anniversary unforgettable. The staff anticipates your needs before you are even conscious of them.",
    author: "Marcus & Vivienne Sterling",
    location: "Geneva, Switzerland",
    stayType: "Stayed 4 nights in Presidential Grand Suite",
    rating: 5,
    date: "September 2026"
  },
  {
    id: "rev-3",
    quote: "As someone who travels internationally 150 days a year, finding a hotel that genuinely feels like a private, peaceful residence is rare. The Aurelia is now my singular coastal retreat.",
    author: "David K. Chen",
    location: "New York, USA",
    stayType: "Stayed 3 nights in Deluxe King Room",
    rating: 5,
    date: "July 2026"
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-1",
    category: "policies",
    question: "What are the standard check-in and check-out times?",
    answer: "Standard check-in begins at 15:00, and check-out is at 12:00 noon. Guests residing in our Presidential Grand Suite and Penthouse enjoy complimentary guaranteed early check-in (from 14:00) and extended late check-out (until 14:00). Early check-in and late departures for other rooms may be requested and are granted based on availability."
  },
  {
    id: "faq-2",
    category: "policies",
    question: "What is your reservation cancellation policy?",
    answer: "For standard rooms and executive suites, cancellations made up to 48 hours prior to arrival (15:00 local time) are completely free of charge. For specialty suites and promotional packages, notice of 72 hours to 7 days may apply as stated in your booking confirmation."
  },
  {
    id: "faq-3",
    category: "policies",
    question: "Are pets permitted at The Aurelia?",
    answer: "Yes, well-behaved small dogs under 15kg (33 lbs) are warmly welcomed in designated garden and terrace suites. A one-time deep cleaning fee of $120 applies. We provide bespoke orthopedic pet bedding, artisanal treats, and hand-crafted dining bowls."
  },
  {
    id: "faq-4",
    category: "services",
    question: "Is valet parking and vehicle charging available?",
    answer: "The hotel offers secure 24-hour subterranean valet parking at $45 per overnight stay (complimentary for suites). Our garaging features high-power Tesla and universal Type 2 EV chargers, provided complimentary to hotel guests."
  },
  {
    id: "faq-5",
    category: "services",
    question: "How do I arrange an airport transfer?",
    answer: "Our private fleet of Mercedes-Benz S-Class and Maybach vehicles is available for airport transfers to and from Los Angeles International (LAX) and regional private executive terminals. Chauffeur service can be reserved during online booking or by emailing concierge@aureliahotel.com."
  },
  {
    id: "faq-6",
    category: "services",
    question: "Is high-speed Wi-Fi included?",
    answer: "Yes, symmetric 1Gbps high-speed fiber Wi-Fi is provided complimentary throughout all guest rooms, suites, event spaces, and outdoor pool terraces with enterprise-grade encryption."
  },
  {
    id: "faq-7",
    category: "services",
    question: "Are dietary preferences accommodated at the restaurants?",
    answer: "Our culinary brigade accommodates all dietary requirements, including gluten-free, vegan, vegetarian, halal, kosher-style, and allergen-sensitive diets. We recommend noting dietary requests upon room or dining reservation."
  },
  {
    id: "faq-8",
    category: "logistics",
    question: "Can luggage be held before check-in or after departure?",
    answer: "Our concierge team provides secure luggage holding and valet storage at no charge. Arriving early or departing late? You are warmly invited to enjoy our Imperial Spa, pool, and dining venues while we safeguard your luggage."
  },
  {
    id: "faq-9",
    category: "logistics",
    question: "What payment methods and security guarantees are accepted?",
    answer: "We accept Visa, Mastercard, American Express, Discover, Diners Club, JCB, and Apple Pay. A valid credit card is required to secure the reservation; charges are processed upon check-in or in accordance with your chosen rate plan."
  },
  {
    id: "faq-10",
    category: "policies",
    question: "Can extra beds or cribs be accommodated?",
    answer: "Complimentary wooden baby cribs and hypoallergenic bedding are available upon request for all room categories. Rollaway beds can be accommodated in Executive Ocean Suites and the Presidential Suite for an additional fee of $75 per night."
  }
];

export const BOOKING_ADDONS: BookingAddon[] = [
  {
    id: "daily-breakfast",
    name: "Artisanal Terrace Breakfast for Two",
    description: "Daily à la carte breakfast on the veranda including freshly pressed juices, pastries, and barista coffee.",
    price: 45,
    perNight: true,
  },
  {
    id: "champagne-arrival",
    name: "Perrier-Jouët Belle Époque on Arrival",
    description: "Chilled bottle of vintage Champagne and house-made dark chocolate truffles waiting in your suite.",
    price: 135,
    perNight: false,
  },
  {
    id: "airport-transfer",
    name: "Mercedes S-Class Roundtrip Airport Chauffeur",
    description: "White-glove private airport transfers from and to your terminal with luggage assistance.",
    price: 180,
    perNight: false,
  },
  {
    id: "spa-wellness-credit",
    name: "The Imperial Spa Restoration Package ($250 Value)",
    description: "A $250 credit redeemable toward any restorative treatment, massage, or facial in our spa suite.",
    price: 200,
    perNight: false,
  }
];

export const GALLERY_ITEMS = [
  { id: "g-1", title: "Twilight Grand Facade & Reflection Pool", category: "Hotel", image: hotelFacade },
  { id: "g-2", title: "Presidential Master Suite with King Bed", category: "Rooms", image: suitePresidential },
  { id: "g-3", title: "The Aurelia Dining Room Candlelight Dinner", category: "Dining", image: diningRestaurant },
  { id: "g-4", title: "Imperial Hydrotherapy Pool & Daybeds", category: "Pool & Spa", image: wellnessSpa },
  { id: "g-5", title: "The Obsidian Cocktail Lounge & Library Bar", category: "Dining", image: loungeCocktails },
  { id: "g-6", title: "Deluxe King Bedroom Sunlit Morning", category: "Rooms", image: roomDeluxeKing },
  { id: "g-7", title: "Executive Oceanfront Suite Salon", category: "Rooms", image: suiteOceanView },
  { id: "g-8", title: "The Terrace Breakfast on the Veranda", category: "Dining", image: terraceBreakfast },
  { id: "g-9", title: "Thermal Spa Stone Bath & Steam Chamber", category: "Pool & Spa", image: wellnessSpa },
  { id: "g-10", title: "Private Coastal Yacht Voyage at Sunset", category: "Experiences", image: suiteOceanView },
  { id: "g-11", title: "Subterranean Reserve Wine Cellar", category: "Experiences", image: diningRestaurant },
  { id: "g-12", title: "Arrival Colonnade & Manicured Olive Trees", category: "Hotel", image: hotelFacade },
];
