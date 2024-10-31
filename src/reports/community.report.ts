import { TDocumentDefinitions } from "pdfmake/interfaces";

export const generateCommunityReport = (): TDocumentDefinitions => {
    const docDefinition: TDocumentDefinitions = {
        defaultStyle: {
            fontSize: 10,
        },
        content: [
            // Logo - Dirección - Número de orden
            {
                columns: [
                    {
                        image: 'src/assets/imssb-logo.jpg',
                        width: 50
                    },
                    {
                        alignment: 'center',
                        text: `IMSS-BIENESTAR\nGustavo E Campa 54, \nGuadalupe Inn, Alvaro Obregon 01020, Ciudad de México\nRFC: SSI220901JS5\nhttps://www.imssbienestar.gob.mx/`,
                    },
                    {
                        alignment: 'right',
                        width: 140,
                        layout: 'borderBlue',
                        table: {
                            body: [
                                [
                                    {
                                        layout: 'noBorders',
                                        table: {
                                            body: [
                                                ['No. Fac:', '123-456'],
                                                ['Fecha:', '2024-09-01'],
                                                ['Versión:', '2024-01'],
                                            ]
                                        }
                                    }
                                ]
                            ]
                        }
                    }
                ]
            },
            // Linea horizontal
            {
                margin: [0, 5],
                canvas: [
                    { 
                        type: 'line', 
                        x1: 0, 
                        y1: 5, 
                        x2: 515, 
                        y2: 5, 
                        lineWidth: 2,
                        lineColor: '#2E8B57'
                    }
                ]
            },
            // Detalle de cliente
            {
                table: {
                    widths: ['auto', '*', 'auto', '*'],
                    body: [
                        [
                            {
                                text: 'Datos del cliente',
                                fillColor: '#2E8B57',
                                color: 'white',
                                colSpan: 4,
                                bold: true,
                                // border: [false, false, false, true],
                            },
                            {},
                            {},
                            {},
                        ],
                        // Razón social
                        [
                            {
                                text: 'Razón social',
                                fillColor: '#006341',
                                color: 'white',
                                bold: true,
                                border: [true, true, false, false],
                            },
                            {
                                text: 'Nombre de cliente',
                                fillColor: '#FFFFFF',
                                color: 'black',
                                border: [false, true, false, false],
                            },
                            {
                                text: 'Dirección',
                                fillColor: '#006341',
                                color: 'white',
                                border: [false, true, false, false],
                            },
                            {
                                text: 'Calle false 123',
                                fillColor: '#FFFFFF',
                                color: 'black',
                                border: [false, false, true, false],
                            },
                        ],
                        [
                            {
                                text: 'Rut',
                                fillColor: '#006341',
                                color: 'white',
                                bold: true,
                                border: [true, false, false, false],
                            },
                            {
                                text: '',
                                fillColor: '#FFFFFF',
                                color: 'black',
                                border: [false, false, false, false],
                            },
                            {
                                text: 'Teléfono',
                                fillColor: '#006341',
                                color: 'white',
                                border: [false, false, false, false],
                            },
                            {
                                text: '',
                                fillColor: '#FFFFFF',
                                color: 'black',
                                border: [false, false, true, false],
                            },
                        ],
                        [
                            {
                                text: 'Giro',
                                fillColor: '#006341',
                                color: 'white',
                                bold: true,
                                border: [true, false, false, false],
                            },
                            {
                                text: '',
                                fillColor: '#FFFFFF',
                                color: 'black',
                                border: [false, false, false, false],
                            },
                            {
                                text: 'Condición de pago',
                                fillColor: '#006341',
                                color: 'white',
                                border: [false, false, false, false],
                            },
                            {
                                text: '',
                                fillColor: '#FFFFFF',
                                color: 'black',
                                border: [false, false, true, false],
                            },
                        ]
                    ]
                }
            }
        ],
    };
    return docDefinition;
}

