import copy
import pprint

import nltk
from nltk.tokenize.punkt import PunktSentenceTokenizer

import util
from data import Data

Data = Data()
pp = pprint.PrettyPrinter(indent=4)

# TODO analisar se os verbos que usam outros verbos depois são frequentes e relevantes (ex 'precisar fazer')

# TODO considerar o caso de expressões nos adjetivos (Ex 'um tanto quanto'), e para adverbios tambem (Ex 'acho que')

# TODO quando tiver a lista de palavras que levaram a identificar uma certa frase, mandar os indices das palavras pra poder dar highlight nelas facilmente

# TODO implementar separador de string para '...' e \n

# TODO implementar o não


class AnalyseReflection:
    def __init__(self, reflection):
        self.reflection = reflection
        self.checked_words_in_reflection = []
        self.results = []

        self._identify_keywords(Data.verbs)
        self._identify_keywords(Data.personal_pronouns)
        self._calculate_score()

    # find the terms within the surrounding string from a certain list, add index to the original object when found
    def _find_terms(self, surr_words, terms_list, clean=True):

        attribute = 'clean_word' if clean else 'word'
        terms = []

        for (surr_word_index, surr_word) in surr_words:
            for term in terms_list:
                if term[attribute] == surr_word and surr_word_index not in self.checked_words_in_reflection:
                    self.checked_words_in_reflection.append(surr_word_index)

                    new_term = copy.copy(term)
                    new_term['index_in_string'] = surr_word_index
                    terms.append(new_term)

        return terms

    def _identify_keywords(self, key_terms):
        sent_tokenizer = PunktSentenceTokenizer()
        reflection_sentences = sent_tokenizer.tokenize(self.reflection)

        word_tokenizer = nltk.tokenize.word_tokenize

        for sentence in reflection_sentences:

            # keep the words that were checked in a certain sentence so other verbs don't claim ownership

            for key_term in key_terms:

                # verbos sao necessariamente uma palavra so, entao nao preciso quebrar em ngrams
                sent = word_tokenizer(sentence.lower())

                # make an enumerable list, so I have the index of the splitted words changing the enumerable object to list
                tokenized_sentence = [x for x in enumerate(sent)]

                # esse é para o caso de existir o mesmo verbo mais de uma vez na mesma frase
                key_term_indexes = [(i, v) for i, v in tokenized_sentence if v == key_term['word']]

                if not key_term_indexes:
                    continue

                for key_term_index, t in key_term_indexes:

                    result_obj = {
                        'sentence': sentence,
                        'terms': [key_term]
                    }

                    # offset para pesquisar por outros elementos ao redor dos verbos
                    offset = 3

                    # surr stands for surrounding
                    surr_words = [(index, word) for index, word in
                                  tokenized_sentence[max(0, key_term_index - offset):key_term_index + offset]]
                    cleaned_surr_words = [(index, util.clean_word(word)) for index, word in surr_words]

                    for terms in self._find_terms(surr_words, Data.substantives, clean=False):
                        result_obj['terms'].append(terms)

                    for terms in self._find_terms(cleaned_surr_words, Data.adjectives):
                        result_obj['terms'].append(terms)

                    # if we haven't found any of the substantives or adjectives, we shoudn't look for adverbs

                    if [x for x in result_obj['terms'] if x['type'] != 'verb' and x['type'] != 'personal_pronoun']:
                        adverbs = Data.adverbs
                        result = self._find_terms(cleaned_surr_words, Data.adverbs)
                        for terms in result:
                            result_obj['terms'].append(terms)

                        self.results.append(result_obj)

    # current formulae: substantives*adverbs*adjectives
    # but if the adverb is alone, don't ignore it
    # examples:
    # 'muito dificil': 2 * -2 = -4
    # 'bastante complicado': 2 * -2 = -4
    def _calculate_score(self):

        for result in self.results:
            adverb_values = [float(x['value']) for x in result['terms'] if x['type'] == 'adverb']
            substantive_values = [float(x['value']) for x in result['terms'] if x['type'] == 'substantive']
            adjective_values = [float(x['value']) for x in result['terms'] if x['type'] == 'adjective']

            score = util.mult(adverb_values) * util.mult(substantive_values) * util.mult(adjective_values)

            result['score'] = score
