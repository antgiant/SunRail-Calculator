(function () {

    function calendar(month, first) {

        //Variables to be used later.  Place holders right now.
        var padding = "";
        var totalFeb = "";
        var i = 1;
        var testing = "";

        var current = new Date();
        var cmonth = current.getMonth();
        var day = current.getDate();
        var year = current.getFullYear();
        if (!first) {
            year++;
        }
        var tempMonth = month + 1; //+1; //Used to match up the current month with the correct start date.
        var prevMonth = month - 1;
        var rowcount = 1;

        //Determing if Feb has 28 or 29 days in it.  
        if (month == 1) {
            if ((year % 100 !== 0) && (year % 4 === 0) || (year % 400 === 0)) {
                totalFeb = 29;
            } else {
                totalFeb = 28;
            }
        }

        //////////////////////////////////////////
        // Setting up arrays for the name of    //
        // the	months, days, and the number of	//
        // days in the month.                   //
        //////////////////////////////////////////

        var monthNames = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"];
        var totalDays = ["31", "" + totalFeb + "", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"];

        //////////////////////////////////////////
        // Temp values to get the number of days//
        // in current month, and previous month.//
        // Also getting the day of the week.	//
        //////////////////////////////////////////

        //Set first day of the month for "Special month"
        if (month == cmonth && first) {
            i = day;
        }
        if (month == cmonth && !first) {
            totalDays[month] = day;
        }

        var tempDate = new Date(tempMonth + ' ' + i + ' ,' + year);
        var tempweekday = tempDate.getDay();
        var tempweekday2 = tempweekday;
        var dayAmount = totalDays[month];
        // var preAmount = totalDays[prevMonth] - tempweekday + 1;	

        //////////////////////////////////////////////////
        // After getting the first day of the week for	//
        // the month, padding the other days for that	//
        // week with the previous months days.  IE, if	//
        // the first day of the week is on a Thursday,	//
        // then this fills in Sun - Wed with the last	//
        // months dates, counting down from the last	//
        // day on Wed, until Sunday.                    //
        //////////////////////////////////////////////////

        while (tempweekday > 0) {
            padding += "<td class='premonth'></td>";
            //preAmount++;
            tempweekday--;
        }
        //////////////////////////////////////////////////
        // Filling in the calendar with the current     //
        // month days in the correct location along.    //
        //////////////////////////////////////////////////

        while (i <= dayAmount) {

            //////////////////////////////////////////
            // Determining when to start a new row	//
            //////////////////////////////////////////

            if (tempweekday2 > 6) {
                tempweekday2 = 0;
                padding += "</tr><tr>";
                rowcount++;
            }

            //////////////////////////////////////////////////////////////////////////////////////////////////
            // checking to see if i is equal to the current day, if so then we are making the color of //
            //that cell a different color using CSS. Also adding a rollover effect to highlight the  //
            //day the user rolls over. This loop creates the acutal calendar that is displayed.		//
            //////////////////////////////////////////////////////////////////////////////////////////////////
            var classes = year + "" + month + " ";
            if (i == day && month == cmonth) {
                classes += "currentday ";
            }
            if (month % 2 === 0) {
                classes += "evenmonth";
            } else {
                classes += "oddmonth";
            }
            padding += "<td class='" + classes + "'>\n";
            padding += "  <sup>"+i+"</sup><br>\n"
            padding += "  &#9650;<br>\n";
            padding += "  <span id=" + year + month + "" + i + ">0</span><br>\n";
            padding += "  &#9660;\n";
            padding += "</td>";
            tempweekday2++;
            i++;
        }
        if (tempweekday2 <= 6) {
//           rowcount--;
        }

        /////////////////////////////////////////
        // Ouptputing the calendar onto the	//
        // site.  Also, putting in the month	//
        // name and days of the week.		//
        /////////////////////////////////////////

        var calendarTable = "";
        if (first && month == cmonth) {
            calendarTable += "<tr class='weekdays'> <td></td> <td>Sunday</td>  <td>Monday</td> <td>Tuesday</td> <td>Wednesday</td> <td>Thursday</td> <td>Friday</td> <td>Saturday</td> </tr>";
        }
        calendarTable += "<tr><td rowspan=" + rowcount + " class='"+((month % 2 === 0)?"evenmonth":"oddmonth")+"'><div class='vertical-text'><div class='vertical-text__inner'><strong>" + monthNames[month] + " " + year + "</strong></div></div></td>";
        calendarTable += padding;
        calendarTable += "</tr>";
        document.getElementById("calendar").innerHTML += calendarTable;
    }

    function go12() {
        var current = new Date();
        var cmonth = current.getMonth();
        for (i = cmonth; i < 12; i++) {
            calendar(i, true);
        }
        for (i = 0; i <= cmonth; i++) {
            calendar(i, false);
        }
    }

    if (window.addEventListener) {
        window.addEventListener('load', go12, false);
    } else if (window.attachEvent) {
        window.attachEvent('onload', go12);
    }

})();