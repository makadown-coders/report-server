import { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/header.section';
import { DateFormatter } from 'src/helpers';

interface ReportValues {
    empleadorNombre: string;
    empleadorPosicion: string;
    empleadoNombre: string;
    empleadoPosicion: string;
    empleadoFechaInicio: Date;
    empleadoHoras: number;
    empleadoHorarioDeTrabajo: string;
    empleadorCompania: string;
}

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

export const getConstanciaEmpleoByIdReport = (values: ReportValues): TDocumentDefinitions => {
    // desestructuro los campos
    const { empleadorNombre,
            empleadorPosicion,
            empleadoNombre,
            empleadoPosicion,
            empleadoFechaInicio,
            empleadoHoras,
            empleadoHorarioDeTrabajo,
            empleadorCompania} = values;
    
    const docDefinition: TDocumentDefinitions = {
        styles: estilos,
        header:  headerSection({ showLogo: true, showDate: true }),
        content: [
            {
                text: 'CONSTANCIA DE EMPLEO',
                style: 'titulo',
            },
            {
                text: `Yo, ${empleadorNombre}, en mi calidad de ${empleadorPosicion} de ${empleadorCompania}, por medio de la presente certifico que ${empleadoNombre} ha sido empleado en nuestra empresa desde el ${DateFormatter.getDDMMMMYYYY(empleadoFechaInicio)}.\n
Durante su empleo, el Sr./Sra. ${empleadoNombre} ha desempeñado el cargo de ${empleadoPosicion}, demostrando responsabilidad, compromiso y habilidades profesionales en sus labores.\n
La jornada laboral del Sr./ Sra. ${empleadoNombre} es de ${empleadoHoras} horas semanales, con un horario de ${empleadoHorarioDeTrabajo}, cumpliendo con las políticas y procedimientos establecidos por la empresa.\n
Esta constancia se expide a solicitud del interesado para los fines que considere conveniente.\n\n`,
                style: 'contenido',
            },
            {
                text: `Atentamente,`,
                style: 'firma',
            },
            {
                text: `${empleadorNombre}`,
                style: 'firma',
            },
            {
                text: `${empleadorPosicion}`,
                style: 'firma',
            },
            {
                text: `${empleadorCompania}`,
                style: 'firma',
            },
            {
                text: `${DateFormatter.getDDMMMMYYYY(new Date())}`,
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
