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
                image: donutChart,
                width: 500,
            }
        ],
    };
    return docDefinition;
};
