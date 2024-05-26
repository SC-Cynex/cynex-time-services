import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
} from "@nestjs/common";
import { PointService } from "./point.service";
import { Prisma } from "@prisma/client";

@Controller("point")
export class PointController {
  constructor(private readonly pointService: PointService) {}

  @Post()
  async create(
    @Body() createPointDto: Prisma.PointEvCreateInput
  ): Promise<{ status: string; message: string; statusCode: number }> {
    try {
      const hour = await this.pointService.create(createPointDto);
      return {
        status: "success",
        message: "Seu ponto foi registrado com sucesso às " + hour.hour,
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new HttpException(
        "Erro ao registrar o ponto" + error,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get()
  findAll() {
    return this.pointService.findAll();
  }

  @Get("last-eight/:userId")
  async findLastEightPointsByUserId(@Param("userId") userId: string) {
    return this.pointService.findLastEightPointsByUserId(+userId);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.pointService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updatePointDto: Prisma.PointEvUpdateInput
  ) {
    return this.pointService.update(+id, updatePointDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.pointService.remove(+id);
  }
}
