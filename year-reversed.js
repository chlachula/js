/* 
 * 2013, 2014 Josef Chlachula jch@minetlab.com
 * year-reversed.js, version 1.1 
 * 
 * Calendar of Sunday links to the weekly bulletin
 * with the most recent months first.
 *  
 * Expects style like:
 * <style> #yearReversed{ font-family: Courier;}
 *         #yearReversed a:link {text-decoration: none;}
 * </style>
 *  
 */
var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
var weekCounter = 0;
var linkWeeksCounter = 0;
var linkWeeksNumber = 15;

function showStuff(id) {
    document.getElementById(id).style.display = 'block';
}
function hideStuff(id) {
    document.getElementById(id).style.display = 'none';
}
function stringNum2WithLeadingZero(n) {
    var nn = "00";
    if (n < 10) {
        nn = "0" + n;
    } else {
        nn = "" + n;
    }
    return nn;
}

function getStringYyyymmdd(timeNow) {
    var yyyymmdd = stringNum2WithLeadingZero(timeNow.getFullYear());
    yyyymmdd += stringNum2WithLeadingZero(timeNow.getMonth() + 1);
    yyyymmdd += stringNum2WithLeadingZero(timeNow.getDate());
    return yyyymmdd;
}
function timeNowDependent() {
    var timeNow = new Date();
    var yyyymmdd = getStringYyyymmdd(timeNow);
    document.writeln("<br/>time now is " + timeNow);
    document.writeln("<br/>yyyymmdd is " + yyyymmdd);
}
function makeReverseSundaysTable(isLastYear, sundayURL) {
    var timeNow = new Date();
    var dateMonth1;
    var timeNowAdjustedMs = timeNow.getTime() + 1 * 86400000;
    var sundayAHREF = "<a href='" + sundayURL;

    var year = timeNow.getFullYear();
    if (isLastYear)
        year -= 1;
    if (isLastYear === false) {
        document.writeln("<hr/> ");
        document.writeln("<table id=\"yearReversed\">");
        document.writeln("<tr><td><b>Month</b></td><td align='right'># &nbsp;</td><td><b>Sundays " + year + "</b></td></tr>");
    } else {
        document.writeln("<tr><td> </td><td align='right'>&nbsp;</td><td><b>Sundays " + year + "</b></td></tr>");
    }
    for (i = 11; i >= 0; i--) {
        dateMonth1 = new Date(year, i, 1, 0, 0, 0, 0);//year, month, day, hours, minutes, seconds, milliseconds
        if (weekCounter < 52) {

            if (timeNowAdjustedMs > dateMonth1.getTime()) {
                document.writeln("<tr><td>" + monthNames[i] + "</td><td align='right'>" + (i + 1) + " | </td><td>");
                comma = "";
                linkMonth = linkWeeksCounter <= linkWeeksNumber;
                for (j = 1; j <= 31; j++) {
                    d = new Date(year, i, j, 0, 0, 0, 0);
                    if (d.getDay() === 0) {
                        if (timeNowAdjustedMs >= d.getTime()) {
                            if (j < 10)
                                leadingSpaceDay = "&nbsp;" + j;
                            else
                                leadingSpaceDay = j;
                            if (linkMonth)
                            document.write(comma + sundayAHREF + getStringYyyymmdd(d) + "B.pdf'>" + leadingSpaceDay + "</a>");
                        else
                            document.write(comma + leadingSpaceDay);
                            comma = ", ";
                            weekCounter++;
                            linkWeeksCounter++;
                        }
                    }
                }
                document.writeln("</td></tr>");
            }
        }
    }
    if (isLastYear === true) {
        document.writeln("</table>");
        document.writeln("<hr/> ");
    }
}
function makeYearOfReverseSundays(sundayURL) {
    makeReverseSundaysTable(isLastYear = false, sundayURL);
    makeReverseSundaysTable(isLastYear = true, sundayURL);
}
