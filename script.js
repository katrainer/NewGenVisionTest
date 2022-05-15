//Способы:
//1. Отправляем запрос на сервер с необходимыми параметрами и показываем ответ
//2. Каждый раз делать перебор. Сложность O(N)
//2. Перед первой фильтрацией разделить массив на 4 массива в зависимости от наличия значения с null.
// Сложность первой фильтрации: лучшего случая O(N+1), худшего O(2N). Сложность последующих фильтраций: лучшего случая О(1), худшего О(N)

let courses = [
    {name: 'Courses in England', prices: [0, 100]},
    {name: 'Courses in Germany', prices: [500, null]},
    {name: 'Courses in Italy', prices: [100, 200]},
    {name: 'Courses in Russia', prices: [null, 400]},
    {name: 'Courses in China', prices: [50, 250]},
    {name: 'Courses in USA', prices: [200, null]},
    {name: 'Courses in Kazakhstan', prices: [56, 324]},
    {name: 'Courses in France', prices: [null, null]},
]

let requiredRange1 = [null, 200]
let requiredRange2 = [100, 350]
let requiredRange3 = [200, null]
let requiredRange4 = [null, null]


//2. Перебор
let filter = (array, requiredRange) => {
    let arr = []
    for (let i = 0; i < array.length; i++) {
        if (requiredRange[0] === null && requiredRange[1] === null) {
            if (array[i].prices[0] === null && array[i].prices[1] === null) {
                arr.push(array[i])
            }
        } else if (requiredRange[0] !== null && requiredRange[1] === null) {
            if (array[i].prices[0] !== null && array[i].prices[1] === null && array[i].prices[0] >= requiredRange[0]) {
                arr.push(array[i])
            }
        } else if (requiredRange[0] === null && requiredRange[1] !== null) {
            if (array[i].prices[0] === null && array[i].prices[1] !== null && array[i].prices[1] <= requiredRange[1]) {
                arr.push(array[i])
            }
        } else if (requiredRange[0] !== null && requiredRange[1] !== null) {
            if (array[i].prices[0] !== null && array[i].prices[1] !== null && array[i].prices[0] >= requiredRange[0] && array[i].prices[1] <= requiredRange[1]) {
                arr.push(array[i])
            }
        }
    }
    return arr
}

console.log('Перебор:')
console.log(filter(courses, requiredRange1))
console.log(filter(courses, requiredRange2))
console.log(filter(courses, requiredRange3))
console.log(filter(courses, requiredRange4))


//3. Предварительная сортировка
let arrNullStart = []
let arrNullEnd = []
let arrNull = []
let arr = []
for (let i = 0; i < courses.length; i++) {
    courses[i].prices[0] == null && courses[i].prices[1] == null ? arrNull.push(courses[i])
        : courses[i].prices[0] == null && courses[i].prices[1] != null ? arrNullStart.push(courses[i])
            : courses[i].prices[0] != null && courses[i].prices[1] == null ? arrNullEnd.push(courses[i])
                : arr.push(courses[i])
}

filter = (requiredRange) => {
    return requiredRange[0] === null && requiredRange[1] === null ? arrNull
        : requiredRange[0] === null && requiredRange[1] !== null ? arrNullStart.filter(a => a.prices[1] <= requiredRange[1])
            : requiredRange[0] !== null && requiredRange[1] === null ? arrNullEnd.filter(a => a.prices[0] >= requiredRange[0])
                : arr.filter(a => a.prices[0] >= requiredRange[0] && a.prices[1] <= requiredRange[1])
}

console.log('Предварительная сортировка:')
console.log(filter(requiredRange1))
console.log(filter(requiredRange2))
console.log(filter(requiredRange3))
console.log(filter(requiredRange4))
