import { Content, StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces";
import { DateFormatter } from "src/helpers";

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
}

export const orderByIdReport = (): TDocumentDefinitions => {
    return {
        styles: styles,
        header: logo,
        pageMargins: [40, 60, 40, 60],
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
                        text: `Documento No. #123456\nFecha: ${DateFormatter.getDDMMMMYYYY(new Date())}\nVencimiento: ${DateFormatter.getDDMMMMYYYY(new Date())}\n`,
                        alignment: 'right',
                    }
                ]
            },
            {
                qr: 'https://www.imssbienestar.gob.mx/',
                fit: 75,
                alignment: 'right'
            }
        ],
    }
}