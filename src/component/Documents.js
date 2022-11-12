import { useState } from "react";
import downloadImage from "../assets/images/download.png";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";

import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import { ScrollMode } from "@react-pdf-viewer/core";

export default function Documents({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const pageNavigationPluginInstance = pageNavigationPlugin();

  const { CurrentPageLabel } = pageNavigationPluginInstance;

  const pdfHolder = document.querySelector(".rpv-core__inner-pages");
  const pdf = document.querySelectorAll(".rpv-core__inner-page");

  const goToNextPage = (currentPage, totalPage) => {
    if (pdfHolder && !(currentPage === totalPage)) {
      const pdfNum = pdf[0].style.width.split("px")[0];
      const pdfLeft = pdfHolder.scrollLeft;
      pdfHolder.scrollLeft = pdfLeft + parseFloat(pdfNum);
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = (currentPage) => {
    if (pdfHolder && !(currentPage === 1)) {
      const pdfNum = pdf[0].style.width.split("px")[0];
      if (currentPage === 2) {
        pdfHolder.scrollLeft = parseFloat(pdfNum);
      }
      const pdfLeft = pdfHolder.scrollLeft;
      pdfHolder.scrollLeft = pdfLeft - parseFloat(pdfNum);
      setCurrentPage(currentPage - 1);
    }
  };
  const totalPageNumber = (pageNum) => {
    setTotalPage(pageNum);
  };

  return (
    <>
      <div className="document mt-4 slider">
        <div className="pdf">
          <button
            id="prev-page"
            onClick={() => {
              goToPreviousPage(currentPage);
            }}
          >
            ❮
          </button>
          <button
            id="next-page"
            onClick={() => {
              goToNextPage(currentPage, totalPage);
            }}
          >
            ❯
          </button>

          <CurrentPageLabel>
            {(RenderCurrentPageLabelProps) =>
              totalPageNumber(RenderCurrentPageLabelProps.numberOfPages)
            }
          </CurrentPageLabel>

          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js">
            <div style={!pdfHolder ? { height: "300px" } : {}}>
              <Viewer
                fileUrl={data.URL}
                scrollMode={ScrollMode.Horizontal}
                enablePaging={true}
                horizontal={true}
                plugins={[pageNavigationPluginInstance]}
              />
            </div>
          </Worker>
        </div>
        <div className="swiper-content border-top-0">
          <h4>{data.Name}</h4>
          <a className="download-btn" href={data.URL} download={data.URL}>
            <img className="img-fluid" src={downloadImage} alt="" />
          </a>
        </div>
      </div>
    </>
  );
}