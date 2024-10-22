import { Content, StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces";
import { DateFormatter } from "src/helpers";
import { footerSection } from "./sections/footer.section";

const logo: Content = {
    image: 'src/assets/imssb-banner.png',
    width: 200,
    height: 80,
    margin: [40,40],
}

const styles: StyleDictionary = {
    header: {
        fontSize: 20,
        bold: true,
        margin: [0, 60, 0, 0],
    },
    subHeader : {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5],
    }
}

export const orderByIdReport = (): TDocumentDefinitions => {
    return {
        styles: styles,
        header: logo,
        pageMargins: [40, 60, 40, 60],
        footer: footerSection({ mostrarNumeroPagina: true }),
        content: [
            // Encabezado
            {
                text: 'IMSS Bienestar',
                style: 'header',
            },
            // Direccion y demás info
            {
                columns: [
                    {
                        text: 'Gustavo E Campa 54, \nGuadalupe Inn, Alvaro Obregon 01020, Ciudad de México\nRFC: SSI220901JS5\nhttps://www.imssbienestar.gob.mx/',
                    },
                    {
                        text: [
                            { text: 'Documento No. #123456\n', bold: true },
                            `Fecha: ${DateFormatter.getDDMMMMYYYY(new Date())}\nVencimiento: ${DateFormatter.getDDMMMMYYYY(new Date())}\n`
                        ],
                        alignment: 'right',
                    }
                ]
            },
            {
                qr: 'https://www.imssbienestar.gob.mx/',
                fit: 75,
                alignment: 'right'
            },

            // Direccion de almacén
            {
                text: [
                    { text: 'Dirigido a\n', style: 'subHeader' },
                    `Almacén Zona Mexicali\nCalle Ignacio Zaragoza S/N, Col. Ejido Puebla,\nC.P. 21620, Mexicali B.C.\n`
                ]
            }
        ],
    }
}