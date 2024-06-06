import React, { useState } from "react";

const FlightList = ({
  reissueResponse,
  airportList,
  searchCity,
  changeDeparture,
  changeDestination,
  toggleDestination,
  toggleDropDown,
  searchFlight,
}) => {
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);
  const [searchIsGoingOn, setSearchIsGoingOn] = useState(false);
  const [loaderObject, setLoaderObject] = useState({});
  const [isSearchExpired, setIsSearchExpired] = useState(false);
  const [timerMinute, setTimerMinute] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isLoginExpired, setIsLoginExpired] = useState(false);
  const [loginSessionSecond, setLoginSessionSecond] = useState(0);

  const focusDropdown = (id) => {
    document.getElementById(id).focus();
  };

  const toggleOriginDropdown = () => {
    setShowOriginDropdown(!showOriginDropdown);
  };

  const toggleDestinationDropdown = () => {
    setShowDestinationDropdown(!showDestinationDropdown);
  };

  if (reissueResponse) {
    return null;
  }

  return (
    <>
      <main className="main">
        {searchIsGoingOn && (
          <div className="custom-loader-wrapper">
            <div className="custom-loader">
              <div className="content-loading-wrapper">
                <div className="searching">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img src="assets/images/load.gif" alt="" />
                  </div>
                  <span className="searchingTitle">
                    {loaderObject.Origin} To {loaderObject.Destination}
                    {reissueResponse?.AirSearchReq.JourneyTypeModify === 2 && (
                      <span>Round Trip</span>
                    )}
                    {reissueResponse?.AirSearchReq.JourneyTypeModify === 1 && (
                      <span>One Way</span>
                    )}
                  </span>
                  <br />
                  <br /> Please wait . . .
                  <br /> We are searching available best prices and flights for
                  you.
                </div>
              </div>
            </div>
          </div>
        )}

        {isSearchExpired && (
          <div className="session-wrapper">
            <div className="custom-session">
              <div className="session-content">
                <div className="session-icon">
                  <img src="assets/images/time.png" alt="" />
                </div>
                <div className="session-desc">
                  <h2>Search Timeout</h2>
                  <strong>Your search timeout, Please search again!</strong>
                </div>
                {timerMinute === 0 && timerSeconds < 10 && (
                  <h1 className="timer-in-expire">00:0{timerSeconds}</h1>
                )}
                <div className="session-btn">
                  <button className="btn" onClick={searchAgain}>
                    Search Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {isLoginExpired && (
          <div className="session-wrapper">
            <div className="custom-session">
              <div className="session-content">
                <div className="session-icon">
                  <img src="assets/images/time.png" alt="" />
                </div>
                <div className="session-desc">
                  <h2>Session Expired</h2>
                  <strong>
                    Session has expired, You will be redirected to Admin.
                  </strong>
                </div>
                {loginSessionSecond < 10 && (
                  <h1 className="timer-in-expire">00:0{loginSessionSecond}</h1>
                )}
                <div className="session-btn">
                  <button className="btn" onClick={goToAdmin}>
                    GO TO ADMIN
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="content-wrapper">
                <div className="search-container">
                  <div className="nav-align-top">
                    <div className="d-flex justify-content-end align-items-center">
                      <ul className="nav nav-pills mb-3" role="tablist">
                        <li className="nav-item">
                          <button
                            type="button"
                            className={`nav-link ${
                              reissueResponse?.AirSearchReq
                                .JourneyTypeModify === 1
                                ? "active"
                                : ""
                            } ${
                              !reissueResponse?.ReIssueConfig.IsTripChange
                                ? "unClickAble disabled"
                                : ""
                            }`}
                            role="tab"
                            data-bs-toggle="tab"
                            data-bs-target="#roundTrip"
                            onClick={oneWay}
                          >
                            One Way
                          </button>
                        </li>
                        <li className="nav-item">
                          <button
                            type="button"
                            className="nav-link"
                            role="tab"
                            data-bs-toggle="tab"
                            data-bs-target="#roundTrip"
                            onClick={roundTrip}
                          >
                            Round Trip
                          </button>
                        </li>
                        <li className="nav-item">
                          <button
                            type="button"
                            className="nav-link"
                            role="tab"
                            data-bs-toggle="tab"
                            data-bs-target="#multiCityTrip"
                            aria-controls="navs-pills-top-messages"
                            aria-selected="false"
                          >
                            Multi City
                          </button>
                        </li>
                      </ul>
                      <div className="form-wrapper form-wrapper-2">
                        <div className="input-title">
                          <div className="traveller-info">
                            <div className="traveller">
                              Adult {reissueResponse?.AirSearchReq.NoOfAdult}
                            </div>
                            <div className="traveller">
                              Child {reissueResponse?.AirSearchReq.NoOfChildren}
                            </div>
                            <div className="traveller">
                              Infant {reissueResponse?.AirSearchReq.NoOfInfant}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-content">
                      <div
                        className="tab-pane fade show active"
                        id="roundTrip"
                        role="tabpanel"
                      >
                        <div className="tabs-content one-way">
                          <form className="round-trip-reservation">
                            <div className="row">
                              <div className="col-md-12">
                                <div className="form-row">
                                  <div
                                    className="form-group from col-12 col-md-6 col-lg-3"
                                    onClick={() =>
                                      focusDropdown("departure-text-box")
                                    }
                                  >
                                    <div
                                      className={`form-wrapper ${
                                        !reissueResponse?.ReIssueConfig
                                          .IsRouteChange
                                          ? "unClickAble disabled"
                                          : ""
                                      }`}
                                    >
                                      <div
                                        className="input-title"
                                        onClick={() => toggleDropDown(1)}
                                      >
                                        <div className="label">From</div>
                                        <div className="city">
                                          {" "}
                                          {
                                            reissueResponse?.AirSearchReq
                                              .OriginAirport
                                          }{" "}
                                          (
                                          {reissueResponse?.AirSearchReq.Origin}
                                          )
                                        </div>
                                        <div className="airport">
                                          {" "}
                                          {
                                            reissueResponse?.AirSearchReq
                                              .OriginAirport
                                          }
                                        </div>
                                      </div>
                                      {showOriginDropdown && (
                                        <div className="dropdown-airport-list">
                                          <div className="search-input">
                                            <input
                                              className="form-control departure-text-box"
                                              type="text"
                                              placeholder="Search Destination"
                                              onInput={(e) =>
                                                (e.target.value =
                                                  e.target.value.toUpperCase())
                                              }
                                              onKeyUp={(e) =>
                                                searchCity(e.target.value)
                                              }
                                            />
                                          </div>
                                          <ul>
                                            {airportList.map((item) => (
                                              <li
                                                key={item.AirportCode}
                                                onClick={() =>
                                                  changeDeparture(item)
                                                }
                                              >
                                                <div className="list-wrapper">
                                                  <div className="airport-code">
                                                    {item.AirportCode}
                                                  </div>
                                                  <div className="airport-details">
                                                    <div className="city">
                                                      {item.SearchString}
                                                    </div>
                                                    <div className="airport">
                                                      {item.SearchString}
                                                    </div>
                                                  </div>
                                                </div>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}
                                    </div>
                                    <div className="twoWay">
                                      <a
                                        href="javascript:void(0)"
                                        onClick={toggleDestination}
                                        className={`${
                                          !reissueResponse?.ReIssueConfig
                                            .IsRouteChange
                                            ? "unClickAble disabled"
                                            : ""
                                        }`}
                                      >
                                        <i className="fas fa-exchange-alt"></i>
                                      </a>
                                    </div>
                                  </div>
                                  <div
                                    className="form-group to col-12 col-md-6 col-lg-3"
                                    onClick={() =>
                                      focusDropdown("return-text-box")
                                    }
                                  >
                                    <div
                                      className={`form-wrapper ${
                                        !reissueResponse?.ReIssueConfig
                                          .IsRouteChange
                                          ? "unClickAble disabled"
                                          : ""
                                      }`}
                                    >
                                      <div
                                        className="input-title"
                                        onClick={() => toggleDropDown(2)}
                                      >
                                        <div className="label">To</div>
                                        <div className="city">
                                          {
                                            reissueResponse?.AirSearchReq
                                              .DestinationAirport
                                          }{" "}
                                          (
                                          {
                                            reissueResponse?.AirSearchReq
                                              .Destination
                                          }
                                          )
                                        </div>
                                        <div className="airport">
                                          {
                                            reissueResponse?.AirSearchReq
                                              .DestinationAirport
                                          }
                                        </div>
                                      </div>
                                      {showDestinationDropdown && (
                                        <div className="dropdown-airport-list">
                                          <div className="search-input">
                                            <input
                                              className="form-control return-text-box"
                                              type="text"
                                              placeholder="Search Destination"
                                              onInput={(e) =>
                                                (e.target.value =
                                                  e.target.value.toUpperCase())
                                              }
                                              onKeyUp={(e) =>
                                                searchCity(e.target.value)
                                              }
                                            />
                                          </div>
                                          <ul>
                                            {airportList.map((item) => (
                                              <li
                                                key={item.AirportCode}
                                                onClick={() =>
                                                  changeDestination(item)
                                                }
                                              >
                                                <div className="list-wrapper">
                                                  <div className="airport-code">
                                                    {item.AirportCode}
                                                  </div>
                                                  <div className="airport-details">
                                                    <div className="city">
                                                      {item.SearchString}
                                                    </div>
                                                    <div className="airport">
                                                      {item.SearchString}
                                                    </div>
                                                  </div>
                                                </div>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div className="form-group depert col-12 col-md-6 col-lg-2">
                                    <div
                                      className={`form-wrapper ${
                                        !reissueResponse?.ReIssueConfig
                                          .IsDateChange
                                          ? "unClickAble disabled"
                                          : ""
                                      }`}
                                    >
                                      <div className="input-title">
                                        <div className="label">
                                          Journey Date
                                        </div>
                                        <input
                                          className="input-text checkin flightlist-calender"
                                          name="checkin"
                                          id="checkin"
                                          onKeyPress={(e) => e.preventDefault()}
                                          onChange={returnDateChange}
                                          min={yesterday}
                                          required
                                          value={
                                            reissueResponse?.AirSearchReq
                                              .DepartureDate
                                          }
                                        />
                                        <div className="date-format">
                                          <div className="date">
                                            {new Date(
                                              reissueResponse?.AirSearchReq.DepartureDate
                                            ).toLocaleDateString("en-US", {
                                              day: "numeric",
                                              month: "long",
                                            })}
                                          </div>
                                          <div className="days">
                                            {new Date(
                                              reissueResponse?.AirSearchReq.DepartureDate
                                            ).toLocaleDateString("en-US", {
                                              weekday: "long",
                                              year: "numeric",
                                            })}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {reissueResponse?.AirSearchReq
                                    .JourneyTypeModify === 2 && (
                                    <div className="form-group return col-12 col-md-6 col-lg-2">
                                      <div
                                        className={`form-wrapper ${
                                          !reissueResponse?.ReIssueConfig
                                            .IsDateChange
                                            ? "unClickAble disabled"
                                            : ""
                                        }`}
                                      >
                                        <div className="input-title">
                                          <div className="label">
                                            Return Date
                                          </div>
                                          <input
                                            className="input-text checkout flightlist-calender"
                                            name="checkout"
                                            id="checkout"
                                            onKeyPress={(e) =>
                                              e.preventDefault()
                                            }
                                            required
                                            value={
                                              reissueResponse?.AirSearchReq
                                                .ReturnDate
                                            }
                                          />
                                          <div className="date-format">
                                            <div className="date">
                                              {new Date(
                                                reissueResponse?.AirSearchReq.ReturnDate
                                              ).toLocaleDateString("en-US", {
                                                day: "numeric",
                                                month: "long",
                                              })}
                                            </div>
                                            <div className="days">
                                              {new Date(
                                                reissueResponse?.AirSearchReq.ReturnDate
                                              ).toLocaleDateString("en-US", {
                                                weekday: "long",
                                                year: "numeric",
                                              })}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  <div className="form-group formSubmit col-12 col-md-12 col-lg-2">
                                    <div className="form-wrapper">
                                      <button
                                        type="button"
                                        className="btn btn-primary btn-lg"
                                        disabled={
                                          !reissueResponse?.ReIssueConfig
                                            .IsSearchFlight
                                        }
                                        onClick={searchFlight}
                                      >
                                        Search
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="multiCityTrip"
                        role="tabpanel"
                      >
                        {/* <!-- Multi City content goes here --> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="note">
                  Note: Fields marked with <span className="required">*</span>{" "}
                  are mandatory
                </div>
              </div>
            </div>
          </div>
        </div>

        <section>
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <div
                  className={`left-sidebar ${isSticky ? "sticky-sidebar" : ""}`}
                >
                  <div className="found-flight">
                    <span>{flightList.length} results found</span>
                    <button
                      onClick={resetAllFilter}
                      className={`reset-button ${
                        !isFilterClicked ? "invisible" : ""
                      }`}
                    >
                      {" "}
                      Reset
                    </button>
                  </div>
                  <div className="session-timeout">
                    <div className="timeout-left">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.6316 8.40423L19.5895 7.45788C19.7877 7.25988 19.8991 6.99134 19.8991 6.71132C19.8991 6.43131 19.7877 6.16276 19.5895 5.96476C19.3913 5.76676 19.1225 5.65552 18.8422 5.65552C18.5618 5.65552 18.293 5.76676 18.0948 5.96476L17.1474 6.92162C15.6722 5.78164 13.8599 5.16313 11.9948 5.16313C10.1297 5.16313 8.31737 5.78164 6.84216 6.92162L5.88427 5.95424C5.68466 5.75624 5.41448 5.64556 5.13318 5.64655C4.85188 5.64753 4.58248 5.7601 4.38427 5.9595C4.18606 6.1589 4.07525 6.42878 4.07624 6.70978C4.07723 6.99078 4.18992 7.25988 4.38953 7.45788L5.35795 8.41475C4.20323 9.88426 3.57668 11.6989 3.57901 13.5671C3.57557 14.9082 3.89318 16.2307 4.50535 17.4243C5.11752 18.6178 6.0065 19.6479 7.09816 20.4286C8.18981 21.2092 9.4525 21.7178 10.7809 21.912C12.1093 22.1061 13.465 21.9802 14.7347 21.5447C16.0045 21.1092 17.1517 20.3767 18.0805 19.4083C19.0093 18.44 19.6929 17.2638 20.0743 15.9779C20.4556 14.6921 20.5236 13.3337 20.2727 12.0163C20.0217 10.6988 19.4591 9.46036 18.6316 8.40423ZM12.0001 19.8761C10.7509 19.8761 9.52982 19.5061 8.49119 18.8128C7.45257 18.1196 6.64306 17.1342 6.16503 15.9814C5.687 14.8286 5.56193 13.5601 5.80563 12.3363C6.04932 11.1124 6.65084 9.98829 7.53412 9.10596C8.4174 8.22363 9.54277 7.62276 10.7679 7.37933C11.9931 7.13589 13.2629 7.26083 14.417 7.73834C15.5711 8.21586 16.5575 9.02449 17.2514 10.062C17.9454 11.0995 18.3159 12.3193 18.3159 13.5671C18.3159 15.2403 17.6504 16.8451 16.466 18.0282C15.2816 19.2114 13.6751 19.8761 12.0001 19.8761ZM9.8948 4.10361H14.1053C14.3845 4.10361 14.6522 3.99282 14.8496 3.79563C15.0471 3.59844 15.158 3.33098 15.158 3.05211C15.158 2.77323 15.0471 2.50578 14.8496 2.30859C14.6522 2.11139 14.3845 2.00061 14.1053 2.00061H9.8948C9.61562 2.00061 9.34788 2.11139 9.15047 2.30859C8.95307 2.50578 8.84216 2.77323 8.84216 3.05211C8.84216 3.33098 8.95307 3.59844 9.15047 3.79563C9.34788 3.99282 9.61562 4.10361 9.8948 4.10361ZM13.0527 10.4126C13.0527 10.1337 12.9418 9.86627 12.7444 9.66907C12.547 9.47188 12.2792 9.3611 12.0001 9.3611C11.7209 9.3611 11.4531 9.47188 11.2557 9.66907C11.0583 9.86627 10.9474 10.1337 10.9474 10.4126V12.3999C10.7091 12.6129 10.5411 12.8931 10.4657 13.2035C10.3902 13.5139 10.4109 13.8399 10.5251 14.1383C10.6392 14.4367 10.8413 14.6935 11.1047 14.8746C11.368 15.0558 11.6803 15.1528 12.0001 15.1528C12.3198 15.1528 12.6321 15.0558 12.8955 14.8746C13.1588 14.6935 13.361 14.4367 13.4751 14.1383C13.5892 13.8399 13.6099 13.5139 13.5345 13.2035C13.459 12.8931 13.291 12.6129 13.0527 12.3999V10.4126Z"
                          fill="#685dd8"
                        ></path>
                      </svg>
                      <h2>Time Remaining</h2>
                    </div>
                    <div className="timeout-right">
                      {timerMinute < 10 ? "0" : ""} {timerMinute}:{" "}
                      {timerSeconds < 10 ? "0" : ""}
                      {timerSeconds}
                    </div>
                  </div>
                  <div className="accordion" id="accordionWithIcon">
                    <div className="card accordion-item mb-2">
                      <h2 className="accordion-header d-flex align-items-center">
                        <button
                          type="button"
                          className="accordion-button collapsed"
                          data-bs-toggle="collapse"
                          data-bs-target="#aircraft"
                          aria-expanded="false"
                          onClick={() => changeStatusArray(0)}
                        >
                          <div className="any-root">
                            <p>Aircraft</p>
                            <small
                              className={`any-span ${
                                checkStatusArray[0] ? "invisible" : ""
                              }`}
                            >
                              {modify_filter_params.aircraft.length
                                ? `${modify_filter_params.aircraft.length} Selected`
                                : "Any"}
                            </small>
                          </div>
                          <button
                            className={`arrow-reset ${
                              !modify_filter_params.aircraft.length
                                ? "invisible"
                                : ""
                            }`}
                            onClick={() => resetFilter("aircraft")}
                          >
                            Reset
                          </button>
                        </button>
                      </h2>
                      <div
                        id="aircraft"
                        className="accordion-collapse collapse"
                      >
                        <div className="sidebar-body">
                          {filter_params.aircraft.map((data, index) => (
                            <div className="accordion-body" key={index}>
                              <div className="form-check">
                                <input
                                  ref={filterCheckbox}
                                  className="form-check-input aircraft"
                                  type="checkbox"
                                  value=""
                                  id={`${data}onAirCraftChange`}
                                  onChange={(e) =>
                                    newOnFilterChange(e, data, "aircraft")
                                  }
                                />
                                <label
                                  className="form-check-label"
                                  id={`${data}onAirCraftChange`}
                                >
                                  {data}
                                </label>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div
                      className="card accordion-item mb-2"
                      style={{
                        display: filter_params.baggage.length
                          ? "block"
                          : "none",
                      }}
                    >
                      <h2 className="accordion-header d-flex align-items-center">
                        <button
                          type="button"
                          className="accordion-button collapsed"
                          data-bs-toggle="collapse"
                          data-bs-target="#baggage"
                          id="badgeID"
                          aria-expanded="false"
                          onClick={() => changeStatusArray(1)}
                        >
                          <div className="any-root">
                            <p>Baggage</p>
                            <small
                              className={`any-span badgeID ${
                                checkStatusArray[1] ? "invisible" : ""
                              }`}
                            >
                              {modify_filter_params.baggage.length
                                ? `${modify_filter_params.baggage.length} Selected`
                                : "Any"}
                            </small>
                          </div>
                          <span
                            className={`arrow-reset ${
                              !modify_filter_params.baggage.length
                                ? "invisible"
                                : ""
                            }`}
                            onClick={() => resetFilter("baggage")}
                          >
                            Reset
                          </span>
                        </button>
                      </h2>
                      <div id="baggage" className="accordion-collapse collapse">
                        <div className="sidebar-body">
                          {filter_params.baggage.map((data, index) => (
                            <div className="accordion-body" key={index}>
                              <div className="form-check">
                                <input
                                  ref={filterCheckbox}
                                  className="form-check-input baggage"
                                  type="checkbox"
                                  value=""
                                  id={`${data}onBaggageChange`}
                                  onChange={(e) =>
                                    newOnFilterChange(e, data, "baggage")
                                  }
                                />
                                <label
                                  className="form-check-label"
                                  id={`${data}onBaggageChange`}
                                >
                                  {data}
                                </label>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="card accordion-item mb-2">
                      <h2 className="accordion-header d-flex align-items-center">
                        <button
                          type="button"
                          className="accordion-button collapsed"
                          data-bs-toggle="collapse"
                          data-bs-target="#onwardStop"
                          aria-expanded="false"
                          onClick={() => changeStatusArray(2)}
                        >
                          <div className="any-root">
                            <p>Onward Stop</p>
                            <small
                              className={`any-span ${
                                checkStatusArray[2] ? "invisible" : ""
                              }`}
                            >
                              {modify_filter_params.onward_flight_stops.length
                                ? `${modify_filter_params.onward_flight_stops.length} Selected`
                                : "Any"}
                            </small>
                          </div>
                          <span
                            className={`arrow-reset ${
                              !modify_filter_params.onward_flight_stops.length
                                ? "invisible"
                                : ""
                            }`}
                            onClick={() => resetFilter("onward_flight_stops")}
                          >
                            Reset
                          </span>
                        </button>
                      </h2>
                      <div
                        id="onwardStop"
                        className="accordion-collapse collapse"
                      >
                        <div className="sidebar-body">
                          {filter_params.onward_flight_stops.map(
                            (data, index) => (
                              <div className="accordion-body" key={index}>
                                <div className="form-check">
                                  <input
                                    ref={filterCheckbox}
                                    className="form-check-input onward_flight_stops"
                                    type="checkbox"
                                    value=""
                                    id={`${data}onStopCheckBoxChange`}
                                    onChange={(e) =>
                                      newOnFilterChange(
                                        e,
                                        data,
                                        "onward_flight_stops"
                                      )
                                    }
                                  />
                                  <label
                                    className="form-check-label"
                                    id={`${data}onStopCheckBoxChange`}
                                  >
                                    {data} Stop {data.stop > 1 ? "s" : ""}
                                  </label>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>

                    {reissueResponse?.AirSearchReq.JourneyType === 2 && (
                      <div className="card accordion-item mb-2">
                        <h2 className="accordion-header d-flex align-items-center">
                          <button
                            type="button"
                            className="accordion-button collapsed"
                            data-bs-toggle="collapse"
                            data-bs-target="#returnStop"
                            aria-expanded="false"
                            onClick={() => changeStatusArray(3)}
                          >
                            <div className="any-root">
                              <p>Return Stop</p>
                              <small
                                className={`any-span ${
                                  checkStatusArray[3] ? "invisible" : ""
                                }`}
                              >
                                {modify_filter_params.return_flight_stops.length
                                  ? `${modify_filter_params.return_flight_stops.length} Selected`
                                  : "Any"}
                              </small>
                            </div>
                            <span
                              className={`arrow-reset ${
                                !modify_filter_params.return_flight_stops.length
                                  ? "invisible"
                                  : ""
                              }`}
                              onClick={() => resetFilter("return_flight_stops")}
                            >
                              Reset
                            </span>
                          </button>
                        </h2>
                        <div
                          id="returnStop"
                          className="accordion-collapse collapse"
                        >
                          <div className="sidebar-body">
                            {filter_params.return_flight_stops.map(
                              (data, index) => (
                                <div className="accordion-body" key={index}>
                                  <div className="form-check">
                                    <input
                                      ref={filterCheckbox}
                                      className="form-check-input return_flight_stops"
                                      type="checkbox"
                                      value=""
                                      id={`${data}onRetStopCheckBoxChange`}
                                      onChange={(e) =>
                                        newOnFilterChange(
                                          e,
                                          data,
                                          "return_flight_stops"
                                        )
                                      }
                                    />
                                    <label
                                      className="form-check-label"
                                      id={`${data}onRetStopCheckBoxChange`}
                                    >
                                      {data} Stop {data.stop > 1 ? "s" : ""}
                                    </label>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="card accordion-item mb-2">
                      <h2 className="accordion-header d-flex align-items-center">
                        <button
                          type="button"
                          className="accordion-button collapsed"
                          data-bs-toggle="collapse"
                          data-bs-target="#onwardDepartTime"
                          aria-expanded="false"
                          onClick={() => changeStatusArray(4)}
                        >
                          <div className="any-root">
                            <p>Onward Depart Time</p>
                            <small
                              className={`any-span ${
                                checkStatusArray[4] ? "invisible" : ""
                              }`}
                            >
                              {modify_filter_params.onward_depart_time.length
                                ? `${modify_filter_params.onward_depart_time.length} Selected`
                                : "Any"}
                            </small>
                          </div>
                          <span
                            className={`arrow-reset ${
                              !modify_filter_params.onward_depart_time.length
                                ? "invisible"
                                : ""
                            }`}
                            onClick={() => resetFilter("onward_depart_time")}
                          >
                            Reset
                          </span>
                        </button>
                      </h2>
                      <div
                        id="onwardDepartTime"
                        className="accordion-collapse collapse"
                      >
                        <div className="sidebar-body">
                          {filter_params.onward_depart_time.map(
                            (data, index) => (
                              <div className="accordion-body" key={index}>
                                <div className="form-check">
                                  <input
                                    ref={filterCheckbox}
                                    className="form-check-input onward_depart_time"
                                    type="checkbox"
                                    value=""
                                    id={`${data.name}onChangeOnwardDepartType`}
                                    onChange={(e) =>
                                      newOnFilterChange(
                                        e,
                                        data.name,
                                        "onward_depart_time"
                                      )
                                    }
                                  />
                                  <label
                                    className="form-check-label"
                                    id={`${data.name}onChangeOnwardDepartType`}
                                  >
                                    {data.name}
                                  </label>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>

                    {reissueResponse?.AirSearchReq.JourneyType === 2 && (
                      <div className="card accordion-item mb-2">
                        <h2 className="accordion-header d-flex align-items-center">
                          <button
                            type="button"
                            className="accordion-button collapsed"
                            data-bs-toggle="collapse"
                            data-bs-target="#returnDepartTime"
                            aria-expanded="false"
                            onClick={() => changeStatusArray(5)}
                          >
                            <div className="any-root">
                              <p>Return Depart Time</p>
                              <small
                                className={`any-span ${
                                  checkStatusArray[5] ? "invisible" : ""
                                }`}
                              >
                                {modify_filter_params.return_depart_time.length
                                  ? `${modify_filter_params.return_depart_time.length} Selected`
                                  : "Any"}
                              </small>
                            </div>
                            <span
                              className={`arrow-reset ${
                                !modify_filter_params.return_depart_time.length
                                  ? "invisible"
                                  : ""
                              }`}
                              onClick={() => resetFilter("return_depart_time")}
                            >
                              Reset
                            </span>
                          </button>
                        </h2>
                        <div
                          id="returnDepartTime"
                          className="accordion-collapse collapse"
                        >
                          <div className="sidebar-body">
                            {filter_params.return_depart_time.map(
                              (data, index) => (
                                <div className="accordion-body" key={index}>
                                  <div className="form-check">
                                    <input
                                      ref={filterCheckbox}
                                      className="form-check-input return_depart_time"
                                      type="checkbox"
                                      value=""
                                      id={`${data.name}onChangeReturnDepartType`}
                                      onChange={(e) =>
                                        newOnFilterChange(
                                          e,
                                          data.name,
                                          "return_depart_time"
                                        )
                                      }
                                    />
                                    <label
                                      className="form-check-label"
                                      id={`${data.name}onChangeReturnDepartType`}
                                    >
                                      {data.name}
                                    </label>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="card accordion-item mb-2">
                      <h2 className="accordion-header d-flex align-items-center">
                        <button
                          type="button"
                          className="accordion-button collapsed"
                          data-bs-toggle="collapse"
                          data-bs-target="#onwardArrivalTime"
                          aria-expanded="false"
                          onClick={() => changeStatusArray(6)}
                        >
                          <div className="any-root">
                            <p>Onward Arrival Time</p>
                            <small
                              className={`any-span ${
                                checkStatusArray[6] ? "invisible" : ""
                              }`}
                            >
                              {modify_filter_params.onward_arrival_time.length
                                ? `${modify_filter_params.onward_arrival_time.length} Selected`
                                : "Any"}
                            </small>
                          </div>
                          <span
                            className={`arrow-reset ${
                              !modify_filter_params.onward_arrival_time.length
                                ? "invisible"
                                : ""
                            }`}
                            onClick={() => resetFilter("onward_arrival_time")}
                          >
                            Reset
                          </span>
                        </button>
                      </h2>
                      <div
                        id="onwardArrivalTime"
                        className="accordion-collapse collapse"
                      >
                        <div className="sidebar-body">
                          {filter_params.onward_arrival_time.map(
                            (data, index) => (
                              <div className="accordion-body" key={index}>
                                <div className="form-check">
                                  <input
                                    ref={filterCheckbox}
                                    className="form-check-input onward_arrival_time"
                                    type="checkbox"
                                    value=""
                                    id={`${data.name}onChangeOnwardArrivalTime`}
                                    onChange={(e) =>
                                      newOnFilterChange(
                                        e,
                                        data.name,
                                        "onward_arrival_time"
                                      )
                                    }
                                  />
                                  <label
                                    className="form-check-label"
                                    id={`${data.name}onAirCraftChange`}
                                  >
                                    {data.name}
                                  </label>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>

                    {reissueResponse?.AirSearchReq.JourneyType === 2 && (
                      <div className="card accordion-item mb-2">
                        <h2 className="accordion-header d-flex align-items-center">
                          <button
                            type="button"
                            className="accordion-button collapsed"
                            data-bs-toggle="collapse"
                            data-bs-target="#ReturnArrivalTime"
                            aria-expanded="false"
                            onClick={() => changeStatusArray(7)}
                          >
                            <div className="any-root">
                              <p>Return Arrival Time</p>
                              <small
                                className={`any-span ${
                                  checkStatusArray[7] ? "invisible" : ""
                                }`}
                              >
                                {modify_filter_params.return_arrival_time.length
                                  ? `${modify_filter_params.return_arrival_time.length} Selected`
                                  : "Any"}
                              </small>
                            </div>
                            <span
                              className={`arrow-reset ${
                                !modify_filter_params.return_arrival_time.length
                                  ? "invisible"
                                  : ""
                              }`}
                              onClick={() => resetFilter("return_arrival_time")}
                            >
                              Reset
                            </span>
                          </button>
                        </h2>
                        <div
                          id="ReturnArrivalTime"
                          className="accordion-collapse collapse"
                        >
                          <div className="sidebar-body">
                            {filter_params.return_arrival_time.map(
                              (data, index) => (
                                <div className="accordion-body" key={index}>
                                  <div className="form-check">
                                    <input
                                      ref={filterCheckbox}
                                      className="form-check-input return_arrival_time"
                                      type="checkbox"
                                      value=""
                                      id={`${data.name}onChangeReturnArrivalTime`}
                                      onChange={(e) =>
                                        newOnFilterChange(
                                          e,
                                          data.name,
                                          "return_arrival_time"
                                        )
                                      }
                                    />
                                    <label
                                      className="form-check-label"
                                      id={`${data.name}onChangeReturnArrivalTime`}
                                    >
                                      {data.name}
                                    </label>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {filter_params.onward_transit_hour.length > 0 && (
                      <div className="card accordion-item mb-2">
                        <h2 className="accordion-header d-flex align-items-center">
                          <button
                            type="button"
                            className="accordion-button collapsed"
                            data-bs-toggle="collapse"
                            data-bs-target="#onwardTransitHour"
                            aria-expanded="false"
                            onClick={() => changeStatusArray(8)}
                          >
                            <div className="any-root">
                              <p>Onward Transit Hour</p>
                              <small
                                className={`any-span ${
                                  checkStatusArray[8] ? "invisible" : ""
                                }`}
                              >
                                {modify_filter_params.onward_transit_hour.length
                                  ? `${modify_filter_params.onward_transit_hour.length} Selected`
                                  : "Any"}
                              </small>
                            </div>
                            <span
                              className={`arrow-reset ${
                                !modify_filter_params.onward_transit_hour.length
                                  ? "invisible"
                                  : ""
                              }`}
                              onClick={() => resetFilter("onward_transit_hour")}
                            >
                              Reset
                            </span>
                          </button>
                        </h2>
                        <div
                          id="onwardTransitHour"
                          className="accordion-collapse collapse"
                        >
                          <div className="sidebar-body">
                            {filter_params.onward_transit_hour.map(
                              (data, index) => (
                                <div className="accordion-body" key={index}>
                                  <div className="form-check">
                                    <input
                                      ref={filterCheckbox}
                                      className="form-check-input onward_transit_hour"
                                      type="checkbox"
                                      value=""
                                      id={`${data.name}transitOnward`}
                                      onClick={(e) =>
                                        newOnFilterChange(
                                          e,
                                          data.name,
                                          "onward_transit_hour"
                                        )
                                      }
                                    />
                                    <label
                                      className="form-check-label"
                                      id={`${data.name}transitOnward`}
                                    >
                                      {data.name}
                                    </label>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    <div
                      className="card accordion-item mb-2"
                      style={{
                        display:
                          reissueResponse?.AirSearchReq.JourneyType === 2 &&
                          filter_params.return_transit_hour.length
                            ? "block"
                            : "none",
                      }}
                    >
                      <h2 className="accordion-header d-flex align-items-center">
                        <button
                          type="button"
                          className="accordion-button collapsed"
                          data-bs-toggle="collapse"
                          data-bs-target="#returnTransitHour"
                          aria-expanded="false"
                          onClick={() => changeStatusArray(9)}
                        >
                          <div className="any-root">
                            <p>Return Transit Hour</p>
                            <small
                              className={`any-span ${
                                checkStatusArray[9] ? "invisible" : ""
                              }`}
                            >
                              {modify_filter_params.return_transit_hour.length
                                ? `${modify_filter_params.return_transit_hour.length} Selected`
                                : "Any"}
                            </small>
                          </div>
                          <span
                            className={`arrow-reset ${
                              !modify_filter_params.return_transit_hour.length
                                ? "invisible"
                                : ""
                            }`}
                            onClick={() => resetFilter("return_transit_hour")}
                          >
                            Reset
                          </span>
                        </button>
                      </h2>
                      <div
                        id="returnTransitHour"
                        className="accordion-collapse collapse"
                      >
                        <div className="sidebar-body">
                          {filter_params.return_transit_hour.map(
                            (data, index) => (
                              <div className="accordion-body" key={index}>
                                <div className="form-check">
                                  <input
                                    ref={filterCheckbox}
                                    className="form-check-input return_transit_hour"
                                    type="checkbox"
                                    value=""
                                    id={`${data.name}transitReturn`}
                                    onClick={(e) =>
                                      newOnFilterChange(
                                        e,
                                        data.name,
                                        "return_transit_hour"
                                      )
                                    }
                                  />
                                  <label
                                    className="form-check-label"
                                    id={`${data.name}onAirCraftChange`}
                                  >
                                    {data.name}
                                  </label>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="card accordion-item mb-2">
                      <h2 className="accordion-header d-flex align-items-center">
                        <button
                          type="button"
                          className="accordion-button collapsed"
                          data-bs-toggle="collapse"
                          data-bs-target="#onwardFlyingTime"
                          aria-expanded="false"
                          onClick={() => changeStatusArray(10)}
                        >
                          <div className="any-root">
                            <p>Onward Flying Time</p>
                            <small
                              className={`any-span ${
                                checkStatusArray[10] ? "invisible" : ""
                              }`}
                            >
                              {modify_filter_params.onward_flying_time.length
                                ? `${modify_filter_params.onward_flying_time.length} Selected`
                                : "Any"}
                            </small>
                          </div>
                          <span
                            className={`arrow-reset ${
                              !modify_filter_params.onward_flying_time.length
                                ? "invisible"
                                : ""
                            }`}
                            onClick={() => resetFilter("onward_flying_time")}
                          >
                            Reset
                          </span>
                        </button>
                      </h2>
                      <div
                        id="onwardFlyingTime"
                        className="accordion-collapse collapse"
                      >
                        <div className="sidebar-body">
                          {filter_params.onward_flying_time.map(
                            (data, index) => (
                              <div className="accordion-body" key={index}>
                                <div className="form-check">
                                  <input
                                    ref={filterCheckbox}
                                    className="form-check-input onward_flying_time"
                                    type="checkbox"
                                    value=""
                                    id={`${data.name}onwardFlyingTime`}
                                    onClick={(e) =>
                                      newOnFilterChange(
                                        e,
                                        data.name,
                                        "onward_flying_time"
                                      )
                                    }
                                  />
                                  <label
                                    className="form-check-label"
                                    id={`${data.name}onwardFlyingTime`}
                                  >
                                    {data.name}
                                  </label>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>

                    <div
                      className="card accordion-item mb-2"
                      style={{
                        display:
                          reissueResponse?.AirSearchReq.JourneyType === 2
                            ? "block"
                            : "none",
                      }}
                    >
                      <h2 className="accordion-header d-flex align-items-center">
                        <button
                          type="button"
                          className="accordion-button collapsed"
                          data-bs-toggle="collapse"
                          data-bs-target="#returnFlyingTime"
                          aria-expanded="false"
                          onClick={() => changeStatusArray(11)}
                        >
                          <div className="any-root">
                            <p>Return Flying Time</p>
                            <small
                              className={`any-span ${
                                checkStatusArray[11] ? "invisible" : ""
                              }`}
                            >
                              {modify_filter_params.return_flying_time.length
                                ? `${modify_filter_params.return_flying_time.length} Selected`
                                : "Any"}
                            </small>
                          </div>
                          <span
                            className={`arrow-reset ${
                              !modify_filter_params.return_flying_time.length
                                ? "invisible"
                                : ""
                            }`}
                            onClick={() => resetFilter("return_flying_time")}
                          >
                            Reset
                          </span>
                        </button>
                      </h2>
                      <div
                        id="returnFlyingTime"
                        className="accordion-collapse collapse"
                      >
                        <div className="sidebar-body">
                          {filter_params.return_flying_time.map(
                            (data, index) => (
                              <div className="accordion-body" key={index}>
                                <div className="form-check">
                                  <input
                                    ref={filterCheckbox}
                                    className="form-check-input return_flying_time"
                                    type="checkbox"
                                    value=""
                                    id={`${data.name}returnFlyingTime`}
                                    onClick={(e) =>
                                      newOnFilterChange(
                                        e,
                                        data.name,
                                        "return_flying_time"
                                      )
                                    }
                                  />
                                  <label
                                    className="form-check-label"
                                    id={`${data.name}returnFlyingTime`}
                                  >
                                    {data.name}
                                  </label>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>

                    <div
                      className="card accordion-item mb-2"
                      style={{
                        display: filter_params.onward_layover_airport.length
                          ? "block"
                          : "none",
                      }}
                    >
                      <h2 className="accordion-header d-flex align-items-center">
                        <button
                          type="button"
                          className="accordion-button collapsed"
                          data-bs-toggle="collapse"
                          data-bs-target="#onwardLayoverAirport"
                          aria-expanded="false"
                          onClick={() => changeStatusArray(12)}
                        >
                          <div className="any-root">
                            <p>Onward Layover Airport</p>
                            <small
                              className={`any-span ${
                                checkStatusArray[12] ? "invisible" : ""
                              }`}
                            >
                              {modify_filter_params.onward_layover_airport
                                .length
                                ? `${modify_filter_params.onward_layover_airport.length} Selected`
                                : "Any"}
                            </small>
                          </div>
                          <span
                            className={`arrow-reset ${
                              !modify_filter_params.onward_layover_airport
                                .length
                                ? "invisible"
                                : ""
                            }`}
                            onClick={() =>
                              resetFilter("onward_layover_airport")
                            }
                          >
                            Reset
                          </span>
                        </button>
                      </h2>
                      <div
                        id="onwardLayoverAirport"
                        className="accordion-collapse collapse"
                      >
                        <div className="sidebar-body">
                          {filter_params.onward_layover_airport.map(
                            (data, index) => (
                              <div className="accordion-body" key={index}>
                                <div className="form-check">
                                  <input
                                    ref={filterCheckbox}
                                    className="form-check-input onward_layover_airport"
                                    type="checkbox"
                                    value=""
                                    id={`${data}onChangeOnwardLayoverCity`}
                                    onClick={(e) =>
                                      newOnFilterChange(
                                        e,
                                        data,
                                        "onward_layover_airport"
                                      )
                                    }
                                  />
                                  <label
                                    className="form-check-label"
                                    id={`${data}onChangeOnwardLayoverCity`}
                                  >
                                    {data}
                                  </label>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>

                    <div
                      className="card accordion-item mb-2"
                      style={{
                        display:
                          reissueResponse?.AirSearchReq.JourneyType === 2 &&
                          filter_params.return_layover_airport.length
                            ? "block"
                            : "none",
                      }}
                    >
                      <h2 className="accordion-header d-flex align-items-center">
                        <button
                          type="button"
                          className="accordion-button collapsed"
                          data-bs-toggle="collapse"
                          data-bs-target="#returnLayoverAirport"
                          aria-expanded="false"
                          onClick={() => changeStatusArray(13)}
                        >
                          <div className="any-root">
                            <p>Return Layover Airport</p>
                            <small
                              className={`any-span ${
                                checkStatusArray[13] ? "invisible" : ""
                              }`}
                            >
                              {modify_filter_params.return_layover_airport
                                .length
                                ? `${modify_filter_params.return_layover_airport.length} Selected`
                                : "Any"}
                            </small>
                          </div>
                          <span
                            className={`arrow-reset ${
                              !modify_filter_params.return_layover_airport
                                .length
                                ? "invisible"
                                : ""
                            }`}
                            onClick={() =>
                              resetFilter("return_layover_airport")
                            }
                          >
                            Reset
                          </span>
                        </button>
                      </h2>
                      <div
                        id="returnLayoverAirport"
                        className="accordion-collapse collapse"
                      >
                        <div className="sidebar-body">
                          {filter_params.return_layover_airport.map(
                            (data, index) => (
                              <div className="accordion-body" key={index}>
                                <div className="form-check">
                                  <input
                                    ref={filterCheckbox}
                                    className="form-check-input return_layover_airport"
                                    type="checkbox"
                                    value=""
                                    id={`${data}onChangeReturnLayoverCity`}
                                    onClick={(e) =>
                                      newOnFilterChange(
                                        e,
                                        data,
                                        "return_layover_airport"
                                      )
                                    }
                                  />
                                  <label
                                    className="form-check-label"
                                    id={`${data}onChangeReturnLayoverCity`}
                                  >
                                    {data}
                                  </label>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>

                    <div
                      className="card accordion-item mb-2"
                      style={{
                        display: filter_params.onward_destination_airport.length
                          ? "block"
                          : "none",
                      }}
                    >
                      <h2 className="accordion-header d-flex align-items-center">
                        <button
                          type="button"
                          className="accordion-button collapsed"
                          data-bs-toggle="collapse"
                          data-bs-target="#onwardDestinationAirport"
                          aria-expanded="false"
                          onClick={() => changeStatusArray(14)}
                        >
                          <div className="any-root">
                            <p>Onward Destination Airport</p>
                            <small
                              className={`any-span ${
                                checkStatusArray[14] ? "invisible" : ""
                              }`}
                            >
                              {modify_filter_params.onward_destination_airport
                                .length
                                ? `${modify_filter_params.onward_destination_airport.length} Selected`
                                : "Any"}
                            </small>
                          </div>
                          <span
                            className={`arrow-reset ${
                              !modify_filter_params.onward_destination_airport
                                .length
                                ? "invisible"
                                : ""
                            }`}
                            onClick={() =>
                              resetFilter("onward_destination_airport")
                            }
                          >
                            Reset
                          </span>
                        </button>
                      </h2>
                      <div
                        id="onwardDestinationAirport"
                        className="accordion-collapse collapse"
                      >
                        <div className="sidebar-body">
                          {filter_params.onward_destination_airport.map(
                            (data, index) => (
                              <div className="accordion-body" key={index}>
                                <div className="form-check">
                                  <input
                                    ref={filterCheckbox}
                                    className="form-check-input onward_destination_airport"
                                    type="checkbox"
                                    value=""
                                    id={`${data.name}onChangeOnwardDestinationAirport`}
                                    onClick={(e) =>
                                      newOnFilterChange(
                                        e,
                                        data,
                                        "onward_destination_airport"
                                      )
                                    }
                                  />
                                  <label
                                    className="form-check-label"
                                    id={`${data.name}onChangeOnwardDestinationAirport`}
                                  >
                                    {data}
                                  </label>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>

                    <div
                      className="card accordion-item mb-2"
                      style={{
                        display:
                          reissueResponse?.AirSearchReq.JourneyType === 2 &&
                          filter_params.return_destination_airport.length
                            ? "block"
                            : "none",
                      }}
                    >
                      <h2 className="accordion-header d-flex align-items-center">
                        <button
                          type="button"
                          className="accordion-button collapsed"
                          data-bs-toggle="collapse"
                          data-bs-target="#returnDestinationAirport"
                          aria-expanded="false"
                          onClick={() => changeStatusArray(15)}
                        >
                          <div className="any-root">
                            <p>Return Destination Airport</p>
                            <small
                              className={`any-span ${
                                checkStatusArray[15] ? "invisible" : ""
                              }`}
                            >
                              {modify_filter_params.return_destination_airport
                                .length
                                ? `${modify_filter_params.return_destination_airport.length} Selected`
                                : "Any"}
                            </small>
                          </div>
                          <span
                            className={`arrow-reset ${
                              !modify_filter_params.return_destination_airport
                                .length
                                ? "invisible"
                                : ""
                            }`}
                            onClick={() =>
                              resetFilter("return_destination_airport")
                            }
                          >
                            Reset
                          </span>
                        </button>
                      </h2>
                      <div
                        id="returnDestinationAirport"
                        className="accordion-collapse collapse"
                      >
                        <div className="sidebar-body">
                          {filter_params.return_destination_airport.map(
                            (data, index) => (
                              <div className="accordion-body" key={index}>
                                <div className="form-check">
                                  <input
                                    ref={filterCheckbox}
                                    className="form-check-input return_destination_airport"
                                    type="checkbox"
                                    value=""
                                    id={`${data}onChangeReturnDestinationAirport`}
                                    onClick={(e) =>
                                      newOnFilterChange(
                                        e,
                                        data,
                                        "return_destination_airport"
                                      )
                                    }
                                  />
                                  <label
                                    className="form-check-label"
                                    id={`${data}onChangeReturnDestinationAirport`}
                                  >
                                    {data}
                                  </label>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-9">
                <div className="main-content">
                  <div className="best-filters">
                    <div
                      className={`filter-item ${
                        filterActive === "earliest"
                          ? "filter-active active"
                          : ""
                      }`}
                      onClick={() => sortFlightList("earliest")}
                    >
                      <div className="choice">Earliest</div>
                      <div className="item-price">
                        {APICurrencyType} {flightStats?.earliest.totalPrice}
                      </div>
                      <div className="travel-duration">
                        {
                          flightStats?.earliest.travelTimes[0]
                            .TotalTravelDuration
                        }{" "}
                        (Total Travel Time)
                      </div>
                    </div>
                    <div
                      className={`filter-item ${
                        filterActive === "cheapest"
                          ? "filter-active active"
                          : ""
                      }`}
                      onClick={() => sortFlightList("cheapest")}
                    >
                      <div className="choice">Cheapest</div>
                      <div className="item-price">
                        {APICurrencyType} {flightStats?.cheapest.totalPrice}
                      </div>
                      <div className="travel-duration">
                        {
                          flightStats?.cheapest.travelTimes[0]
                            .TotalTravelDuration
                        }{" "}
                        (Total Travel Time)
                      </div>
                    </div>
                    <div
                      className={`filter-item ${
                        filterActive === "fastest" ? "filter-active active" : ""
                      }`}
                      onClick={() => sortFlightList("fastest")}
                    >
                      <div className="choice">Fastest</div>
                      <div className="item-price">
                        {APICurrencyType} {flightStats?.fastest.totalPrice}
                      </div>
                      <div className="travel-duration">
                        {
                          flightStats?.fastest.travelTimes[0]
                            .TotalTravelDuration
                        }{" "}
                        (Total Travel Time)
                      </div>
                    </div>
                  </div>

                  <div className="all-result list-wrapper-3">
                    <div className="flight-item">
                      <div className="single-flight">
                        <div className="row align-items-center">
                          <div className="col-lg-6">
                            <div className="row">
                              <div className="col-lg-3">
                                <div className="airbus">
                                  <img
                                    src={`${imgUrl}${data.PlatingCarrier}.gif`}
                                    alt=""
                                  />
                                  <div className="airbus-info">
                                    <div className="name">
                                      {data.PlatingCarrierName}
                                    </div>
                                    <div className="name">
                                      <strong>
                                        {`${data.Onwards[0].Origin} - ${
                                          data.Onwards[data.Onwards.length - 1]
                                            .Destination
                                        }`}
                                      </strong>
                                    </div>
                                    {data.TotalTravelTimes[0]
                                      ?.TotalLayoverTime && (
                                      <div className="flight-no">
                                        {millisecondsToDayHourMin(
                                          data.TotalTravelTimes[0]
                                            ?.TotalLayoverTime
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="col-4 col-lg-3">
                                <div className="flight-infos depart">
                                  <div className="flight-time">
                                    {data.Onwards[0].DepartureTime.toLocaleString(
                                      "en-US",
                                      {
                                        hour: "numeric",
                                        minute: "numeric",
                                        hour12: true,
                                      }
                                    )}
                                  </div>
                                  <div className="flight-month">
                                    {data.Onwards[0].DepartureTime.toLocaleString(
                                      "en-US",
                                      {
                                        month: "short",
                                        day: "numeric",
                                        weekday: "short",
                                      }
                                    )}
                                  </div>
                                  <div className="airport-name">
                                    {`${data.Onwards[0].OriginAirPortName}, ${data.Onwards[0].OriginAirPortName}`}
                                  </div>
                                </div>
                              </div>
                              <div className="col-4 col-lg-3">
                                <div className="time-stop">
                                  <div className="total-time">
                                    {
                                      data.TotalTravelTimes[0]
                                        ?.TotalTravelDuration
                                    }
                                  </div>
                                  <div className="quick-view">
                                    {[
                                      ...Array(
                                        data.TotalTravelTimes[0].NoOfStop
                                      ),
                                    ].map((_, stopIndex) => (
                                      <span
                                        key={stopIndex}
                                        data-toggle="popover"
                                        data-trigger="hover"
                                      >
                                        <strong>
                                          {`${data.Onwards[stopIndex].OriginAirPortName} - ${data.Onwards[stopIndex].DestinationAirPortName}`}
                                        </strong>
                                        <p>
                                          Travel Time:{" "}
                                          {
                                            data.Onwards[stopIndex]
                                              .TravelDuration
                                          }
                                        </p>
                                        <p>
                                          Layover Time:{" "}
                                          {data.Onwards[stopIndex].LayoverTime}
                                        </p>
                                      </span>
                                    ))}
                                  </div>
                                  <div className="total-stop">
                                    {`${data.TotalTravelTimes[0]?.NoOfStop} ${
                                      data.TotalTravelTimes[0]?.NoOfStop > 1
                                        ? "Stops"
                                        : "Stop"
                                    }`}
                                  </div>
                                </div>
                              </div>
                              <div className="col-4 col-lg-3">
                                <div className="flight-infos arrive">
                                  <div className="flight-time">
                                    {data.Onwards[
                                      data.Onwards.length - 1
                                    ].ArrivalTime.toLocaleString("en-US", {
                                      hour: "numeric",
                                      minute: "numeric",
                                      hour12: true,
                                    })}
                                  </div>
                                  <div className="flight-month">
                                    {data.Onwards[
                                      data.Onwards.length - 1
                                    ].ArrivalTime.toLocaleString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                      weekday: "short",
                                    })}
                                  </div>
                                  <div className="airport-name">
                                    {`${
                                      data.Onwards[data.Onwards.length - 1]
                                        .DestinationAirPortName
                                    }, ${
                                      data.Onwards[data.Onwards.length - 1]
                                        .DestinationAirPortName
                                    }`}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {reissueResponse.AirSearchReq.JourneyType === 2 && (
                              <div className="row">
                                <hr />
                                <div className="col-lg-3">
                                  <div className="airbus">
                                    <img
                                      src={`${imgUrl}${data.PlatingCarrier}.gif`}
                                      alt=""
                                    />
                                    <div className="airbus-info">
                                      <div className="name">
                                        {data.PlatingCarrierName}
                                      </div>
                                      <div className="name">
                                        <strong>
                                          {`${data.Returns[0].Origin} - ${
                                            data.Returns[
                                              data.Returns.length - 1
                                            ].Destination
                                          }`}
                                        </strong>
                                      </div>
                                      {data.TotalTravelTimes[1]
                                        ?.TotalLayoverTime && (
                                        <div className="flight-no">
                                          {millisecondsToDayHourMin(
                                            data.TotalTravelTimes[1]
                                              ?.TotalLayoverTime
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-4 col-lg-3">
                                  <div className="flight-infos depart">
                                    <div className="flight-time">
                                      {data.Returns[0].DepartureTime.toLocaleString(
                                        "en-US",
                                        {
                                          hour: "numeric",
                                          minute: "numeric",
                                          hour12: true,
                                        }
                                      )}
                                    </div>
                                    <div className="flight-month">
                                      {data.Returns[0].DepartureTime.toLocaleString(
                                        "en-US",
                                        {
                                          month: "short",
                                          day: "numeric",
                                          weekday: "short",
                                        }
                                      )}
                                    </div>
                                    <div className="airport-name">
                                      {`${data.Returns[0].OriginAirPortName}, ${data.Returns[0].OriginAirPortName}`}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-4 col-lg-3">
                                  <div className="time-stop">
                                    <div className="total-time">
                                      {
                                        data.TotalTravelTimes[1]
                                          ?.TotalTravelDuration
                                      }
                                    </div>
                                    <div className="quick-view">
                                      {[
                                        ...Array(
                                          data.TotalTravelTimes[1].NoOfStop
                                        ),
                                      ].map((_, stopIndex) => (
                                        <span
                                          key={stopIndex}
                                          data-toggle="popover"
                                          data-trigger="hover"
                                        >
                                          <strong>
                                            {`${data.Returns[stopIndex].OriginAirPortName} - ${data.Returns[stopIndex].DestinationAirPortName}`}
                                          </strong>
                                          <p>
                                            Travel Time:{" "}
                                            {
                                              data.Returns[stopIndex]
                                                .TravelDuration
                                            }
                                          </p>
                                          <p>
                                            Layover Time:{" "}
                                            {
                                              data.Returns[stopIndex]
                                                .LayoverTime
                                            }
                                          </p>
                                        </span>
                                      ))}
                                    </div>
                                    <div className="total-stop">
                                      {`${data.TotalTravelTimes[1]?.NoOfStop} ${
                                        data.TotalTravelTimes[1]?.NoOfStop > 1
                                          ? "Stops"
                                          : "Stop"
                                      }`}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-4 col-lg-3">
                                  <div className="flight-infos arrive">
                                    <div className="flight-time">
                                      {data.Returns[
                                        data.Returns.length - 1
                                      ].ArrivalTime.toLocaleString("en-US", {
                                        hour: "numeric",
                                        minute: "numeric",
                                        hour12: true,
                                      })}
                                    </div>
                                    <div className="flight-month">
                                      {data.Returns[
                                        data.Returns.length - 1
                                      ].ArrivalTime.toLocaleString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        weekday: "short",
                                      })}
                                    </div>
                                    <div className="airport-name">
                                      {`${
                                        data.Returns[data.Returns.length - 1]
                                          .DestinationAirPortName
                                      }, ${
                                        data.Returns[data.Returns.length - 1]
                                          .DestinationAirPortName
                                      }`}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="col-lg-6">
                            <div className="price-box-main">
                              <div
                                className="old-total-price price-box"
                                style={{ background: "#fef5e7" }}
                              >
                                <div className="price-box-title">
                                  Previous Total Fare
                                </div>
                                <div className="price-box-price">
                                  {APICurrencyType} <br />{" "}
                                  {reissueResponse?.BookingResponseJson.AirPriceCheckResponse.TotalPrice.toFixed(
                                    2
                                  )}
                                </div>
                              </div>
                              <div
                                className="new-total-price price-box"
                                style={{ background: "#fdebd0" }}
                              >
                                <div className="price-box-title">
                                  New Total Fare
                                </div>
                                <div className="price-box-price">
                                  {APICurrencyType} <br />{" "}
                                  {(
                                    data.NewTotalPrice +
                                    data.SupplierTotalServiceCharge +
                                    data.TotalServiceCharge
                                  ).toFixed(2)}
                                </div>
                              </div>
                              <div
                                className="payable-amount price-box"
                                style={{ background: "#fbe1b8" }}
                              >
                                <div className="price-box-title">
                                  Payable Amount
                                </div>
                                <div className="price-box-price">
                                  {APICurrencyType} <br />{" "}
                                  {data.TotalPrice.toFixed(2)}
                                </div>
                              </div>

                              <div className="price-book price-box">
                                {/* <div className="price">{APICurrencyType} <br /> {data.TotalPrice}</div> */}
                                <div className="booking">
                                  <button
                                    className="booking-btn"
                                    onClick={() =>
                                      showFlightDetail(flightDetailPopup, data)
                                    }
                                  >
                                    Select
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-12">
                            <div
                              className="bag-details"
                              style={{ marginTop: "10px" }}
                            >
                              <div className="baggage-info-list">
                                <div>
                                  Baggage:
                                  <span
                                    data-toggle="popover"
                                    data-trigger="mouseenter mouseleave"
                                  >
                                    <svg
                                      className="mb-1"
                                      width="18"
                                      height="18"
                                      viewBox="0 0 22 22"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M15.3443 5.27199C16.2934 5.27199 17.0755 6.04532 17.0755 7.02956V16.6962C17.0755 17.6893 16.2934 18.4538 15.3443 18.4538C15.3443 18.9635 14.9312 19.3326 14.4391 19.3326C13.9997 19.3326 13.5603 18.9635 13.5603 18.4538H8.28761C8.28761 18.9635 7.84822 19.3326 7.40882 19.3326C6.9167 19.3326 6.50367 18.9635 6.50367 18.4538C5.55458 18.4538 4.77246 17.6893 4.77246 16.6962V7.02956C4.77246 6.04532 5.55458 5.27199 6.50367 5.27199H8.28761V2.63562C8.28761 2.12593 8.69185 1.75684 9.1664 1.75684H12.6816C13.1561 1.75684 13.5603 2.12593 13.5603 2.63562V5.27199H15.3443ZM12.2422 5.27199V3.07502H9.60579V5.27199H12.2422ZM7.40882 7.90835V15.8174H8.72701V7.90835H7.40882ZM13.1209 7.90835V15.8174H14.4391V7.90835H13.1209ZM10.2649 7.90835V15.8174H11.5831V7.90835H10.2649Z"
                                        fill="#98A2B3"
                                      ></path>
                                    </svg>
                                  </span>
                                  <div id="baggageTemplate">
                                    {data.Onwards.map(
                                      (baggage, baggageIndex) => (
                                        <div key={baggageIndex}>
                                          <strong>{`${baggage.Origin}-${
                                            baggage.Destination
                                          }: ${
                                            baggage.AirBaggageAllowance || "N/A"
                                          }`}</strong>
                                        </div>
                                      )
                                    )}
                                    {reissueResponse?.AirSearchReq
                                      .JourneyType === 2 && (
                                      <>
                                        <hr />
                                        {data.Returns.map(
                                          (baggage, seatIndex) => (
                                            <div key={seatIndex}>
                                              <strong>{`${baggage.Origin}-${
                                                baggage.Destination
                                              }: ${
                                                baggage.AirBaggageAllowance ||
                                                "N/A"
                                              }`}</strong>
                                            </div>
                                          )
                                        )}
                                      </>
                                    )}
                                  </div>
                                </div>
                                <div>
                                  {" "}
                                  | Class:{" "}
                                  <strong>
                                    {reissueResponse?.AirSearchReq.ClassType}
                                  </strong>
                                </div>
                                <div>
                                  {" "}
                                  | Seats:
                                  <span
                                    data-toggle="popover"
                                    data-trigger="mouseenter mouseleave"
                                  >
                                    <img
                                      style={{ width: "16px" }}
                                      src="assets/images/seat.png"
                                      alt=""
                                    />
                                  </span>
                                  <div id="seatTemplate">
                                    {data.Onwards.map((seat, seatIndex) => (
                                      <div key={seatIndex}>
                                        <strong>{`${seat.Origin}-${
                                          seat.Destination
                                        }: ${
                                          seat.BookingCount || "N/A"
                                        }`}</strong>
                                      </div>
                                    ))}
                                    {reissueResponse?.AirSearchReq
                                      .JourneyType === 2 && (
                                      <>
                                        <hr />
                                        {data.Returns.map((seat, seatIndex) => (
                                          <div key={seatIndex}>
                                            <strong>{`${seat.Origin}-${
                                              seat.Destination
                                            }: ${
                                              seat.BookingCount || "N/A"
                                            }`}</strong>
                                          </div>
                                        ))}
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="details-view-btm">
                                <a
                                  href="javascript:void(0)"
                                  className="details-btn"
                                  id="toggleDetails"
                                  onClick={() => toggleDetailsView(i)}
                                >
                                  View Details
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`flight-details detailsView${i}`}
                        style={{ display: showDetails ? "block" : "none" }}
                      >
                        <div className="flight-details-header">
                          <div className="titles">Flight Details</div>
                        </div>

                        <div className="flight-details-body">
                          <ul
                            className="nav nav-pills mb-3"
                            id="pills-tab"
                            role="tablist"
                          >
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link active"
                                id="flightDep-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#flightDep"
                                type="button"
                                role="tab"
                                aria-controls="flightDep"
                                aria-selected="true"
                              >
                                <div className="srcdest">
                                  <div className="srcdest-left">
                                    {data.Onwards[0].Origin} -{" "}
                                    {
                                      data.Onwards[data.Onwards.length - 1]
                                        .Destination
                                    }
                                  </div>
                                  <div className="srcdest-right">
                                    {
                                      data.TotalTravelTimes[0]
                                        .TotalTravelDuration
                                    }
                                  </div>
                                </div>
                              </button>
                            </li>

                            {data.Returns.length > 0 && (
                              <li className="nav-item" role="presentation">
                                <button
                                  className="nav-link"
                                  id="flightDep2-tab"
                                  data-bs-toggle="pill"
                                  data-bs-target="#flightDep2"
                                  type="button"
                                  role="tab"
                                  aria-controls="flightDep2"
                                  aria-selected="false"
                                >
                                  <div className="srcdest">
                                    <div className="srcdest-left">
                                      {data.Returns[0].Origin} -{" "}
                                      {
                                        data.Returns[data.Returns.length - 1]
                                          .Destination
                                      }
                                    </div>
                                    <div className="srcdest-right">
                                      {
                                        data.TotalTravelTimes[1]
                                          .TotalTravelDuration
                                      }
                                    </div>
                                  </div>
                                </button>
                              </li>
                            )}
                          </ul>
                          <div className="tab-content" id="pills-tabContent">
                            <div
                              className="tab-pane fade show active"
                              id="flightDep"
                              role="tabpanel"
                              aria-labelledby="flightDep-tab"
                              tabIndex="0"
                            >
                              {data.Onwards.map((item, index) => (
                                <div className="departure-flight" key={index}>
                                  <div className="seg-operating-airline">
                                    Operated by{" "}
                                    <b>{item.OperatingCarrierName}</b> -{" "}
                                    {item.Equipment}
                                  </div>
                                  <div className="timing-main d-flex align-items-center">
                                    <div className="timing-left d-flex flex-column align-items-center">
                                      <div className="duration-container">
                                        {item.TravelDuration}
                                      </div>
                                    </div>
                                    <div className="timing-right d-flex flex-column">
                                      <div className="d-flex flex-column timeline-elt">
                                        <i className="far fa-dot-circle timeline-icon"></i>
                                        <div className="joining-line"></div>
                                        <div className="flight-detail">
                                          <img
                                            src={`${imgUrl}${item.OperatingCarrier}.gif`}
                                            alt=""
                                          />
                                          <div className="airbus-info">
                                            <div className="flight-no">
                                              {item.OperatingCarrier} -{" "}
                                              {item.OperatingFlightNumber}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="location-time-info">
                                          <span className="seg-details-dep-time">
                                            {item.DepartureTime}
                                          </span>
                                          <span className="seg-details-dep-city">
                                            {item.OriginAirPortName} (
                                            {item.Origin})
                                          </span>
                                          <span className="seg-details-dep-date">
                                            {item.DepartureTime}
                                          </span>
                                        </div>
                                        <div className="seg-details-dep-airport">
                                          {item.OriginAirPortName}
                                        </div>
                                        {item.OriginTerminal && (
                                          <div className="seg-details-terminal">
                                            Terminal {item.OriginTerminal}
                                          </div>
                                        )}
                                      </div>

                                      <div className="baggage-info">
                                        <div>
                                          Baggage:{" "}
                                          <svg
                                            className="mb-1"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 22 22"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M15.3443 5.27199C16.2934 5.27199 17.0755 6.04532 17.0755 7.02956V16.6962C17.0755 17.6893 16.2934 18.4538 15.3443 18.4538C15.3443 18.9635 14.9312 19.3326 14.4391 19.3326C13.9997 19.3326 13.5603 18.9635 13.5603 18.4538H8.28761C8.28761 18.9635 7.84822 19.3326 7.40882 19.3326C6.9167 19.3326 6.50367 18.9635 6.50367 18.4538C5.55458 18.4538 4.77246 17.6893 4.77246 16.6962V7.02956C4.77246 6.04532 5.55458 5.27199 6.50367 5.27199H8.28761V2.63562C8.28761 2.12593 8.69185 1.75684 9.1664 1.75684H12.6816C13.1561 1.75684 13.5603 2.12593 13.5603 2.63562V5.27199H15.3443ZM12.2422 5.27199V3.07502H9.60579V5.27199H12.2422ZM7.40882 7.90835V15.8174H8.72701V7.90835H7.40882ZM13.1209 7.90835V15.8174H14.4391V7.90835H13.1209ZM10.2649 7.90835V15.8174H11.5831V7.90835H10.2649Z"
                                              fill="#98A2B3"
                                            ></path>
                                          </svg>
                                          <strong>
                                            {item.AirBaggageAllowance || "N/A"}
                                          </strong>
                                        </div>
                                        <div>
                                          {" "}
                                          | Class:{" "}
                                          <strong>
                                            {
                                              reissueResponse?.AirSearchReq
                                                .ClassType
                                            }{" "}
                                            ({item.BookingCode})
                                          </strong>
                                        </div>
                                        <div>
                                          {" "}
                                          | Fare Basis:{" "}
                                          <strong>
                                            {item.FareBasis || "N/A"}
                                          </strong>
                                        </div>
                                        <div>
                                          {" "}
                                          | Seats:{" "}
                                          <strong>
                                            {item.BookingCount || "N/A"}
                                          </strong>
                                        </div>
                                      </div>

                                      <div className="d-flex flex-column timeline-elt">
                                        <i className="far fa-dot-circle timeline-icon"></i>
                                        <div className="flight-detail">
                                          <img
                                            src={`${imgUrl}${item.OperatingCarrier}.gif`}
                                            alt=""
                                          />
                                          <div className="airbus-info">
                                            <div className="flight-no">
                                              {item.OperatingCarrier} -{" "}
                                              {item.OperatingFlightNumber}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="location-time-info">
                                          <span className="seg-details-dep-time">
                                            {item.ArrivalTime}
                                          </span>
                                          <span className="seg-details-dep-city">
                                            {item.DestinationAirPortName} (
                                            {item.Destination})
                                          </span>
                                          <span className="seg-details-dep-date">
                                            {item.ArrivalTime}
                                          </span>
                                        </div>
                                        <div className="seg-details-dep-airport">
                                          {item.DestinationAirPortName}
                                        </div>
                                        {item.DestinationTerminal && (
                                          <div className="seg-details-terminal">
                                            Terminal {item.DestinationTerminal}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  {item.LayoverTime && (
                                    <div className="layover-section">
                                      <div className="layover-icon">
                                        <i className="far fa-clock"></i>
                                      </div>
                                      <div className="layover-desc">
                                        <div className="layover-duration">
                                          {item.LayoverTime} transit in
                                        </div>
                                        <div className="layover-place">
                                          {item.DestinationAirPortName}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {showSkeletonLoading && (
                      <div>
                        {skeletonArray.map((item, index) => (
                          <div key={index} className="skeleton-box">
                            <div style={{ display: "flex" }}>
                              <div style={{ flex: 0.15 }}>
                                <div className="left-box"></div>
                              </div>
                              <div style={{ flex: 1 }}>
                                <div
                                  className="skeleton-line"
                                  style={{ width: "90%" }}
                                ></div>
                                <div
                                  className="skeleton-line"
                                  style={{ width: "80%" }}
                                ></div>
                                <div
                                  className="skeleton-line"
                                  style={{ width: "70%" }}
                                ></div>
                              </div>

                              <div style={{ flex: 0.25 }} className="right-box">
                                <div
                                  className="skeleton-line"
                                  style={{ width: "90%" }}
                                ></div>
                                <div
                                  className="skeleton-line"
                                  style={{ width: "80%" }}
                                ></div>
                                <div
                                  className="skeleton-line"
                                  style={{
                                    width: "90%",
                                    height: "25px",
                                    borderRadius: "30px",
                                  }}
                                ></div>
                              </div>
                            </div>
                            <div className="skeleton-line padding-line"></div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {shownFlightList.length === 0 && !showSkeletonLoading && (
                    <div className="error-message-section">
                      <div className="error-img">
                        <img
                          src="assets/images/4.svg"
                          alt=""
                          style={{ width: "35%" }}
                        />
                      </div>
                      <div className="error-content">
                        <h3>
                          Unfortunately, we couldn't find any flights for you!
                        </h3>
                        <p>
                          No flights match your filters. Please adjust your
                          search criteria and try again. Good Luck!
                        </p>
                        <button className="btn" onClick={resetAllFilter}>
                          Reset Filters
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default FlightList;
