import React from "react";
import { useRouter } from 'next/router'
import type { GetServerSideProps } from "next";
import type { Quote } from "@prisma/client";

import prisma from '../lib/prisma'

export const config = {
  runtime: 'experimental-edge',
}

export const getServerSideProps: GetServerSideProps = async () => {
  const count = await prisma.quote.count({
    select: {
      id: true
    }
  });

  const randomNo = Math.floor(Math.random() * count.id);

  const quote = await prisma.quote.findUnique({
    where: { id: randomNo, }
  })

  // seriaize and deserialize Date values
  return {
    props: { quote: JSON.parse(JSON.stringify(quote)) }
  }
}

type Props = {
  quote: Quote;
};


const Index: React.FC<Props> = (props) => {
  const router = useRouter()
  return (
      <div className="max-w-screen-xl px-4 py-32 mx-auto lg:h-screen lg:items-center lg:flex">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            {props.quote.content}
          </h1>

          <p className="mt-4 sm:leading-relaxed sm:text-xl">
            {props.quote.author}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <button className="block w-full px-12 py-3 text-sm font-medium text-red-600 rounded shadow sm:w-auto hover:text-red-700 active:text-red-500 focus:outline-none focus:ring"
              onClick={() => router.reload()}>
              Another One 🔄
            </button>
          </div>
        </div>
      </div>
  );
};

export default Index;