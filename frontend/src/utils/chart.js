import * as echarts from 'echarts'

let myChart = null
const createChart = (state_name,drvalone,carpool,pubtrans,others) => {
    // if (myChart) {
    //     myChart.dispose();//销毁
    // }
    myChart = echarts.init(document.getElementById('chart-container'));
    const option = {
        title: {
            text: `methods to work`,
            subtext: `in ${state_name}`,
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            bottom:0
        },
        series: [
            {
                name: 'methods to work',
                type: 'pie',
                radius: '50%',
                bottom:50,
                label:false,
                data: [
                    {value: drvalone, name: 'drive alone'},
                    {value: carpool, name: 'carpool'},
                    {value: pubtrans, name: 'public trans'},
                    {value: others, name: 'others'},
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    option && myChart.setOption(option);

    return myChart
}
export default {
    myChart,
    createChart
}
