import React from "react";

export default function Card({
  stats,
  zones,
  hotspots,
  hoveredEntity,
  darkMode,
  geolocatedLoc,
  setGeolocatedLoc,
}) {
  const lens = {
    CONTAINMENT: hotspots.length,
    RED: Object.values(zones).filter((x) => x == "red").length,
    ORANGE: Object.values(zones).filter((x) => x == "orange").length,
    GREEN: Object.values(zones).filter((x) => x == "green").length,
  };
  const color = {
    CONTAINMENT: "text-blue-600",
    RED: "text-red-600",
    ORANGE: "text-orange-600",
    GREEN: "text-green-600",
  };

  const info = (p, z, f) => {
    return (
      <div className="flex flex-col uppercase mb-2">
        <div className="mb-2">
          {p.LSGD && (
            <div>
              <div className="text-mobilexs lg:text-xs">LSGD</div>
              <div className="font-semibold">{p.LSGD}</div>
            </div>
          )}
          <div>
            <div className="text-mobilexs lg:text-xs">DISTRICT</div>
            <div className="font-semibold">{p.DISTRICT}</div>
          </div>
          {f && (
            <div>
              <div className="text-mobilexs lg:text-xs">ZONE</div>
              <div className={`font-semibold ${color[z]}`}>{z}</div>
            </div>
          )}
        </div>
        <div>
          <div className="text-mobilexs lg:text-xs">DISTRICT STATS</div>
          <div className="font-semibold">
            {["confirmed", "recovered", "deceased", "active"].map((a) => (
              <div>
                <div className="text-mobilexs lg:text-xs">{a}</div>
                <div className="font-semibold">
                  {stats.latest[p.DISTRICT][a]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`flex flex-col w-27 lg:w-48 text-mobile lg:text-sm px-2 pt-4 pb-2 bg-opacity-50 ${
        darkMode ? "text-white bg-black" : "text-black bg-white"
      }`}
    >
      {!geolocatedLoc ? (
        <div>
          <div className="flex flex-col uppercase mb-2">
            {Object.entries(lens).map((a) => (
              <div>
                <div className={`text-mobilexs lg:text-xs ${color[a[0]]}`}>{`${
                  a[0] == "CONTAINMENT" ? "LSGD" : "DISTRICTS"
                } IN ${a[0]}`}</div>
                <div className="font-semibold">{a[1]}</div>
              </div>
            ))}
          </div>
          {hoveredEntity ? (
            info(hoveredEntity.p, hoveredEntity.z, true)
          ) : (
            <div className="text-mobilexs lg:text-mobile">
              Hover/select an area for detailed information.
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="mb-2">
            <div className="uppercase font-semibold">You are in</div>
            <div
              className={`text-base font-semibold ${color[geolocatedLoc.z]}`}
            >
              {`${geolocatedLoc.z} ZONE`}
            </div>
          </div>
          {info(geolocatedLoc.p, geolocatedLoc.z, false)}
          <button
            className="uppercase text-mobilexs pointer-events-auto"
            onClick={() => setGeolocatedLoc(null)}
          >
            CLICK TO RETURN
          </button>
        </div>
      )}
    </div>
  );
}