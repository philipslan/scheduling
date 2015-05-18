// Data
var month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
var fullMonth = ["January","February","March","April","May","June","July","August","September","October","November","December"];
var day = ["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"];
var date = new Date();
var arrayweek =[];
var arrayday =[];
var rankmonth =[];
var arrayselected = [];
var arraytimes= [];
var currentmonth = date.getMonth()+1;


for (var i=0; i<12; i++){
  rankmonth.push(currentmonth);
  if (currentmonth<12){
    currentmonth++;
  }
  else{
    currentmonth= 13-currentmonth;
  }
}

// Month Functions
function removeMonth(month){
  for (var i=0; i<arraymon.length; i++){
    if (arraymon[i].getMonth()==month){
      arraymon.splice(i,1);
    }
  }
  month ++;
  var dummy=[]
  for (var i=0; i<arrayweek.length; i++){
    if(arrayweek[i][0][0]!=month){
     dummy.push(arrayweek[i]); 
    }
  }
  arrayweek= dummy
  makeDays();
}

function getMonthIndex(fmonth){
  for (var i=0; i<month.length; i++){
    if (month[i]==fmonth){
      return i;
    }
  }
}

// Week Functions
function pushWeek(result){
  if (!arrayweek.length){
    arrayweek.push(result);
  }
  else{
    var result_month= rankmonth.indexOf(result[0][0]);
    for (var i=0; i<arrayweek.length; i++){
      var variable_month= rankmonth.indexOf(arrayweek[i][0][0]);
      if (variable_month > result_month){
        arrayweek.splice(i,0,result);
        return;
      }
      else if (variable_month == result_month){
        if (arrayweek[i][0][1] > result[0][1]){
          arrayweek.splice(i,0,result);
          return;
        }
        else if (arrayweek[i][0][1] == result[0][1]){
          return;
        }
      }
    }
    arrayweek.push(result);
  }
}

function removeWeek(result){
  var a=result[0];
  for (var i=0; i<arrayweek.length; i++){
    if(a[0]==arrayweek[i][0][0]){
      if(a[1]==arrayweek[i][0][1]){
        arrayweek.splice(i,1);
      }
    }    
  }
}

function findWeeks(div){
  var week1= $(div).find(".week1").html();
  var week2= $(div).find(".week2").html();

  week1= week1.split("/");
  week1= week1.map(function(x){
    return parseInt(x,10); 
  });
  
  week2= week2.split("/");
  week2= week2.map(function(x){
    return parseInt(x,10);
  });
  var result= [week1,week2];
  return result;
}

function createWeekTemplate(month,weeks){
  $(".weektemplate").append("<div id='"+month+"' ><div class='row'><h2>"+month+"</h2></div><div class='row weeks'></div></div>");
  var template= ".weektemplate #"+month+" .weeks";
  for (var i=0; i<weeks.length; i++){
    $(template).append("<div class='week col-md-1 "+month+"'><h4 class='week1'>"+weeks[i][0]+"</h4><h4 class='week2'>"+weeks[i][1]+"</h4></div>");
  }
  $(template).append("<div class='col-md-1 select-all "+month+"'><h4 class='select'>Select</h4><h4>All</h4></div>");
}

// Day Functions

function makeDays(){
  $(".daytemplate").html("");
  for (var i=0; i<arrayweek.length; i++){
    var item= arrayweek[i];
    dayTemplate(item[0],item[1]);
  }
}

function dayTemplate(item1, item2){
  var day1= String(item1[0]) + "/" + String(item1[1]);
  var day2= String(item2[0]) + "/" + String(item2[1]);
  if (!$(".daytemplate ." + item1[0]).length){
    $(".daytemplate").append("<div class='nameMonth " + item1[0] + "'><div class='row'><h2>" + fullMonth[item1[0]-1] +"</h2></div></div>");
  }
  var template= ".daytemplate ." + String(item1[0]);

  temp = "weekof_" + String(item1[0]) + "_" + String(item1[1]);  
  $(template).append("<div class='" + temp + "'></div>");
  template += " .weekof_" + String(item1[0]) + "_" + String(item1[1]);

  $(template).append("<div class='row'><h3>Week of " + day1 + " - " + day2 + "</h3></div><div class='row days'></div>");

  if (date.getMonth() > item1[0]){
    var date1= new Date(date.getFullYear() + 1, item1[0] - 1, item1[1]);
  } else{
    var date1= new Date(date.getFullYear(), item1[0] - 1, item1[1]);
  }

  template += " .days"
  for (var i=0; i<7; i++){
    $(template).append("<div class='col-md-1 day'><h4 class='weekday'>" + day[date1.getDay()] + "</h4><h4 class='actualday'>"+(date1.getMonth()+1)+"/"+date1.getDate() +"</h4></div>");
    date1= new Date(date1.getFullYear(),date1.getMonth(),date1.getDate()+1);
  }
  $(template).append("<div class='col-md-1 select-all'><h4 class='select'>Select</h4><h4>All</h4></div>");
  // Make the days into date objects and then translate back, because there will be problems with overflow
  var a= $(template);
  var length= a[0].children.length;
  for(var k=0; k<length-1; k++){
    var selected= a[0].children[k];  
    var date1= makeDay($(selected));
    for (var i = 0; i < arrayday.length; i++){
      for (var j =0; j < arrayday[i].length; j++){
        if ( date1.equals(arrayday[i][j])){
          $(selected).css('background', '#37FDFC');    
          if ( arrayday[i].length == 7){
            $(a[0].children[length-1]).css('background', '#37FDFC');
            $(a[0].children[length-1]).find(".select").html("Remove");
          }  
        }
      }
    }
  } // end for
}

