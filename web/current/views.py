## @file current/views.py
# @brief current server status interface to client

"""
version interface module. Return database version, database connecting strings and application build version
"""

import datetime


def time(params):
    """server UTC time
    :param params:
    """
    return str(datetime.datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"))


def get(params):
    """current parameters of server
    :param params:
    """
    return {
        "paramsVer": 1,
        "time": time({})
    }
