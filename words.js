// ===============================
// SŁÓWKA – PODZIAŁ NA KATEGORIE
// ===============================

const WORD_SETS = {

  conversation: [
  { id: "conversation_always", en: "always", pl: "zawsze" },
  { id: "conversation_often", en: "often", pl: "często" },
  { id: "conversation_sometimes", en: "sometimes", pl: "czasami" },
  { id: "conversation_never", en: "never", pl: "nigdy" },
  { id: "conversation_usually", en: "usually", pl: "zazwyczaj" },
  { id: "conversation_almost", en: "almost", pl: "prawie" },
  { id: "conversation_enough", en: "enough", pl: "wystarczająco" },
  { id: "conversation_maybe", en: "maybe", pl: "może" },
  { id: "conversation_together", en: "together", pl: "razem" },
  { id: "conversation_alone", en: "alone", pl: "sam" },
    
  { id: "conversation_early", en: "early", pl: "wcześnie" },
  { id: "conversation_late", en: "late", pl: "późno" },
  { id: "conversation_everywhere", en: "everywhere", pl: "wszędzie" },
  { id: "conversation_anywhere", en: "anywhere", pl: "gdziekolwiek" },
  { id: "conversation_something", en: "something", pl: "coś" },
  { id: "conversation_nothing", en: "nothing", pl: "nic" },
  { id: "conversation_someone", en: "someone", pl: "ktoś" },
  { id: "conversation_everyone", en: "everyone", pl: "wszyscy" },
  { id: "conversation_without", en: "without", pl: "bez" },
  { id: "conversation_because", en: "because", pl: "ponieważ" },

  { id: "conversation_before", en: "before", pl: "przed" },
  { id: "conversation_after", en: "after", pl: "po" },
  { id: "conversation_during", en: "during", pl: "podczas" },
  { id: "conversation_while", en: "while", pl: "podczas / gdy" },
  { id: "conversation_until", en: "until", pl: "aż do" },
  { id: "conversation_around", en: "around", pl: "około" },
  { id: "conversation_already", en: "already", pl: "już" },
  { id: "conversation_still", en: "still", pl: "nadal" },
  { id: "conversation_yet", en: "yet", pl: "jeszcze" },
  { id: "conversation_soon", en: "soon", pl: "wkrótce" },

  { id: "conversation_how_much", en: "how much", pl: "ile kosztuje" },
  { id: "conversation_where", en: "where", pl: "gdzie" },
  { id: "conversation_when", en: "when", pl: "kiedy" },
  { id: "conversation_why", en: "why", pl: "dlaczego" },
  { id: "conversation_i_think", en: "I think", pl: "myślę" },
  { id: "conversation_i_need", en: "I need", pl: "potrzebuję" },
  { id: "conversation_i_want", en: "I want", pl: "chcę" },
  { id: "conversation_sure", en: "sure", pl: "jasne" },
  { id: "conversation_of_course", en: "of course", pl: "oczywiście" },
  { id: "conversation_right_now", en: "right now", pl: "teraz" },
  { id: "conversation_later", en: "later", pl: "później" },
  { id: "conversation_again", en: "again", pl: "znowu" }
],


  car: [
  // --- silnik ---
  { id: "car_engine", en: "engine", pl: "silnik" },
  { id: "car_engine_block", en: "engine block", pl: "blok silnika" },
  { id: "car_cylinder", en: "cylinder", pl: "cylinder" },
  { id: "car_piston", en: "piston", pl: "tłok" },
  { id: "car_crankshaft", en: "crankshaft", pl: "wał korbowy" },
  { id: "car_camshaft", en: "camshaft", pl: "wałek rozrządu" },
  { id: "car_valve", en: "valve", pl: "zawór" },
  { id: "car_timing_belt", en: "timing belt", pl: "pasek rozrządu" },
  { id: "car_timing_chain", en: "timing chain", pl: "łańcuch rozrządu" },
  { id: "car_turbocharger", en: "turbocharger", pl: "turbosprężarka" },
  { id: "car_intercooler", en: "intercooler", pl: "intercooler" },
  { id: "car_flywheel", en: "flywheel", pl: "koło zamachowe" },
  { id: "car_spark_plug", en: "spark plug", pl: "świeca zapłonowa" },
  { id: "car_oil_filter", en: "oil filter", pl: "filtr oleju" },
  { id: "car_fuel_pump", en: "fuel pump", pl: "pompa paliwa" },

  // --- układ paliwowy ---
  { id: "car_fuel_tank", en: "fuel tank", pl: "zbiornik paliwa" },
  { id: "car_fuel_injector", en: "fuel injector", pl: "wtryskiwacz" },
  { id: "car_fuel_filter", en: "fuel filter", pl: "filtr paliwa" },
  { id: "car_throttle", en: "throttle", pl: "przepustnica" },

  // --- układ chłodzenia ---
  { id: "car_radiator", en: "radiator", pl: "chłodnica" },
  { id: "car_coolant", en: "coolant", pl: "płyn chłodniczy" },
  { id: "car_water_pump", en: "water pump", pl: "pompa wody" },
  { id: "car_cooling_fan", en: "cooling fan", pl: "wentylator chłodnicy" },
  { id: "car_thermostat", en: "thermostat", pl: "termostat" },

  // --- układ hamulcowy ---
  { id: "car_brake", en: "brake", pl: "hamulec" },
  { id: "car_brake_pad", en: "brake pad", pl: "klocek hamulcowy" },
  { id: "car_brake_disc", en: "brake disc", pl: "tarcza hamulcowa" },
  { id: "car_brake_caliper", en: "brake caliper", pl: "zacisk hamulcowy" },
  { id: "car_handbrake", en: "handbrake", pl: "hamulec ręczny" },
  { id: "car_brake_fluid", en: "brake fluid", pl: "płyn hamulcowy" },
  { id: "car_brake_hose", en: "brake hose", pl: "przewód hamulcowy" },

  // --- zawieszenie i układ jezdny ---
  { id: "car_suspension", en: "suspension", pl: "zawieszenie" },
  { id: "car_shock_absorber", en: "shock absorber", pl: "amortyzator" },
  { id: "car_spring", en: "spring", pl: "sprężyna" },
  { id: "car_control_arm", en: "control arm", pl: "wahacz" },
  { id: "car_stabilizer_bar", en: "stabilizer bar", pl: "drążek stabilizatora" },
  { id: "car_wheel_hub", en: "wheel hub", pl: "piasta koła" },
  { id: "car_bearing", en: "bearing", pl: "łożysko" },

  // --- napęd i skrzynia ---
  { id: "car_gearbox", en: "gearbox", pl: "skrzynia biegów" },
  { id: "car_clutch", en: "clutch", pl: "sprzęgło" },
  { id: "car_driveshaft", en: "driveshaft", pl: "wał napędowy" },
  { id: "car_axle", en: "axle", pl: "oś" },
  { id: "car_differential", en: "differential", pl: "mechanizm różnicowy" },

  // --- elektryka ---
  { id: "car_battery", en: "battery", pl: "akumulator" },
  { id: "car_alternator", en: "alternator", pl: "alternator" },
  { id: "car_starter", en: "starter", pl: "rozrusznik" },
  { id: "car_fuse", en: "fuse", pl: "bezpiecznik" },
  { id: "car_relay", en: "relay", pl: "przekaźnik" },
  { id: "car_wiring", en: "wiring", pl: "okablowanie" },
  { id: "car_sensor", en: "sensor", pl: "czujnik" },
  { id: "car_oxygen_sensor", en: "oxygen sensor", pl: "sonda lambda" },

  // --- karoseria ---
  { id: "car_bumper", en: "bumper", pl: "zderzak" },
  { id: "car_hood", en: "hood", pl: "maska" },
  { id: "car_trunk", en: "trunk", pl: "bagażnik" },
  { id: "car_door", en: "door", pl: "drzwi" },
  { id: "car_door_handle", en: "door handle", pl: "klamka" },
  { id: "car_side_mirror", en: "side mirror", pl: "lusterko boczne" },
  { id: "car_windshield", en: "windshield", pl: "przednia szyba" },
  { id: "car_rear_window", en: "rear window", pl: "tylna szyba" },
  { id: "car_fender", en: "fender", pl: "błotnik" },
  { id: "car_roof", en: "roof", pl: "dach" },

  // --- wnętrze ---
  { id: "car_steering_wheel", en: "steering wheel", pl: "kierownica" },
  { id: "car_dashboard", en: "dashboard", pl: "deska rozdzielcza" },
  { id: "car_seat", en: "seat", pl: "siedzenie" },
  { id: "car_seatbelt", en: "seatbelt", pl: "pas bezpieczeństwa" },
  { id: "car_gear_lever", en: "gear lever", pl: "lewarek zmiany biegów" },
  { id: "car_pedal", en: "pedal", pl: "pedał" },
  { id: "car_air_conditioning", en: "air conditioning", pl: "klimatyzacja" },

  // --- oświetlenie ---
  { id: "car_headlight", en: "headlight", pl: "reflektor" },
  { id: "car_taillight", en: "taillight", pl: "tylne światło" },
  { id: "car_indicator", en: "indicator", pl: "kierunkowskaz" },
  { id: "car_fog_light", en: "fog light", pl: "światło przeciwmgielne" },

  // --- wydech ---
  { id: "car_exhaust", en: "exhaust", pl: "wydech" },
  { id: "car_muffler", en: "muffler", pl: "tłumik" },
  { id: "car_catalytic_converter", en: "catalytic converter", pl: "katalizator" },
  { id: "car_exhaust_pipe", en: "exhaust pipe", pl: "rura wydechowa" },

  // --- koła ---
  { id: "car_wheel", en: "wheel", pl: "koło" },
  { id: "car_tire", en: "tire", pl: "opona" },
  { id: "car_rim", en: "rim", pl: "felga" }
]

};
