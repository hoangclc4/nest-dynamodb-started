import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TokenGuard } from 'bootstrap/guards/token.guard';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Request } from 'express';

@ApiTags('applications')
@ApiBearerAuth()
@UseGuards(TokenGuard)
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  create(
    @Req() request: Request,
    @Body() createApplicationDto: CreateApplicationDto,
  ) {
    return this.applicationsService.create({
      userName: request.user.sub,
      payload: createApplicationDto,
    });
  }

  @Get()
  findAll(@Req() request: Request) {
    return this.applicationsService.find({
      userName: request.user.sub,
    });
  }

  @Get(':uid')
  findOne(@Req() request: Request, @Param('uid') uid: string) {
    return this.applicationsService.findById({
      userName: request.user.sub,
      uid,
    });
  }

  @Put(':uid')
  update(
    @Req() request: Request,
    @Param('uid') uid: string,
    @Body() updateApplicationDto: UpdateApplicationDto,
  ) {
    return this.applicationsService.update({
      userName: request.user.sub,
      uid: uid,
      payload: updateApplicationDto,
    });
  }

  @Delete()
  destroy(@Req() request: Request, @Body() { uids }: { uids: string[] }) {
    return this.applicationsService.destroy({
      userName: request.user.sub,
      uids,
    });
  }
}
