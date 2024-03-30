import type { NextApiRequest, NextApiResponse } from "next";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-male-sprites";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const seed = req.query.seed || "random-seed";
  const svg = createAvatar(style, {
    seed: seed.toString(),
  });

  res.setHeader("Content-Type", "image/svg+xml");
  res.send(svg);
}
