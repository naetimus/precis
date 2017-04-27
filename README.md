# Precis #
Project for Natural Language Processing Course 689

## TASK DESCRIPTION:- ##

Precis is an automatic text summarizer | that utilizes TextRank, a graph-based algorithm that scans through the contents of a website to extract a machine generated summary. The methodology is similar to the way search engines return the most relevant web pages from a user's search query. Precis app makes sure everything you read online, can be easily summarized to a few points. As the algorithm is written by us, some modifications can be made easily to improve the algorithm as per our need. This idea can be used in several areas, like Letter reading, Email reading, News reading, etc. In sum, this tool has applications in many fields where a synopsis of the text is of utmost important.

## APPROACH:- ##

Textrank algorithm will be implemented in Python language and APIs will be created using Python Flask. APIs will be made available public so that anyone can use them for their own use. Implementing Pagerank algorithm at our side will give us more insight into what is going inside the algorithm. Unlike using API for that , we will have an unlimited number of calls that can be made. The front end of the web app will have the feature of uploading documents or pasting the text and the application will display the summary of the document in a few points. Web app will be made using HTML, CSS, Javascript, Ajax, etc.. Summary will be displayed in the form of bullet points instead of a paragraph and also it will be made sure, it will contain important metadata of the document.

## EVALUATION:- ##

Evaluation of the textrank algorithm will be done using ROUGE evaluation toolkit , which is a method based on N-grams, found to be highly correlated with human evaluations. ROUGE, or Recall-Oriented Understudy for Gisting Evaluation, is a set of metrics and a software package used for evaluating automatic summarization and machine translation software in natural language processing.

## FURTHER EXTENSIONS:- ##

Following is the work that we want to complete if time permits:-
* Create a Chrome or Mozilla extension/plugin which will work on most of the web pages like Wikipedia , News, etc.
* URLs can be submitted for finding the summary of the web page.

## EVALUATION RESULTS:- ##

Average scores against many other algorithms

| ALGORITHMS | ROGUE-1 SCORE | ROGUE-2 SCORE | ROGUE-L SCORE(SENTENCE LEVEL) |
|-----|----|----|----|
| edmundson | 0.300956866667| 0.0916679333333 | 0.177563466667 | 
| sum-basic | 0.314202633333 | 0.0848814666667 | 0.169243166667 | 
| lex-rank | 0.327850166667 | 0.102876466667 | 0.187250466667 |
| precis | 0.354453733333 | 0.130914366667 | 0.174810566667 |
 

## REPOSITORIES THAT OUR PROJECT USES FOR EVALUATION ##
* pyrouge - https://github.com/shubham7jain/pyrouge
* sumy - https://github.com/shubham7jain/sumy

Thanks to the respective owners of the repositories above for making their code open source.

## HOW TO RUN THE EVALUATION ##
Clone repository https://github.com/shubham7jain/sumy and do sh evaluation.sh

DataSet we are using is taken from :-

http://multiling.iit.demokritos.gr/pages/view/1532/task-mss-single-document-summarization-data-and-information

## DIFFERENT PRODUCTS OF PRECIS ##

### Backend Service ###

Server - https://precis.herokuapp.com

API Contract available at http://precis.herokuapp.com/apidocs/index.html

### Website ###
https://precis-webapp.herokuapp.com/

### Chrome Extension ###
Still in developer mode. Will publish it soon

### References ###
http://text-analytics101.rxnlp.com/2017/01/how-rouge-works-for-evaluation-of.html

https://web.eecs.umich.edu/~mihalcea/papers/mihalcea.emnlp04.pdf
