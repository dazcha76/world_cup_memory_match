$(document).ready(function(){

    // find element index - not part of game

    // $(".card").click(function() {
    //     var address = $("div").index( this );
    //     console.log("That was div index # " + address);
    // });

    // images

    var mascots = [
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

    var champions = [
        "images/champions/1.jpg",
        "images/champions/2.jpg",
        "images/champions/3.jpg",
        "images/champions/4.jpg",
        "images/champions/5.jpg",
        "images/champions/6.jpg",
        "images/champions/7.jpg",
        "images/champions/8.jpg",
        "images/champions/9.jpg",
        "images/champions/1.jpg",
        "images/champions/2.jpg",
        "images/champions/3.jpg",
        "images/champions/4.jpg",
        "images/champions/5.jpg",
        "images/champions/6.jpg",
        "images/champions/7.jpg",
        "images/champions/8.jpg",
        "images/champions/9.jpg"
    ];

    var trivia = [
        "images/trivia/1.jpg",
        "images/trivia/2.jpg",
        "images/trivia/3.jpg",
        "images/trivia/4.jpg",
        "images/trivia/5.jpg",
        "images/trivia/6.jpg",
        "images/trivia/7.jpg",
        "images/trivia/8.jpg",
        "images/trivia/9.jpg",
        "images/trivia/1.jpg",
        "images/trivia/2.jpg",
        "images/trivia/3.jpg",
        "images/trivia/4.jpg",
        "images/trivia/5.jpg",
        "images/trivia/6.jpg",
        "images/trivia/7.jpg",
        "images/trivia/8.jpg",
        "images/trivia/9.jpg"
    ];

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
    };

    shuffle_cards(mascots);

    // game

    var first_card = null;
    var second_card = null;
    var total_matches = 9;
    var match_counter = 0;
    var can_click = true;

    var flip_back = function not_a_match(){
        first_card.find(".back > img").removeClass("flip");
        second_card.find(".back > img").removeClass("flip");
        first_card = null;
        second_card = null;
        can_click = true;
    };

        $(".card").click(function card_clicked(){
            if(can_click === true){
                $(event.target).addClass("flip");
                if(first_card === null){
                    first_card = $(this);
                } else {
                    second_card = $(this);
                    can_click = false;
                    if(first_card.find(".front > img").attr("src") === second_card.find(".front > img").attr("src")){
                        match_counter += 1;
                        console.log(match_counter);
                        if(match_counter === total_matches){
                            console.log("You win!");
                        } else {
                            first_card = null;
                            second_card = null;
                            console.log("You haven't won yet!");
                            can_click = true;
                        }
                    } else {
                        setTimeout(flip_back, 2000);
                        console.log("try again");
                    };

                };

            };

        });

});










