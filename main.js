$( document ).ready(function(){
  months();
  arraymon=[];
  $(".mon").click(function(){
    a= $(this).html();
    if ($(this).css('background-color') == "rgb(55, 253, 252)"){
      $(this).css('background-color','white');
      $(this).css('border', '1px solid black');
      arraymon.remove(a);
    }
    else{
      $(this).css('background', '#37FDFC');
      arraymon.push(a);
    }
  });

});

function months(){
  var date = new Date();
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

Array.prototype.remove = function() {
  var what, a = arguments, L = a.length, ax;
  while (L && this.length) {
    what = a[--L];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};

// Datastructs
var month = [];
month[0] = "Jan";
month[1] = "Feb";
month[2] = "Mar";
month[3] = "Apr";
month[4] = "May";
month[5] = "Jun";
month[6] = "Jul";
month[7] = "Aug";
month[8] = "Sept";
month[9] = "Oct";
month[10] = "Nov";
month[11] = "Dec";