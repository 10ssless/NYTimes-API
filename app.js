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

    
    $("#submit").on("click", function () {

        event.preventDefault()      // prevent usual submit functionality 

        var api_key = "dd7IdMo4wBX4K2d8GNVX4dK4c75NqNKJ"
        var q = $("#search").val()                                  
        var fq = $("#newsDesk").val()                            
        var begin = setDate($("#startYear").val())                // desired input "20120101"
        var end = setDate($("#endYear").val())                     
        var limit = $("#numberOfRecords").val()
        var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+q+"&fq=news_desk:("+fq+")&begin_date="+begin+"&end_date="+end+"&api-key="+api_key+"&limit="+limit

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function(nyt) {
            console.log(nyt);
            $(".new-content").show()
            var results = nyt.response.docs
            for(var i=0; i<limit; i++){     // return only amt of articles specified by limit
                var card = $("<div>").addClass("card").attr("style", "width:100%")
                var cardBody = $("<div>").addClass("card-body")
                var title = $("<h5>").addClass("card-title").text(results[i].headline.main)
                var text = $("<p>").addClass("card-title").text(results[i].abstract)
                var link = $("<a>").addClass("card-link").attr("href",results[i].web_url).text("Full Article")
                cardBody.append(title,text,link)
                card.append(cardBody)
                $("#articles").append(card)
            }
        })
    });

    $("#clearResults").on("click", function () {
        $("#articles").empty()
        $(".new-content").hide()
    });



        
        


    




})



