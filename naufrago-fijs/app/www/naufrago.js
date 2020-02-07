// Náufrago (c) 2020 Baltasar MIT License <baltasarq@gmail.com>
/*
    generado por FI.JS@txtMap, v0.1/ v0.6 20140612
    Fri Jan 17 11:02:38 2020
*/

ctrl.setTitle( "Náufrago" );
ctrl.setIntro( "<p>29 de Septiembre de 1994</p>\
<p>El ferry ”Estonia” se hunde en el mar Báltico, \
llevándose consigo 850 personas.</p>\
<p>A pesar de cumplir con todas las normas de seguridad, \
la temperatura del agua, extremadamente baja, \
unida a la rapidez con la que se hundió el navío, hicieron \
imposible que la mayoría del pasaje se salvara.</p>\
<p>Las circunstancias del hundimiento \
continúan siendo un misterio. \
Algunos testimonios afirman que la compuerta de acceso \
para vehículos se abrió por alguna circunstancia, \
haciendo que el ferry se inundara rápidamente. \
La compuerta había pasado los chequeos \
de seguridad sin aparentes fallos.</p>\
<p>Posteriores investigaciones revelaron que \
la causa del hundimiento podría estar \
relacionada con el contrabando de armas desde Rusia...</p>" );

ctrl.setPic( "res/naufrago-title.jpg" );
ctrl.setAuthor( "Baltasar (baltasarq@gmail.com)" );
ctrl.setVersion( "2.0 20200207" );

// ********************************************************** Boat --
const locBoat = ctrl.places.creaLoc(
    "Bote",
    [ "lancha", "barca" ],
    "El mar mece lo que desde hace algún tiempo es el sustento \
    de tu frágil vida. El ${mar abierto, ex mar} \
    (si bien sabes que es el Báltico) se extiende en \
    todas direcciones, sin atisbo posible de tierra." );
locBoat.pic= "res/sea.jpg";
locBoat.puncture = true;
locBoat.rescueShipPresent = false;
locBoat.rowingStatus = 0;
locBoat.prePush = function() {
    var toret = "Montas los remos y comienas a remar.";
    
    if ( !this.rescueShipPresent ) {
        if ( this.rowingStatus < 2 ) {
            toret += " Remas frenéticamente, pero notas \
                        que lo haces desacompasado, \
                        respirando rápida y superficialmente.</p><p>";
            
            if ( this.rowingStatus == 0 ) {
                toret += "Como entonces... \
                            Había gente que necesitaba ayuda, \
                            pero tú seguiste remando... \
                            hasta caer extenuado \
                            sobre el fondo del bote.</p>\
                            <p>No podías -¿no es cierto?-, \
                            había demasiada gente en el agua ─¿no?─, \
                            hubiesen hecho volcar el bote salvavidas, \
                            y entonces no habría sobrevivido ninguno.";
                ++this.rowingStatus;
            }
            else
            if ( this.rowingStatus == 1 ) {
                toret += "Dejas de remar. \
                            El agua estará a dos o tres grados. \
                            Eso significa, \
                            de no poder salir de ella, \
                            la muerte por hipotermia \
                            en menos de una hora.</p>\
                            <p>─Pero estoy vivo─ piensas. \
                            ─¿No es eso lo importante?─, te preguntas. \
                            ¿Por qué me duele tanto el estómago? \
                            ─piensas, mientras hundes \
                            la cabeza entre las manos─.";
                ++this.rowingStatus;
            }
            
            toret += "</p><p>Desmontas los remos, pero... sabes que deberías \
                      ${seguir, empuja bote}.</p>";
        } else {        
            toret += " Al principio lo haces con ganas, con \
                    energía. Sin embargo, pronto tu vista \
                    comienza a perderse en el horizonte, \
                    y la futilidad de tu intento \
                    en la inmensidad de la nada te desespera completamente. \
                    </p><p>De nuevo remas, pero más rápido. \
                    Incluso comienzas a gritar, movido por la angustia. \
                    Tu estómago se contrae, y entonces, \
                    movido por la frustración, golpeas hasta \
                    desmontar los remos y te tumbas boca arriba en la barca, \
                    tratando de recuperar la respiración.";
        
            if ( ctrl.places.limbo.has( objBox ) ) {
                objBox.moveTo( locBoat );
                objPocket.moveTo( locBoat );
                
                this.desc += " En la lona de la barca hay moldeado \
                            ${un bolsillo, ex bolsillo}. \
                            Llama tu atención un ${compartimento, ex caja} en \
                            el fondo de la balsa.";
                ctrl.places.doDesc();
                toret += "</p><p>Tratando de ignorar la futilidad de tu acción, \
                        echas un vistazo en derredor.";
            }
        }
    } else {
        toret = "";
        ctrl.personas.getPlayer().objs.slice().forEach( 
            function(obj) {
                obj.moveTo( ctrl.places.limbo );
            });
        
        ctrl.goto( locBoard );
    }
    
    return toret;
};

