// ===============================
// SŁÓWKA – PODZIAŁ NA KATEGORIE
// ===============================

const WORD_SETS = {
  conversation: [
    { en: "always", pl: "zawsze", level: 1 },
{ en: "often", pl: "często", level: 1 },
{ en: "sometimes", pl: "czasami", level: 1 },
{ en: "never", pl: "nigdy", level: 1 },
{ en: "usually", pl: "zazwyczaj", level: 1 },
{ en: "almost", pl: "prawie", level: 1 },
{ en: "enough", pl: "wystarczająco", level: 1 },
{ en: "maybe", pl: "może", level: 1 },
{ en: "together", pl: "razem", level: 1 },
{ en: "alone", pl: "sam", level: 1 },

{ en: "early", pl: "wcześnie", level: 1 },
{ en: "late", pl: "późno", level: 1 },
{ en: "everywhere", pl: "wszędzie", level: 1 },
{ en: "anywhere", pl: "gdziekolwiek", level: 1 },
{ en: "something", pl: "coś", level: 1 },
{ en: "nothing", pl: "nic", level: 1 },
{ en: "someone", pl: "ktoś", level: 1 },
{ en: "everyone", pl: "wszyscy", level: 1 },
{ en: "without", pl: "bez", level: 1 },
{ en: "because", pl: "ponieważ", level: 1 },

{ en: "before", pl: "przed", level: 1 },
{ en: "after", pl: "po", level: 1 },
{ en: "during", pl: "podczas", level: 1 },
{ en: "while", pl: "podczas / gdy", level: 1 },
{ en: "until", pl: "aż do", level: 1 },
{ en: "around", pl: "około", level: 1 },
{ en: "already", pl: "już", level: 1 },
{ en: "still", pl: "nadal", level: 1 },
{ en: "yet", pl: "jeszcze", level: 1 },
{ en: "soon", pl: "wkrótce", level: 1 },

    { en: "how much", pl: "ile kosztuje", level: 0 },
    { en: "where", pl: "gdzie", level: 0 },
    { en: "when", pl: "kiedy", level: 0 },
    { en: "why", pl: "dlaczego", level: 0 },
    { en: "because", pl: "ponieważ", level: 0 },
    { en: "I think", pl: "myślę", level: 0 },
    { en: "I need", pl: "potrzebuję", level: 0 },
    { en: "I want", pl: "chcę", level: 0 },
    { en: "maybe", pl: "może", level: 0 },
    { en: "sure", pl: "jasne", level: 0 },
    { en: "of course", pl: "oczywiście", level: 0 },
    { en: "right now", pl: "teraz", level: 0 },
    { en: "later", pl: "później", level: 0 },
    { en: "again", pl: "znowu", level: 0 },
    { en: "already", pl: "już", level: 0 },
    { en: "always", pl: "zawsze", level: 0 }
  ],

  car: [
    { en: "engine", pl: "silnik", level: 0 },
    { en: "gearbox", pl: "skrzynia biegów", level: 0 },
    { en: "clutch", pl: "sprzęgło", level: 0 },
    { en: "brake", pl: "hamulec", level: 0 },
    { en: "brake pad", pl: "klocek hamulcowy", level: 0 },
    { en: "brake disc", pl: "tarcza hamulcowa", level: 0 },
    { en: "wheel", pl: "koło", level: 0 },
    { en: "tire", pl: "opona", level: 0 },
    { en: "rim", pl: "felga", level: 0 },
    { en: "battery", pl: "akumulator", level: 0 },
    { en: "headlight", pl: "reflektor", level: 0 },
    { en: "taillight", pl: "tylne światło", level: 0 },
    { en: "bumper", pl: "zderzak", level: 0 },
    { en: "hood", pl: "maska", level: 0 },
    { en: "trunk", pl: "bagażnik", level: 0 },
    { en: "exhaust", pl: "wydech", level: 0 },
    { en: "radiator", pl: "chłodnica", level: 0 },
    { en: "spark plug", pl: "świeca zapłonowa", level: 0 },
    { en: "fuel pump", pl: "pompa paliwa", level: 0 },
    { en: "oil filter", pl: "filtr oleju", level: 0 },

      // --- czesci silnika ---
  { en: "engine block", pl: "blok silnika", level: 0 },
  { en: "cylinder", pl: "cylinder", level: 0 },
  { en: "piston", pl: "tłok", level: 0 },
  { en: "crankshaft", pl: "wał korbowy", level: 0 },
  { en: "camshaft", pl: "wałek rozrządu", level: 0 },
  { en: "timing belt", pl: "pasek rozrządu", level: 0 },
  { en: "timing chain", pl: "łańcuch rozrządu", level: 0 },
  { en: "valve", pl: "zawór", level: 0 },
  { en: "turbocharger", pl: "turbosprężarka", level: 0 },
  { en: "intercooler", pl: "intercooler", level: 0 },

  // --- układ paliwowy ---
  { en: "fuel tank", pl: "zbiornik paliwa", level: 0 },
  { en: "fuel injector", pl: "wtryskiwacz", level: 0 },
  { en: "fuel filter", pl: "filtr paliwa", level: 0 },
  { en: "throttle", pl: "przepustnica", level: 0 },

  // --- układ chłodzenia ---
  { en: "coolant", pl: "płyn chłodniczy", level: 0 },
  { en: "water pump", pl: "pompa wody", level: 0 },
  { en: "cooling fan", pl: "wentylator chłodnicy", level: 0 },
  { en: "thermostat", pl: "termostat", level: 0 },

  // --- zawieszenie i układ jezdny ---
  { en: "suspension", pl: "zawieszenie", level: 0 },
  { en: "shock absorber", pl: "amortyzator", level: 0 },
  { en: "spring", pl: "sprężyna", level: 0 },
  { en: "control arm", pl: "wahacz", level: 0 },
  { en: "stabilizer bar", pl: "drążek stabilizatora", level: 0 },
  { en: "wheel hub", pl: "piasta koła", level: 0 },
  { en: "bearing", pl: "łożysko", level: 0 },

  // --- układ hamulcowy ---
  { en: "brake caliper", pl: "zacisk hamulcowy", level: 0 },
  { en: "handbrake", pl: "hamulec ręczny", level: 0 },
  { en: "brake fluid", pl: "płyn hamulcowy", level: 0 },
  { en: "brake hose", pl: "przewód hamulcowy", level: 0 },

  // --- skrzynia i napęd ---
  { en: "driveshaft", pl: "wał napędowy", level: 0 },
  { en: "axle", pl: "oś", level: 0 },
  { en: "differential", pl: "mechanizm różnicowy", level: 0 },
  { en: "flywheel", pl: "koło zamachowe", level: 0 },

  // --- elektryka ---
  { en: "alternator", pl: "alternator", level: 0 },
  { en: "starter", pl: "rozrusznik", level: 0 },
  { en: "fuse", pl: "bezpiecznik", level: 0 },
  { en: "relay", pl: "przekaźnik", level: 0 },
  { en: "wiring", pl: "okablowanie", level: 0 },
  { en: "sensor", pl: "czujnik", level: 0 },
  { en: "oxygen sensor", pl: "sonda lambda", level: 0 },

  // --- karoseria ---
  { en: "door", pl: "drzwi", level: 0 },
  { en: "door handle", pl: "klamka", level: 0 },
  { en: "side mirror", pl: "lusterko boczne", level: 0 },
  { en: "windshield", pl: "przednia szyba", level: 0 },
  { en: "rear window", pl: "tylna szyba", level: 0 },
  { en: "fender", pl: "błotnik", level: 0 },
  { en: "roof", pl: "dach", level: 0 },

  // --- wnętrze ---
  { en: "steering wheel", pl: "kierownica", level: 0 },
  { en: "dashboard", pl: "deska rozdzielcza", level: 0 },
  { en: "seat", pl: "siedzenie", level: 0 },
  { en: "seatbelt", pl: "pas bezpieczeństwa", level: 0 },
  { en: "gear lever", pl: "lewarek zmiany biegów", level: 0 },
  { en: "pedal", pl: "pedał", level: 0 },
  { en: "air conditioning", pl: "klimatyzacja", level: 0 },

  // --- wydech ---
  { en: "muffler", pl: "tłumik", level: 0 },
  { en: "catalytic converter", pl: "katalizator", level: 0 },
  { en: "exhaust pipe", pl: "rura wydechowa", level: 0 }
]

};
