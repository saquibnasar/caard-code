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

export default function Documents({ data, linkHandler, isClosed, mode }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [pdfWidth, setPdfWidth] = useState(0);

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
  const canvas = document.querySelectorAll(
    ".rpv-core__inner-page .rpv-core__canvas-layer canvas"
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

        // if (!(pdf_one === null) && pdf_one.offsetHeight === 300) {
        //   pdfPage.style.height = `300px`;
        //   const pdfPage_layer = pdfPage.querySelector(".rpv-core__page-layer");
        //   const pdfPage_layer_canvas = pdfPage_layer.querySelector(
        //     ".rpv-core__canvas-layer"
        //   );
        //   const canvas = pdfPage_layer_canvas.querySelector("canvas");

        //   pdfPage_layer.style.height = `300px`;
        //   if (pdfPage_layer_canvas) {
        //     pdfPage_layer_canvas.style.height = `300px`;
        //     if (pdfPage_layer_canvas) {
        //       canvas.style.height = `300px`;
        //     }
        //   }
        // }

        return pdfPage;
      });
    }
  };

  if (pdf_layer && rpvcore__viewer) {
    const pdfElements = Array.prototype.slice.call(pdf_page);
    paf_container.style.width = `${pdfElements[0].offsetWidth * totalPage}px`;

    if (!(pdf_page === undefined)) {
      document_container.style.height = "100%";
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

  if (canvas) {
    for (const canva of canvas) {
      canva.getContext("2d", { willReadFrequently: true });
    }
  }

  console.log(mode);

  return (
    <>
      <div className="mt-4 h-100 overflow-hidden slider document_container p-relative">
        <CSSTransition
          in={true}
          appear={true}
          timeout={600}
          classNames={"document_height_up"}
        >
          <div>
            {mode === "riorpad" || mode === "buwayne" ? (
              <>
                <NeumorphicContainer
                  containerclassName="round-25 d-flex"
                  subcontainerclasses="border-none mt-0 p-2 round-25 w-100 p-relative"
                >
                  <div className="document slider border-none">
                    <div className={isClosed ? "order-2 pdf" : "pdf"}>
                      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js">
                        <div
                          className="pdf_container"
                          style={{ height: "300px" }}
                        >
                          <Viewer
                            fileUrl={data.URL}
                            plugins={[zoomPluginInstance]}
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
                    </div>
                    <Zoom>
                      {(RenderZoomProps) => {
                        RenderZoomProps.onZoom(SpecialZoomLevel.PageWidth);
                      }}
                    </Zoom>
                    <CurrentPageLabel>
                      {(RenderCurrentPageLabelProps) =>
                        totalPageNumber(
                          RenderCurrentPageLabelProps.numberOfPages
                        )
                      }
                    </CurrentPageLabel>
                  </div>
                </NeumorphicContainer>

                <div className="d-flex justify-content-center mt-2">
                  <CloseBtn linkHandler={linkHandler} mode="neuMorphism" />
                </div>
              </>
            ) : (
              <div className="p-relative">
                <div className="document slider border-none">
                  <div className={isClosed ? "order-2 pdf" : "pdf"}>
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js">
                      <div
                        className="pdf_container"
                        style={{ height: "300px" }}
                      >
                        <Viewer
                          fileUrl={data.URL}
                          plugins={[zoomPluginInstance]}
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
                        RenderZoomProps.onZoom(SpecialZoomLevel.PageWidth);
                      }}
                    </Zoom>
                  </div>
                  <CurrentPageLabel>
                    {(RenderCurrentPageLabelProps) =>
                      totalPageNumber(RenderCurrentPageLabelProps.numberOfPages)
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
                </div>
              </div>
            )}
          </div>
        </CSSTransition>
      </div>
    </>
  );
}

// import { useState } from "react";
// // import downloadImage from "../";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import { Worker } from "@react-pdf-viewer/core";
// import { Viewer } from "@react-pdf-viewer/core";
// import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
// import { ScrollMode } from "@react-pdf-viewer/core";
// import CloseBtn from "./CloseBtn";
// import { CSSTransition } from "react-transition-group";
// import TextLoader from "../TextLoader";
// import Loader from "../Loader";
// import NeumorphicContainer from "../NeumorphicContainer";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
// import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
// import { zoomPlugin } from "@react-pdf-viewer/zoom";
// import { SpecialZoomLevel } from "@react-pdf-viewer/core";
// import { RenderZoomProps } from "@react-pdf-viewer/zoom";
// export default function Documents({ data, linkHandler, isClosed, mode }) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPage, setTotalPage] = useState(0);
//   const [checkWidth, setCheckWidth] = useState(435);
//   const [pdfWidth, setPdfWidth] = useState(0);
//   const [checkNum, setCheckNum] = useState(0);

