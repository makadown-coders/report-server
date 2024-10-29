import * as Utils from '../../helpers/chart-utils';

export const generateLineChart = async () => {
    const data = {
        labels: Utils.months({ count: 7 }),
        datasets: [
            {
                label: 'Inventario Insumos',
                data: Utils.numbers({ count: 6, min: -100, max: 100 }),
                borderColor: Utils.CHART_COLORS[0],
                backgroundColor: Utils.transparentize(Utils.NAMED_COLORS.blue, 0.5),
                pointStyle: 'circle',
                pointRadius: 5,
               // fill: false,
            },
        /*    {
                label: 'Dataset 2',
                data: Utils.numbers({ count: 7 }),
                borderColor: Utils.CHART_COLORS[1],
              //  fill: false,
            },
            {
                label: 'Dataset 3',
                data: Utils.numbers({ count: 7 }),
                borderColor: Utils.CHART_COLORS[2], 
              //  fill: false,
            },*/
        ],
    };  

    const config = {
        type: 'line',
        data: data,
    };

    return Utils.chartJSToImage(config, { width: 600, height: 300 });
};
