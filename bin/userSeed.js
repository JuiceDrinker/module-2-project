const mongoose = require("mongoose");
const User = require("./../models/User");
const dbName = "cocktail-me";

const users = [
  {
    username: "CobbBullock",
    password: "PrestonNewton",
    email: "prestonnewton@icology.com"
  },
  {
    username: "RosarioGeorge",
    password: "OliviaWooten",
    email: "oliviawooten@icology.com"
  },
  {
    username: "LaraHendrix",
    password: "IlaHill",
    email: "ilahill@icology.com"
  },
  {
    username: "VincentFleming",
    password: "CecileMays",
    email: "cecilemays@icology.com"
  },
  {
    username: "DelgadoStone",
    password: "BrigitteManning",
    email: "brigittemanning@icology.com"
  },
  {
    username: "ChristineErickson",
    password: "GarzaLawrence",
    email: "garzalawrence@icology.com"
  },
  {
    username: "MeredithSmith",
    password: "BaldwinMcbride",
    email: "baldwinmcbride@icology.com"
  },
  {
    username: "HardingFrederick",
    password: "HillBlankenship",
    email: "hillblankenship@icology.com"
  },
  {
    username: "CamilleBurns",
    password: "HawkinsPope",
    email: "hawkinspope@icology.com"
  },
  {
    username: "BeatrizGuthrie",
    password: "WhiteMorrison",
    email: "whitemorrison@icology.com"
  },
  {
    username: "LeticiaBridges",
    password: "OlsonWhitfield",
    email: "olsonwhitfield@icology.com"
  },
  {
    username: "RoweMckee",
    password: "AlyssaPerez",
    email: "alyssaperez@icology.com"
  },
  {
    username: "KimDouglas",
    password: "SavageClarke",
    email: "savageclarke@icology.com"
  },
  {
    username: "CassieStanley",
    password: "CoteChen",
    email: "cotechen@icology.com"
  },
  {
    username: "MaxineSampson",
    password: "AlishaGamble",
    email: "alishagamble@icology.com"
  },
  {
    username: "MendezPorter",
    password: "JoannCameron",
    email: "joanncameron@icology.com"
  },
  {
    username: "AtkinsonHickman",
    password: "BarberWard",
    email: "barberward@icology.com"
  },
  {
    username: "CantrellVelazquez",
    password: "HaneyRiddle",
    email: "haneyriddle@icology.com"
  },
  {
    username: "CombsNeal",
    password: "LenoreUnderwood",
    email: "lenoreunderwood@icology.com"
  },
  {
    username: "FieldsRodriquez",
    password: "ContrerasKirby",
    email: "contreraskirby@icology.com"
  },
  {
    username: "HazelHartman",
    password: "EsmeraldaMcguire",
    email: "esmeraldamcguire@icology.com"
  },
  {
    username: "CollierHart",
    password: "DeckerGarza",
    email: "deckergarza@icology.com"
  },
  {
    username: "MaldonadoAvila",
    password: "JennieLindsay",
    email: "jennielindsay@icology.com"
  },
  {
    username: "SpenceJames",
    password: "RodgersVelez",
    email: "rodgersvelez@icology.com"
  },
  {
    username: "HelgaPittman",
    password: "DonaBurton",
    email: "donaburton@icology.com"
  },
  {
    username: "AlvarezBryan",
    password: "PauletteJackson",
    email: "paulettejackson@icology.com"
  },
  {
    username: "GarrisonConrad",
    password: "ObrienShannon",
    email: "obrienshannon@icology.com"
  },
  {
    username: "IvyJuarez",
    password: "LoweryAdams",
    email: "loweryadams@icology.com"
  },
  {
    username: "NataliaHernandez",
    password: "OneillBowman",
    email: "oneillbowman@icology.com"
  },
  {
    username: "AdrianaDunlap",
    password: "HendrixHolloway",
    email: "hendrixholloway@icology.com"
  },
  {
    username: "BrendaBest",
    password: "PeckWilliams",
    email: "peckwilliams@icology.com"
  },
  {
    username: "JohannaHawkins",
    password: "HopeNixon",
    email: "hopenixon@icology.com"
  },
  {
    username: "CorrineBailey",
    password: "SantanaBush",
    email: "santanabush@icology.com"
  },
  {
    username: "DillardCunningham",
    password: "FisherMarquez",
    email: "fishermarquez@icology.com"
  },
  {
    username: "TiaParsons",
    password: "GarrettDotson",
    email: "garrettdotson@icology.com"
  },
  {
    username: "VeronicaGuerrero",
    password: "KentPayne",
    email: "kentpayne@icology.com"
  },
  {
    username: "MasseyRios",
    password: "LeilaBaird",
    email: "leilabaird@icology.com"
  },
  {
    username: "CarpenterDudley",
    password: "LatishaMejia",
    email: "latishamejia@icology.com"
  },
  {
    username: "MannHayes",
    password: "RoseWynn",
    email: "rosewynn@icology.com"
  },
  {
    username: "TammyWalls",
    password: "TessaBooth",
    email: "tessabooth@icology.com"
  },
  {
    username: "FrancesHardy",
    password: "RichardsDuke",
    email: "richardsduke@icology.com"
  },
  {
    username: "HarringtonGaines",
    password: "McconnellLott",
    email: "mcconnelllott@icology.com"
  },
  {
    username: "BettyWorkman",
    password: "LilianaBoone",
    email: "lilianaboone@icology.com"
  },
  {
    username: "FarrellMoreno",
    password: "OpheliaBurnett",
    email: "opheliaburnett@icology.com"
  },
  {
    username: "StevensPerry",
    password: "JensenObrien",
    email: "jensenobrien@icology.com"
  },
  {
    username: "AndersonHinton",
    password: "LethaWare",
    email: "lethaware@icology.com"
  },
  {
    username: "OrtizBowen",
    password: "JoleneJohns",
    email: "jolenejohns@icology.com"
  },
  {
    username: "AvisMcconnell",
    password: "BryantSalas",
    email: "bryantsalas@icology.com"
  },
  {
    username: "LeonSchroeder",
    password: "BradleyReynolds",
    email: "bradleyreynolds@icology.com"
  },
  {
    username: "AbigailPate",
    password: "GabrielaGolden",
    email: "gabrielagolden@icology.com"
  },
  {
    username: "NguyenStanton",
    password: "HoldenBarton",
    email: "holdenbarton@icology.com"
  },
  {
    username: "RosellaMckinney",
    password: "NitaPeck",
    email: "nitapeck@icology.com"
  },
  {
    username: "KirbyMartin",
    password: "AmberHowell",
    email: "amberhowell@icology.com"
  },
  {
    username: "LoriWiggins",
    password: "IsabellaBishop",
    email: "isabellabishop@icology.com"
  },
  {
    username: "AmparoStout",
    password: "NormanWhitley",
    email: "normanwhitley@icology.com"
  },
  {
    username: "NewtonHuff",
    password: "JoanneTerrell",
    email: "joanneterrell@icology.com"
  },
  {
    username: "MilesHewitt",
    password: "AureliaAndrews",
    email: "aureliaandrews@icology.com"
  },
  {
    username: "TheresaBonner",
    password: "MorganCalhoun",
    email: "morgancalhoun@icology.com"
  },
  {
    username: "LanaMacias",
    password: "KnightJustice",
    email: "knightjustice@icology.com"
  },
  {
    username: "ColeenMathews",
    password: "AndrewsMcgowan",
    email: "andrewsmcgowan@icology.com"
  },
  {
    username: "ShelleyDavis",
    password: "LacyGraves",
    email: "lacygraves@icology.com"
  },
  {
    username: "SimonOrtiz",
    password: "ClaudineMiddleton",
    email: "claudinemiddleton@icology.com"
  },
  {
    username: "NortonNieves",
    password: "LittleHale",
    email: "littlehale@icology.com"
  },
  {
    username: "GonzalezRivas",
    password: "GracielaJordan",
    email: "gracielajordan@icology.com"
  },
  {
    username: "BrewerBaxter",
    password: "RushBurks",
    email: "rushburks@icology.com"
  },
  {
    username: "HintonCash",
    password: "LevyGood",
    email: "levygood@icology.com"
  },
  {
    username: "ScottWyatt",
    password: "LeannGarrison",
    email: "leanngarrison@icology.com"
  },
  {
    username: "MyersVega",
    password: "GriffinWaller",
    email: "griffinwaller@icology.com"
  },
  {
    username: "JenkinsAbbott",
    password: "GillNoble",
    email: "gillnoble@icology.com"
  },
  {
    username: "MalloryMonroe",
    password: "NoreenEvans",
    email: "noreenevans@icology.com"
  },
  {
    username: "RitaValenzuela",
    password: "MoranCoffey",
    email: "morancoffey@icology.com"
  },
  {
    username: "WoodwardJenkins",
    password: "TillmanTaylor",
    email: "tillmantaylor@icology.com"
  },
  {
    username: "HortonMcclure",
    password: "OlgaSantana",
    email: "olgasantana@icology.com"
  },
  {
    username: "SharleneHarding",
    password: "LoraineSkinner",
    email: "loraineskinner@icology.com"
  },
  {
    username: "JaniceRamos",
    password: "PaulineRojas",
    email: "paulinerojas@icology.com"
  },
  {
    username: "GloverHines",
    password: "VaughnFitzgerald",
    email: "vaughnfitzgerald@icology.com"
  },
  {
    username: "CaitlinMarks",
    password: "JasmineKey",
    email: "jasminekey@icology.com"
  },
  {
    username: "FranklinNicholson",
    password: "PalmerMacdonald",
    email: "palmermacdonald@icology.com"
  },
  {
    username: "BooneTodd",
    password: "WandaHoward",
    email: "wandahoward@icology.com"
  },
  {
    username: "WhitakerBates",
    password: "MosleyKline",
    email: "mosleykline@icology.com"
  },
  {
    username: "RaquelWest",
    password: "CamachoCole",
    email: "camachocole@icology.com"
  },
  {
    username: "AmeliaShepard",
    password: "MarianaWalter",
    email: "marianawalter@icology.com"
  },
  {
    username: "FischerLuna",
    password: "PittsMayo",
    email: "pittsmayo@icology.com"
  },
  {
    username: "TamaraBoyle",
    password: "RoyGlass",
    email: "royglass@icology.com"
  },
  {
    username: "BoydSykes",
    password: "GriffithFrancis",
    email: "griffithfrancis@icology.com"
  },
  {
    username: "TranMiles",
    password: "RosaRice",
    email: "rosarice@icology.com"
  },
  {
    username: "BishopBradley",
    password: "MeganYang",
    email: "meganyang@icology.com"
  },
  {
    username: "PenaHolman",
    password: "PerezBruce",
    email: "perezbruce@icology.com"
  },
  {
    username: "HubbardMcfadden",
    password: "KeriBowers",
    email: "keribowers@icology.com"
  },
  {
    username: "DeborahScott",
    password: "HarriettWolfe",
    email: "harriettwolfe@icology.com"
  },
  {
    username: "McneilFinley",
    password: "AgnesCabrera",
    email: "agnescabrera@icology.com"
  },
  {
    username: "OpalNichols",
    password: "GretchenHudson",
    email: "gretchenhudson@icology.com"
  },
  {
    username: "AngeliqueTillman",
    password: "FranIngram",
    email: "franingram@icology.com"
  },
  {
    username: "MauraJennings",
    password: "KatieSears",
    email: "katiesears@icology.com"
  },
  {
    username: "DoloresFulton",
    password: "BowmanDurham",
    email: "bowmandurham@icology.com"
  },
  {
    username: "BushSellers",
    password: "KristaSummers",
    email: "kristasummers@icology.com"
  },
  {
    username: "HoweMaddox",
    password: "HartWelch",
    email: "hartwelch@icology.com"
  },
  {
    username: "KerriGuy",
    password: "BrianaWood",
    email: "brianawood@icology.com"
  },
  {
    username: "GrahamFowler",
    password: "DanielleConley",
    email: "danielleconley@icology.com"
  },
  {
    username: "KathyMeyers",
    password: "GentryPetersen",
    email: "gentrypetersen@icology.com"
  }
];

mongoose
  .connect(`mongodb://localhost/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    return User.create(users);
  })
  .then(createdUsers => {
    console.log(`Inserted ${createdUsers.length} into database`);
  })
  .then(() => mongoose.connection.close())
  .then(() => {
    console.log("Connection closed succesfully!");
  })
  .catch(err => {
    console.log(err);
  });
