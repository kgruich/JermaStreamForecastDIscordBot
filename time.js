class Time {
    constructor(singleDigit, threeDigit, period) {
        this.hour = 0;
        this.minute = 0;
        //true = pm, false = am
        this.period = true;
    }
    //getters and setters
    set hour(num) {
        this.hour = num;
    }
    get hour() {
        return this.hour;
    }
    set minute(num) {
        this.minute = num;
    }
    get minute() {
        return this.minute;
    }
    set period(bool) {
        this.period = bool;
    }
    get period() {
        return this.period;
    }
    //methods
    readout() {
        var fullString;
        fullString = this.hour + ':';

        if (this.minute < 10) {
            fullString.concat('0' + this.minute)
        }
        else {
            fullString.concat(this.minute)
        }

        if (period) {
            fullString.concat(' pm')
        }
        else {
            fullString.concat(' am')
        }

        return fullString;
    }
    ESTtoUTC() {
        if (period) {
            if (this.hour < 7) {
                this.hour = this.hour + 5;
            }
            else {
                this.hour = (this.hour - 12) + 5;
                this.period = !this.period; 
            }
        }
        else {
            this.hour = this.hour + 5;
        }
    }
    dateToTime(Date) {
        this.hour = Date.prototype.getUTCHours();
        this.minute = Date.prototype.getUTCMinutes();
    }
}

module.exports = Time;