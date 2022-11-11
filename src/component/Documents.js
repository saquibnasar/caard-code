import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { useState } from "react";
import pdfImage from "../assets/images/pdf.png";
import downloadImage from "../assets/images/download.png";

import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import { RenderGoToPageProps } from "@react-pdf-viewer/page-navigation";

// import { ScrollMode } from "@react-pdf-viewer/core";
// import { ScrollMode } from "@react-pdf-viewer/core";
export default function Documents({ data }) {
  // Your render function

  const pageNavigationPluginInstance = pageNavigationPlugin();

  const { GoToNextPage, GoToPreviousPage } = pageNavigationPluginInstance;

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function removeTextLayerOffset() {
    const textLayers = document.querySelectorAll(
      ".react-pdf__Page__textContent"
    );
    textLayers.forEach((layer) => {
      const { style } = layer;
      style.top = "0";
      style.left = "0";
      style.transform = "";
    });
  }

  return (
    <>
      <div className="document mt-4">
        <div className="card mt-0 round-bottom-0">
          <div className="card_icon bg-bannner">
            <img className="img-fluid pdf" src={pdfImage} alt="" />
          </div>
          <p>{data.Title}</p>
          <a className="download-btn" href={data.URL} download={data.URL}>
            <img className="img-fluid" src={downloadImage} alt="" />
          </a>
        </div>
        <div className="pdf">
          {/* {!numPages ? (
            <div className="loading-section pdf-loader">
              <div className="loading"></div>
            </div>
          ) : (
            <>
             
            </>
          )} */}
          {/* <Document file={data.URL} onLoadSuccess={onDocumentLoadSuccess}>
            <Page
              pageNumber={pageNumber}
              onLoadSuccess={removeTextLayerOffset}
            />
          </Document> */}

          <GoToPreviousPage>
            {(RenderGoToPageProps) => (
              <button
                id="prev-page"
                disabled={RenderGoToPageProps.isDisabled}
                onClick={RenderGoToPageProps.onClick}
              >
                ❮
              </button>
            )}
          </GoToPreviousPage>
          <GoToNextPage>
            {(RenderGoToPageProps) => (
              <button
                id="next-page"
                disabled={RenderGoToPageProps.isDisabled}
                onClick={RenderGoToPageProps.onClick}
              >
                ❯
              </button>
            )}
          </GoToNextPage>

          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js">
            <Viewer
              fileUrl={data.URL}
              plugins={[pageNavigationPluginInstance]}
              // scrollMode={ScrollMode.Horizontal}
            />
          </Worker>
        </div>
      </div>
    </>
  );
}
