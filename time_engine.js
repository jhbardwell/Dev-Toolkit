let time = {

  create = {
    dayTally: 0,
    currentHour: utils.randomArray(rangeHours),
    currentTOD: "",
    currentDay: utils.randomArray(rangeDays),
    currentMonth: "",
    currentSeason: "",
  },

  update = function(){
    dayTally();
    advanceHour();
    advanceTOD();
    advanceDay();
    advanceMonth();
    advanceSeason();
  },

  save = {
    dayTally: time.dayTally,
    currentHour: time.currentHour,
    currentTOD: time.currentTOD,
    currentDay: time.currentDay,
    currentMonth: time.currentMonth,
    currentSeason: time.currentSeason
  },

  rangeHours = utils.rangeArray(1, 24, 1),
  rangeDays = utils.rangeArray(1, 364, 1),
    
  tod = {
    DAWN: "DAWN",
    MORNING: "MORNING",
    NOON: "NOON",
    AFTERNOON: "AFTERNON",
    DUSK: "DUSK",
    EVENING: "EVENING",
    LATENIGHT: "LATENIGHT",
  },
   
  month = {
    ONE: "ONE",
    TWO: "TWO",
    THREE: "THREE",
    FOUR: "FOUR",
    FIVE: "FIVE",
    SIX: "SIX",
    SEVEN: "SEVEN",
    EIGHT: "EIGHT",
    NINE: "NINE",
    TEN: "TEN",
    ELEVEN: "ELEVEN",
    TWELVE: "TWELVE",
    THIRTEEN: "THIRTEEN"
  },
    
  season = {
    SPRING: "SPRING",
    SUMMER: "SUMMER",
    AUTUMN: "AUTUMN",
    WINTER: "WINTER",
  },

  advanceHour: function(player.hours) {
    if (time.currentHour >= 24) {
      time.currentHour = 1};
    time.currentHour += player.hours;
    time.hourTally += player.hours;
  },

  advanceTOD: function() {
    if (time.currentHour == 6)
      {time.currentTOD = tod.DAWN;}
    else if (time.currentHour > 6 && time.currentHour < 12)
      {time.currentTOD = tod.MORNING;}
    else if (time.currentHour == 12)
      {time.currentTOD = tod.NOON;}
    else if (time.currentHour > 12 && time.currentHour < 18)
      {time.currentTOD = tod.AFTERNOON;}
    else if (time.currentHour == 18)
      {time.currentTOD = tod.DUSK;}
    else if (time.currentHour > 18 && time.currentHour <= 24)
      {time.currentTOD = tod.EVENING;}
    else if (time.currentHour >= 1 && time.currentHour < 6)
      {time.currentTOD = tod.LATENIGHT;}
  },

 advanceDay: function() {
    if (time.currentDay >= 364) {
      time.currentDay = 1};
    if (time.currentHour == 1) {
      time.currentDay += 1;
      time.dayTally +=1;
    }
  },

 advanceMonth: function(){
     if (time.currentDay >= 1 && time.currentDay < 28)
      time.currentMonth = month.ONE;
    else if (time.currentDay >= 29 && time.currentDay < 56)
      time.currentMonth = month.TWO;
    else if (time.currentDay >= 57 && time.currentDay < 84)
      time.currentMonth = month.THREE;
    else if (time.currentDay >= 85 && time.currentDay < 112)
      time.currentMonth = month.FOUR;
   else if (time.currentDay >= 57 && time.currentDay < 140)
      time.currentMonth = month.FIVE;
   else if (time.currentDay >= 141 && time.currentDay < 168)
      time.currentMonth = month.SIX;
   else if (time.currentDay >= 169 && time.currentDay < 196)
      time.currentMonth = month.SEVEN;
   else if (time.currentDay >= 197 && time.currentDay < 224)
      time.currentMonth = month.EIGHT;
   else if (time.currentDay >= 225 && time.currentDay < 252)
      time.currentMonth = month.NINE;
   else if (time.currentDay >= 253 && time.currentDay < 280)
      time.currentMonth = month.TEN;
   else if (time.currentDay >= 281 && time.currentDay < 308)
      time.currentMonth = month.ELEVEN;
   else if (time.currentDay >= 309 && time.currentDay < 336)
      time.currentMonth = month.TWELVE;
   else if (time.currentDay >= 337 && time.currentDay < 364)
      time.currentMonth = month.TWO;
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
