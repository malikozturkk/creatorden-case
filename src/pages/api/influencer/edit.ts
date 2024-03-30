import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, name } = req.body;
  try {
    await prisma.Influencer.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
    return res.status(200).json("Influencer başarıyla düzenlendi");
  } catch (error) {
    return res.status(200).json("Influencer düzenlenirken bir hata oluştu");
  }
};
