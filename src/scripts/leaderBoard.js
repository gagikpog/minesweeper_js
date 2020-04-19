const leaderBoard = {
    _opened: false,
    _activeTab: 'beginner',
    toggle: function() {
        if (this._opened) {
            this.close();
        } else {
            this.open();
        }
    },

    open: function() {
        if (!this._opened) {
            const leaderBoardDialog = document.querySelector('#leaderBoardDialog');
            leaderBoardDialog.style.display = 'flex';
            this._opened = true;
            displayBlocker(this._opened);
            this._loadLevel(this._activeTab);
        }
    },

    close: function() {
        if (this._opened) {
            const leaderBoardDialog = document.querySelector('#leaderBoardDialog');
            leaderBoardDialog.style.display = 'none';
            this._opened = false;
            displayBlocker(this._opened);
        }
    },

    _loadLevel: function(level) {
        getStatisticByLevel(level).then((data) => {
            this._createNodes(data);
        });
    },

    _createNodes(data) {
        const bodyNode = document.querySelector('#leaderBoardBody');

        while(bodyNode.hasChildNodes()) {
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
    },

    activateTab: function(tabs, event) {

        for (i = 0; i < tabs.childElementCount; i++) {
            tabs.children[i].classList.remove('leader-board__tab-active');
        }
        event.target.classList.add('leader-board__tab-active');

        const tabName = event.target.dataset.name;

        this._activeTab = tabName;

        this._loadLevel(tabName);
    }

}

function formatDate(date) {
    const d = new Date(date)
    return ("0" + d.getDate()).slice(-2) + "." + ("0"+(d.getMonth()+1)).slice(-2) + "." +
    d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
}
