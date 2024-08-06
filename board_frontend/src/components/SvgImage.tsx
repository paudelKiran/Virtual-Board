import React from "react";

const SvgImage = ({
  fileName,
  click,
  extraClass,
}: {
  fileName: string;
  click?: any;
  extraClass?: string;
}) => {
  return (
    <>
      {click ? (
        <div
          className={`flex svgCover ${extraClass}`}
          id={fileName}
          onClick={(e) => {
            click(e, fileName);
          }}
        >
          <img
            src={`/icons/${fileName}.svg`}
            alt={fileName}
            className="svgImg"
          />
        </div>
      ) : (
        <div className={`flex svgCover ${extraClass}`} id={fileName}>
          <img
            src={`/icons/${fileName}.svg`}
            alt={fileName}
            className="svgImg"
          />
        </div>
      )}
    </>
  );
};

export default SvgImage;
