import json
import pprint

from reflection_analyser import ReflectionAnalyser

sample_reflection = 'Até aqui sinto certa frustração com meu desempenho pois sinto que estou me desgastando nas aulas. Imagino que a pressa em fazer os exercícios ou a quantidade deles tenha me deixado saturada, mas talvez me reacostumar a acordar cedo esteja sendo um fator determinante também'

# try:
data = json.load(open('./assets/reflections.json', encoding="utf-8"))

reflection_object = data[2]
reflectionList = reflection_object['reflections']

# reflection_text = reflectionList[30]['text']
# print(reflection_text + '\n')
#
# ar = ReflectionAnalyser(reflection_text)
#
# pp = pprint.PrettyPrinter(indent=4)
# pp.pprint(ar.results)
# print('\n\n')

for reflection in reflectionList:

    try:
        reflection_text = reflection['text']
        print(reflectionList.index(reflection))
        print(reflection_text + '\n')

        ar = ReflectionAnalyser(reflection_text)

        pp = pprint.PrettyPrinter(indent=4)
        pp.pprint(ar.results)
        print('\n\n')
    except Exception as e:
        print (e)
        continue

test_sentences = [
    "Foi dificil encontrar a solução.",
    "não tivemos problemas em fazer"

]
