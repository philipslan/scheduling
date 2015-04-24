$( document ).ready(function(){
  arraymon=[];
  makeMonths();
  $(".mon").click(function(){
    a= $(this).html();
    one= new Date(date.getFullYear(), getMonthIndex(a),1);
    if ($(this).css('background-color') == "rgb(55, 253, 252)"){
      $(this).css('background-color','white');
      removeMonth(one.getMonth());
      console.log(arraymon);
      if (arraymon.length==0){
        $(".weekselector").fadeOut();
      }
    }
    else{
      $(this).css('background', '#37FDFC');
      arraymon.push(one);
      createWeek(one);
      console.log(arraymon);
      $(".weekselector").fadeIn();
    }
  });
});

var date = new Date();

function makeMonths(){
  var monthNum= date.getMonth();
  var i= monthNum;
  var j= 0;
  do {
    var n= month[i];
    var html= ".month" + j;
    $(html).html(n);
    i= (i+1)%12;
    j++;
  } while(i != monthNum)  
}

function removeMonth(index){
  for (i=0; i<arraymon.length; i++){
    if (arraymon[i].getMonth()==index){
      arraymon.splice(i,1);
    }
  }
}

function getMonthIndex(fmonth){
  for(i=0; i<month.length; i++){
    if (month[i]==fmonth){
      return i;
    }
  }
}

function createWeek(firstday){
  if(firstday.getDay() != 0){
    a= firstday.getMonth();
    week= new Date(firstday.getFullYear(), firstday.getMonth(),8-firstday.getDay());
    week1 = new Date(firstday.getFullYear(), firstday.getMonth, week.getDate()+6);
    
    do {
      week= new Date(firstday.getFullYear(), firstday.getMonth(),8-firstday.getDay());
      week1 = new Date(firstday.getFullYear(), firstday.getMonth, week.getDate()+6);
    }while(week.getMonth()==a)
      
      $(".weeks").append( "<br/>"+week1);
      month[week1.getMonth()];
    
  }
}

// Datastructs
var month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
var day = ["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"];

