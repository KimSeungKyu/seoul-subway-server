var map = [];
//화면이 처음 불러왔을 때
$(document).ready(function() {
  if(JSON.parse(decodeURIComponent(window.location.hash).substr(1)).subwayData){
    map = JSON.parse(decodeURIComponent(window.location.hash).substr(1)).subwayData;
  }else{
    map = [];
  }
  setList();
});
setList();

function setList(){
  $('#savedList').empty();
  var list = "";
  for(var i = 0; i < map.length; i++){
    list += '<li><a>';
    list += map[i][0] + ' - ' + getLine(map[i][2]);
    list += '</a><a href="javascript:delData('+i+')">삭제</a></li>';
    
  }
  if(list.length == 0){
    list += "<li>지하철 역을 검색하고 선택해서 추가하세요.</li>";
  }
  $('#savedList').append(list);
  $('#savedList').listview('refresh');
  $('#searchList').empty();
}

function addData(name, statnId, subwayId){
  var existStation = false;
  for(var i = 0; i < map.length; i++){
    var station = map[i][1];
    if(station == statnId){
      existStation = true;
    }
  }
  if(!existStation){
    var index = map.length;
    map[index] = [name, statnId, subwayId];
  }
  setList();
}

function delData(i){
  map.splice(i, 1);
  setList();
}

function getStationList(){
  $.get("get-subway-station.php",
    { 
      stationNm: $("#stationNm").val()
    },
    function(data){
      $('#searchList').empty();
      $('#searchList').append(data);
      $('#searchList').listview('refresh');
    }
  );
}

function saveOptions() {
  var options = {
    'subwayData': map,
  }
  return options;
}

$().ready(function() {
  $("#b-cancel").click(
    function() {
      console.log("Cancel");
      document.location = "pebblejs://close";
    }
  );

  $("#b-submit").click(
    function() {
      console.log("Submit");
      document.location = "pebblejs://close#" + encodeURIComponent(JSON.stringify(saveOptions()));
    }
  );
});

function getLine(subwayId) {
  var returnValue = '';
  if(subwayId == '1001') {
    returnValue = '1호선';
  } else if(subwayId == '1002') {
    returnValue = '2호선';
  } else if(subwayId == '1003') {
    returnValue = '3호선';
  } else if(subwayId == '1004') {
    returnValue = '4호선';
  } else if(subwayId == '1005') {
    returnValue = '5호선';
  } else if(subwayId == '1006') {
    returnValue = '6호선';
  } else if(subwayId == '1007') {
    returnValue = '7호선';
  } else if(subwayId == '1008') {
    returnValue = '8호선';
  } else if(subwayId == '1009') {
    returnValue = '9호선';
  } 
  /*
  else if(subwayId == '1061') {
    returnValue = '중앙선';
  } 
  */
  else if(subwayId == '1063') {
    returnValue = '경의중앙';
  } else if(subwayId == '1065') {
    returnValue = '공항철도';
  } else if(subwayId == '1067') {
    returnValue = '경춘선';
  } else if(subwayId == '1069') {
    returnValue = '인천1호선';
  } else if(subwayId == '1071') {
    returnValue = '수인선';
  } else if(subwayId == '1075') {
    returnValue = '분당선';
  } else if(subwayId == '1077') {
    returnValue = '신분당선';
  }
  return returnValue;
}