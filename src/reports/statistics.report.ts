import { TDocumentDefinitions } from "pdfmake/interfaces";
import { generateDonutChart } from "./charts/donut.chart";
import { headerSection } from "./sections/header.section";
import { generateLineChart } from "./charts/line.chart";
import { generateBarChart } from "./charts/bar.chart";
import { footerSection } from "./sections/footer.section";
import { generateBubbleChart } from "./charts/bubble.chart";

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

    const [donutChart, lineChart, barChart1, barChart2] = await
        Promise.all([
            generateDonutChart({
                entries: options.topCountries.map(({ country, customers }) => ({
                    label: country, value: customers
                })),
                position: 'left'
            }),
            generateLineChart(),
            generateBarChart(),
            generateBubbleChart()]
        );

    const docDefinition: TDocumentDefinitions = {
        pageMargins: [40, 160, 40, 60], // Izquierda, Arriba, Derecha, Abajo
        header: headerSection({
            showLogo: true, showDate: true,
            title: options.title ?? 'Reporte de estadísticas',
            subtitle: options.subtitle ?? 'Estas son las estadísticas',
        }),
        footer: footerSection({ mostrarNumeroPagina: true }),
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
            },
            {
                alignment: 'center',
                image: lineChart,
                width: 350,
                margin: [0, 20]
            },
            {
                columns: [
                    {
                        alignment: 'center',
                        image: barChart1,
                        width: 250,
                    },
                    {
                        alignment: 'center',
                        image: barChart2,
                        width: 250,
                    }
                ]
            },
        ],
    };
    return docDefinition;
};
