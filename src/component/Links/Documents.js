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
import Loader from "../Loader";
import NeumorphicContainer from "../NeumorphicContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
// Core viewer
// import { Viewer } from "@react-pdf-viewer/core";

// Plugins
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Import styles
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import "@react-pdf-viewer/default-layout/lib/styles/index.css";

// Create new plugin instance
// const defaultLayoutPluginInstance = defaultLayoutPlugin();

export default function Documents({ data, linkHandler, isClosed, mode }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [test, setTest] = useState(0);
  const [testAmou, setTestAmou] = useState(0);

  const pageNavigationPluginInstance = pageNavigationPlugin();

  const { CurrentPageLabel } = pageNavigationPluginInstance;

  const pdfHolder = document.querySelector(".rpv-core__inner-pages");
  const pdf = document.querySelectorAll(".rpv-core__inner-page");
  const pdftest = document.querySelectorAll(".TEST .rpv-core__inner-page");
  const testpdf1 = document.querySelector(".testpdf .rpv-core__inner-pages");
  const testpdf = document.querySelector(".testpdf");
  const testpdf2 = document.querySelector(".TEST2");
  const core__inner = document.querySelectorAll(".TEST2 .rpv-core__inner-page");
  const testpdf3 = document.querySelector(".test3");
  const rpvcore__viewer = document.querySelector(".rpv-core__viewer");
  const rpvcore__docloading = document.querySelector(
    ".TEST2 .rpv-core__doc-loading"
  );

  const core__innerpages = document.querySelector(
    ".TEST2 .rpv-core__inner-pages"
  );
  const testpdf6 = document.querySelector(
    ".TEST2 .rpv-core__inner-page .rpv-core__page-layer"
  );

  let rpvcore__innerpages = document.querySelector(
    ".rpv-core__inner-pages--horizontal div"
  );
  // if (testpdf1) {
  //   testpdf.classList.add("d-none");
  //   testpdf3.style.height = "576px";
  //   testpdf2.style.height = "700px";
  // }

  // if (rpvcore__innerpages && !test) {
  //   const rpvcore__viewer = document.querySelector(".rpv-core__viewer");
  //   // rpvcore__innerpages.style.width = "18040px";
  //   if (totalPage === 1) {
  //     rpvcore__viewer.style.height = `${rpvcore__innerpages.offsetWidth}px`;
  //   } else if (totalPage === 2) {
  //     rpvcore__viewer.style.height = `${
  //       rpvcore__innerpages.offsetWidth / totalPage
  //     }px`;
  //   } else {
  //     rpvcore__viewer.style.height = `${
  //       (rpvcore__innerpages.offsetWidth / totalPage) * 1.5
  //     }px`;
  //   }
  //   setTest(1);
  // }
  // if (
  //   !(rpvcore__docloading === undefined) &&
  //   !(rpvcore__docloading === null) &&
  //   rpvcore__docloading === true
  // ) {
  //   setTestAmou(rpvcore__docloading.offsetWidth);
  //   const array1 = Array.prototype.slice.call(core__inner);
  //   array1.map((value, index) => {
  //     value.style.width = `${testAmou}px`;

  //     return value;
  //   });
  // }
  const testfun = () => {
    const array1 = Array.prototype.slice.call(core__inner);
    array1.map((value, index) => {
      const tesaat =
        parseInt(value.getAttribute("aria-label").split(" ")[1]) - 1;
      value.style.transform = `translateX(${value.offsetWidth * tesaat}px)`;
      value.style.width = `${value.offsetWidth}px`;

      return value;
    });
  };
  if (testpdf3 && testpdf6 && rpvcore__viewer) {
    const array1 = Array.prototype.slice.call(core__inner);
    rpvcore__innerpages.style.width = `${array1[0].offsetWidth * totalPage}px`;

    if (!(core__inner === undefined)) {
      testpdf3.style.height = "100%";
      rpvcore__viewer.style.height = `${testpdf6.offsetHeight}px`;
      rpvcore__viewer.style.height = `${testpdf6.offsetHeight}px`;
      testpdf2.style.height = `${testpdf6.offsetHeight}px`;
    }
    testfun();
  }

  const goToNextPage = () => {
    if (core__innerpages && !(currentPage === totalPage)) {
      if (currentPage === 1) {
        core__innerpages.scrollLeft = 0;
        const pdfNum = core__inner[0].offsetWidth;
        core__innerpages.scrollLeft = currentPage * pdfNum;
        setCurrentPage(currentPage + 1);
        setTestAmou(pdfNum);
      } else {
        core__innerpages.scrollLeft = currentPage * testAmou;
        console.log(core__innerpages.scrollLeft);
        setScrollLeft(currentPage * testAmou);
        setCurrentPage(currentPage + 1);
        testfun();
      }
    }
  };

  const goToPreviousPage = () => {
    if (core__innerpages && !(currentPage === 1)) {
      core__innerpages.scrollLeft = (currentPage - 2) * testAmou;
      setCurrentPage(currentPage - 1);
      setScrollLeft(currentPage * testAmou);
      testfun();
    }
  };

  const totalPageNumber = (pageNum) => {
    setTotalPage(pageNum);
  };

  return (
    <>
      <div
        className="mt-4 h-100 overflow-hidden slider test3"
        style={{ height: "300px" }}
      >
        <CSSTransition
          in={true}
          appear={true}
          timeout={600}
          classNames={"document_height_up"}
        >
          <div className="p-relative">
            {core__inner === undefined ? <Loader mode="document" /> : ""}
            <div className="TEST2">
              <div className="" style={{ height: "10001px" }}>
                <Viewer
                  fileUrl={data.URL}
                  scrollMode={ScrollMode.Horizontal}
                  enablePaging={true}
                  horizontal={true}
                  plugins={[pageNavigationPluginInstance]}
                />
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js">
                  <div
                    className="testpdf"
                    style={!pdfHolder ? { height: "300px" } : {}}
                  >
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
            </div>
            <div className="document slider border-none">
              {mode === "riorpad" || mode === "buwayne" ? (
                <>
                  <NeumorphicContainer
                    containerclassName="round-25 d-flex"
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
                      <CurrentPageLabel>
                        {(RenderCurrentPageLabelProps) =>
                          totalPageNumber(
                            RenderCurrentPageLabelProps.numberOfPages
                          )
                        }
                      </CurrentPageLabel>
                    </div>
                  </div>
                  {data.Title.trim() ? (
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
                  ) : (
                    ""
                  )}

                  <div
                    className={
                      isClosed
                        ? `download order-3 ${
                            isClosed === "etyne" ? "d-none" : ""
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
          </div>
        </CSSTransition>
      </div>
    </>
  );
}
