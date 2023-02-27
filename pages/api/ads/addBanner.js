import { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../lib/db'

export default async (req, res) => {

    try {
        const { title, adsType, etc, dateType, liveType } = req.body;
        console.log("title : " + title + ", adsType : " + adsType + ", etc : " + etc + ", dateType : " + dateType + ", liveType : " + liveType);

        const seqQuery = "SELECT nextval('smartux.pt_hdtv_ads_info_seq') as ads_no;";

        const [seq] = await db.query(seqQuery);
        const ads_no = seq.ads_no;

        const sqlQuery =
            "INSERT INTO smartux.pt_hdtv_ads_info(ads_no, title, ads_type, etc, ads_date_type, live_yn) VALUES($1, $2, $3, $4, $5, $6);";
        await db.query(sqlQuery, [ads_no, title, adsType, etc, dateType, liveType])
        .then(data => {
            console.log('SUCCESS', data.ads_no); // print success;
        })
        .catch(error => {
             console.log('ERROR:', error); // print error;
         });

         res.status(200);
         res.redirect("/");
    } catch(e) {
        console.log("[Error] " + e);
    }
}