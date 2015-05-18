$( document ).ready(function(){
  arraymon=[];
  makeMonths();
  selectMonths();
  $(window).scroll(function () {
  // set distance user needs to scroll before we start fadeIn
    if ($(this).scrollTop() > ($(window).height()*.3)) {
      $('.selecteddays').css("bottom","45%");
    }
    else{
      $('.selecteddays').css("bottom","6%"); 
    }
  });
  $('.selecteddays').hide();
  $('.schedule').hide();
  
});

// Month Methods

function selectMonths(){
  $(".main .mon").click(function(){
    var a= $(this).html();
    var one= new Date(date.getFullYear(), getMonthIndex(a),1);
    if ($(this).css('background-color') == "rgb(55, 253, 252)"){
      $(this).css('background-color','white');
      removeMonth(one.getMonth()); 
      var remove= fullMonth[one.getMonth()];
      $("#"+remove).remove();
    }
    else{
      $(this).css('background', '#37FDFC');
      arraymon.push(one);
      createWeek(one);
    }
  });
}

function makeMonths(){
  var monthNum= date.getMonth();
  var i= monthNum;
  var j= 0;
  do {
    var html= ".month" + j;
    $(html).html(month[i]);
    i= (i+1)%12;
    j++;
  } while(i != monthNum)  
}
//////////////////////////////////////////
//////////////////////////////////////////

// Week Method
function createWeek(firstday){
  var weeks=[];
  var a= firstday.getMonth(); 
  if(firstday.getDay() != 0){
    var week= new Date(firstday.getFullYear(), firstday.getMonth(),8-firstday.getDay());
    var week1 = new Date(firstday.getFullYear(), firstday.getMonth(), week.getDate()+6);
  }
  else{
    var week= firstday;
    var week1 = new Date(firstday.getFullYear(), firstday.getMonth(), week.getDate()+6);
  }
  var date1= (a+1)+"/"+week.getDate();
  var date2= (a+1)+"/"+week1.getDate();
  weeks.push([date1,date2]);
  do {
    week= new Date(week.getFullYear(), week.getMonth(),week.getDate()+7);
    week1 = new Date(week1.getFullYear(), week1.getMonth(), week1.getDate()+7);
    if(week.getMonth()!=a){
      break;
    }      
    date1= ""+(week.getMonth()+1)+"/"+week.getDate();
    date2= ""+(week1.getMonth()+1)+"/"+week1.getDate();
    weeks.push([date1,date2]);
  }while(week.getMonth()==a)
  createWeekTemplate(fullMonth[a],weeks);
}

// Click on Week
$(document).on("click",".main .week",function(){
  var result= findWeeks($(this));
  // Deselect
  if ($(this).css('background-color') == "rgb(55, 253, 252)"){
    $(this).css('background-color','white');
    removeWeek(result);
    makeDays();
  } // Select
  else{
    $(this).css('background', '#37FDFC');
    pushWeek(result);
    makeDays();
  }
});

// Click on select all
$(document).on("click",".main .weekselector .select-all",function(){
  var a= $(this).parent();
  var length= a[0].children.length;
  var selectall= a[0].children[length-1];
  if ($(selectall).css('background-color') == "rgb(55, 253, 252)"){
    for (var i=0; i< length; i++){
      var selected= a[0].children[i];
      $(selected).css('background-color','white');
      if(i< length-1){
        result= findWeeks(selected);
        removeWeek(result);  
      }
      else{
        $(selected).find(".select").html("Select");
      }
    }
    makeDays();
  }
  else{
    for(var k=0; k<length; k++){
      var selected= a[0].children[k];
      $(selected).css('background', '#37FDFC');
      if(k< length -1){
        var result= findWeeks(selected);
        pushWeek(result);
      }
      else{
        $(selected).find(".select").html("Remove");
      }
    } // end for
    makeDays();  
  } // end else
});
//////////////////////////////////////////
//////////////////////////////////////////

// Day Methods

// Click on Day
$(document).on("click",".main .day",function(){
  // Deselect
  if ($(this).css('background-color') == "rgb(55, 253, 252)"){
    $(this).css('background-color','white');
    var date1= makeDay($(this));
    removeDay(date1);
  } // Select
  else{
    $(this).css('background', '#37FDFC');
    var date1= makeDay($(this));
    addDay(date1);
  }
});

// Click on select all
$(document).on("click",".main .dayselector .select-all",function(){
  var a= $(this).parent();
  var length= a[0].children.length;
  var selectall= a[0].children[length-1];
  ////////////////////////////////////////////////////////////////
  if ($(selectall).css('background-color') == "rgb(55, 253, 252)"){
    for (var i=0; i< length; i++){
      var selected= a[0].children[i];
      $(selected).css('background-color','white');
      if(i< length-1){
        var date1= makeDay($(selected));
        removeDay(date1);  
      }
      else{
        $(selected).find(".select").html("Select");
      }
    }
  }
  else{
    for(var k=0; k<length; k++){
      var selected= a[0].children[k];
      $(selected).css('background', '#37FDFC');
      if(k < length-1){
        var date1= makeDay($(selected));
        addDay(date1);
      }
      else{
        $(selected).find(".select").html("Remove");
      }
    } // end for
  } // end else
});

