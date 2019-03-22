// This JavaScript file is created by Cision for all our modules.
// This is the first version of this file so far.
// This file works as a dictionary for all the modules and could be combined with all of them.
window.cision = window.cision || {};
window.cision.websolution = window.cision.websolution || {};
window.cision.websolution.texts = window.cision.websolution.texts || {};

/********* Insider specific texts. Needed for insider transactions and sharegraph with insiders as indicators **************/

window.cision.websolution.texts["sv"].insidersDescriptions = function () {
    var transactionTypes = [];
    var positionTypes = [];
    var holderTypes = [];
    var securityTypes = [];
    var commentTypes = [];

    transactionTypes[0] = "Orsak okänd vid reg.";
    transactionTypes[1] = "Innehavsanmälan";
    transactionTypes[2] = "Köp";
    transactionTypes[3] = "Försäljning";
    transactionTypes[4] = "Korrigering upp";
    transactionTypes[5] = "Korrigering ned";
    transactionTypes[6] = "Omräkning +";
    transactionTypes[7] = "Omräkning -";
    transactionTypes[8] = "Förfall";
    transactionTypes[9] = "Tilldelning";
    transactionTypes[10] = "Aktiesparplan";
    transactionTypes[11] = "Teckning";
    transactionTypes[12] = "Bonus";
    transactionTypes[13] = "Återköp";
    transactionTypes[14] = "Gåva";
    transactionTypes[15] = "Start dispens";
    transactionTypes[16] = "Split";
    transactionTypes[17] = "Omvänd split";
    transactionTypes[18] = "Överföring";
    transactionTypes[19] = "Utfärdad option";
    transactionTypes[20] = "Ingående balans";
    transactionTypes[21] = "Konvertering";
    transactionTypes[22] = "Omstämpling";
    transactionTypes[23] = "Inlösen";
    transactionTypes[24] = "Aktielån";
    transactionTypes[25] = "Byte av värdepapper";
    transactionTypes[26] = "Nyemission";
    transactionTypes[27] = "Apportemission";
    transactionTypes[28] = "Arvsskifte";
    transactionTypes[29] = "Optionslösen";
    transactionTypes[30] = "Arv";
    transactionTypes[31] = "Slutdatum optioner";
    transactionTypes[32] = "Utdelning";
    transactionTypes[33] = "Fondemission";
    transactionTypes[34] = "Fusion";
    transactionTypes[35] = "Uttag";
    transactionTypes[36] = "Bodelning";
    transactionTypes[37] = "Ny närstående";
    transactionTypes[38] = "Vinst";
    transactionTypes[39] = "Sortbyte";
    transactionTypes[40] = "Utskiftning";
    transactionTypes[41] = "Uppköp";
    transactionTypes[42] = "Aktietermin";
    transactionTypes[43] = "Terminslösen";
    transactionTypes[44] = "Indragning";
    transactionTypes[45] = "Avyttring";
    transactionTypes[46] = "Interna överf VPC";
    transactionTypes[47] = "Återbetalning";
    transactionTypes[48] = "Omräkning";
    transactionTypes[49] = "Fission";
    transactionTypes[50] = "Utbyte";
    transactionTypes[51] = "Förlagslån";
    transactionTypes[52] = "Övrig förändring";
    transactionTypes[53] = "Avslut av insyn";

    commentTypes["makulerad"] = "Makulerad";
    commentTypes["reviderad"] = "Reviderad";

    holderTypes[1] = "Eget";
    holderTypes[2] = "Maka/Make";
    holderTypes[3] = "Jur person";
    holderTypes[4] = "Barn";
    holderTypes[5] = "Närstående";
    holderTypes[6] = "Sambo";


    positionTypes[1] = "VD";
    positionTypes[2] = "VD dotterbolag";
    positionTypes[3] = "VD moderföretag";
    positionTypes[4] = "Vice VD";
    positionTypes[5] = "Vice VD dotterbolag";
    positionTypes[6] = "Vice VD moderföretag";
    positionTypes[7] = "Styrelseledamot";
    positionTypes[8] = "Styrelseledamot dotterbol";
    positionTypes[9] = "Styrelseledamot moderftg";
    positionTypes[10] = "Styrelsesuppleant";
    positionTypes[11] = "Styrelsesuppl dotterbolag";
    positionTypes[12] = "Styrelsesuppl moderftg";
    positionTypes[13] = "Revisor";
    positionTypes[14] = "Revisor dotterbolag";
    positionTypes[15] = "Revisor moderftg";
    positionTypes[16] = "Revisorssuppleant";
    positionTypes[17] = "Revisorssuppl dotterbolag";
    positionTypes[18] = "Revisorssuppl moderftg";
    positionTypes[19] = "Större Innehavare";
    positionTypes[20] = "Annan befattning";
    positionTypes[21] = "Annan befattn dotterbolag";
    positionTypes[22] = "Annan befattn moderftg";
    positionTypes[23] = "Aktiemarknadsbolag";


    securityTypes[1] = "Aktie";
    securityTypes[2] = "Aktie  PR";
    securityTypes[3] = "Köpoption";
    securityTypes[4] = "Säljoption";
    securityTypes[5] = "Aktietermin";
    securityTypes[6] = "Syntetisk option";
    securityTypes[7] = "American depository receipts";
    securityTypes[8] = "Svenskt Depåbevis";
    securityTypes[9] = "Konvertibel";
    securityTypes[10] = "Betald tecknad aktie";
    securityTypes[11] = "Interimsaktie";
    securityTypes[12] = "Betald tecknad unit";
    securityTypes[13] = "Uniträtt";
    securityTypes[14] = "Teckningsrätt, aktie";
    securityTypes[15] = "Teckningsoption";
    securityTypes[16] = "Optionsbevis";
    securityTypes[17] = "Inlösenrätt";
    securityTypes[18] = "Speciell rätt";
    securityTypes[19] = "övriga derivat";
    securityTypes[20] = "Delbevis";
    securityTypes[21] = "Räntebärande värdepapper";
    securityTypes[22] = "Inlösenaktie";
    securityTypes[23] = "Konvertibelt vinstandelsbevis";
    securityTypes[24] = "Säljrätt";
    securityTypes[25] = "Interimsbevis";
    securityTypes[26] = "Delrätt, aktie";
    securityTypes[27] = "Betald tecknad konvertibel";
    securityTypes[28] = "Förlagslån";
    securityTypes[29] = "0-innehav";

    return {
        positionTypes: positionTypes,
        holderTypes: holderTypes,
        securityTypes: securityTypes,
        transactionTypes: transactionTypes,
        commentTypes: commentTypes
    };
}(jQuery);

