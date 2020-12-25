class Time {
    constructor(singleDigit, threeDigit, period) {
        this.hour = 0;
        //2 digits for minutes
        this.firstMinute = 0;
        this.secondMinute = 0;
        //total minutes
        this.minutes = 0;
        //true = pm, false = am
        this.period = true;
    }
    //getters and setters
    set hr(hr) {
        this.hour = hr;
    }
    get hr() {
        return this.hour;
    }
    set min1(min1) {
        this.firstMinute = min1;
    }
    get min1() {
        return this.firstMinute;
    }
    set min2(min2) {
        this.secondMinute = min2;
    }
    get min2() {
        return this.secondMinute;
    }
    set mins(mins) {
        this.minutes = mins;
    }
    get mins() {
        return this.minutes;
    }
    set prd(prd) {
        this.period = prd;
    }
    get prd() {
        return this.period;
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
    ESTtoUTC() {
        if (this.period) {
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
    //doesn't work with new minute digit set up
    dateToTime(Date) {
        this.hour = Date.prototype.getUTCHours();
        //this.minute = Date.prototype.getUTCMinutes();
    }
}

module.exports = Time;