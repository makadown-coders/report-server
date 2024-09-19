import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { PrinterService } from 'src/printer/printer.service';
import { getHelloWorldReport } from 'src/reports';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    console.info('BasicReportsService onModuleInit connecting via Prisma...');
    await this.$connect();
  }

  constructor(private readonly printer: PrinterService) {
    super();
  }
  hello() {
    const docDefinition: TDocumentDefinitions = getHelloWorldReport({
      name: 'Juan Perez',
    });
    const doc = this.printer.createPdf(docDefinition);
    return doc;
  }
}
