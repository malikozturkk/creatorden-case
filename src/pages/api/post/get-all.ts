import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const getPost = await prisma.Post.findMany();

    return res.status(200).json(getPost);
  } catch (error) {
    return res.status(500).json("Postlar getirilirken bir hata oluştu");
  }
};
