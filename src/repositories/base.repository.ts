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
  }: {
    where?: { [key: string]: unknown };
    limit?: number;
    offset?: number;
    include?: { [key: string]: unknown };
    orderBy?: unknown;
    cursor?: unknown;
    select?: unknown;
  } = {}): Promise<T[] | undefined> {
    const params = {
      where,
      take: limit,
      skip: offset,
      include,
      orderBy,
      cursor,
      select,
    };
    return this.prisma[this.getEntity()].findMany(params);
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

  async delete(id: number): Promise<T | undefined> {
    return await this.prisma[this.getEntity()].delete({ where: { id } });
  }

  async deleteMany({ where }): Promise<T | undefined> {
    return await this.prisma[this.getEntity()].deleteMany({ where });
  }

  protected abstract getEntity(): string;
}
