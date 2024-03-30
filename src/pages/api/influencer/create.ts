import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { influencerDatas } = req.body;
  try {
    await prisma.Influencer.createMany({
      data: influencerDatas,
    });
    return res
      .status(200)
      .json(
        influencerDatas.length +
          ` influencer ${influencerDatas[0].name} başarıyla eklendi`
      );
  } catch (error) {
    return res.status(200).json("Influencerlar eklenirken bir hata oluştu");
  }
};
