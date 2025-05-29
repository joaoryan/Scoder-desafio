import bodyParser from 'body-parser';

export const bodyParserJson = bodyParser.json({ limit: '50mb' });
export const bodyParserUrlEnconded = bodyParser.urlencoded({ limit: '50mb', extended: true });
