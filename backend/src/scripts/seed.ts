import dotenv from 'dotenv';
import connectDB from '../config/db';
import Type from '../models/Type';
import Pokemon from '../models/Pokemon';

dotenv.config();

// dados_iniciais.json do desafio
const pokemonsData = [
    {
        "codigo": 1,
        "nome": "bulbasaur",
        "tipo_primario": "grass",
        "tipo_secundario": "poison"
    },
    {
        "codigo": 2,
        "nome": "ivysaur",
        "tipo_primario": "grass",
        "tipo_secundario": "poison"
    },
    {
        "codigo": 3,
        "nome": "venusaur",
        "tipo_primario": "grass",
        "tipo_secundario": "poison"
    },
    {
        "codigo": 4,
        "nome": "charmander",
        "tipo_primario": "fire",
        "tipo_secundario": null
    },
    {
        "codigo": 5,
        "nome": "charmeleon",
        "tipo_primario": "fire",
        "tipo_secundario": null
    },
    {
        "codigo": 6,
        "nome": "charizard",
        "tipo_primario": "fire",
        "tipo_secundario": "flying"
    },
    {
        "codigo": 7,
        "nome": "squirtle",
        "tipo_primario": "water",
        "tipo_secundario": null
    },
    {
        "codigo": 8,
        "nome": "wartortle",
        "tipo_primario": "water",
        "tipo_secundario": null
    },
    {
        "codigo": 9,
        "nome": "blastoise",
        "tipo_primario": "water",
        "tipo_secundario": null
    },
    {
        "codigo": 10,
        "nome": "caterpie",
        "tipo_primario": "bug",
        "tipo_secundario": null
    },
    {
        "codigo": 11,
        "nome": "metapod",
        "tipo_primario": "bug",
        "tipo_secundario": null
    },
    {
        "codigo": 12,
        "nome": "butterfree",
        "tipo_primario": "bug",
        "tipo_secundario": "flying"
    },
    {
        "codigo": 13,
        "nome": "weedle",
        "tipo_primario": "bug",
        "tipo_secundario": "poison"
    },
    {
        "codigo": 14,
        "nome": "kakuna",
        "tipo_primario": "bug",
        "tipo_secundario": "poison"
    },
    {
        "codigo": 15,
        "nome": "beedrill",
        "tipo_primario": "bug",
        "tipo_secundario": "poison"
    },
    {
        "codigo": 16,
        "nome": "pidgey",
        "tipo_primario": "normal",
        "tipo_secundario": "flying"
    },
    {
        "codigo": 17,
        "nome": "pidgeotto",
        "tipo_primario": "normal",
        "tipo_secundario": "flying"
    },
    {
        "codigo": 18,
        "nome": "pidgeot",
        "tipo_primario": "normal",
        "tipo_secundario": "flying"
    },
    {
        "codigo": 19,
        "nome": "rattata",
        "tipo_primario": "normal",
        "tipo_secundario": null
    },
    {
        "codigo": 20,
        "nome": "raticate",
        "tipo_primario": "normal",
        "tipo_secundario": null
    },
    {
        "codigo": 21,
        "nome": "spearow",
        "tipo_primario": "normal",
        "tipo_secundario": "flying"
    },
    {
        "codigo": 22,
        "nome": "fearow",
        "tipo_primario": "normal",
        "tipo_secundario": "flying"
    },
    {
        "codigo": 23,
        "nome": "ekans",
        "tipo_primario": "poison",
        "tipo_secundario": null
    },
    {
        "codigo": 24,
        "nome": "arbok",
        "tipo_primario": "poison",
        "tipo_secundario": null
    },
    {
        "codigo": 25,
        "nome": "pikachu",
        "tipo_primario": "electric",
        "tipo_secundario": null
    },
    {
        "codigo": 26,
        "nome": "raichu",
        "tipo_primario": "electric",
        "tipo_secundario": null
    },
    {
        "codigo": 27,
        "nome": "sandshrew",
        "tipo_primario": "ground",
        "tipo_secundario": null
    },
    {
        "codigo": 28,
        "nome": "sandslash",
        "tipo_primario": "ground",
        "tipo_secundario": null
    },
    {
        "codigo": 29,
        "nome": "nidoran-f",
        "tipo_primario": "poison",
        "tipo_secundario": null
    },
    {
        "codigo": 30,
        "nome": "nidorina",
        "tipo_primario": "poison",
        "tipo_secundario": null
    },
    {
        "codigo": 31,
        "nome": "nidoqueen",
        "tipo_primario": "poison",
        "tipo_secundario": "ground"
    },
    {
        "codigo": 32,
        "nome": "nidoran-m",
        "tipo_primario": "poison",
        "tipo_secundario": null
    },
    {
        "codigo": 33,
        "nome": "nidorino",
        "tipo_primario": "poison",
        "tipo_secundario": null
    },
    {
        "codigo": 34,
        "nome": "nidoking",
        "tipo_primario": "poison",
        "tipo_secundario": "ground"
    },
    {
        "codigo": 35,
        "nome": "clefairy",
        "tipo_primario": "fairy",
        "tipo_secundario": null
    },
    {
        "codigo": 36,
        "nome": "clefable",
        "tipo_primario": "fairy",
        "tipo_secundario": null
    },
    {
        "codigo": 37,
        "nome": "vulpix",
        "tipo_primario": "fire",
        "tipo_secundario": null
    },
    {
        "codigo": 38,
        "nome": "ninetales",
        "tipo_primario": "fire",
        "tipo_secundario": null
    },
    {
        "codigo": 39,
        "nome": "jigglypuff",
        "tipo_primario": "normal",
        "tipo_secundario": "fairy"
    },
    {
        "codigo": 40,
        "nome": "wigglytuff",
        "tipo_primario": "normal",
        "tipo_secundario": "fairy"
    },
    {
        "codigo": 41,
        "nome": "zubat",
        "tipo_primario": "poison",
        "tipo_secundario": "flying"
    },
    {
        "codigo": 42,
        "nome": "golbat",
        "tipo_primario": "poison",
        "tipo_secundario": "flying"
    },
    {
        "codigo": 43,
        "nome": "oddish",
        "tipo_primario": "grass",
        "tipo_secundario": "poison"
    },
    {
        "codigo": 44,
        "nome": "gloom",
        "tipo_primario": "grass",
        "tipo_secundario": "poison"
    },
    {
        "codigo": 45,
        "nome": "vileplume",
        "tipo_primario": "grass",
        "tipo_secundario": "poison"
    },
    {
        "codigo": 46,
        "nome": "paras",
        "tipo_primario": "bug",
        "tipo_secundario": "grass"
    },
    {
        "codigo": 47,
        "nome": "parasect",
        "tipo_primario": "bug",
        "tipo_secundario": "grass"
    },
    {
        "codigo": 48,
        "nome": "venonat",
        "tipo_primario": "bug",
        "tipo_secundario": "poison"
    },
    {
        "codigo": 49,
        "nome": "venomoth",
        "tipo_primario": "bug",
        "tipo_secundario": "poison"
    },
    {
        "codigo": 50,
        "nome": "diglett",
        "tipo_primario": "ground",
        "tipo_secundario": null
    },
    {
        "codigo": 51,
        "nome": "dugtrio",
        "tipo_primario": "ground",
        "tipo_secundario": null
    },
    {
        "codigo": 52,
        "nome": "meowth",
        "tipo_primario": "normal",
        "tipo_secundario": null
    },
    {
        "codigo": 53,
        "nome": "persian",
        "tipo_primario": "normal",
        "tipo_secundario": null
    },
    {
        "codigo": 54,
        "nome": "psyduck",
        "tipo_primario": "water",
        "tipo_secundario": null
    },
    {
        "codigo": 55,
        "nome": "golduck",
        "tipo_primario": "water",
        "tipo_secundario": null
    },
    {
        "codigo": 56,
        "nome": "mankey",
        "tipo_primario": "fighting",
        "tipo_secundario": null
    },
    {
        "codigo": 57,
        "nome": "primeape",
        "tipo_primario": "fighting",
        "tipo_secundario": null
    },
    {
        "codigo": 58,
        "nome": "growlithe",
        "tipo_primario": "fire",
        "tipo_secundario": null
    },
    {
        "codigo": 59,
        "nome": "arcanine",
        "tipo_primario": "fire",
        "tipo_secundario": null
    },
    {
        "codigo": 60,
        "nome": "poliwag",
        "tipo_primario": "water",
        "tipo_secundario": null
    },
    {
        "codigo": 61,
        "nome": "poliwhirl",
        "tipo_primario": "water",
        "tipo_secundario": null
    },
    {
        "codigo": 62,
        "nome": "poliwrath",
        "tipo_primario": "water",
        "tipo_secundario": "fighting"
    },
    {
        "codigo": 63,
        "nome": "abra",
        "tipo_primario": "psychic",
        "tipo_secundario": null
    },
    {
        "codigo": 64,
        "nome": "kadabra",
        "tipo_primario": "psychic",
        "tipo_secundario": null
    },
    {
        "codigo": 65,
        "nome": "alakazam",
        "tipo_primario": "psychic",
        "tipo_secundario": null
    },
    {
        "codigo": 66,
        "nome": "machop",
        "tipo_primario": "fighting",
        "tipo_secundario": null
    },
    {
        "codigo": 67,
        "nome": "machoke",
        "tipo_primario": "fighting",
        "tipo_secundario": null
    },
    {
        "codigo": 68,
        "nome": "machamp",
        "tipo_primario": "fighting",
        "tipo_secundario": null
    },
    {
        "codigo": 69,
        "nome": "bellsprout",
        "tipo_primario": "grass",
        "tipo_secundario": "poison"
    },
    {
        "codigo": 70,
        "nome": "weepinbell",
        "tipo_primario": "grass",
        "tipo_secundario": "poison"
    },
    {
        "codigo": 71,
        "nome": "victreebel",
        "tipo_primario": "grass",
        "tipo_secundario": "poison"
    },
    {
        "codigo": 72,
        "nome": "tentacool",
        "tipo_primario": "water",
        "tipo_secundario": "poison"
    },
    {
        "codigo": 73,
        "nome": "tentacruel",
        "tipo_primario": "water",
        "tipo_secundario": "poison"
    },
    {
        "codigo": 74,
        "nome": "geodude",
        "tipo_primario": "rock",
        "tipo_secundario": "ground"
    },
    {
        "codigo": 75,
        "nome": "graveler",
        "tipo_primario": "rock",
        "tipo_secundario": "ground"
    },
    {
        "codigo": 76,
        "nome": "golem",
        "tipo_primario": "rock",
        "tipo_secundario": "ground"
    },
    {
        "codigo": 77,
        "nome": "ponyta",
        "tipo_primario": "fire",
        "tipo_secundario": null
    },
    {
        "codigo": 78,
        "nome": "rapidash",
        "tipo_primario": "fire",
        "tipo_secundario": null
    },
    {
        "codigo": 79,
        "nome": "slowpoke",
        "tipo_primario": "water",
        "tipo_secundario": "psychic"
    },
    {
        "codigo": 80,
        "nome": "slowbro",
        "tipo_primario": "water",
        "tipo_secundario": "psychic"
    },
    {
        "codigo": 81,
        "nome": "magnemite",
        "tipo_primario": "electric",
        "tipo_secundario": "steel"
    },
    {
        "codigo": 82,
        "nome": "magneton",
        "tipo_primario": "electric",
        "tipo_secundario": "steel"
    },
    {
        "codigo": 83,
        "nome": "farfetchd",
        "tipo_primario": "normal",
        "tipo_secundario": "flying"
    },
    {
        "codigo": 84,
        "nome": "doduo",
        "tipo_primario": "normal",
        "tipo_secundario": "flying"
    },
    {
        "codigo": 85,
        "nome": "dodrio",
        "tipo_primario": "normal",
        "tipo_secundario": "flying"
    },
    {
        "codigo": 86,
        "nome": "seel",
        "tipo_primario": "water",
        "tipo_secundario": null
    },
    {
        "codigo": 87,
        "nome": "dewgong",
        "tipo_primario": "water",
        "tipo_secundario": "ice"
    },
    {
        "codigo": 88,
        "nome": "grimer",
        "tipo_primario": "poison",
        "tipo_secundario": null
    },
    {
        "codigo": 89,
        "nome": "muk",
        "tipo_primario": "poison",
        "tipo_secundario": null
    },
    {
        "codigo": 90,
        "nome": "shellder",
        "tipo_primario": "water",
        "tipo_secundario": null
    },
    {
        "codigo": 91,
        "nome": "cloyster",
        "tipo_primario": "water",
        "tipo_secundario": "ice"
    },
    {
        "codigo": 92,
        "nome": "gastly",
        "tipo_primario": "ghost",
        "tipo_secundario": "poison"
    },
    {
        "codigo": 93,
        "nome": "haunter",
        "tipo_primario": "ghost",
        "tipo_secundario": "poison"
    },
    {
        "codigo": 94,
        "nome": "gengar",
        "tipo_primario": "ghost",
        "tipo_secundario": "poison"
    },
    {
        "codigo": 95,
        "nome": "onix",
        "tipo_primario": "rock",
        "tipo_secundario": "ground"
    },
    {
        "codigo": 96,
        "nome": "drowzee",
        "tipo_primario": "psychic",
        "tipo_secundario": null
    },
    {
        "codigo": 97,
        "nome": "hypno",
        "tipo_primario": "psychic",
        "tipo_secundario": null
    },
    {
        "codigo": 98,
        "nome": "krabby",
        "tipo_primario": "water",
        "tipo_secundario": null
    },
    {
        "codigo": 99,
        "nome": "kingler",
        "tipo_primario": "water",
        "tipo_secundario": null
    },
    {
        "codigo": 100,
        "nome": "voltorb",
        "tipo_primario": "electric",
        "tipo_secundario": null
    },
    {
        "codigo": 101,
        "nome": "electrode",
        "tipo_primario": "electric",
        "tipo_secundario": null
    },
    {
        "codigo": 102,
        "nome": "exeggcute",
        "tipo_primario": "grass",
        "tipo_secundario": "psychic"
    },
    {
        "codigo": 103,
        "nome": "exeggutor",
        "tipo_primario": "grass",
        "tipo_secundario": "psychic"
    },
    {
        "codigo": 104,
        "nome": "cubone",
        "tipo_primario": "ground",
        "tipo_secundario": null
    },
    {
        "codigo": 105,
        "nome": "marowak",
        "tipo_primario": "ground",
        "tipo_secundario": null
    },
    {
        "codigo": 106,
        "nome": "hitmonlee",
        "tipo_primario": "fighting",
        "tipo_secundario": null
    },
    {
        "codigo": 107,
        "nome": "hitmonchan",
        "tipo_primario": "fighting",
        "tipo_secundario": null
    },
    {
        "codigo": 108,
        "nome": "lickitung",
        "tipo_primario": "normal",
        "tipo_secundario": null
    },
    {
        "codigo": 109,
        "nome": "koffing",
        "tipo_primario": "poison",
        "tipo_secundario": null
    },
    {
        "codigo": 110,
        "nome": "weezing",
        "tipo_primario": "poison",
        "tipo_secundario": null
    },
    {
        "codigo": 111,
        "nome": "rhyhorn",
        "tipo_primario": "ground",
        "tipo_secundario": "rock"
    },
    {
        "codigo": 112,
        "nome": "rhydon",
        "tipo_primario": "ground",
        "tipo_secundario": "rock"
    },
    {
        "codigo": 113,
        "nome": "chansey",
        "tipo_primario": "normal",
        "tipo_secundario": null
    },
    {
        "codigo": 114,
        "nome": "tangela",
        "tipo_primario": "grass",
        "tipo_secundario": null
    },
    {
        "codigo": 115,
        "nome": "kangaskhan",
        "tipo_primario": "normal",
        "tipo_secundario": null
    },
    {
        "codigo": 116,
        "nome": "horsea",
        "tipo_primario": "water",
        "tipo_secundario": null
    },
    {
        "codigo": 117,
        "nome": "seadra",
        "tipo_primario": "water",
        "tipo_secundario": null
    },
    {
        "codigo": 118,
        "nome": "goldeen",
        "tipo_primario": "water",
        "tipo_secundario": null
    },
    {
        "codigo": 119,
        "nome": "seaking",
        "tipo_primario": "water",
        "tipo_secundario": null
    },
    {
        "codigo": 120,
        "nome": "staryu",
        "tipo_primario": "water",
        "tipo_secundario": null
    },
    {
        "codigo": 121,
        "nome": "starmie",
        "tipo_primario": "water",
        "tipo_secundario": "psychic"
    },
    {
        "codigo": 122,
        "nome": "mr-mime",
        "tipo_primario": "psychic",
        "tipo_secundario": "fairy"
    },
    {
        "codigo": 123,
        "nome": "scyther",
        "tipo_primario": "bug",
        "tipo_secundario": "flying"
    },
    {
        "codigo": 124,
        "nome": "jynx",
        "tipo_primario": "ice",
        "tipo_secundario": "psychic"
    },
    {
        "codigo": 125,
        "nome": "electabuzz",
        "tipo_primario": "electric",
        "tipo_secundario": null
    },
    {
        "codigo": 126,
        "nome": "magmar",
        "tipo_primario": "fire",
        "tipo_secundario": null
    },
    {
        "codigo": 127,
        "nome": "pinsir",
        "tipo_primario": "bug",
        "tipo_secundario": null
    },
    {
        "codigo": 128,
        "nome": "tauros",
        "tipo_primario": "normal",
        "tipo_secundario": null
    },
    {
        "codigo": 129,
        "nome": "magikarp",
        "tipo_primario": "water",
        "tipo_secundario": null
    },
    {
        "codigo": 130,
        "nome": "gyarados",
        "tipo_primario": "water",
        "tipo_secundario": "flying"
    },
    {
        "codigo": 131,
        "nome": "lapras",
        "tipo_primario": "water",
        "tipo_secundario": "ice"
    },
    {
        "codigo": 132,
        "nome": "ditto",
        "tipo_primario": "normal",
        "tipo_secundario": null
    },
    {
        "codigo": 133,
        "nome": "eevee",
        "tipo_primario": "normal",
        "tipo_secundario": null
    },
    {
        "codigo": 134,
        "nome": "vaporeon",
        "tipo_primario": "water",
        "tipo_secundario": null
    },
    {
        "codigo": 135,
        "nome": "jolteon",
        "tipo_primario": "electric",
        "tipo_secundario": null
    },
    {
        "codigo": 136,
        "nome": "flareon",
        "tipo_primario": "fire",
        "tipo_secundario": null
    },
    {
        "codigo": 137,
        "nome": "porygon",
        "tipo_primario": "normal",
        "tipo_secundario": null
    },
    {
        "codigo": 138,
        "nome": "omanyte",
        "tipo_primario": "rock",
        "tipo_secundario": "water"
    },
    {
        "codigo": 139,
        "nome": "omastar",
        "tipo_primario": "rock",
        "tipo_secundario": "water"
    },
    {
        "codigo": 140,
        "nome": "kabuto",
        "tipo_primario": "rock",
        "tipo_secundario": "water"
    },
    {
        "codigo": 141,
        "nome": "kabutops",
        "tipo_primario": "rock",
        "tipo_secundario": "water"
    },
    {
        "codigo": 142,
        "nome": "aerodactyl",
        "tipo_primario": "rock",
        "tipo_secundario": "flying"
    },
    {
        "codigo": 143,
        "nome": "snorlax",
        "tipo_primario": "normal",
        "tipo_secundario": null
    },
    {
        "codigo": 144,
        "nome": "articuno",
        "tipo_primario": "ice",
        "tipo_secundario": "flying"
    },
    {
        "codigo": 145,
        "nome": "zapdos",
        "tipo_primario": "electric",
        "tipo_secundario": "flying"
    },
    {
        "codigo": 146,
        "nome": "moltres",
        "tipo_primario": "fire",
        "tipo_secundario": "flying"
    },
    {
        "codigo": 147,
        "nome": "dratini",
        "tipo_primario": "dragon",
        "tipo_secundario": null
    },
    {
        "codigo": 148,
        "nome": "dragonair",
        "tipo_primario": "dragon",
        "tipo_secundario": null
    },
    {
        "codigo": 149,
        "nome": "dragonite",
        "tipo_primario": "dragon",
        "tipo_secundario": "flying"
    },
    {
        "codigo": 150,
        "nome": "mewtwo",
        "tipo_primario": "psychic",
        "tipo_secundario": null
    }
];

