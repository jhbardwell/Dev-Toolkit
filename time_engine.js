let time = {

    create = {
        currentHour: utils.randomArray(rangeHours),
        currentTOD: "",
        currentDay: utils.randomArray(rangeDays),
        currentMonth: "",
        currentSeason: "",
        tallyGameDays: 0,
    },
  
    update = function(){
        advanceHour();
        advanceTOD();
        advanceDay();
        advanceMonth();
        advanceSeason();
    },
  
    save = {
        currentHour: time.currentHour,
        currentTOD: time.currentTOD,
        currentDay: time.currentDay,
        currentMonth: time.currentMonth,
        currentSeason: time.currentSeason,
        tallyGameDays: time.tallyGameDays
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

    advanceHour: function() {
        time.currentHour += player.hours;
        if (time.currentHour >= 24) {
            time.currentHour = 1};
        return time.currentHour;
    },
  
    advanceTOD: function() {
        switch(time.currentTOD){
        case (time.currentHour == 6):
            time.currentTOD = tod.DAWN; break;
        case (time.currentHour > 6 && time.currentHour < 12):
            time.currentTOD = tod.MORNING; break;
        case (time.currentHour == 12):
            time.currentTOD = tod.NOON; break;
        case (time.currentHour > 12 && time.currentHour < 18):
            time.currentTOD = tod.AFTERNOON; break;
        case (time.currentHour == 18):
            time.currentTOD = tod.DUSK; break;
        case (time.currentHour > 18 && time.currentHour <= 24):
            time.currentTOD = tod.EVENING; break;
        case (time.currentHour >= 1 && time.currentHour < 6):
            time.currentTOD = tod.LATENIGHT; break
        },
        return time.currentTOD;
    },
  
   advanceDay: function() {
        if (time.currentHour > 24) {
            time.currentDay += 1;
            time.tallyGameDay +=1;
        }
        if (time.currentDay > 364) {
             time.currentDay = 1};
        },
        return (time.currentDay, time.tallyGameDays);
    },
  
   advanceMonth: function(){
        switch(time.currentMonth){
        case (time.currentDay >= 1 && time.currentDay < 28):
            time.currentMonth = month.ONE; break;
        case (time.currentDay >= 29 && time.currentDay < 56):
            time.currentMonth = month.TWO; break;
        case (time.currentDay >= 57 && time.currentDay < 84):
            time.currentMonth = month.THREE; break;
        case (time.currentDay >= 85 && time.currentDay < 112):
            time.currentMonth = month.FOUR; break;
        case (time.currentDay >= 57 && time.currentDay < 140):
            time.currentMonth = month.FIVE; break;
        case (time.currentDay >= 141 && time.currentDay < 168):
            time.currentMonth = month.SIX; break;
        case (time.currentDay >= 169 && time.currentDay < 196):
            time.currentMonth = month.SEVEN; break;
        case (time.currentDay >= 197 && time.currentDay < 224):
            time.currentMonth = month.EIGHT; break;
        case (time.currentDay >= 225 && time.currentDay < 252):
            time.currentMonth = month.NINE; break;
        case (time.currentDay >= 253 && time.currentDay < 280):
            time.currentMonth = month.TEN; break;
        case (time.currentDay >= 281 && time.currentDay < 308):
            time.currentMonth = month.ELEVEN; break;
        case (time.currentDay >= 309 && time.currentDay < 336):
            time.currentMonth = month.TWELVE; break;
        case (time.currentDay >= 337 && time.currentDay < 364):
            time.currentMonth = month.TWO; break;
       },
        return time.currentMonth;
    },
    
    advanceSeason: function() {
        switch(time.currentSeason){
        case (time.currentDay >= 31 && time.currentDay < 122):
            time.currentSeason = season.SPRING; break;
        case (time.currentDay >= 122 && time.currentDay < 213):
            time.currentSeason = season.SUMMER; break;
        case (time.currentDay >= 213 && time.currentDay <= 304):
            timeState.currentSeason = season.AUTUMN; break
        case (time.currentDay >= 304 || time.currentDay < 31):
            time.currentSeason = season.WINTER; break;
        },
        return time.currentSeason;
    },

   }
