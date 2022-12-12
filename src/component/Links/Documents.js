import { useState } from "react";
// import downloadImage from "../";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import { ScrollMode } from "@react-pdf-viewer/core";
import CloseBtn from "./CloseBtn";
import { CSSTransition } from "react-transition-group";
export default function Documents({ data, linkHandler }) {
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

  return (
    <>
      <div className="mt-4 h-100 overflow-hidden">
        <CSSTransition
          in={true}
          appear={true}
          timeout={600}
          classNames={"document_height_up"}
        >
          <div className="document slider border-none">
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
            <a
              href={data.URL}
              download={data.URL}
              className="swiper-content border-top-0"
            >
              Donwnload
            </a>
            <CloseBtn linkHandler={linkHandler} />
          </div>
        </CSSTransition>
      </div>
    </>
  );
}
