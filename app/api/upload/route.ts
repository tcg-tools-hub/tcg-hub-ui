import { NextResponse } from 'next/server';
import csv from 'csv-parser';
import stream from 'stream';
import { promisify } from 'util';

const pipeline = promisify(stream.pipeline);

export async function POST(request: { formData: () => any; }) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 });
    }

    const results: any[] = [];
    const bufferStream = new stream.PassThrough();
    bufferStream.end(Buffer.from(await file.arrayBuffer()));

    await pipeline(
      bufferStream,
      csv(),
      new stream.Writable({
        objectMode: true,
        write: (data, encoding, callback) => {
          results.push(data);
          callback();
        },
      })
    );

    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.error('Erro ao processar o arquivo CSV:', error);
    return NextResponse.json({ error: 'Erro ao processar o arquivo CSV' }, { status: 500 });
  }
}