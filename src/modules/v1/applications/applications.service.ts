import { Injectable } from '@nestjs/common';
import { CustomConfigService } from 'config/custom-config.service';
import { ApplicationsRepository } from 'modules/v1/applications/applications.repository';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(
    private readonly configService: CustomConfigService,
    private readonly applicationRepository: ApplicationsRepository,
  ) {}
  create({
    userName,
    payload,
  }: {
    userName: string;
    payload: CreateApplicationDto;
  }) {
    return this.applicationRepository.create({
      userName,
      payload,
    });
  }

  async find({ userName }: { userName: string }) {
    const items = await this.applicationRepository.find({ userName });
    return items;
  }

  async findById({ userName, uid }: { userName: string; uid: string }) {
    const item = await this.applicationRepository.findById({ userName, uid });
    return item;
  }

  update({
    userName,
    uid,
    payload,
  }: {
    userName: string;
    uid: string;
    payload: UpdateApplicationDto;
  }) {
    return this.applicationRepository.update({
      userName,
      uid,
      payload,
    });
  }

  destroy({ userName, uids }: { userName: string; uids: string[] }) {
    return this.applicationRepository.destroy({ userName, uids });
  }
}
