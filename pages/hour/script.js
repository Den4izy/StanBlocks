let xht = new XMLHttpRequest();
let container = document.querySelector('.container');


function go() {

    xht.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            func(this.responseText);
        }
    }
    xht.open("GET", "http://qwertyfour.zzz.com.ua/php/phpFileGet.php?act=1", true);

    xht.send();

}

document.querySelector('#but').onclick = go;



function func(data) {
    Arr = JSON.parse(data);

    Arr = arrOffAes(Arr);
    Arr = arrTes(Arr);
    container.innerHTML += out(Arr);

}



function arrOffAes(arr) {
    let ar = [];
    for (let i = 4; i < arr.length; i++) {
        ar.push(arr[i]);
    }
    return ar;
}

function arrTes(arr) {
    let ar = [];
    for (let i = 0, k = 0; i < arr.length; i++, k++) {
        if (arr[i][0] == 'КТЕЦ-5' || arr[i][0] == 'КТЕЦ-6' || arr[i][0] == 'ХТЕЦ-5') {
            k = k - 1;
            continue
        } else {
            ar[k] = arr[i];
        }
    }
    return ar;
}
let k = true;
function time() {
    let data = new Date();

    if (Number(data.getMinutes()) == 0 && k == true) {
        go();
        if (Number(data.getMinutes()) == 0) {
            k = false
        } else {
            k = true;
        }

    }
}
setInterval(time, 1000);

function out(arr) {
    let data = new Date();
    let textData = data.getDate() + '.' + Number(data.getMonth() + 1) + ' - ' + data.getHours() + ' : ' + data.getMinutes();
    let text = '<div class="stroke">' + textData + '<table><tr>';
    for (let i = 0; i < arr.length; i++) {
        if (i == 1) {
            text += '<td> </td><td> </td><td> </td>';
        }
        if (i == 2) {
            text += '<td> </td><td> </td><td> </td>';

        }
        if (i == 4) {
            text += '<td> </td><td> </td><td> </td>';

        }
        text += '<td>' + arr[i][2] + '</td><td>' + arr[i][1] + '</td><td>';
        for (let k = 3; k < arr[i].length; k++) {

            if (arr[i][k][1] == 'd') {

                if (arr[i][k][2] == 'py_v' | arr[i][k][4] == 'py_n') {
                    text += arr[i][k][0] + ',';
                }
            } else {

                if (Number(arr[i][k][2])) {
                    text += arr[i][k][0] + ',';
                }
            }
        }
        text = text.slice(0, -1);
        text += '</td>';
    }
    text += '</tr></table></div>';
    return text;

}