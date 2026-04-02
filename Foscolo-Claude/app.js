/* ============================================================
   FOSCOLO PWA – app.js
   ============================================================ */

/* ── DATA ─────────────────────────────────────────────────── */

const LESSONS = [
  {
    id: 'biografia',
    icon: '🗺',
    title: 'Biografia Essenziale',
    intro: 'La vita di Foscolo tra esilio, rivoluzione e poesia.',
    sections: [
      {
        title: 'Origini e formazione',
        html: `
          <p>Ugo Foscolo (nato <strong>Niccolò Foscolo</strong>) nasce il <strong>6 febbraio 1778 a Zante (Zacinto)</strong>, isola greca allora sotto il dominio della Repubblica di Venezia. Suo padre, Andrea Foscolo, era medico di origine veneziana; la madre, Diamantina Spathis, era greca. È primogenito: i due fratelli maschi moriranno entrambi suicidi.</p>
          <p>Dopo l'infanzia a Zante e un soggiorno in Dalmazia, si trasferisce a <strong>Venezia nel 1792</strong>, dove inizia la sua formazione frequentando scuole e salotti letterari. Si avvicina subito agli ambienti illuministi e giacobini.</p>
        `
      },
      {
        title: 'Gli anni della formazione politica e letteraria',
        html: `
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-year">1797</div>
              <p>Debutta con la tragedia <em>Tieste</em>, influenzata da Vittorio Alfieri. Si schiera con gli ideali della Rivoluzione Francese.</p>
            </div>
            <div class="timeline-item">
              <div class="timeline-year">1798–1802</div>
              <p>Pubblica le <strong>Ultime lettere di Jacopo Ortis</strong> (edizione definitiva 1816), romanzo della disillusione post-rivoluzionaria.</p>
            </div>
            <div class="timeline-item">
              <div class="timeline-year">1807</div>
              <p>Compone il carme <strong>Dei Sepolcri</strong>, risposta all'Editto di Saint-Cloud, manifesto della memoria civile.</p>
            </div>
            <div class="timeline-item">
              <div class="timeline-year">1812–1822</div>
              <p>Lavora al carme incompiuto <strong>Le Grazie</strong>, visione dell'arte come nuova religione laica.</p>
            </div>
            <div class="timeline-item">
              <div class="timeline-year">1815</div>
              <p>Per le sue idee deve lasciare l'Italia. Si rifugia in Svizzera, poi a <strong>Londra</strong>, dove trascorre gli ultimi anni in difficoltà, insegnando e collaborando con giornali.</p>
            </div>
            <div class="timeline-item">
              <div class="timeline-year">1827</div>
              <p>Muore a Londra il <strong>10 settembre 1827</strong>.</p>
            </div>
          </div>
        `
      },
      {
        title: 'Il profilo storico-letterario',
        html: `
          <p>Foscolo è considerato uno dei grandi poeti italiani: <strong>ponte tra Neoclassicismo e Romanticismo</strong>, interprete delle passioni individuali e dei destini collettivi dell'Italia moderna.</p>
          <div class="concept-box">
            "Costretto all'esilio dopo la caduta della Repubblica di Venezia e le delusioni politiche, viaggia tra Milano, Firenze, Bologna — e nella scrittura trova l'unico esilio che non tradisce."
            <cite>— sintesi biografica</cite>
          </div>
        `
      }
    ],
    vocabulary: [
      { term: 'Trattato di Campoformio (1797)', def: 'Accordo firmato da Napoleone con l\'Austria, che cedette Venezia all\'Austria ponendo fine alla Repubblica di Venezia. Per Foscolo simboleggia il tradimento degli ideali di libertà e patria da parte della politica.' },
      { term: 'Editto di Saint-Cloud (1804)', def: 'Decreto napoleonico che imponeva le sepolture fuori dai centri abitati e limitava le iscrizioni sulle tombe. Fu il catalizzatore della riflessione di Foscolo sulla funzione etica e civile dei sepolcri.' },
      { term: 'Romanzo epistolare', def: 'Genere letterario in cui la storia è raccontata attraverso lettere tra personaggi. Permette narrazione soggettiva e intima — come nell\'Ortis, dove Jacopo scrive all\'amico Lorenzo.' }
    ]
  },

  {
    id: 'poetica',
    icon: '⚙',
    title: 'Poetica: Ragione e Illusioni',
    intro: 'Il meccanicismo, il nulla eterno e la risposta foscoliana: la religione delle illusioni.',
    sections: [
      {
        title: 'La visione filosofica: il meccanicismo',
        html: `
          <p>Foscolo parte da una certezza radicale: <strong>non esiste Dio, non esiste un aldilà</strong>. L'uomo è pura materia destinata al nulla. La natura opera secondo leggi impersonali e meccaniche — universo privo di scopo divino.</p>
          <p>Questa visione, derivata dall'<strong>Illuminismo materialista</strong>, genera una profonda <em>angoscia cosmica</em>: se tutto finisce, che senso ha vivere?</p>
          <div class="concept-cols">
            <div class="concept-col">
              <div class="concept-col-title">Elemento positivo</div>
              <p>Libera dalle superstizioni. Nessuna dannazione eterna, nessun timore del giudizio divino.</p>
            </div>
            <div class="concept-col">
              <div class="concept-col-title">Elemento negativo</div>
              <p>La vita inizia e finisce sulla terra: senza scopo metafisico, l'esistenza umana perde fondamento.</p>
            </div>
          </div>
        `
      },
      {
        title: 'La risposta: la religione delle illusioni',
        html: `
          <p>Per superare questa frattura, Foscolo elabora la sua risposta più originale: la <strong>"religione delle illusioni"</strong>. Poiché la natura non offre consolazione, è l'uomo stesso — attraverso la propria coscienza — a costruire valori che diano senso.</p>
          <div class="concept-box">
            Le illusioni necessarie non sono inganni: sono <em>costruzioni poetiche e morali</em> "vere" nel senso che permettono di resistere alla verità del nulla e di dare un significato all'esistenza.
          </div>
          <p>Queste <strong>illusioni necessarie</strong> sono: <em>amore, patria, bellezza, poesia, memoria</em>. Sono un atto di fede laica — un sistema di valori non fondato su un Dio, ma sull'arte e sull'ingegno umano per conferire una forma di <strong>eternità ideale</strong> contro l'oblio.</p>
        `
      },
      {
        title: 'La parola poetica come strumento salvifico',
        html: `
          <p>Se tutto è destinato al nulla, solo l'arte — intesa come <strong>sepolcro simbolico</strong> — può conservare la memoria e il senso umano. La poesia si oppone all'oblio trasformando il fugace in permanente.</p>
          <p>Foscolo è, in sintesi, <em>il poeta del disincanto che lotta per lasciare un segno</em>: pur abbracciando la dura verità del nulla, usa la parola come unica eternità possibile.</p>
          <div class="concept-box">
            "Quando tutto sembra cenere, è la parola del poeta che può ancora brillare come una stella, garantendo un'eterna sopravvivenza all'umano."
          </div>
        `
      }
    ],
    vocabulary: [
      { term: 'Meccanicismo', def: 'Visione filosofica che concepisce l\'universo come una macchina regolata da leggi fisiche, senza intervento divino o finalità spirituali. Tutto è materia in movimento.' },
      { term: 'Nulla eterno', def: 'La convinzione, derivante dal meccanicismo, che dopo la morte non esista alcuna forma di esistenza, anima o aldilà. Tutto si estingue definitivamente.' },
      { term: 'Dolore filosofico / Angoscia cosmica', def: 'Lo stato di sofferenza interiore che deriva dalla consapevolezza della finitudine umana e dell\'indifferenza dell\'universo. È l\'angoscia generata dal "nulla eterno".' },
      { term: 'Religione delle illusioni', def: 'La risposta di Foscolo all\'angoscia del nulla. L\'uomo crea autonomamente valori laici come amore, patria, bellezza, poesia e memoria — non inganni, ma costruzioni necessarie che danno senso e permettono una forma di "eternità ideale".' },
      { term: 'Illusioni necessarie', def: 'I valori (amore, patria, bellezza, poesia, memoria) che l\'uomo costruisce per dare un senso alla propria esistenza di fronte al nulla. Sono "necessarie" perché essenziali alla sopravvivenza spirituale e psicologica dell\'individuo.' },
      { term: 'Sepolcro simbolico', def: 'Il ruolo attribuito da Foscolo all\'arte e alla poesia. L\'opera d\'arte diventa il luogo in cui la memoria e i valori vengono custoditi e tramandati attraverso i secoli, vincendo l\'oblio.' }
    ]
  },

  {
    id: 'neoclassicismo',
    icon: '⚖',
    title: 'Neoclassicismo e Preromanticismo',
    intro: 'Le due anime di un\'epoca — e di Foscolo.',
    sections: [
      {
        title: 'Il contesto storico-culturale',
        html: `
          <p>La fine del Settecento e l'inizio dell'Ottocento, segnati da rivoluzioni e sconvolgimenti, sono un crocevia di sensibilità culturali. Neoclassicismo e Preromanticismo, pur distinti, spesso coesistono, riflettendo la profonda tensione tra <strong>ragione e sentimento, ordine e inquietudine</strong>.</p>
        `
      },
      {
        title: 'Neoclassicismo: Bellezza, Ordine, Armonia',
        html: `
          <p>Il Neoclassicismo guarda alla classicità greco-romana come modello assoluto di perfezione. L'ideale è la ricerca di <strong>equilibrio, ordine, razionalità e bellezza formale</strong>. Non è solo estetica, ma anche etica: l'arte diventa un baluardo contro il caos.</p>
          <p>Temi: mito, eroismo, senso di patria — espressi con perfezione formale, metriche classiche (endecasillabo). Un "tempio ideale" dove <em>la forma salva dall'angoscia del mondo</em>.</p>
        `
      },
      {
        title: 'Preromanticismo: Sentimento, Turbamento, Infinito',
        html: `
          <p>In antitesi al razionalismo illuminista, il Preromanticismo anticipa il Romanticismo vero e proprio. Si focalizza su <strong>sensibilità individuale, immaginazione, malinconia e mistero</strong>. La natura non è più armonica, ma paesaggio selvaggio e tempestoso, specchio dell'animo.</p>
          <p>Temi dominanti: dolore, morte, esilio, amore infelice, tensione verso l'assoluto — espressi con linguaggio più emotivo.</p>
        `
      },
      {
        title: 'Foscolo: La Sintesi della Crisi Moderna',
        html: `
          <p>Foscolo incarna la complessità di questa epoca, essendo lui stesso un <strong>ponte tra le due visioni</strong>.</p>
          <div class="concept-cols">
            <div class="concept-col">
              <div class="concept-col-title">Foscolo Neoclassico</div>
              <p>Bellezza e forma artistica possono immortalare. Di fronte al nulla, cerca salvezza nell'armonia e nella misura. Esempi: <em>All'amica risanata</em>, <em>Le Grazie</em>.</p>
            </div>
            <div class="concept-col">
              <div class="concept-col-title">Foscolo Preromantico</div>
              <p>La consapevolezza che siano pur sempre "illusioni" riemerge: domina il dolore, l'inquietudine che nessuna forma può placare. Esempio: <em>Jacopo Ortis</em>.</p>
            </div>
          </div>
          <div class="concept-box">
            Foscolo è il poeta che incarna la crisi dell'uomo moderno: in lui convivono l'anelito neoclassico all'ordine come rifugio e la vertigine preromantica dinanzi all'abisso del nulla.
          </div>
        `
      }
    ],
    vocabulary: [
      { term: 'Neoclassicismo', def: 'Corrente culturale (fine XVIII – inizio XIX sec.) che si ispira all\'antichità greco-romana. Cerca equilibrio, ordine, razionalità e perfezione formale come modelli di bellezza e comportamento etico. La forma è vista come rifugio contro il caos.' },
      { term: 'Preromanticismo', def: 'Movimento culturale che precede il Romanticismo (fine XVIII sec.). Reazione al razionalismo illuminista; si concentra su sensibilità individuale, sentimento, malinconia, mistero e inquietudine. La natura riflette il tormento interiore.' },
      { term: 'Doppia tensione', def: 'La coesistenza e il conflitto in Foscolo di due sensibilità opposte: aspetti neoclassici (ricerca di ordine, forma, armonia) e preromantici (inquietudine, passione, angoscia del nulla).' },
      { term: 'Forma (che salva dall\'angoscia)', def: 'Nel contesto neoclassico foscoliano, la ricerca della perfezione stilistica. La bellezza e l\'armonia della forma sono un modo per dare ordine al caos esistenziale e per eternare i valori umani.' }
    ]
  },

  {
    id: 'ortis',
    icon: '✉',
    title: 'Le ultime lettere di Jacopo Ortis',
    intro: 'Il romanzo della disillusione moderna — il primo eroe tragico italiano.',
    sections: [
      {
        title: 'L\'opera e il contesto',
        html: `
          <p>Le <em>Ultime lettere di Jacopo Ortis</em> (forma definitiva 1802) è il <strong>primo vero romanzo moderno italiano</strong>, calato nel contesto post-rivoluzionario e napoleonico: un'epoca di grandi speranze tradite.</p>
          <p>Foscolo, che visse in prima persona il fallimento degli ideali giacobini, fa di Jacopo il <strong>simbolo di un'intera generazione di giovani idealisti traditi</strong>.</p>
        `
      },
      {
        title: 'Struttura e trama',
        html: `
          <p>L'opera è un <strong>romanzo epistolare</strong>: le lettere intime di Jacopo all'amico Lorenzo. Foscolo innova il genere unendo profonda introspezione psicologica a riflessione politica e storica.</p>
          <p>La trama segue Jacopo Ortis, giovane patriota deluso dal Trattato di Campoformio, rifugiato sui Colli Euganei. Qui si innamora di <strong>Teresa</strong>, amore sublime ma impossibile (lei è promessa a Odoardo). Parallelamente si confronta con la decadenza dell'Italia, intraprende un viaggio che lo porta a incontrare figure come <strong>Parini</strong>.</p>
          <p>Il culmine è il <strong>suicidio</strong>, gesto meditato: estrema affermazione di libertà di fronte a un mondo inautentico.</p>
        `
      },
      {
        title: 'Il crollo delle illusioni',
        html: `
          <p>Jacopo incarna la visione foscoliana del nulla eterno. Le illusioni crollano una dopo l'altra:</p>
          <table class="comparison-table">
            <thead><tr><th>Illusione</th><th>Come crolla</th></tr></thead>
            <tbody>
              <tr><td>La patria</td><td>Venduta e oppressa, tradita dalla politica napoleonica</td></tr>
              <tr><td>L'amore (Teresa)</td><td>Infranto dalle convenzioni sociali</td></tr>
              <tr><td>La libertà</td><td>Tradita dal potere</td></tr>
              <tr><td>La poesia e la famiglia</td><td>Non bastano a consolare</td></tr>
            </tbody>
          </table>
          <p>Di fronte a questo fallimento universale, a Jacopo resta solo la <em>verità tragica</em>: il suicidio come atto di dignità per chi rifiuta di vivere senza verità.</p>
        `
      },
      {
        title: 'Il dialogo con Parini',
        html: `
          <p>Un momento cruciale è l'incontro di Jacopo con il vecchio poeta <strong>Parini a Milano</strong> — dialogo tra due generazioni e due visioni:</p>
          <table class="comparison-table">
            <thead><tr><th></th><th>Parini</th><th>Jacopo</th></tr></thead>
            <tbody>
              <tr><td>Atteggiamento</td><td>Lucida amarezza, disincanto illuminista</td><td>Ardore passionale, spirito preromantico</td></tr>
              <tr><td>Sulla rivoluzione</td><td>Scetticismo maturo: degenera in tirannide</td><td>Speranza iniziale, poi delusione</td></tr>
              <tr><td>Ruolo dell'intellettuale</td><td>Educare, mantenere dignità e misura</td><td>Sacrificio per la patria</td></tr>
            </tbody>
          </table>
          <p>L'incontro non porta a conciliazione, ma rafforza in Jacopo la consapevolezza della <strong>frattura insanabile tra ideale e realtà</strong>.</p>
        `
      }
    ],
    vocabulary: [
      { term: '"Io moderno"', def: 'Riferito a Jacopo: figura letteraria complessa e innovativa, personaggio tormentato diviso tra ideali e cruda realtà, che incarna la crisi dell\'individuo nella modernità.' },
      { term: 'Frattura insanabile tra ideale e realtà', def: 'Il conflitto irrisolvibile tra i nobili principi di Jacopo e la dura realtà esterna. Questa dicotomia è la causa principale della sua sofferenza e del suo epilogo.' },
      { term: 'Eroe tragico moderno', def: 'Jacopo non è un vincitore. È un personaggio che affronta consapevolmente la propria sconfitta e il crollo dei suoi ideali, rendendosi profondamente umano nella sua disperazione.' },
      { term: 'Illusioni (fallimento delle)', def: 'Per Foscolo le illusioni (amore, patria, libertà, poesia) sono costrutti umani necessari per dare senso alla vita. Nel romanzo, Jacopo sperimenta il loro progressivo e tragico fallimento.' }
    ]
  },

  {
    id: 'sepolcri',
    icon: '🏛',
    title: 'Sepolcri, Grazie e Sonetti',
    intro: 'L\'eternità della parola: come Foscolo costruisce una religione laica dell\'arte.',
    sections: [
      {
        title: 'Dei Sepolcri: La Memoria Civilizzatrice',
        html: `
          <p>Composto nel <strong>1806</strong>, <em>Dei Sepolcri</em> è un carme in endecasillabi sciolti, nato dalla riflessione sull'<strong>Editto di Saint-Cloud (1804)</strong>, che negava il valore simbolico delle tombe.</p>
          <p>Foscolo difende la funzione civile e affettiva dei sepolcri: la tomba <strong>non serve al morto, ma ai vivi</strong>. Diventa un luogo che custodisce memoria e ispira virtù civili e patriottismo.</p>
          <div class="concept-box">
            "A egregie cose il forte animo accendono / l'urne de' forti" — i sepolcri di Machiavelli, Michelangelo e Galileo a Firenze diventano simboli della gloria nazionale.
          </div>
          <p>Il carme eleva la poesia a <strong>strumento supremo capace di perpetuare la memoria</strong> anche quando le tombe materiali saranno distrutte.</p>
        `
      },
      {
        title: 'Le Grazie: L\'Arte come Nuova Religione',
        html: `
          <p>Nel carme <strong>incompiuto</strong> <em>Le Grazie</em>, Foscolo propone l'arte come unica salvezza di fronte alla condanna della natura al dolore e alla morte.</p>
          <p>Le Grazie — <em>Aglaia, Eufrosine, Talia</em> — sono invocate come simboli della bellezza spirituale e morale con il potere di <strong>trasformare la barbarie in civiltà</strong>, di addolcire i costumi e di umanizzare il vivere.</p>
          <p>L'opera è un manifesto della "religione delle illusioni": l'arte, attraverso l'armonia e la virtù, fonda una <strong>nuova religione laica</strong> capace di purificare, consolare ed elevare lo spirito.</p>
        `
      },
      {
        title: 'I Sonetti: Dolore Personale e Consolazione Poetica',
        html: `
          <p>I sonetti di Foscolo — <em>In morte del fratello Giovanni</em>, <em>Alla sera</em>, <em>A Zacinto</em> — sono concentrati di pensiero e dolore che riflettono la sua doppia anima: <strong>neoclassica nella forma, preromantica nell'inquietudine</strong>.</p>
          <p>Temi intrecciati:</p>
          <div class="info-box">
            <div class="info-box-title">I tre nuclei tematici</div>
            <p><strong>1. Dolore personale</strong> — morte, esilio, nostalgia della patria.</p>
            <p><strong>2. Il nulla eterno</strong> — permea ogni verso.</p>
            <p><strong>3. La memoria</strong> — unica forma di sopravvivenza: memoria materna, della terra natia.</p>
          </div>
          <p>Il sonetto diventa un <em>"piccolo tempio costruito con parole eterne"</em>: il tormento personale si sublima in bellezza e armonia formale.</p>
        `
      }
    ],
    vocabulary: [
      { term: 'Funzione civile dei sepolcri', def: 'L\'idea che le tombe e il ricordo dei defunti non servano ai morti, ma ai vivi. I sepolcri di uomini illustri ispirano virtù, patriottismo e senso civico, fungendo da esempio morale.' },
      { term: 'Memoria', def: 'Uno dei pilastri della "religione delle illusioni". La capacità di ricordare e tramandare il valore e le opere di chi non c\'è più. Custodita dall\'arte, è l\'unica forma di immortalità possibile.' },
      { term: 'Religione laica dell\'arte', def: 'Il concetto che l\'arte (poesia, bellezza, scultura) possa fondare un sistema di valori e consolazioni per l\'uomo moderno, orfano di fede e patria. Una forma di "religione delle illusioni" consapevole del nulla.' },
      { term: 'Bellezza (salvifica)', def: 'Per Foscolo, la bellezza non è solo estetica. È una forza etica e morale capace di civilizzare l\'uomo, addolcire i costumi, purificare lo spirito e resistere alla brutalità del mondo.' }
    ]
  },

  {
    id: 'alla-sera',
    icon: '🌒',
    title: '"Alla sera"',
    intro: 'Analisi completa del sonetto: testo, parafrasi, commento filosofico.',
    sections: [
      {
        title: 'Testo originale e parafrasi',
        html: `
          <div class="poem-container">
            <div class="poem-block">
              <div class="poem-block-label">Testo originale (1803)</div>
              <div class="poem-text">Forse perché della fatal quïete
tu sei l'imago, a me sì cara vieni,
o sera! E quando ti corteggian liete
le nubi estive e i zeffiri sereni,

E quando dal nevoso aere inquïete
tenebre e lunghe all'universo meni,
sempre scendi invocata, e le secrete
vie del mio cor soavemente tieni.

Vagar mi fai co' miei pensier su l'orme
che vanno al nulla eterno; e intanto fugge
questo reo tempo, e van con lui le torme

delle cure onde meco egli si strugge:
e mentre guardo la tua pace, dorme
quello spirto guerrier ch'entro mi rugge.</div>
            </div>
            <div class="poem-block">
              <div class="poem-block-label">Parafrasi</div>
              <div class="poem-paraphrase">Forse perché sei immagine della morte inevitabile,
tu, sera, mi sei tanto cara,
e ti amo sia quando vieni accompagnata
dalle nuvole estive e dai venti sereni,

sia quando porti sull'universo
le lunghe e agitate tenebre invernali,
sempre arrivi come se ti avessi chiamata,
e dolcemente percorri i sentieri nascosti del mio cuore.

Mi fai vagare con i miei pensieri
sulle tracce che conducono verso il nulla eterno;
e intanto scorre via questo tempo colpevole,

portandosi dietro le preoccupazioni
con cui si consuma insieme a me:
e mentre contemplo la tua pace,
si calma quello spirito battagliero che dentro di me ruggisce.</div>
            </div>
          </div>
        `
      },
      {
        title: 'Il contesto: filosofia e poetica',
        html: `
          <p>Foscolo concepisce l'universo come privo di senso metafisico. Tutto ciò che esiste è materia in trasformazione, destinata al nulla. Non c'è aldilà, non c'è resurrezione: la morte è la <strong>"fatal quiete"</strong>, il destino inevitabile.</p>
          <p>Foscolo sa però che la <em>verità del nulla è insopportabile</em>. Per questo elabora la sua "religione delle illusioni": anche la morte, se trasformata in immagine poetica, può diventare accettabile. <em>Alla sera</em> è un esempio altissimo di questa dinamica: la morte non è temuta, ma <strong>invocata</strong>.</p>
        `
      },
      {
        title: 'Analisi del sonetto',
        html: `
          <p>La sera, personificata, è invocata con dolcezza — <strong>amata perché è immagine della morte</strong>, ma di una morte che porta pace. Le immagini naturali (nubi, venti, gelo, tenebre) costruiscono un'atmosfera avvolgente.</p>
          <div class="concept-box">
            <strong>"Vagar mi fai co' miei pensier su l'orme / che vanno al nulla eterno"</strong> — i pensieri seguono le tracce che portano verso la morte, quasi un percorso meditativo accettato.
          </div>
          <p>Il <strong>"reo tempo"</strong> — la vita carica di colpa e sofferenza — fugge portando con sé le preoccupazioni. Solo nella contemplazione della pace serale si calma il <em>"spirto guerrier ch'entro mi rugge"</em>: metafora potentissima del tormento interiore.</p>
          <p>Questa <em>quiete</em> non è resa — è il momento in cui la poesia trasforma l'angoscia in bellezza.</p>
        `
      },
      {
        title: 'Perché è esemplare della poetica foscoliana',
        html: `
          <p><em>Alla sera</em> è una sintesi perfetta di tutto Foscolo: unisce <strong>filosofia del nulla</strong> (meccanicismo, nulla eterno), <strong>tensione preromantica</strong> (il tormento dello spirito guerriero) e <strong>armonia classica</strong> (la forma impeccabile del sonetto) in una lirica di straordinaria profondità.</p>
          <div class="concept-cols">
            <div class="concept-col">
              <div class="concept-col-title">Livello filosofico</div>
              <p>La morte non è negata né temuta: è razionalmente accettata come il nulla eterno a cui tutto tende.</p>
            </div>
            <div class="concept-col">
              <div class="concept-col-title">Livello poetico</div>
              <p>L'illusione trasforma la "fatal quiete" in presenza soave: la poesia rende accettabile ciò che la ragione riconosce come nulla.</p>
            </div>
          </div>
        `
      }
    ],
    vocabulary: [
      { term: 'Fatal quiete', def: 'Immagine della morte nel sonetto. "Fatale" non nel senso di terribile, ma nel senso di inevitabile — ciò a cui il destino conduce. La morte come necessità naturale, non come punizione.' },
      { term: 'Spirto guerrier', def: 'La metafora del tormento interiore di Foscolo: lo spirito combattivo, inquieto, incapace di accettare il compromesso, che "rugge" dentro di lui. Si calma solo nella contemplazione della sera.' },
      { term: 'Reo tempo', def: 'La vita, definita "colpevole" (reo) perché carica di preoccupazioni e sofferenze. Il tempo che fugge portandosi via i dolori è, paradossalmente, la forma di consolazione che la sera offre.' },
      { term: 'Nulla eterno (nel sonetto)', def: 'Le "orme che vanno al nulla eterno" — i pensieri che, nella contemplazione serale, si avviano verso la morte. Il nulla non è qui angosciante, ma pacificante: la poesia lo trasforma in quiete.' }
    ]
  },

  {
    id: 'scheda',
    icon: '📋',
    title: 'Scheda Didattica',
    intro: 'Cinque punti fondamentali per capire Foscolo. Sintesi della poetica.',
    sections: [
      {
        title: '1. Un poeta filosofo dell\'assenza',
        html: `
          <p>Foscolo parte da una certezza radicale: non esiste Dio, non esiste un aldilà, l'uomo è materia destinata al nulla. Questa consapevolezza genera una profonda <strong>angoscia cosmica</strong>: se tutto finisce, che senso ha vivere?</p>
        `
      },
      {
        title: '2. La religione delle illusioni',
        html: `
          <p>Per resistere al vuoto, l'uomo crea da sé valori che diano un senso all'esistenza. Foscolo li chiama <strong>illusioni necessarie</strong>:</p>
          <p style="text-align:center; font-style:italic; font-size:1.1rem; color: var(--gold); margin: 1rem 0;">amore · patria · bellezza · poesia · memoria</p>
          <p>Questi ideali non sono "veri" in senso religioso, ma sono veri <em>perché aiutano a vivere</em>.</p>
        `
      },
      {
        title: '3. La poesia come sepolcro simbolico',
        html: `
          <p>La poesia è lo strumento che <strong>conserva la memoria e rende immortali i valori umani</strong>. È come un sepolcro simbolico: protegge ciò che conta dalla morte e dall'oblio.</p>
          <p>Nei <em>Sepolcri</em>, Foscolo mostra che le tombe servono ai vivi, non ai morti: sono fonte di ispirazione civile e morale.</p>
        `
      },
      {
        title: '4. Due anime: Neoclassico e Preromantico',
        html: `
          <p>Foscolo vive una <strong>doppia tensione</strong>:</p>
          <table class="comparison-table">
            <thead><tr><th>Anima Neoclassica</th><th>Anima Preromantica</th></tr></thead>
            <tbody>
              <tr><td>Ama la forma, l'armonia, la bellezza che dà ordine al caos</td><td>È inquieto, tormentato, attratto dall'infinito e dal dolore</td></tr>
              <tr><td>La forma salva dall'angoscia</td><td>L'inquietudine è ineliminabile</td></tr>
              <tr><td><em>Le Grazie</em>, <em>All'amica risanata</em></td><td><em>Jacopo Ortis</em>, <em>Alla sera</em></td></tr>
            </tbody>
          </table>
          <p>Questa dualità rende la sua poesia potente e moderna: <em>equilibrio formale e abisso interiore convivono</em>.</p>
        `
      },
      {
        title: '5. Il poeta come eroe moderno',
        html: `
          <p>Foscolo non è un evasore, ma un <strong>combattente del pensiero</strong>. Il poeta diventa un eroe laico: sa che tutto finisce, ma scrive per lasciare un segno, per salvare almeno le parole, per <em>resistere al nulla</em>.</p>
          <div class="concept-box">
            Materialismo e meccanicismo → Nulla eterno → Religione delle illusioni → Poesia salvifica → Memoria come sopravvivenza → Arte come nuova religione laica.
          </div>
        `
      }
    ],
    vocabulary: []
  }
];

