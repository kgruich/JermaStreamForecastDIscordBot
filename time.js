class Time {
    constructor() {
        //hours
        this.hour = 0;
        //total minutes
        this.minutes = 0;
        //true = pm, false = am
        this.period = false;
        //if the time has been set or not
        this.status = false;
    }
    //getters and setters
    set hr(hr) {
        this.hour = hr;
    }
    get hr() {
        return this.hour;
    }

    set min(min) {
        this.minutes = min;
    }
    get min() {
        return this.minutes;
    }

    set prd(prd) {
        this.period = prd;
    }
    get prd() {
        return this.period;
    }

    set sts(sts) {
        this.status = sts;
    }
    get sts() {
        return this.status;
    }

    //methods
    readout() {
        var fullString;
        fullString = this.hour + ':';

        if (this.minutes === 0) {
            fullString += '00';
        }
        else {
            fullString += this.minutes;
        }

        if (this.period) {
            fullString += ' pm';
        }
        else {
            fullString += ' am';
        }

        return fullString;
    }
    //unused
    PSTtoUTC() {
        if (this.period) {
            if (this.hour < 4) {
                this.hour = this.hour + 8;
            }
            else {
                this.hour = (this.hour - 12) + 8;
                this.period = !this.period; 
            }
        }
        else {
            this.hour = this.hour + 8;
        }
    }
    to24Hour() {
        if (!this.period && this.hour === 12) {
            //12am edge
            this.hour = 0;
        }
        else if (this.period) {
            this.hour = (this.hour % 12) + 12;
        }
    }
    dateToTime(Date) {
        //time is converted to PST
        var UTCHour = Date.getUTCHours()
        var PSThour;
        if (UTCHour > 0 || UTCHour < 8) {
            this.period = true;
            PSThour = UTCHour + 4;
        }
        else {
            if (UTCHour < 12) {
                this.period = false;
            }
            else {
                this.period = true;
            }
            PSThour = UTCHour - 8;
        }

        this.hour = PSThour;
        this.minutes = Date.getUTCMinutes();
    }
    reset() {
        this.hour = 0;
        this.minutes = 0;
        this.period = false;
        this.status = false;
    }
}

module.exports = Time;