function makeDay(div){
  var week = $(div).parent().parent().attr("class");
  // Getting week value from class name.
  week = week.split("weekof");
  week = week[1].split("_"); 
  // Gets the month value and the day values. Accounts for two digit day values.
  week.splice(0,1);
  // returns int objects for week values
  week = week.map(function(x){
    return parseInt(x,10); 
  });
  // Get day of week value
  var day = $(div).find(".weekday").html();
  // Get day values
  var date = $(div).find(".actualday").html();
  date = date.split("/");
  date = date.map(function(x){
    return parseInt(x,10); 
  });
  return [week, date, day];
}

function addDay(result){
  if (!arrayday.length){
    arrayday.push([result]);
    return;
  }
  else{
    var month1 = rankmonth.indexOf(result[0][0]);
    for (var i = 0; i < arrayday.length; i++){ 
      var month2 = rankmonth.indexOf(arrayday[i][0][0][0]);
      if (month2 > month1){
        arrayday.splice(i,0,[result]);
        return;
      }
      else if (month2 == month1){
        for (var j=0; j<arrayday[i].length; j++){
          var inside = false;
          var monthday1= result[0][1];
          var monthday2= arrayday[i][j][0][1];
          if (monthday2 > monthday1){
            arrayday.splice(i,0,[result]);
            return;
          }
          else if (monthday2 == monthday1){
            inside= true;
            var day1 = day.indexOf(result[2]);
            var day2 = day.indexOf(arrayday[i][j][2]);
            if (day1 < day2){
              arrayday[i].splice(j,0,result);
              return;
            }
            if (day1 == day2){
              return;
            }
          }
        }
        if (inside){
          arrayday[i].push(result);
          return;
        }
      }
    }
  }
  arrayday.push([result]);
}

function removeDay(div){
  var month1_a= div[0];
  for(var i = 0; i < arrayday.length; i++){
    var month1_b = arrayday[i][0][0];
    if (month1_a.equals(month1_b)){
      var month2_a = div[1];
      for(var j=0; j< arrayday[i].length; j++){
        var month2_b = arrayday[i][j][1];
        if (month2_a.equals(month2_b)){
          arrayday[i].splice(j,1);
          if (!arrayday[i].length){
            arrayday.splice(i,1);
          }
          return;
        }
      }      
    }
  }
}

// Selection Functions
function makeDaySelections(){
  $('.schedule .selected .days').html("");
  for (var i = 0; i < arrayday.length; i++){
    $('.schedule .selected .days').append("<div class='row " + i + "'></div>");
    var template = ".schedule .selected .days ." + String(i);
    for (var j =0; j< arrayday[i].length; j++){
      var date1 = arrayday[i][j][1];
      var css = false;
      if (arrayselected.length){
        for (var k = 0; k < arrayselected.length; k++){
          if (date1.equals(arrayselected[k])){
            css = true;
          }
        }
      }
      date1 = String(date1[0]) + "/" + String(date1[1]);
      var day1 = arrayday[i][j][2];
      var div = $("<div class='col-md-1 day'><h5>" + day1 + "</h5><h5>" + date1 + "</h5></div>");
      $(template).append(div);
      if(css){
        $(div).css('background', '#37FDFC');
      }
    }
    $(template).append("<div class='col-md-1 select-all'><h5 class='select'>Select</h5><h5>All</h5></div>");
  }
}


// Function for appending a date to the selected time options
function displaySelect(){
  $('.schedule .picker .selections').html("");
  for(var i = 0; i< arrayselected.length; i++){
    var string = String(arrayselected[i][0]) + "/" + String(arrayselected[i][1]);
    $('.schedule .picker .selections').append("<h6><a><span class='glyphicon glyphicon-remove'></span></a>\t<span>" + string +"</span></h6>");
  }
}

function addSelect(div){
  var selected = $(div).children();
  var value = $(selected).eq(1).html();
  value = value.split("/");
  value = value.map(function(x){
    return parseInt(x,10); 
  });
  // Insert into array
  if (!arrayselected.length){
    arrayselected.push(value);
  }
  else{
    var value_month= rankmonth.indexOf(value[0]);
    for (var i=0; i<arrayselected.length; i++){
      var variable_month= rankmonth.indexOf(arrayselected[i][0]);
      if (variable_month > value_month){
        arrayselected.splice(i,0,value);
        return;
      }
      else if (variable_month == value_month){
        if (arrayselected[i][1] > value[1]){
          arrayselected.splice(i,0,value);
          return;
        }
        else if (arrayselected[i][1] == value[1]){
          return;
        }
      }
    }
    arrayselected.push(value);
  }  
}

