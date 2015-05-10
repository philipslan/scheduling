$( document ).ready(function(){
  arraymon=[];
  makeMonths();
  selectMonths();
});

// Month Methods

function selectMonths(){
  $(".mon").click(function(){
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
$(document).on("click",".week",function(){
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
$(document).on("click",".weekselector .select-all",function(){
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
        if(arrayweek.length==0){
          pushWeek(result);
        }
        else{
          found= false;
          for(var j=0; j<arrayweek.length; j++){
            if( (result[0][0]==arrayweek[j][0][0]) && (result[0][1]==arrayweek[j][0][1]) ){
              found= true;
              break;
            } // end if
          } // end for
          if (!found){
            pushWeek(result);
          }
        } // end else
      } // end if k< length -1
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
$(document).on("click",".day",function(){
  // Deselect
  if ($(this).css('background-color') == "rgb(55, 253, 252)"){
    $(this).css('background-color','white');
    var date1= makeDay($(this));
    console.log(date1);
    removeDay(date1);
  } // Select
  else{
    $(this).css('background', '#37FDFC');
    var date1= makeDay($(this));
    addDay(date1);
  }
});

// Click on select all
$(document).on("click",".dayselector .select-all",function(){
  var a= $(this).parent();
  var length= a[0].children.length;
  var selectall= a[0].children[length-1];
  if ($(selectall).css('background-color') == "rgb(55, 253, 252)"){
    for (var i=0; i< length; i++){
      var selected= a[0].children[i];
      $(selected).css('background-color','white');
      if(i< length-1){
        //result= findWeeks(selected);
        //removeWeek(result);  
      }
      else{
        $(selected).find(".select").html("Select");
      }
    }
    //makeDays();
  }
  else{
    for(var k=0; k<length; k++){
      var selected= a[0].children[k];
      $(selected).css('background', '#37FDFC');
      if(k< length -1){
        //var result= findWeeks(selected);
        if(arrayweek.length==0){
          //pushWeek(result);
        }
        else{
          found= false;
          for(var j=0; j<arrayweek.length; j++){
            // if( (result[0][0]==arrayweek[j][0][0]) && (result[0][1]==arrayweek[j][0][1]) ){
            //   found= true;
            //   break;
            // } // end if
          } // end for
          if (!found){
            //pushWeek(result);
          }
        } // end else
      } // end if k< length -1
      else{
        $(selected).find(".select").html("Remove");
      }
    } // end for
  } // end else
});

