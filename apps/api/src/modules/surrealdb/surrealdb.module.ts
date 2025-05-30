import { Module } from '@nestjs/common';
import { AppConfigModule } from '../app-config/app-config.module';
import { ConfigurableModuleClass } from './surrealdb.module-definition';
import { SurrealDbService } from './surrealdb.service';

@Module({
  imports: [AppConfigModule],
  exports: [SurrealDbService],
  controllers: [],
  providers: [SurrealDbService],
})
export class SurrealDbModule extends ConfigurableModuleClass {}
