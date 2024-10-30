import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { PrinterService } from 'src/printer/printer.service';
import { getHelloWorldReport } from 'src/reports';
import fs from 'fs';
import { getHtmlContent } from 'src/helpers';
import { headerSection } from 'src/reports/sections/header.section';

@Injectable()
export class ExtraReportsService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        console.info('ExtraReportsService onModuleInit connecting via Prisma...');
        await this.$connect();
    }

    constructor(private readonly printer: PrinterService) {
        super();
    }

    public getHtmlReport() {
        const html = fs.readFileSync('./src/reports/html/basic-01.html', 'utf8'); 
        console.log('html', html);

        const content = getHtmlContent(html);

        const docDefinition: TDocumentDefinitions = {
            pageMargins: [40, 60, 40, 60],
            header: headerSection({
                title: 'Html to PDFMake',
                subtitle: 'Test',
            }),
            content: content,
        };
/*
        const docDefinition: TDocumentDefinitions = getHelloWorldReport({
            name: 'Juan Perez',
        });*/
        const doc = this.printer.createPdf(docDefinition);
        return doc;
    }
}
