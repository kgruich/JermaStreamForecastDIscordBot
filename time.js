class Time {
    constructor(singleDigit, threeDigit, period) {
        this.hour = 0;
        this.minutes = 0;
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
    set minutes(num) {
        this.minutes = num;
    }
    get minutes() {
        return this.minutes;
    }
    set period(bool) {
        this.period = bool;
    }
    get period() {
        return this.period;
    }
    //methods
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
        this.minutes = Date.prototype.getUTCMinutes();
    }
}

module.exports = Time;