<?
  include "dbconnect.php";

  if($_REQUEST['stationNm']){
    $station_nm = $_REQUEST['stationNm'];

    $sql = 'SELECT name, stcode, lncode FROM codes WHERE name LIKE "'.$station_nm.'%" ORDER BY name;';
    $result = mysql_query($sql, $connect);
    $total = mysql_num_rows($result);
    if($total){
      for($i = 0; $i < $total; $i++){
          mysql_data_seek($result, $i);
          $row = mysql_fetch_array($result);
          if($row[stcode] != ''){
            echo '<li><a href="javascript:addData(\''.$row[name].'\', '.$row[stcode].', '.$row[lncode].');">';
            echo $row[name].' - '.getLine($row[lncode]);
            echo '</a></li>';
          }
      }
    }else{
      echo '<li>검색 결과가 없습니다.</li>';
    }
  }else{
    echo '<li>검색어를 넣으세요.</li>';
  }

  function getLine($subwayId){
    if($subwayId == '1001') {
      return '1호선';
    } else if($subwayId == '1002') {
      return '2호선';
    } else if($subwayId == '1003') {
      return '3호선';
    } else if($subwayId == '1004') {
      return '4호선';
    } else if($subwayId == '1005') {
      return '5호선';
    } else if($subwayId == '1006') {
      return '6호선';
    } else if($subwayId == '1007') {
      return '7호선';
    } else if($subwayId == '1008') {
      return '8호선';
    } else if($subwayId == '1009') {
      return '9호선';
    } 
    /*
    else if(subwayId == '1061') {
      return '중앙선';
    } 
    */
    else if($subwayId == '1063') {
      return '경의중앙';
    } else if($subwayId == '1065') {
      return '공항철도';
    } else if($subwayId == '1067') {
      return '경춘선';
    } else if($subwayId == '1069') {
      return '인천1호선';
    } else if($subwayId == '1071') {
      return '수인선';
    } else if($subwayId == '1075') {
      return '분당선';
    } else if($subwayId == '1077') {
      return '신분당선';
    }
    return '';
  }

?>