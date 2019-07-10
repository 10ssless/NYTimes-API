/*
## Back-End Team

* Do preliminary research on the [API](http://developer.nytimes.com/article_search_v2.json).

* Register for an API Key.

* Understand what format the URL should look like to make an Article Call. (Hint: Use the API Console!!)

* Experiment with console logging various fields.

*/

$(document).ready(function(){

    $(".new-content").hide()

    var setDate = function(input){
        // convert user input to proper date format for API
        var newDate = input.substring(6,10) + input.substring(0,2) + input.substring(3,5)
        return newDate
    }

    var prepStr = function(str) {
        // allow for search queries with spaces btw words
        var newStr = "";                        
        for(var i=0;i<str.length;i++){
            var cc = str.substring(i,i+1)
            if (cc==" "){
                newStr += "+"
            }
            else {
                newStr += cc
            }
        }
        return newStr
    }

    
    $("#submit").on("click", function () {

        event.preventDefault()                   // prevent usual submit functionality 

        var api_key = "dd7IdMo4wBX4K2d8GNVX4dK4c75NqNKJ"
        var q = prepStr($("#search").val())                                  
        var fq = $("#newsDesk").val()                            
        var begin = setDate($("#startYear").val())                // desired input "20120101"
        var end = setDate($("#endYear").val())                     
        var limit = $("#numberOfRecords").val()
        var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+q+"&fq=news_desk:("+fq+")&begin_date="+begin+"&end_date="+end+"&api-key="+api_key+"&limit="+limit

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function(nyt) {
            var results = nyt.response.docs
            if(results.length > 0) {
                console.log(nyt);
                $("#articles").empty()
                $(".new-content").show()        // show articles section once nyt object returns
                if(results.length < limit) {    // if there less articles than limit requested, use amt returned
                    limit = results.length
                }
                for(var i=0; i<limit; i++){     // return only amt of articles specified by limit
                    var card = $("<div>").addClass("card").attr("style", "width:100%")
                    var cardBody = $("<div>").addClass("card-body")
                    var title = $("<h5>").addClass("card-title").text(results[i].headline.main)
                    var text = $("<p>").addClass("card-text").text(results[i].abstract)
                    var link = $("<a>").addClass("card-link").attr("href",results[i].web_url).text("Full Article")
                    cardBody.append(title,text,link)
                    card.append(cardBody)
                    $("#articles").prepend(card)
                }
            }
            else {                              // if no articles are found, display a message
                var text = $("<p>").text("No results found...").css("color","gray")
                $("#articles").html(text)

            }
        })
    });

    $("#clear").on("click", function () {
        $("#articles").empty()
        $(".new-content").hide()
    });



        
        


    




})



