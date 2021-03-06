
/** ******** Your code here! *********** */

const arr = 
    `Специфіка предмета формальної логіки
Характеристика форм емпіричного пізнання дійсності
Загальна природа форм абстрактного мислення
Істинність думки
Формальна правильність міркувань
Соціальне призначення і функції логіки
Роль логіки у формуванні інтелектуальної культури людини
Основні види логічних помилок: паралогізми, софізми, парадокси
Значення логіки для інженерної діяльності
Характеристика поняття як форми мислення
Генезис понять
Функції понять
Структура понять: обсяг і зміст поняття
Закон зворотного відношення між обсягом і змістом понять
Поняття і слово
Теорія іменування в логіці
Види понять за кількістю елементів обсягу
Види понять за природою елементів обсягу
Види понять за типом елементів обсягу
Види понять за природою ознак, які становлять зміст поняття
Природа основних видів відношень сумісності між поняттями
Природа основних видів відношень несумісності між поняттями
Обмеження і узагальнення понять
Операція визначення понять
Операція розподілу понять
Класифікація та її види
Загальна природа судження як форми мислення
Структура і основні види простих суджень
Специфіка реляційних суджень
Алетичні модальні судження
Епістемічні модальні судження
Деонтичні модальні судження
Аксіологічні модальні судження
Темпоральні модальні судження
Відношення між простими атрибутивними судженнями (за логічним квадратом)
Відношення підкорення (за логічним квадратом)
Відношення контрарності між судженнями (за логічним квадратом)
Відношення субконтрарності між судженнями (за логічним квадратом)
Відношення суперечності між судженнями (за логічним квадратом)
Відношення між простими реляційними судженнями
Відношення між складними судженнями
Логічні операції над судженнями
Складні судження та їх види
Логічна природа кон’юнкції
Логічна характеристика диз’юнкції
Логічна природа сильної диз’юнкції
Логічна природа і парадокс матеріальної імплікації
Логічна природа еквіваленції
Логічна природа заперечення
Табличне визначення логічних сполучників
Квантор загальності
Квантор існування
Модальність суджень та її види
Алетична модальність суджень
Деонтична модальність суджень
Часова модальність суджень
Модальність дії в судженнях
Аксіологічна модальність суджень
Аксіологічна модальність суджень
Модальність переваги в судженнях
Епістемічна модальність суджень
Істиннісна модальність суджень
Природа логічних правил
Специфіка логічних законів
Закон тотожності
Закон несуперечності
Закон виключеного третього
Закон достатньої підстави
Загальна природа умовиводу як форми мислення
Основні види умовиводів
Безпосередні і опосередковані умовиводи
Логічна природа дедукції
Логічна природа простого категоричного силогізму
Структура простого категоричного силогізму
Фігури і модуси простого категоричного силогізму
Природа логічно правильних модусів простого категоричного силогізму
Полісилогізм
Скорочено-розподільний силогізм (ентимема)
Епіхейрема
Сорити (складно-скорочені силогізми)
Силогізми за логічним квадратом
Імплікативний (умовний) силогізм
Умовно-категоричний силогізм
Фігури умовно-категоричного силогізму
Суто розділовий умовивід
Розділово-категоричний умовивід
Розділово-умовний умовивід
Природа, схеми і види дилем
Логічне розуміння індукції
Роль індукції у пізнанні
Повна індукція та її структура
Неповна індукція та її структура
Гіпотеза та її роль у логічному пізнанні
Логічна природа аналогії як традуктивного умовиводу
Аналогія відношень
Аналогія речей
Структура доведення
Безпосереднє (пряме) доведення
Опосередковане доведення
Правила доведення на підставі закону тотожності
Правила доведення на підставі закону заборони суперечності
Правила доведення на підставі закону достатньої підстави
Спростування та його роль у пізнанні
Логічна структура спростування
Способи і правила спростування
Безпосереднє (пряме) спростування
Опосередковане спростування
Спростування щодо тези
Спростування щодо аргументів
Спростування щодо зв’язку тези з аргументами (демонстрації)
Логічні помилки у доведенні і спростуванні щодо тези та аргументів`


const arr2 = arr.split('\n');

arr3 = []

arr2.forEach(element => {
    arr3.push(element)
});

console.log(arr3.sort())
