/* ════════════════════════════════════════════════════════════
   FOSCOLO PWA v2 – app.js
   ════════════════════════════════════════════════════════════ */

/* ── LESSON DATA ── */
const LESSONS = [
  {
    id: 'biografia',
    icon: '✦',
    n: 1,
    title: 'Biografia Essenziale',
    intro: 'La vita di Foscolo tra esilio, rivoluzione e poesia.',
    heroImage: 'images/ritratto.jpg',
    heroBgPos: 'center top',
    sections: [
      {
        n: 1,
        title: 'Origini e formazione',
        html: `
          <p>Ugo Foscolo (nato <strong>Niccolò Foscolo</strong>) nasce il <strong>6 febbraio 1778 a Zante (Zacinto)</strong>, isola greca allora sotto il dominio della Repubblica di Venezia. Padre veneziano, madre greca: un'identità sospesa tra due mondi fin dalla nascita. I due fratelli maschi moriranno entrambi suicidi.</p>
          <p>Dopo l'infanzia a Zante e un soggiorno in Dalmazia, si trasferisce a <strong>Venezia nel 1792</strong>, dove inizia la sua formazione frequentando scuole e salotti letterari. Si avvicina subito agli ambienti illuministi e giacobini.</p>
        `
      },
      {
        n: 2,
        title: 'Gli anni della crisi storica',
        html: `
          <div class="timeline">
            <div class="tline-item">
              <div class="tline-year">1797</div>
              <div class="tline-text">Debutta con la tragedia <em>Tieste</em>. Si schiera con gli ideali della Rivoluzione Francese — e con quell'anno crolla la Repubblica di Venezia (Trattato di Campoformio).</div>
            </div>
            <div class="tline-item">
              <div class="tline-year">1798 – 1802</div>
              <div class="tline-text">Pubblica le <strong>Ultime lettere di Jacopo Ortis</strong> (ed. definitiva 1816), romanzo della disillusione politica e affettiva.</div>
            </div>
            <div class="tline-item">
              <div class="tline-year">1807</div>
              <div class="tline-text">Compone il carme <strong>Dei Sepolcri</strong>, risposta all'Editto di Saint-Cloud: manifesto della memoria civile e della poesia come immortalità.</div>
            </div>
            <div class="tline-item">
              <div class="tline-year">1812 – 1822</div>
              <div class="tline-text">Lavora al carme incompiuto <strong>Le Grazie</strong>: visione dell'arte come nuova religione laica capace di umanizzare il vivere.</div>
            </div>
            <div class="tline-item">
              <div class="tline-year">1815</div>
              <div class="tline-text">Lascia l'Italia per le sue idee. Svizzera, poi <strong>Londra</strong>: gli ultimi anni in difficoltà, insegnando e scrivendo.</div>
            </div>
            <div class="tline-item">
              <div class="tline-year">10 settembre 1827</div>
              <div class="tline-text">Muore a Londra. Nel 1871 le sue spoglie vengono portate a Firenze, nella Basilica di Santa Croce — tra quei sepolcri che lui stesso aveva cantato.</div>
            </div>
          </div>
        `
      },
      {
        n: 3,
        title: 'Il profilo',
        html: `
          <div class="pullquote">
            <p>Ponte tra Neoclassicismo e Romanticismo, Foscolo è interprete delle passioni individuali e dei destini collettivi dell'Italia moderna. In lui la biografia diventa poetica.</p>
          </div>
          <p>Il paradosso della sua vita: <strong>costretto all'esilio dalla storia</strong>, trova nella scrittura l'unico esilio che non tradisce. La sua esperienza personale — patria perduta, amori impossibili, morte del fratello — si trasfonde in ogni opera come carburante per la riflessione filosofica.</p>
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
    icon: '◈',
    n: 2,
    title: 'Poetica: Ragione e Illusioni',
    intro: 'Il meccanicismo, il nulla eterno e la risposta foscoliana: la religione delle illusioni.',
    heroImage: 'images/schema_poetica.jpg',
    heroBgPos: 'center center',
    sections: [
      {
        n: 1,
        title: 'Il meccanicismo: l\'universo come macchina',
        html: `
          <p>Foscolo parte da una certezza radicale mutuata dall'Illuminismo materialista: <strong>non esiste Dio, non esiste un aldilà</strong>. L'uomo è pura materia — l'universo è una macchina regolata da leggi fisiche impersonali, indifferente all'esistenza umana.</p>
          <p>Questa visione genera una profonda <em>angoscia cosmica</em>: se tutto finisce nel nulla, che senso ha vivere?</p>
          <div class="cols-2">
            <div class="col-card">
              <div class="col-card-title">Elemento positivo</div>
              <p>Libera dalle superstizioni. Nessuna dannazione eterna, nessun timore del giudizio divino. L'uomo è padrone della propria coscienza.</p>
            </div>
            <div class="col-card">
              <div class="col-card-title">Elemento negativo</div>
              <p>La vita inizia e finisce sulla terra: senza scopo metafisico, l'esistenza umana perde ogni fondamento esterno.</p>
            </div>
          </div>
        `
      },
      {
        n: 2,
        title: 'La religione delle illusioni',
        html: `
          <p>Per superare questa frattura, Foscolo elabora la sua risposta più originale. Poiché la natura non offre consolazione, è l'uomo stesso — attraverso la propria coscienza — a costruire valori che diano senso all'esistenza.</p>
          <div class="pullquote">
            <p>Le <strong>illusioni necessarie</strong> non sono inganni: sono costruzioni poetiche e morali "vere" nel senso che permettono di resistere alla verità del nulla.</p>
          </div>
          <p>Queste illusioni — <em>amore, patria, bellezza, poesia, memoria</em> — sono un atto di fede laica. Un sistema di valori fondato sull'arte e sull'ingegno umano per conferire una forma di <strong>eternità ideale</strong> contro l'oblio.</p>
        `
      },
      {
        n: 3,
        title: 'La parola come strumento salvifico',
        html: `
          <p>Se tutto è destinato al nulla, solo l'arte — intesa come <strong>sepolcro simbolico</strong> — può conservare la memoria e il senso umano. La poesia si oppone all'oblio trasformando il fugace in permanente.</p>
          <div class="pullquote">
            <p>Quando tutto sembra cenere, è la parola del poeta che può ancora brillare come una stella — garantendo un'eterna sopravvivenza all'umano.</p>
          </div>
        `
      }
    ],
    vocabulary: [
      { term: 'Meccanicismo', def: 'Visione filosofica che concepisce l\'universo come una macchina regolata da leggi fisiche, senza intervento divino o finalità spirituali. Tutto è materia in movimento.' },
      { term: 'Nulla eterno', def: 'La convinzione, derivante dal meccanicismo, che dopo la morte non esista alcuna forma di esistenza. Tutto si estingue definitivamente. Radice dell\'angoscia cosmica foscoliana.' },
      { term: 'Dolore filosofico / Angoscia cosmica', def: 'Lo stato di sofferenza interiore che deriva dalla consapevolezza della finitudine umana e dell\'indifferenza dell\'universo. È l\'angoscia generata dal "nulla eterno".' },
      { term: 'Religione delle illusioni', def: 'La risposta di Foscolo all\'angoscia del nulla. L\'uomo crea autonomamente valori laici come amore, patria, bellezza, poesia e memoria — costruzioni necessarie che danno senso e permettono una forma di "eternità ideale".' },
      { term: 'Illusioni necessarie', def: 'I valori (amore, patria, bellezza, poesia, memoria) che l\'uomo costruisce per dare un senso alla propria esistenza di fronte al nulla. Sono "necessarie" perché essenziali alla sopravvivenza spirituale dell\'individuo.' },
      { term: 'Sepolcro simbolico', def: 'Il ruolo attribuito da Foscolo all\'arte e alla poesia: custodisce e tramanda memoria e valori attraverso i secoli, vincendo l\'oblio e conferendo una forma di immortalità.' }
    ]
  },

  {
    id: 'neoclassicismo',
    icon: '⚖',
    n: 3,
    title: 'Neoclassicismo e Preromanticismo',
    intro: 'Le due anime di un\'epoca — e la doppia tensione di Foscolo.',
    heroImage: 'images/neoclassicismo.jpg',
    heroBgPos: 'center top',
    sections: [
      {
        n: 1,
        title: 'Neoclassicismo: Bellezza, Ordine, Armonia',
        html: `
          <p>Il Neoclassicismo guarda alla classicità greco-romana come modello assoluto di perfezione. L'ideale è la ricerca di <strong>equilibrio, ordine, razionalità e bellezza formale</strong>. Non è solo estetica, ma anche etica: <em>la forma salva dall'angoscia del mondo</em>.</p>
          <p>Temi: mito, eroismo, senso di patria — sempre espressi con perfezione formale e metriche classiche. Un "tempio ideale" dove il caos esistenziale trova argine.</p>
        `
      },
      {
        n: 2,
        title: 'Preromanticismo: Sentimento, Turbamento, Infinito',
        html: `
          <p>In antitesi al razionalismo illuminista, il Preromanticismo anticipa il Romanticismo. Si focalizza su <strong>sensibilità individuale, immaginazione, malinconia e mistero</strong>. La natura non è armonica: è paesaggio selvaggio e tempestoso, specchio dell'animo.</p>
          <p>Temi dominanti: dolore, morte, esilio, amore infelice, tensione verso l'assoluto — espressi con un linguaggio emotivo che rompe le convenzioni formali.</p>
        `
      },
      {
        n: 3,
        title: 'Foscolo: la sintesi della crisi moderna',
        html: `
          <p>Foscolo incarna la complessità di questa epoca, essendo lui stesso un <strong>ponte tra le due visioni</strong>. La sua opera è la viva testimonianza di una "doppia tensione" irrisolta.</p>
          <div class="cols-2">
            <div class="col-card">
              <div class="col-card-title">Anima Neoclassica</div>
              <p>Bellezza e forma artistica possono immortalare. Di fronte al nulla, cerca salvezza nell'armonia, nella misura, nella perfezione stilistica.</p>
            </div>
            <div class="col-card">
              <div class="col-card-title">Anima Preromantica</div>
              <p>La consapevolezza che siano pur sempre "illusioni" riemerge: domina il dolore, l'inquietudine che nessuna forma può del tutto placare.</p>
            </div>
          </div>
          <div class="pullquote">
            <p>Foscolo è il poeta che incarna la crisi dell'uomo moderno: in lui convivono l'anelito neoclassico all'ordine come rifugio e la vertigine preromantica dinanzi all'abisso del nulla.</p>
          </div>
        `
      }
    ],
    vocabulary: [
      { term: 'Neoclassicismo', def: 'Corrente culturale (fine XVIII – inizio XIX sec.) che si ispira all\'antichità greco-romana. Cerca equilibrio, ordine, razionalità e perfezione formale come modelli di bellezza e comportamento etico. La forma è vista come rifugio contro il caos.' },
      { term: 'Preromanticismo', def: 'Movimento culturale che precede il Romanticismo (fine XVIII sec.). Reazione al razionalismo illuminista; si concentra su sensibilità individuale, sentimento, malinconia, mistero e inquietudine.' },
      { term: 'Doppia tensione', def: 'La coesistenza in Foscolo di due sensibilità opposte: aspetti neoclassici (ricerca di ordine, forma, armonia) e preromantici (inquietudine, passione, angoscia del nulla). Questa è la sua firma stilistica.' },
      { term: 'Forma (che salva dall\'angoscia)', def: 'Nel contesto neoclassico foscoliano, la ricerca della perfezione stilistica. La bellezza e l\'armonia della forma sono un modo per dare ordine al caos esistenziale e per eternare i valori umani.' }
    ]
  },

  {
    id: 'ortis',
    icon: '✉',
    n: 4,
    title: 'Le ultime lettere di Jacopo Ortis',
    intro: 'Il romanzo della disillusione moderna — il primo eroe tragico italiano.',
    heroImage: 'images/preromanticismo.jpg',
    heroBgPos: 'center center',
    sections: [
      {
        n: 1,
        title: 'Il romanzo e il contesto storico',
        html: `
          <p>Le <em>Ultime lettere di Jacopo Ortis</em> (forma definitiva 1802) è il <strong>primo vero romanzo moderno italiano</strong>, calato nel contesto post-rivoluzionario e napoleonico: un'epoca di grandi speranze tradite.</p>
          <p>Foscolo, che visse in prima persona il fallimento degli ideali giacobini, fa di Jacopo il <strong>simbolo di un'intera generazione di giovani idealisti traditi</strong>. Il romanzo è autobiografico nella sostanza, anche se non nella forma.</p>
        `
      },
      {
        n: 2,
        title: 'Forma e trama',
        html: `
          <p>L'opera è un <strong>romanzo epistolare</strong>: le lettere intime di Jacopo all'amico Lorenzo. Foscolo innova il genere unendo profonda introspezione psicologica a riflessione politica e storica, creando un <em>"io moderno" lacerato tra ideali e realtà brutale</em>.</p>
          <p>Jacopo, deluso dal Trattato di Campoformio, si rifugia sui Colli Euganei. Si innamora di <strong>Teresa</strong>, amore sublime ma impossibile (promessa a Odoardo). Intraprende un viaggio che lo porta a incontrare <strong>Parini</strong>. Il culmine è il suicidio: estrema affermazione di libertà di fronte a un mondo inautentico.</p>
        `
      },
      {
        n: 3,
        title: 'Il crollo delle illusioni',
        html: `
          <p>Jacopo incarna la visione foscoliana del nulla eterno. Le illusioni — i valori che dovrebbero dare senso — crollano una dopo l'altra:</p>
          <table class="data-table">
            <thead><tr><th>Illusione</th><th>Come crolla</th></tr></thead>
            <tbody>
              <tr><td>La patria</td><td>Venduta e oppressa, tradita dalla politica napoleonica</td></tr>
              <tr><td>L'amore (Teresa)</td><td>Infranto dalle convenzioni sociali borghesi</td></tr>
              <tr><td>La libertà</td><td>Tradita dal potere politico che degenera in tirannide</td></tr>
              <tr><td>Poesia e famiglia</td><td>Non bastano a consolare di fronte al nulla</td></tr>
            </tbody>
          </table>
          <div class="pullquote">
            <p>Di fronte al fallimento universale, a Jacopo resta solo la <em>verità tragica</em>: il suicidio come atto di dignità per chi rifiuta di vivere senza verità.</p>
          </div>
        `
      },
      {
        n: 4,
        title: 'Il dialogo con Parini',
        html: `
          <p>Un momento cruciale è l'incontro di Jacopo con il vecchio poeta <strong>Parini a Milano</strong>: dialogo tra due generazioni e due visioni del mondo.</p>
          <table class="data-table">
            <thead><tr><th>Categoria</th><th>Parini (credente)</th><th>Jacopo/Foscolo (ateo)</th></tr></thead>
            <tbody>
              <tr><td>Concezione della vita</td><td>Senso morale e spirituale legato al dovere e alla fede</td><td>Ciclo materiale destinato al nulla</td></tr>
              <tr><td>Sulla rivoluzione</td><td>Scetticismo maturo: degenera in tirannide</td><td>Speranza iniziale, poi disillusione</td></tr>
              <tr><td>Il suicidio</td><td>Atto contro la legge morale e divina</td><td>Scelta razionale quando la vita è priva di scopo</td></tr>
              <tr><td>Ruolo dell'intellettuale</td><td>Educare, mantenere dignità e misura</td><td>Sublimare il dolore con le illusioni</td></tr>
            </tbody>
          </table>
          <p>L'incontro non porta a conciliazione: rafforza in Jacopo la consapevolezza della <strong>frattura insanabile tra ideale e realtà</strong>, che lo spinge verso la sua tragica fine.</p>
        `
      }
    ],
    vocabulary: [
      { term: '"Io moderno"', def: 'Riferito a Jacopo: figura letteraria innovativa, tormentata, divisa tra ideali e cruda realtà. Incarna la crisi dell\'individuo nella modernità — il primo esempio in italiano.' },
      { term: 'Frattura insanabile tra ideale e realtà', def: 'Il conflitto irrisolvibile tra i nobili principi di Jacopo e la dura realtà esterna. Questa dicotomia è la causa principale della sua sofferenza e del suo epilogo.' },
      { term: 'Eroe tragico moderno', def: 'Jacopo non è un vincitore. È un personaggio che affronta consapevolmente la propria sconfitta. A differenza dell\'eroe classico, la sua grandezza sta nella consapevolezza della sconfitta, non nella vittoria.' },
      { term: 'Illusioni (fallimento delle)', def: 'Nel romanzo, Jacopo sperimenta il progressivo e tragico fallimento di tutte le illusioni (amore, patria, libertà, poesia) di fronte a una realtà che le nega sistematicamente.' }
    ]
  },

  {
    id: 'sepolcri',
    icon: '🏛',
    n: 5,
    title: 'Sepolcri, Grazie e Sonetti',
    intro: 'L\'eternità della parola: poesia come unica immortalità possibile.',
    heroImage: 'images/foscolo_parini.jpg',
    heroBgPos: 'center center',
    sections: [
      {
        n: 1,
        title: 'Dei Sepolcri: la memoria civilizzatrice',
        html: `
          <p>Composto nel <strong>1806</strong>, <em>Dei Sepolcri</em> è un carme in endecasillabi sciolti, nato dalla riflessione sull'<strong>Editto di Saint-Cloud (1804)</strong>, che negava il valore simbolico delle tombe.</p>
          <div class="pullquote">
            <p>"A egregie cose il forte animo accendono / l'urne de' forti" — la tomba non serve al morto, ma ai vivi.</p>
            <cite>— Dei Sepolcri, vv. 151–152</cite>
          </div>
          <p>I sepolcri di <em>Machiavelli, Michelangelo e Galileo</em> a Firenze diventano simboli della gloria nazionale. Il carme eleva la poesia a <strong>strumento supremo capace di perpetuare la memoria</strong> anche quando le tombe materiali saranno distrutte.</p>
        `
      },
      {
        n: 2,
        title: 'Le Grazie: l\'arte come nuova religione',
        html: `
          <p>Nel carme <strong>incompiuto</strong> <em>Le Grazie</em>, Foscolo propone l'arte come unica salvezza di fronte alla condanna della natura al dolore e alla morte. Le Grazie — <em>Aglaia, Eufrosine, Talia</em> — sono invocate come simboli della bellezza spirituale e morale.</p>
          <p>L'opera è un manifesto della "religione delle illusioni": l'arte, attraverso l'armonia e la virtù, fonda una <strong>nuova religione laica</strong> capace di purificare, consolare ed elevare lo spirito nonostante la consapevolezza del nulla.</p>
        `
      },
      {
        n: 3,
        title: 'I Sonetti: dolore personale e consolazione poetica',
        html: `
          <p>I sonetti — <em>In morte del fratello Giovanni, Alla sera, A Zacinto</em> — sono concentrati di pensiero e dolore. Riflettono la doppia anima foscoliana: <strong>neoclassica nella forma impeccabile, preromantica nell'inquietudine dei contenuti</strong>.</p>
          <div class="infobox">
            <div class="infobox-title">I tre nuclei tematici</div>
            <p><strong>Dolore personale</strong> — morte del fratello, esilio, nostalgia della terra natia.</p>
            <p><strong>Il nulla eterno</strong> — permea ogni verso, dalla prima all'ultima parola.</p>
            <p><strong>La memoria</strong> — unica forma di sopravvivenza: memoria materna, della patria, della poesia.</p>
          </div>
          <p>Il sonetto diventa un <em>"piccolo tempio costruito con parole eterne"</em>: il tormento personale si sublima in bellezza e armonia formale. La poesia è qui l'espressione più intima della religione delle illusioni.</p>
        `
      }
    ],
    vocabulary: [
      { term: 'Funzione civile dei sepolcri', def: 'L\'idea che le tombe e il ricordo dei defunti non servano ai morti, ma ai vivi. I sepolcri di uomini illustri ispirano virtù, patriottismo e senso civico, fungendo da esempio morale per le generazioni future.' },
      { term: 'Memoria', def: 'Uno dei pilastri della "religione delle illusioni". La capacità di ricordare e tramandare il valore delle opere di chi non c\'è più. Custodita dall\'arte, è l\'unica forma di immortalità possibile contro il nulla eterno.' },
      { term: 'Religione laica dell\'arte', def: 'Il concetto che l\'arte possa fondare un sistema di valori e consolazioni per l\'uomo moderno, orfano di fede e patria. Una forma di "religione delle illusioni" consapevole del nulla, che offre senso e armonia.' },
      { term: 'Bellezza salvifica', def: 'Per Foscolo la bellezza non è solo estetica. È una forza etica e morale capace di civilizzare l\'uomo, addolcire i costumi, purificare lo spirito e resistere alla brutalità del mondo.' }
    ]
  },

  {
    id: 'alla-sera',
    icon: '🌒',
    n: 6,
    title: '"Alla sera"',
    intro: 'Analisi completa: testo, parafrasi, commento filosofico.',
    heroImage: 'images/preromanticismo.jpg',
    heroBgPos: 'center 30%',
    sections: [
      {
        n: 1,
        title: 'Testo e parafrasi a confronto',
        html: `
          <div class="poem-wrap">
            <div class="poem-block">
              <div class="poem-block-head">Testo originale (1803)</div>
              <div class="poem-block-body">
                <div class="poem-original">Forse perché della fatal quïete
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
            </div>
            <div class="poem-block">
              <div class="poem-block-head">Parafrasi</div>
              <div class="poem-block-body">
                <div class="poem-para">Forse perché sei immagine della morte inevitabile,
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
          </div>
        `
      },
      {
        n: 2,
        title: 'Il contesto filosofico',
        html: `
          <p>Foscolo concepisce l'universo come privo di senso metafisico. Tutto è materia in trasformazione destinata al nulla. Non c'è aldilà, non c'è resurrezione: la morte è la <strong>"fatal quiete"</strong>, il destino inevitabile.</p>
          <p>Foscolo sa però che <em>la verità del nulla è insopportabile</em>. Per questo elabora la sua "religione delle illusioni": anche la morte, trasformata in immagine poetica, può diventare accettabile. <em>Alla sera</em> è un esempio altissimo di questa dinamica: la morte non è temuta, ma <strong>invocata</strong>.</p>
        `
      },
      {
        n: 3,
        title: 'Analisi letteraria',
        html: `
          <p>La sera, personificata, è invocata con dolcezza — <strong>amata perché immagine della morte</strong>, ma di una morte che porta pace. Le immagini naturali (nubi, venti, gelo, tenebre) costruiscono un'atmosfera avvolgente.</p>
          <div class="pullquote">
            <p>"Vagar mi fai co' miei pensier su l'orme / che vanno al nulla eterno" — i pensieri seguono le tracce che portano verso la morte, in un percorso meditativo accettato con calma.</p>
          </div>
          <p>Il <strong>"reo tempo"</strong> — la vita carica di colpa e sofferenza — fugge portando con sé le preoccupazioni. Solo nella contemplazione della pace serale si calma il <em>"spirto guerrier ch'entro mi rugge"</em>: metafora potentissima del tormento interiore che non può placarsi da solo.</p>
          <p>Questa quiete non è resa — è il momento in cui la <strong>poesia trasforma l'angoscia in bellezza</strong>. La "fatal quiete" da orrore diventa consolazione.</p>
        `
      },
      {
        n: 4,
        title: 'Perché è esemplare della poetica foscoliana',
        html: `
          <p><em>Alla sera</em> è una sintesi perfetta: unisce <strong>filosofia del nulla</strong> (meccanicismo, nulla eterno), <strong>tensione preromantica</strong> (il tormento dello spirito guerriero) e <strong>armonia classica</strong> (la forma impeccabile del sonetto) in una lirica di straordinaria profondità.</p>
          <div class="cols-2">
            <div class="col-card">
              <div class="col-card-title">Livello filosofico</div>
              <p>La morte non è negata né temuta: è razionalmente accettata come il nulla eterno a cui tutto tende.</p>
            </div>
            <div class="col-card">
              <div class="col-card-title">Livello poetico</div>
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
    icon: '◉',
    n: 7,
    title: 'Scheda Didattica',
    intro: 'Cinque punti fondamentali per capire Foscolo. Sintesi completa della poetica.',
    heroImage: 'images/schema_poetica.jpg',
    heroBgPos: 'center bottom',
    sections: [
      {
        n: 1,
        title: 'Un poeta filosofo dell\'assenza',
        html: `<p>Foscolo parte da una certezza radicale: non esiste Dio, non esiste un aldilà, l'uomo è materia destinata al nulla. Questa consapevolezza genera una profonda <strong>angoscia cosmica</strong>: se tutto finisce, che senso ha vivere?</p>`
      },
      {
        n: 2,
        title: 'La religione delle illusioni',
        html: `
          <p>Per resistere al vuoto, l'uomo crea da sé valori che diano un senso all'esistenza. Foscolo li chiama <strong>illusioni necessarie</strong>:</p>
          <div class="pullquote"><p>amore &nbsp;·&nbsp; patria &nbsp;·&nbsp; bellezza &nbsp;·&nbsp; poesia &nbsp;·&nbsp; memoria</p></div>
          <p>Questi ideali non sono "veri" in senso religioso, ma sono veri <em>perché aiutano a vivere</em>.</p>
        `
      },
      {
        n: 3,
        title: 'La poesia come sepolcro simbolico',
        html: `<p>La poesia è lo strumento che <strong>conserva la memoria e rende immortali i valori umani</strong>. Come un sepolcro simbolico: protegge ciò che conta dalla morte e dall'oblio. Le tombe dei <em>Sepolcri</em> servono ai vivi, non ai morti.</p>`
      },
      {
        n: 4,
        title: 'Due anime: Neoclassico e Preromantico',
        html: `
          <table class="data-table">
            <thead><tr><th>Anima Neoclassica</th><th>Anima Preromantica</th></tr></thead>
            <tbody>
              <tr><td>Ama la forma, l'armonia, la bellezza che dà ordine al caos</td><td>È inquieto, tormentato, attratto dall'infinito e dal dolore</td></tr>
              <tr><td>La forma salva dall'angoscia</td><td>L'inquietudine è ineliminabile</td></tr>
              <tr><td><em>Le Grazie, All'amica risanata</em></td><td><em>Jacopo Ortis, Alla sera</em></td></tr>
            </tbody>
          </table>
        `
      },
      {
        n: 5,
        title: 'Il poeta come eroe moderno',
        html: `
          <p>Foscolo non è un evasore, ma un <strong>combattente del pensiero</strong>. Il poeta diventa un eroe laico: sa che tutto finisce, ma scrive per lasciare un segno, per salvare almeno le parole, per resistere al nulla.</p>
          <div class="pullquote"><p>Materialismo → Nulla eterno → Religione delle illusioni → Poesia salvifica → Memoria come sopravvivenza → Arte come nuova religione laica.</p></div>
        `
      }
    ],
    vocabulary: []
  }
];

/* ── QUIZ DATA ── */
const QUIZ = [
  { q:'Dove e quando nasce Ugo Foscolo?', opts:['A Venezia nel 1765','A Zante (Zacinto) nel 1778','A Milano nel 1780','A Firenze nel 1772'], correct:1, fb:'Foscolo nasce il 6 febbraio 1778 a Zante (Zacinto), isola greca allora sotto il dominio della Repubblica di Venezia.' },
  { q:'Cosa intende Foscolo per "religione delle illusioni"?', opts:['La fede cattolica riformata','La costruzione consapevole di valori laici (amore, patria, poesia, memoria) che danno senso alla vita','L\'illusione che la morte non esista','Il culto della bellezza classica come religione pagana'], correct:1, fb:'La "religione delle illusioni" non è inganno: è una costruzione consapevole di valori laici che, pur non fondati su verità metafisiche, aiutano l\'uomo a vivere con dignità.' },
  { q:'Quale visione filosofica è alla base della poetica foscoliana?', opts:['Il platonismo','Il meccanicismo materialista: l\'universo è regolato da leggi fisiche senza intervento divino','Il deismo cristiano','Lo stoicismo antico'], correct:1, fb:'Foscolo è materialista: concepisce l\'universo come una macchina regolata da leggi fisiche. L\'uomo è pura materia destinata al nulla dopo la morte.' },
  { q:'Perché Foscolo scrive "Dei Sepolcri"?', opts:['Per commemorare Napoleone','In risposta all\'Editto di Saint-Cloud (1804), che svalutava le tombe e il loro valore simbolico','Per celebrare i caduti della Rivoluzione','Per rivaleggiare con la poesia funebre inglese'], correct:1, fb:'L\'Editto di Saint-Cloud (1804) imponeva sepolture fuori dai centri abitati. Foscolo risponde difendendo il valore civile e affettivo dei sepolcri: non servono ai morti, ma ai vivi.' },
  { q:'Che tipo di opera è "Le ultime lettere di Jacopo Ortis"?', opts:['Un poema epico in ottave','Un romanzo epistolare — il primo "io moderno" in crisi nella letteratura italiana','Una tragedia in cinque atti','Un trattato filosofico dialogico'], correct:1, fb:'L\'Ortis è il primo vero romanzo moderno italiano: un romanzo epistolare (lettere di Jacopo all\'amico Lorenzo) che unisce introspezione psicologica e riflessione politica.' },
  { q:'Cosa rappresenta la "fatal quiete" in "Alla sera"?', opts:['Il tramonto come momento di preghiera','La morte, vista come pace inevitabile e non come terrore','La fine della giornata lavorativa','La quiete della natura prima della tempesta'], correct:1, fb:'"Fatal quiete" = morte inevitabile (fatale). La sera ne è immagine: non è temuta, ma invocata, perché solo essa può calmare lo "spirto guerrier" che rugge dentro di lui.' },
  { q:'Quali due anime convivono in Foscolo?', opts:['Romantica e Barocca','Neoclassica (armonia, forma) e Preromantica (inquietudine, dolore, tensione verso l\'assoluto)','Illuminista e Cristiana','Classica e Moderna'], correct:1, fb:'La "doppia tensione": l\'anima neoclassica cerca ordine, armonia e perfezione formale; l\'anima preromantica è segnata da inquietudine, dolore esistenziale e un profondo bisogno di assoluto.' },
  { q:'Perché Jacopo Ortis si suicida?', opts:['Solo per delusione amorosa','Perché ha perso ogni illusione — politica, amorosa, esistenziale — e sceglie il suicidio come atto estremo di libertà','Per sfuggire alla prigione austriaca','Per motivi economici'], correct:1, fb:'Il suicidio di Jacopo è un gesto meditato: la conseguenza del crollo di tutte le illusioni. È l\'estrema affermazione di libertà di chi rifiuta di vivere senza verità.' },
  { q:'Cosa simboleggiano le Grazie nell\'opera omonima?', opts:['Le tre fidanzate di Foscolo','La bellezza spirituale e morale capace di trasformare la barbarie in civiltà, fondando una nuova religione laica dell\'arte','Le tre Muse classiche','Tre virtù teologali reinterpretate in chiave pagana'], correct:1, fb:'Le Grazie (Aglaia, Eufrosine, Talia) simboleggiano la bellezza spirituale e morale. La loro forza è trasformare la barbarie in civiltà: arte come nuova religione laica.' },
  { q:'Cosa rappresenta il "sepolcro simbolico" nella poetica foscoliana?', opts:['La tomba materiale come monumento architettonico','La poesia e l\'arte che conservano la memoria e i valori umani contro il nulla eterno','Il mausoleo di Napoleone','Il corpo stesso come involucro dell\'anima'], correct:1, fb:'Il "sepolcro simbolico" è la poesia: l\'opera d\'arte che custodisce memoria, valori e affetti attraverso i secoli, vincendo l\'oblio. Una tomba che non preserva il corpo, ma il significato.' }
];

/* ── STATE ── */
const S = {
  done: JSON.parse(localStorage.getItem('f2_done') || '[]'),
  view: 'home', lesson: null,
  qi: 0, qscore: 0, qanswered: false, qshuffled: []
};
function save(){ localStorage.setItem('f2_done', JSON.stringify(S.done)) }
function markDone(id){ if(!S.done.includes(id)){ S.done.push(id); save(); refreshProgress() } }
function pct(){ return Math.round(S.done.length / LESSONS.length * 100) }

/* ── PROGRESS UI ── */
function refreshProgress(){
  const p = pct();
  const circ = 2 * Math.PI * 14;
  const fill = document.getElementById('ring-fill');
  if(fill) fill.style.strokeDashoffset = circ - circ * p / 100;
  const rp = document.getElementById('ring-pct');
  if(rp) rp.textContent = p + '%';
  const hfill = document.getElementById('hpb-fill');
  if(hfill) hfill.style.width = p + '%';
  const hlbl = document.getElementById('hpb-label');
  if(hlbl) hlbl.textContent = `${S.done.filter(x => LESSONS.find(l=>l.id===x)).length} / ${LESSONS.length}`;
  // Drawer items
  document.querySelectorAll('.drawer-btn').forEach(b=>{
    const id = b.dataset.id;
    const chk = b.querySelector('.d-check');
    const done = S.done.includes(id);
    b.classList.toggle('done', done);
    if(chk) chk.textContent = done ? '✓' : '';
  });
  // Home cards
  document.querySelectorAll('.lcard[data-id]').forEach(c=>{
    const id = c.dataset.id;
    c.classList.toggle('done', S.done.includes(id));
    const badge = c.querySelector('.lcard-badge');
    if(badge) badge.style.opacity = S.done.includes(id) ? '1' : '0';
  });
}

/* ── DRAWER ── */
function buildDrawer(){
  const list = document.getElementById('drawer-list');
  list.innerHTML = '';
  LESSONS.forEach(l=>{
    const li = document.createElement('li');
    li.innerHTML = `<button class="drawer-btn" data-id="${l.id}">
      <span class="d-icon">${l.icon}</span>
      <span class="d-label">${l.n}. ${l.title}</span>
      <span class="d-check">${S.done.includes(l.id)?'✓':''}</span>
    </button>`;
    li.querySelector('button').addEventListener('click',()=>{ closeDrawer(); showLesson(l.id) });
    list.appendChild(li);
  });
  // Quiz
  const liQ = document.createElement('li');
  liQ.innerHTML = `<button class="drawer-btn" data-id="quiz" style="border-top:1px solid var(--border-2);margin-top:0.5rem;padding-top:1rem">
    <span class="d-icon">📝</span>
    <span class="d-label">Quiz finale</span>
    <span class="d-check">${S.done.includes('quiz')?'✓':''}</span>
  </button>`;
  liQ.querySelector('button').addEventListener('click',()=>{ closeDrawer(); showQuiz() });
  list.appendChild(liQ);
}
function openDrawer(){
  document.getElementById('drawer').classList.add('open');
  document.getElementById('scrim').classList.add('on');
  document.getElementById('menu-btn').classList.add('open');
}
function closeDrawer(){
  document.getElementById('drawer').classList.remove('open');
  document.getElementById('scrim').classList.remove('on');
  document.getElementById('menu-btn').classList.remove('open');
}
function setDrawerActive(id){
  document.querySelectorAll('.drawer-btn').forEach(b=>b.classList.toggle('active', b.dataset.id===id));
}

/* ── NAV STATE ── */
function setNavBack(show, onClick){
  const btn = document.getElementById('nav-back');
  btn.classList.toggle('hidden', !show);
  btn.onclick = onClick || null;
}

/* ── REVEAL ── */
function initReveal(){
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in') });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
}

/* ══════════════════════════════════════════════════════════
   HOME
══════════════════════════════════════════════════════════ */
function showHome(){
  S.view = 'home'; S.lesson = null;
  setNavBack(false);
  setDrawerActive(null);
  ['view-lesson','view-quiz'].forEach(id=>document.getElementById(id).classList.add('hidden'));
  const home = document.getElementById('view-home');
  home.classList.remove('hidden');

  const p = pct();
  const doneL = S.done.filter(x=>LESSONS.find(l=>l.id===x)).length;

  home.innerHTML = `
    <div class="home-hero">
      <div class="home-hero-bg"></div>
      <div class="home-hero-overlay"></div>
      <div class="home-hero-grain"></div>
      <div class="home-hero-content">
        <div class="home-hero-eyebrow">Percorso Didattico — Letteratura Italiana</div>
        <h1 class="home-hero-title">Ugo<br><em>Foscolo</em></h1>
        <p class="home-hero-sub">Tra Ragione e l'Eternità delle Illusioni</p>
        <div class="home-progress-bar">
          <div class="hpb-labels">
            <span>Progresso</span>
            <span id="hpb-label">${doneL} / ${LESSONS.length}</span>
          </div>
          <div class="hpb-track">
            <div class="hpb-fill" id="hpb-fill" style="width:${p}%"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="home-section">
      <div class="home-section-title">Lezioni</div>
      <div class="cards-grid" id="cards-grid"></div>
    </div>
  `;

  const grid = document.getElementById('cards-grid');

  // Lesson cards
  const lessonImages = {
    'biografia':     'images/ritratto.jpg',
    'poetica':       'images/schema_poetica.jpg',
    'neoclassicismo':'images/neoclassicismo.jpg',
    'ortis':         'images/preromanticismo.jpg',
    'sepolcri':      'images/foscolo_parini.jpg',
    'alla-sera':     'images/preromanticismo.jpg',
    'scheda':        'images/schema_poetica.jpg',
  };

  LESSONS.forEach(l=>{
    const isDone = S.done.includes(l.id);
    const card = document.createElement('div');
    card.className = `lcard reveal ${isDone ? 'done' : ''}`;
    card.dataset.id = l.id;
    card.innerHTML = `
      <div class="lcard-top-line"></div>
      <div class="lcard-img" style="background-image:url('${lessonImages[l.id] || ''}')"></div>
      <div class="lcard-gradient"></div>
      <div class="lcard-badge">Completata ✓</div>
      <div class="lcard-body">
        <div class="lcard-num">Lezione ${l.n}</div>
        <div class="lcard-title">${l.icon} ${l.title}</div>
        <div class="lcard-desc">${l.intro}</div>
      </div>
    `;
    card.addEventListener('click', ()=>showLesson(l.id));
    grid.appendChild(card);
  });

  // Quiz card
  const qDone = S.done.includes('quiz');
  const qCard = document.createElement('div');
  qCard.className = `lcard lcard-quiz reveal ${qDone ? 'done' : ''}`;
  qCard.dataset.id = 'quiz';
  qCard.innerHTML = `
    <div class="lcard-top-line"></div>
    <div class="lcard-img"></div>
    <div class="lcard-gradient"></div>
    <div class="lcard-badge">Completato ✓</div>
    <div class="lcard-body">
      <div class="lcard-num">Verifica Finale</div>
      <div class="lcard-title">📝 Quiz: Saperi Irrinunciabili</div>
      <div class="lcard-desc">10 domande sui concetti fondamentali del percorso foscoliano.</div>
    </div>
  `;
  qCard.addEventListener('click', showQuiz);
  grid.appendChild(qCard);

  // Stagger animation
  setTimeout(()=>{
    document.querySelectorAll('.cards-grid .reveal').forEach((c,i)=>{
      setTimeout(()=>c.classList.add('in'), i*80);
    });
    initReveal();
    // Hero bg animate
    setTimeout(()=>{
      const heroBg = document.querySelector('.home-hero-bg');
      if(heroBg) heroBg.style.transform = 'scale(1.08)';
    }, 100);
  }, 100);
}

/* ══════════════════════════════════════════════════════════
   LESSON
══════════════════════════════════════════════════════════ */
function showLesson(id){
  const l = LESSONS.find(x=>x.id===id);
  if(!l) return;
  S.view = 'lesson'; S.lesson = id;
  setNavBack(true, showHome);
  setDrawerActive(id);

  document.getElementById('view-home').classList.add('hidden');
  document.getElementById('view-quiz').classList.add('hidden');
  const view = document.getElementById('view-lesson');
  view.classList.remove('hidden');

  const idx = LESSONS.findIndex(x=>x.id===id);
  const next = LESSONS[idx+1];
  const isDone = S.done.includes(id);

  let vocabHTML = '';
  if(l.vocabulary && l.vocabulary.length){
    vocabHTML = `
      <div class="vocab-section">
        <div class="vocab-heading">Vocabolario dei concetti chiave</div>
        ${l.vocabulary.map((v,i)=>`
          <div class="vocab-item">
            <button class="vocab-trigger" data-vi="${i}">
              ${v.term}
              <span class="vocab-arrow">▼</span>
            </button>
            <div class="vocab-body" id="vb-${id}-${i}">
              <div class="vocab-def">${v.def}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  view.innerHTML = `
    <div class="lesson-hero">
      <div class="lesson-hero-img" id="lhero-img" style="background-image:url('${l.heroImage}');background-position:${l.heroBgPos || 'center'}"></div>
      <div class="lesson-hero-overlay"></div>
      <div class="lesson-hero-content">
        <div class="lesson-bc">
          <button onclick="showHome()">← Percorso</button>
          <span>/</span>
          <span>${l.title}</span>
        </div>
        <h1 class="lesson-hero-title">${l.title}</h1>
        <p class="lesson-hero-sub">${l.intro}</p>
      </div>
    </div>
    <div class="lesson-body">
      ${l.sections.map((s,si)=>`
        <div class="lesson-section reveal" style="transition-delay:${si*0.08}s">
          <div class="section-header">
            <div class="section-num">0${s.n}</div>
            <div class="section-title">${s.title}</div>
          </div>
          <div class="section-rule"></div>
          ${s.html}
        </div>
      `).join('')}
      ${vocabHTML}
      <div class="lesson-footer reveal">
        <button class="btn-primary ${isDone?'done':''}" id="btn-done">
          ${isDone ? '✓ Già completata' : 'Segna come completata'}
        </button>
        ${next
          ? `<button class="btn-secondary" onclick="showLesson('${next.id}')">Prossima: ${next.title} →</button>`
          : `<button class="btn-secondary" onclick="showQuiz()">Vai al quiz →</button>`
        }
      </div>
    </div>
  `;

  // Hero img animate
  setTimeout(()=>{
    const hi = document.getElementById('lhero-img');
    if(hi) hi.classList.add('active');
  }, 100);

  // Done btn
  document.getElementById('btn-done').addEventListener('click', function(){
    markDone(id);
    this.textContent = '✓ Già completata';
    this.classList.add('done');
  });

  // Vocab toggles
  if(l.vocabulary){
    l.vocabulary.forEach((_,i)=>{
      const trigger = view.querySelector(`[data-vi="${i}"]`);
      const body = document.getElementById(`vb-${id}-${i}`);
      if(trigger && body){
        trigger.addEventListener('click',()=>{
          const open = body.classList.toggle('open');
          trigger.classList.toggle('open', open);
        });
      }
    });
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(initReveal, 150);
}

/* ══════════════════════════════════════════════════════════
   QUIZ
══════════════════════════════════════════════════════════ */
function showQuiz(){
  S.view='quiz'; S.qi=0; S.qscore=0; S.qanswered=false;
  S.qshuffled = [...QUIZ].sort(()=>Math.random()-0.5);
  setNavBack(true, showHome);
  setDrawerActive('quiz');
  document.getElementById('view-home').classList.add('hidden');
  document.getElementById('view-lesson').classList.add('hidden');
  document.getElementById('view-quiz').classList.remove('hidden');
  renderQuestion();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const LETTERS = ['A','B','C','D'];

function renderQuestion(){
  const view = document.getElementById('view-quiz');
  const total = S.qshuffled.length;
  const i = S.qi;
  if(i >= total){ renderResult(); return }
  const q = S.qshuffled[i];
  const p = Math.round(i/total*100);

  view.innerHTML = `
    <div class="quiz-container">
      <div class="quiz-header-block">
        <div class="lesson-bc">
          <button onclick="showHome()">← Percorso</button>
          <span>/</span><span>Quiz</span>
        </div>
        <h1 class="quiz-header-title">Saperi Irrinunciabili</h1>
        <p class="quiz-header-sub">Verifica finale — Ugo Foscolo</p>
        <div class="quiz-pbar-wrap">
          <div class="quiz-pbar-track">
            <div class="quiz-pbar-fill" style="width:${p}%"></div>
          </div>
        </div>
      </div>
      <div class="quiz-qblock">
        <div class="quiz-counter">Domanda ${i+1} di ${total}</div>
        <div class="quiz-question">${q.q}</div>
        <div class="quiz-options">
          ${q.opts.map((opt,oi)=>`
            <button class="quiz-opt" data-oi="${oi}">
              <span class="opt-letter">${LETTERS[oi]}</span>
              <span>${opt}</span>
            </button>
          `).join('')}
        </div>
        <div id="quiz-fb" class="hidden"></div>
        <div id="quiz-next" class="quiz-next-wrap hidden">
          <button class="btn-primary" id="btn-qnext">
            ${i+1<total ? 'Prossima domanda →' : 'Vedi il risultato →'}
          </button>
        </div>
      </div>
    </div>
  `;

  view.querySelectorAll('.quiz-opt').forEach(btn=>{
    btn.addEventListener('click',()=>{
      if(S.qanswered) return;
      S.qanswered = true;
      const chosen = parseInt(btn.dataset.oi);
      const correct = q.correct;
      const ok = chosen === correct;
      if(ok) S.qscore++;
      view.querySelectorAll('.quiz-opt').forEach((b,k)=>{
        b.disabled = true;
        if(k===correct) b.classList.add('correct');
        if(k===chosen && !ok) b.classList.add('wrong');
      });
      const fb = document.getElementById('quiz-fb');
      fb.className = 'quiz-feedback ' + (ok?'correct':'wrong');
      fb.innerHTML = (ok ? '✓ Esatto — ' : '✗ Non corretto — ') + q.fb;
      fb.classList.remove('hidden');
      document.getElementById('quiz-next').classList.remove('hidden');
    });
  });

  document.getElementById('btn-qnext').addEventListener('click',()=>{
    S.qi++; S.qanswered = false;
    renderQuestion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function renderResult(){
  const view = document.getElementById('view-quiz');
  const total = S.qshuffled.length;
  const score = S.qscore;
  const p = Math.round(score/total*100);
  const circ = 2*Math.PI*60;
  const offset = circ - circ*p/100;

  let label, comment;
  if(p>=90){ label='Eccellente'; comment='Conosci Foscolo in modo approfondito. Ottima padronanza dei concetti.' }
  else if(p>=70){ label='Molto bene'; comment='Buona preparazione. Ripassate qualche dettaglio e sarà perfetto.' }
  else if(p>=50){ label='Sufficiente'; comment='Vale la pena rileggere le lezioni sui temi più fragili.' }
  else { label='Da rivedere'; comment='Riprendi il percorso: alcune lezioni meritano un secondo sguardo.' }

  markDone('quiz');

  view.innerHTML = `
    <div class="quiz-container">
      <div class="lesson-bc">
        <button onclick="showHome()">← Percorso</button>
        <span>/</span><span>Risultato</span>
      </div>
      <div class="quiz-result">
        <div class="result-score-ring">
          <svg class="result-svg" viewBox="0 0 140 140">
            <circle class="result-ring-bg" cx="70" cy="70" r="60"/>
            <circle class="result-ring-fill" id="res-ring" cx="70" cy="70" r="60"
              stroke-dasharray="${circ}" stroke-dashoffset="${circ}"/>
          </svg>
          <div class="result-score-text">${score}/${total}</div>
        </div>
        <h2 class="result-label">${label}</h2>
        <p class="result-comment">${comment}</p>
        <div class="result-actions">
          <button class="btn-primary" onclick="showQuiz()">Riprova il quiz</button>
          <button class="btn-secondary" onclick="showHome()">Torna al percorso</button>
        </div>
      </div>
    </div>
  `;

  // Animate ring
  setTimeout(()=>{
    const r = document.getElementById('res-ring');
    if(r) r.style.strokeDashoffset = offset;
  }, 300);
}

/* ══════════════════════════════════════════════════════════
   SPLASH & INIT
══════════════════════════════════════════════════════════ */
function initSplash(){
  // Portrait lazy load
  const portrait = document.getElementById('splash-portrait');
  if(portrait){
    portrait.onload = ()=> portrait.classList.add('loaded');
    if(portrait.complete) portrait.classList.add('loaded');
  }

  document.getElementById('splash-enter').addEventListener('click',()=>{
    const splash = document.getElementById('splash');
    splash.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    splash.style.opacity = '0';
    splash.style.transform = 'scale(1.03)';
    setTimeout(()=>{
      splash.classList.add('hidden');
      document.getElementById('main').classList.remove('hidden');
      showHome();
      refreshProgress();
    }, 800);
  });
}

document.addEventListener('DOMContentLoaded',()=>{
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw.js').catch(()=>{});
  }

  initSplash();
  buildDrawer();
  refreshProgress();

  document.getElementById('menu-btn').addEventListener('click',()=>{
    document.getElementById('drawer').classList.contains('open') ? closeDrawer() : openDrawer();
  });
  document.getElementById('drawer-close').addEventListener('click', closeDrawer);
  document.getElementById('scrim').addEventListener('click', closeDrawer);
  document.getElementById('nav-logo').addEventListener('click', showHome);
});