/* ── QUIZ DATA ─────────────────────────────────────────────── */

const QUIZ = [
  {
    q: 'Dove e quando nasce Ugo Foscolo?',
    options: ['A Venezia, nel 1765', 'A Zante (Zacinto), nel 1778', 'A Milano, nel 1780', 'A Firenze, nel 1772'],
    correct: 1,
    feedback: 'Foscolo nasce il 6 febbraio 1778 a Zante (Zacinto), isola greca allora sotto il dominio della Repubblica di Venezia.'
  },
  {
    q: 'Cosa intende Foscolo per "religione delle illusioni"?',
    options: [
      'La fede cattolica riformata in chiave illuminista',
      'La costruzione consapevole di valori come amore, patria, poesia, memoria che danno senso alla vita',
      'L\'illusione che la morte non esista',
      'Il culto della bellezza classica come religione pagana'
    ],
    correct: 1,
    feedback: 'La "religione delle illusioni" non è inganno: è una costruzione consapevole di valori laici (amore, patria, bellezza, poesia, memoria) che, pur non essendo fondati su verità metafisiche, aiutano l\'uomo a vivere con dignità.'
  },
  {
    q: 'Quale visione filosofica è alla base della poetica foscoliana?',
    options: ['Il platonismo', 'Il meccanicismo materialista: l\'universo è regolato da leggi fisiche senza intervento divino', 'Il deismo cristiano', 'Lo stoicismo antico'],
    correct: 1,
    feedback: 'Foscolo è materialista: concepisce l\'universo come una macchina regolata da leggi fisiche. L\'uomo è pura materia destinata al nulla dopo la morte — da qui l\'angoscia cosmica.'
  },
  {
    q: 'Perché Foscolo scrive "Dei Sepolcri"?',
    options: [
      'Per commemorare la morte di Napoleone',
      'In risposta all\'Editto di Saint-Cloud (1804), che svalutava le tombe e il loro valore simbolico',
      'Per celebrare i caduti della Rivoluzione Francese',
      'Per rivaleggiare con la poesia funebre inglese'
    ],
    correct: 1,
    feedback: 'L\'Editto di Saint-Cloud (1804) imponeva sepolture fuori dai centri abitati e limitava le iscrizioni. Foscolo risponde difendendo il valore civile e affettivo dei sepolcri: non servono ai morti, ma ai vivi.'
  },
  {
    q: 'Che tipo di opera è "Le ultime lettere di Jacopo Ortis"?',
    options: [
      'Un poema epico in ottave',
      'Un romanzo epistolare — il primo "io moderno" in crisi nella letteratura italiana',
      'Una tragedia in cinque atti',
      'Un trattato filosofico in forma dialogica'
    ],
    correct: 1,
    feedback: 'L\'Ortis è il primo vero romanzo moderno italiano: un romanzo epistolare (lettere di Jacopo all\'amico Lorenzo) che unisce introspezione psicologica e riflessione politica.'
  },
  {
    q: 'Cosa rappresenta la "fatal quiete" nel sonetto "Alla sera"?',
    options: [
      'Il tramonto come momento di preghiera',
      'La morte, vista come pace inevitabile e non come terrore',
      'La fine della giornata lavorativa',
      'La quiete della natura prima della tempesta'
    ],
    correct: 1,
    feedback: '"Fatal quiete" = morte inevitabile (fatale). La sera ne è immagine: non è temuta, ma invocata, perché solo essa può calmare lo "spirto guerrier" — il tormento interiore di Foscolo.'
  },
  {
    q: 'Quali due anime convivono in Foscolo?',
    options: [
      'Romantica e Barocca',
      'Neoclassica (armonia, forma) e Preromantica (inquietudine, dolore, tensione verso l\'assoluto)',
      'Illuminista e Cristiana',
      'Classica e Moderna'
    ],
    correct: 1,
    feedback: 'La "doppia tensione" foscoliana: l\'anima neoclassica cerca ordine, armonia e perfezione formale; l\'anima preromantica è segnata da inquietudine, dolore esistenziale e un profondo bisogno di assoluto.'
  },
  {
    q: 'Perché Jacopo Ortis si suicida?',
    options: [
      'Per delusione amorosa soltanto',
      'Perché ha perso ogni illusione — politica, amorosa, esistenziale — e sceglie il suicidio come atto estremo di libertà e coerenza',
      'Per sfuggire alla prigione austriaca',
      'Per motivi economici'
    ],
    correct: 1,
    feedback: 'Il suicidio di Jacopo è un gesto meditato: non è solo delusione amorosa o politica, ma la conseguenza del crollo di tutte le illusioni. È l\'estrema affermazione di libertà di chi rifiuta di vivere senza verità.'
  },
  {
    q: 'Cosa simboleggiano le Grazie nell\'opera omonima di Foscolo?',
    options: [
      'Le tre fidanzate di Foscolo',
      'La bellezza spirituale e morale capace di trasformare la barbarie in civiltà, fondando una nuova religione laica dell\'arte',
      'Le tre Muse classiche della poesia epica',
      'Tre virtù teologali reinterpretate in chiave pagana'
    ],
    correct: 1,
    feedback: 'Le Grazie (Aglaia, Eufrosine, Talia) simboleggiano la bellezza spirituale e morale. La loro forza è trasformare la barbarie in civiltà, umanizzare il vivere: arte come nuova religione laica.'
  },
  {
    q: 'Cosa rappresenta il "sepolcro simbolico" nella poetica foscoliana?',
    options: [
      'La tomba materiale come monumento architettonico',
      'La poesia e l\'arte che conservano la memoria e i valori umani contro il nulla eterno',
      'Il mausoleo di Napoleone come simbolo politico',
      'Il corpo stesso come involucro materiale dell\'anima'
    ],
    correct: 1,
    feedback: 'Il "sepolcro simbolico" è la poesia: l\'opera d\'arte che custodisce memoria, valori e affetti attraverso i secoli, vincendo l\'oblio. È come una tomba che non preserva il corpo, ma il significato.'
  }
];

