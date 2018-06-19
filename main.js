$(document).ready(function(){

    var can_click = true;

    var first_card = null;
    var second_card = null;
    var third_card = null;

    var mascots_back = "images/mascots.jpg";
    var superstars_back = "images/player.jpg";
    var champions_back = "images/gol.jpg";

    var match_counter = 0;
    var total_matches = 0;
    var attempts = 0;

    var width = 0;

    var gol = document.getElementById("gol");
    var whistle = document.getElementById("whistle");                   
    var ole = document.getElementById("ole");

    // PLAY LANDSCAPE ONLY

    function rotate_screen(){
        width = $(window).width();
        if(width < 640){
            $(".portrait").css("visibility", "visible");
        }

        $( window ).on( "orientationchange", function( event ) {
            if(orientation === 0){
                $( ".portrait" ).css("visibility", "visible");
            } else {
                $( ".portrait" ).css("visibility", "hidden");
            }
        });
    }

    // SHUFFLE AND DEAL CARDS

    function shuffle_cards(pic_array){
        var elem_index = 0;
        if($("body").hasClass("mascots_background")){
            pic_array = [
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
        } else if($("body").hasClass("superstars_background")){
            pic_array = [
                "images/superstars/buffon_player.jpg",
                "images/superstars/buffon_club.png",
                "images/superstars/buffon_country.png",
                "images/superstars/griezmann_player.jpg",
                "images/superstars/griezmann_club.png",
                "images/superstars/griezmann_country.png",
                "images/superstars/messi_player.jpg",
                "images/superstars/messi_club.jpg",
                "images/superstars/messi_country.jpg",
                "images/superstars/neymar_player.jpg",
                "images/superstars/neymar_club.png",
                "images/superstars/neymar_country.png",
                "images/superstars/ronaldo_player.png",
                "images/superstars/ronaldo_club.jpg",
                "images/superstars/ronaldo_country.png",
                "images/superstars/salah_player.jpg",
                "images/superstars/salah_club.png",
                "images/superstars/salah_country.png",
            ];
        } else if($("body").hasClass("champions_background")){
            pic_array = [
                // "images/champions/1982cup.jpg",
                // "images/champions/1982team.jpg",
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
        }
        for(i = 0; i <= pic_array.length; i++){
            var index = Math.floor(Math.random()*pic_array.length);
            $(".front img").eq(elem_index).attr("src", pic_array[index]);
            pic_array.splice(index, 1);
            elem_index += 1;
            i = 0;
        }
    }

    // FLIP CARDS BACK

    function flip_back(){
        first_card.find(".back > img").removeClass("flip");
        second_card.find(".back > img").removeClass("flip");
        first_card = null;
        second_card = null;
        if($("body").hasClass("superstars_background")){
            third_card.find(".back > img").removeClass("flip");
            third_card = null;
        } 
        can_click = true;  
    };

    function create_rows(){
        if($("body").hasClass("champions_background")){
            for(i = 0; i < 4; i++){
                var row_div = $('<div>').addClass("row");
                for(j = 0; j < 4; j++){
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
        } else {
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
        }

        if($("body").hasClass("mascots_background")){
            $(".row").addClass("mascot_row");
            $(".card").addClass("mascot_card");
            $(".back img").attr("src", mascots_back);
            $(".card").click(mascots_card_clicked);
        } else if($("body").hasClass("superstars_background")){
            $(".row").addClass("superstar_row");
            $(".card").addClass("superstar_card");
            $(".back img").attr("src", superstars_back);
            $(".card").click(superstars_card_clicked);
        } else if($("body").hasClass("champions_background")){
            $(".row").addClass("champion_row");
            $(".card").addClass("champion_card");
            $(".back img").attr("src", champions_back);
            $(".card").click(champions_card_clicked);
        }
        shuffle_cards();
    }

    // HOW TO

    $(".mascots").click(function(){
        mascots_easy();
        let how_to = $('<div>').addClass('how_to');
        let example = $('<div>').addClass('example');
        let instructions = $('<h1>').text("To win, simply match the mascots to each other until all have been matched!");
        let card_wrapper = $('<div>').addClass('card_wrapper');
        let checkmark = $('<i>').addClass('fas fa-check');
        // let card1 = $('<img>').attr('src', 'images/how_to/zabivaka.png');
        // let card2 = $('<img>').attr('src', 'images/how_to/zabivaka.png');
        let card1 = $('<img>').attr('src', 'images/mascots.jpg').addClass('example_cards card1');
        let card2 = $('<img>').attr('src', 'images/mascots.jpg').addClass('example_cards card2');
        let hand = $('<img>').attr('src', 'images/how_to/hand.png').addClass('hand');
        card_wrapper.append(card1).append(card2).append(hand).append(checkmark);
        example.append(instructions).append(card_wrapper);
        how_to.append(example);
        $('#game_area').append(how_to);
        setTimeout(flip_example1, 2000);
        setTimeout(flip_example2, 3000);
        setTimeout(remove_how_to, 6000);
    });

    function remove_how_to(){
        $('.how_to').remove();
    }

    function flip_example1(){
        $('.card1').attr('src', 'images/how_to/zabivaka.png').addClass('example_cards');
    }

    function flip_example2(){
        $('.card2').attr('src', 'images/how_to/zabivaka.png').addClass('example_cards');
    }

    // MASCOTS

    // $(".mascots").click(mascots_easy);

    function mascots_easy(){
        rotate_screen();
        $(".challenge").addClass("challenge_not_visible");
        $("body").addClass("mascots_background");
        $("#game_area").css({"height": "100vh", "width": "100vw"});
        $(".title h1").css({"padding-left": "36%", "color": "red"}).text("World Cup Mascots");
        create_rows();
    }

    function mascots_card_clicked(){
        total_matches = 9;
        if(can_click === true){
            $(event.target).addClass("flip");
            console.log(event.target)
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
                        // ole.play();
                        setTimeout(win_modal, 1500);
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

    // SUPERSTARS

    $(".superstars").click(superstars_easy);

    function superstars_easy(){
        rotate_screen();
        $(".challenge").addClass("challenge_not_visible");
        $("body").addClass("superstars_background");
        $(".title h1").css({"color": "gold"}).text("World Cup Superstars");
        create_rows();
    }

    function superstars_card_clicked(){
        total_matches = 6;
        if(can_click === true){
            $(event.target).addClass("flip");
            if(first_card === null){
                first_card = $(this);
                
            } else if (second_card === null){
                second_card = $(this);
                
            } else {
                third_card = $(this);
                
                var first_string = first_card.find(".front > img").attr("src");
                var first_player = first_string[18];
               
                var second_string = second_card.find(".front > img").attr("src");
                var second_player = second_string[18];

                var third_string = third_card.find(".front > img").attr("src");
                var third_player = third_string[18];

                can_click = false;
                attempts += 1;
                if(first_player === second_player && first_player === third_player){
                    match_counter += 1;
                    if(match_counter === total_matches){
                         setTimeout(win_modal, 1500);
                    } else {
                        setTimeout(remove_card, 2000);
                    }
                    return match_counter;
                } else {
                    setTimeout(flip_back, 2000);
                }

            }
        }
    }

    function remove_card(){
        first_card.addClass("remove");
        second_card.addClass("remove");
        third_card.addClass("remove");
        first_card = null;
        second_card = null;
        third_card = null;
        can_click = true;
    }

    // CHAMPIONS

    var results = [
        // ["1982", "Correct! Italy beat West Germany 3-1 in 1982."],
        ["1986", "Correct! Argentina beat West Germany 3-2 in 1986."],
        ["1990", "Correct! West Germany beat Argentina 1-0 in 1990."],
        ["1994", "Correct! Brazil beat Italy 3-2 in 1994."],
        ["1998", "Correct! France beat Brazil 3-0 in 1998."],
        ["2002", "Correct! Brazil beat Germany 2-0 in 2002."],
        ["2006", "Correct! Italy beat France 5-3 in 2006."],
        ["2010", "Correct! Spain beat Netherlands 1-0 in 2010."],
        ["2014", "Correct! Germany beat Argentina 1-0 in 2014."]
    ]
    
    $(".champions").click(champions_easy);

    function champions_easy(){
        rotate_screen();

        $(".challenge").addClass("challenge_not_visible");
        $("body").addClass("champions_background");
        $(".title h1").text("World Cup Champions");
        create_rows();
    }

    function champions_card_clicked(){
        total_matches = 8;
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
                         setTimeout(win_modal, 1500);
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


    // PLAY AGAIN

    function win_modal(){
        var win_title = $("<h2>").text("You Win!");
        win_title.appendTo(".play_again_options");

        var first_button = $('<div>').addClass("play_again_buttons first_button").text("Play Again");
        var second_button = $('<div>').addClass("play_again_buttons second_button").text("Change Difficulty");
        var third_button = $('<div>').addClass("play_again_buttons third_button").text("Change Deck");
        
        first_button.appendTo(".play_again_options");
        second_button.appendTo(".play_again_options");
        third_button.appendTo(".play_again_options");

        if($("body").hasClass("mascots_background")){
            $(".play_again_options").css({"background-color": "red", "color": "white"});
            $(".play_again_buttons").css({"background-color": "white", "color": "red"});
        } else if($("body").hasClass("superstars_background")){
            $(".play_again_options").css({"background-color": "gold", "color": "white"});
            $(".play_again_buttons").css({"background-color": "white", "color": "gold"});
        } else if($("body").hasClass("champions_background")){
            $(".play_again_options").css({"background-color": "green", "color": "white"});
            $(".play_again_buttons").css({"background-color": "white", "color": "green"});
        }

        $(".first_button").click(function (){
            $(".play_again").addClass("play_again_hidden");
            $(".play_again_options").empty();
            $(".row").remove();
            create_rows();
            first_card = null;
            second_card = null;
            can_click = true;  
            match_counter = 0
        });

        $(".second_button").click(function make_harder(){
            console.log("Make it harder!!");
        });

        $(".third_button").click(function(){
            $(".play_again h2").text("Choose a Set:");
            $(first_button).text("Mascots").off("click");
            $(second_button).text("Superstars").off("click");
            $(third_button).text("Champions").off("click");

            $(first_button).click(function(){
                change_deck();
                mascots_easy();
            });
            $(second_button).click(function(){
                change_deck();
                superstars_easy();
            });
            $(third_button).click(function(){
                change_deck();
                champions_easy();
            });
        });

        function change_deck(){
            $(".title h1").text("").removeAttr("style");
            $(".row").remove();
            $("body").removeAttr("class");
            $(".play_again").addClass("play_again_hidden");
            $(".play_again_options").empty();
            first_card = null;
            second_card = null;
            can_click = true;  
            match_counter = 0
        }

        $(".play_again").toggleClass("play_again_hidden");
    }
});