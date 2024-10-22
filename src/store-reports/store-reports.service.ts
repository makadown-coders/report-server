import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { PrinterService } from 'src/printer/printer.service';
import { getHelloWorldReport, orderByIdReport } from 'src/reports';

@Injectable()
export class StoreReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    console.info('StoreReportsService onModuleInit connecting via Prisma...');
    await this.$connect();
  }

  constructor(private readonly printer: PrinterService) {
    super();
  }
  async getOrderByIdReport(orderId: number) {
    console.log({orderId});
    const docDefinition: TDocumentDefinitions = orderByIdReport();
    const doc = this.printer.createPdf(docDefinition);
    return doc;
  }
}
