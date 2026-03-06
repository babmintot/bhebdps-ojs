class AlarmClock {
    constructor() {
        this.alarmCollection = [];
        this.intervalId = null;
    }

    addClock(time, callback) {
        if (!time || !callback) {
            throw new Error('Отсутствуют обязательные аргументы');
        }

        for (let i = 0; i < this.alarmCollection.length; i++) {
            if (this.alarmCollection[i].time === time) {
                console.warn('Уже присутствует звонок на это же время');
                break;
            }
        }

        this.alarmCollection.push({
            callback: callback,
            time: time,
            canCall: true
        });
    }

    removeClock(time) {
        this.alarmCollection = this.alarmCollection.filter(function (alarm) {
            return alarm.time !== time;
        });
    }

    getCurrentFormattedTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return hours + ':' + minutes;
    }

    start() {
        if (this.intervalId) {
            return;
        }

        const self = this;
        this.intervalId = setInterval(function () {
            const currentTime = self.getCurrentFormattedTime();

            self.alarmCollection.forEach(function (alarm) {
                if (alarm.time === currentTime && alarm.canCall) {
                    alarm.canCall = false;
                    alarm.callback();
                }
            });
        }, 1000);
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    resetAllCalls() {
        this.alarmCollection.forEach(function (alarm) {
            alarm.canCall = true;
        });
    }

    clearAlarms() {
        this.stop();
        this.alarmCollection = [];
    }
}