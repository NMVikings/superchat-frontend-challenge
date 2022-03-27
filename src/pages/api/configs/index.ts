import { nanoid } from "nanoid";
import type { NextApiRequest, NextApiResponse } from "next";
import storageApi from "../../../api/storage";

type Data = {
  id: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const id = nanoid(6);

    const response = await storageApi.addValue(id, req.body);

    if (response.ok) {
      res.send({ id });
    }

    res.status(response.status).end();
  } else {
    // Handle any other HTTP method
  }
}