//   const pageNavigationPluginInstance = pageNavigationPlugin();

//   const { GoToNextPage, GoToPreviousPage, CurrentPageLabel } =
//     pageNavigationPluginInstance;
//   const zoomPluginInstance = zoomPlugin();
//   const { Zoom } = zoomPluginInstance;
//   // const { CurrentPageLabel } = pageNavigationPluginInstance;

//   const pdf_one = document.querySelector(".pdf_one");
//   const pdf_two = document.querySelector(".pdf_two");
//   const pdf_page = document.querySelectorAll(".pdf_one .rpv-core__inner-page");
//   const pdf_page_two = document.querySelectorAll(
//     ".pdf_two .rpv-core__inner-page"
//   );
//   const document_container = document.querySelector(".document_container");
//   const rpvcore__viewer = document.querySelector(".rpv-core__viewer");
//   const rpvcore__viewer_two = document.querySelector(
//     ".pdf_two .rpv-core__viewer"
//   );

//   const pdfHolder_one = document.querySelector(
//     ".pdf_one .rpv-core__inner-pages"
//   );
//   const pdfHolder_two = document.querySelector(
//     ".pdf_two .rpv-core__inner-pages"
//   );

//   const pdf_layer = document.querySelector(
//     ".pdf_one .rpv-core__inner-page .rpv-core__page-layer"
//   );
//   const pdf_layer_two = document.querySelector(
//     ".pdf_two .rpv-core__inner-page .rpv-core__page-layer"
//   );

//   let paf_container = document.querySelector(
//     ".rpv-core__inner-pages--horizontal div"
//   );
//   let paf_container_two = document.querySelector(
//     ".pdf_two .rpv-core__inner-pages--horizontal div"
//   );

//   const pdfSettings = () => {
//     if (pdf_page) {
//       const pdfElements = Array.prototype.slice.call(pdf_page);

//       pdfElements.map((pdfPage, index) => {
//         const arialabel = pdfPage.getAttribute("aria-label");

//         const currentItem = parseInt(arialabel.split(" ")[1]) - 1;

//         pdfPage.style.transform = `translateX(${
//           pdfPage.offsetWidth * currentItem
//         }px)`;
//         pdfPage.style.width = `${pdfPage.offsetWidth}px`;

//         if (
//           (!(pdf_one === null) && pdf_one.offsetHeight === 300) ||
//           (!(pdf_two === null) && pdf_two.offsetHeight === 300)
//         ) {
//           pdfPage.style.height = `300px`;
//           const pdfPage_layer = pdfPage.querySelector(".rpv-core__page-layer");
//           const pdfPage_layer_canvas = pdfPage_layer.querySelector(
//             ".rpv-core__canvas-layer"
//           );
//           const canvas = pdfPage_layer_canvas.querySelector("canvas");

//           pdfPage_layer.style.height = `300px`;
//           if (pdfPage_layer_canvas) {
//             pdfPage_layer_canvas.style.height = `300px`;
//             if (pdfPage_layer_canvas) {
//               canvas.style.height = `300px`;
//             }
//           }
//         }

//         if (currentItem === totalPage - 1) {
//           return currentItem;
//         }
//         return pdfPage;
//       });
//     }
//     if (pdf_page_two) {
//       const pdfElements = Array.prototype.slice.call(pdf_page_two);

//       pdfElements.map((pdfPage, index) => {
//         const arialabel = pdfPage.getAttribute("aria-label");

//         const currentItem = parseInt(arialabel.split(" ")[1]) - 1;

//         pdfPage.style.transform = `translateX(${
//           pdfPage.offsetWidth * currentItem
//         }px)`;
//         pdfPage.style.width = `${pdfPage.offsetWidth}px`;

