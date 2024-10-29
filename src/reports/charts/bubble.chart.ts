import { text } from 'stream/consumers';
import * as Utils from '../../helpers/chart-utils';
import { max } from 'rxjs';

export const generateBubbleChart = async () => {

    // generate random array of random data
    const generateRandomData = (count: number, min: number, max: number) => {
        const data = [];
        for (let i = 0; i < count; i++) {
            data.push({
                x: Math.random() * (max - min) + min,
                y: Math.random() * (max - min) + min,
                r: Math.random() * (max - min) + min,
            });
        }
        return data;
    };

    const randomData = generateRandomData(7, 0, 15);

    const data = {
        datasets: [
            {
                label: 'Dataset 1',
                data: randomData,
                borderColor: Utils.NAMED_COLORS.red,
                backgroundColor: Utils.transparentize(Utils.NAMED_COLORS.red, 0.5),
            },
            {
                label: 'Dataset 2',
                data: generateRandomData(7, -10, 10),
                borderColor: Utils.NAMED_COLORS.blue,
                backgroundColor: Utils.transparentize(Utils.NAMED_COLORS.blue, 0.5),
            },
        ],
    };

    const config = {
        type: 'bubble',
        data: data,
    };

    return Utils.chartJSToImage(config);
}