window.cision.websolution.texts["en"].insidersDescriptions = function () {
    var transactionTypes = [];
    var positionTypes = [];
    var holderTypes = [];
    var securityTypes = [];
    var commentTypes = [];

    transactionTypes[0] = " Reason unknown at time of reg.";
    transactionTypes[1] = " Holding notification";
    transactionTypes[2] = "Purchase";
    transactionTypes[3] = "Sale";
    transactionTypes[4] = "Correction up";
    transactionTypes[5] = "Correction down";
    transactionTypes[6] = "Conversion +";
    transactionTypes[7] = "Conversion -";
    transactionTypes[8] = "Maturity";
    transactionTypes[9] = "Allotment";
    transactionTypes[10] = "Share investment plan";
    transactionTypes[11] = "Subscription";
    transactionTypes[12] = "Dividend";
    transactionTypes[13] = "Withdrawal";
    transactionTypes[14] = "Gift";
    transactionTypes[15] = "Exemption";
    transactionTypes[16] = "Split";
    transactionTypes[17] = "Reverse split";
    transactionTypes[18] = "Transfer";
    transactionTypes[19] = "Issued option";
    transactionTypes[20] = "Opening balance";
    transactionTypes[21] = "Conversion";
    transactionTypes[22] = "Reclassification";
    transactionTypes[23] = "Redemption";
    transactionTypes[24] = "Share loan";
    transactionTypes[25] = "Maturity";
    transactionTypes[26] = "New Share issue";
    transactionTypes[27] = "Issue in kind";
    transactionTypes[28] = "Estate distribution";
    transactionTypes[29] = " Exercised options";
    transactionTypes[30] = " Inheritance";
    transactionTypes[31] = "End date options";
    transactionTypes[32] = "Dividend";
    transactionTypes[33] = "Bonus issue";
    transactionTypes[34] = "Fusion";
    transactionTypes[35] = "Withdrawal";
    transactionTypes[36] = "Division of matrimonial property";
    transactionTypes[37] = "New related party";
    transactionTypes[38] = "Yield";
    transactionTypes[39] = "Class change";
    transactionTypes[40] = "Distribution";
    transactionTypes[41] = "Acquisition";
    transactionTypes[42] = "Share future";
    transactionTypes[43] = "Redemption of futures";
    transactionTypes[44] = "Withdrawal";
    transactionTypes[45] = "Sale";
    transactionTypes[46] = "Interna överf VPC";
    transactionTypes[47] = "Refund";
    transactionTypes[48] = "Conversion";
    transactionTypes[49] = "Fission";
    transactionTypes[50] = "Utbyte";
    transactionTypes[51] = "Subordinated loan";
    transactionTypes[52] = "Övrig förändring";
    transactionTypes[53] = "Avslut av insyn";

    commentTypes["makulerad"] = "Cancelled";
    commentTypes["reviderad"] = "Revised";

    holderTypes[1] = "Own";
    holderTypes[2] = "Spouse";
    holderTypes[3] = "Legal person";
    holderTypes[4] = "Child";
    holderTypes[5] = "Related party";
    holderTypes[6] = "Cohabitee";


    positionTypes[1] = "MD";
    positionTypes[2] = "MD subsidiary";
    positionTypes[3] = "MD parent firm";
    positionTypes[4] = "Deputy MD";
    positionTypes[5] = "Deputy MD subsidiary";
    positionTypes[6] = "Deputy MD parent firm";
    positionTypes[7] = "Board member";
    positionTypes[8] = "Board member subsidiary";
    positionTypes[9] = "Board member parent firm";
    positionTypes[10] = " Alt. board member ";
    positionTypes[11] = " Alt. board member subsidiary";
    positionTypes[12] = "Alt. board member parent firm";
    positionTypes[13] = "Auditor";
    positionTypes[14] = "Auditor subsidiary";
    positionTypes[15] = "Auditor parent firm";
    positionTypes[16] = "Deputy Auditor";
    positionTypes[17] = "Deputy Auditor subsidiary";
    positionTypes[18] = "Deputy Auditor parent firm";
    positionTypes[19] = "Larger Shareholder";
    positionTypes[20] = "Other position";
    positionTypes[21] = "Other position subsidiary";
    positionTypes[22] = "Other position parent firm";
    positionTypes[23] = "Listed company";


    securityTypes[1] = "Share";
    securityTypes[2] = "Share  PR";
    securityTypes[3] = "Call option";
    securityTypes[4] = "Put option";
    securityTypes[5] = "Stock futures ";
    securityTypes[6] = "Synthetic option";
    securityTypes[7] = "American depository receipts";
    securityTypes[8] = "Swedish depository receipts ";
    securityTypes[9] = "Convertible";
    securityTypes[10] = "Payed subscribed share";
    securityTypes[11] = "Interim share";
    securityTypes[12] = "Payed subscribed unit";
    securityTypes[13] = "Unit right";
    securityTypes[14] = "Subscription right, share";
    securityTypes[15] = "Subscribed option";
    securityTypes[16] = "Option receipts ";
    securityTypes[17] = "Redemption right";
    securityTypes[18] = "Special right";
    securityTypes[19] = "other derivat";
    securityTypes[20] = "Delbevis";
    securityTypes[21] = "Interest bearing security";
    securityTypes[22] = "Redemption share";
    securityTypes[23] = "Convertible participation certificates";
    securityTypes[24] = "Sale right";
    securityTypes[25] = "Interim certificates";
    securityTypes[26] = "Delrätt, aktie";
    securityTypes[27] = "Payed subscribed convertible";
    securityTypes[28] = "Subordinated loan";
    securityTypes[29] = " Indicates 0 holdings";

    return {
        positionTypes: positionTypes,
        holderTypes: holderTypes,
        securityTypes: securityTypes,
        transactionTypes: transactionTypes,
        commentTypes: commentTypes
    };
}(jQuery);

