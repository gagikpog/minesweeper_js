
function showConfirm(message, description, config) {
    if (!document.querySelector('#confirm')) {
        createHtml();
    }
    return new Promise((res, rej) => {
        const dialog = document.querySelector('#confirm');
        showConfirm.done = (answer) => {
            res(answer)
            dialog.style.display = 'none';
        }

        config = config || {};
        const isNeedUseDefaultButtons = config.MBOK || config.MBCANCEL || config.MBYES;

        if (!config.buttons) {
            config.buttons = [{
                    id: 'MBCANCEL',
                    title: 'Отмена',
                    backgroundColor: '#28a745',
                    color: '#fff',
                    order: 3
                }, {
                    id: 'MBOK',
                    title: 'ОК',
                    backgroundColor: '#6c757d',
                    color: '#fff',
                    order: 2
                }, {
                    id: 'MBYES',
                    title: 'Да',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    order: 1
                }
            ];
        }
        config = {
            ...{
                theme: 'dark'
            },
            ...config
        };


        const buttonsContainer = document.querySelector('.messageBox-buttons');
        while(buttonsContainer.hasChildNodes()) {
            buttonsContainer.removeChild(buttonsContainer.lastChild);
        }
        config.buttons.forEach((button) => {
            if (isNeedUseDefaultButtons && !(button.id in config)) {
                return;
            }
            const btn = document.createElement('button');
            btn.classList.add('btn', 'mbButton');
            btn.textContent = button.title;
            btn.id = button.id;
            btn.onclick = function() {
                showConfirm.done(button.id);
            };
            btn.style.backgroundColor = button.backgroundColor;
            btn.style.color = button.color;
            btn.style.order = button.order;
            buttonsContainer.appendChild(btn);
        });

        dialog.classList = [];
        dialog.classList.add('confirm', config.theme);
        dialog.style.display = 'flex';

        const minWidth = 400;
        let width = config.buttons.length * 130;
        width = width < minWidth ? minWidth : config.buttons.length * 130;
        document.querySelector('.dialog').style.maxWidth = `${width}px`;
        document.querySelector('#messageTitle').textContent = message;
        document.querySelector('#messageDescription').textContent = description;
    });
}

function createHtml () {

    const confirm = document.createElement('div');
    confirm.id = 'confirm';
    confirm.classList.add('confirm');
    confirm.style.display = 'none';

    const dialog = document.createElement('div');
    dialog.classList.add('dialog');

    const h1 = document.createElement('h1');
    h1.id = 'messageTitle';
    h1.classList.add('title');

    const p = document.createElement('p');
    p.id = 'messageDescription';
    p.classList.add('description');

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('messageBox-buttons');

    dialog.appendChild(h1);
    dialog.appendChild(p);
    dialog.appendChild(buttonsContainer);

    confirm.appendChild(dialog);
    document.body.appendChild(confirm);
}