locBoat.preExamine = function() {
    var toret = this.desc;
    
    if ( locBoat.getTimesExamined() == 0 ) {
        toret = "Despiertas poco a poco... \
                 suavemente... \
                 como de un sueño reparador...</p>\
                 <p>Abres los ojos. \
                 Parpadeas, mecido en una cuna roja \
                 con el cielo por dosel...</p>\
                 <p>El sol acaricia tu piel. \
                 A la vez notas una brisa muy desagradable, \
                 que se incrementa a medida que asomas la cabeza \
                 por encima del borde... \
                 esta no es una temperatura tropical \
                 ─ni agradable─, piensas.</p>\
                 <p>Lentamente, te incorporas, \
                 viendo cómo el mar infinito \
                 se extiende en todas direcciones...</p>\
                 <p>De repente, agolpadamente, todos los recuerdos \
                 vienen a tu memoria: la tormenta, \
                 el agua entrando por la compuerta de \
                 la bodega de carga, el ferry, ─el Estonia, \
                 camino de Suecia, recuerdas─, \
                 inclinándose sobre sí mismo, y cómo, \
                 desesperado por conservar la vida, te aferraste \
                 a una de las lanchas salvavidas \
                 y te arrojaste al agua... \
                 a dos o tres grados centígrados.</p><p>"
                + toret;
    }
    
    if ( locBoat.puncture
     &&  ctrl.getTurns() > 5 )
    {
        toret += " Te das cuenta, siguiendo un sonido de siseo, de que \
                  la lancha salvavidas tiene un pinchazo y el aire se está \
                  escapando por ella.";
    }
    
    return toret;
};

const objSea = ctrl.creaObj(
    "mar",
    [ "agua" ],
    "El mar se extiende en todas direcciones hasta el horizonte. \
    Lo cierto es que hay una mancha oscura mires donde mires, \
    pero no puedes decir si es la unión de mar y cielo o \
    es que realmente hay tierra, lejos, pero por todas partes.",
    locBoat,
    Ent.Scenery );

objSea.preExamine = function() {
    var toret = this.desc;
    
    if ( this.getTimesExamined() < 2 ) {
        toret += "</p><p>Pegas un respingo: te das cuenta de que has pensado \
                  todo ésto como de carrerilla. \
                  Notas la ansiedad como abriéndose paso por tu estómago. \
                  Debes pensar una solución.";
    }
    
    if ( locBoat.rescueShipPresent ) {
        toret = "¡Puedes ver el barco de rescate!";
    }
    
    return toret;
};

const objPocket = ctrl.creaObj(
    "bolsillo",
    [],
    "Modelado en la lona de la barca.",
    ctrl.places.limbo,
    Ent.Scenery );

objPocket.preExamine = function() {
    var toret = this.desc;
    
    if ( locBoat.puncture
      && ctrl.places.limbo.has( objPatch ) )
    {
        toret += "  De su interior sacas un ${parche, ex parche}.";
        objPatch.moveTo( ctrl.personas.getPlayer() );
    } else {
        toret += " Ahora está vacío.";
    }
    
    return toret;
};

const objBag = ctrl.creaObj(
    "bolsa",
    [ "lona" ],
    "Está hecho de algún tipo de lona impermeable.",
    ctrl.places.limbo,
    Ent.Portable );

objBag.preExamine = function() {
    var toret = this.desc;
    
    if ( ctrl.places.limbo.has( objFlashLight ) ) {
        const player = ctrl.personas.getPlayer();
        
        objFlashLight.moveTo( player );
        objWires.moveTo( player );
        
        toret += " De su interior sacas una ${linterna, ex linterna}, \
                  y unos ${alambres, ex alambres}.";
    }
    
    return toret;
};

