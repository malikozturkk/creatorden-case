import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, influencer_id, year, type, reach_rate } = req.body;
  try {
    await prisma.Post.update({
      where: {
        id,
      },
      data: {
        influencer_id,
        year,
        type,
        reach_rate,
      },
    });
    return res.status(200).json("Post başarıyla düzenlendi");
  } catch (error) {
    return res.status(200).json("Post düzenlenirken bir hata oluştu");
  }
};
