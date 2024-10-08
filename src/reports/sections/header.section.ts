import { Content } from "pdfmake/interfaces"
import { DateFormatter } from "src/helpers";

interface HeaderOptions {
    title?: string;
    subtitle?: string;
    showLogo?: boolean;
    showDate?: boolean;
}

const logo: Content = {
    image: 'src/assets/imssb-logo.jpg',
    fit: [100, 100],
    margin: [20, 20, 0, 10],
}

export const headerSection = (options: HeaderOptions): Content => {
    const { title, subtitle, showLogo = true, showDate = true} = options;
    const headerLogo: Content = showLogo ? logo : null;
    const headerDate: Content = showDate ? {
        text: DateFormatter.getDDMMMMYYYY(new Date()),
        alignment: 'right',
        margin: [20, 20],
    } : null;

    const headerTitle: Content = title
     ? {
        text: title,
        style: {
            bold: true
        },
    }: null;

    return {
        columns: [
            headerLogo,
            headerTitle,
            headerDate,
        ]
    }
};