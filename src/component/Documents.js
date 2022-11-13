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
  const [scrollLeft, setScrollLeft] = useState(1);

  const pageNavigationPluginInstance = pageNavigationPlugin();

  const { CurrentPageLabel } = pageNavigationPluginInstance;

  const pdfHolder = document.querySelector(".rpv-core__inner-pages");
  const pdf = document.querySelectorAll(".rpv-core__inner-page");

  const goToNextPage = (currentPage, totalPage) => {
    if (pdfHolder && !(currentPage === totalPage)) {
      const pdfNum = pdf[0].style.width.split("px")[0];
      pdfHolder.scrollLeft = currentPage * parseFloat(pdfNum);
      setCurrentPage(currentPage + 1);
      setScrollLeft(currentPage * parseFloat(pdfNum));
    }
  };

  const goToPreviousPage = (currentPage) => {
    if (pdfHolder && !(currentPage === 1)) {
      const pdfNum = pdf[0].style.width.split("px")[0];
      pdfHolder.scrollLeft = scrollLeft - parseFloat(pdfNum);
      setScrollLeft(scrollLeft - parseFloat(pdfNum));
      setCurrentPage(currentPage - 1);
    }
  };

  const totalPageNumber = (pageNum) => {
    setTotalPage(pageNum);
  };

  // document.addEventListener("touchstart", handleTouchStart, false);
  // document.addEventListener("touchmove", handleTouchMove, false);

  // var xDown = null;
  // var yDown = null;

  // function handleTouchStart(evt) {
  //   xDown = evt.touches[0].clientX;
  //   yDown = evt.touches[0].clientY;
  // }

  // function handleTouchMove(evt) {
  //   if (!xDown || !yDown) {
  //     return;
  //   }

  //   var xUp = evt.touches[0].clientX;
  //   var yUp = evt.touches[0].clientY;

  //   var xDiff = xDown - xUp;
  //   var yDiff = yDown - yUp;

  //   if (Math.abs(xDiff) > Math.abs(yDiff)) {
  //     /*most significant*/
  //     if (xDiff > 0) {
  //       /* left swipe */
  //       // alert("left swipe");
  //       goToNextPage(currentPage, totalPage);
  //     } else {
  //       /* right swipe */
  //       goToNextPage(currentPage, totalPage);
  //     }
  //   } else {
  //     if (yDiff > 0) {
  //       /* up swipe */
  //     } else {
  //       /* down swipe */
  //     }
  //   }
  //   /* reset values */
  //   xDown = null;
  //   yDown = null;
  // }

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
