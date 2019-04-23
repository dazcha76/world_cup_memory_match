let can_click = true;

let first_card = null;
let second_card = null;
let third_card = null;

let first_string = "";
let second_string = "";
let third_string = "";

let match_counter = 0;
let total_matches = 0;
let attempts = 0;
let misses = 0;

var width = $(window).width();

let image = "";
let matched_cards = [];

let mascots_how_to = 0;
let superstars_how_to = 0;
let champions_how_to = 0;

$(document).ready(function(){
    const gol = document.getElementById("gol");
    const whistle = document.getElementById("whistle");                   
    const ole = document.getElementById("ole");

    // PLAY LANDSCAPE ONLY

    function rotate_screen(){
        let rotate_div = $('<div>').addClass('portrait');
        let rotate_title = $('<h3>').text('Rotate To Play');
        let rotate_icon = $('<i>').addClass('fas fa-mobile-alt');
        $(rotate_div).append(rotate_title).append(rotate_icon);
        $('#game_area').append(rotate_div);

        if(width < 500){
            $(".portrait").css("visibility", "visible");
            $('.portrait i').css('animation-name', 'rotate');
        }

        $( window ).on( "orientationchange", function( event ) {
            if(orientation === 0){
                $( ".portrait" ).css("visibility", "visible");
                $('.portrait i').css('animation-name', 'rotate');
            } else {
                $( ".portrait" ).css("visibility", "hidden");
                $('.portrait i').css('animation-name', '');
            }
        });
    }

    // -------------------------------- CREATE LANDING PAGE -------------------------------- 

    function create_landing_page(){
        let option1 = $('<div>').addClass('option_buttons option1 mascots').text('Mascots');
        let pic1 = $('<img>').attr('src', 'images/mascots.jpg').addClass('card_pic');
        $(option1).append(pic1);

        let option2 = $('<div>').addClass('option_buttons option2 superstars').text('Superstars');
        let pic2 = $('<img>').attr('src', 'images/player.jpg').addClass('card_pic');
        $(option2).append(pic2);

        let option3 = $('<div>').addClass('option_buttons option3 champions').text('Champions');
        let pic3 = $('<img>').attr('src', 'images/champions2.jpg').addClass('card_pic');
        $(option3).append(pic3);

        let options_wrapper = $('<div>').addClass('options_wrapper');
        $(options_wrapper).append(option1).append(option2).append(option3);

        let options_title = $('<h2>').text('Choose a Deck:');
        let options = $('<div>').addClass('options');
        $(options).append(options_title).append(options_wrapper);

        let landing_page = $('<div>').addClass('landing_page');
        let landing_page_title = $('<h1>').text('World Cup Memory Match');
        $(landing_page).append(landing_page_title).append(options);

        $('body').append(landing_page);
    }

    // create_landing_page();

    function landing_page_mobile_portrait(){
        let option1 = $('<div>').addClass('option1 mascots').text('Mascots');
        let option2 = $('<div>').addClass('option2 superstars').text('Superstars');
        let option3 = $('<div>').addClass('option3 champions').text('Champions');

        let options_title = $('<h2>').text('Choose a Deck:');
        let options = $('<div>').addClass('mobile_options');
        $(options).append(options_title).append(option1).append(option2).append(option3);
        let welcome_page = $('<div>').addClass('mobile_challenge');
        let welcome_title = $('<h1>').text('World Cup Memory Match');
        $(welcome_page).append(welcome_title).append(options);
        $('body').append(welcome_page);

        $('.option1, .option2, .option3').addClass('mobile_option_buttons')
        
    }

    if(width > 500){
        create_landing_page();
        choose_deck();
    } else if(width < 500){
        landing_page_mobile_portrait();
        choose_deck();
    }

    // -------------------------------- CHOOSE A GAME -------------------------------- 

    function choose_deck(){
        $('.mascots').click(function(){
            $('#game_area').addClass('mascots_game');
            difficulty_level();
        });

        $('.superstars').click(function(){
            $('#game_area').addClass('superstars_game');
            difficulty_level();
        });

        $('.champions').click(function(){
            $('#game_area').addClass('champions_game');
            difficulty_level();
        });
    };

    // -------------------------------- CREATE DIFFICULTY MODAL -------------------------------- 

    function difficulty_level(){
        $('.mascots, .superstars, .champions').off('click');
        
        let soccer_ball1 = $('<img>').attr({'src': 'images/soccer_ball.png', 'id': 'soccer'});
        let soccer_ball2 = $('<img>').attr({'src': 'images/soccer_ball.png', 'id': 'soccer'});
        let soccer_ball3 = $('<img>').attr({'src': 'images/soccer_ball.png', 'id': 'soccer'});

        let easy_instructions = $('<p>').text('This is your basic memory match game. Just match the images to each other and win!');
        let medium_instructions = $('<p>').text('This game has a limit to the amount of mismatched cards you can get. Guess before mismatching 5 pairs and you win!');
        let hard_instructions = $('<p>').text("Mismatch cards 3 times in a row and the cards will be shuffled! Try to match them all before the 3rd shuffle to win!");
        
        $('.options h2').text('Choose Difficulty Level:');
        $('.option1').text('Easy').detach('img').append(easy_instructions);
        $('.option2').text('Medium').detach('img').append(medium_instructions);
        $('.option3').text('Hard').detach('img').append(hard_instructions);

        $('.option1').removeClass('mascots').addClass('easy');
        $('.option2').removeClass('superstars').addClass('medium');
        $('.option3').removeClass('champions').addClass('hard');


        if(width > 500){
            $('.option1').append(soccer_ball1);
            $('.option2').append(soccer_ball2);
            $('.option3').append(soccer_ball3);
        }

        $('.easy').click(function(){
            $('#game_area').attr({'data-difficulty': 'easy'});
            create_gameboard();
        });

        $('.medium').click(function(){
            $('#game_area').attr({'data-difficulty': 'medium'});
            create_gameboard();
        });

        $('.hard').click(function(){
            $('#game_area').attr({'data-difficulty': 'hard'});
            create_gameboard();
        });
    }

    // -------------------------------- CREATE GAMEBOARD -------------------------------- 

    function create_gameboard(){
        rotate_screen();

        $(".landing_page").addClass("landing_page_not_visible");

        let set_header = $('<header>').addClass('title');
        let set_title = $('<h1>');
        $(set_header).append(set_title);
        $('#game_area').append(set_header);

        $("#game_area").css({"height": "100vh", "width": "100vw"});
        let home = $('<i>').addClass('fas fa-home').attr('id', 'home');
        $('#game_area').append(home);

        if($('#game_area').hasClass('mascots_game')){
            $("body").addClass("mascots_background");
            $(".title h1").css({"padding-left": "36%", "color": "red"}).text("World Cup Mascots");
            $('#home').css('color', 'red');
        } else if($('#game_area').hasClass('superstars_game')){
            $("body").addClass("superstars_background");
            $(".title h1").css({"color": "gold"}).text("World Cup Superstars");
            $('#home').css('color', 'gold');
        } else if($('#game_area').hasClass('champions_game')){
            $("body").addClass("champions_background");
            $(".title h1").text("World Cup Champions").css('color', '#812dff');
            $('#home').css('color', '#812dff');
            create_results_div();
        }

        create_rows();
    }

    // -------------------------------- CREATE ROWS -------------------------------- 

    function create_rows(){

        let game_board = $('<div>').addClass('game_board');
        let cards = $('<div>').addClass('cards');
        let legend = $('<div>').addClass('legend');
        let title = $('<h1>').text('Match the following cards:');
        let card1 = $('<img>').addClass('player');
        let card2 = $('<img>').addClass('club');
        let card3 = $('<img>').addClass('country');

        $(legend). append(title, card1, card2, card3)

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
                if($("body").hasClass("mascots_background")){
                    row_div.appendTo("#game_area");
                } else if($("body").hasClass("superstars_background")){
                    row_div.appendTo(cards);
                }  
            }
            if($("body").hasClass("superstars_background")){
                $(game_board).append(cards, legend);
                $('#game_area').append(game_board)
            }
        }

        if($("body").hasClass("mascots_background")){
            $(".row").addClass("mascot_row");
            $(".card").addClass("mascot_card");
        } else if($("body").hasClass("superstars_background")){
            $(".row").addClass("superstar_row");
            $(".card").addClass("superstar_card");
        } else if($("body").hasClass("champions_background")){
            $(".row").addClass("champion_row");
            $(".card").addClass("champion_card");
        }

        shuffle_cards();
        how_to();
        $(".card").click(flip_cards);
    }

    // -------------------------------- SHUFFLE AND DEAL CARDS -------------------------------- 

    function shuffle_cards(front_cards, back_card){
        var elem_index = 0;
        if($("body").hasClass("mascots_background")){
            front_cards = [
                "images/mascots/ciao1.jpg",
                "images/mascots/ciao2.jpg",
                "images/mascots/footix1.jpg",
                "images/mascots/footix2.jpg",
                "images/mascots/fuleco1.jpg",
                "images/mascots/fuleco2.jpg",
                "images/mascots/goleo1.jpg",
                "images/mascots/goleo2.jpg",
                "images/mascots/naranjito1.jpg",
                "images/mascots/naranjito2.jpg",
                "images/mascots/pique1.jpg",
                "images/mascots/pique2.jpg",
                "images/mascots/spheriks1.jpg",
                "images/mascots/spheriks2.jpg",
                "images/mascots/striker1.jpg",
                "images/mascots/striker2.jpg",
                "images/mascots/zakumi1.jpg",
                "images/mascots/zakumi2.jpg"
            ];
            back_card = "images/mascots.jpg";
        } else if($("body").hasClass("superstars_background")){
            front_cards = [
                "images/superstars/kane_player.png",
                "images/superstars/kane_club.png",
                "images/superstars/kane_country.png",
                "images/superstars/grie_player.png",
                "images/superstars/grie_club.png",
                "images/superstars/grie_country.png",
                "images/superstars/mess_player.png",
                "images/superstars/mess_club.png",
                "images/superstars/mess_country.png",
                "images/superstars/neym_player.png",
                "images/superstars/neym_club.png",
                "images/superstars/neym_country.png",
                "images/superstars/rona_player.png",
                "images/superstars/rona_club.png",
                "images/superstars/rona_country.png",
                "images/superstars/sala_player.png",
                "images/superstars/sala_club.png",
                "images/superstars/sala_country.png",
            ];
            back_card = "images/player.jpg";
        } else if($("body").hasClass("champions_background")){
            front_cards = [
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
            back_card = "images/champions.jpg";
        }

        for(i = 0; i <= front_cards.length; i++){
            let index = Math.floor(Math.random()*front_cards.length);
            $(".front img").eq(elem_index).attr("src", front_cards[index]);

            if($.inArray(front_cards[index], matched_cards) > -1){
                $(".back img").eq(elem_index).attr("src", back_card).addClass('flip');
            } else {
                $(".back img").eq(elem_index).attr("src", back_card).removeClass('flip');
            }
            front_cards.splice(index, 1);
            elem_index += 1;
            i = 0;
        }

    }

    // -------------------------------- CREATE HOW TO MODAL -------------------------------- 

    function how_to(){
        let how_to = $('<div>').addClass('how_to');
        let example = $('<div>').addClass('example');
        let instructions = $('<h1>');
        let card_wrapper = $('<div>').addClass('card_wrapper');
        let checkmark = $('<i>').addClass('fas fa-check');
        let close = $('<i>').addClass('fas fa-times');
        let card1 = $('<img>').addClass('card1');
        let card2 = $('<img>').addClass('card2');
        let card3 = $('<img>').addClass('card3');
        let hand = $('<img>').attr('src', 'images/how_to/hand.png').addClass('hand');

        let example1_timeout;
        let example2_timeout;
        let example3_timeout;
        let how_to_timeout;
        
        example.append(instructions).append(card_wrapper).append(close);
        how_to.append(example);
        $('#game_area').append(how_to);

        if($('#game_area').hasClass('mascots_game')){
            card_wrapper.append(card1).append(card2).append(hand).append(checkmark);
            $('.example h1').text("Match the mascots to each other!").css("color", "red");
            $('.example').css("border", "10px solid red");
            $('.card_wrapper, .fas.fa-times').css("color", "red");
            $('.card1, .card2').attr('src', 'images/mascots.jpg').addClass('vertical_example_cards');
            $('.hand').css({"animation-name": "move_hand_mascots", "animation-duration": "3s"});
            example1_timeout = setTimeout(flip_mascot_example1, 2000);
            example2_timeout = setTimeout(flip_mascot_example2, 3000);
            how_to_timeout = setTimeout(remove_how_to, 6000);
        } else if($('#game_area').hasClass('superstars_game')){
            card_wrapper.append(card1).append(card2).append(card3).append(hand).append(checkmark);
            $('.example h1').text("Match the superstar to his club and country teams!").css("color", "gold");
            $('.example').css("border", "10px solid gold");
            $('.card_wrapper').css('width', '60vw');
            $('.fas.fa-times').css("color", "gold");
            $('.card1, .card2, .card3').attr('src', 'images/player.jpg').addClass('vertical_example_cards');;
            $('.hand').css({"animation-name": "move_hand_superstars", "animation-duration": "4s"});
            example1_timeout = setTimeout(flip_superstar_example1, 2000);
            example2_timeout = setTimeout(flip_superstar_example2, 3000);
            example3_timeout = setTimeout(flip_superstar_example3, 4000);
            how_to_timeout = setTimeout(remove_how_to, 6000);
        } else if($('#game_area').hasClass('champions_game')){
            card_wrapper.append(card1).append(card2).append(hand).append(checkmark);
            $('.example h1').text("Match the World Cup to the team that won it that year!").css("color", "#812dff")
            $('.example').css("border", "10px solid #812dff");
            $('.card_wrapper').css('width', '60vw');
            $('.fas.fa-times').css("color", "#812dff");
            $('.card1, .card2').attr('src', 'images/champions.jpg').addClass('horizontal_example_cards');
            $('.hand').css({"animation-name": "move_hand_champions", "animation-duration": "3s"});
            example1_timeout = setTimeout(flip_example1, 2000);
            example2_timeout = setTimeout(flip_example2, 3000);
            how_to_timeout = setTimeout(remove_how_to, 6000);
        }

        $(".fa-times").click(remove_how_to);

        $("#home").click(function(){
            $('body').removeClass();
            $('#game_area').css({'width' : '', 'height' : ''}).removeClass();
            $('#game_area').empty();
            $('.landing_page').remove();
            clearTimeout(example1_timeout);
            clearTimeout(example2_timeout);
            clearTimeout(how_to_timeout);
            create_landing_page();
            choose_deck();
        });
    }

    function return_home(){

    }

    function remove_how_to(){
        $('.how_to').remove();
    }

    function flip_mascot_example1(){
        $('.card1').attr('src', 'images/how_to/zabivaka.png');
    }

    function flip_mascot_example2(){
        $('.card2').attr('src', 'images/how_to/zabivaka.png');
    }

    function flip_superstar_example1(){
        $('.card1').attr('src', 'images/how_to/muller_player.jpg');
    }

    function flip_superstar_example2(){
        $('.card2').attr('src', 'images/how_to/muller_club.png');
    }

    function flip_superstar_example3(){
        $('.card3').attr('src', 'images/how_to/muller_country.png');
    }

    function flip_example1(){
        $('.card1').attr('src', 'images/how_to/1982cup.jpg');
    }

    function flip_example2(){
        $('.card2').attr('src', 'images/how_to/1982team.jpg');
    }

    // -------------------------------- FLIP CARDS --------------------------------

    function flip_cards(){
        if($('#game_area').hasClass('mascots_game')){
            total_matches = 9;
            if(can_click === true){
                $(event.target).addClass("flip");
                if(first_card === null){
                    first_card = $(this);
                } else if($(this).find(".front > img").attr("src") !== first_card.find(".front > img").attr("src")){
                    second_card = $(this);
                    can_click = false;

                    first_string = first_card.find(".front > img").attr("src");
                    var first_mascot = first_string[15] + first_string[16];
                   
                    second_string = second_card.find(".front > img").attr("src");
                    var second_mascot = second_string[15] + second_string[16];
                    
                    if(first_mascot === second_mascot){
                        gol.play();
                        match_counter += 1;
                        image = first_string;
                        matched_cards.push(image);
                        image = second_string;
                        matched_cards.push(image);
                        if($('#game_area').attr('data-difficulty') === 'hard'){
                            misses = 0;
                        }
                        if(match_counter === total_matches){
                            setTimeout(play_again, 1500);
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
                        if($('#game_area').attr('data-difficulty') === 'medium'){
                            if(misses === 5){
                                setTimeout(play_again, 1500);
                            }
                        } else if($('#game_area').attr('data-difficulty') === 'hard'){
                            if(misses === 3){
                                if(attempts === 3){
                                    setTimeout(play_again, 1500);
                                } else {
                                    setTimeout(shuffle_cards, 2000); 
                                    misses = 0;
                                    attempts += 1;
                                }
                            }
                        }
                    }
                }
            }
        } else if($('#game_area').hasClass('superstars_game')){
            total_matches = 6;
            if(can_click === true){
                $(event.target).addClass("flip");
                if(first_card === null){
                    first_card = $(this);
                    let player_name = (first_card.find(".front > img").attr("src")).substr(18, 4);
                    $('.player').addClass('matches').attr('src', `images/superstars/${player_name}_player.png`)
                    $('.club').addClass('matches').attr('src', `images/superstars/${player_name}_club.png`)
                    $('.country').addClass('matches').attr('src', `images/superstars/${player_name}_country.png`)
                } else if (second_card === null){
                    second_card = $(this);

                } else {
                    third_card = $(this);

                    can_click = false;

                    first_string = first_card.find(".front > img").attr("src");
                    var first_player = first_string[18];
                    
                    second_string = second_card.find(".front > img").attr("src");
                    var second_player = second_string[18];
                    
                    third_string = third_card.find(".front > img").attr("src");
                    var third_player = third_string[18];
                    
                    if(first_player === second_player && first_player === third_player){
                        match_counter += 1;
                        image = first_string;
                        matched_cards.push(image);
                        image = second_string;
                        matched_cards.push(image);
                        image = third_string;
                        matched_cards.push(image);
                        $('.player').removeClass('matches').removeAttr('src');
                        $('.club').removeClass('matches').removeAttr('src');
                        $('.country').removeClass('matches').removeAttr('src');
                        if($('#game_area').attr('data-difficulty') === 'hard'){
                            misses = 0;
                        }
                        if(match_counter === total_matches){
                            setTimeout(play_again, 1500);
                        } else {
                            setTimeout(remove_card, 2000);
                            can_click = true;
                        }
                        return match_counter;
                    } else {
                        misses += 1;
                        setTimeout(flip_back, 2000);
                        if($('#game_area').attr('data-difficulty') === 'medium'){
                            if(misses === 5){
                                setTimeout(play_again, 1500);
                            }
                        } else if($('#game_area').attr('data-difficulty') === 'hard'){
                            if(misses === 3){
                                if(attempts === 3){
                                    setTimeout(play_again, 1500);
                                } else {
                                    setTimeout(shuffle_cards, 2000); 
                                    misses = 0;
                                    attempts += 1;
                                }
                            }
                        }
                    }
                }
            }

        } else if($('#game_area').hasClass('champions_game')){
            total_matches = 8;
            if(can_click === true){
                $(event.target).addClass("flip");
                if(first_card === null){
                    first_card = $(this);
                } else if($(this).find(".front > img").attr("src") !== first_card.find(".front > img").attr("src")){
                    second_card = $(this);
                    can_click = false;

                    first_string = first_card.find(".front > img").attr("src");
                    var first_year = first_string[17] + first_string[18] + first_string[19] + first_string[20];
                   
                    second_string = second_card.find(".front > img").attr("src");
                    var second_year = second_string[17] + second_string[18] + second_string[19] + second_string[20];

                    if(first_year === second_year){
                        for(i = 0; i < results.length; i++){
                            if(first_year === results[i][0]){
                                $(".result").css("visibility", "visible").text(results[i][1]);
                                setTimeout(remove_result, 3000);
                            }
                        }
                        match_counter += 1;
                        image = first_string;
                        matched_cards.push(image);
                        image = second_string;
                        matched_cards.push(image);
                        if($('#game_area').attr('data-difficulty') === 'hard'){
                            misses = 0;
                        }
                        if(match_counter === total_matches){
                            setTimeout(play_again, 1500);
                        } else {
                            first_card = null;
                            second_card = null;
                            can_click = true;
                        }
                        return match_counter;
                    } else {
                        misses += 1;
                        setTimeout(flip_back, 2000);
                        if($('#game_area').attr('data-difficulty') === 'medium'){
                            if(misses === 5){
                                setTimeout(play_again, 1500);
                            }
                        } else if($('#game_area').attr('data-difficulty') === 'hard'){
                            if(misses === 3){
                                if(attempts === 3){
                                    setTimeout(play_again, 1500);
                                } else {
                                    setTimeout(shuffle_cards, 2000); 
                                    misses = 0;
                                    attempts += 1;
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    function remove_card(){
        first_card.addClass("remove");
        second_card.addClass("remove");
        third_card.addClass("remove");
        first_card = null;
        second_card = null;
        third_card = null;
        can_click = true;
    }

    // CHAMPIONS RESULTS

    var results = [
        ["1986", "Correct! Argentina beat West Germany 3-2 in 1986."],
        ["1990", "Correct! West Germany beat Argentina 1-0 in 1990."],
        ["1994", "Correct! Brazil beat Italy 3-2 in 1994."],
        ["1998", "Correct! France beat Brazil 3-0 in 1998."],
        ["2002", "Correct! Brazil beat Germany 2-0 in 2002."],
        ["2006", "Correct! Italy beat France 5-3 in 2006."],
        ["2010", "Correct! Spain beat Netherlands 1-0 in 2010."],
        ["2014", "Correct! Germany beat Argentina 1-0 in 2014."]
    ];

    function create_results_div(){
        let results_div = $('<div>').addClass('result');
        $('#game_area').append(results_div);
    }

    function remove_result(){
        $(".result").css("visibility", "hidden");
    }

    // FLIP CARDS BACK

    function flip_back(){
        first_card.find(".back > img").removeClass("flip");
        second_card.find(".back > img").removeClass("flip");
        first_card = null;
        second_card = null;
        if($("body").hasClass("superstars_background")){
            $('.player').removeClass('matches').removeAttr('src');
            $('.club').removeClass('matches').removeAttr('src');
            $('.country').removeClass('matches').removeAttr('src');
            third_card.find(".back > img").removeClass("flip");
            third_card = null;
        } 
        can_click = true;  
    };

    // PLAY AGAIN

    function play_again(){
        misses = 0;
        attempts = 0;

        let play_again_div = $('<div>').addClass("play_again play_again_hidden");
        let play_again_options = $('<div>').addClass("play_again_options");
        $(play_again_div).append(play_again_options);
        $('#game_area').append(play_again_div);

        var win_title = $("<h2>").text("You Win!");
        var lose_title = $("<h2>").text("You Lose!");

        if(match_counter === total_matches){
            win_title.appendTo(".play_again_options");
        } else {
            lose_title.appendTo(".play_again_options");
        }
        
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
            $(".play_again_options").css({"background-color": "#812dff", "color": "white"});
            $(".play_again_buttons").css({"background-color": "white", "color": "#812dff"});
        }

        $(".first_button").click(function (){
            rebuild_board();
        });

        $(".second_button").click(function make_harder(){
            $(".play_again h2").text("Choose Difficulty Level:");
            $(first_button).text("Easy").off("click");
            $(second_button).text("Medium").off("click");
            $(third_button).text("Hard").off("click");

            $(first_button).click(function(){
                $('#game_area').attr({'data-difficulty': 'easy'});
                rebuild_board();
            });

            $(second_button).click(function(){
                $('#game_area').attr({'data-difficulty': 'medium'});
                rebuild_board();
            });

            $(third_button).click(function(){
                $('#game_area').attr({'data-difficulty': 'hard'});
                rebuild_board();
            });
        });

        $(".third_button").click(function(){
            $(".play_again h2").text("Choose a Set:");
            $(first_button).text("Mascots").off("click");
            $(second_button).text("Superstars").off("click");
            $(third_button).text("Champions").off("click");

            $(first_button).click(function(){
                $("body").removeClass();
                $("section").removeClass().empty();
                $('.landing_page').remove();
                
                $("body").addClass("mascots_background");
                $('#game_area').addClass('mascots_game');

                change_deck();

                create_rows();
            });

            $(second_button).click(function(){
                $("body").removeClass();
                $("section").removeClass().empty();
                $('.landing_page').remove();
                
                $("body").addClass("superstars_background");
                $('#game_area').addClass('superstars_game');

                change_deck();

                create_rows();
            });

            $(third_button).click(function(){
                $("body").removeClass();
                $("section").removeClass().empty();
                $('.landing_page').remove();
                
                $("body").addClass("champions_background");
                $('#game_area').addClass('champions_game');

                change_deck();

                create_rows();  
            });
        });

        function rebuild_board(){
            $(".play_again").addClass("play_again_hidden");
            $(".play_again_options").empty();
            $(".row").remove();
            create_rows();
            remove_how_to();
            $(".back > img").removeClass("flip")
            first_card = null;
            second_card = null;
            can_click = true;  
            match_counter = 0
        };

        function change_deck(){
            let set_header = $('<header>').addClass('title');
            let set_title = $('<h1>');
            $(set_header).append(set_title);
            $('#game_area').append(set_header);

            $("#game_area").css({"height": "100vh", "width": "100vw"});
            let home = $('<i>').addClass('fas fa-home').attr('id', 'home');
            $('#game_area').append(home);

            if($('#game_area').hasClass('mascots_game')){
                $("body").addClass("mascots_background");
                $(".title h1").css({"padding-left": "36%", "color": "red"}).text("World Cup Mascots");
                $('#home').css('color', 'red');
            } else if($('#game_area').hasClass('superstars_game')){
                $("body").addClass("superstars_background");
                $(".title h1").css({"color": "gold"}).text("World Cup Superstars");
                $('#home').css('color', 'gold');
            } else if($('#game_area').hasClass('champions_game')){
                $("body").addClass("champions_background");
                $(".title h1").text("World Cup Champions").css('color', 'black');
                $('#home').css('color', 'black');
                create_results_div();
            }

            // $(".title h1").text("").removeAttr("style");
            // $(".row").remove();

            // $(".play_again").addClass("play_again_hidden");
            // $(".play_again_options").empty();
        }

        $(".play_again").toggleClass("play_again_hidden");
    }
});