const objFlashLight = ctrl.creaObj(
    "linterna",
    [],
    "Es una linterna amarilla impermeable, con una sección \
    que se ${abre para acceder a las pilas, abre linterna}. \
    Se puede intentar ${encender, enciende linterna}.",
    ctrl.places.limbo,
    Ent.Portable );

objFlashLight.setCloseable();
objFlashLight.setOpen( false );
objFlashLight.preOpen = function() {
    var toret = "¡Ya está abierta! Le has sacado la ${batería, ex bateria}.";
    
    if ( !this.isOpen() ) {
        toret = "Abres el compartimento de las pilas, \
                 y sacas ${la batería, ex bateria}... \
                 ¡Vaya, se te ha caído al fondo del bote!";
        
        objBattery.moveTo( locBoat );
        this.setOpen( true );
        ctrl.places.doDesc();
    }
    
    return toret;
};

objFlashLight.preStart = function() {
    var toret = "No funciona. Debe de tener algo que ver con que \
                 le hayas quitado ${la batería, ex bateria}.";
    
    if ( ctrl.places.limbo.has( objBattery ) ) {
        toret = "Enciendes la linterna. Como no sirve de nada... la apagas. \
                 Por si acaso.";
    }
    
    return toret;
};


const objBattery = ctrl.creaObj(
    "batería",
    [ "bateria", "baterias", "pila", "pilas" ],
    "Pues sí, es exactamente lo que parece.",
    ctrl.places.limbo,
    Ent.Portable );

objBattery.preExamine = function() {
    var toret = this.desc;
    
    if ( objCellPhone.batteryCharged ) {
        toret = "Debe de estar ya descargada completamente.";
    };
    
    return toret;
};


const objWires = ctrl.creaObj(
    "alambres",
    [ "alambre", "cables", "cable" ],
    "Pequeños trozos de alambre de cobre.",
    ctrl.places.limbo,
    Ent.Portable );


const objPatch = ctrl.creaObj(
    "parche",
    [],
    "Un parche para ${reparar pinchazos, empuja parche} en una lancha como esta.",
    ctrl.places.limbo,
    Ent.Portable );

objPatch.preExamine = function() {
    var toret = this.desc;
    
    if ( ctrl.getTurns() < 10 ) {
        toret = "Un parche para reparar pinchazos en una lancha como esta.";
    }
    
    return toret;
};

objPatch.prePush = function() {
    var toret = "No tiene sentido, la lancha está bien.";
    
    if ( locBoat.puncture ) {
        if ( ctrl.isPresent( objPatch ) ) {
            objPatch.moveTo( ctrl.places.limbo );
            ctrl.removeDaemon( "puncture" );
            toret = "Utilizas el parche retirando el envoltorio y aplicándolo \
                    al pinchazo en el bote.";
            locBoat.puncture = false;
            ctrl.achievements.achieved( "mariner" );
            ctrl.places.doDesc();
        } else {
            toret = "¡No tienes con qué!";
        }
    }
    
    return toret;
};

const objBox = ctrl.creaObj(
    "compartimento",
    [ "caja" ],
    "El compartimento está vacío.",
    ctrl.places.limbo,
    Ent.Scenery );

objBox.preExamine = function() {
    var toret = this.desc;
    
    if ( ctrl.places.limbo.has( objBag ) ) {
        objBag.moveTo( ctrl.personas.getPlayer() );
        toret = "Abres el compartimento y sacas su único contenido: \
                 ${una bolsa de lona, ex bolsa}.";
    }
    
    return toret;
};

const objOars = ctrl.creaObj(
    "remos",
    [ "remo" ],
    "De madera y aluminio, muy ligeros. Sirven para ${remar, empuja bote}.",
    locBoat,
    Ent.Portable );


// ****************************************************************** Clinic --
const locBoard = ctrl.places.creaLoc(
    "borda",
    [ "barco" ],
    "La borda del barco se alza a tu lado, colgando de ella \
     una ${red de rescate, ex red}. Por encima de las barandilla \
     se asoman, curiosas, las cabezas de los marineros que tripulan \
     el barco de salvamento." );
locBoard.pic = "res/vessel_board.jpg";