//         if (!(pdf_two === null) && pdf_two.offsetHeight === 300) {
//           pdfPage.style.height = `300px`;
//           const pdfPage_layer_two = pdfPage.querySelector(
//             ".pdf_two .rpv-core__page-layer"
//           );
//           const pdfPage_layer_canvas_two = pdfPage_layer_two.querySelector(
//             ".pdf_two .rpv-core__canvas-layer"
//           );
//           const canvas_two =
//             pdfPage_layer_canvas_two.querySelector(".pdf_two canvas");

//           pdfPage_layer_two.style.height = `300px`;
//           if (pdfPage_layer_canvas_two) {
//             pdfPage_layer_canvas_two.style.height = `300px`;
//             if (pdfPage_layer_canvas_two) {
//               canvas_two.style.height = `300px`;
//             }
//           }
//         }

//         if (currentItem === totalPage - 1) {
//           return currentItem;
//         }
//         return pdfPage;
//       });
//     }
//   };

//   const changesHappened = () => {
//     if (document_container && pdf_layer && rpvcore__viewer) {
//       const pdfElements = Array.prototype.slice.call(pdf_page);
//       paf_container.style.width = `${
//         pdfElements[0].offsetWidth * totalPage + 390
//       }px`;

//       if (!(pdf_page === undefined)) {
//         if (!(checkNum === 2)) {
//           document_container.style.height = "100%";
//         } else {
//         }
//         if (!(pdf_layer === null) && pdf_layer.offsetHeight < 300) {
//           // rpvcore__viewer.style.height = `300px`;
//           // pdf_one.style.height = `300px`;
//         } else {
//           rpvcore__viewer.style.height = `${pdf_layer.offsetHeight}px`;
//           rpvcore__viewer.style.height = `${pdf_layer.offsetHeight}px`;
//           pdf_one.style.height = `${pdf_layer.offsetHeight}px`;
//         }
//       }

//       pdfSettings();
//     }

//     if (document_container && rpvcore__viewer_two && pdf_layer_two) {
//       const pdfElements = Array.prototype.slice.call(pdf_page_two);

//       paf_container_two.style.width = `${
//         pdfElements[0].offsetWidth * totalPage + 1000
//       }px`;

//       if (!(pdf_page_two === undefined)) {
//         document_container.style.height = "100%";
//         if (!(pdf_layer_two === null) && pdf_layer_two.offsetHeight < 300) {
//           pdf_layer_two.style.height = `300px`;
//           pdf_two.style.height = `300px`;
//         } else {
//           rpvcore__viewer_two.style.height = `${pdf_layer_two.offsetHeight}px`;
//           pdf_two.style.height = `${pdf_layer_two.offsetHeight}px`;
//         }
//       }

//       pdfSettings();
//     }
//   };

//   changesHappened();
//   const goToNextPage = () => {
//     if (pdfHolder_one && !(currentPage === totalPage)) {
//       if (currentPage === 1) {
//         pdfHolder_one.scrollLeft = 0;
//         const pdfNum = pdf_page[0].offsetWidth;
//         pdfHolder_one.scrollLeft = currentPage * pdfNum;
//         setCurrentPage(currentPage + 1);
//         setPdfWidth(pdfNum);
//       } else {
//         pdfSettings();
//         pdfHolder_one.scrollLeft = currentPage * pdfWidth;
//         // setPdfWidth(currentPage * pdfWidth);
//         setCurrentPage(currentPage + 1);
//       }
//     }
//     const pdfHolder_two_next = document.querySelector(
//       ".pdf_two .rpv-core__inner-pages"
//     );

//     if (pdfHolder_two_next && !(currentPage === totalPage)) {
//       if (currentPage === 1) {
//         const pdf_page_two_two = document.querySelectorAll(
//           ".pdf_two .rpv-core__inner-page"
//         );

//         pdfHolder_two_next.scrollLeft = 0;

//         const pdfNum = pdf_page_two_two[0].offsetWidth;
//         pdfHolder_two_next.scrollLeft = currentPage * pdfNum;
//         setCurrentPage(currentPage + 1);
//         setPdfWidth(pdfNum);
//       } else {
//         pdfSettings();
//         pdfHolder_two.scrollLeft = currentPage * pdfWidth;
//         setCurrentPage(currentPage + 1);
//       }
//     }
//   };

