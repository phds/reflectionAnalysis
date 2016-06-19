import csv
from enum import Enum

import util


class Data:
    def __init__(self):
        self.verbs = self._read_data(POS.verb)
        self.adjectives = self._read_data(POS.adjective)
        self.adverbs = self._read_data(POS.adverb)
        self.substantives = self._read_data(POS.substantive)
        self.negatives = self._read_data(POS.negative)

        self.personal_pronouns = self._read_data(POS.personal_pronoun)

    def _read_data(self, word_type):

        data = []

        with open('assets/' + word_type.name + '_list.csv') as csvfile:

            reader = csv.DictReader(csvfile)

            if word_type.name == 'verb' or word_type.name == 'personal_pronoun':

                for row in reader:
                    obj = {
                        'word': row['word'],
                        'type': word_type.name
                    }
                    data.append(obj)

            else:

                for row in reader:
                    obj = {
                        'word': row['word'],
                        'value': row['value'],
                        'clean_word': util.clean_word(row['word']),
                        'type': word_type.name
                    }
                    data.append(obj)

        return data


# parts of speech
class POS(Enum):
    verb = 1
    adjective = 2
    adverb = 3
    substantive = 4
    negative = 5
    personal_pronoun = 6
