const apiRoot = '/minesweeper/'

function saveStatistics() {

    const time = Game.remainingTime;
    const level = getLevel();

    const message = 'Введите свое имя';
    const detailed = `Длительность игры ${time} секунд`;
    const config = {
        theme: 'dark',
        buttons: [{
                id: 'MBCANCEL',
                title: 'Отмена',
                backgroundColor: '#28a745',
                color: '#fff',
                order: 3,
                validate: false
            }, {
                id: 'MBOK',
                title: 'ОК',
                backgroundColor: '#6c757d',
                color: '#fff',
                order: 2,
                validate: true
            }
        ],
        templateId: 'text-wrapper'
    };

    return showConfirm(message, detailed, config).then((res) => {
        if (res.button === 'MBOK' && 'endGame' === Game.status) {
            const name = res.formData && res.formData.userName;
            if (name && time && level) {
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
        }
    });

}