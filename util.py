import nltk
from unidecode import unidecode


def clean_word(word):
    stemmer = nltk.stem.RSLPStemmer()

    return stemmer.stem(unidecode(word)).lower()