locBoard.preExamine = function() {
    var toret = this.desc;
    
    if ( this.getTimesExamined() == 0 ) {
        toret = "</p><p>Remas hacia el barco, \
                  casi histérico de alegría... \
                  te introduces en la sombra que proyecta en el agua... \
                  Desde tu posición, el barco de salvamento \
                  parece un coloso. \
                  Al dejar de notar el sol sobre tu piel, \
                  notas algo de frío... De nuevo te sientes desvalido, \
                  con miedo.</p><p>"
                 + toret;
    }
    
    return toret;
};

objRescueNet = ctrl.creaObj(
    "red",
    [ "rescate" ],
    "La red permite subir ${escalando la borda, tirar de red}.",
    locBoard,
    Ent.Scenery );

objRescueNet.prePull = function() {
    var toret = "Con más torpeza de las que pensabas, \
                  probablemente relacionada con la humedad \
                  y la incomodidad del bote, trepaste por la red \
                  tan rápido como pudiste.";
    
    ctrl.achievements.achieved( "rescued" );
    ctrl.goto( locDeck );
    
    return toret;
};


// ****************************************************************** Deck   --
const locDeck = ctrl.places.creaLoc(
    "Cubierta",
    [ "barco" ],
    "Desde tu posición, tumbado en cubierta, puedes ver \
     una ${camilla de rescate, ex camilla}, \
     y a varios ${marineros, ex marineros} a tu alrededor." );
locDeck.pic = "res/deck.jpg";

locDeck.preExamine = function() {
    var toret = this.desc;
    
    if ( this.getTimesExamined() == 0 ) {
        toret = "Unos marineros te recogen \
                 y te depositan en cubierta. \
                 Tumbado sobre cubierta, notas una sensación de alivio, \
                 relajación... largo tiempo olvidada.\
                 </p><p>Te desvaneces.\
                 </p><p>Todo está oscuro. \
                 Sientes una sensación como de movimiento, \
                 como si emergieras de... ¿un sueño? \
                 ...despiertas de un largo sueño... \
                 </p><p>Puedes oir un eco insistente, \
                 en algún lugar de tu conciencia.\
                 </p><p>Pero ese eco es el recuerdo de algo irreal, \
                 algo que de alguna manera está en tu mente \
                 pero no puedes recordar, algo producto de tu \
                 imaginación.</p>"
                + toret;

    }
    
    return toret;
};

const objStretcher = ctrl.creaObj(
    "camilla",
    [],
    "Está colgada sobre una barandilla, lo que te llama la atención. \
    Notas, además, dificultad en concentrar tu vista.",
    locDeck,
    Ent.Scenery );

const objMariners = ctrl.creaObj(
    "marineros",
    [],
    "",
    locDeck,
    Ent.Scenery );

objMariners.preExamine = function() {
    ctrl.goto( locDarkness );
};


// **************************************************************** Darkness --
const locDarkness = ctrl.places.creaLoc(
    "Oscuridad",
    [],
    "Te has ${desvanecido, sal}..." );
locDarkness.pic = "res/darkness.jpg";

locDarkness.preExit = function() {
    ctrl.goto( locClinic );
};


// ****************************************************************** Clinic --
const locClinic = ctrl.places.creaLoc(
    "Habitación",
    [ "clinica", "habitacion" ],
    "La habitación, de alguna clínica desconocida, es luminosa y fresca, \
    te sientes arropado en tu cama." );
locClinic.pic = "res/clinic_room.jpg";

locClinic.preExamine = function() {
    var toret = this.desc;
    
    if ( this.getTimesExamined() == 0 ) {
        ctrl.personas.getPlayer().desc = "Por fin, descansando.";
        
        toret = "</p><p>─Señor... ¿Señor?... ¿puede oirme?\
                  </p><p>Tus ojos van acostumbrándose, poco a poco, \
                  a la claridad. Por un momento, \
                  estás absolutamente desorientado, \
                  inmerso en un mundo de blancura absoluta.\
                  <br/>─Sí...\
                  <br/>─¿Puede decirnos cómo se llama?\
                  <br/>─Soy ... Warren Buffett.\
                  <br/>El médico (ahora ves que es un médico), \
                  enarca ligeramente las cejas.\
                  <br/>─ Comprendo.\
                  <br/>─Trate de descansar, y no se levante.\
                  <br/>─Gracias... doctor...\
                  <br/>─De nada. No se preocupe. Sobre todo, recupérese.\
                  </p><p>Caes en un sueño reparador, \
                  sabedor de que cualquier peligro que acechara... \
                  ya ha pasado.\
                  </p><p>...despiertas de nuevo.\
                  </p><p>" + toret;
    }
    
    return toret;
};

