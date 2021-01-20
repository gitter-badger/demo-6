function postCmd( str )
{
  if ( str === "" )
	return;
  jsonCmd = {"SENDCMD":str};
  console.log(jsonCmd);
  w.postMessage(jsonCmd);		
}
function execCmd()
{
  editCmd = 0;
  str=$('CMD').value;
  $('CMD').value = '';
  if ( str.indexOf( "clear msg" )  == 0 )
  {
    $( 'content' ).innerHTML="";
    return;
  }
  postCmd( str );
}
function SendBt( btStr )
{
  jsonCmd = {"SENDCMD":btStr};
  console.log(jsonCmd);
  w.postMessage(jsonCmd);	
}
function delOne( i )
{
	postCmd( "sche del " + i );
}
function newOne( )
{ 
	var str = "<tr><td>";
	str += addckbox( "d0", "每一天" ); 
    	str += addckbox( "w1", "星期一" );
    	str += addckbox( "w2", "星期二" );
    	str += addckbox( "w3", "星期三" );
    	str += addckbox( "w4", "星期四" );
    	str += addckbox( "w5", "星期五" );
    	str += addckbox( "w6", "星期六" );
   	str += addckbox( "w7", "星期日" );
	str += "</td><td>" + "<input type='time' id='tm'>";
	str += "</td><td>" + addckbox( "sw1", "開啟" );
	str += "</td><td>" + addckbox( "sw2", "開啟" );
	str += "</td><td>" + addckbox( "sw3", "開啟" );
	str += "</td><td><input type='number' id='dur' value='0'>"
	str += "</td><td></td></tr>";
	str += "<tr><td colspan='7'><button type='button' onclick='confirm(1)'>確認</button>";
	str += "<button type='button' onclick='confirm(0)'>取消</button></td></tr>";
	$( "SCHE" ).tBodies[1].innerHTML = str;
}
function confirm( i )
{ 
 var str = "";
 if ( i )
 {
    var row = $('SCHE').tBodies[1].rows[1];
    str = "sche add ";
    if ( $( 'd0' ).checked ) 
    {
      str += "11111111";      
    }
    else
    {			
      for ( i=7; i>0; --i )
      {
        str += $( "w"+String(i) ).checked ? '1' : '0';      
      }
      str += '0';
    }
    tStr =  $('tm').value;

    str += tStr.substring( 0,2 );
    str += tStr.substring( 3,5 );	
    str += $( "sw1" ).checked ? '1' : '0'; 
    str += $( "sw2" ).checked ? '1' : '0';     
    str += $( "sw3" ).checked ? '1' : '0';
    let v = $('dur').value;
    str += ( v > 99 ) ? 99 : ( v > 9) ?  v  : "0" + v ;
    str += "00";
    postCmd( str );
 }
 str = "<tr><td colspan='7'><button type='button' onclick='newOne()'>新增</button></td></tr>"
 $( "SCHE" ).tBodies[1].innerHTML = str;	
}
function addckbox(boxname, prompt, ckfunc )
{
  str = "<input type='checkbox' name='" + boxname + "' id='" + boxname + "'";
  str += ( ckfunc != "" ) ? "onchange='" + ckfunc + "'" : "";
  str += "><label for='" + boxname + "'>" + prompt + "</label><br/>";
  return str;  
}
