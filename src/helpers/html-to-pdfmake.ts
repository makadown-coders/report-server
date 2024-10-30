import htmlToPdfmake from 'html-to-pdfmake';
import { JSDOM } from 'jsdom';

export const getHtmlContent = (html: string) => {
    const {window} = new JSDOM(html);
    // TODO: implementar la función que convierte el HTML a PDFMake
    return htmlToPdfmake(html, {window});
}