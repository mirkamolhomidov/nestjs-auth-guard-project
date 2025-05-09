import { HttpException, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getAllUsers() {
    return await this.prisma.user.findMany();
  }
  async getOneUser(id: number) {
    return await this.prisma.user.findFirst({ where: { id } });
  }
  async updateUserRole(id: number, role: string) {
    if (!Object.values(Role).includes(role as Role)) {
      throw new Error(`Role invalid: ${role}`);
    }
    return await this.prisma.user.update({
      where: { id },
      data: { role: role as Role },
    });
  }
  async deleteUser(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new HttpException(`User not found`, 404);
    }
    return await this.prisma.user.delete({ where: { id } });
  }
}