//   const goToPreviousPage = () => {
//     if (pdfHolder_one && !(currentPage === 1)) {
//       pdfHolder_one.scrollLeft = (currentPage - 2) * pdfWidth;
//       setCurrentPage(currentPage - 1);
//       pdfSettings();
//     }
//     if (pdfHolder_two && !(currentPage === 1)) {
//       pdfHolder_two.scrollLeft = (currentPage - 2) * pdfWidth;
//       setCurrentPage(currentPage - 1);
//       pdfSettings();
//     }
//   };

//   const totalPageNumber = (pageNum, pdf) => {
//     console.log(pageNum);
//     // if (pdf) {
//     //   setCheckNum(3);
//     //   changesHappened();
//     // }
//     // if (pageNum < 10) {
//     //   setCheckNum(2);
//     //   setCheckWidth(388);
//     // } else if (pageNum < 20) {
//     //   setCheckWidth(435);
//     // } else if (pageNum < 30) {
//     //   setCheckWidth(435);
//     // }
//     // setTotalPage(pageNum);
//   };

//   // Your render function

//   return (
//     <>
//       <div className="mt-4 h-100 overflow-hidden slider document_container p-relative">
//         <CSSTransition
//           in={true}
//           appear={true}
//           timeout={600}
//           classNames={"document_height_up"}
//         >
//           <div>
//             {/* {checkNum === 3 ? (
//               <div className="document-loder">
//                 <div className="loading"></div>
//               </div>
//             ) : (
//               ""
//             )} */}
//             {mode === "riorpad" || mode === "buwayne" ? (
//               <>
//                 <NeumorphicContainer
//                   containerclassName="round-25 d-flex"
//                   subcontainerclasses="border-none mt-0 p-2 round-25 w-100 p-relative"
//                 >
//                   {checkWidth === 435 ? (
//                     <>
//                       <div className="document slider border-none">
//                         <div
//                           className={isClosed ? "order-2 pdf_one" : "pdf_one"}
//                         >
//                           <div style={{ height: "10001px", width: `435px` }}>
//                             <Viewer
//                               fileUrl={data.URL}
//                               scrollMode={ScrollMode.Horizontal}
//                               enablePaging={true}
//                               horizontal={true}
//                               plugins={[pageNavigationPluginInstance]}
//                             />
//                             <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js">
//                               <div className="testpdf"></div>
//                             </Worker>
//                           </div>
//                           <button
//                             className="prev-page"
//                             onClick={() => {
//                               goToPreviousPage(currentPage);
//                             }}
//                           >
//                             <NeumorphicContainer
//                               containerclassName="document_neumorphic_page_btn d-flex justify-content-center align-items-center"
//                               subcontainerclasses="p-2 d-flex justify-content-center align-items-center"
//                             >
//                               <FontAwesomeIcon icon={faChevronLeft} />
//                             </NeumorphicContainer>
//                           </button>
//                           <button
//                             className="next-page"
//                             onClick={() => {
//                               goToNextPage(currentPage, totalPage);
//                             }}
//                           >
//                             <NeumorphicContainer
//                               containerclassName="document_neumorphic_page_btn d-flex justify-content-center align-items-center"
//                               subcontainerclasses="p-2 d-flex justify-content-center align-items-center"
//                             >
//                               <FontAwesomeIcon icon={faChevronRight} />
//                             </NeumorphicContainer>
//                           </button>
//                         </div>