/* ── STATE ─────────────────────────────────────────────────── */

const state = {
  completed: JSON.parse(localStorage.getItem('foscolo_completed') || '[]'),
  currentLesson: null,
  currentView: 'home',
  quizIndex: 0,
  quizScore: 0,
  quizAnswered: false,
  quizShuffled: []
};

function saveProgress() {
  localStorage.setItem('foscolo_completed', JSON.stringify(state.completed));
}

function markComplete(id) {
  if (!state.completed.includes(id)) {
    state.completed.push(id);
    saveProgress();
    updateProgressUI();
  }
}

/* ── PROGRESS ──────────────────────────────────────────────── */

function getProgress() {
  return Math.round((state.completed.length / LESSONS.length) * 100);
}

function updateProgressUI() {
  const pct = getProgress();
  // ring
  const fill = document.getElementById('progress-ring-fill');
  const circ = 2 * Math.PI * 15;
  fill.style.strokeDashoffset = circ - (circ * pct / 100);
  document.getElementById('progress-text').textContent = pct + '%';
  // bar on home
  const bar = document.getElementById('home-bar-fill');
  if (bar) bar.style.width = pct + '%';
  const label = document.getElementById('home-bar-label');
  if (label) label.textContent = state.completed.length + ' / ' + LESSONS.length + ' completate';
  // nav items
  document.querySelectorAll('#nav-list li button').forEach(btn => {
    const id = btn.dataset.id;
    const check = btn.querySelector('.nav-check');
    if (state.completed.includes(id)) {
      btn.classList.add('done');
      if (check) check.textContent = '✓';
    } else {
      btn.classList.remove('done');
      if (check) check.textContent = '';
    }
  });
  // cards
  document.querySelectorAll('.lesson-card').forEach(card => {
    const id = card.dataset.id;
    const statusEl = card.querySelector('.card-status');
    if (state.completed.includes(id)) {
      card.classList.add('done');
      if (statusEl) { statusEl.textContent = '✓ Completata'; statusEl.className = 'card-status done'; }
    } else {
      card.classList.remove('done');
      if (statusEl) { statusEl.textContent = '→ Inizia'; statusEl.className = 'card-status'; }
    }
  });
}

