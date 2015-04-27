$( document ).ready(function(){
  arraymon=[];
  makeMonths();
  selectMonths();
});

// Data
var month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
var fullMonth = ["January","February","March","April","May","June","July","August","September","October","November","December"];
var day = ["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"];
var date = new Date();
arrayweek=[];
rankmonth=[];
currentmonth= date.getMonth()+1;
for (i=0; i<12; i++){
  rankmonth.push(currentmonth);
  if (currentmonth<12){
    currentmonth++;
  }
  else{
    currentmonth= 13-currentmonth;
  }
}

// Month Methods
function selectMonths(){
  $(".mon").click(function(){
    a= $(this).html();
    one= new Date(date.getFullYear(), getMonthIndex(a),1);
    if ($(this).css('background-color') == "rgb(55, 253, 252)"){
      $(this).css('background-color','white');
      removeMonth(one.getMonth()); 
      remove= fullMonth[one.getMonth()];
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

// Week Method
function createWeek(firstday){
  weeks=[];
  a= firstday.getMonth(); 
  if(firstday.getDay() != 0){
    week= new Date(firstday.getFullYear(), firstday.getMonth(),8-firstday.getDay());
    week1 = new Date(firstday.getFullYear(), firstday.getMonth(), week.getDate()+6);
  }
  else{
    week= firstday;
    week1 = new Date(firstday.getFullYear(), firstday.getMonth(), week.getDate()+6);
  }
  date1= (a+1)+"/"+week.getDate();
  date2= (a+1)+"/"+week1.getDate();
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

function createWeekTemplate(month,weeks){
  $(".weektemplate").append("<div id='"+month+"' ><div class='row'><h3>"+month+"</h3></div><div class='row weeks'></div></div>");
  template= ".weektemplate #"+month+" .weeks";
  for(i=0; i<weeks.length; i++){
    $(template).append("<div class='week col-md-1 "+month+"'><h4 class='week1'>"+weeks[i][0]+"</h4><h4 class='week2'>"+weeks[i][1]+"</h4></div>");
  }
  $(template).append("<div class='col-md-1 select-all "+month+"'><h4>Select</h4><h4>All</h4></div>");
}

// Day Methods
$(document).on("click",".week",function(){
    if ($(this).css('background-color') == "rgb(55, 253, 252)"){
      $(this).css('background-color','white');
      // removeMonth(one.getMonth()); 
      // remove= fullMonth[one.getMonth()];
      // $("#"+remove).remove();
    }
    else{
      $(this).css('background', '#37FDFC');
      week1= $(this).find(".week1").html();
      week2= $(this).find(".week2").html();

      week1= week1.split("/");
      week1= week1.map(function(x){
        return parseInt(x,10); 
      });
      
      week2= week2.split("/");
      week2= week2.map(function(x){
        return parseInt(x,10);
      });
      result= [week1,week2];
      pushweek(result);
      console.log(arrayweek);
    }
  });

$(document).on("click",".select-all",function(){
  a= $(this).parent();
  length= a[0].children.length;
  selectall= a[0].children[length-1];
  console.log(a);
  if ($(selectall).css('background-color') == "rgb(55, 253, 252)"){
    for (i=0; i< length; i++){
      selected= a[0].children[i];
      $(selected).css('background-color','white');
    }
  }
  else{
    for(i=0; i<length; i++){
      selected= a[0].children[i];
      $(selected).css('background', '#37FDFC');
    }
  }
  console.log($(this).css('background-color'));
});

function pushweek(result){
  if (arrayweek.length==0){
    arrayweek.push(result);
  }
  else{
    end= false;
    for(i=0; i<arrayweek.length; i++){
      first= rankmonth.indexOf(arrayweek[i][0][0]);
      second= rankmonth.indexOf(result[0][0]);
      if(first<second){
        console.log("pass");
      }
      else if(first==second){
        if(arrayweek[i][0][1]<result[0][1]){
          console.log("pass");
        }
        else{
          arrayweek.splice(i,0,result);
          end= true;
          break;
        }
      }
      else{
        arrayweek.splice(i,0,result);
        end= true;
        break;
      }
    }
    if (!end){
      arrayweek.push(result);
    }
  }
}