window.cision.websolution.texts["fi"].insidersDescriptions = function () {
    var transactionTypes = [];
    var positionTypes = [];
    var holderTypes = [];
    var securityTypes = [];
    var commentTypes = [];

    transactionTypes[0] = "Syy tuntematon kirjaushetkellä.";
    transactionTypes[1] = "Omistusosuuksien ilmoittaminen";
    transactionTypes[2] = "Osto";
    transactionTypes[3] = "Myynti";
    transactionTypes[4] = "Korjaus ylöspäin";
    transactionTypes[5] = "Korjaus alaspäin";
    transactionTypes[6] = "Muunnos +";
    transactionTypes[7] = "Muunnos -";
    transactionTypes[8] = "Erääntyminen";
    transactionTypes[9] = "Osakeanti";
    transactionTypes[10] = "Osakeinvestointisuunnitelma";
    transactionTypes[11] = "Tilaus";
    transactionTypes[12] = "Osinko";
    transactionTypes[13] = "Luopuminen";
    transactionTypes[14] = "Lahja";
    transactionTypes[15] = "Poikkeus";
    transactionTypes[16] = "Jakaminen";
    transactionTypes[17] = "Yhdistely";
    transactionTypes[18] = "Siirto";
    transactionTypes[19] = "Liikkeeseen laskettu optio";
    transactionTypes[20] = "Avaussaldo";
    transactionTypes[21] = "Muunnos";
    transactionTypes[22] = "Uudelleen luokitus";
    transactionTypes[23] = "Lunastaminen";
    transactionTypes[24] = "Osakelaina";
    transactionTypes[25] = "Erääntyminen";
    transactionTypes[26] = "Osakkeiden uusanti";
    transactionTypes[27] = "Liikkeeseenlasku luontoisetuna";
    transactionTypes[28] = "Pesänjako";
    transactionTypes[29] = " Käytetyt optiot";
    transactionTypes[30] = " Perintö";
    transactionTypes[31] = "Päättymispäivä optiot";
    transactionTypes[32] = "Osinko";
    transactionTypes[33] = "Ilmaisanti";
    transactionTypes[34] = "Fuusio";
    transactionTypes[35] = "Luopuminen";
    transactionTypes[36] = "Ositus";
    transactionTypes[37] = "Uusi lähipiiriin kuuluva";
    transactionTypes[38] = "Tuotto";
    transactionTypes[39] = "Luokan muutos";
    transactionTypes[40] = "Jakelu";
    transactionTypes[41] = "Hankinta";
    transactionTypes[42] = "Osakefutuuri";
    transactionTypes[43] = "Futuureiden lunastaminen";
    transactionTypes[44] = "Luopuminen";
    transactionTypes[45] = "Myynti";
    transactionTypes[46] = "Sisäiset siirrot arvo-osuusrekistereihin";
    transactionTypes[47] = "Hyvitys";
    transactionTypes[48] = "Muunnos";
    transactionTypes[49] = "Jakautuminen";
    transactionTypes[50] = "Vaihto";
    transactionTypes[51] = "Pääomalaina";
    transactionTypes[52] = "Muu muutos";
    transactionTypes[53] = "Tarkastustulos";

    commentTypes["makulerad"] = "Cancelled";
    commentTypes["reviderad"] = "Revised";

    holderTypes[1] = "Oma";
    holderTypes[2] = "Puoliso";
    holderTypes[3] = "Juridinen henkilö";
    holderTypes[4] = "Lapsi";
    holderTypes[5] = "Lähipiiriin kuuluva";
    holderTypes[6] = "Avopuoliso";


    positionTypes[1] = "Toimitusjohtaja";
    positionTypes[2] = "Toimitusjohtaja tytäryhtiö";
    positionTypes[3] = "Toimitusjohtaja emoyhtiö";
    positionTypes[4] = "Varatoimitusjohtaja";
    positionTypes[5] = "Varatoimitusjohtaja tytäryhtiö";
    positionTypes[6] = "Varatoimitusjohtaja emoyhtiö";
    positionTypes[7] = "Hallituksen jäsen";
    positionTypes[8] = "Hallituksen jäsen tytäryhtiö";
    positionTypes[9] = "Hallituksen jäsen emoyhtiö";
    positionTypes[10] = "Hallituksen varajäsen";
    positionTypes[11] = "Hallituksen varajäsen tytäryhtiö";
    positionTypes[12] = "Hallituksen varajäsen emoyhtiö";
    positionTypes[13] = "Tilintarkastaja";
    positionTypes[14] = "Tilintarkastaja tytäryhtiö";
    positionTypes[15] = "Tilintarkastaja emoyhtiö";
    positionTypes[16] = "Varatilintarkastaja";
    positionTypes[17] = "Varatilintarkastaja tytäryhtiö";
    positionTypes[18] = "Varatilintarkastaja emoyhtiö";
    positionTypes[19] = "Merkittävä osakkeenomistaja";
    positionTypes[20] = "Muu asema";
    positionTypes[21] = "Muu asema tytäryhtiö";
    positionTypes[22] = "Muu asema emoyhtiö";
    positionTypes[23] = "Listattu yhtiö";


    securityTypes[1] = "Osake";
    securityTypes[2] = "Osake  PR";
    securityTypes[3] = "Osto-optio";
    securityTypes[4] = "Myyntioptio";
    securityTypes[5] = "Osakefutuurit";
    securityTypes[6] = "Synteettinen optio";
    securityTypes[7] = "ADR-todistukset";
    securityTypes[8] = "Swedish depository receipts ";
    securityTypes[9] = "Vaihtovelkakirja";
    securityTypes[10] = "Maksettu osakemerkintä";
    securityTypes[11] = "Väliaikainen osake";
    securityTypes[12] = "Maksettu merkintäosuus";
    securityTypes[13] = "Sijoitusrahasto-osuus";
    securityTypes[14] = "Merkintäoikeus, osake";
    securityTypes[15] = "Merkitty option";
    securityTypes[16] = "Optiotodistukset";
    securityTypes[17] = "Lunastusoikeus";
    securityTypes[18] = "Eritysoikeus";
    securityTypes[19] = "muu johdannainen";
    securityTypes[20] = "Osatodistus";
    securityTypes[21] = "Korkoa tuottava arvopaperi";
    securityTypes[22] = "Lunastus osake";
    securityTypes[23] = "Vaihdettavat sijoitustodistukset";
    securityTypes[24] = "Myyntioikeus";
    securityTypes[25] = "Väliaikaistodistukset";
    securityTypes[26] = "Osaoikeus, osake";
    securityTypes[27] = "Maksettu vaihtovelkakirjan merkintä";
    securityTypes[28] = "Pääomalaina";
    securityTypes[29] = "Osoittaa 0 omistusta";

    return {
        positionTypes: positionTypes,
        holderTypes: holderTypes,
        securityTypes: securityTypes,
        transactionTypes: transactionTypes,
        commentTypes: commentTypes
    };
}(jQuery);

