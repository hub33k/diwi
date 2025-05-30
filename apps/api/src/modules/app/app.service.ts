import { TUser } from '@diwi/contracts';
import { Injectable } from '@nestjs/common';
import { SurrealDbService } from '../surrealdb/surrealdb.service';

@Injectable()
export class AppService {
  constructor(private readonly db: SurrealDbService) {}

  public async getHello(): Promise<string> {
    return 'Hello World!';
  }

  public async getUsers(): Promise<TUser[]> {
    const usersQuery = await this.db.query<TUser[][]>(
      'SELECT * FROM user ORDER BY username ASC LIMIT 10;',
    );
    const users = usersQuery[0];
    return users;
  }
}
