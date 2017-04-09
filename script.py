import glob
import json
import requests
from collections import defaultdict
files =  glob.glob("gold_standard/text_en/*.txt")

text_counts=[]
for fil in files:
	with open(fil,  'r') as f:
	    read_data = f.read()
	text_counts.append(len(read_data.split()))

files =  glob.glob("gold_standard/summary_en/*.txt")
summary_counts=[]
for fil in files:
	with open(fil,  'r') as f:
	    read_data = f.read()
	summary_counts.append(len(read_data.split()))

#print text_counts
#print summary_counts

ratio=[]
ratio=[1.0*summary_count/text_count for text_count, summary_count in zip(text_counts, summary_counts)]

files =  glob.glob("gold_standard/text_en/*.txt")
summaryfiles = glob.glob("gold_standard/summary_en/*.txt")
i = 0

for fil, sumfile in zip(files, summaryfiles):
	
	with open(fil,  'r') as f:
	    read_data = f.read()
	url = "http://precis.herokuapp.com/summary"
	payload = {"ratio":ratio[i],"text":read_data}
	headers = {'content-type': 'application/json'}
	response=requests.post(url, data=json.dumps(payload), headers=headers)
	mysum=response.json()
	summary = mysum["summary"]
	summary  = summary.encode('ascii','ignore')
	filename = sumfile[:-11]+"mysummary.txt"
	with open(filename, 'w+') as fi:
		fi.write(summary)
	i+=1
	print i
	