const seedDB = async () => {
    await connectDB();

    try {

        // Limpa as coleções antes de popular (possivelmente já não vai ter nada, mas só pra garantir)
        await Type.deleteMany({});
        await Pokemon.deleteMany({});

        // Extrai tipos únicos dos pokémons (Set remove duplicatas, flatMap junta os arrays)
        const types = [...new Set(pokemonsData.flatMap(p => [p.tipo_primario, p.tipo_secundario]).filter(t => t))] as string[];

        const typeObjects = types.map((type, index) => ({
            codigo: index + 1,
            nome: type,
        }));

        const createdTypes = await Type.insertMany(typeObjects);

        // Mapeia nomes dos tipos para seus IDs (que acabaram de ser criados)
        const typesMap = createdTypes.reduce((acc, type) => {
            acc[type.nome] = type._id;
            return acc;
        }, {} as Record<string, any>);

        const pokemonsToCreate = pokemonsData.map(pokemon => ({
            codigo: pokemon.codigo,
            nome: pokemon.nome,
            tipo: typesMap[pokemon.tipo_primario],
            tipoSecundario: pokemon.tipo_secundario ? typesMap[pokemon.tipo_secundario] : null,
        }));

        await Pokemon.insertMany(pokemonsToCreate);

        console.log('Banco de dados populado com os tipos e pokemons iniciais!!');
    } catch (error) {
        console.error('Erro ao popular o banco de dados:', error);
    } finally {
        process.exit();
    }
};

seedDB();