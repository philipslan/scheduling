// Data
var month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
var fullMonth = ["January","February","March","April","May","June","July","August","September","October","November","December"];
var day = ["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"];
var date = new Date();
var arrayweek=[];
var rankmonth=[];
var currentmonth= date.getMonth()+1;
for (i=0; i<12; i++){
  rankmonth.push(currentmonth);
  if (currentmonth<12){
    currentmonth++;
  }
  else{
    currentmonth= 13-currentmonth;
  }
}

// Month Functions
function removeMonth(index){
  for (var i=0; i<arraymon.length; i++){
    if (arraymon[i].getMonth()==index){
      arraymon.splice(i,1);
    }
  }
}

function getMonthIndex(fmonth){
  for(var i=0; i<month.length; i++){
    if (month[i]==fmonth){
      return i;
    }
  }
}

// Week Functions
function pushWeek(result){
  if (arrayweek.length==0){
    arrayweek.push(result);
  }
  else{
    end= false;
    for(i=0; i<arrayweek.length; i++){
      first= rankmonth.indexOf(arrayweek[i][0][0]);
      second= rankmonth.indexOf(result[0][0]);
      if(first<second){}
      else if(first==second){
        if(arrayweek[i][0][1]<result[0][1]){}
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

function removeWeek(result){
  a=result[0];
  for (i=0; i<arrayweek.length; i++){
    if(a[0]==arrayweek[i][0][0]){
      if(a[1]==arrayweek[i][0][1]){
        arrayweek.splice(i,1);
      }
    }    
  }
}

function findWeeks(div){
  week1= $(div).find(".week1").html();
  week2= $(div).find(".week2").html();

  week1= week1.split("/");
  week1= week1.map(function(x){
    return parseInt(x,10); 
  });
  
  week2= week2.split("/");
  week2= week2.map(function(x){
    return parseInt(x,10);
  });
  result= [week1,week2];
  return result;
}