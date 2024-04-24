import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export abstract class BaseRepository<T> {
  constructor(protected prisma?: PrismaService) {}

  async findOne(id: number): Promise<T | undefined> {
    return await this.prisma[this.getEntity()].findUnique({ where: { id } });
  }

  async findOneBy({ where }) {
    return this.prisma[this.getEntity()].findUnique({ where });
  }

  async findMany({
    where = {},
    limit,
    offset = 0,
    include,
    orderBy,
    cursor,
    select,
    queryType = 'find',
  }: {
    where?: { [key: string]: unknown };
    limit?: number;
    offset?: number;
    include?: { [key: string]: unknown };
    orderBy?: unknown;
    cursor?: unknown;
    select?: unknown;
    queryType?: 'find' | 'count' | 'findAndCount';
  } = {}): Promise<[T[] | undefined, number | undefined]> {
    const params = {
      where,
      take: limit,
      skip: offset,
      include,
      orderBy,
      cursor,
      select,
    };

    const shouldExecuteFirstQuery =
      queryType === 'find' || queryType === 'findAndCount';
    const shouldExecuteSecondQuery =
      queryType === 'count' || queryType === 'findAndCount';

    const firstQueryPromise = shouldExecuteFirstQuery
      ? this.prisma[this.getEntity()].findMany(params)
      : null;

    const secondQueryPromise = shouldExecuteSecondQuery
      ? this.prisma[this.getEntity()].count({ where })
      : null;

    if (shouldExecuteFirstQuery && shouldExecuteSecondQuery) {
      return await this.prisma.$transaction([
        firstQueryPromise,
        secondQueryPromise,
      ]);
    }

    if (shouldExecuteFirstQuery) {
      return [await firstQueryPromise, undefined];
    }

    if (shouldExecuteSecondQuery) {
      return [null, await secondQueryPromise];
    }
  }

  async groupBy({ groupBy, where }: { groupBy: string[]; where: unknown }) {
    return await this.prisma[this.getEntity()].groupBy({
      by: groupBy,
      where,
    });
  }

  async create(data: unknown): Promise<T> {
    return await this.prisma[this.getEntity()].create(data);
  }

  async update(id: number, data: Partial<T>): Promise<T | undefined> {
    return await this.prisma[this.getEntity()].update({
      where: { id },
      data,
    });
  }

  async upsert({
    id,
    data,
    include,
  }: {
    id?: number;
    data: unknown;
    include?: unknown;
  }): Promise<T | undefined> {
    if (id) {
      return await this.prisma[this.getEntity()].update({
        where: { id },
        data,
        include,
      });
    } else {
      return await this.prisma[this.getEntity()].create({
        data,
        include,
      });
    }
  }

  async delete(id: number): Promise<T | undefined> {
    return await this.prisma[this.getEntity()].delete({ where: { id } });
  }

  async deleteMany({ where }): Promise<T | undefined> {
    return await this.prisma[this.getEntity()].deleteMany({ where });
  }

  protected abstract getEntity(): string;
}