/* ── SIDEBAR ───────────────────────────────────────────────── */

function buildSidebar() {
  const list = document.getElementById('nav-list');
  list.innerHTML = '';
  LESSONS.forEach((l, i) => {
    const li = document.createElement('li');
    li.innerHTML = `<button data-id="${l.id}">
      <span class="nav-icon">${l.icon}</span>
      <span class="nav-label">${i + 1}. ${l.title}</span>
      <span class="nav-check"></span>
    </button>`;
    li.querySelector('button').addEventListener('click', () => {
      closeSidebar();
      showLesson(l.id);
    });
    list.appendChild(li);
  });

  // Quiz entry
  const liQuiz = document.createElement('li');
  liQuiz.innerHTML = `<button data-id="quiz" style="border-top: 1px solid var(--border-soft); margin-top: 0.5rem;">
    <span class="nav-icon">📝</span>
    <span class="nav-label">Quiz: Saperi Irrinunciabili</span>
    <span class="nav-check"></span>
  </button>`;
  liQuiz.querySelector('button').addEventListener('click', () => {
    closeSidebar();
    showQuiz();
  });
  list.appendChild(liQuiz);
}

function openSidebar() {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('overlay').classList.add('visible');
  document.getElementById('menu-toggle').classList.add('open');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('visible');
  document.getElementById('menu-toggle').classList.remove('open');
}

