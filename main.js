
$(document).ready(function(){

    // all levels

    var first_card = null;
    var second_card = null;
    var total_matches = 9;
    var can_click = true;
    var games_played = 0;
    var match_counter = 0;

    // stats

    var accuracy = 0;
    var matches = match_counter;
    var attempts = 0;

    console.log("Matches: " + matches);
        
        function display_stats(){
            $(".games_played .value").text(games_played);
            $(".attempts .value").text(attempts);
        
            accuracy = matches / attempts;
            $(".accuracy .value").text(accuracy);
        }
        
        function reset_stats(){
            accuracy = 0;
            matches = 0;
            attempts = 0;
            display_stats();
        }
        
        $(".reset").click(function(){
            games_played += 1;
            display_stats();
            reset_stats();
            shuffle_cards(mascots_front);
            console.log(games_played);
            console.log("matches after click: " + matches);
            console.log("attempts after click: " + attempts);
        });

    // shuffle and deal cards

    var elem_index = 0;

    function shuffle_cards(pic_array){
        for(i = 0; i <= pic_array.length; i++){
            var index = Math.floor(Math.random()*pic_array.length);
            $(".front img").eq(elem_index).attr("src", pic_array[index]);
            pic_array.splice(index, 1);
            elem_index += 1;
            i = 0;
        }
    }

    // flip cards back

    var flip_back = function not_a_match(){
        first_card.find(".back > img").removeClass("flip");
        second_card.find(".back > img").removeClass("flip");
        first_card = null;
        second_card = null;
        can_click = true;
    };

    // select difficulty - easy

    var mascots_background = "images/backgrounds/zabivaka.png";
    var mascots_back = "images/mascots.jpg";
    var mascots_front = [
        "images/mascots/1.jpg",
        "images/mascots/2.jpg",
        "images/mascots/3.jpg",
        "images/mascots/4.jpg",
        "images/mascots/5.jpg",
        "images/mascots/6.jpg",
        "images/mascots/7.jpg",
        "images/mascots/8.jpg",
        "images/mascots/9.jpg",
        "images/mascots/1.jpg",
        "images/mascots/2.jpg",
        "images/mascots/3.jpg",
        "images/mascots/4.jpg",
        "images/mascots/5.jpg",
        "images/mascots/6.jpg",
        "images/mascots/7.jpg",
        "images/mascots/8.jpg",
        "images/mascots/9.jpg"
    ];

    var gol = document.getElementById("gol");
    var whistle = document.getElementById("whistle");                   
    var ole = document.getElementById("ole");

    $(".easy").click(function easy_level(){
        $(".challenge").addClass("challenge_not_visible");
        $("body").addClass("mascots_background");
        $(".title h1").css({"padding-left": "36%", "color": "red"}).text("Match the Mascots!");
        for(i = 0; i < 3; i++){
            var row_div = $('<div>').addClass("row");
            for(j = 0; j < 6; j++){
                var first_image_tag = $('<img>');
                var card_div = $('<div>').addClass("card");
                var front_div = $('<div>').addClass("front");
                first_image_tag.appendTo(front_div);
                var second_image_tag = $('<img>');
                var back_div = $('<div>').addClass("back");
                second_image_tag.appendTo(back_div);
                card_div.append(front_div).append(back_div);
                card_div.appendTo(row_div);
            }
            row_div.appendTo("#game_area");
        }
        $(".row").addClass("mascot_row");
        $(".card").addClass("mascot_card");
        $(".back img").attr("src", mascots_back);
        shuffle_cards(mascots_front);
        $(".card").click(mascots_card_clicked);
    });

        function mascots_card_clicked(){
        if(can_click === true){
            $(event.target).addClass("flip");
            if(first_card === null){
                first_card = $(this);
            } else {
                second_card = $(this);
                can_click = false;
                attempts += 1;
                if(first_card.find(".front > img").attr("src") === second_card.find(".front > img").attr("src")){
                    gol.play();
                    match_counter += 1;
                    if(match_counter === total_matches){
                        $(".title h1").text("You win!");
                        ole.play();
                    } else {
                        first_card = null;
                        second_card = null;
                        can_click = true;
                    }
                    return match_counter;
                } else {
                    whistle.play();
                    setTimeout(flip_back, 2000);
                }

            }
        }
    }

    // select difficulty - medium

    var champions_background = "images/backgrounds/pele.png";
    var champions_back = "images/gol.jpg";
    var champions_front = [
        "images/champions/1982cup.jpg",
        "images/champions/1982team.jpg",
        "images/champions/1986cup.jpg",
        "images/champions/1986team.jpg",
        "images/champions/1990cup.jpg",
        "images/champions/1990team.jpg",
        "images/champions/1994cup.jpg",
        "images/champions/1994team.jpg",
        "images/champions/1998cup.jpg",
        "images/champions/1998team.jpg",
        "images/champions/2002cup.jpg",
        "images/champions/2002team.jpg",
        "images/champions/2006cup.jpg",
        "images/champions/2006team.jpg",
        "images/champions/2010cup.jpg",
        "images/champions/2010team.jpg",
        "images/champions/2014cup.jpg",
        "images/champions/2014team.jpg"
    ];

    var results = [
        ["1982", "Correct! Italy beat West Germany 3-1 in 1982."],
        ["1986", "Correct! Argentina beat West Germany 3-2 in 1986."],
        ["1990", "Correct! West Germany beat Argentina 1-0 in 1990."],
        ["1994", "Correct! Brazil beat Italy 3-2 in 1994."],
        ["1998", "Correct! France beat Brazil 3-0 in 1998."],
        ["2002", "Correct! Brazil beat Germany 2-0 in 2002."],
        ["2006", "Correct! Italy beat France 5-3 in 2006."],
        ["2010", "Correct! Spain beat Netherlands 1-0 in 2010."],
        ["2014", "Correct! Germany beat Argentina 1-0 in 2014."]
    ]

    var background_music = document.getElementById("champion_audio");
    
    $(".medium").click(function medium_level(){
        $(".challenge").addClass("challenge_not_visible");
        $("body").addClass("champions_background");
        background_music.play();
        $(".title h1").css("padding-left", "45%").css("font-size", "30px").text("Match the Champion to the Word Cup!");
        for(i = 0; i < 6; i++){
            var row_div = $('<div>').addClass("row");
            for(j = 0; j < 3; j++){
                var first_image_tag = $('<img>');
                var card_div = $('<div>').addClass("card");
                var front_div = $('<div>').addClass("front");
                first_image_tag.appendTo(front_div);
                var second_image_tag = $('<img>');
                var back_div = $('<div>').addClass("back");
                second_image_tag.appendTo(back_div);
                card_div.append(front_div).append(back_div);
                card_div.appendTo(row_div);
            }
            row_div.appendTo("#game_area");
        }
        $(".row").addClass("champion_row");
        $(".card").addClass("champion_card");
        $(".back img").attr("src", champions_back);
        shuffle_cards(champions_front);
        $(".card").click(champions_card_clicked);
    });

    function champions_card_clicked(){
        if(can_click === true){
            $(event.target).addClass("flip");
            if(first_card === null){
                first_card = $(this);
            } else {
                second_card = $(this);
                var first_string = first_card.find(".front > img").attr("src");
                var first_year = first_string[17] + first_string[18] + first_string[19] + first_string[20];
               
                var second_string = second_card.find(".front > img").attr("src");
                var second_year = second_string[17] + second_string[18] + second_string[19] + second_string[20];

                can_click = false;
                attempts += 1;
                if(first_year === second_year){
                    for(i = 0; i < results.length; i++){
                        if(first_year === results[i][0]){
                            $(".result").css("visibility", "visible").text(results[i][1]);
                            setTimeout(remove_result, 3000);
                        }
                    }
                    match_counter += 1;
                    if(match_counter === total_matches){
                         $(".title h1").text("You win!");
                    } else {
                        first_card = null;
                        second_card = null;
                        can_click = true;
                    }
                    return match_counter;
                } else {
                    setTimeout(flip_back, 2000);
                }

            }
        }
    }

    function remove_result(){
        $(".result").css("visibility", "hidden");
    }

    // select difficulty - hard

    var trivia_background = "";
    var trivia_back = "images/trivia.jpg";
    var trivia_front = [
        "images/trivia/1.jpg",
        "images/trivia/2.jpg",
        "images/trivia/3.jpg",
        "images/trivia/4.jpg",
        "images/trivia/5.jpg",
        "images/trivia/6.jpg",
        "images/trivia/7.jpg",
        "images/trivia/8.jpg",
        "images/trivia/9.jpg",
        "images/trivia/10.jpg",
        "images/trivia/11.jpg",
        "images/trivia/12.jpg",
        "images/trivia/13.jpg",
        "images/trivia/14.jpg",
        "images/trivia/15.jpg",
        "images/trivia/16.jpg",
        "images/trivia/17.jpg",
        "images/trivia/18.jpg"
    ];

    $(".hard").click(function hard_level(){
        $(".challenge").addClass("soon").text("COMING SOON!");
    });
});













