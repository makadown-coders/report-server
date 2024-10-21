import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { PrinterService } from 'src/printer/printer.service';
import { getHelloWorldReport,
         getConstanciaEmpleoReport,
         getConstanciaEmpleoByIdReport,
         getReportePaises } from 'src/reports';

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
    const docDefinition: TDocumentDefinitions = getConstanciaEmpleoReport();
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

    const docDefinition: TDocumentDefinitions = getConstanciaEmpleoByIdReport({
      empleadorNombre: 'Jose Luis Acevedo Acevedo de la Peña',
      empleadorPosicion: 'Jefe de Departamento de Personal',
      empleadoNombre: employee.name,
      empleadoPosicion: employee.position,
      empleadoFechaInicio: employee.start_date,
      empleadoHoras: employee.hours_per_day,
      empleadoHorarioDeTrabajo: employee.work_schedule,
      empleadorCompania: 'Servicios de Salud del Instituto Mexicano del Seguro Social para el Bienestar',
    });
    const doc = this.printer.createPdf(docDefinition);
    return doc;
  }

  async reportePaises() {
    const paises = await this.countries.findMany({
      where: {
        local_name: { not: null },
      }
    });
    const docDefinition: TDocumentDefinitions = 
             getReportePaises({
                       title: 'Reporte insumos',
                       subtitle: 'Estos son los insumos',
                       paises: paises
                      });
    const doc = this.printer.createPdf(docDefinition);
    return doc;
  }
}