// dk, no and de translations are not complete. and therefor commented out to save space 
// window.cision.websolution.texts["no"].insidersDescriptions = function () {
//     var transactionTypes = [];
//     var positionTypes = [];
//     var holderTypes = [];
//     var securityTypes = [];
//     var commentTypes = [];

//     transactionTypes[0] = "Årsak ukjent ved registering.";
//     transactionTypes[1] = "Beholdningsvarsling";
//     transactionTypes[2] = "Kjøp";
//     transactionTypes[3] = "Salg";
//     transactionTypes[4] = "Korrigering, opp";
//     transactionTypes[5] = "Korrigering, ned";
//     transactionTypes[6] = "Konvertering +";
//     transactionTypes[7] = "Konvertering -";
//     transactionTypes[8] = "Modenhet";
//     transactionTypes[9] = "Fordeling";
//     transactionTypes[10] = "Investeringsplan for aksje";
//     transactionTypes[11] = "Abonnement";
//     transactionTypes[12] = "Utbytte";
//     transactionTypes[13] = "Uttak";
//     transactionTypes[14] = "Gave";
//     transactionTypes[15] = "Unntak";
//     transactionTypes[16] = "Splitt";
//     transactionTypes[17] = "Omvendt splitt";
//     transactionTypes[18] = "Overføring";
//     transactionTypes[19] = "Utstedt opsjon";
//     transactionTypes[20] = "Åpningsbalanse";
//     transactionTypes[21] = "Konvertering";
//     transactionTypes[22] = "Reklassifisering";
//     transactionTypes[23] = "Innløsning";
//     transactionTypes[24] = "Aksjelån";
//     transactionTypes[25] = "Modenhet";
//     transactionTypes[26] = "Ny aksjeemisjon";
//     transactionTypes[27] = "Utstedelse in natura";
//     transactionTypes[28] = "Eiendomsdistribusjon";
//     transactionTypes[29] = "Innfrielsesalternativer";
//     transactionTypes[30] = "Arv";
//     transactionTypes[31] = "Sluttdato-opsjoner";
//     transactionTypes[32] = "Utbytte";
//     transactionTypes[33] = "Bonusutstedelse";
//     transactionTypes[34] = "Fusjon";
//     transactionTypes[35] = "Uttak";
//     transactionTypes[36] = "Deling av felleseie";
//     transactionTypes[37] = "Ny relatert selskap";
//     transactionTypes[38] = "Resultat";
//     transactionTypes[39] = "Klasseendring";
//     transactionTypes[40] = "Dirstribusjon";
//     transactionTypes[41] = "Anskaffelse";
//     transactionTypes[42] = "Aksje, future";
//     transactionTypes[43] = "Innløsning av futures";
//     transactionTypes[44] = "Uttak";
//     transactionTypes[45] = "Salg";
//     transactionTypes[46] = "Intern overf. VPC";
//     transactionTypes[47] = "Refusjon";
//     transactionTypes[48] = "Konvertering";
//     transactionTypes[49] = "Fisjon";
//     transactionTypes[50] = "Utbytte";
//     transactionTypes[51] = "Ansvarlig lån";
//     transactionTypes[52] = "Øvrig forandring";
//     transactionTypes[53] = "Avslutning av innsyn";

