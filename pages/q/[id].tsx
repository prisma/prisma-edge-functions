import React from "react";
import { GetServerSideProps } from "next";
import Router from "next/router";
import prisma from '../../lib/prisma'


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const quote = await prisma.quote.findUnique({
    where: {
      id: Number(params?.id) || -1,
    }
  });
  return {
    props: quote,
  };
};

async function updateQuote(id: number): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: "PUT",
  });
  await Router.push("/")
}



const Quote = (props) => {

  return (
    <div>
      <p>{props.quote.content}</p>
      <h2>{props.quote.author}</h2>
    </div>

  );
};

export default Quote;