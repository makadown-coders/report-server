import { Injectable } from '@nestjs/common';
import PdfPrinter from 'pdfmake';
import type { BufferOptions, CustomTableLayout, TDocumentDefinitions } from 'pdfmake/interfaces';

const fonts = {
  Roboto: {
    normal: './fonts/Roboto-Regular.ttf',
    bold: './fonts/Roboto-Medium.ttf',
    italics: './fonts/Roboto-Italic.ttf',
    bolditalics: './fonts/Roboto-MediumItalic.ttf',
  },
  Geomanist: {
    normal: './fonts/Geomanist-Regular.otf',
    bold: './fonts/Geomanist-Bold.ttf',
    italics: './fonts/Geomanist-Regular-Italic.otf',
    bolditalics: './fonts/geomanist-medium.ttf',
  },
};

const customTableLayouts: Record<string, CustomTableLayout> = {
  customLayout01: {
    hLineWidth: function (i, node) {
      if (i === 0 || i === node.table.body.length) {
        return 0;
      }
      return (i === node.table.headerRows) ? 2 : 1;
    },
    vLineWidth: function (i) {
      return 0;
    },    
    hLineColor: function (i) {
      return i === 1 ? 'black' : '#aaa';
    },
    paddingLeft: function (i) {
      return i === 0 ? 0 : 8;
    },
    paddingRight: function (i, node) {
      return (i === node.table.widths.length - 1) ? 0 : 8;
    },
    fillColor: function (i, node) {      
      return (i === 0|| i === node.table.body.length - 1) ?
                 '#48CAE4' :
                  (i % 2 === 0 ? '#F7F7F7' : null);
    },
  },
  borderBlue: {
    hLineColor: function (i) {
      return '#006341';
    },
    vLineColor: function (i) {
      return '#006341';
    },
  }
};

@Injectable()
export class PrinterService {
  private printer = new PdfPrinter(fonts);

  createPdf(
    docDefinition: TDocumentDefinitions,
    options: BufferOptions = {
      tableLayouts: customTableLayouts,
    },
  ): PDFKit.PDFDocument {
    return this.printer.createPdfKitDocument(docDefinition, options);
  }
}