$(document).on("click",".main .days",function(){
  $('.selecteddays').fadeIn();
  $('.selecteddays .days').html("");
  for( var i=0; i<arrayday.length; i++){
    for ( var j=0; j<arrayday[i].length - 1; j++){
      var selectedday = arrayday[i][j][1];
      selectedday = String(selectedday[0]) + "/" + String(selectedday[1]) + "\t,\t";
      $('.selecteddays .days').append(selectedday);
    }
    var selectedday = arrayday[i][arrayday[i].length - 1][1];
    selectedday = String(selectedday[0]) + "/" + String(selectedday[1]) + "</br>";
    $('.selecteddays .days').append(selectedday);
  }
});


//////////////////////////////////////////
//////////////////////////////////////////
// Schedule Methods
$(document).on("click",".main button",function(){
  if (!arrayday.length){
    bootbox.alert("Please select some days");
  }
  else{
    $('.main').fadeOut();
    $('.schedule').html("<div class='row title'><div class='buttons'><button type='button' class='btn btn-default btn-info back'>Back</button><button type='button' class='btn btn-default btn-info confirm'>Confirm</button></div><h1>Selecting Times</h1></div>");
    $('.schedule').append("<div class='col-md-6 selected'><h3>Select dates and schedule a time</h3><div class='days'></div></div>");
    $('.schedule').append("<div class='col-md-3 picker'><div class='row'></div></div>");
    $('.schedule .picker .row').append("<div class='col-md-6'><div class='input-group'><label class='control-label'>Start</label><input type='text' class='form-control start ui-timepicker-input'></div></div>");
    $('.schedule .picker .row').append("<div class='col-md-6'><div class='input-group'><label class='control-label'>End</label><input type='text' class='form-control end ui-timepicker-input'></div></div>");
    $('.schedule .picker').append("<br/><button type='button' id= 'schedule' class='btn btn-default btn-info'>Schedule</button>")
    $('.schedule .picker').append("<hr/><div class='selections'></div>");
    $('.schedule').append("<div class='col-md-3 results'><div class='row'><h3>Scheduled Times</h3></div><div class= 'times'></div></div>");
    $('.schedule').fadeIn();
    $('.picker .start').timepicker({ 'scrollDefault': 'now', 'step': 15 });
    $('.picker .end').timepicker({ 'scrollDefault': 'now', 'step': 15 });
    makeDaySelections();
    makeTime();
    displaySelect();
  }
});

$(document).on("click",".schedule .back", function(){
  $('.schedule').fadeOut();
  $('.main').fadeIn();
});

// Methods for Selected
$(document).on("click",".schedule .selected .days .day", function(){
  if ($(this).css('background-color') == "rgb(55, 253, 252)"){
    $(this).css('background-color','white');
    removeSelect(this);
    displaySelect();
  } // Select
  else{
    $(this).css('background', '#37FDFC');
    addSelect(this);
    displaySelect();
  }
});

$(document).on("click",".schedule .selected .days .select-all",function(){
  var a= $(this).parent();
  var length= a[0].children.length;
  var selectall= a[0].children[length-1];
  if ($(selectall).css('background-color') == "rgb(55, 253, 252)"){
    for (var i=0; i< length; i++){
      var selected= a[0].children[i];
      $(selected).css('background-color','white');
      if(i< length-1){
        removeSelect(selected);
        displaySelect();
      }
      else{
        $(selected).find(".select").html("Select");
      }
    }
  }
  else{
    for(var k=0; k<length; k++){
      var selected= a[0].children[k];
      $(selected).css('background', '#37FDFC');
      if(k< length -1){
        addSelect(selected);
        displaySelect();
      }
      else{
        $(selected).find(".select").html("Remove");
      }
    } // end for
  } // end else
});

// Methods for Picker
$(document).on("change",".schedule .picker .start", function(){
  var timestep = String($('.picker .start').val());
  $('.picker .end').val(timestep);
});

$(document).on("click",".schedule .picker a", function(){
  var div = $(this).parent()
  removeSelect(div);
  $($(this).parent()).remove();
  makeDaySelections();
});
// Methods for Results
$(document).on("click","#schedule", function(){
  if (($(".start").val() == "") || ($(".end").val() == "")){
    bootbox.alert("Please schedule a time!");
  }
  else{
    var time1 = $('.start').timepicker('getTime');
    var time2 = $('.end').timepicker('getTime');
    var hour1 = time1.getHours();
    var minutes1 = time1.getMinutes();
    var hour2 = time2.getHours();
    var minutes2 = time2.getMinutes();
    var result = [[hour1, minutes1], [hour2, minutes2]];
    addTime(result);
    makeTime();
  }
});

            
