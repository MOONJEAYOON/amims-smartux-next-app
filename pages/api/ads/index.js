// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../lib/db'

export default async(req, res) => {
  const ads = await db.query('SELECT * FROM smartux.pt_hdtv_ads_info order by ads_no');

  res.json(ads);
  res.status(200).end();

  return res;
}