const pncScarFace = ctrl.personas.creaPersona(
    "hombre",
    [ "mafioso" ],
    "Es un hombre extraño para ti, que te mira insistentemente \
     desde su silla en un rincón. Viste con gabardina y traje, \
     aunque estos están un tanto pasados de moda. \
     Su cara no invita a las familiaridades.",
    locClinic );
pncScarFace.status = 0;

pncScarFace.preTalk = function() {
    ctrl.clearAnswers();
    
    if ( this.status == 0 ) {
        ctrl.places.doDesc();
        
        ctrl.print( "Vas a empezar a hablar, cuando el gesto irónico \
                    del hombre te interrumpe...\
                    <br/>─Vaya, Mike, veo que has despertado...\
                    <br/>Te sientes confuso .. ¿Mike?\
                    <br/>─Lo siento, mi nombre es Warren.\
                    <br/>El hombre parece estar a punto de echarse \
                    una carcajada, aunque finalmente se contenta con emitir \
                    una especie de serie de gemidos contenidos, \
                    mientras sacude la cabeza y tuerce la boca.\
                    <br/>─Lo que tú digas... Mike.\
                    <br/>Ha pronunciado la última palabra ─¿tu nombre?─ como \
                    remarcando cada sílaba. Empiezas a ponerte nervioso.\
                    <br/>Un furor desconocido, que incluso a ti mismo \
                    te asombra por la rabia contenida que destila, \
                    se apodera de ti.\
                    <br/>─¡Yo no soy Mike!\
                    </p><p>Tratas de calmar tu rabia y apartas la vista hasta \
                    estar seguro de poder seguir hablando con él." );
        
        ++this.status;
    }
    else
    if ( this.status == 1 ) {
        ctrl.print( "Ahora esboza una gran sonrisa, y te habla en un tono \
                    que media entre una supuesta ofensa y como se hablaría \
                    a un niño.\
                    <br/>─Claro que no. Eres el tal ‘bufé’, el ricachón \
                    con el que siempre soñaste en convertirte, \
                    ¿no es cierto?\
                    <br/>Balbuceas, tratando de articular la respuesta...\
                    <br/>─Yo no... ¿de qué me conoce usted?\
                    <br/>Tu interlocutor echa el cuerpo hacia adelante, como para \
                    entiendas de forma muy clara lo que va a decir.\
                    <br/>─Pues verás. Te conozco desde que te metiste \
                    en este lío de contrabando de armas.\
                    <br/>Sus palabras resuenan en tu cabeza... \
                    <br/>─¿Armas?\
                    <br/>Algún tipo de instinto te hace recoger \
                    el extremo de la sábana, y subirlo como para paliar el frío. \
                    Solo que no hace frío.\
                    <br/>─Sí, armas. Y la cagaste. Pero bien.\
                    <br/>Intentas establecer una defensa... es una locura...\
                    <br/>─¿Pero qué dice? ¿Se ha vuelto loco?\
                    </p><p>Y sin embargo, muy a tu pesar, \
                    su cara empieza a sonarte familiar. Varias imágenes acuden \
                    a tu cabeza. Primero son como reflejos desvaídos, \
                    pero después cobran fuerza, y empiezas a... recordar." );
        
        ++this.status;
    }
    else
    if ( this.status == 2 ) {
        ctrl.print( "Vuelve a impedir que hables tú primero, \
                    adelantándose a tus preguntas.\
                    <br/>─Como te decía, la has cagado pero bien.\
                    ¿Qué narices hiciste para hundir el ferry?\
                    <br/>Tratas de excusarte, deseas decirle que no, \
                    que todo eso no es cierto. Pero incluso tus propias palabras \
                    suenan falsas, huecas, entrecortadas...\
                    <br/>─Yo... yo...\
                    <br/>Y de repente, las imágenes se fijan por fin \
                    en tu cabeza, y como si fuera una película, \
                    discurren como un torrente ante tus ojos: \
                    el cargamento de armas, aquel entrometido, la explosión...\
                    y el agua entrando por la visera, la compuerta de entrada\
                    a la cubierta de coches. Vuelves a mirar a aquel tipo. \
                    Sabes quién es. Sabes quien eres, de verdad. \
                    Ya lo sabes todo. Lo recuerdas todo. \
                    Abres la boca de par en par...\
                    <br/>─¡Yo lo hice!\
                    </p><p>Tus últimas palabras resuenan en tu cabeza, causándote\
                    una especie de reverberación, \
                    cuando ambas realidades chocan..." );
        
        ++this.status;
    }
    else
    if ( this.status == 3 ) {
        ctrl.achievements.achieved( "memento" );
        
        endGame( true, "res/clinic_room.jpg",
                "El hombre asiente gravemente mientras se levanta, \
                enarcando las cejas.\
                <br/>─Sí que lo hiciste. Pero lo hiciste muy mal.\
                <br/>Disfruta de tu estancia aquí. \
                Cuando salgas, ya sabes lo que te espera.\
                <br/>Se marcha, sin mirarte siquiera. \
                Tú, mientras tanto, te acurrucas... ¿qué será de ti? \
                Te tapas aún más con la sábana, \
                deseando repentinamente desaparecer del mundo." );
    }
};

