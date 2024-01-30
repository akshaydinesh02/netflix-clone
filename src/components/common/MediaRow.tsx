"use client";

import React from "react";
import MediaItem from "./MediaItem";

interface IMediaRow {
  title: string;
  medias: any;
}

const MediaRow = (props: IMediaRow) => {
  const { title, medias } = props;
  return (
    <div className="h-40 space-y-0.5 md:space-y-2 px-4">
      <h2 className="cursor-pointer text-sm font-semibold text-gray-300 transition-colors duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
      <div className="group relative md:-ml-2">
        <div className="flex item-center scrollbar-hide space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2">
          {medias.length
            ? medias
                .filter(
                  (item: any) =>
                    item?.backdrop_path !== null && item?.poster_path !== null
                )
                .map((item: any) => (
                  <MediaItem title={title} key={item.id} item={item} />
                ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default MediaRow;
