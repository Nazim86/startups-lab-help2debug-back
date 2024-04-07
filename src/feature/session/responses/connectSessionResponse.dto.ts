import { ApiProperty } from '@nestjs/swagger';

export class ConnectSessionResponseDto {
  @ApiProperty({
    description: 'Video Conference Link to cnnect',
    type: 'string',
    example: 'https://www.zoom.com/id',
  })
  videoConferenceLink: string;
}
