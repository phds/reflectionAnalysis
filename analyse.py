import json
from pprint import pprint
import nltk
from nltk.tokenize.punkt import PunktSentenceTokenizer
from unidecode import unidecode



# file = open('assets/reflections.json', encoding="utf8")
#
# # usar stopword pra tirar o desnecessario (lembrar de tirar o nâo do grupo)
#
# data = json.load(file)
#
# pprint(data)

# verbos

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

# podemos usar stemmer nos adjetivos e no texto original para termos todas as variações
adjectives = (
    {
        'word': 'difícil',
        'multiplier': -2
    },
    {
        'word': 'complicado',  # aumentar o multiplier para casos de 'issimo' (talvez nao precise usando stemmer)
        'multiplier': -2
    },
    {
        'word': 'frustrado',
        'multiplier': -2
    },
    {
        'word': 'um tanto quanto',  # pensar em como tratar expressões
        'multiplier': -2
    },
    {
        'word': 'confuso',
        'multiplier': -2
    },
    {
        'word': 'saturado',
        'multiplier': -2
    }
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

sample_reflection = "Até aqui sinto certa frustração com meu desempenho pois sinto que estou me desgastando nas aulas. Imagino que a pressa em fazer os exercícios ou a quantidade deles tenha me deixado saturada, mas talvez me reacostumar a acordar cedo esteja sendo um fator determinante também"


def analyse_reflection(reflection):

    sent_tokenizer = PunktSentenceTokenizer()
    reflection_sentences = sent_tokenizer.tokenize(reflection)

    word_tokenizer = nltk.tokenize.word_tokenize

    for sentence in reflection_sentences:

        checked_words_in_sentence = []

        for verb_conjugations in verbs:
            for verb in verb_conjugations:

                # verbos sao necessariamente uma palavra so, entao nao preciso quebrar em ngrams
                sent = word_tokenizer(sentence)
                tokenized_sentence = enumerate(sent)



                ####PAREI AQUI#####



                # esse é para o caso de existir o mesmo verbo mais de uma vez na mesma frase
                verb_indexes = [i for i, v in tokenized_sentence if v == verb]

                if not verb_indexes:
                    break

                for index, verb in verb_indexes:
                    # offset para pesquisar por outros elementos ao redor dos verbos
                    offset = 3

                    # surr stands for surrounding
                    surr_words = [(index, word) for index, word in tokenized_sentence[index - offset:index + offset]]
                    cleaned_surr_words = [(index, clean_word(word)) for index, word in surr_words]
                    # talvez seja o caso de nao fazer substantivos com stemming,
                    # dado que eles podem ser adjetivos. a ideia entao eh
                    # tentar achar os substantivos primeiros, eliminar da possibilidade de serem encontrados,
                    # e apartir dai mandar para adjetivos e adverbios

                    # substantives are not cleaned
                    subs_words = [sub['word'] for sub in substantives]
                    surr_substantives = [(index, word) for (index, word) in surr_words if word in subs_words]
                    checked_words_in_sentence += [index for index, word in surr_substantives]

                    adj_words = [clean_word(adj['word']) for adj in adjectives]
                    surr_adjectives = [(index, word) for (index, word) in surr_words if
                                       word in adj_words and index not in checked_words_in_sentence]
                    checked_words_in_sentence += [index for index, word in surr_adjectives]

                    adv_words = [clean_word(adv['word']) for adv in adverbs]
                    surr_adverbs = [(index, word) for (index, word) in surr_words if
                                    word in adv_words and index not in checked_words_in_sentence]
                    checked_words_in_sentence += [index for index, word in surr_adverbs]

                    print('for the sentence: ' + sentence)
                    print('for the verb ' + verb)
                    print('substantives: ' + ' '.join([word for index, word in surr_substantives]))
                    print('adjetives: ' + ' '.join([word for index, word in surr_adjectives]))
                    print('adverbs: ' + ' '.join([word for index, word in adjectives]))


def clean_word(word):
    stemmer = nltk.stem.RSLPStemmer()

    return stemmer.stem(unidecode(word))


analyse_reflection(sample_reflection)
