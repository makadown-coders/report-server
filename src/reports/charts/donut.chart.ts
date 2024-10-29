import * as Utils from '../../helpers/chart-utils';

interface DonutEntry {
    label: string
    value: number;
}

interface DonutOptions {
    position?: 'left' | 'right' | 'top' | 'bottom';
    entries: DonutEntry[];
}

export const generateDonutChart = async (options: DonutOptions): Promise<string> => {

    const { position = 'top' } = options;

    const data = {
        labels: options.entries.map((entry) => entry.label),
        datasets: [
            {
                label: 'Set de datos 1',
                data: options.entries.map((entry) => entry.value),
                backgroundColor: Object.values(Utils.CHART_COLORS),
            },
        ],
    };

    const config = {
        type: 'doughnut',
        data: data,
        options: {
            legend: {
                position: position,
            },
            /*title: {
               text: 'Insumos Doughnut Chart',
               display: true
            },*/
            plugins: {
                datalabels: {
                    color: 'white',
                }
            }
        },
    }
    return Utils.chartJSToImage(config);
}