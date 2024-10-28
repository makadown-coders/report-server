import { Content, StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces";
import { CurrencyFormatter, DateFormatter } from "src/helpers";
import { footerSection } from "./sections/footer.section";

const logo: Content = {
    image: 'src/assets/imssb-banner.png',
    width: 200,
    height: 80,
    margin: [40, 40],
}

const styles: StyleDictionary = {
    header: {
        fontSize: 20,
        bold: true,
        margin: [0, 60, 0, 0],
    },
    subHeader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5],
    }
}

interface ReportValues {
    title?: string,
    subtitle?: string,
    data: ReportData
};

export interface ReportData {
    order_id:      number;
    customer_id:   number;
    order_date:    Date;
    customers:     Customers;
    order_details: OrderDetail[];
}

export interface Customers {
    customer_id:   number;
    customer_name: string;
    contact_name:  string;
    address:       string;
    city:          string;
    postal_code:   string;
    country:       string;
}

export interface OrderDetail {
    order_detail_id: number;
    order_id:        number;
    product_id:      number;
    quantity:        number;
    products:        Products;
}

export interface Products {
    product_id:   number;
    product_name: string;
    category_id:  number;
    unit:         string;
    price:        string;
}


export const orderByIdReport = (value: ReportValues): TDocumentDefinitions => {

    const {data} = value;

    const {order_date, order_id, customer_id, customers, order_details} = data;
    let fechaVencimiento = new Date();
    fechaVencimiento.setDate(fechaVencimiento.getDate() + 30);
    const subTotal = order_details.reduce((acc, curr) => 
        acc +  (curr.quantity * +curr.products.price), 
            0);
    const total = subTotal + (subTotal * 0.16);
    

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
                            { text: `Documento No. #${order_id}\n`, bold: true },
                            `Fecha: ${DateFormatter.getDDMMMMYYYY(order_date)}\nVencimiento: ${DateFormatter.getDDMMMMYYYY(fechaVencimiento)}\n`
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
                    { text: customers.customer_name },
                    { text: `\n${customers.address}\n${customers.city}, ${customers.postal_code}, ${customers.country}\n` },
               //     `Almacén Zona Mexicali\nCalle Ignacio Zaragoza S/N, Col. Ejido Puebla,\nC.P. 21620, Mexicali B.C.\n`
                ]
            },

            // tabla de detalle
            {
                layout: 'headerLineOnly',
                margin: [0, 20],
                table: {
                    headerRows: 1,
                    widths: [50, '*', 'auto', 'auto', 'auto'],
                    body: [
                        ['ID', 'Descripción', 'Cant.', 'Precio', 'Total'],
                        ...order_details.map(item => [
                            item.order_detail_id,
                            item.products.product_name,
                            item.quantity,
                            { 
                              text: CurrencyFormatter.formatCurrency(
                                +item.products.price
                                ),
                              alignment: 'right' 
                            },
                            {
                                text: CurrencyFormatter.formatCurrency(
                                    (+item.products.price * item.quantity)
                                ),
                                alignment: 'right'
                            },
                        ]),
                    ]
                }
            },

            // salto de linea
            '\n\n',
            // totales
            {
                columns: [
                    {
                        width: '*',
                        text: '',
                    },
                    {
                        width: 'auto',
                        layout: 'noBorders',
                        table: {
                            body: [
                                ['Subtotal', {
                                    text: CurrencyFormatter.formatCurrency(subTotal),
                                    alignment: 'right',
                                }],
                                [{ text: 'Total', bold: true },
                                {
                                    text: CurrencyFormatter.formatCurrency(total),
                                    alignment: 'right',
                                    bold: true,
                                }],
                            ]
                        }
                    }
                ]
            },
        ],
    }
}