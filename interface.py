import json
import pprint

from analyse import AnalyseReflection

sample_reflection = 'Até aqui sinto certa frustração com meu desempenho pois sinto que estou me desgastando nas aulas. Imagino que a pressa em fazer os exercícios ou a quantidade deles tenha me deixado saturada, mas talvez me reacostumar a acordar cedo esteja sendo um fator determinante também'

try:
    data = json.load(open('./assets/reflections.json'))

    reflection = data[0]['reflections'][15]['text']

    print(reflection + '\n')

    ar = AnalyseReflection(reflection)

    pp = pprint.PrettyPrinter(indent=4)
    pp.pprint(ar.results)

except KeyError:
    print('text field not present on reflection')
