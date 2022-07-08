import prisma from '../../lib/prisma'

export const config = {
  runtime: 'experimental-edge',
};

export default async function handler() {
  const count = await prisma.quote.count({
    select: {
      id: true
    }
  });

  const randomNo = Math.floor(Math.random() * count.id);

  const quote = await prisma.quote.findUnique({
    where: { id: randomNo, }
  })
  console.log({ quote })

  // seriaize and deserialize Date values
  return new Response(
    JSON.stringify(quote),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    })
}
