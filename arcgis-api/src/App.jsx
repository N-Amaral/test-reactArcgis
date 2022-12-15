import React, { useRef, useEffect } from "react";
import Bookmarks from "@arcgis/core/widgets/Bookmarks";
import Expand from "@arcgis/core/widgets/Expand";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import "./App.css";

function Text() {
  return (
    <div className="mapContainer">
      <span>This is a text container</span>
    </div>
  );
}

function NavBar() {
  return <nav>this is a nav</nav>;
}

function Map() {
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
        console.log(mapDiv.current);
      });
    }
  }, []);

  return <div className="mapDiv" ref={mapDiv} />;
}

function App() {
  return (
    <>
      <NavBar />
      <div style={{ height: "50%", display: "flex", justifyContent: "center", border: "2px solid black" }}>
        <Map />
      </div>
      <Text />
    </>
  );
}

export default App;
