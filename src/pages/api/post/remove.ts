import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await prisma.Post.delete({
      where: {
        id: req.body.id,
      },
    });
    return res.status(200).json("Post başarıyla silindi.");
  } catch (error) {
    return res.status(200).json("Id'ye ait post bulunamadı");
  }
};
