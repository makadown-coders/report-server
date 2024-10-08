import { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/header.section';

const estilos: StyleDictionary = {
    titulo: {
        fontSize: 22,
        bold: true,
        alignment: 'center',
        margin: [0, 100, 0, 10],
    },
    contenido: {
        alignment: 'justify',
        margin: [0, 100, 0, 150],
    },
    firma: {
        fontSize: 14,
        bold: true,
    },
    piePagina: {
        fontSize: 10,
        italics: true,
        alignment: 'center',
        margin: [0, 0, 0, 20], 
    }
};

export const getConstanciaEmpleo = (): TDocumentDefinitions => {
    // const { name } = options;
    const docDefinition: TDocumentDefinitions = {
        styles: estilos,
        header:  headerSection({ showLogo: true, showDate: true }),
        content: [
            {
                text: 'CONSTANCIA DE EMPLEO',
                style: 'titulo',
            },
            {
                text: `Yo, [Nombre del Empleador], en mi calidad de [Cargo del Empleador] de [Nombre de la Empresa], por medio de la presente certifico que [Nombre del Empleado] ha sido empleado en nuestra empresa desde el [Fecha de Inicio del Empleado].\n
Durante su empleo, el Sr./Sra. [Nombre del Empleado] ha desempeñado el cargo de [Cargo del Empleado], demostrando responsabilidad, compromiso y habilidades profesionales en sus labores.\n
La jornada laboral del Sr./ Sra. [Nombre del Empleado] es de [Número de Horas] horas semanales, con un horario de [Horario de Trabajo], cumpliendo con las políticas y procedimientos establecidos por la empresa.\n
Esta constancia se expide a solicitud del interesado para los fines que considere conveniente.\n\n`,
                style: 'contenido',
            },
            {
                text: `Atentamente,`,
                style: 'firma',
            },
            {
                text: `[Nombre del Empleador]`,
                style: 'firma',
            },
            {
                text: `[Cargo del Empleador]`,
                style: 'firma',
            },
            {
                text: `[Nombre de la Empresa]`,
                style: 'firma',
            },
            {
                text: `[Fecha de Emisión]`,
                style: 'firma',
            },
        ],
        footer: {
            text: 'Este documento es una constancia de empleo y no representa un compromiso laboral',
            style: 'piePagina',
        }
    };
    return docDefinition;
}
