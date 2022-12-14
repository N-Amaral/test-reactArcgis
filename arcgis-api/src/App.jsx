import React, { useRef, useEffect } from "react";
import Bookmarks from "@arcgis/core/widgets/Bookmarks";
import Expand from "@arcgis/core/widgets/Expand";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import "./App.css";

function App() {
  const mapDiv = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {
      /* app init */

      const webmap = new WebMap({
        portalItem: {
          id: "aa1d3f80270146208328cf66d022e09c",
        },
      });

      const view = new MapView({
        container: mapDiv.current,
        map: webmap,
      });

      const bookmarks = new Bookmarks({
        view,
        editingEnabled: true, //allows adding, editing and removing of bookmarks
      });

      const bkExpand = new Expand({
        view,
        content: bookmarks,
        expanded: true,
      });

      //Adds the bookmark widget to the top-right corner of the view
      view.ui.add(bkExpand, "top-right");

      //extra - number of bookmarks in the webmap
      webmap.when(() => {
        if (webmap.bookmarks && webmap.bookmarks.length) {
          console.log(`This map has ${webmap.bookmarks.length} bookmarks`);
        } else {
          console.log("This map has no bookmarks available");
        }
      });
    }
  }, []);

  return <div className="mapDiv" ref={mapDiv}></div>;
}

export default App;
