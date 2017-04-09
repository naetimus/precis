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

| FILENAME |  PRECIS_ALGO | TEXTRANK_ALGO |
|---------|---------|---------|
| 0f8047e125d506e389b7f2d2f2d7f289 | 0.344828 | 0.339080 |
| 0fb33cd018ad2920a6c4fcfaba506f06 | 0.366013 | 0.418301 |
| 1081931192d131fc74ffa01ede12c158 | 0.297468 | 0.322785 |
| 132a33e8586a65700024a05fa7b18c5c | 0.300654 | 0.300654 |
| 1cb20522497387fafcbcbad3aa397aae | 0.350000 | 0.350000 |
| 20db08878a9223d33bd3265b3ea2d1d1 | 0.422535 | 0.373239 |
| 22e29f01d39bd08169b7eea1bbafa155 | 0.304965 | 0.304965 |
| 2c62e37c92e29ebd614d8dfb4694a095 | 0.445122 | 0.390244 |
| 3106974ba4d193d7307e38b76a6797da | 0.278571 | 0.321429 |
| 4a9978eae71578badccfe4a52ca4e35f | 0.393939 | 0.406061 |
| 642c93130b00be86b469c74301d0fedc | 0.355263 | 0.322368 |
| 67d2ee3f54bb658b9d0d4c5526c451fc | 0.391566 | 0.391566 |
| 6c55b7de50e0b56a6d80a0f66460d9c5 | 0.347305 | 0.329341 |
| 781d52fa3248ac89aec4988b9372bafc | 0.263473 | 0.263473 |
| 7b0500ddb94e2db0e00b70920e8168bb | 0.353293 | 0.353293 |
| 954f24a87481cb51ed73383a83686784 | 0.419355 | 0.361290 |
| 9ff08bb0a9333e867a44030022a392a9 | 0.379562 | 0.430657 |
| a3a137e54c3c164364cf541424e3d478 | 0.161074 | 0.308725 |
| b14bbeb7bbf9f80b9eb4fbed8df313a1 | 0.445714 | 0.394286 |
| b2e1a4867bbf791526db3d2b080a0831 | 0.462428 | 0.387283 |
| b9b21839432b2e894708f51eb5ee678d | 0.253012 | 0.253012 |
| b9d7e95d9e9e75894dc1611aa549d431 | 0.388571 | 0.354286 |
| ca103597686e15559d4983425b907737 | 0.327044 | 0.327044 |
| d4562c813cd9afdb4b488c27d4aa7c92 | 0.406977 | 0.354651 |
| da37860338fa47cd3bbc28c30dad92bc | 0.312139 | 0.335260 |
| e0dbb600081ec1661e58ff27364163f1 | 0.355705 | 0.348993 |
| e1f4cea38fd3d654ed307f4685c1cade | 0.444444 | 0.419753 |
| ea8fd2a90772f6c9ed525eddc7698ae2 | 0.320755 | 0.251572 |
| f555eee2cec40b01728b48738746d678 | 0.387755 | 0.367347 |
| feedc24a067e279b75b5c9fbfea1dfd5 | 0.436364 | 0.351515 |

## REPOSITORIES THAT OUR PROJECT USES FOR EVALUATION ##
* pyrouge - https://github.com/shubham7jain/pyrouge
* sumy - https://github.com/shubham7jain/sumy

Thanks to the respective owners of the repositories above for making their code open source.

## HOW TO RUN THE EVALUATION ##
Clone repository https://github.com/shubham7jain/sumy and do sh evaluation.sh

## DIFFERENT PRODUCTS OF PRECIS ##

### Backend Service ###

Server - https://precis.herokuapp.com
API Contract available at http://precis.herokuapp.com/apidocs/index.html

### Website ###
https://precis-webapp.herokuapp.com/

### Chrome Extension ###
Still in developer mode. Will publish it soon