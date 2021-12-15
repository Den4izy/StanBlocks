<?php

header('Access-Control-Allow-Origin: *');

$arrBlocksFull = array( 
	array("РАЕС", 4 ),
	array("ЗАЕС", 6),
	array("ЮУАЕС", 3),
	array("ХАЕС", 2),
	array("ЛуТЕС", 6),
	array("СлТЕС", 2),
	array("ВугТЕС", 7),
	array("КуТЕС", 7),
	array("КрТЕС", 8),
	array("ПдТЕС", 5),
	array("ЗаТЕС", 6),
	array("ЗмТЕС", 10),
	array("ХТЕЦ-5", 4),
	array("ТрТЕС", 6),
	array("КТЕЦ-5", 4),
	array("КТЕЦ-6", 2),
	array("ЛадТЕС", 6),
	array("БуТЕС", 12),
	array("ДобТЕС", 4)
); 

$borgs=file_get_contents( "https://disp.ua.energy/Blocksf/" );
$text = iconv('WINDOWS-1251', 'UTF-8', $borgs);
function stan($station){                                      //функція з пареметром назва станції
	global $arrBlocksFull;		//Массів станцій
	global $text;
					
	for($i = 0; $i < count($arrBlocksFull);$i++){
		$pos = strripos($arrBlocksFull[$i][0], $station);
		if($pos !== false){
			$countStation = $i;
		}
	}
	$countBlocks = $arrBlocksFull[$countStation][1];     //знаходими кількість блоків
					
					
	if($station == 'ДобТЕС'){
	preg_match_all('#'.$arrBlocksFull[$countStation][0].'(.*?)<tr><td></td> <td></td>#', $text, $arrText);
	}
	else{
		preg_match_all('#'.$arrBlocksFull[$countStation][0].'(.*?)'.$arrBlocksFull[$countStation + 1][0].'#', $text, $arrText); //обрізаємо текст даної станції
	}
	$textAll = $arrText[1][0];  //записуємо в переменну
					
					


	preg_match_all('#<TD(.*?)</TD>#', $textAll, $arrForTD);                               		//ділимо масів станції на стовпчики

	$ArrStation;																				//Підготовлюєм масів
	$ArrStation[0] = $station;                                                              	//0 позиція назва станції


	preg_match_all('#class=y>(.*?)</TD>#', $arrForTD[0][0], $arrCountWork);          			//1 позиція кількість робочих блоків
	$ArrStation[1]= $arrCountWork[1][0];

	preg_match_all('#class=R>(.*?)</TD>#', $arrForTD[0][1], $arrPowerWork);						//2 позиція робоча потужність
	$ArrStation[2]= $arrPowerWork[1][0];
					

					

	for($i = 2, $k = 1; $i < count($arrForTD[0]); $k++){                                        //далі перебираємо циклом (і порядок стовпчик , к потрібно для кількості ітерацій)

						
		$arrBlock;                                                                          	//масів даних блока

		$boollEmpty = strripos($arrForTD[0][$i], 'class=n');           							//чи існує блок
		$boollMono = strripos($arrForTD[0][$i], 'class=y');										//моноблок і в роботі
		$boollDouble = strripos($arrForTD[0][$i], 'class=i');									//дубль блок

		if($boollEmpty == true){
			$i = $i + 1;																		//якщо блока не існує то пропуск ітерації
			continue;
		}

		else if($boollMono == true){                                                           	//якщо моно блок
			$arrBlock[0] = $k;                                                                  //визначаємо номер блока по номеру ітераццї
			$arrBlock[1] = 'm';                                                   				//позначаємо блок моноблоком
			preg_match_all('#class=y>(.*?)</TD>#', $arrForTD[0][$i], $arrPowerBlock);
			$arrBlock[2] = $arrPowerBlock[1][0];                                                //Визначаємо потужність блока
			$i = $i + 1;																		//переходим на наступний стовпчик
						

		}

		else if($boollDouble == true){                                                 			//якщо дубль блок
			$arrBlock[0] = $k;
			$arrBlock[1] = 'd';
			preg_match_all('#<TR><TD class=(.*?)>#', $arrForTD[0][$i], $arrKorpusA);
			$arrBlock[2] = $arrKorpusA[1][0];													//визначаємо стан корпусу А
			$i = $i + 1;

			$boollWork = strripos($arrForTD[0][$i], 'class=nn');                                //Перевіряєм чи блок в роботі
			if($boollWork == true){
				preg_match_all('#class=nn>(.*?)</TD>#', $arrForTD[0][$i], $arrPowerBlock2);
				$arrBlock[3] = $arrPowerBlock2[1][0];											//визначаємо потужність
				$i = $i + 1;
			}
			else{
				preg_match_all('#class=(.*?)>#', $arrForTD[0][$i], $arrBl);                     //якщо не в роботі то визначаємо стан
				$arrBlock[3] = $arrBl[1][0];
				$i = $i + 1;
			}

							

			preg_match_all('#class=(.*?)>#', $arrForTD[0][$i], $arrKorpusB);
			$arrBlock[4] = $arrKorpusB[1][0];                                                  	//визначаємо стан корпусу Б
			$i = $i + 1;

		}

		else{                                       											//якщо моноблок не в роботі
			$number = $k;
			$arrBlock[0] = $number;
			$arrBlock[1] = 'm';
			preg_match_all('#class=(.*?)>#', $arrForTD[0][$i], $arrPowerBlock3);
			$arrBlock[2] = $arrPowerBlock3[1][0];												//визначаємо стан блока
			$i = $i+1;
							
		}

		array_push($ArrStation, $arrBlock);                                    					//добавляємо масів даних блока до загального масіва станції

		unset($arrBlock);                            											//обнуляєм масів блока для наступної ітарації
																						//виводим загальний масів як результат ф-ї

	}
	return $ArrStation; 

				
}

function allStations2(){
	global $arrBlocksFull;
	$arr77;
	for($i = 0; $i < count($arrBlocksFull);$i++){
		$arr77[$i] = stan($arrBlocksFull[$i][0]);
	}
	return $arr77;
}


function debug_to_console2($data) {
	$output = $data;
	if (is_array($output))
		$output = implode(',', $output);
			
	echo "<script>console.log('Debug Objects: " . $output . "' );</script>";
}

if($_GET['act'] == '1'){
	echo json_encode(allStations2());
}
						
							
?>