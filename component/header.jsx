import { useMemo, useState } from "react";
import data from "../server/data.json";

export function HeaderPage({ isLight, toggleMood }) {
  const [isOnline, setIsOnline] = useState(data);
  const [displayData, setDisplayData] = useState(data);
  const [activeFilter, setActiveFilter] = useState("all");

  const handleCheck = (e, curEl) => {
    const isChecked = e.target.checked;

    const updated = isOnline.map((item) =>
      item.name === curEl.name ? { ...item, isActive: isChecked } : item
    );

    setIsOnline(updated);

    // Update filtered view based on current filter
    if (activeFilter === "active") {
      setDisplayData(updated.filter((item) => item.isActive));
    } else if (activeFilter === "inactive") {
      setDisplayData(updated.filter((item) => !item.isActive));
    } else {
      setDisplayData(updated);
    }
  };

  const showAll = () => {
    setDisplayData(isOnline);
    setActiveFilter("all");
  };

  const isActivate = () => {
    const filtered = isOnline.filter((item) => item.isActive);
    setDisplayData(filtered);
    setActiveFilter("active");
  };

  const showInactive = () => {
    const filtered = isOnline.filter((item) => !item.isActive);
    setDisplayData(filtered);
    setActiveFilter("inactive");
  };

  const handleDelete = (e, curEl) => {
    const updatedOnline = isOnline.filter((item) => item.name !== curEl.name);
    setIsOnline(updatedOnline);

    const updatedDisplay = displayData.filter(
      (item) => item.name !== curEl.name
    );
    setDisplayData(updatedDisplay);
  };
  const onlineStatusMap = useMemo(() => {
    const map = new Map();
    isOnline.forEach((item) => map.set(item.name, item.isActive));
    return map;
  }, [isOnline]);

  return (
    <div className="main-container">
      <header>
        <div className="header-content">
          {isLight ? (
      <a href="/">
            <img src="/images/logo-dark.svg" alt="logo" /></a>
          ) : (
      <a href="/">
            <img src="/images/logo.svg" alt="logo" /></a>
          )}

          <div className="mode-box" tabIndex="0" onClick={toggleMood}>
            {isLight ? (
              <img src="/images/icon-sun.svg" alt="light mode" />
            ) : (
              <img src="/images/icon-moon.svg" alt="dark mode" />
            )}
          </div>
        </div>

        <div className="header-title">
          <h1>Extensions List</h1>
          <div>
            <button
              type="button"
              onClick={showAll}
              className={activeFilter === "all" ? "active" : ""}
            >
              All
            </button>
            <button
              type="button"
              onClick={isActivate}
              className={activeFilter === "active" ? "active" : ""}
            >
              Active
            </button>
            <button
              type="button"
              onClick={showInactive}
              className={activeFilter === "inactive" ? "active" : ""}
            >
              Inactive
            </button>
          </div>
        </div>
      </header>

      <main>
        <ul className="card-box">
          {displayData.map((curEl) => {
            return (
              <li key={curEl.name}>
                <div className="info">
                  <img src={curEl.logo} alt={curEl.name} className="extension-app"/>
                  <div>
                    <h2>{curEl.name}</h2>
                    <p>{curEl.description}</p>
                  </div>
                </div>
                <div className="remove-box">
                  <button type="button" onClick={(e) => handleDelete(e, curEl)}>
                    Remove
                  </button>
                  <label className="switch">
                    <input
                      type="checkbox"
                      id="toggle"
                      checked={onlineStatusMap.get(curEl.name)}
                      onChange={(e) => handleCheck(e, curEl)}
                    />
                    <span className="slider" tabIndex="0"></span>
                  </label>
                </div>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
