import { ApiProperty } from '@nestjs/swagger';

export class FileUploadDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'The file to be uploaded',
  })
  file: any;
}

export class FileDeleteDto {
  @ApiProperty({ description: 'Array of file IDs to be deleted' })
  ids: string[];
}
