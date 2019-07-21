!function s(a,r,u){function d(o,e){if(!r[o]){if(!a[o]){var n="function"==typeof require&&require;if(!e&&n)return n(o,!0);if(l)return l(o,!0);var t=new Error("Cannot find module '"+o+"'");throw t.code="MODULE_NOT_FOUND",t}var i=r[o]={exports:{}};a[o][0].call(i.exports,function(e){return d(a[o][1][e]||e)},i,i.exports,s,a,r,u)}return r[o].exports}for(var l="function"==typeof require&&require,e=0;e<u.length;e++)d(u[e]);return d}({1:[function(e,o,n){"use strict";var t,i,p=(t=function(e,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,o){e.__proto__=o}||function(e,o){for(var n in o)o.hasOwnProperty(n)&&(e[n]=o[n])})(e,o)},function(e,o){function n(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(n.prototype=o.prototype,new n)});!function(e){e.defaultNextItem=null;var o=(Object.defineProperty(n.prototype,"isDisplaying",{get:function(){return this._isDisplaying},enumerable:!0,configurable:!0}),n.prototype.display=function(){this._isDisplaying=!0},n.prototype.undisplay=function(){this._isDisplaying=!1},n.prototype.getNextItem=function(){if(null!=e.defaultNextItem)return e.defaultNextItem(this);throw new Error("No default next item provided")},n.prototype.displayNext=function(){this.undisplay();var e=this.getNextItem();null!==e&&e.display()},n);function n(){this._isDisplaying=!1,this._isDisplaying=!1}e.DisplayedItem=o;var t=(Object.defineProperty(i.prototype,"question",{get:function(){return this._question},enumerable:!0,configurable:!0}),i);function i(e,o,n){void 0===n&&(n=!1),this.imgSrc=e,this.name=o,this.isCorrect=n}e.QuestionOption=t;var s,a=(p(r,s=o),r.prototype.answered=function(e){if(!this.canAnswerMultipleTimes()&&null!=this.answeredOption)throw"Cannot answer a question twice";console.log("correct: "+e.isCorrect),e.isCorrect?(this.answeredOption=e,this.correctHandler(e)):this.incorrectHandler(e)},r.prototype.correctHandler=function(e){this.displayNext()},r.prototype.incorrectHandler=function(e){this.answeredOption=null,$("#question-dialog").removeData(),$("#question-dialog").attr("data-backdrop","static"),$("#question-dialog .modal-title").text("Incorrect"),$("#question-dialog .modal-footer button").text("OK"),$("#question-dialog .modal-body").text("Sorry, that's not the right answer. Try again!"),$("#question-dialog").modal()},r.prototype.canAnswerMultipleTimes=function(){return!1},r);function r(e,o){var n=s.call(this)||this;return n.questionTitle=e,(o=u(n.options=o)).forEach(function(e){e._question=n}),n.answeredOption=null,n}function u(e){var o,n,t;for(t=e.length-1;0<t;t--)o=Math.floor(Math.random()*(t+1)),n=e[t],e[t]=e[o],e[o]=n;return e}e.Question=a,e.shuffle=u;var d,l=(p(h,d=o),h.prototype.display=function(){var e=this;setTimeout(function(){$("#question-dialog").removeData(),$("#question-dialog .modal-title").text(e.title),$("#question-dialog .modal-body").text(e.text),null!=e.buttonText?($("#question-dialog .close").show(),$("#question-dialog .modal-footer").show(),$("#question-dialog .modal-footer button").text(e.buttonText)):($("#question-dialog .close").hide(),$("#question-dialog .modal-footer").hide()),$("#question-dialog").modal({backdrop:"static"}),$("#question-dialog").one("shown.bs.modal",function(){}),$("#question-dialog").one("hidden.bs.modal",function(){e.displayNext()})},1e3)},h);function h(e,o,n){void 0===n&&(n="OK");var t=d.call(this)||this;return t.title=e,t.text=o,t.buttonText=n,t}e.InfoBox=l;var w,f=(p(c,w=o),c.prototype.display=function(){var e=this;setTimeout(function(){e.displayNext()},this.time)},c);function c(e){var o=w.call(this)||this;return o.time=e,o}e.Delay=f}(i=i||{}),i.defaultNextItem=function(e){return(h=w.indexOf(e))==w.length-1?(console.error("No next items"),null):w[++h]};var s,a=(s=i.Question,p(r,s),r.prototype.display=function(){var i=this;$(".option-buttons").empty(),this.options.forEach(function(e){var n=$("<button></button>"),o=$("<figure></figure>"),t=$("<div></div>");t.append($("<img></img>").attr("src",e.imgSrc)),o.append(t),o.append($("<figcaption></figcaption>").text(e.name)),n.data("data-option",e),n.data("data-question",i),$(".option-buttons").append(n.append(o)),n.click(function(){var e=n.data("data-option"),o=n.data("data-question");e.isCorrect&&$(".option-buttons button").prop("disabled",!0),o.answered(e)})}),$("#question-text").text(this.questionTitle),$(window).resize()},r);function r(){return null!==s&&s.apply(this,arguments)||this}var u,d=(u=i.DisplayedItem,p(l,u),l.prototype.display=function(){$("#under-construction").attr("src",this.imgSrc),this.displayNext()},l);function l(e){var o=u.call(this)||this;return o.imgSrc=e,o}var h=0,w=[new i.InfoBox("Welcome!","Welcome to Viking Virtuoso! In this game you'll learn all about Vikings while answering questions! Let's get started."),new a("How did the Vikings know where they were going?",[new i.QuestionOption("sun_and_stars.svg","By using the sun and stars",!0),new i.QuestionOption("Mountains.svg","Noticing familiar landmarks",!0),new i.QuestionOption("questionmarks.png","Guessing")]),new i.InfoBox("Correct!","The Vikings used the sun and stars as a guide, and also used landmarks like mountains. How do we know this?","Information"),new i.InfoBox("Evidence","It's known that the Vikings sailed mainly around the coast of Europe and they would use landmarks to find their way. Also, when they did head out to open sea, they would use the sun and stars. A few overcast days would be a big problem! While the Vikings themselves didn't write down what they used to navigate, the stories were handed down through the generations to Icelandic people who wrote down the informaton.","Continue"),new i.InfoBox("Did you know?","Vikings would sail in the same direction as birds, because they figured that land would be close by their nests! They also used to tell each other how to find places, just like we give each other directions!"),new a("What did the Vikings do when they reached land?",[new i.QuestionOption("sunbathing.svg","Sunbathed"),new i.QuestionOption("raid.svg","Raided",!0),new i.QuestionOption("trading.jpg","Traded",!0)]),new i.InfoBox("Right!","The Vikings used their longships to travel to places and raid! They also used them to buy/sell goods. How do we know?","Information"),new i.InfoBox("Information","We know that Vikings raided places because monks who were around wrote about the raids! We still have these documents today."),new i.InfoBox("Did you know","Vikings used their longships to trade. They would buy and sell goods anywhere from silk to slaves."),new a("Why was the longship so successful?",[new i.QuestionOption("oars.jpg","Oars were used as weapons"),new i.QuestionOption("engine.svg","An engine was used for speed"),new i.QuestionOption("storm_boat.svg","It was a very resilient design",!0)]),new i.InfoBox("Right!","The Vikings were excellent at building longships! But how do we know for sure?"),new i.InfoBox("Information","Viking longships have been found underground and archaelogists can study them to know how they were designed."),new i.InfoBox("Did you know","When longships were used for raiding, a dragon head would be put on the front to scare people. Would you be scared?","Yes!"),new d("longship.png"),new a("What kind of food did the Vikings eat?",[new i.QuestionOption("pizza.svg","Pizza"),new i.QuestionOption("meat.svg","Food from animals or fish",!0),new i.QuestionOption("bread.svg","Bread",!0)]),new i.InfoBox("Good job!","Vikings made their own bread and they also ate meat. How do we know?"),new i.InfoBox("Information","Fish and animal bones were found in the ruins of a Viking settlement."),new i.InfoBox("Did you know","Vikings must have been fairly healthy eaters as they were able to have 5 servings of fruit/vegetables each day! Kids, eat your vegetables!","No, I don't want to!"),new i.InfoBox("Also...","Vikings used cow urine to clean their clothes!","Eww!"),new a("What did Viking children do for fun?",[new i.QuestionOption("chessboard.svg","Played board games",!0),new i.QuestionOption("all_work.svg","All work, no play"),new i.QuestionOption("toy.svg","Played with toys",!0)]),new i.InfoBox("Right!","It wasn't all that different from us (until the advent of smartphones). But how do we know?"),new i.InfoBox("Information","We know the toys Viking children played with because they have been found by archaelogists."),new i.InfoBox("Did you know?","Viking children did not go to school like we do. They learned how to make things/cook/clean from adults."),new a("What was a longhouse made of?",[new i.QuestionOption("wood.svg","Wood",!0),new i.QuestionOption("bricks.svg","Bricks and cement"),new i.QuestionOption("rocks.svg","Any materials available",!0)]),new i.InfoBox("Correct!","If possible, they would build their houses out of wood, but in other places they would use whatever they could find."),new i.InfoBox("Information","Many ruins of longhouses have been found which gives us an impression of what they looked like."),new i.InfoBox("Did you know?","Longhouses were also sometimes used as barns to hold animals!"),new a("What were common jobs Vikings did?",[new i.QuestionOption("raid.svg","Raider",!0),new i.QuestionOption("farming.svg","Farmer",!0),new i.QuestionOption("fishing.svg","Fisherman",!0)]),new i.InfoBox("Right!","All of these were common jobs for Vikings."),new i.InfoBox("Information","Some Vikings were buried with their possessions. When archaelogists found their graves, it told them a lot about the Viking way of life!"),new i.InfoBox("Did you know?","Vikings would cut up bits of silver and use them as money to buy things!"),new a("What did the Vikings leave behind in Scotland?",[new i.QuestionOption("clothes.svg","Clothes"),new i.QuestionOption("language.svg","Norse language"),new i.QuestionOption("longhouse.jpg","House",!0)]),new i.InfoBox("Awesome!","Many ruins of Viking houses have been found."),new d("chessboard.svg"),new i.Delay(2e3),new d("longhouse.jpg"),new i.Delay(2e3),new d("longship.png"),new i.Delay(2e3),new d("checkmark.svg"),new i.Delay(2e3),new i.InfoBox("Great work!","You've finished the entire game!",null)];$.fn.extend({scrollCenter:function(){var e=$(this),o=(e[0].scrollWidth-e.width())/2;0!=o&&e.scrollLeft(o)}}),$(window).resize(function(){$(".option-buttons").scrollCenter()}),$(".se-pre-con").show(),$(window).on("load",function(){w[h].display(),$(window).resize(),setTimeout(function(){$(".se-pre-con").fadeOut("slow")},250)})},{}]},{},[1]);