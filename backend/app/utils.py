import nltk
from nltk.corpus import wordnet

nltk.download("wordnet")

def get_word_data(word):
    synonyms, antonyms = set(), set()

    for syn in wordnet.synsets(word):
        for lemma in syn.lemmas():
            synonyms.add(lemma.name().replace("_", " "))
            if lemma.antonyms():
                antonyms.add(lemma.antonyms()[0].name().replace("_", " "))

    return {
        "word": word,
        "meaning": wordnet.synsets(word)[0].definition() if wordnet.synsets(word) else "No definition found.",
        "synonyms": list(synonyms),
        "antonyms": list(antonyms),
    }
