<?php header( 'Location: /index.php' ) ;  ?>
<!DOCTYPE HTML>
<html>
   <head>
      <title>Precis - Free automatic text summarization tool</title>
      <meta http-equiv="content-type" content="text/html; charset=utf-8" />
      <meta name="keywords" content="online symmary, text summarization tool, automatic text summary, text mining, text summarizer, text summary, auto summarizer, automatic text summarizer, free summarizer, summarize text, summary generator, text summary, online text summarization, summarizer, summary, summarize, article summarizer, ariticle summarization">
      <meta name="description" content="Online Automatic Text Summarization - Precis is a simple tool that help to summarize large text documents and split from the most important sentences.">
      <link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.5.0/pure-min.css">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link href='http://fonts.googleapis.com/css?family=Roboto:400,100,300,700,500,900' rel='stylesheet' type='text/css'>
      <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
      <script src="js/skel.min.js"></script>
      <script src="js/skel-panels.min.js"></script>
      <script src="js/init.js"></script>
      <noscript>
         <link rel="stylesheet" href="css/skel-noscript.css" />
         <link rel="stylesheet" href="css/style.css" />
         <link rel="stylesheet" href="css/style-desktop.css" />
      </noscript>
      <script>
         (
         function(i,s,o,g,r,a,m)
         {i['GoogleAnalyticsObject']=r;i[r]=i[r]||
         	
         	function(){
         	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
         	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
         })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
         
         ga('create', 'UA-46290758-1', 'autosummarizer.com');
         ga('send', 'pageview');
         
      </script>
      <style>
         .beta
         {
         position:absolute;
         left:2px;
         top:17px;
         z-index:9999;
         }
      </style>
      <div class="beta">
         <img src="beta.png" alt="automaitc text summarizer beta version" height="65" width="65">
      </div>
      <style>
         #reli {
         height:15px;
         width:100%;
         color:black;
         }
      </style>
      <div id="reli">
      </div>
   </head>
   <body class="homepage">
      <!-- Header -->
      <!-- Featured -->
      <div id="featured">
         <div class="container">
            <header>
               <a href="">
                  <h2>Precis</h2>
               </a>
               <h3>Start generating your online summary</h3>
            </header>
            <form  method='POST' action='index.php'>
               <style>
                  textarea#styled {
                  width: 60%;
                  height: 170px;
                  padding: -25px;
                  font-family: Tahoma, sans-serif;
                  }
               </style>
               <textarea  name="text" placeholder="Paste your text article and click Summarize.. " id="styled">
											</textarea>
               <script>
                  function clear_textarea() {
                  	document.getElementById("styled").value = "";
                  }
                  
               </script>
               <br>
               <br>
               <input type="button" id="smm" value="Clear" class="pure-button pure-button-active" onclick="javascript:clear_textarea();"> 
               <input type='submit' class="pure-button pure-button-active" id='smm2' name='submit' value='Summarize'>
         </div>
         </form>
         <script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.js"></script>
         <style>
            #position {
            width:60%;
            margin:0 auto;
            padding-top: 25px;
            }
         </style>
         <script></script>
         <script>
            $( "#smm" ).click(function() {
            	$( "#position" ).hide( "slow", function() {
            		
            	});
            });
         </script>
         <div id="position"><b>
            </b>
         </div>
         <br>
         <br>
         <style>
            #kauu {
            font-size: 10px;
            width: 728px; 
            height:90px;
            text-align:left;
            }
         </style>
         <center>
         <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
         <ins class="adsbygoogle"
            style="display:inline-block;width:728px;height:90px"
            data-ad-client="ca-pub-9062148254082378"
            data-ad-slot="8085339247"></ins>
         <script>
            (adsbygoogle = window.adsbygoogle || []).push({});
         </script>
         <center>
         <p></p>
         <hr />
         <div class="row">
            <section class="4u">
               <span class="pennant"><span class="fa fa-globe"></span></span>
               <h3>AutoSummarizer</h3>
               <p>The project is in development. Summarize your articles, splitting the most important sentences and ranking a sentence based on importance.</p>
               <a href="http://autosummarizer.com/" class="button button-style1">Read More</a>
            </section>
            <section class="4u">
               <span class="pennant"><span class="fa fa-lock"></span></span>
               <h3>API</h3>
               <p>This tool is accessible by an API, integrate our api to generate summaries for a given text on your website or application.</p>
               <a href="" target="_blank" class="button button-style1">Api Offline</a>
            </section>
            <section class="4u">
               <span class="pennant"><span class="fa fa-globe"></span></span>
               <h3>The Algorithm</h3>
               <p>(Demo) A specific algorithm for extracting the most important points of the original document, using extraction based summarization. </p>
               <a href="http://autosummarizer.com/" class="button button-style1">Read More</a>
            </section>
         </div>
      </div>
      </div>
      <!-- Footer -->
      <div id="footer">
         <div class="container">
            <section>
               <ul class="contact">
                  <li><a href="#" class="fa fa-twitter"><span>Twitter</span></a></li>
                  <li class="active"><a href="https://www.facebook.com/pages/Automatic-Summarization/1416470211938890" class="fa fa-facebook"  target="_blank"><span>Facebook</span></a></li>
               </ul>
            </section>
         </div>
      </div>
      <!-- Copyright -->
      <div id="copyright">
         <div class="container">
            © All Copyrights Reserved by <a href="http://precis.com">precis.com</a>, College Station, 77840, Contact us: <a href="mailto:precis@tamu.edu">precis@tamu.edu</a>
         </div>
      </div>
   </body>
</html>