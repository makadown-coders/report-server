import { TDocumentDefinitions } from "pdfmake/interfaces";

import { generateDonutChart } from "./charts/donut.chart";

interface TopCountry {
    country: string;
    customers: number;
}

interface ReportOptions {
    title?: string;
    subtitle?: string;
    topCountries: TopCountry[];
}

export const getStatisticsReport = async (
    options: ReportOptions,
): Promise<TDocumentDefinitions> => {

    const donutChart = await generateDonutChart({
        entries: options.topCountries.map(({ country, customers }) => ({
            label: country, value: customers
        })),
        position: 'left'
    });

    const docDefinition: TDocumentDefinitions = {
        content: [
            {
                columns: [
                    {
                        stack: [
                            {
                                text: 'Top de 10 insumos mas solicitados',
                                alignment: 'center',
                                margin: [0, 0, 0, 20], // Izquierda, Arriba, Derecha, Abajo
                            },
                            {
                                image: donutChart,
                                width: 300,
                            },
                        ]
                    },
                    {
                        layout: 'lightHorizontalLines',
                        width: 'auto',
                        table: {
                            headerRows: 1,
                            widths: [100, 'auto'],
                            body: [
                                ['Insumo', 'Descripcion'],
                                ...options.topCountries.map(({ country, customers }) => [country, customers]),
                            ]
                        }
                    }
                ],
            }
        ],
    };
    return docDefinition;
};
