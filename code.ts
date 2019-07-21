
/// <reference path="node_modules/@types/jquery/index.d.ts" /> 
/// <reference path="node_modules/@types/bootstrap/index.d.ts" /> 


namespace GameTools {
    export let defaultNextItem: (current: DisplayedItem) => DisplayedItem = null;
    export abstract class DisplayedItem {
        private _isDisplaying = false;
        public get isDisplaying(): boolean {
            return this._isDisplaying;
        }
        constructor() {
            this._isDisplaying = false;
        }
        display(): void {
            this._isDisplaying = true;
        }
        undisplay(): void {
            this._isDisplaying = false;
        }
        getNextItem(): DisplayedItem {
            if (defaultNextItem != null)
                return defaultNextItem(this);
            else
                throw new Error("No default next item provided");
        }
        public displayNext(): void {
            this.undisplay();
            let item = this.getNextItem();
            if(item !== null)
                item.display();
        }

    }

    export class QuestionOption {
        _question: Question;
        public get question(): Question {
            return this._question;
        }
        constructor(public imgSrc: string, public name: string, public isCorrect = false) {
        }
    }

    export abstract class Question extends DisplayedItem {
        protected answeredOption: QuestionOption;
        constructor(protected questionTitle: string, protected options: QuestionOption[]) {
            super();
            options = shuffle(options);
            options.forEach((option: QuestionOption) => {
                option._question = this;
            });
            this.answeredOption = null;
        }
        protected answered(option: QuestionOption): void {
            if (!this.canAnswerMultipleTimes() && this.answeredOption != null)
                throw "Cannot answer a question twice";
            console.log("correct: " + option.isCorrect);
            if(!option.isCorrect) {
                this.incorrectHandler(option);
                return;
            }
            this.answeredOption = option;
            this.correctHandler(option);
        }
        protected correctHandler(option: QuestionOption): void {
            this.displayNext();
        }
        protected incorrectHandler(option: QuestionOption): void {
            this.answeredOption = null;
            $('#question-dialog').removeData();
            $("#question-dialog").attr("data-backdrop", "static");
            $("#question-dialog .modal-title").text("Incorrect");
            $("#question-dialog .modal-footer button").text("OK");
            $("#question-dialog .modal-body").text("Sorry, that's not the right answer. Try again!");
            $("#question-dialog").modal();
        }
        protected canAnswerMultipleTimes(): boolean {
            return false;
        }
        abstract display(): void;
    }

