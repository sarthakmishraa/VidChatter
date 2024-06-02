export const getCurrDateTime = () => {
    var currentdate = new Date(); 
    var datetime = currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " at "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();
    return datetime;
}

export const timeCommentedAgo = (storedDatetimeStr: string) => {
    function parseStoredDatetime(datetimeStr: string) {
        var parts = datetimeStr.split(" at ");
        var dateParts = parts[0].split("/");
        var timeParts = parts[1].split(":");
        // @ts-ignore
        var datetime = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1], timeParts[2]);
        return datetime;
    }
    
    var storedDatetime = parseStoredDatetime(storedDatetimeStr);
    
    var currentDatetime = new Date();
    console.log(currentDatetime)

    // @ts-ignore
    var timeDifferenceMs = currentDatetime - storedDatetime;
    var timeDifferenceSeconds = timeDifferenceMs / 1000;
    
    var timeDifferenceMins = timeDifferenceSeconds/60
    
    var timeDifferenceHours = timeDifferenceMins/60
    
    var timeDifferenceDays = timeDifferenceHours/24
    
    if (timeDifferenceDays > 1) {
        // @ts-ignore
        if(parseInt(timeDifferenceDays) === 1) {
            // @ts-ignore
            return parseInt(timeDifferenceDays) + " day ago"
        }
        // @ts-ignore
        return parseInt(timeDifferenceDays) + " days ago"
    }
    else if (timeDifferenceHours > 1) {
        // @ts-ignore
        if(parseInt(timeDifferenceHours) === 1) {
            // @ts-ignore
            return parseInt(timeDifferenceHours) + " hour ago"
        }
        // @ts-ignore
        return parseInt(timeDifferenceHours) + " hours ago"
    }
    else if (timeDifferenceMins > 1) {
        // @ts-ignore
        if(parseInt(timeDifferenceMins) === 1) {
            // @ts-ignore
            return parseInt(timeDifferenceMins) + " min ago"
        }
        // @ts-ignore
        return parseInt(timeDifferenceMins) + " mins ago"
    }
    else {
        return "Just now";
    }
}