//     commentTypes["makulerad"] = "Cancelled";
//     commentTypes["reviderad"] = "Revised";

//     holderTypes[1] = "Egen";
//     holderTypes[2] = "Partner";
//     holderTypes[3] = "Juridisk person";
//     holderTypes[4] = "Barn";
//     holderTypes[5] = "Relatert selskap";
//     holderTypes[6] = "Samboer";


//     positionTypes[1] = "Adm.dir.";
//     positionTypes[2] = "Adm. dir. datterselskap";
//     positionTypes[3] = "Adm. dir. morselskap";
//     positionTypes[4] = "Viseadm. dir.";
//     positionTypes[5] = "Viseadm. dir. datterselskap";
//     positionTypes[6] = "Viseadm. dir. morselskap";
//     positionTypes[7] = "Styremedlem";
//     positionTypes[8] = "Styremedlem datterselskap";
//     positionTypes[9] = "Styremedlem morselskap";
//     positionTypes[10] = "Varamedlem styre";
//     positionTypes[11] = "Varamedlem styre datterselskap";
//     positionTypes[12] = "Varamedlem styre morselskap";
//     positionTypes[13] = "Revisor";
//     positionTypes[14] = "Revisor datterselskap";
//     positionTypes[15] = "Revisor morselskap";
//     positionTypes[16] = "Stedfortredende revisor";
//     positionTypes[17] = "Stedfortredende revisor datterselskap";
//     positionTypes[18] = "Stedfortredende revisor morselskap";
//     positionTypes[19] = "Større aksjonær";
//     positionTypes[20] = "Annen posisjon";
//     positionTypes[21] = "Annen posisjon datterselskap";
//     positionTypes[22] = "Annen posisjon morselskap";
//     positionTypes[23] = "Børsnotert selskap";


