import prisma from '../../lib/prisma'

export default async function handler(req, res) {
  const count = await prisma.quote.count();

  const randomNo = Math.floor(Math.random() * count);

  const quote = await prisma.quote.findUnique({
    where: { id: randomNo, }
  })

  // seriaize and deserialize Date values

  res.status(200).json({ quote: JSON.parse(JSON.stringify(quote)) })
}