export const generateRemisionReport = (): TDocumentDefinitions => {
    const docDefinition: TDocumentDefinitions = {
        content: [
            {
                text: 'SERVICIOS DE SALUD IMSS-BIENESTAR',
                style: 'header'
            },
            {
                text: 'ORDEN DE REMISIÓN',
                style: 'subheader'
            },
            {
                columns: [
                    {
                        width: '*',
                        text: [
                            { text: 'Institución requirente: ', bold: true },
                            'Instituto Mexicano del Seguro Social para el Bienestar\n',
                            { text: 'CLUES: ', bold: true },
                            'BCSSA090013 - Hospital General Tijuana - Baja California'
                        ]
                    }
                ]
            },
            {
                style: 'tableExample',
                table: {
                    widths: ['*', '*'],
                    body: [
                        [
                            { text: 'Número de Orden de Remisión:', bold: true },
                            '893376772'
                        ],
                        [
                            { text: 'Número de Orden de Suministro:', bold: true },
                            'IMB-02-02-2024-02128241-SADM'
                        ]
                    ]
                },
                layout: 'noBorders'
            },
            {
                columns: [
                    {
                        width: '50%',
                        stack: [
                            { text: 'PROVEEDOR', bold: true },
                            {
                                columns: [
                                    { width: 'auto', text: 'RFC:', bold: true },
                                    { width: '*', text: 'SMS200716NZ4' }
                                ]
                            },
                            {
                                columns: [
                                    { width: 'auto', text: 'Razón Social:', bold: true },
                                    { width: '*', text: 'SACO MEDICAL SERVICE, S.A. DE C.V.' }
                                ]
                            }
                        ]
                    },
                    {
                        width: '50%',
                        stack: [
                            { text: 'DATOS DE ENTREGA', bold: true },
                            {
                                columns: [
                                    { width: 'auto', text: 'Fecha expedición de la orden:', bold: true },
                                    { width: '*', text: '26/04/2024' }
                                ]
                            },
                            {
                                columns: [
                                    { width: 'auto', text: 'Fecha de entrega:', bold: true },
                                    { width: '*', text: '26/07/2024 10:00' }
                                ]
                            },
                            {
                                columns: [
                                    { width: 'auto', text: 'Almacén entrega:', bold: true },
                                    { width: '*', text: 'Para entrega a CLUES o destino final.' }
                                ]
                            },
                            {
                                columns: [
                                    { width: 'auto', text: 'Dirección destino final (CLUES):', bold: true },
                                    { width: '*', text: 'Avenida Centenario N10851, Col. Zona Río C.P. 22000, Tijuana, B.C.' }
                                ]
                            },
                            {
                                columns: [
                                    { width: 'auto', text: 'Entidad destino final (CLUES):', bold: true },
                                    { width: '*', text: 'Baja California' }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                text: '\n',
            },
            {
                style: 'tableExample',
                table: {
                    headerRows: 1,
                    widths: [30, 90, '*', 40, 40],
                    body: [
                        [
                            { text: 'ITEM', style: 'tableHeader' },
                            { text: 'CLAVE INSUMO', style: 'tableHeader' },
                            { text: 'DESCRIPCIÓN', style: 'tableHeader' },
                            { text: 'CANTIDAD SOLICITADA', style: 'tableHeader' },
                            { text: 'CANTIDAD A ENTREGAR', style: 'tableHeader' }
                        ],
                        ['1', '010.000.4343.00', 'Idarubicina/Solución Inyectable...', '9', '9']
                    ]
                }
            },
            {
                text: '\n'
            },
            {
                style: 'tableExample',
                table: {
                    widths: [60, 60, 60, 60, 60, 60],
                    body: [
                        [
                            { text: 'LOTE', style: 'tableHeader' },
                            { text: 'FECHA CADUCIDAD', style: 'tableHeader' },
                            { text: 'FECHA FABRICACIÓN', style: 'tableHeader' },
                            { text: 'PESO ENVASE COLECTIVO', style: 'tableHeader' },
                            { text: 'DIMENSIONES DE ENVASE COLECTIVO', style: 'tableHeader' },
                            { text: 'UNIDADES POR ENVASE COLECTIVO', style: 'tableHeader' }
                        ],
                        ['142023', '12/03/26', '12/03/24', '2', '32.0 x 29.0 x 29.0', '750']
                    ]
                }
            }
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                alignment: 'center',
                margin: [0, 0, 0, 10]
            },
            subheader: {
                fontSize: 16,
                bold: true,
                alignment: 'center',
                margin: [0, 10, 0, 5]
            },
            tableHeader: {
                bold: true,
                fontSize: 12,
                color: 'black',
                fillColor: '#eeeeee'
            },
            tableExample: {
                margin: [0, 5, 0, 15]
            }
        }
    };

    return docDefinition;
}
