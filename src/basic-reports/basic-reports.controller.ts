import { Controller, Get, Param, Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { Response } from 'express';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

  @Get()
  async hello(@Res() response: Response) {
    const pdfDoc = this.basicReportsService.hello();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Hello World!';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('constancia-empleo')
  async constanciaEmpleo(@Res() response: Response) {
    const pdfDoc = this.basicReportsService.constanciaEmpleo();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Constancia de Empleo';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('constancia-empleo/:id')
  async constanciaEmpleoById(@Res() response: Response, @Param('id') id: string) {
    const pdfDoc = await this.basicReportsService.constanciaEmpleoById(+id);
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Constancia de Empleo';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('paises')
  async getPaises(@Res() response: Response) {
    const pdfDoc = await this.basicReportsService.reportePaises();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Reporte de Paises';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
