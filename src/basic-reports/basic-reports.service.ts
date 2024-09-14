import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// TODO: Esto será optimizado después
import PdfPrinter from 'pdfmake';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';

const fonts = {
  Roboto: {
    normal: './fonts/Roboto-Regular.ttf',
    bold: './fonts/Roboto-Medium.ttf',
    italics: './fonts/Roboto-Italic.ttf',
    bolditalics: './fonts/Roboto-MediumItalic.ttf'
  }
};

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    console.info('BasicReportsService onModuleInit connecting via Prisma...');
    await this.$connect();
  }
  hello() {
    //return this.employees.findFirst();
    const printer = new PdfPrinter(fonts);
    const docDefinition: TDocumentDefinitions = {
      content: [
        'Hello World!'
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true
        },
        subheader: {
          fontSize: 15,
          bold: true
        },
        quote: {
          italics: true
        },
        small: {
          fontSize: 8
        }
      }
    };
    const doc = printer.createPdfKitDocument(docDefinition);
    return doc;
  }
}
