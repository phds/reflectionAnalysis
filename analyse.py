import json
from pprint import pprint

file = open('assets/reflections.json', encoding="utf8")

#usar stopword pra tirar o desnecessario (lembrar de tirar o nâo do grupo)

data = json.load(file)

pprint(data)

#verbos

verbs = (
    ('ter', 'tenho', 'tive'),
    ('achar', 'acho', 'achei'),
    ('ser', 'é', 'foi', 'era'),
    ('estar', 'estou', 'esteve', 'estava', 'estive'),
    ('encontrar', 'encontramos', 'encontro', 'encontrei', 'encontrávamos'),
    ('sentir', 'sinto', 'senti'),
    ('fazer', 'faço', 'fiz', 'fizemos')
)

adverbs = (
    {
        'word': 'muito',
        'multiplier': 2
    },
    {
        'word': 'bastante',
        'multiplier': 2
    },
    {
        'word': 'pouco',
        'multiplier': 0.5
    },
    {
        'word': 'acho que',
        'multiplier': 0.5
    },
)

#podemos usar stemmer nos adjetivos e no texto original para termos todas as variações
adjectives = (
    {
        'word': 'difícil',
        'multiplier': -2
    },
    {
        'word': 'complicado', #aumentar o multiplier para casos de 'issimo'
        'multiplier': -2
    },
    {
        'word': 'frustrado',
        'multiplier': -2
    },
    {
        'word': 'um tanto quanto', #pensar em como tratar expressões
        'multiplier': -2
    },
    {
        'word': 'confuso',
        'multiplier': -2
    },
)

substantives = (
    {
        'word': 'dificuldade',
        'multiplier': -2
    },
    {
        'word': 'problema',
        'multiplier': -2
    },
)

negative = {
    'word': 'não',
    'multiplier': -1
}

def analyseReflection(reflection):
    pass


def remover_acentos(txt):
    return normalize('NFKD', txt).encode('ASCII','ignore').decode('ASCII')