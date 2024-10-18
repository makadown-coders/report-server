import { Injectable } from '@nestjs/common';
import PdfPrinter from 'pdfmake';
import type { BufferOptions, TDocumentDefinitions } from 'pdfmake/interfaces';

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

@Injectable()
export class PrinterService {
  private printer = new PdfPrinter(fonts);

  createPdf(
    docDefinition: TDocumentDefinitions,
    options: BufferOptions = {},
  ): PDFKit.PDFDocument {
    return this.printer.createPdfKitDocument(docDefinition, options);
  }
}
