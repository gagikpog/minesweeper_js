
function showConfirm(message, description, buttons) {
    if (!document.querySelector('#confirm')) {
        createHtml();
    }
    return new Promise((res, rej) => {
        const dialog = document.querySelector('#confirm');
        showConfirm.done = (answer) => {
            res(answer)
            dialog.style.display = 'none';
        }
        dialog.style.display = 'flex';
        if (!buttons) {
            buttons = {
                MBCANCEL: true,
                MBOK: true,
                MBYES: false
            }
        }
        document.querySelector('#mbOk').style.display = buttons.MBOK ? 'inline-block' : 'none';
        document.querySelector('#mbYes').style.display = buttons.MBYES ? 'inline-block' : 'none';
        document.querySelector('#mbCancel').style.display = buttons.MBCANCEL ? 'inline-block' : 'none';
        document.querySelector('#messageTitle').textContent = message;
        document.querySelector('#messageDescription').textContent = description;
    });
}

function createHtml () {

    const confirm = document.createElement('div');
    confirm.id = 'confirm';
    confirm.classList.add('confirm');
    confirm.style.display = 'none';

    const body = document.createElement('div');
    body.classList.add('body');


    const h1 = document.createElement('h1');
    h1.id = 'messageTitle';
    h1.classList.add('title');

    const p = document.createElement('p');
    p.id = 'messageDescription';
    p.classList.add('description');


    const mbYes = document.createElement('button');
    mbYes.textContent = 'Да';
    mbYes.id = 'mbYes';
    mbYes.classList.add('btn', 'mbButton');
    mbYes.onclick = function() {
        showConfirm.done(true)
    }
    const mbOk = document.createElement('button');
    mbOk.textContent = 'ОК';
    mbOk.classList.add('btn', 'mbButton');
    mbOk.id = 'mbOk';
    mbOk.onclick = mbYes.onclick;
    const mbCancel = document.createElement('button');
    mbCancel.textContent = 'Нет';
    mbCancel.id = 'mbCancel';
    mbCancel.classList.add('btn', 'mbButton');
    mbCancel.onclick = function() {
        showConfirm.done(false)
    }

    const btns = document.createElement('div');
    btns.classList.add('messageBox-buttons');
    btns.appendChild(mbYes);
    btns.appendChild(mbOk);
    btns.appendChild(mbCancel);

    body.appendChild(h1);
    body.appendChild(p);
    body.appendChild(btns);

    confirm.appendChild(body);
    document.body.appendChild(confirm);
}