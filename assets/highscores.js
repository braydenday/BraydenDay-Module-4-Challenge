// this will pull the highscore onto the new html page with the new js using json and local api
var highScoresText = document.querySelector("#high-scores");
let highScoresTag = '';

for (let i = 0; i < localStorage.length; i++) {
    highScoreData = JSON.parse(localStorage.getItem(i + 1));
    highScoresTag = highScoresTag.concat('</br><div id="high-scores">' + highScoreData.name + " " + "-" + " " + highScoreData.score + '</div>');
};

highScoresText.innerHTML = highScoresTag;