//     securityTypes[1] = "Aksje";
//     securityTypes[2] = "Aksje PR";
//     securityTypes[3] = "Kjøpsopsjon";
//     securityTypes[4] = "Salgsopsjon";
//     securityTypes[5] = "Framtidig aksjeportefølje ";
//     securityTypes[6] = "Syntetisk opsjon";
//     securityTypes[7] = "Amerikanske depotbevis";
//     securityTypes[8] = "Swedish depository receipts ";
//     securityTypes[9] = "Konverterbart";
//     securityTypes[10] = "Betalt abonnert aksje";
//     securityTypes[11] = "Mellomaksje";
//     securityTypes[12] = "Betalt abonnert enhet";
//     securityTypes[13] = "Enhetsrettighet";
//     securityTypes[14] = "Abonneringsrettinghet, aksje";
//     securityTypes[15] = "Abonnert opsjon";
//     securityTypes[16] = "Opsjonskvitteringer ";
//     securityTypes[17] = "Innløsningsrettigheter";
//     securityTypes[18] = "Spesielle rettigheter";
//     securityTypes[19] = "Andre derivater";
//     securityTypes[20] = "Delbevis";
//     securityTypes[21] = "Rentebærende verdipapir";
//     securityTypes[22] = "Innløsingsaksjer";
//     securityTypes[23] = "Konvertebare deltakersertfikater";
//     securityTypes[24] = "Salgsrettigheter";
//     securityTypes[25] = "Midlertidige sertifikater";
//     securityTypes[26] = "Delrett, aksje";
//     securityTypes[27] = "Betalt abonnert enhet";
//     securityTypes[28] = "Ansvarlig lån";
//     securityTypes[29] = "Indikerer 0 andeler";

//     return {
//         positionTypes: positionTypes,
//         holderTypes: holderTypes,
//         securityTypes: securityTypes,
//         transactionTypes: transactionTypes,
//         commentTypes: commentTypes
//     };
// }(jQuery);

// window.cision.websolution.texts["dk"].insidersDescriptions = function () {
//     var transactionTypes = [];
//     var positionTypes = [];
//     var holderTypes = [];
//     var securityTypes = [];
//     var commentTypes = [];

//     transactionTypes[0] = "Årsag ukendt på reg.tidspunkt.";
//     transactionTypes[1] = "Indberetning af aktiebeholdning";
//     transactionTypes[2] = "Køb";
//     transactionTypes[3] = "Salg";
//     transactionTypes[4] = "Korrektion op";
//     transactionTypes[5] = "Korrektion ned";
//     transactionTypes[6] = "Konvertering +";
//     transactionTypes[7] = "Konvertering -";
//     transactionTypes[8] = "Udløbsdato";
//     transactionTypes[9] = "Pulje (allotment)";
//     transactionTypes[10] = "Aktie investerings plan";
//     transactionTypes[11] = "Tegning";
//     transactionTypes[12] = "Udbytte";
//     transactionTypes[13] = "Tilbagekaldelse";
//     transactionTypes[14] = "Gave";
//     transactionTypes[15] = "Dispensation";
//     transactionTypes[16] = "Aktiesplit";
//     transactionTypes[17] = "Omvendt aktiesplit";
//     transactionTypes[18] = "Overførsel";
//     transactionTypes[19] = "Udstedt option";
//     transactionTypes[20] = "Åbningsbalance";
//     transactionTypes[21] = "Konvertering";
//     transactionTypes[22] = "Omgruppering";
//     transactionTypes[23] = "Indfrielse";
//     transactionTypes[24] = "Aktielån";
//     transactionTypes[25] = "Udløbsdato";
//     transactionTypes[26] = "Ny aktieudstedelse";
//     transactionTypes[27] = "Udstedelsestype";
//     transactionTypes[28] = "Formuefordeling";
//     transactionTypes[29] = "Aftalte optioner";
//     transactionTypes[30] = "Arv";
//     transactionTypes[31] = "Udløbsdato optioner";
//     transactionTypes[32] = "Udbytte";
//     transactionTypes[33] = "Emission af fondsaktier";
//     transactionTypes[34] = "Fusion";
//     transactionTypes[35] = "Tilbagekaldelse";
//     transactionTypes[36] = "Opdeling af ægteskabelig formue";
//     transactionTypes[37] = "Nyt partnerskab";
//     transactionTypes[38] = "Afkast";
//     transactionTypes[39] = "Ændring af klasse";
//     transactionTypes[40] = "Fordeling";
//     transactionTypes[41] = "Erhvervelse";
//     transactionTypes[42] = "Aktiefuture";
//     transactionTypes[43] = "Indfrielse af futures";
//     transactionTypes[44] = "Tilbagekaldelse";
//     transactionTypes[45] = "Salg";
//     transactionTypes[46] = "Intern overf. VPC (Sveriges Værdipapircentral)";
//     transactionTypes[47] = "Refundering";
//     transactionTypes[48] = "Konvertering";
//     transactionTypes[49] = "Spaltning";
//     transactionTypes[50] = "Utbytte";
//     transactionTypes[51] = "Efterstillet lån";
//     transactionTypes[52] = "Øvrige ændringer";
//     transactionTypes[53] = "Afslutning af indsigt";

//     commentTypes["makulerad"] = "Cancelled";
//     commentTypes["reviderad"] = "Revised";

