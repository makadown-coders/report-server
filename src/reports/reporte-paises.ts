import { TDocumentDefinitions } from "pdfmake/interfaces";
import { headerSection } from "./sections/header.section";
import { countries as Pais} from "@prisma/client";

interface ReportOptions {
    title?: string;
    subtitle?: string;
    paises: Pais[];
}

export const getReportePaises = (options: ReportOptions): TDocumentDefinitions => {

    const { title, subtitle, paises } = options;

    const docDefinition: TDocumentDefinitions = {
        pageOrientation: 'landscape',
        header: headerSection({
            showLogo: true,
            title: title ?? 'Reporte de paises',
            subtitle: subtitle ?? 'Estos son los paises',
            showDate: true
        }),
        pageMargins: [40, 150, 40, 40],
        content: [
            {
                layout: 'lightHorizontalLines', // optional
                table: {
                    // headers are automatically repeated if the table spans over multiple pages
                    // you can declare how many rows should be treated as headers
                    headerRows: 1,
                    widths: [50, 50, 50, '*', '*', '*'],
                    body: [
                        ['ID', 'ISO2', 'ISO3', 'Name', 'Continent', 'Local Name'],
                        ...paises.map(pais => [
                             pais.id.toString(),
                             pais.iso2,
                             pais.iso3,
                            { text: `${pais.name}`, bold: true },
                             pais.continent,
                             pais.local_name])
                    ]
                }
            },
        ],
    };

    return docDefinition;
}