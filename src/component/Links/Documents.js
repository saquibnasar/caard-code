import { useState } from "react";
// import downloadImage from "../";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import { ScrollMode } from "@react-pdf-viewer/core";
import CloseBtn from "./CloseBtn";
import { CSSTransition } from "react-transition-group";
import TextLoader from "../TextLoader";
import NeumorphicContainer from "../NeumorphicContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function Documents({ data, linkHandler, isClosed, mode }) {
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
      <div className="mt-4 h-100 overflow-hidden slider">
        <CSSTransition
          in={true}
          appear={true}
          timeout={600}
          classNames={"document_height_up"}
        >
          <div className="document slider border-none">
            {mode === "neuMorphism_light" || mode === "neuMorphism_dark" ? (
              <>
                <NeumorphicContainer
                  containerclassName="p-2 round-25 d-flex"
                  subcontainerclasses="border-none mt-0 p-2 round-25 w-100"
                >
                  <div className="pdf">
                    <button
                      className="prev-page"
                      onClick={() => {
                        goToPreviousPage(currentPage);
                      }}
                    >
                      <NeumorphicContainer
                        containerclassName="document_neumorphic_page_btn d-flex justify-content-center align-items-center"
                        subcontainerclasses="p-2 d-flex justify-content-center align-items-center"
                      >
                        <FontAwesomeIcon icon={faChevronLeft} />
                      </NeumorphicContainer>
                    </button>
                    <button
                      className="next-page"
                      onClick={() => {
                        goToNextPage(currentPage, totalPage);
                      }}
                    >
                      <NeumorphicContainer
                        containerclassName="document_neumorphic_page_btn d-flex justify-content-center align-items-center"
                        subcontainerclasses="p-2 d-flex justify-content-center align-items-center"
                      >
                        <FontAwesomeIcon icon={faChevronRight} />
                      </NeumorphicContainer>
                    </button>

                    <CurrentPageLabel>
                      {(RenderCurrentPageLabelProps) =>
                        totalPageNumber(
                          RenderCurrentPageLabelProps.numberOfPages
                        )
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
                </NeumorphicContainer>
                <div className="d-flex justify-content-center mt-2">
                  <CloseBtn linkHandler={linkHandler} mode="neuMorphism" />
                </div>
              </>
            ) : (
              <>
                <div className={isClosed ? "order-2" : ""}>
                  <div className="pdf">
                    <button
                      className="prev-page documentPage_btn"
                      onClick={() => {
                        goToPreviousPage(currentPage);
                      }}
                    >
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button
                      className="next-page documentPage_btn"
                      onClick={() => {
                        goToNextPage(currentPage, totalPage);
                      }}
                    >
                      <FontAwesomeIcon icon={faChevronRight} />
                    </button>

                    <CurrentPageLabel>
                      {(RenderCurrentPageLabelProps) =>
                        totalPageNumber(
                          RenderCurrentPageLabelProps.numberOfPages
                        )
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
                </div>
                <div
                  className={
                    isClosed
                      ? "swiper-content border-none round-0 order-1"
                      : "swiper-content border-none round-0"
                  }
                >
                  <p
                    className={isClosed ? "slider_bottom-para" : ""}
                    id="slider__para"
                  >
                    <TextLoader
                      text={data.Title}
                      id="slider__para"
                      characterNumber="95"
                      btnClass="slider__btn"
                    />
                  </p>
                </div>
                <div
                  className={
                    isClosed
                      ? `download order-3 ${
                          isClosed === "seven" ? "d-none" : ""
                        }`
                      : "download"
                  }
                >
                  <a
                    href={data.URL}
                    download={data.URL}
                    className="download_btn"
                  >
                    Donwnload
                  </a>
                </div>
                {!isClosed ? <CloseBtn linkHandler={linkHandler} /> : ""}
              </>
            )}
          </div>
        </CSSTransition>
      </div>
    </>
  );
}
