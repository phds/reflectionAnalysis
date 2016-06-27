import json
import pprint

from reflection_analyser import ReflectionAnalyser

sample_reflection = 'Até aqui sinto certa frustração com meu desempenho pois sinto que estou me desgastando nas aulas. Imagino que a pressa em fazer os exercícios ou a quantidade deles tenha me deixado saturada, mas talvez me reacostumar a acordar cedo esteja sendo um fator determinante também'

# try:
data = json.load(open('./assets/reflections.json'))

reflection_text = data[0]['reflections']

for reflection in reflectionList:

    reflection_text = reflection['text']
    print(reflection + '\n')

    ar = ReflectionAnalyser(reflection)

    pp = pprint.PrettyPrinter(indent=4)
    pp.pprint(ar.results)
#
# except KeyError as err:
#     print('text field not present on reflection: {0}'.format(err))
#     print(sys.exc_info()[0])
