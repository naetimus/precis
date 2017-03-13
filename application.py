from flask import Flask, render_template, request
import precis.textrank
import json

from precis import textrank

application = Flask(__name__)
application.debug=True

@application.route('/summary', methods=['POST'])
def index():
    try:
        if request.method == "POST":
            print request.data
            json_dict = json.loads(request.data)
            summary = textrank.textrank(json_dict['text'])
            summary_data = {'summary':summary}
            return json.dumps(summary_data)
    except Exception as e:
        print e

if __name__ == '__main__':
    application.run(host='0.0.0.0', debug=True, port=3134)
