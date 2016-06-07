# -*- coding: utf-8 -*-

import json
from pprint import pprint

file = open('assets/reflections.json', encoding="utf8")


data = json.load(file)

pprint(data)