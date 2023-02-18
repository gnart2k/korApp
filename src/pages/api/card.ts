// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import * as fs from 'fs';
import path from "path"
type Data = {
  definition: string,
  value: string,
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data: Array<Data> = []
  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), 'public');
  //Read the json data file data.json
  const text = fs.readFileSync(jsonDirectory + '/text.txt', 'utf-8')
  const lines = text.split('\n')

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('=')) {
      const term = lines[i].split('=');
      data.push({ definition: term[0], value: term[1] })
    }
  }

  res.status(200).json(data)
}
