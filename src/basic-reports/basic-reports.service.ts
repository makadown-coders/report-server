import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
      console.info('BasicReportsService onModuleInit connecting via Prisma...');
      await this.$connect();
    }
    async hello() {
        return this.employees.findFirst();
    }
}