//     holderTypes[1] = "Eget";
//     holderTypes[2] = "Ægtefælle";
//     holderTypes[3] = "Juridisk person";
//     holderTypes[4] = "Barn";
//     holderTypes[5] = "Beslægtet person";
//     holderTypes[6] = "Samboende";


//     positionTypes[1] = "Adm. direktør";
//     positionTypes[2] = "Adm. direktør, datterselskab";
//     positionTypes[3] = "Direktør, moderselskab";
//     positionTypes[4] = "Vicedirektør";
//     positionTypes[5] = "Vicedirektør, datterselskab";
//     positionTypes[6] = "Adm. direktør, moderselskab";
//     positionTypes[7] = "Bestyrelsesmedlem";
//     positionTypes[8] = "Bestyrelsesmedlem, datterselskab";
//     positionTypes[9] = "Bestyrelsesmedlem, moderselskab";
//     positionTypes[10] = "Alternativt bestyrelsesmedlem";
//     positionTypes[11] = "Alternativt bestyrelsesmedlem, datterselskab";
//     positionTypes[12] = "Alternativt bestyrelsesmedlem, moderselskab";
//     positionTypes[13] = "Revisor";
//     positionTypes[14] = "Revisor, datterselskab";
//     positionTypes[15] = "Revisor, moderselskab";
//     positionTypes[16] = "Assisterende revisor";
//     positionTypes[17] = "Assisterende revisor, datterselskab";
//     positionTypes[18] = "Assisterende revisor, moderselskab";
//     positionTypes[19] = "Indehaver af større aktiebeholdning";
//     positionTypes[20] = "Anden stilling";
//     positionTypes[21] = "Anden stilling, datterselskab";
//     positionTypes[22] = "Anden stilling, moderselskab";
//     positionTypes[23] = "Børsnoteret selskab";


//     securityTypes[1] = "Aktie";
//     securityTypes[2] = "Aktie, købsanmodning";
//     securityTypes[3] = "Købsrettighed (call option)";
//     securityTypes[4] = "Salgsrettighed (put option)";
//     securityTypes[5] = "Aktieoptioner ";
//     securityTypes[6] = "Syntetisk option";
//     securityTypes[7] = "Kvitteringer fra amerikansk værdipapircentral";
//     securityTypes[8] = "Swedish depository receipts ";
//     securityTypes[9] = "Konvertibel";
//     securityTypes[10] = "Betalt tegnet aktie";
//     securityTypes[11] = "Interim-aktie";
//     securityTypes[12] = "Betalt tegnet enhed";
//     securityTypes[13] = "Enhed, rettighed";
//     securityTypes[14] = "Tegningsret, aktie";
//     securityTypes[15] = "Tegnet option";
//     securityTypes[16] = "Optionskvitteringer";
//     securityTypes[17] = "Indfrielsesret";
//     securityTypes[18] = "Særrettighed";
//     securityTypes[19] = "andre afledte aktiver";
//     securityTypes[20] = "Delbevis";
//     securityTypes[21] = "Rentebærende værdipapir";
//     securityTypes[22] = "Indfrielsesaktie";
//     securityTypes[23] = "Konvertible deltagelsesbeviser";
//     securityTypes[24] = "Salgsrettighed";
//     securityTypes[25] = "Interim-beviser";
//     securityTypes[26] = "Delret, aktie";
//     securityTypes[27] = "Betalt tegnet konvertibel";
//     securityTypes[28] = "Efterstillet lån";
//     securityTypes[29] = "Indikerer 0 investeringer";

//     return {
//         positionTypes: positionTypes,
//         holderTypes: holderTypes,
//         securityTypes: securityTypes,
//         transactionTypes: transactionTypes,
//         commentTypes: commentTypes
//     };
// }(jQuery);

// window.cision.websolution.texts["de"].insidersDescriptions = function () {
//     var transactionTypes = [];
//     var positionTypes = [];
//     var holderTypes = [];
//     var securityTypes = [];
//     var commentTypes = [];

//     //incomplete translation 90% in english

