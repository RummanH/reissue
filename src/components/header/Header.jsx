import React, { useState } from "react";
import "./header.css";

function Header() {
  const [status, setStatus] = useState("ONLINE");
  const [balance, setBalance] = useState("0");
  const reissueData = {
    AgencyInfo: {
      AgencyLogoPath: "path/to/logo.png",
    },
    BookingResponseJson: {
      AirPriceCheckResponse: {
        APICurrencyType: "USD",
      },
    },
  };

  const refresh = () => {
    window.location.reload();
  };

  const goToAdmin = () => {
    console.log("Go to admin");
  };

  const getBalanceReissue = () => {
    console.log("Get balance reissue");
  };

  return (
    <>
      {status === "OFFLINE" && (
        <div className="session-wrapper">
          <div className="custom-session">
            <div className="session-content">
              <div className="session-icon">
                <i
                  className="fa fa-solid fa-wifi"
                  style={{ fontSize: "40px" }}
                ></i>
              </div>
              <div className="session-desc">
                <h2>No Internet.</h2>
                <strong>You don't have working internet connection!</strong>
                <img
                  style={{ display: "block", width: "70%", margin: "auto" }}
                  src="assets/images/signal.svg"
                  alt=""
                />
              </div>
              {/* <h1 className="timer-in-expire" *ngIf="timerMinute == 0 && timerSeconds < 10">00:0{{timerSeconds}}</h1> */}
              <div className="session-btn">
                <button className="btn" onClick={refresh}>
                  Refresh Page
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <header className="header">
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <a className="navbar-brand" href="#">
              <img
                src={reissueData.AgencyInfo.AgencyLogoPath}
                onError={(e) => {
                  e.target.src = "assets/images/image-notFound1.png";
                }}
                alt=""
              />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <div className="navbar-nav m-auto agency-desc">
                <div className="agadmin">
                  <div className="aginfo">Agency Info.</div>
                  <div>
                    <a href="#" onClick={goToAdmin}>
                      <i className="fa fa-arrow-left"></i> Go to Admin
                    </a>
                  </div>
                </div>
                <div className="agency-list">
                  <div>
                    <i className="fas fa-user"></i> Name:{" "}
                    <strong>Prime Tech</strong>
                  </div>
                  <div>
                    <i className="fas fa-envelope"></i> Email:{" "}
                    <strong>hello@example.com</strong>
                  </div>
                  <div>
                    <i className="fas fa-code"></i> Code:{" "}
                    <strong>4535643</strong>
                  </div>
                  <div>
                    <i
                      style={{ transform: "rotate(90deg)" }}
                      className="fas fa-phone"
                    ></i>{" "}
                    Contact No: <strong>01678560660</strong>
                  </div>
                </div>
              </div>
              <form className="d-flex">
                <div className="balance-input">
                  <input type="text" placeholder="" value={balance} readOnly />{" "}
                  {
                    reissueData.BookingResponseJson.AirPriceCheckResponse
                      .APICurrencyType
                  }
                  <a
                    href="#"
                    onClick={getBalanceReissue}
                    className="refresh-icon"
                  >
                    <i className="fas fa-sync-alt"></i>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
