import * as Utils from '../../helpers/chart-utils';

export const generateBarChart = async () => {
    const data = {
        labels: Utils.months({ count: 7 }),
        datasets: [
            {
                label: 'Dataset 1',
                data: Utils.numbers({ count: 7, min: -100, max: 100 }),
                borderColor: Utils.NAMED_COLORS.red,
                backgroundColor: Utils.CHART_COLORS[0],
                borderWidth: 2,
                borderRadius: Number.MAX_VALUE,
                borderSkipped: false,
            },
            {
                label: 'Dataset 2',
                data: Utils.numbers({ count: 7 }),
                backgroundColor: Utils.CHART_COLORS[1],
            },
            {
                label: 'Dataset 3',
                data: Utils.numbers({ count: 7 }),
                backgroundColor: Utils.CHART_COLORS[2],
            },
        ],
    };

    const config = {
        type: 'bar',
        data: data,
    };

    return Utils.chartJSToImage(config);
}
