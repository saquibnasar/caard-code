import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { toolbarPlugin, ToolbarSlot } from "@react-pdf-viewer/toolbar";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import pdf from "../assets/Main_Page.pdf";

import { ScrollMode, SpecialZoomLevel } from "@react-pdf-viewer/core";
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// import demoFile from "https://www.africau.edu/images/default/sample.pdf";

import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";

export default function App() {
  const pageNavigationPluginInstance = pageNavigationPlugin();

  const { GoToNextPage, GoToPreviousPage } = pageNavigationPluginInstance;
  const renderToolbar = (Toolbar: (props: ToolbarProps) => ReactElement) => (
    <Toolbar>
      {(slots: ToolbarSlot) => {
        const { ZoomOut } = slots;
        return (
          <div
            style={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <div style={{ padding: "0px 2px" }}>
              <ZoomOut>
                {(props) => (
                  <button
                    style={{
                      backgroundColor: "#357edd",
                      border: "none",
                      borderRadius: "4px",
                      color: "#ffffff",
                      cursor: "pointer",
                      padding: "8px",
                    }}
                    onClick={props.onClick}
                  >
                    Zoom out
                  </button>
                )}
              </ZoomOut>
            </div>
            ...
          </div>
        );
      }}
    </Toolbar>
  );

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    toolbarPlugin: {
      fullScreenPlugin: {
        onEnterFullScreen: (zoom) => {
          zoom(SpecialZoomLevel.PageFit);
          defaultLayoutPluginInstance.toolbarPluginInstance.scrollModePluginInstance.switchScrollMode(
            ScrollMode.Wrapped
          );
        },
        onExitFullScreen: (zoom) => {
          zoom(SpecialZoomLevel.PageWidth);
          defaultLayoutPluginInstance.toolbarPluginInstance.scrollModePluginInstance.switchScrollMode(
            ScrollMode.Vertical
          );
        },
      },
    },
  });

  // const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <>
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
        <div style={{ height: "720px" }}>
          <Viewer
            fileUrl={pdf}
            // plugins={[defaultLayoutPluginInstance]}
            scrollMode={ScrollMode.Horizontal}
            plugins={[pageNavigationPluginInstance]}
          />
        </div>
      </Worker>
    </>
  );
}
