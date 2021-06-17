require('chart.js')


export function CreatePieChart(array){
    
    let Countries = []
    let Data = []

    const data = {
        labels: Countries,
        datasets: [{
            label: 'My First Dataset',
            data: Data,
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(215, 205, 86)',
                'rgb(196, 132, 148)',
                'rgb(249, 52, 89)',
                'rgb(140, 216, 48)',
                'rgb(61, 144, 180)',
                'rgb(208, 140, 215)',
                'rgb(222, 207, 6)',
                'rgb(157, 237, 242)',
                'rgb(85, 7, 118)'
            ],
            hoverOffset: 4
        }]
    };

    const config = {
        type: 'pie',
        data: data,
    };

    let countriesArr = []
    let count = {};
    array.forEach(teacher => {
        countriesArr.push(teacher.country)
        if (!Countries.includes(teacher.country)){
            Countries.push(teacher.country);
        }
    });
    countriesArr.forEach(function(i) { count[i] = (count[i]||0) + 1;});
    let dataCount = Object.values(count)
    dataCount.forEach(element => {
        Data.push(element)
    });
    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
    console.log(array)
    console.log('<-----TASK2----->')
    console.log('CREATING PIE CHART')
    console.log(Countries)
    console.log(Data)
}
