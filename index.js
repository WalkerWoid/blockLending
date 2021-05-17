'use strict'

class Events {
    constructor() {
        this._init();
    }
    _init() {
        this._clickTimeHandler();
    }
    _clickTimeHandler() {
        document.addEventListener('click', (event) => this._timeClick(event));
    }
    _timeClick(event) {
        const target = event.target;
        if (!target.classList.contains('time')) {
            return
        }

        const parent = this._getParentElement(target);
        const allTimes = this._getAllTimes(parent);

        this._removeActiveClass(allTimes);
        this._addActiveClass(target);
    }
    _getParentElement(target) {
        if (!target.parentElement.classList.contains('times-container')) {
            return target.parentElement.parentElement.parentElement;
        } else {
            return target.parentElement
        }
    }
    _getAllTimes(parent) {
        return [...parent.querySelectorAll('.time')];
    }
    _removeActiveClass(allTimes) {
        for (const time of allTimes) {
            time.classList.remove('time_active');
        }
    }
    _addActiveClass(target) {
        target.classList.add('time_active');
    }
}

class Times {
    constructor() {
        this._init();
    }
    _init() {
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024) {
                this._methodCreate();
            }
            if (window.innerWidth < 1024){
                this._methodDel()
            }
        })

        if (window.screen.width >= 1024) {
            this._methodCreate();
            } else if (window.screen.width < 1024) {
            console.log(2)
        }
    }
    _methodCreate() {
        if (document.querySelector('.time_more-btn') === null) {
            const allCards = this._getAllCards();

            for (const card of allCards) {
                const times = this._getAllTimes(card);
                if (times.length < 4) {
                    return
                }
                const lostTimes = this._getLostTimes(times);
                card.querySelector('.times-container').appendChild(this._createMoreButton());
                card.querySelector('.time_more-btn').appendChild(this._createOtherTimesBlock());

                card.querySelector('.time_more-btn')
                    .addEventListener('click', (event) => this._openCloseOtherTimesBlock(event, card));

                for (const time of lostTimes) {
                    time.classList.add('time-hidden');
                    card.querySelector('.otherTimesBlock').appendChild(time);
                }
            }
        }
    }
    _getAllCards() {
        return [...document.querySelectorAll('.card')];
    }
    _getAllTimes(card) {
        return [...card.querySelectorAll('.time')];
    }
    _getLostTimes(times) {
        return times.slice(3, times.length)
    }
    _createMoreButton() {
        const button = document.createElement('div');
        button.classList.add('time_more-btn');
        button.textContent = 'еще...';
        return button;
    }
    _createOtherTimesBlock() {
        const div = document.createElement('div');
        div.classList.add('otherTimesBlock');
        div.classList.add('otherTimesBlock_hidden');
        return div;
    }
    _openCloseOtherTimesBlock(event, card) {
        const otherTimesBlock = card.querySelector('.otherTimesBlock');
        if (!event.target.classList.contains('time_more-btn')) {
            return
        }

        if (otherTimesBlock.classList.contains('otherTimesBlock_hidden')) {
            otherTimesBlock.classList.remove('otherTimesBlock_hidden');
        } else {
            otherTimesBlock.classList.add('otherTimesBlock_hidden')
        }
    }

    _methodDel() {
        if (document.querySelector('.time_more-btn') !== null) {
            const allCards = this._getAllCards();
            for (const card of allCards) {
                const times = this._getAllTimes(card);
                const timesContainer = this._getTimesContainer(card);

                // card.removeChild()

                timesContainer.textContent = '';
                for (const time of times) {
                    timesContainer.appendChild(time);
                }
            }
        }
    }
    _getTimesContainer(card) {
        return card.querySelector('.times-container');
    }
}

const events = new Events();
const times = new Times();
