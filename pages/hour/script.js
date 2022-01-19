let container = document.querySelector('.container');
function go(data){
    let xht = new XMLHttpRequest();
   
    xht.onreadystatechange = function () {
         if (this.readyState == 4 && this.status == 200) {
             func(this.responseText);
         }
    }
    if(data == 1){
         xht.open("GET", "http://qwertyfour.zzz.com.ua/php/phpFileGet.php?act=1", true);
    }
    if(data == 3){
         let docTextTime = document.getElementById('text');
         let res = docTextTime.value.split('_');
         xht.open("GET", "http://qwertyfour.zzz.com.ua/php/phpFileGet.php?act=3&data=" + res[0] + "&time=" + res[1], true);
       
    }
    if(data == 4){
         let docTextTime = document.getElementById('text');
         let res = docTextTime.value;
         let check = document.getElementById('check');
         xht.open("GET", "http://qwertyfour.zzz.com.ua/php/phpFileGet.php?act=4&data=" + res, true);
       
    }
    if(data == 5){
         
         let dat = new Date();
         let day = dat.getDate();
         let month = dat.getMonth() + 1;
         let year = dat.getFullYear();
         if (day < 10) {
             day = '0' + day;
         }
         if (month < 10) {
             month = '0' + month;
         }
         
         let res = day + "." + month + "." + year;

         xht.open("GET", "http://qwertyfour.zzz.com.ua/php/phpFileGet.php?act=4&data=" + res, true);
         let docTextTime = document.getElementById('text');
         docTextTime.value = res;
       
    }
    xht.send();
}




function func(data) {
    //console.log(data);
    Arr = JSON.parse(data);
    //console.log(Arr);




    let Arr2 = [];
    for(let i = 0; i < Arr.length; i++){
        Arr2[i] = arrOffAes(Arr[i]);
    }




    let Arr3 = [];
    for(let i = 0; i < Arr2.length; i++){
        Arr3[i] = arrTes(Arr2[i]);
    }



    //console.log(Arr2);
    console.log(Arr3);
    //Arr = arrOffAes(Arr);
    //Arr = arrTes(Arr);
    

    container.innerHTML = out(Arr3);
}

//go(4);

function arrOffAes(arr){
    let ar = [];
    for(let i = 4; i <arr.length;i++){
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

function out(arr){
    let text = '<table>';

    text += '<tr class="tableName">';
    if(check.checked == true){
         text += '<td class="hour">Год.</td>';
    }
    text += '<td colspan="3">ЛуТЕС</td>';
    text += '<td> </td><td> </td><td> </td>';
    text += '<td colspan="3">СлТЕС</td>';
    text += '<td> </td><td> </td><td> </td>';
    text += '<td colspan="3">ВугТЕС</td>';
    text += '<td colspan="3">КуТЕС</td>';
    text += '<td> </td><td> </td><td> </td>';
    text += '<td colspan="3">КрТЕС</td>';
    text += '<td colspan="3">ПдТЕС</td>';
    text += '<td colspan="3">ЗаТЕС</td>';
    text += '<td colspan="3">ЗмТЕС</td>';
    text += '<td colspan="3">ТрТЕС</td>';
    text += '<td colspan="3">ЛадТЕС</td>';
    text += '<td colspan="3">БуТЕС</td>';
    text += '<td colspan="3">ДобТЕС</td>';
    text += '</tr>';

    for(let iHour = 0; iHour < arr.length; iHour++){
        let time = (iHour + 1) * 1;
       
        text += '<tr>';
        if(check.checked == true){
            text += '<td class="hour">' + time + '</td>';
        }
        for(let i = 0; i < arr[iHour].length; i++){
           
            
            if(i == 1){
                text += '<td> </td><td> </td><td> </td>';
            }
            if(i == 2){
                text += '<td> </td><td> </td><td> </td>';
            
            }
            if(i == 4){
                text += '<td> </td><td> </td><td> </td>';
            
            }
            text += '<td>'+ arr[iHour][i][2] + '</td><td>';
            if(Number(arr[iHour][i][1])){


                    if(arr[iHour][i][2] == 0){
                        text += 0  + '</td><td>';
                    }
                    else{
                          text += arr[iHour][i][1]  + '</td><td>';
                    }


               
            }else{
                let sp = arr[iHour][i][1].split('+');
                text += Number(sp[1]) + Number(sp[0])  + '</td><td>';
            }


            if(arr[iHour][i][2] == 0){
                text += 0  + '</td>';
            }
            else{
                 



                for(let k = 3; k < arr[iHour][i].length; k++){       
                    if(arr[iHour][i][k][1] == 'd'){
                        if(arr[iHour][i][k][2] == 'py_v' && arr[iHour][i][k][4] != 'py_n'){
                            text += arr[iHour][i][k][0] + 'A,';
                        }
                        if(arr[iHour][i][k][2] != 'py_v' && arr[iHour][i][k][4] == 'py_n'){
                            text += arr[iHour][i][k][0] + 'Б,';
                        }
                        if(arr[iHour][i][k][2] == 'py_v' && arr[iHour][i][k][4] == 'py_n'){
                        text += arr[iHour][i][k][0] + ',';
                        }
                    }else{
              
                        if(Number(arr[iHour][i][k][2])){
                            text += arr[iHour][i][k][0] + ',';
                        }
                    }
                }
       
                text = text.slice(0, -1)
            }
            text += '</td>';
        }
        text += '</tr>';
    }
    text += '</table>';
    return text;

}									