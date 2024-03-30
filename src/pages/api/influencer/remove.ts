import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await prisma.Influencer.delete({
      where: {
        id: req.body.id,
      },
    });
    return res.status(200).json("Influencer başarıyla silindi.");
  } catch (error) {
    return res.status(200).json("Id'ye ait kullanıcı bulunamadı");
  }
};