function setNavActive(id) {
  document.querySelectorAll('#nav-list li button').forEach(b => {
    b.classList.toggle('active', b.dataset.id === id);
  });
}

/* ── HOME VIEW ─────────────────────────────────────────────── */

function showHome() {
  state.currentView = 'home';
  state.currentLesson = null;
  setNavActive(null);

  document.getElementById('lesson-view').classList.add('hidden');
  document.getElementById('quiz-view').classList.add('hidden');
  document.getElementById('home-view').classList.remove('hidden');

  const pct = getProgress();
  const home = document.getElementById('home-view');
  home.innerHTML = `
    <div class="home-header">
      <div class="home-eyebrow">Percorso Didattico</div>
      <h1 class="home-title">Ugo Foscolo</h1>
      <p class="home-subtitle">Tra Ragione e l'Eternità delle Illusioni</p>
      <div class="progress-bar-container">
        <div class="progress-bar-label">
          <span>Progresso</span>
          <span id="home-bar-label">${state.completed.length} / ${LESSONS.length} completate</span>
        </div>
        <div class="progress-bar-track">
          <div class="progress-bar-fill" id="home-bar-fill" style="width:${pct}%"></div>
        </div>
      </div>
    </div>
    <div class="cards-grid" id="cards-grid"></div>
  `;

  const grid = document.getElementById('cards-grid');
  LESSONS.forEach((l, i) => {
    const done = state.completed.includes(l.id);
    const card = document.createElement('div');
    card.className = 'lesson-card' + (done ? ' done' : '');
    card.dataset.id = l.id;
    card.innerHTML = `
      <span class="card-icon">${l.icon}</span>
      <div class="card-number">Lezione ${i + 1}</div>
      <div class="card-title">${l.title}</div>
      <div class="card-desc">${l.intro}</div>
      <div class="card-status ${done ? 'done' : ''}">${done ? '✓ Completata' : '→ Inizia'}</div>
    `;
    card.addEventListener('click', () => showLesson(l.id));
    grid.appendChild(card);
  });

  // Quiz card
  const quizDone = state.completed.includes('quiz');
  const quizCard = document.createElement('div');
  quizCard.className = 'lesson-card' + (quizDone ? ' done' : '');
  quizCard.innerHTML = `
    <span class="card-icon">📝</span>
    <div class="card-number">Verifica finale</div>
    <div class="card-title">Quiz: Saperi Irrinunciabili</div>
    <div class="card-desc">10 domande sui concetti fondamentali del percorso.</div>
    <div class="card-status ${quizDone ? 'done' : ''}">${quizDone ? '✓ Completato' : '→ Inizia'}</div>
  `;
  quizCard.addEventListener('click', showQuiz);
  grid.appendChild(quizCard);
}

