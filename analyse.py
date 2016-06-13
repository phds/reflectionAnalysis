import nltk
from nltk.tokenize.punkt import PunktSentenceTokenizer
from data import Data
import util

Data = Data()
# file = open('assets/reflections.json', encoding="utf8")
#
# # usar stopword pra tirar o desnecessario (lembrar de tirar o nâo do grupo)
#
# data = json.load(file)
#
# pprint(data)

# TODO analisar se os verbos que usam outros verbos depois são frequentes e relevantes (ex 'precisar fazer')

# TODO considerar o caso de expressões nos adjetivos (Ex 'um tanto quanto'), e para adverbios tambem (Ex 'acho que')

# TODO quando tiver a lista de palavras que levaram a identificar uma certa frase, mandar os indices das palavras pra poder dar highlight nelas facilmente
# verbos


sample_reflection = 'Até aqui sinto certa frustração com meu desempenho pois sinto que estou me desgastando nas aulas. Imagino que a pressa em fazer os exercícios ou a quantidade deles tenha me deixado saturada, mas talvez me reacostumar a acordar cedo esteja sendo um fator determinante também'


# TODO dividir essa funcao em duas, uma que busca e retorna os elementos relevantes proximas, e outra que calcula

def analyse_reflection(reflection):
    sent_tokenizer = PunktSentenceTokenizer()
    reflection_sentences = sent_tokenizer.tokenize(reflection)

    word_tokenizer = nltk.tokenize.word_tokenize

    for sentence in reflection_sentences:

        # keep the words that were checked in a certain sentence so other verbs don't claim ownership
        checked_words_in_sentence = []
        sentence = sentence.lower()

        for verb in Data.verbs:

            verb = verb['word']

            # verbos sao necessariamente uma palavra so, entao nao preciso quebrar em ngrams
            sent = word_tokenizer(sentence)

            # make an enumerable list, so I have the index of the splitted words changing the enumerable object to list
            tokenized_sentence = [x for x in enumerate(sent)]

            # esse é para o caso de existir o mesmo verbo mais de uma vez na mesma frase
            verb_indexes = [(i, v) for i, v in tokenized_sentence if v == verb]

            if not verb_indexes:
                continue

            for verb_index, verb in verb_indexes:
                # offset para pesquisar por outros elementos ao redor dos verbos
                offset = 3

                # surr stands for surrounding
                surr_words = [(index, word) for index, word in
                              tokenized_sentence[max(0, verb_index - offset):verb_index + offset]]
                cleaned_surr_words = [(index, util.clean_word(word)) for index, word in surr_words]
                # talvez seja o caso de nao fazer substantivos com stemming,
                # dado que eles podem ser adjetivos. a ideia entao eh
                # tentar achar os substantivos primeiros, eliminar da possibilidade de serem encontrados,
                # e apartir dai mandar para adjetivos e adverbios

                # substantives are not cleaned

                subs_words = [sub['word'] for sub in Data.substantives]
                surr_substantives = [(index, word) for (index, word) in surr_words if word in subs_words]
                checked_words_in_sentence += [index for index, word in surr_substantives]

                adj_words = [adj['clean_word'] for adj in Data.adjectives]
                surr_adjectives = [(index, word) for (index, word) in cleaned_surr_words if
                                   word in adj_words and index not in checked_words_in_sentence]
                checked_words_in_sentence += [index for index, word in surr_adjectives]

                adv_words = [util.clean_word(adv['word']) for adv in Data.adverbs]
                surr_adverbs = [(index, word) for (index, word) in cleaned_surr_words if
                                word in adv_words and index not in checked_words_in_sentence]
                checked_words_in_sentence += [index for index, word in surr_adverbs]

                if surr_substantives or surr_adjectives or surr_adverbs:
                    print('for the sentence: ' + sentence)
                    print('for the verb ' + verb)
                    print('substantives: ' + ' '.join([word for index, word in surr_substantives]))
                    print('adjetives: ' + ' '.join([word for index, word in surr_adjectives]))
                    print('adverbs: ' + ' '.join([word for index, word in surr_adverbs]) + '\n\n\n')


analyse_reflection(sample_reflection)