//                         <div className="pdf">
//                           {/* <CurrentPageLabel>
//                             {(RenderCurrentPageLabelProps) =>
//                               totalPageNumber(
//                                 RenderCurrentPageLabelProps.numberOfPages,
//                                 "pdf_two"
//                               )
//                             }
//                           </CurrentPageLabel> */}
//                         </div>
//                       </div>
//                     </>
//                   ) : (
//                     ""
//                   )}
//                   {checkWidth === 388 ? (
//                     <div className="document slider border-none">
//                       <div className={isClosed ? "order-2 pdf_two" : "pdf_two"}>
//                         <div style={{ height: "10001px", width: `388px` }}>
//                           <Viewer
//                             fileUrl={data.URL}
//                             scrollMode={ScrollMode.Horizontal}
//                             enablePaging={true}
//                             horizontal={true}
//                             plugins={[pageNavigationPluginInstance]}
//                           />
//                           <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js">
//                             <div className="testpdf"></div>
//                           </Worker>
//                         </div>
//                         <button
//                           className="prev-page"
//                           onClick={() => {
//                             goToPreviousPage(currentPage);
//                           }}
//                         >
//                           <NeumorphicContainer
//                             containerclassName="document_neumorphic_page_btn d-flex justify-content-center align-items-center"
//                             subcontainerclasses="p-2 d-flex justify-content-center align-items-center"
//                           >
//                             <FontAwesomeIcon icon={faChevronLeft} />
//                           </NeumorphicContainer>
//                         </button>
//                         <button
//                           className="next-page"
//                           onClick={() => {
//                             goToNextPage(currentPage, totalPage);
//                           }}
//                         >
//                           <NeumorphicContainer
//                             containerclassName="document_neumorphic_page_btn d-flex justify-content-center align-items-center"
//                             subcontainerclasses="p-2 d-flex justify-content-center align-items-center"
//                           >
//                             <FontAwesomeIcon icon={faChevronRight} />
//                           </NeumorphicContainer>
//                         </button>
//                       </div>

//                       <div className="pdf">
//                         {/* <CurrentPageLabel>
//                           {(RenderCurrentPageLabelProps) =>
//                             totalPageNumber(
//                               RenderCurrentPageLabelProps.numberOfPages,
//                               "pdf_two"
//                             )
//                           }
//                         </CurrentPageLabel> */}
//                       </div>
//                     </div>
//                   ) : (
//                     ""
//                   )}
//                 </NeumorphicContainer>

//                 <div className="d-flex justify-content-center mt-2">
//                   <CloseBtn linkHandler={linkHandler} mode="neuMorphism" />
//                 </div>
//               </>
//             ) : (
//               <div className="p-relative">
//                 {pdf_page === undefined ? <Loader mode="document" /> : ""}

//                 <>
//                   <div className="document slider border-none">
//                     <div className={isClosed ? "order-2 pdf_one" : "pdf_one"}>
//                       <div>
//                         <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js">
//                           <div style={{ height: "300px", width: "100%" }}>
//                             <Viewer
//                               fileUrl={data.URL}
//                               plugins={[zoomPluginInstance]}
//                               scrollMode={ScrollMode.Horizontal}
//                               enablePaging={true}
//                               // horizontal={true}
//                               plugins={[
//                                 pageNavigationPluginInstance,
//                                 zoomPluginInstance,
//                               ]}
//                             />
//                           </div>
//                         </Worker>
//                       </div>
//                       {/* <button
//                         className="next-page documentPage_btn"
//                         onClick={() => {
//                           goToNextPage(currentPage);
//                         }}
//                       >
//                         <FontAwesomeIcon icon={faChevronLeft} />
//                       </button> */}
//                       {/* <button
//                         className="prev-page documentPage_btn"
//                         onClick={() => {
//                           goToPreviousPage(currentPage);
//                         }}
//                       >
//                         <FontAwesomeIcon icon={faChevronLeft} />
//                       </button> */}

//                       <GoToPreviousPage>
//                         {(props: RenderGoToPageProps) => (
//                           <button onClick={props.onClick}>Last page</button>
//                         )}
//                       </GoToPreviousPage>
//                       <GoToNextPage>
//                         {(props: RenderGoToPageProps) => (
//                           <button
//                             className="next-page documentPage_btn"
//                             // It will be disabled if we are already at the last page
//                             onClick={props.onClick}
//                           >
//                             Next page
//                           </button>
//                         )}
//                       </GoToNextPage>
//                       {/* <button
//                           className="next-page documentPage_btn"
//                           onClick={() => {
//                             goToNextPage(currentPage, totalPage);
//                           }}
//                         >
//                           <FontAwesomeIcon icon={faChevronRight} />
//                         </button> */}
//                       {/* <Zoom>
//                         {(props: RenderZoomProps) =>
//                           props.onZoom(SpecialZoomLevel.PageWidth)
//                         }
//                       </Zoom> */}
//                       <Zoom>
//                         {(props: RenderZoomProps) =>
//                           props.onZoom(SpecialZoomLevel.PageWidth)
//                         }
//                       </Zoom>
//                       <Zoom>
//                         {(props: RenderZoomProps) => (
//                           <button
//                             onClick={() =>
//                               props.onZoom(SpecialZoomLevel.PageWidth)
//                             }
//                           >
//                             dffds
//                           </button>
//                         )}
//                       </Zoom>
//                     </div>

