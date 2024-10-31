import { TDocumentDefinitions } from "pdfmake/interfaces";

export const generateCustomSizeReport = (): TDocumentDefinitions => {
    const docDefinition: TDocumentDefinitions = {
        pageSize: {
            width: 150,
            height: 250,
        },
        content: [
            {
                qr: 'https://imssbienestar.gob.mx',
                fit: 100,
                alignment: 'center',
            },
            {
                text: 'Reporte con tamaño personalizado',
                fontSize: 10,
                alignment: 'center',
                margin: [0, 20],
            }
        ],
    };
    return docDefinition;
}