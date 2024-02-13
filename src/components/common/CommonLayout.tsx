"use client";

import React from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import NavBar from "../NavBar";
import MediaRow from "./MediaRow";
import Banner from "./Banner";

interface IMediaData {
  mediaData: any;
}

const CommonLayout = (props: IMediaData) => {
  const { mediaData } = props;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <Head>
        <title>OTT Clone</title>
        {/* TODO: All rest of the component data */}
      </Head>
      <>
        <NavBar />
        <div className="relative pl-4 pb-24 lg:space-y-24">
          <Banner medias={mediaData.length ? mediaData[0].media : []} />
          <section className="md:space-y-16">
            {mediaData.length
              ? mediaData.map((item: any) => (
                  <MediaRow
                    key={item.title}
                    title={item.title}
                    medias={item.media}
                  />
                ))
              : null}
          </section>
        </div>
      </>
    </motion.div>
  );
};

export default CommonLayout;
