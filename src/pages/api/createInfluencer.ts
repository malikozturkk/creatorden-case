import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const newInfluencers = await prisma.Influencer.createMany({
      data: req.body.influencerDatas,
    });
    return res.status(200).json(newInfluencers);
  } catch (error) {
    console.log(error, "error");
    return res.status(500);
  }
};
