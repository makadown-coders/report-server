import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { PrinterService } from 'src/printer/printer.service';
import { generateCommunityReport, generateCustomSizeReport, generateRemisionReport, getHelloWorldReport } from 'src/reports';
import fs from 'fs';
import { getHtmlContent } from 'src/helpers';
import { headerSection } from 'src/reports/sections/header.section';
import { footerSection } from 'src/reports/sections/footer.section';
import { title } from 'process';

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
        const html = fs.readFileSync('./src/reports/html/basic-03.html', 'utf8');

        const content = getHtmlContent(html, {
            client: 'Departamento del Abasto',
            title: 'Reporte de Insumos',
        });

        const docDefinition: TDocumentDefinitions = {
            pageMargins: [40, 180, 40, 60],
            header: headerSection({
                title: 'IMSS Bienestar',
                subtitle: 'Test',
            }),
            footer: footerSection( { mostrarNumeroPagina: true } ),
            content: content,
        };
/*
        const docDefinition: TDocumentDefinitions = getHelloWorldReport({
            name: 'Juan Perez',
        });*/
        const doc = this.printer.createPdf(docDefinition);
        return doc;
    }

    public getCommunityReport() {

        const docDefinition: TDocumentDefinitions = generateCommunityReport();
        const doc = this.printer.createPdf(docDefinition);
        return doc;
    }

    public getRemisionReport() {
        const docDefinition: TDocumentDefinitions = generateRemisionReport();
        const doc = this.printer.createPdf(docDefinition);
        return doc;
    }

    public getCustomSize() {
        const docDefinition: TDocumentDefinitions = generateCustomSizeReport();
        const doc = this.printer.createPdf(docDefinition);
        return doc;
    }
}
