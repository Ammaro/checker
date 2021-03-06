## @file web/views.py
# @brief main server interface to client

"""
main interface to server
"""

import django.http
import json
import traceback

# all modules should be imported here
import version
import version.views
import current
import current.views
import game
import game.views

from django.core import serializers


def index(request):
    """for test working server"""
    return django.http.HttpResponse("MyApp server")


def ajax(request, module, function):
    """dispatch ajax requests"""
    try:
        fun = getattr(getattr(globals()[str(module)], 'views'), str(function))
        result = fun(request)
       # print result
        try:

            result = serializers.serialize("json", result)
        except Exception:
            result = json.dumps(result)
        return django.http.HttpResponse(result, content_type='application/json')
    except Exception as e:
        return django.http.HttpResponseNotFound("server error " + str(traceback.format_exc()))
    except:
        return django.http.HttpResponseNotFound(
            "response not found due to some unknown error " + str(traceback.format_exc()))
