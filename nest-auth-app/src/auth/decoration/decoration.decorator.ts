import { SetMetadata } from '@nestjs/common';

export const Decoration = (...args: string[]) => SetMetadata('decoration', args);
