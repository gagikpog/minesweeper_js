const apiRoot = '/'

function saveStatistics() {

    const time = currentGame.remainingTime;
    const level = getLevel();
    if (!time || !level) {
        return Promise.resolve(false);
    }
    const save = (name) => {
        const basePath = 'api/add.php'
        let path = apiRoot + basePath;
        const body = {
            name,
            time,
            level
        };
        return fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body)
        }).then((data) => {
            return data.json();
        }).then((result) => {
            if (result && result.status === 'error') {
                showConfirm('Ошибка', result.message, { MBOK: true, theme: 'dark' })
            }
        });
    }

    if (Game.userName) {
        return save(Game.userName);
    }

    const message = rk('Enter your name');
    const detailed = rk('The game lasts ${time} seconds').replace('${time}', time);
    const config = {
        theme: 'dark',
        buttons: [{
                id: 'MBCANCEL',
                title: rk('Cancel'),
                backgroundColor: '#28a745',
                color: '#fff',
                order: 3,
                validate: false
            }, {
                id: 'MBOK',
                title: rk('OK'),
                backgroundColor: '#6c757d',
                color: '#fff',
                order: 2,
                validate: true
            }
        ],
        templateId: 'text-wrapper'
    };

    return showConfirm(message, detailed, config).then((res) => {
        if (res.button === 'MBOK' && 'endGame' === currentGame.status) {
            const formData = res.formData || {};
            const name = formData.userName;
            const rememberName = formData.rememberName;
            if (rememberName === 'on') {
                window.localStorage.setItem('userName', name);
                Game.userName = name;
            }
            if (name) {
                return save(name)
            }
            return Promise.resolve(false);
        }
    });

}


function getStatisticByLevel(level) {

    const basePath = 'api/getTop.php'
    let path = apiRoot + basePath;

    return fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({level})
    }).then((data) => {
        return data.json();
    }).then((result) => {
        if (result && result.status === 'error') {
            showConfirm('Ошибка', result.message, { MBOK: true, theme: 'dark' })
        }
        return result.data;
    });
}