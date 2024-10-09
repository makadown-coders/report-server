import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { PrinterService } from 'src/printer/printer.service';
import { getHelloWorldReport, getConstanciaEmpleo } from 'src/reports';

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

  constanciaEmpleo() {
    const docDefinition: TDocumentDefinitions = getConstanciaEmpleo();
    const doc = this.printer.createPdf(docDefinition);
    return doc;
  }

  async constanciaEmpleoById(id: number) {
    const employee = await this.employees.findUnique({
      where: {
        id: id,
      },
    });
    console.log('empleado', employee);
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    const docDefinition: TDocumentDefinitions = getConstanciaEmpleo();
    const doc = this.printer.createPdf(docDefinition);
    return doc;
  }
}
