
import { Content, DynamicContent } from "pdfmake/interfaces"
import { DateFormatter } from "src/helpers";

interface FooterOptions {
    mostrarNumeroPagina: boolean;
}

export const footerSection = (options: FooterOptions): Content | DynamicContent => {
    const { mostrarNumeroPagina = true } = options;

    const footer: Content |DynamicContent = 
         function (currentPage, pageCount) {            
            return mostrarNumeroPagina ?  [
                {
                    text: 'Página ' + currentPage.toString() + ' de ' + pageCount,
                    alignment: 'right',
                    // margin: [left, top, right, bottom]
                    margin: [20, 10, 20, 40],
                }] : [];
        };

    return footer;
}