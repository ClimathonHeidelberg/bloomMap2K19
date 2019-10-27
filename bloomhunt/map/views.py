from django.http import HttpResponse
from django.shortcuts import render
import json
import os


def index(request):
    if not os.path.isfile("/tmp/data.json"):
        data = {"trees": str({ "trees": []}) }
    else:
        with open("/tmp/data.json", "r") as f:
            loaded = json.load(f)
            print("loaded", loaded)
            s = json.dumps(loaded);
            print("s", s)
            data = {"trees": s}
    return render(request, "map/index.html", context=data);
