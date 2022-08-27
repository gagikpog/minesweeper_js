import * as view from './view.js';
import * as statistics from './statistics.js';

export class leaderBoard {

    static _opened = false;
    static _activeTab = 'beginner';

    static toggle() {
        if (leaderBoard._opened) {
            leaderBoard.close();
        } else {
            leaderBoard.open();
        }
    }

    static open() {
        if (!leaderBoard._opened) {
            const leaderBoardDialog = document.querySelector('#leaderBoardDialog');
            leaderBoardDialog.style.display = 'flex';
            leaderBoard._opened = true;
            view.displayBlocker(leaderBoard._opened);
            leaderBoard._loadLevel(leaderBoard._activeTab);
        }
    }

    static close() {
        if (leaderBoard._opened) {
            const leaderBoardDialog = document.querySelector('#leaderBoardDialog');
            leaderBoardDialog.style.display = 'none';
            leaderBoard._opened = false;
            view.displayBlocker(leaderBoard._opened);
        }
    }

    static _loadLevel(level) {
        statistics.getStatisticByLevel(level).then((data) => {
            leaderBoard._createNodes(data);
        });
    }

    static _createNodes(data) {
        const bodyNode = document.querySelector('#leaderBoardBody');

        while (bodyNode.hasChildNodes()) {
            bodyNode.removeChild(bodyNode.children[0]);
        }

        for (let i = 0; i < data.length; i++) {
            const itemNode = document.createElement('div');
            itemNode.classList.add('leader-board__body-row');

            const nameNode = document.createElement('div');
            nameNode.classList.add('leader-board__body-row-name');
            nameNode.textContent = data[i].name;

            const timeNode = document.createElement('div');
            timeNode.classList.add('leader-board__body-row-time');
            timeNode.textContent = data[i].time;

            const dateNode = document.createElement('div');
            dateNode.classList.add('leader-board__body-row-date');
            dateNode.textContent = formatDate(data[i].date);

            itemNode.appendChild(nameNode);
            itemNode.appendChild(dateNode);
            itemNode.appendChild(timeNode);

            bodyNode.appendChild(itemNode);
        }
    }

    static activateTab(tabs, event) {

        for (let i = 0; i < tabs.childElementCount; i++) {
            tabs.children[i].classList.remove('leader-board__tab-active');
        }
        event.target.classList.add('leader-board__tab-active');

        const tabName = event.target.dataset.name;

        leaderBoard._activeTab = tabName;

        leaderBoard._loadLevel(tabName);
    }

}

function formatDate(date) {
    const d = new Date(date)
    return ("0" + d.getDate()).slice(-2) + "." + ("0" + (d.getMonth() + 1)).slice(-2) + "." +
        d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
}