//     transactionTypes[0] = "Grund zum Zeitpunkt der Reg. unbekannt";
//     transactionTypes[1] = "Holding-Mitteilung";
//     transactionTypes[2] = "Kauf, Einkauf";
//     transactionTypes[3] = "Verkauf";
//     transactionTypes[4] = "Korrektur nach oben";
//     transactionTypes[5] = "Korrektur nach unten";
//     transactionTypes[6] = "Umwandlung +";
//     transactionTypes[7] = "Umwandllung -";
//     transactionTypes[8] = "Ablauf";
//     transactionTypes[9] = "Zuteilung";
//     transactionTypes[10] = "Aktien Investitions plan";
//     transactionTypes[11] = "Abonnement";
//     transactionTypes[12] = "Dividende";
//     transactionTypes[13] = "Withdrawal";
//     transactionTypes[14] = "Gift";
//     transactionTypes[15] = "Exemption";
//     transactionTypes[16] = "Split";
//     transactionTypes[17] = "Reverse split";
//     transactionTypes[18] = "Transfer";
//     transactionTypes[19] = "Issued option";
//     transactionTypes[20] = "Opening balance";
//     transactionTypes[21] = "Conversion";
//     transactionTypes[22] = "Reclassification";
//     transactionTypes[23] = "Redemption";
//     transactionTypes[24] = "Share loan";
//     transactionTypes[25] = "Maturity";
//     transactionTypes[26] = "New Share issue";
//     transactionTypes[27] = "Issue in kind";
//     transactionTypes[28] = "Estate distribution";
//     transactionTypes[29] = " Exercised options";
//     transactionTypes[30] = " Inheritance";
//     transactionTypes[31] = "End date options";
//     transactionTypes[32] = "Dividend";
//     transactionTypes[33] = "Bonus issue";
//     transactionTypes[34] = "Fusion";
//     transactionTypes[35] = "Withdrawal";
//     transactionTypes[36] = "Division of matrimonial property";
//     transactionTypes[37] = "New related party";
//     transactionTypes[38] = "Yield";
//     transactionTypes[39] = "Class change";
//     transactionTypes[40] = "Distribution";
//     transactionTypes[41] = "Acquisition";
//     transactionTypes[42] = "Share future";
//     transactionTypes[43] = "Redemption of futures";
//     transactionTypes[44] = "Withdrawal";
//     transactionTypes[45] = "Sale";
//     transactionTypes[46] = "Interna överf VPC";
//     transactionTypes[47] = "Refund";
//     transactionTypes[48] = "Conversion";
//     transactionTypes[49] = "Fission";
//     transactionTypes[50] = "Utbyte";
//     transactionTypes[51] = "Subordinated loan";
//     transactionTypes[52] = "Övrig förändring";
//     transactionTypes[53] = "Avslut av insyn";

//     commentTypes["makulerad"] = "Cancelled";
//     commentTypes["reviderad"] = "Revised";

//     holderTypes[1] = "Own";
//     holderTypes[2] = "Spouse";
//     holderTypes[3] = "Legal person";
//     holderTypes[4] = "Child";
//     holderTypes[5] = "Related party";
//     holderTypes[6] = "Cohabitee";


//     positionTypes[1] = "MD";
//     positionTypes[2] = "MD subsidiary";
//     positionTypes[3] = "MD parent firm";
//     positionTypes[4] = "Deputy MD";
//     positionTypes[5] = "Deputy MD subsidiary";
//     positionTypes[6] = "Deputy MD parent firm";
//     positionTypes[7] = "Board member";
//     positionTypes[8] = "Board member subsidiary";
//     positionTypes[9] = "Board member parent firm";
//     positionTypes[10] = " Alt. board member ";
//     positionTypes[11] = " Alt. board member subsidiary";
//     positionTypes[12] = "Alt. board member parent firm";
//     positionTypes[13] = "Auditor";
//     positionTypes[14] = "Auditor subsidiary";
//     positionTypes[15] = "Auditor parent firm";
//     positionTypes[16] = "Deputy Auditor";
//     positionTypes[17] = "Deputy Auditor subsidiary";
//     positionTypes[18] = "Deputy Auditor parent firm";
//     positionTypes[19] = "Larger Shareholder";
//     positionTypes[20] = "Other position";
//     positionTypes[21] = "Other position subsidiary";
//     positionTypes[22] = "Other position parent firm";
//     positionTypes[23] = "Listed company";


//     securityTypes[1] = "Share";
//     securityTypes[2] = "Share  PR";
//     securityTypes[3] = "Call option";
//     securityTypes[4] = "Put option";
//     securityTypes[5] = "Stock futures ";
//     securityTypes[6] = "Synthetic option";
//     securityTypes[7] = "American depository receipts";
//     securityTypes[8] = "Swedish depository receipts ";
//     securityTypes[9] = "Convertible";
//     securityTypes[10] = "Payed subscribed share";
//     securityTypes[11] = "Interim share";
//     securityTypes[12] = "Payed subscribed unit";
//     securityTypes[13] = "Unit right";
//     securityTypes[14] = "Subscription right, share";
//     securityTypes[15] = "Subscribed option";
//     securityTypes[16] = "Option receipts ";
//     securityTypes[17] = "Redemption right";
//     securityTypes[18] = "Special right";
//     securityTypes[19] = "other derivat";
//     securityTypes[20] = "Delbevis";
//     securityTypes[21] = "Interest bearing security";
//     securityTypes[22] = "Redemption share";
//     securityTypes[23] = "Convertible participation certificates";
//     securityTypes[24] = "Sale right";
//     securityTypes[25] = "Interim certificates";
//     securityTypes[26] = "Delrätt, aktie";
//     securityTypes[27] = "Payed subscribed convertible";
//     securityTypes[28] = "Subordinated loan";
//     securityTypes[29] = " Indicates 0 holdings";

//     return {
//         positionTypes: positionTypes,
//         holderTypes: holderTypes,
//         securityTypes: securityTypes,
//         transactionTypes: transactionTypes,
//         commentTypes: commentTypes
//     };
// }(jQuery);