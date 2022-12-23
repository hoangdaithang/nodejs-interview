import Path from 'path';
import Dotenv from 'dotenv';

Dotenv.config();

export const AppDir = Path.resolve(__dirname, '..', '..');
