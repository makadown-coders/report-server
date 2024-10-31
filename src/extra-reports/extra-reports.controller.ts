import { Controller, Get, Res } from '@nestjs/common';
import { ExtraReportsService } from './extra-reports.service';
import { Response } from 'express';

@Controller('extra-reports')
export class ExtraReportsController {
  constructor(private readonly extraReportsService: ExtraReportsService) { }

  @Get('html-report')
  getHtmlReport(@Res() response: Response) {
    const pdfDoc = this.extraReportsService.getHtmlReport();    
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Reporte HTML';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('community-report')
  getCommunityReport(@Res() response: Response) {
    const pdfDoc = this.extraReportsService.getCommunityReport();
    // const pdfDoc = this.extraReportsService.getRemisionReport();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Prueba IMSS Bienestar';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('remision-report')
  getRemisionReport(@Res() response: Response) {
    const pdfDoc = this.extraReportsService.getRemisionReport();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Prueba IMSS Bienestar';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('custom-size')
  getCustomSize(@Res() response: Response) {
    const pdfDoc = this.extraReportsService.getCustomSize();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Prueba IMSS Bienestar';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
