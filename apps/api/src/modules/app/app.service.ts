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
    const [users] = await this.db.query<[TUser[]]>(
      `
        SELECT
          id,
          email,
          username,
          name,
          status,
          avatar_url as avatarUrl,
          email_verified_at as emailVerifiedAt,
          created_at as createdAt,
          updated_at as updatedAt,
          is_email_verified as isEmailVerified,
          last_login_at as lastLoginAt,
          deleted_at as deletedAt
        FROM user
        ORDER BY username ASC
        LIMIT 10;
      `,
    );

    return users;
  }
}