    /**
    * Shuffles array in place.
    * @param {Array} a items An array containing the items.
    */
    export function shuffle<T>(a: T[]): T[] {
        let j: number, x: T, i: number;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    export class InfoBox extends DisplayedItem {
        constructor(protected title: string, protected text: string, protected buttonText = "OK") {
            super();
        }
        display(): void {
            setTimeout(() => {
                $('#question-dialog').removeData();
                $("#question-dialog .modal-title").text(this.title);
                $("#question-dialog .modal-body").text(this.text);
                if(this.buttonText != null) {
                    $("#question-dialog .close").show();
                    $("#question-dialog .modal-footer").show();
                    $("#question-dialog .modal-footer button").text(this.buttonText);
                } else {
                    $("#question-dialog .close").hide();
                    $("#question-dialog .modal-footer").hide();
                }
                $("#question-dialog").modal( { backdrop: "static" });
                $("#question-dialog").one("shown.bs.modal", (): void => {
                    
                });
                $("#question-dialog").one("hidden.bs.modal", (): void => {
                    
                        this.displayNext();
                });
           }, 1000);
        }
    }
    export class Delay extends DisplayedItem {
        constructor(protected time: number) {
            super();
        }
        display(): void {
            setTimeout(() => {
                this.displayNext();
            }, this.time);
        }
    }
}


GameTools.defaultNextItem = function(current: GameTools.DisplayedItem): GameTools.DisplayedItem {
    contentsIndex = gameContents.indexOf(current);
    if(contentsIndex == gameContents.length - 1) {
        console.error("No next items");
        return null;
    }
    return gameContents[++contentsIndex];
}

class VikingQuestion extends GameTools.Question {
    display() : void {
        /* Display the buttons */
        $(".option-buttons").empty();
        this.options.forEach((option: GameTools.QuestionOption) => {
            let $button: JQuery = $("<button></button>");
            let $figure: JQuery = $("<figure></figure>");
            let $div: JQuery = $("<div></div>");
            $div.append($("<img></img>").attr("src", option.imgSrc));
            $figure.append($div);
            $figure.append($("<figcaption></figcaption>").text(option.name));
            $button.data("data-option", option);
            $button.data("data-question", this);
            $(".option-buttons").append($button.append($figure));
            $button.click(function() {                
                let option: GameTools.QuestionOption = $button.data("data-option");
                let question: VikingQuestion = $button.data("data-question");
                if(option.isCorrect)
                    $(".option-buttons button").prop("disabled", true);
                question.answered(option);
            });

        });
        $("#question-text").text(this.questionTitle);
        $(window).resize();
    }
}

class VikingImageChange extends GameTools.DisplayedItem {
    constructor(protected imgSrc: string) { super(); }
    display(): void {
        $("#under-construction").attr("src", this.imgSrc);
        this.displayNext();
    }
}
let contentsIndex = 0;
const gameContents: GameTools.DisplayedItem[] = [
    new GameTools.InfoBox("Welcome!", "Welcome to Viking Virtuoso! In this game you'll learn all about Vikings while answering questions! Let's get started."),
    new VikingQuestion("How did the Vikings know where they were going?", [
        new GameTools.QuestionOption("sun_and_stars.svg", "By using the sun and stars", true),
        new GameTools.QuestionOption("Mountains.svg", "Noticing familiar landmarks", true),
        new GameTools.QuestionOption("questionmarks.png", "Guessing")
    ]),
    new GameTools.InfoBox("Correct!", "The Vikings used the sun and stars as a guide, and also used landmarks like mountains. How do we know this?", "Information"),
    new GameTools.InfoBox("Evidence", "It's known that the Vikings sailed mainly around the coast of Europe and they would use landmarks to find their way. Also, when they did head out to open sea, they would use the sun and stars. A few overcast days would be a big problem! While the Vikings themselves didn't write down what they used to navigate, the stories were handed down through the generations to Icelandic people who wrote down the informaton.", "Continue"),
    new GameTools.InfoBox("Did you know?", "Vikings would sail in the same direction as birds, because they figured that land would be close by their nests! They also used to tell each other how to find places, just like we give each other directions!"),
    new VikingQuestion("What did the Vikings do when they reached land?", [
        new GameTools.QuestionOption("sunbathing.svg", "Sunbathed"),
        new GameTools.QuestionOption("raid.svg", "Raided", true),
        new GameTools.QuestionOption("trading.jpg", "Traded", true)
    ]),
    new GameTools.InfoBox("Right!", "The Vikings used their longships to travel to places and raid! They also used them to buy/sell goods. How do we know?", "Information"),
    new GameTools.InfoBox("Information", "We know that Vikings raided places because monks who were around wrote about the raids! We still have these documents today."),
    new GameTools.InfoBox("Did you know", "Vikings used their longships to trade. They would buy and sell goods anywhere from silk to slaves."),
    new VikingQuestion("Why was the longship so successful?", [
        new GameTools.QuestionOption("oars.jpg", "Oars were used as weapons"),
        new GameTools.QuestionOption("engine.svg", "An engine was used for speed"),
        new GameTools.QuestionOption("storm_boat.svg", "It was a very resilient design", true)
    ]),
    new GameTools.InfoBox("Right!", "The Vikings were excellent at building longships! But how do we know for sure?"),
    new GameTools.InfoBox("Information", "Viking longships have been found underground and archaelogists can study them to know how they were designed."),
    new GameTools.InfoBox("Did you know", "When longships were used for raiding, a dragon head would be put on the front to scare people. Would you be scared?", "Yes!"),
    new VikingImageChange("longship.png"),
    new VikingQuestion("What kind of food did the Vikings eat?", [
        new GameTools.QuestionOption("pizza.svg", "Pizza"),
        new GameTools.QuestionOption("meat.svg", "Food from animals or fish", true),
        new GameTools.QuestionOption("bread.svg", "Bread", true)
    ]),
    new GameTools.InfoBox("Good job!", "Vikings made their own bread and they also ate meat. How do we know?"),
    new GameTools.InfoBox("Information", "Fish and animal bones were found in the ruins of a Viking settlement."),
    new GameTools.InfoBox("Did you know", "Vikings must have been fairly healthy eaters as they were able to have 5 servings of fruit/vegetables each day! Kids, eat your vegetables!", "No, I don't want to!"),
    new GameTools.InfoBox("Also...", "Vikings used cow urine to clean their clothes!", "Eww!"),
    new VikingQuestion("What did Viking children do for fun?", [
        new GameTools.QuestionOption("chessboard.svg", "Played board games", true),
        new GameTools.QuestionOption("all_work.svg", "All work, no play"),
        new GameTools.QuestionOption("toy.svg", "Played with toys", true)
    ]),
    new GameTools.InfoBox("Right!", "It wasn't all that different from us (until the advent of smartphones). But how do we know?"),
    new GameTools.InfoBox("Information", "We know the toys Viking children played with because they have been found by archaelogists."),
    new GameTools.InfoBox("Did you know?", "Viking children did not go to school like we do. They learned how to make things/cook/clean from adults."),
    new VikingQuestion("What was a longhouse made of?", [
        new GameTools.QuestionOption("wood.svg", "Wood", true),
        new GameTools.QuestionOption("bricks.svg", "Bricks and cement"),
        new GameTools.QuestionOption("rocks.svg", "Any materials available", true)
    ]),
    new GameTools.InfoBox("Correct!", "If possible, they would build their houses out of wood, but in other places they would use whatever they could find."),
    new GameTools.InfoBox("Information", "Many ruins of longhouses have been found which gives us an impression of what they looked like."),
    new GameTools.InfoBox("Did you know?", "Longhouses were also sometimes used as barns to hold animals!"),
    new VikingQuestion("What were common jobs Vikings did?", [
        new GameTools.QuestionOption("raid.svg", "Raider", true),
        new GameTools.QuestionOption("farming.svg", "Farmer", true),
        new GameTools.QuestionOption("fishing.svg", "Fisherman", true)
    ]),
    new GameTools.InfoBox("Right!", "All of these were common jobs for Vikings."),
    new GameTools.InfoBox("Information", "Some Vikings were buried with their possessions. When archaelogists found their graves, it told them a lot about the Viking way of life!"),
    new GameTools.InfoBox("Did you know?", "Vikings would cut up bits of silver and use them as money to buy things!"),
    new VikingQuestion("What did the Vikings leave behind in Scotland?", [
        new GameTools.QuestionOption("clothes.svg", "Clothes"),
        new GameTools.QuestionOption("language.svg", "Norse language"),
        new GameTools.QuestionOption("longhouse.jpg", "House", true)
    ]),
    new GameTools.InfoBox("Awesome!", "Many ruins of Viking houses have been found."),
    new VikingImageChange("chessboard.svg"),
    new GameTools.Delay(2000),
    new VikingImageChange("longhouse.jpg"),
    new GameTools.Delay(2000),
    new VikingImageChange("longship.png"),
    new GameTools.Delay(2000),
    new VikingImageChange("checkmark.svg"),
    new GameTools.Delay(2000),
    new GameTools.InfoBox("Great work!", "You've finished the entire game!", null),
    
];



$.fn.extend({
    scrollCenter: function() {
        var outerContent = $(this);

        var scroll = (outerContent[0].scrollWidth - outerContent.width()) / 2;
        if(scroll === 0)
            return;

        outerContent.scrollLeft(scroll);
    }
});
$(window).resize(function() {
    ($(".option-buttons") as any).scrollCenter();
});

$(".se-pre-con").show();

$(window).on("load", function() {
    // Animate loader off screen

    
    
    gameContents[contentsIndex].display();
    
    $(window).resize();
    setTimeout(function() {
        $(".se-pre-con").fadeOut("slow");
    }, 250);
});
