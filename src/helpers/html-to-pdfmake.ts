import htmlToPdfmake from 'html-to-pdfmake';
import { JSDOM } from 'jsdom';

/**
 * This defines a type that represents an object with string keys and string values.
 * It allows for dynamic property names, where each property is a string key-value pair.
 * Is the same as Record<string, string>
 */
interface ContentReplacer {
    [key: string]: string;
}

export const getHtmlContent = (html: string, replacers: ContentReplacer = {}) => {

    Object.entries(replacers).forEach(([key, value]) => {
        html = html.replaceAll(`{{${key}}}`, value);
        html = html.replaceAll(`{{ ${key} }}`, value);
    });

    const {window} = new JSDOM(html);
    // TODO: implementar la función que convierte el HTML a PDFMake
    return htmlToPdfmake(html, {window});
}