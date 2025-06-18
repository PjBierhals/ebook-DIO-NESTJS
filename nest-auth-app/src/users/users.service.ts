import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashingService } from 'src/auth/hashing/hashing.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly Crypt: HashingService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, role, ...userData } = createUserDto;
    const passwordHash = await this.Crypt.hash(password);

    const data: any = {
      ...userData,
      password: passwordHash,
    };

    if (role) {
      data.role = {
        connect: { id: role },
      };
    }

    return await this.prisma.user.create({
      data,
      include: {
        role: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany({
      include: {
        role: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.user.findFirst({
      where: { id },
    });
  }
  async findEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
      include: {
        role: {
          include: {
            permissions: true,
          },
        },
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const exitUser = await this.prisma.user.findUnique({ where: { id } });

    if (!exitUser) {
      return null;
    }

    const { password, role, ...userData } = updateUserDto;

    const dataToUpdate: any = {
      ...userData,
    };

    if (password) {
      const passwordHash = await this.Crypt.hash(password);
      dataToUpdate.password = passwordHash;
    }

    if (role) {
      dataToUpdate.role = {
        connect: { id: role },
      };
    }

    return await this.prisma.user.update({
      where: { id },
      data: dataToUpdate,
      include: {
        role: true,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
