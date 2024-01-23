"use client";

import React from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import NavBar from "../NavBar";

const CommonLayout = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <Head>
        <title>WatchFlix</title>
        {/* TODO: All rest of the component data */}
      </Head>
      <>
        <NavBar />
        <div className="relative pl-4 pb-24 lg:space-y-24"></div>
      </>
    </motion.div>
  );
};

export default CommonLayout;
