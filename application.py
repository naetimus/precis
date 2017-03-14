import os
from flask import Flask, render_template, request
import precis.textrank
import json
from flask_cors import CORS, cross_origin

from precis import textrank

application = Flask(__name__)
application.debug=True

@application.route('/summary', methods=['POST'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def index():
    try:
        print request.method
        if request.method == "POST":
            print request.data
            json_dict = json.loads(request.data)
            summary = textrank.textrank(json_dict['text'])
            summary_data = {'summary':summary}
            return json.dumps(summary_data)
    except Exception as e:
        print e

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 33507))
    application.run(host='0.0.0.0', debug=True, port=port)