//                     <div className="pdf">
//                       <CurrentPageLabel>
//                         {(RenderCurrentPageLabelProps) =>
//                           totalPageNumber(
//                             RenderCurrentPageLabelProps.numberOfPages,
//                             "pdf_two"
//                           )
//                         }
//                       </CurrentPageLabel>
//                     </div>
//                     {data.Title.trim() ? (
//                       <div
//                         className={
//                           isClosed
//                             ? "swiper-content border-none round-0 order-1"
//                             : "swiper-content border-none round-0"
//                         }
//                       >
//                         <p
//                           className={isClosed ? "slider_bottom-para" : ""}
//                           id="slider__para"
//                         >
//                           <TextLoader
//                             text={data.Title}
//                             id="slider__para"
//                             characterNumber="95"
//                             btnClass="slider__btn"
//                           />
//                         </p>
//                       </div>
//                     ) : (
//                       ""
//                     )}

//                     <div
//                       className={
//                         isClosed
//                           ? `download order-3 ${
//                               isClosed === "etyne" ? "d-none" : ""
//                             }`
//                           : "download"
//                       }
//                     >
//                       <a
//                         href={data.URL}
//                         download={data.URL}
//                         className="download_btn"
//                       >
//                         Donwnload
//                       </a>
//                     </div>
//                     {!isClosed ? <CloseBtn linkHandler={linkHandler} /> : ""}
//                   </div>
//                 </>

//                 {/* {checkWidth === 388 ? (
//                   <div className="document slider border-none">
//                     <div className={isClosed ? "order-2 pdf_two" : "pdf_two"}>
//                       <div style={{ height: "10900px" }}>
//                         <Viewer
//                           fileUrl={data.URL}
//                           scrollMode={ScrollMode.Horizontal}
//                           enablePaging={true}
//                           horizontal={true}
//                           plugins={[pageNavigationPluginInstance]}
//                         />
//                         <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js">
//                           <div className="testpdf"></div>
//                         </Worker>
//                       </div>
//                       <button
//                         className="prev-page documentPage_btn"
//                         onClick={() => {
//                           goToPreviousPage(currentPage);
//                         }}
//                       >
//                         <FontAwesomeIcon icon={faChevronLeft} />
//                       </button>

//                       <button
//                         className="next-page documentPage_btn"
//                         onClick={() => {
//                           goToNextPage(currentPage, totalPage);
//                         }}
//                       >
//                         <FontAwesomeIcon icon={faChevronRight} />
//                       </button>
//                     </div>

//                     <div className="pdf">
//                       <CurrentPageLabel>
//                         {(RenderCurrentPageLabelProps) =>
//                           totalPageNumber(
//                             RenderCurrentPageLabelProps.numberOfPages,
//                             "pdf_two"
//                           )
//                         }
//                       </CurrentPageLabel>
//                     </div>
//                     {data.Title.trim() ? (
//                       <div
//                         className={
//                           isClosed
//                             ? "swiper-content border-none round-0 order-1"
//                             : "swiper-content border-none round-0"
//                         }
//                       >
//                         <p
//                           className={isClosed ? "slider_bottom-para" : ""}
//                           id="slider__para"
//                         >
//                           <TextLoader
//                             text={data.Title}
//                             id="slider__para"
//                             characterNumber="95"
//                             btnClass="slider__btn"
//                           />
//                         </p>
//                       </div>
//                     ) : (
//                       ""
//                     )}

//                     <div
//                       className={
//                         isClosed
//                           ? `download order-3 ${
//                               isClosed === "etyne" ? "d-none" : ""
//                             }`
//                           : "download"
//                       }
//                     >
//                       <a
//                         href={data.URL}
//                         download={data.URL}
//                         className="download_btn"
//                       >
//                         Donwnload
//                       </a>
//                     </div>
//                     {!isClosed ? <CloseBtn linkHandler={linkHandler} /> : ""}
//                   </div>
//                 ) : (
//                   ""
//                 )} */}
//               </div>
//             )}
//           </div>
//         </CSSTransition>
//       </div>
//     </>
//   );
// }
