from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render

from datetime import datetime
import json
import os


def index(request):
    return render(request, 'mobile/index.html')


def scan(request):
    question = q1
    if request.POST:
        data = request.POST
        print("data")
        if data["question"]:
            print("response to question", data["question"])
            for q in questions:
                if not q.key == data["question"]:
                    continue
                for opt in q.options:
                    if not opt.text == data["chosen_option"]:
                        continue
                    if opt.question:
                        question = opt.question
                        break
                    else:
                        return scanned(request, opt.result)
    # first question
    context = {'question': question}
    return render(request, 'mobile/scan.html', context)


def scanned(request, tree):
    context = {'tree': {'name': tree}}
    return render(request, 'mobile/scanned.html', context)


def addtree(request):
    if not request.POST:
        return HttpResponseRedirect("/mobile/scan")
    name = request.POST["name"]
    tree = request.POST["name"]
    longitude = request.POST["longitude"]
    latitude = request.POST["latitude"]
    bloom_start = datetime.now().timetuple().tm_yday
    if not os.path.isfile('/tmp/data.json'):
        data = {'trees': []}
    else:
        with open('/tmp/data.json', 'r') as f:
            data = json.load(f)

    with open('/tmp/data.json', 'w') as f:
        data["trees"].append(
            {'name': name, 'species': tree,
             'longitude': longitude, 'latitude': latitude,
             'bloom_start': bloom_start }
        )
        json.dump(data, f, indent=4)
    return render(request, "mobile/thankyou.html")


class Option:
    def __init__(self, text, question=None, result=None):
        self.text = text
        self.question = question
        self.result = result


class Question:
    def __init__(self, key, text, options):
        self.key = key
        self.text = text
        self.options = options


q3 = Question("alive", "Is your tree alive?",
              [Option("yes", result="Poor Apple Tree"),
               Option("no", result="Dead Apple Tree")])
q2 = Question("red", "Is your tree red?",
              [Option("yes", result="Red Apple Tree"),
               Option("no", result="Green Apple Tree")])
q1 = Question("leaves", "Does your tree have leaves?",
              [Option("yes", question=q2), Option("no", question=q3)])

questions = [q1, q2, q3]
