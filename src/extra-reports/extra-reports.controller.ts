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
    pdfDoc.info.Title = 'Hello World!';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
