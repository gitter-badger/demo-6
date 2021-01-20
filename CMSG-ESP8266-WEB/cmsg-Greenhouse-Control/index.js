var w;
var act;
var onScheEdit=0;
var editCmd = 0;
var kM;
function $(id)
{
  return document.getElementById(id);  
}

function connect()
{
  if(typeof(Worker) === "undefined")
  {
    console.log('not support Worker');
    return;
  }
  if (typeof(w) === "undefined")
  {
    w = new Worker("./worker.js"); 
    w.onmessage = wkMsg; 
  }
  cmd = {"URL":document.URL};
  w.postMessage(cmd);
}
function wkMsg(e)
{
 var ii;
  for( i in e.data )
  {	
	if( i === "SW" )
	{
		$( 'SW1' ).innerHTML = e.data[i][0];
		$( 'SW1' ).style.backgroundColor = ( e.data[i][0] == "ON" ) ?  '#FF50FF': '#50FFFF';
		$( 'SW2' ).innerHTML = e.data[i][1];
		$( 'SW2' ).style.backgroundColor = ( e.data[i][1] == "ON" ) ?  '#FF50FF': '#50FFFF';
		$( 'SW3' ).innerHTML = e.data[i][2];
		$( 'SW3' ).style.backgroundColor = ( e.data[i][2] == "ON" ) ?  '#FF50FF': '#50FFFF';
		continue;
	}
	if( i.indexOf( "TH-" ) != -1 )
	{
		ch = i.charAt( 3 );
		et = "T" + ch;
		eh = "H" + ch;
		$( et ).innerHTML = e.data[i][0];
		$( eh ).innerHTML = e.data[i][1];
		continue;	
	}
	if( i.indexOf( "SCHE" ) != -1 )
	{
		var str = "<tr><th>週期</th><th>時間</th><th>風扇</th><th>水牆</th><th>噴灑</th><th>運轉(分)</th><th>功能</th></tr>";
		for ( j in e.data["SCHE"]  )
		{
			str += "<tr><td>" + e.data[i][j][1];
			str += "</td><td>" + e.data[i][j][2];
			str += "</td><td>" + e.data[i][j][3];
			str += "</td><td>" + e.data[i][j][4];
			str += "</td><td>" + e.data[i][j][5];
			str += "</td><td>" + e.data[i][j][6];
			str += "</td><td><button type='button' onclick='delOne("+e.data[i][j][0]+")'>刪除</button>";
			str += "</td></tr>";	
		}
		$( "SCHE" ).tBodies[0].innerHTML = str;
		continue;
	}
	ii = $( i );
	if( ii )
	{
		ii.innerHTML = e.data[i];
	}
	else
	{
		ii = $( "content" );
		str = ii.innerHTML;
		str += "<br/>";
		str += i + ":" + e.data[i];
		ii.innerHTML= str;
	}

  }
}