// ************************************************************ Achievements --
ctrl.achievements.add( "mariner",
                       "Marinero (reparaste la lancha)." );

ctrl.achievements.add( "handyman",
                       "Manitas (cargaste el móvil)." );

ctrl.achievements.add( "rescued",
                       "Rescatado (¡saliste del mar!)." );

ctrl.achievements.add( "memento",
                       "Memento (¡<i>memento mori!</i>)." );

// ******************************************************************* Boot ---
const player = ctrl.personas.creaPersona( "Warren Buffet", [],
    "Uno de los hombres más ricos del mundo. \
     Un día lo tienes todo, y cuando te das cuenta... \
     estás un bote con cuatro cosas...",
    locBoat
);

const objCellPhone = ctrl.creaObj(
    "teléfono móvil",
    [ "telefono", "movil", "celular", "boton", "encendido" ],
    "",
     player,
     Ent.Portable );
objCellPhone.status112 = 0;
objCellPhone.batteryCharged = false;
objCellPhone.turnedOn = false;

objCellPhone.preExamine = function() {
    var toret = "";
    
    if ( !this.batteryCharged ) {
        toret += "Tiene un ${conector en la parte trasera, busca en movil} \
                  para enchufar el cargador, aunque nunca \
                  le has prestado demasiada atención.";
    }
    
    if ( this.getTimesExamined() < 2 ) {
        toret = "El famoso teléfono móvil. \
                 Es voluminoso e incómodo de llevar \
                 (ocupa el doble de tu perdida cartera), \
                 pero es increíble el estatus que otorga. \
                 Además, tú eres un personaje rico e influyente \
                 y debes llevar complementos acordes a tu posición."
                 + toret;
    }
    
    if ( !this.batteryCharged ) {
        toret += "</p><p>";
        
        if ( this.getTimesExamined() < 2 ) {
            toret += "No puedes evitar resoplar \
                  cuando piensas que el día anterior, \
                  cuando aún todo iba bien, pensaste que la batería \
                  siempre se pone a mínimos en el peor momento.";
        }
        
        toret += " Parece que el ${teléfono no funciona, enciende telefono} \
                   ¿estará efectivamente la batería descargada?";
    } else {
        if ( !this.turnedOn ) {
            toret += "</p><p>Contemplas ilusionado \
                      ${el botón de encendido, enciende telefono}... \
                      ¿Realmente habrá funcionado?";
        } else {
            toret += "</p><p>¡Está encendido! \
                      Ahora puedes ${llamar, empuja telefono}...";
        }
    }
    
    return toret;
};

