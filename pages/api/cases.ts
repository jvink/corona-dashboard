import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json([
    {
      label: 'Cases',
      data: [
        [ 1592611200000, 10000, 2 ],
        [ 1592697600000, 12000, 150 ],
        [ 1592784000000, 14000, 200 ],
        [ 1592870400000, 16000, 1500 ],
        [ 1592956800000, 21000, 2000 ],
        [ 1593043200000, 29000, 5000 ],
        [ 1593129600000, 44249, 10000 ],
      ],
    },
  ]);
}
