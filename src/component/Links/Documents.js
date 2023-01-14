import { useState } from "react";
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
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import { SpecialZoomLevel } from "@react-pdf-viewer/core";
import Loader from "../Loader";

export default function Documents({
  data,
  linkHandler,
  isClosed,
  theme,
  mode,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [pdfWidth, setPdfWidth] = useState(0);
  const [loader, setLoader] = useState(1);

  const pageNavigationPluginInstance = pageNavigationPlugin();
  const { CurrentPageLabel } = pageNavigationPluginInstance;
  const zoomPluginInstance = zoomPlugin();
  const { Zoom } = zoomPluginInstance;

  const pdf_one = document.querySelector(".pdf");
  const pdf_page = document.querySelectorAll(".pdf .rpv-core__inner-page");

  const document_container = document.querySelector(".document_container");
  const rpvcore__viewer = document.querySelector(".rpv-core__viewer");

  const pdfHolder_one = document.querySelector(".pdf .rpv-core__inner-pages");

  const pdf_layer = document.querySelector(
    ".pdf .rpv-core__inner-page .rpv-core__page-layer"
  );

  let paf_container = document.querySelector(
    ".rpv-core__inner-pages--horizontal div"
  );

  const pdfSettings = () => {
    if (pdf_page) {
      const pdfElements = Array.prototype.slice.call(pdf_page);

      pdfElements.map((pdfPage, index) => {
        const arialabel = pdfPage.getAttribute("aria-label");

        const currentItem = parseInt(arialabel.split(" ")[1]) - 1;

        pdfPage.style.transform = `translateX(${
          pdfPage.offsetWidth * currentItem
        }px)`;

        return pdfPage;
      });
    }
  };

  if (pdf_layer && rpvcore__viewer) {
    const pdfElements = Array.prototype.slice.call(pdf_page);
    paf_container.style.width = `${pdfElements[0].offsetWidth * totalPage}px`;

    if (!(pdf_page === undefined)) {
      rpvcore__viewer.style.height = `${pdf_layer.offsetHeight}px`;
      rpvcore__viewer.style.height = `${pdf_layer.offsetHeight}px`;
      pdf_one.style.height = `${pdf_layer.offsetHeight}px`;
    }

    pdfSettings();
  }

  const goToNextPage = () => {
    if (pdfHolder_one && !(currentPage === totalPage)) {
      if (currentPage === 1) {
        const pdfHeight = pdf_page[0].offsetWidth;
        pdfHolder_one.scrollLeft = currentPage * pdfHeight;
        setPdfWidth(pdfHeight);
        setCurrentPage(currentPage + 1);
      } else {
        pdfHolder_one.scrollLeft = currentPage * pdfWidth;
        pdfSettings();
        setCurrentPage(currentPage + 1);
      }
    }
  };

  const goToPreviousPage = () => {
    if (pdfHolder_one && !(currentPage === 1)) {
      pdfHolder_one.scrollLeft = (currentPage - 2) * pdfWidth;
      pdfSettings();
      setCurrentPage(currentPage - 1);
    }
  };

  const totalPageNumber = (totalPage) => {
    setTotalPage(totalPage);
  };

  const zoom = (zoom) => {
    setTimeout(() => {
      zoom.onZoom(SpecialZoomLevel.PageWidth);
      if (!(pdf_one === null) && pdf_one.style.height) {
        const footer = document.querySelector(".footer");
        const card_section = document.querySelector(".card-section");
        const primary_container = document.querySelector(".primary_container");
        setLoader(loader + 1);
        if (card_section) {
          if (card_section.offsetHeight < 410) {
            footer.classList.remove("footer_bottom");
            primary_container.classList.remove("h-100vh");
          }
        }
        setTimeout(() => {
          document_container.style.height = "100%";
        }, 1000);
      }
    }, 1000);
  };

  return (
    <>
      {mode ? (
        <div
          className="mt-4 h-100 document_container p-relative"
          style={{ height: "300px" }}
        >
          <CSSTransition
            in={true}
            appear={true}
            timeout={600}
            classNames={"document_height_up"}
          >
            <div>
              {theme === "riorpad" || theme === "buwayne" ? (
                <div className="pdfSliderDirect">
                  <NeumorphicContainer
                    containerclassName="round-25 d-flex"
                    subcontainerclasses="border-none mt-0 p-2 round-25 w-100 p-relative"
                  >
                    <div className="document slider border-none">
                      {!(loader > 1) ? (
                        <div className="order-2">
                          <Loader mode="document" />
                        </div>
                      ) : (
                        ""
                      )}
                      <div className={isClosed ? "order-2 pdf" : "pdf"}>
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js">
                          <div className="pdf_container">
                            <Viewer
                              fileUrl={data.URL}
                              scrollMode={ScrollMode.Horizontal}
                              enablePaging={true}
                              horizontal={true}
                              plugins={[
                                pageNavigationPluginInstance,
                                zoomPluginInstance,
                              ]}
                            />
                          </div>
                        </Worker>

                        <button
                          className="prev-page"
                          onClick={() => goToPreviousPage()}
                        >
                          <NeumorphicContainer
                            containerclassName="document_neumorphic_page_btn cursor_pointer d-flex justify-content-center align-items-center"
                            subcontainerclasses="p-2 d-flex justify-content-center align-items-center"
                          >
                            <FontAwesomeIcon icon={faChevronLeft} />
                          </NeumorphicContainer>
                        </button>
                        <button
                          className="next-page"
                          onClick={() => goToNextPage()}
                        >
                          <NeumorphicContainer
                            containerclassName="document_neumorphic_page_btn cursor_pointer d-flex justify-content-center align-items-center"
                            subcontainerclasses="p-2 d-flex justify-content-center align-items-center"
                          >
                            <FontAwesomeIcon icon={faChevronRight} />
                          </NeumorphicContainer>
                        </button>
                        <Zoom>
                          {(RenderZoomProps) => {
                            zoom(RenderZoomProps);
                          }}
                        </Zoom>
                      </div>
                      <CurrentPageLabel>
                        {(RenderCurrentPageLabelProps) =>
                          totalPageNumber(
                            RenderCurrentPageLabelProps.numberOfPages
                          )
                        }
                      </CurrentPageLabel>
                    </div>
                  </NeumorphicContainer>
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
                </div>
              ) : (
                <div className="p-relative pdfSliderDirect">
                  <div className="document slider">
                    {!(loader > 1) ? (
                      <div className="order-2">
                        <Loader mode="document" theme={theme} />
                      </div>
                    ) : (
                      ""
                    )}
                    <div className={isClosed ? "order-2 pdf" : "pdf"}>
                      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js">
                        <div className="pdf_container">
                          <Viewer
                            fileUrl={data.URL}
                            scrollMode={ScrollMode.Horizontal}
                            enablePaging={true}
                            horizontal={true}
                            plugins={[
                              pageNavigationPluginInstance,
                              zoomPluginInstance,
                            ]}
                          />
                        </div>
                      </Worker>

                      <button
                        className="prev-page documentPage_btn"
                        onClick={() => goToPreviousPage()}
                      >
                        <FontAwesomeIcon icon={faChevronLeft} />
                      </button>
                      <button
                        className="next-page documentPage_btn"
                        onClick={() => goToNextPage()}
                      >
                        <FontAwesomeIcon icon={faChevronRight} />
                      </button>

                      <Zoom>
                        {(RenderZoomProps) => {
                          zoom(RenderZoomProps);
                        }}
                      </Zoom>
                    </div>

                    <CurrentPageLabel>
                      {(RenderCurrentPageLabelProps) =>
                        totalPageNumber(
                          RenderCurrentPageLabelProps.numberOfPages
                        )
                      }
                    </CurrentPageLabel>
                  </div>
                  {data.Title.trim() ? (
                    <div className="swiper-content border-none round-0 mt-3">
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
                </div>
              )}
            </div>
          </CSSTransition>
        </div>
      ) : (
        <div
          className="mt-4 h-100 overflow-hidden slider document_container p-relative"
          style={{ height: "300px" }}
        >
          <CSSTransition
            in={true}
            appear={true}
            timeout={600}
            classNames={"document_height_up"}
          >
            <div>
              {theme === "riorpad" || theme === "buwayne" ? (
                <>
                  <NeumorphicContainer
                    containerclassName="round-25 d-flex"
                    subcontainerclasses="border-none mt-0 p-2 round-25 w-100 p-relative"
                  >
                    <div className="document slider border-none">
                      {!(loader > 2) ? (
                        <div className="order-2">
                          <Loader mode="document" />
                        </div>
                      ) : (
                        ""
                      )}
                      <div className={isClosed ? "order-2 pdf" : "pdf"}>
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js">
                          <div className="pdf_container">
                            <Viewer
                              fileUrl={data.URL}
                              scrollMode={ScrollMode.Horizontal}
                              enablePaging={true}
                              horizontal={true}
                              plugins={[
                                pageNavigationPluginInstance,
                                zoomPluginInstance,
                              ]}
                            />
                          </div>
                        </Worker>

                        <button
                          className="prev-page"
                          onClick={() => goToPreviousPage()}
                        >
                          <NeumorphicContainer
                            containerclassName="document_neumorphic_page_btn cursor_pointer d-flex justify-content-center align-items-center"
                            subcontainerclasses="p-2 d-flex justify-content-center align-items-center"
                          >
                            <FontAwesomeIcon icon={faChevronLeft} />
                          </NeumorphicContainer>
                        </button>
                        <button
                          className="next-page"
                          onClick={() => goToNextPage()}
                        >
                          <NeumorphicContainer
                            containerclassName="document_neumorphic_page_btn cursor_pointer d-flex justify-content-center align-items-center"
                            subcontainerclasses="p-2 d-flex justify-content-center align-items-center"
                          >
                            <FontAwesomeIcon icon={faChevronRight} />
                          </NeumorphicContainer>
                        </button>
                        <Zoom>
                          {(RenderZoomProps) => {
                            zoom(RenderZoomProps);
                          }}
                        </Zoom>
                      </div>
                      <CurrentPageLabel>
                        {(RenderCurrentPageLabelProps) =>
                          totalPageNumber(
                            RenderCurrentPageLabelProps.numberOfPages
                          )
                        }
                      </CurrentPageLabel>
                    </div>
                    {data.URL && data.URL.trim() ? (
                      <div className="download mt-3">
                        <NeumorphicContainer
                          containerclassName="p-1px d-flex round-25"
                          subcontainerclasses="border-none mt-0 round-25 w-100 download_btn"
                        >
                          <a href={data.URL} target="_black">
                            Download
                          </a>
                        </NeumorphicContainer>
                      </div>
                    ) : (
                      ""
                    )}
                  </NeumorphicContainer>

                  <div className="d-flex justify-content-center mt-2">
                    <CloseBtn linkHandler={linkHandler} mode="neuMorphism" />
                  </div>
                </>
              ) : (
                <div className="p-relative">
                  <div className="document slider">
                    {!(loader > 2) ? (
                      <div className="order-2">
                        <Loader mode="document" />
                      </div>
                    ) : (
                      ""
                    )}
                    <div className={isClosed ? "order-2 pdf" : "pdf"}>
                      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js">
                        <div className="pdf_container">
                          <Viewer
                            fileUrl={data.URL}
                            scrollMode={ScrollMode.Horizontal}
                            enablePaging={true}
                            horizontal={true}
                            plugins={[
                              pageNavigationPluginInstance,
                              zoomPluginInstance,
                            ]}
                          />
                        </div>
                      </Worker>

                      <button
                        className="prev-page documentPage_btn"
                        onClick={() => goToPreviousPage()}
                      >
                        <FontAwesomeIcon icon={faChevronLeft} />
                      </button>
                      <button
                        className="next-page documentPage_btn"
                        onClick={() => goToNextPage()}
                      >
                        <FontAwesomeIcon icon={faChevronRight} />
                      </button>

                      <Zoom>
                        {(RenderZoomProps) => {
                          zoom(RenderZoomProps);
                        }}
                      </Zoom>
                    </div>

                    <CurrentPageLabel>
                      {(RenderCurrentPageLabelProps) =>
                        totalPageNumber(
                          RenderCurrentPageLabelProps.numberOfPages
                        )
                      }
                    </CurrentPageLabel>

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
                    {data.URL && data.URL.trim() ? (
                      <div
                        className={
                          isClosed
                            ? `download order-3 pb-3 ${
                                isClosed === "etyne" ? "d-none" : ""
                              }`
                            : "download pb-3"
                        }
                      >
                        <a
                          href={data.URL}
                          download={data.URL}
                          className="download_btn"
                        >
                          Download
                        </a>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  {!isClosed ? <CloseBtn linkHandler={linkHandler} /> : ""}
                </div>
              )}
            </div>
          </CSSTransition>
        </div>
      )}
    </>
  );
}
