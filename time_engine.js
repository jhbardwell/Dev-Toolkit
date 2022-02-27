let time = {

  create = {
    hourTally: 0,
    dayTally: 0,
    currentHour: utils.randomArray(hourRange),
    currentTOD: "",
    currentDay: utils.randomArray(dayRange),
    currentSeason: "",
  },

  update = function(){
    advanceHour();
    advanceTOD();
    advanceDay();
    advanceSeason();
    hourTally();
    dayTally();
  },

  save = {
    hourTally: time.hourTally,
    dayTally: time.dayTally,
    currentHour: time.currentHour,
    currentTOD: time.currentTOD,
    currentDay: time.currentDay,
    currentSeason: time.currentSeason,
  },

  rangeHours = utils.rangeArray(1, 24, 1),
  rangeDays = utils.rangeArray(1, 364, 1),

  tod = {
    MORNING: "MORNING",
    AFTERNOON: "AFTERNON",
    EVENING: "EVENING",
    LATENIGHT: "LATENIGHT",
  },

  season = {
    SPRING: "SPRING",
    SUMMER: "SUMMER",
    AUTUMN: "AUTUMN",
    WINTER: "WINTER",
  },

  advanceHour: function(hours) {
    if (time.currentHour >= 24) {
      time.currentHour = 1};
    time.currentHour += hours;
    time.hourTally += hours;
  },

  advanceTOD: function() {
    if (time.currentHour >= 6 && time.currentHour < 12)
      {time.currentTOD = tod.MORNING;}
    else if (time.currentHour >= 12 && time.currentHour < 18)
      {time.currentTOD = tod.AFTERNOON;}
    else if (time.currentHour >= 18 && time.currentHour <= 24)
      {time.currentTOD = tod.EVENING;}
    else if (time.currentHour >= 1 && time.currentHour < 6)
      {time.currentTOD = tod.LATENIGHT;}
  },

 advanceDay: function() {
    if (time.currentHour == 1) {
      time.currentDay += 1;
      time.dayTally +=1;
    }
  },

 advanceSeason: function() {
    if (time.currentDay >= 31 && time.currentDay < 122)
      time.currentSeason = season.SPRING;
    else if (time.currentDay >= 122 && time.currentDay < 213)
      time.currentSeason = season.SUMMER;
    else if (time.currentDay >= 213 && time.currentDay <= 304)
      timeState.currentSeason = season.AUTUMN;
    else if (time.currentDay >= 304 || time.currentDay < 31)
      time.currentSeason = season.WINTER;
  }

}
