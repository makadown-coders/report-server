import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { PrinterService } from 'src/printer/printer.service';
import { orderByIdReport, getBasicChartSvgReport, getHelloWorldReport, getStatisticsReport } from 'src/reports';

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

    /* Obtener orden basado en este query
    SELECT
  *
FROM
  ORDERS
  INNER JOIN ORDER_DETAILS ON ORDERS.ORDER_ID = ORDER_DETAILS.ORDER_ID
  INNER JOIN PRODUCTS ON PRODUCTS.PRODUCT_ID = ORDER_DETAILS.PRODUCT_ID
  INNER JOIN CUSTOMERS ON ORDERS.CUSTOMER_ID = CUSTOMERS.CUSTOMER_ID
WHERE
  ORDERS.ORDER_ID = 10250
   */
    const order = await this.orders.findUnique({
      where: {
        order_id: orderId,
      },
      include: {
        customers: true,
        order_details: {
          include: {
            products: true,
          },
        },
      }
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${orderId} not found`);
    }

    const docDefinition: TDocumentDefinitions = orderByIdReport({ data: order as any });
    const doc = this.printer.createPdf(docDefinition);
    return doc;
  }

  async getSvgChart() {
    const docDefinition: TDocumentDefinitions = await getBasicChartSvgReport(/*{
      name: 'svg chart',
    }*/);
    const doc = this.printer.createPdf(docDefinition);
    return doc;
  }

  async getStatistics() {
    /* Obtener datos de estadisticas basado en este query:

              Select count(country), country
              from customers
              group by country
              order by count(country) desc
              limit 10
     */
    const topCountries = await this.customers.groupBy({
      by: ['country'],
      _count: true,
      orderBy: {
        _count: {
          country: 'desc'
        }
      },
      take: 10
    });

    console.log('topCountries', topCountries);
    const topCountriesData = topCountries.map(({country, _count}) => ({
      country: country,
      customers: _count
    }))

    const docDefinition = await getStatisticsReport({
      topCountries: topCountriesData,
    });
    const doc = this.printer.createPdf(docDefinition);
    return doc;
  }
}