function removeSelect(div){
  var selected = $(div).children();
  var value = $(selected).eq(1).html();
  value = value.split("/");
  value = value.map(function(x){
    return parseInt(x,10); 
  });
  for(var i = 0; i < arrayselected.length; i++){
    var variable_month = arrayselected[i]
    if (value.equals(variable_month)){
      arrayselected.splice(i,1);
    }
  }
}

function addTime(result){
  for(var i = 0; i < arrayselected.length; i++){
    var selected = arrayselected[i];
    if (!arraytimes.length){
      arraytimes.push([selected,result]);
    }
    else{
      var found = true;
      safety:
      for(var j=0; j < arraytimes.length; j++){
        var cursor = arraytimes[j][0];
        if (selected[0] < cursor[0]){
          arraytimes.splice(j,0,[selected,result]);
          found = false;
          break safety;
        }
        else if (selected[0] == cursor[0]){
          if (selected[1] < cursor[1]){
            arraytimes.splice(j,0,[selected,result]);
            found = false;
            break safety;
          }
          else if (selected[1] == cursor[1]){
            for(var k = 1; k < arraytimes[j].length; k++){
              if (result[0][0] < arraytimes[j][k][0][0]){
                arraytimes[j].splice(k,0,result);
                found = false;
                break safety;
              }
              else if (result[0][0] == arraytimes[j][k][0][0]){
                if(result[0][1] < arraytimes[j][k][0][1]){
                  arraytimes[j].splice(k,0,result);
                  found = false;
                  break safety;
                }
              }
            }
            arraytimes[j].push(result);
            found = false;
            break safety;
          } 
        }
      }
      if(found){
        arraytimes.push([selected,result]);        
      }
    }
  }
}

function makeTime(){
  $('.times').html("");
  for (var i = 0; i < arraytimes.length; i++){
    var date = "<div class='date" + i + "'><h5>" + String(arraytimes[i][0][0]) + "/" + String(arraytimes[i][0][1]) + "</h5></div>";
    $('.times').append(date);
    for (var j = 0; j< arraytimes[i].length; j++){
      if (j != 0){
        var times = "<h6><a><span class='glyphicon glyphicon-remove'></span></a>\t<span>" 
        + String(arraytimes[i][j][0][0]) + ":" + String(arraytimes[i][j][0][1]) + " - " 
        + String(arraytimes[i][j][1][0]) + ":" + String(arraytimes[i][j][1][1]) + "</span></h6>";
        $('.times .date' + String(i) ).append(times);
      }
    }
  }
}

function removeTime(result){
  var date1 = result[0];
  var times = result[1];
  var div = result[2];

  for (var i = 0; i< arraytimes.length; i++){
    var date2 = arraytimes[i][0];
    if (date1.equals(date2)){
      for (var j = 1; j< arraytimes[i].length; j++){
        var times1 = arraytimes[i][j][0];
        if (times[0].equals(times1)){
          var times2 = arraytimes[i][j][1];
          if (times[1].equals(times2)){
            arraytimes[i].splice(j,1);
          }
        }
      }
      if (arraytimes[i].length == 1){
        arraytimes.splice(i,1);
      }
    }
  }
}

// Modal function
function makeConfirmation(){
  $('.bootbox-confirm .modal-dialog .bootbox-body').html("");
  for (var i = 0; i < arraytimes.length; i++){
    var date = "<h4>" + String(arraytimes[i][0][0]) + "/" + String(arraytimes[i][0][1]) + "</h4>";
    $('.bootbox-confirm .modal-dialog .bootbox-body').append(date);
    for (var j = 0; j< arraytimes[i].length; j++){
      if (j != 0){
        var times = "<h6>" + String(arraytimes[i][j][0][0]) + ":" + String(arraytimes[i][j][0][1]) + " - " + String(arraytimes[i][j][1][0]) + ":" + String(arraytimes[i][j][1][1]) + "</h6>";
        $('.bootbox-confirm .modal-dialog .bootbox-body').append(times);
      }
    }
  }
}

Array.prototype.equals = function (array) {
  // if the other array is a falsy value, return
  if (!array)
    return false;

  // compare lengths - can save a lot of time 
  if (this.length != array.length)
    return false;

  for (var i = 0, l=this.length; i < l; i++) {
    // Check if we have nested arrays
    if (this[i] instanceof Array && array[i] instanceof Array) {
      // recurse into the nested arrays
      if (!this[i].equals(array[i]))
        return false;       
    }           
    else if (this[i] != array[i]) { 
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false;   
    }           
  }       
  return true;
}  
