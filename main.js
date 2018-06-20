$(document).ready(function(){

    var can_click = true;

    var first_card = null;
    var second_card = null;
    var third_card = null;

    // var mascots_back = "images/mascots.jpg";
    var superstars_back = "images/player.jpg";
    var champions_back = "images/gol.jpg";

    var match_counter = 0;
    var total_matches = 0;
    var attempts = 0;
    var misses = 0;

    var width = 0;

    var matched_cards = [];

    var gol = document.getElementById("gol");
    var whistle = document.getElementById("whistle");                   
    var ole = document.getElementById("ole");

    // PLAY LANDSCAPE ONLY

    function create_rotate_screen(){
        let rotate_div = $('<div>').addClass('portrait');
        let rotate_title = $('<h3>').text('Rotate To Play');
        let rotate_icon = $('<i>').addClass('fas fa-mobile-alt');
        $(rotate_div).append(rotate_title).append(rotate_icon);
        $('#game_area').append(rotate_div);
    }

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

    function shuffle_cards(front_array, back_array){
        var elem_index = 0;
        if($("body").hasClass("mascots_background")){
            front_array = [
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

            back_array = [
                "images/mascots_back/1.jpg",
                "images/mascots_back/2.jpg",
                "images/mascots_back/3.jpg",
                "images/mascots_back/4.jpg",
                "images/mascots_back/5.jpg",
                "images/mascots_back/6.jpg",
                "images/mascots_back/7.jpg",
                "images/mascots_back/8.jpg",
                "images/mascots_back/9.jpg",
                "images/mascots_back/1.jpg",
                "images/mascots_back/2.jpg",
                "images/mascots_back/3.jpg",
                "images/mascots_back/4.jpg",
                "images/mascots_back/5.jpg",
                "images/mascots_back/6.jpg",
                "images/mascots_back/7.jpg",
                "images/mascots_back/8.jpg",
                "images/mascots_back/9.jpg"
            ];
        } else if($("body").hasClass("superstars_background")){
            front_array = [
                "images/superstars/kane_player.jpg",
                "images/superstars/kane_club.png",
                "images/superstars/kane_country.png",
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
            front_array = [
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

        for(i = 0; i <= front_array.length; i++){
            // for(j = 0; j < matched_cards.length, j++){
            //     $("[src=" + matched_cards[j] + "]").closest('.back').addClass('matched');
            // }

            var index = Math.floor(Math.random()*front_array.length);
            // $(".front img").eq(elem_index).attr("src", front_array[index]);
            // if($.inArray(front_array[index], matched_cards) > -1){
            //     $('.no_back > img').removeClass('flip');
            // };
            // front_array.splice(index, 1);
            console.log(matched_cards);

            $(".front img").eq(elem_index).attr("src", front_array[index]);

            if($.inArray(front_array[index], matched_cards) > -1){
                $(".back img").eq(elem_index).attr("src", back_array[index]).addClass('flip');
            } else {
                $(".back img").eq(elem_index).attr("src", back_array[index]).removeClass('flip');
            }

            // $(".front img").eq(elem_index).attr("src", front_array[index]);
            // $(".back img").eq(elem_index).attr("src", back_array[index]);
            front_array.splice(index, 1);
            back_array.splice(index, 1);

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
        let set_header = $('<header>').addClass('title');
        let set_title = $('<h1>');
        $(set_header).append(set_title);
        $('#game_area').append(set_header);


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
            // $(".back img").attr("src", mascots_back);
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

    // HOW TO MASCOTS

    $(".mascots").click(function(){
        create_rotate_screen();
        rotate_screen();
        mascots_easy();
        let how_to = $('<div>').addClass('how_to');
        let example = $('<div>').addClass('example').css("border", "10px solid red");
        let instructions = $('<h1>').text("Match the mascots to each other!").css("color", "red");
        let card_wrapper = $('<div>').addClass('card_wrapper');
        let checkmark = $('<i>').addClass('fas fa-check');
        let close = $('<i>').addClass('fas fa-times').css("color", "red");
        let card1 = $('<img>').attr('src', 'images/mascots_back/1.jpg').addClass('vertical_example_cards card1');
        let card2 = $('<img>').attr('src', 'images/mascots_back/1.jpg').addClass('vertical_example_cards card2');
        let hand = $('<img>').attr('src', 'images/how_to/hand.png').addClass('hand').css({"animation-name": "move_hand", "animation-duration": "3s"});
        // var home = $('<i>').addClass('fas fa-home').css('color', 'red').attr('id', 'home');
        // $('#game_area').append(home);
        
        card_wrapper.append(card1).append(card2).append(hand).append(checkmark);
        example.append(instructions).append(card_wrapper).append(close);
        how_to.append(example);
        $('#game_area').append(how_to);
        $(".fa-times").click(remove_how_to);
        var example1_timeout = setTimeout(flip_mascot_example1, 2000);
        var example2_timeout = setTimeout(flip_mascot_example2, 3000);
        var how_to_timeout = setTimeout(remove_how_to, 6000);

        $("#home").click(function(){
            $('body').removeClass();
            $("#game_area").empty();
            remove_how_to();
            clearTimeout(example1_timeout);
            clearTimeout(example2_timeout);
            clearTimeout(how_to_timeout);
            $('.challenge').toggleClass("challenge_not_visible");
        });
    });

    function remove_how_to(){
        $('.how_to').remove();
    }

    function flip_mascot_example1(){
        $('.card1').attr('src', 'images/how_to/zabivaka.png').addClass('example_cards');
    }

    function flip_mascot_example2(){
        $('.card2').attr('src', 'images/how_to/zabivaka.png').addClass('example_cards');
    }

    // MASCOTS

    function mascots_easy(){

        // rotate_screen();
        $(".challenge").addClass("challenge_not_visible");
        $("body").addClass("mascots_background");
        $("#game_area").css({"height": "100vh", "width": "100vw"});
        create_rows();
        $(".title h1").css({"padding-left": "36%", "color": "red"}).text("World Cup Mascots");

        var home = $('<i>').addClass('fas fa-home').css('color', 'red').attr('id', 'home');
        $('#game_area').append(home);
        // create_rows();
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
                    misses = 0;
                    var image = first_card.find(".front > img").attr("src");
                    matched_cards.push(image);
                    // $(first_card.find(".back")).addClass("no_back");
                    // $(second_card.find(".back")).addClass("no_back");
                    console.log(matched_cards);
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
                    misses += 1;
                    whistle.play();
                    setTimeout(flip_back, 2000);
                    if(misses === 5){
                       setTimeout(shuffle_cards, 2000); 
                       misses = 0;
                    } 
                }

            }
        }
    }

    // HOW TO SUPERSTARS

    $(".superstars").click(function(){
        create_rotate_screen();
        rotate_screen();
        superstars_easy();
        let how_to = $('<div>').addClass('how_to');
        let example = $('<div>').addClass('example').css("border", "10px solid gold");
        let instructions = $('<h1>').text("Match the superstar to his club and country teams!").css("color", "gold");
        let card_wrapper = $('<div>').addClass('card_wrapper').css('width', '60vw');
        let checkmark = $('<i>').addClass('fas fa-check');
        let close = $('<i>').addClass('fas fa-times').css("color", "gold");
        let card1 = $('<img>').attr('src', 'images/player.jpg').addClass('vertical_example_cards card1');
        let card2 = $('<img>').attr('src', 'images/player.jpg').addClass('vertical_example_cards card2');
        let card3 = $('<img>').attr('src', 'images/player.jpg').addClass('vertical_example_cards card3');
        let hand = $('<img>').attr('src', 'images/how_to/hand.png').addClass('hand').css({"animation-name": "move_hand_three", "animation-duration": "4s"});
        let home = $('<i>').addClass('fas fa-home').css('color', 'gold');
        $('#game_area').append(home);
        card_wrapper.append(card1).append(card2).append(card3).append(hand).append(checkmark);
        example.append(instructions).append(card_wrapper).append(close);
        how_to.append(example);
        $('#game_area').append(how_to);
        $(".fa-times").click(remove_how_to);
        var example1_timeout = setTimeout(flip_superstar_example1, 2000);
        var example2_timeout = setTimeout(flip_superstar_example2, 3000);
        var example3_timeout = setTimeout(flip_superstar_example3, 4000);
        var how_to_timeout = setTimeout(remove_how_to, 6000);

        $("#home").click(function(){
            $('body').removeClass();
            $("#game_area").empty();
            remove_how_to();
            clearTimeout(example1_timeout);
            clearTimeout(example2_timeout);
            clearTimeout(example3_timeout);
            clearTimeout(how_to_timeout);
            $('.challenge').toggleClass("challenge_not_visible");
        });
    });

    function remove_how_to(){
        $('.how_to').remove();
    }

    function flip_superstar_example1(){
        $('.card1').attr('src', 'images/how_to/muller_player.jpg').addClass('example_cards');
    }

    function flip_superstar_example2(){
        $('.card2').attr('src', 'images/how_to/muller_club.png').addClass('example_cards');
    }

    function flip_superstar_example3(){
        $('.card3').attr('src', 'images/how_to/muller_country.png').addClass('example_cards');
    }

    // SUPERSTARS

    // $(".superstars").click(superstars_easy);

    function superstars_easy(){
        // rotate_screen();
        $(".challenge").addClass("challenge_not_visible");
        $("body").addClass("superstars_background");
        
        create_rows();
        $(".title h1").css({"color": "gold"}).text("World Cup Superstars");
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

    // HOW TO CHAMPIONS

    $(".champions").click(function(){
        create_rotate_screen();
        rotate_screen();
        champions_easy();
        let how_to = $('<div>').addClass('how_to');
        let example = $('<div>').addClass('example').css("border", "10px solid #00cc00");
        let instructions = $('<h1>').text("Match the World Cup to the team that won it that year!").css("color", "#00cc00");
        let card_wrapper = $('<div>').addClass('card_wrapper').css('width', '60vw');
        let checkmark = $('<i>').addClass('fas fa-check');
        let close = $('<i>').addClass('fas fa-times').css("color", "#00cc00");
        let card1 = $('<img>').attr('src', 'images/gol.jpg').addClass('horizontal_example_cards card1');
        let card2 = $('<img>').attr('src', 'images/gol.jpg').addClass('horizontal_example_cards card2');
        let hand = $('<img>').attr('src', 'images/how_to/hand.png').addClass('hand').css({"animation-name": "move_hand", "animation-duration": "3s"});
        let home = $('<i>').addClass('fas fa-home').css('color', '#00cc00');
        $('#game_area').append(home);
        card_wrapper.append(card1).append(card2).append(hand).append(checkmark);
        example.append(instructions).append(card_wrapper).append(close);
        how_to.append(example);
        $('#game_area').append(how_to);
        $(".fa-times").click(remove_how_to);
        var example1_timeout = setTimeout(flip_example1, 2000);
        var example2_timeout = setTimeout(flip_example2, 3000);
        var how_to_timeout = setTimeout(remove_how_to, 6000);

        $("#home").click(function(){
            $('body').removeClass();
            $("#game_area").empty();
            remove_how_to();
            clearTimeout(example1_timeout);
            clearTimeout(example2_timeout);
            clearTimeout(how_to_timeout);
            $('.challenge').toggleClass("challenge_not_visible");
        });
    });

    function remove_how_to(){
        $('.how_to').remove();
    }

    function flip_example1(){
        $('.card1').attr('src', 'images/how_to/1982cup.jpg').addClass('example_cards');
    }

    function flip_example2(){
        $('.card2').attr('src', 'images/how_to/1982team.jpg').addClass('example_cards');
    }

    function create_results_div(){
        let results_div = $('<div>').addClass('result');
        $('#game_area').append(results_div);
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
    
    // $(".champions").click(champions_easy);

    function champions_easy(){
        // rotate_screen();
        create_results_div();
        $(".challenge").addClass("challenge_not_visible");
        $("body").addClass("champions_background");
        
        create_rows();
        $(".title h1").text("World Cup Champions").css('color', '#00cc00');
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
        let play_again_div = $('<div>').addClass("play_again play_again_hidden");
        let play_again_options = $('<div>').addClass("play_again_options");
        $(play_again_div).append(play_again_options);
        $('#game_area').append(play_again_div);

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
            $(".play_again_options").css({"background-color": "#00cc00", "color": "white"});
            $(".play_again_buttons").css({"background-color": "white", "color": "#00cc00"});
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