function go() {
    let xht = new XMLHttpRequest();
    docBuTes = document.getElementById('buTes');
    docCE = document.getElementById('CE');
    docTets = document.getElementById('Tets');
    xht.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            func(this.responseText);
        }
    }

    xht.open("GET", "http://qwertyfour.zzz.com.ua/php/phpTest.php?act=5", true);


    xht.send();

}


go();


let doc = document.getElementById('main');
let docSum = document.getElementById('sum');
function func(data) {
    fullArr = JSON.parse(data);
    let arrNorm = normArr(fullArr);
    console.log(docBuTes.checked);
    if (docBuTes.checked == false) {
        arrNorm = arrOffButes(arrNorm);
        console.log('ccc');
    }
    if (docCE.checked) {
        arrNorm = arrCE(arrNorm);

    }
    let maximum = max(arrNorm);
    bubbleSort(arrNorm);
    doc.innerHTML = out(maximum, arrNorm);
    docSum.innerHTML = 'Потужність ТЕС та ТЕЦ: <b>' + sum(arrNorm) + '</b>';


}

function normArr(arr) {                      //Робить зручний масів для роботи
    let arrN = [];
    for (let i = 4; i < 19; i++) {
        arrN[i - 4] = arr[i];
    }
    return arrN;

}

function arrOffButes(arr) {                               //робить масів без БуТЕС
    let ar = [];
    for (let i = 0, k = 0; i < arr.length; i++, k++) {
        if (i == 13) {
            k = k - 1;
            continue
        } else {
            ar[k] = arr[i];
        }

    }
    return ar;
}

function arrCE(arr) {
    let ar = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][0] == 'ВугТЕС' || arr[i][0] == 'ЗмТЕС' || arr[i][0] == 'ТрТЕС') {
            ar.push(arr[i]);
        }
    }
    return ar;
}

function max(arr) {                                //Шукає макстмальну потужність
    let maxi = 0;
    for (let i = 0; i < arr.length - 1; i++) {


        if (Number(arr[i][2]) > maxi) {
            maxi = Number(arr[i][2]);
        }
    }
    return maxi;
}
function out(max, arr) {                              //Робить готову строку html на основі масіва та максимального значення
    let koef = 100 / max;

    let text = '<div class="container">';
    for (let i = 0; i < arr.length; i++) {
        text += '<div class="unit"><div class="name">' + arr[i][0] + '</div><div class="power">' + arr[i][2] + '</div><div class="contScall"><div class="scall" style="width: ' + arr[i][2] * koef + '%"></div></div></div>';

    }
    text += '</div>';
    return text;
}

function bubbleSort(arr) {                                     //Сортує масів по потужності
    for (let i = 0; i < arr.length; i++) {
        let wasSwap = false;
        for (let j = 0; j < arr.length - 1; j++) {
            if (Number(arr[j][2]) < Number(arr[j + 1][2])) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                wasSwap = true;
            }
        }
        if (!wasSwap) break;
    }
    return arr;
};

function sum(arr) {                                       //Загальна сума потужності
    let summ = 0;
    for (let i = 0; i < arr.length; i++) {
        summ += Number(arr[i][2]);
    }
    return summ;
}