/* ── LESSON VIEW ───────────────────────────────────────────── */

function showLesson(id) {
  const lesson = LESSONS.find(l => l.id === id);
  if (!lesson) return;
  state.currentView = 'lesson';
  state.currentLesson = id;
  setNavActive(id);

  document.getElementById('home-view').classList.add('hidden');
  document.getElementById('quiz-view').classList.add('hidden');
  const view = document.getElementById('lesson-view');
  view.classList.remove('hidden');

  const idx = LESSONS.findIndex(l => l.id === id);
  const nextLesson = LESSONS[idx + 1];

  let vocabHTML = '';
  if (lesson.vocabulary && lesson.vocabulary.length > 0) {
    vocabHTML = `
      <div class="vocab-section">
        <div class="vocab-title">Vocabolario dei concetti chiave</div>
        ${lesson.vocabulary.map((v, i) => `
          <div class="vocab-item">
            <button class="vocab-trigger" data-idx="${i}">
              ${v.term}
              <span class="vocab-arrow">▼</span>
            </button>
            <div class="vocab-body" id="vocab-body-${id}-${i}">
              <div class="vocab-body-inner">${v.def}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  const isDone = state.completed.includes(id);

  view.innerHTML = `
    <div class="lesson-header">
      <div class="lesson-breadcrumb">
        <button onclick="showHome()">← Percorso</button>
        <span>/</span>
        <span>${lesson.title}</span>
      </div>
      <h1 class="lesson-title">${lesson.icon} ${lesson.title}</h1>
      <p class="lesson-intro">${lesson.intro}</p>
    </div>
    <div class="lesson-body">
      ${lesson.sections.map(s => `
        <div class="lesson-section">
          <div class="section-title">${s.title}</div>
          ${s.html}
        </div>
      `).join('')}
      ${vocabHTML}
    </div>
    <div class="lesson-footer">
      <button class="btn-complete ${isDone ? 'done' : ''}" id="btn-complete-${id}">
        ${isDone ? '✓ Già completata' : 'Segna come completata'}
      </button>
      ${nextLesson ? `<button class="btn-next" onclick="showLesson('${nextLesson.id}')">Prossima lezione: ${nextLesson.title} →</button>` : `<button class="btn-next" onclick="showQuiz()">Vai al quiz →</button>`}
    </div>
  `;

  // Complete btn
  const btn = document.getElementById(`btn-complete-${id}`);
  btn.addEventListener('click', () => {
    markComplete(id);
    btn.textContent = '✓ Già completata';
    btn.classList.add('done');
  });

  // Vocab toggles
  if (lesson.vocabulary) {
    lesson.vocabulary.forEach((_, i) => {
      const trigger = view.querySelector(`[data-idx="${i}"]`);
      const body = document.getElementById(`vocab-body-${id}-${i}`);
      if (trigger && body) {
        trigger.addEventListener('click', () => {
          const open = body.classList.toggle('open');
          trigger.classList.toggle('open', open);
        });
      }
    });
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── QUIZ VIEW ─────────────────────────────────────────────── */

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function showQuiz() {
  state.currentView = 'quiz';
  state.quizIndex = 0;
  state.quizScore = 0;
  state.quizAnswered = false;
  state.quizShuffled = shuffle(QUIZ);
  setNavActive('quiz');

  document.getElementById('home-view').classList.add('hidden');
  document.getElementById('lesson-view').classList.add('hidden');
  document.getElementById('quiz-view').classList.remove('hidden');

  renderQuizQuestion();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderQuizQuestion() {
  const view = document.getElementById('quiz-view');
  const total = state.quizShuffled.length;
  const idx = state.quizIndex;

  if (idx >= total) {
    renderQuizResult();
    return;
  }

  const q = state.quizShuffled[idx];
  const pct = Math.round((idx / total) * 100);

  view.innerHTML = `
    <div class="quiz-header">
      <div class="lesson-breadcrumb">
        <button onclick="showHome()">← Percorso</button>
        <span>/</span>
        <span>Quiz</span>
      </div>
      <h1 class="quiz-title">📝 Saperi Irrinunciabili</h1>
      <p class="quiz-subtitle">Verifica finale — Ugo Foscolo</p>
      <div class="quiz-progress-bar">
        <div class="progress-bar-track" style="margin-top:0.8rem">
          <div class="progress-bar-fill" style="width:${pct}%"></div>
        </div>
      </div>
    </div>
    <div class="quiz-question-block">
      <div class="quiz-counter">Domanda ${idx + 1} di ${total}</div>
      <div class="quiz-q">${q.q}</div>
      <div class="quiz-options" id="quiz-options">
        ${q.options.map((opt, oi) => `
          <button class="quiz-option" data-oi="${oi}">${opt}</button>
        `).join('')}
      </div>
      <div id="quiz-feedback" class="hidden"></div>
      <div id="quiz-next-wrap" class="hidden">
        <button class="btn-quiz-next" id="btn-quiz-next">
          ${idx + 1 < total ? 'Prossima domanda →' : 'Vedi il risultato →'}
        </button>
      </div>
    </div>
  `;

  // Option click handlers
  view.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => {
      if (state.quizAnswered) return;
      state.quizAnswered = true;
      const chosen = parseInt(btn.dataset.oi);
      const correct = q.correct;
      const isCorrect = chosen === correct;
      if (isCorrect) state.quizScore++;

      // Style options
      view.querySelectorAll('.quiz-option').forEach((b, i) => {
        b.disabled = true;
        if (i === correct) b.classList.add('correct');
        if (i === chosen && !isCorrect) b.classList.add('wrong');
      });

      // Feedback
      const fb = document.getElementById('quiz-feedback');
      fb.className = 'quiz-feedback ' + (isCorrect ? 'correct' : 'wrong');
      fb.innerHTML = (isCorrect ? '✓ Esatto! — ' : '✗ Non corretto. — ') + q.feedback;
      fb.classList.remove('hidden');

      document.getElementById('quiz-next-wrap').classList.remove('hidden');
    });
  });

  // Next btn
  document.getElementById('btn-quiz-next')?.addEventListener('click', () => {
    state.quizIndex++;
    state.quizAnswered = false;
    renderQuizQuestion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function renderQuizResult() {
  const view = document.getElementById('quiz-view');
  const total = state.quizShuffled.length;
  const score = state.quizScore;
  const pct = Math.round((score / total) * 100);

  let comment;
  if (pct >= 90) comment = 'Eccellente! Conosci Foscolo in modo approfondito.';
  else if (pct >= 70) comment = 'Molto bene. Ripassate qualche dettaglio e sarà perfetto.';
  else if (pct >= 50) comment = 'Sufficiente. Vale la pena rileggere le lezioni più fragili.';
  else comment = 'Riprendi il percorso: alcune lezioni meritano un secondo sguardo.';

  markComplete('quiz');

  view.innerHTML = `
    <div class="quiz-header">
      <div class="lesson-breadcrumb">
        <button onclick="showHome()">← Percorso</button>
        <span>/</span>
        <span>Risultato</span>
      </div>
      <h1 class="quiz-title">📝 Risultato</h1>
    </div>
    <div class="quiz-result">
      <div class="quiz-result-score">${score} / ${total}</div>
      <div class="quiz-result-label">${comment}</div>
      <div style="margin-bottom:1rem;color:var(--muted);font-size:0.9rem">Punteggio: ${pct}%</div>
      <button class="btn-retry" onclick="showQuiz()">Riprova il quiz</button>
      <button class="btn-retry" onclick="showHome()">Torna al percorso</button>
    </div>
  `;
}

/* ── SPLASH ────────────────────────────────────────────────── */

function initSplash() {
  document.getElementById('splash-enter').addEventListener('click', () => {
    const splash = document.getElementById('splash');
    splash.style.transition = 'opacity 0.7s ease';
    splash.style.opacity = '0';
    setTimeout(() => {
      splash.classList.add('hidden');
      document.getElementById('main').classList.remove('hidden');
      showHome();
      updateProgressUI();
    }, 700);
  });
}

/* ── INIT ──────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  // Service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(console.error);
  }

  initSplash();
  buildSidebar();
  updateProgressUI();

  // Header menu
  document.getElementById('menu-toggle').addEventListener('click', () => {
    if (document.getElementById('sidebar').classList.contains('open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  document.getElementById('sidebar-close').addEventListener('click', closeSidebar);
  document.getElementById('overlay').addEventListener('click', closeSidebar);

  // Header title → home
  document.querySelector('.header-name').addEventListener('click', showHome);
  document.querySelector('.header-name').style.cursor = 'pointer';
});
