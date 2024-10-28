import { TDocumentDefinitions } from "pdfmake/interfaces";
import fs from 'fs';
import * as Utils from '../helpers/chart-utils';

const svgContent = fs.readFileSync('./src/assets/ford.svg', 'utf8');

const generateChartImage = async () => {
    const chartConfig = {
        type: 'bar',                                // Show a bar chart
        data: {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
                      'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],   // Set X-axis labels
            datasets: [{
                label: 'IMSS Bienestar',                         // Create the 'Users' dataset
                data: [65, 59, 80, 81, 56, 55, 40, 55, 30, 120, 60, 50], // Add data to the chart
                backgroundColor: 'rgba(255, 99, 132, 0.2)',     // Set background color
                borderColor: 'rgb(255, 99, 132)',                // Set border color
                borderWidth: 1,                                  // Set border width
            }]
        }
    }
    return Utils.chartJSToImage(chartConfig);
}

export const getBasicChartSvgReport = async (): Promise<TDocumentDefinitions> => {
    const chart = await generateChartImage();
    return {
        content: [
           /* {
                svg: svgContent,
                width: 100,
                fit: [100, 100],
            },*/
            {
                image: chart,
                width: 500,
            }
        ]
    };
};