objCellPhone.prePush = function() {
    var toret = "Llamas a emergencias... ¡pero no contesta nadie!";
    
    if ( this.status112 == 0 ) {
        toret = "Apenas puedes controlar tu ansiedad mientras \
                 te preparas para marcar el número... \
                 Pero, ¿cuál? ...en medio del mar, \
                 a quién llamar, a quién... \
                 ─Claro, claro─ piensas... ─el 112─ \
                 Marcas el 112, sin demasiadas esperanzas... \
                 una pausa... ¡Se oyen varios tonos! \
                 Una voz femenina responde: “Emergencias, 112”\
                 Al principio, te quedas mudo... \
                 es como si hubiera sido demasiado fácil...\
                 <br/>─¿Oiga? \
                 <br/>Al punto, las palabras se atropellan en tu boca.\
                 <br/>─¡Estoy en una balsa, en el medio del \
                 Báltico! ¡Hemos naufragado! ¡El Estonia se ha perdido! \
                 ¡No sé dónde estoy! ¡Por favor, ayúdeme!\
                 <br/>─Tranquilícese, señor, ¿puede ver algo que \
                 indique su posición?\
                 <br/>─No, no... no.\
                 <br/>─ Está bien. ¿Puede describir el bote?\
                 <br/>Casi no puedes contener una risa nerviosa... \
                 ─claro que puedo, estoy harto de verlo─, piensas.\
                 <br/>─Es un bote salvavidas rojo.\
                 <br/>─Bien, vamos a tratar de localizarle \
                 por la señal del móvil. Manténgalo encendido \
                 mientras localizo a los barcos de rescate \
                 que están en la zona donde se hundió el ”Estonia”.";
        ++this.status112;
        
        ctrl.setAlarm( 10, function() {
            ctrl.removeDaemon( "environment" );
            locBoat.pic = "res/rescue_ship.jpg";
            locBoat.rescueShipPresent = true;
            ctrl.clearAnswers();
            ctrl.places.doDesc();            
            ctrl.print( "Escuchas un ruido a tu espalda... \
                         ¡un barco se aproxima!\
                         </p><p>¡No puedes creerlo!... \
                         ¡es el barco de salvamento!\
                         </p><p>La patrullera, con bandas en azul y amarillo, \
                         se sitúa tan cerca como puede, a una treintena de \
                         metros de ti." );
        });
    }
    else
    if ( this.status112 == 1 ) {
        toret = "Necesitas hablar con alguien.\
                 <br/>─112, Emergencias. \
                 <br/>Te sientes aliviado al escuchar, \
                 de nuevo, una voz al otro lado del teléfono.\
                 <br/>─Soy... yo... todavía no ha llegado \
                 ningún barco de salvamento. \
                 <br/>─Le hemos localizado, \
                 los barcos de rescate tienen su posición. \
                 Sólo debe esperar a que el barco de salvamento \
                 se acerque lo suficiente como para que le recoja, señor. \
                 <br/>─Ya... yo... ¿tardará mucho?\
                 <br/>─Aún unos minutos, señor... \
                 la tormenta le desvió mucho del punto \
                 donde se hundió el barco.\
                 <br/>─¿Unos minutos?\
                 <br/>─Unos cuantos minutos.\
                 <br/>Se te hace un nudo en el estómago. \
                 En este momento, hasta unos minutos parecen una eternidad.\
                 <br/>─Vale, gracias.\
                 <br/>─Mantenga la calma, señor, enseguida llegarán.";
        ++this.status112;
    }
    else
    if ( this.status112 == 2 ) {
        if ( locBoat.rescueShipPresent ) {
            toret = "Llamas de nuevo...\
                    <br/>─Señor, el barco estará a punto de encontrarlo. \
                    Mantenga la calma.\
                    <br/>La línea queda muda.";
        } else {
            toret = "Llamas de nuevo...\
                    <br/>─Señor, mantenga la calma. La ayuda está en camino. \
                    Debo coordinar al equipo de rescate.\
                    <br/>La línea queda muda.";
        }
    }
    
    return toret;
};

objCellPhone.preSearch = function() {
    var toret = "El teléfono tiene un conector \
                 con dos bornes separados en la parte trasera.";
    
    if ( ctrl.isPresent( objWires )
      && ctrl.isPresent( objBattery ) )
    {
        toret += " Podrías ${conectar, ata movil con cables} \
                   el móvil a la batería.";
    }
    
    return toret;
};

objCellPhone.preTie = function() {
    var toret = "La batería de debe estar ya descargada: \
                 no tiene sentido intentarlo.";
    
    if ( ctrl.isPresent( objWires )
      && ctrl.isPresent( objBattery )
      && !this.batteryCharged )   
    {
        toret = "Tratas de cargar el móvil con la batería, \
                 utilizando los alambres \
                 para unir la batería a los bornes del enchufe trasero \
                 del teléfono.</p><p>¡La luz roja del teléfono se enciende!\
                 </p><p>Esperas un buen rato hasta que la luz se debilita y\
                 se apaga.";
        objBattery.moveTo( locBoat );
        ctrl.achievements.achieved( "handyman" );
        this.batteryCharged = true;
    }
    
    return toret;
};

