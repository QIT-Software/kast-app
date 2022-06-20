import { SchemaDefinition } from 'mongoose';
import { ModelDefinition } from '@nestjs/mongoose';
export declare const createSchema: (name: string, definition: SchemaDefinition) => ModelDefinition;
