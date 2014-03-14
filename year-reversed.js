/* 2013 Josef Chlachula jch@minetlab.com
 *
 * Calendar of Sunday links to the weekly bulletin
 * with the most recent months first.
 *
 */
  
var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
	function showStuff(id) {
		document.getElementById(id).style.display = 'block';
	}
	function hideStuff(id) {
		document.getElementById(id).style.display = 'none';
	}
	function stringNum2WithLeadingZero(n){
	 var nn = "00";
	 if (n<10) {nn = "0"+n;} else {nn = ""+n;}
	 return nn;
	}

	function getStringYyyymmdd(timeNow){
	 var yyyymmdd = stringNum2WithLeadingZero(timeNow.getFullYear());
	 yyyymmdd += stringNum2WithLeadingZero(timeNow.getMonth()+1);
	 yyyymmdd += stringNum2WithLeadingZero(timeNow.getDate());
     return yyyymmdd;
	}
	function timeNowDependent(){
	 var timeNow = new Date();
	 var yyyymmdd = getStringYyyymmdd(timeNow);
	 document.writeln("<br/>time now is " + timeNow);
	 document.writeln("<br/>yyyymmdd is " + yyyymmdd);
	}
	function makeReverseSundaysList(year){
	 var timeNow = new Date();
	 var date1231 = new Date(year, 11, 31, 0, 0, 0, 0);//year, month, day, hours, minutes, seconds, milliseconds
	 var date0101 = new Date(year,  0,  1, 0, 0, 0, 0);//year, month, day, hours, minutes, seconds, milliseconds
	 var date0101ms = date0101.getTime();	 
	 var dow = date1231.getDay();
	 var sunDate = new Date(date1231.getTime() - dow*86400000);
	 var sunDatems = sunDate.getTime();
	 var timeNow1Dms = timeNow.getTime() + 86400000;
	   document.writeln("<br/> d " + date1231);
	   document.writeln("<br/> d " + (new Date(date1231.getTime())));
	 document.writeln("<br/><b>Sundays of " + year + " dow ="+dow);
	   document.writeln("<br/> ms " + date0101ms);
	   document.writeln("<br/> ms " + sunDatems);
	 while (sunDatems > date0101ms){
	   yyyymmdd = getStringYyyymmdd(sunDate);
	   if (sunDatems < timeNow1Dms) {document.writeln("<br/>Sunday[yyyymmdd] is " + yyyymmdd);}
	   sunDatems -= 7*86400000;
	   sunDate = new Date(sunDatems);
	 }
	}
	function makeReverseSundaysTable(year){
	 var timeNow = new Date();
	 var date1231 = new Date(year, 11, 31, 0, 0, 0, 0);//year, month, day, hours, minutes, seconds, milliseconds
	 var date0101 = new Date(year,  0,  1, 0, 0, 0, 0);//year, month, day, hours, minutes, seconds, milliseconds
	 var date0101ms = date0101.getTime();	 
	 var dow = date1231.getDay();
	 var sunDate = new Date(date1231.getTime() - dow*86400000);
	 var sunDatems = sunDate.getTime();
	 var timeNow1Dms = timeNow.getTime() + 86400000;
	 var dateMonth1;
	 var timeNowAdjustedMs = timeNow.getTime()+1*86400000;
	   document.writeln("<hr/> ");
	   document.writeln("<table>");
	   document.writeln("<tr><td><b>Month</b></td><td align='right'># &nbsp;</td><td><b>Sundays "+year+"</b></td></tr>");
	   for (i=11;i >= 0; i--){
	     dateMonth1 = new Date(year, i, 1, 0, 0, 0, 0);//year, month, day, hours, minutes, seconds, milliseconds
	   	 if(timeNowAdjustedMs  > dateMonth1.getTime()){
	   	    document.writeln("<tr><td>"+ monthNames[i]+"</td><td align='right'>"+(i+1)+" / </td><td>");
	   	    comma="";
	        for (j=1; j <=31; j++){
	          d = new Date(year, i, j, 0, 0, 0, 0);
	          if (d.getDay() == 0){
	           if (timeNowAdjustedMs >= d.getTime()){
	            document.write(comma+"<a href='http://content.seekandfind.com/bulletins/02/0741/"+getStringYyyymmdd(d)+"B.pdf'>"+j+"</a>");
	            comma=", ";
	           }
	          }
	        }
	   	    document.writeln("</td></tr>");
	   	 }	   
	   	 //document.writeln("<br/>i="+i+".");	   
	   }
	   document.writeln("</table>");
	   document.writeln("<hr/> ");
	}
	//makeReverseSundaysTable(2013);