objCellPhone.preStart = function() {
    var toret = "Lo intentas con todas tus ganas... y con todas tus fuerzas.\
                 Pero no, para tu completa desesperación, no funciona.";
    
    if ( this.turnedOn ) {
        toret = "¡Ya está encendido!";
    }
    else
    if ( this.batteryCharged ) {
        toret = "Tratando de controlar tu ansiedad, pulsas el botón \
                 de encendido y... ¡Sí! ¡${Ha funcionado, ex telefono}!";
        this.turnedOn = true;
    }
    
    return toret;
};


// **************************************************************** End game --
function amusing() {
    return "<i><b>Náufrago</b> es una aventura conversacional que escribí hace \
            ya muchos años (en 2007), usando Superglús. \
            La escribí para un concurso de ficción interactiva \
            fuera del CAAD, en donde no tuvo mucha acogida. \
            En este caso (la segunda revisión), \
            la he convertido en un relato interactivo.\
            <br/>La historia que se relata al comienzo del juego es \
            tristemente real: el hundimiento del Estonia sucedió... \
            el resto es todo inventado.</i>";
}

const htmlRestartAmusingEnding = "<p align='right'>\
                         <a href='javascript: location.reload();'>\
                         <i>Comenzar de nuevo</i></a>.<br/>\
                         <i><a href='#' onClick=\"javascript: \
                         document.getElementById('pAmenity').\
                         style.display='block'; return false\">\
                         Ver curiosidades</a>.</i></p>\
                         <p id='pAmenity' align='right' style='display: none'>"
                         + amusing() + "</p>";
                         
const htmlRestartEnding = "<p align='right'>\
                         <a href='javascript: location.reload();'>\
                         <i>Comenzar de nuevo</i></a>.";
                         
function endGame(won, pic, msg)
{
    const dvCmds = document.getElementById( "dvCmds" );
    
    if ( dvCmds != null ) {
        dvCmds.style.display = "none";
    }
    
    msg += "<p>Logros:<br/>" + ctrl.logros.completadosComoTexto() + "</p>";
    
    if ( won ) {
        msg += "<br/>" + htmlRestartAmusingEnding;
    } else {
        msg += "<br/>" + htmlRestartEnding;
    }
    
    ctrl.endGame( msg, pic );
}

// **************************************************************** Puncture --
ctrl.addDaemon( "puncture",
                function() {
                    if ( locBoat.puncture ) {
                        if ( ctrl.getTurns() > 22 ) {
                            endGame( false,
                                    "res/sea.jpg",
                                    "Contemplas con pavor como el agua \
                                    inunda el bote...</p><p>\
                                    El bote se hunde, mientras tú, \
                                    braceando y escupiendo agua, \
                                    te quedas en la superficie... \
                                    </p><p>Sabes que tus posibilidades \
                                    de supervivencia son mínimas. \
                                    </p><p>Tus horas están contadas." );
                        }
                        else
                        if ( ctrl.getTurns() > 17 ) {
                            ctrl.print( "<i>La lancha se deshincha \
                                        rápidamente, ya apenas se sustenta \
                                        sobre el agua...</i>" );
                        }
                        else
                        if ( ctrl.getTurns() > 12 ) {
                            ctrl.print( "<i>Un siseo te advierte \
                                         de que la lancha se deshincha...</i>" );
                        }
                        else
                        if ( ctrl.getTurns() > 9 ) {
                            ctrl.places.doDesc();
                        }
                    }
                });


// ************************************************************* Environment --
const ambientationMsgList = new MsgList(
    [ "<i>El mar golpea el bote, a veces con violencia...</i>",
       "<i>Una ola te empapa al golpear fuertemente el bote...</i>",
       "<i>El sol se esconde brevemente entre unas nubes, y sientes frío...</i>",
       "<i>Te agarras al bote por un repentino movimiento del mar.</i>"],
    true );

ctrl.addDaemon( "environment",
                function() {
                    if ( ctrl.getTurns() % 3 == 0) {
                        ctrl.print( ambientationMsgList.nextMsg() );
                    }
                });


ctrl.personas.changePlayer( player );
ctrl.places.setStart( locBoat );
