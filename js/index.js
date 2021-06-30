// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

const minWeightSort = document.querySelector('.minweight__input'); // нижняя граница фильтрации

const maxWeightSort = document.querySelector('.maxweight__input'); // верхняя граница фильтрации

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits

  fruitsList.innerHTML = '';

  for (let i = 0; i < fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild

    //создаем новый элемент li
    let li = document.createElement(`li`);

    // создаем новый элемент div с классом fruit__info
    let fruitInfo = document.createElement(`div`);
    //добавляем класс к новому элементу div
    fruitInfo.classList.add(`fruit__info`);

    // создаем новый элемент div index0
    let index0 = document.createElement(`div`);

    // создаем новый элемент div kind_0
    let kind0 = document.createElement(`div`);

    let color0 = document.createElement(`div`);

    let weight0 = document.createElement(`div`);

    //Заполняем divs текстом://

    index0.textContent = `index: ${i}`;
    kind0.textContent = `kind: ${fruits[i].kind}`;
    color0.textContent = `color: ${fruits[i].color}`;
    weight0.textContent = `weight: ${fruits[i].weight}`;

    //добавляем  div/li/ul
    fruitInfo.appendChild(index0);
    fruitInfo.appendChild(kind0);
    fruitInfo.appendChild(color0);
    fruitInfo.appendChild(weight0);

    li.appendChild(fruitInfo);
    fruitsList.appendChild(li);

    switch (fruits[i].color) {
      case 'фиолетовый':
        li.classList = `fruit__item fruit_violet`;
        break;
      case 'зеленый':
        li.classList = `fruit__item fruit_green`;
        break;
      case 'розово-красный':
        li.classList = `fruit__item fruit_carmazin`;
        break;
      case 'желтый':
        li.classList = `fruit__item fruit_yellow`;
        break;
      case 'светло-коричневый':
        li.classList = `fruit__item fruit_lightbrown`;
        break;
    }
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];

  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {
    // TODO: допишите функцию перемешивания массива
    //
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
    let random = getRandomInt(0, fruits.length - 1);
    let elem = fruits.splice(random, 1)[0];

    result.push(elem);
  }

  fruits = result;
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  let itemFilter = fruits.filter((item) => {
    // TODO: допишите функцию
    return item.weight >= minWeightSort.value && item.weight <= maxWeightSort.value;
  });
  fruits = itemFilter;
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
};

const comparation = (fruits1, fruits2) => {
  return fruits1.color === 'светло-коричневый' ? true : false;
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком
    const n = arr.length;
    // внешняя итерация по элементам
    for (let i = 0; i < n - 1; i++) {
      // внутренняя итерация для перестановки элемента в конец массива
      for (let j = 0; j < n - 1 - i; j++) {
        // сравниваем элементы
        if (comparation(arr[j], arr[j + 1])) {
          // делаем обмен элементов
          let temp = arr[j + 1];
          arr[j + 1] = arr[j];
          arr[j] = temp;
        }
      }
    }
    bubbleSort(fruits, comparation);
  },

  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  display();
});
