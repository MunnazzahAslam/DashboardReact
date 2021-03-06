import React, { Component } from "react";
import Dropdown from "react-dropdown";
import logo from "./logo.png";
import ".././dashboard.css";
import WidgetMap from "./widgetmap";
import Widgetcol from "./widgetcol";
import Widgettext from "./widgettext";
import Widgetdoughnut from "./widgetdoughnut";
import { Col, Row, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-dropdown/style.css";
import "react-dropdown/style.css";

const config = {
  apiKey: "AIzaSyDMu-Vw30ykPPmFT3cXeunzKEi4EahzglI",
  spreadsheetId: "1vcDPrMexD8bxNwwzK9IxF8wch6Hfezq2eooJACDiqgg"
};
const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;

export class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      dropdownOptions: [],
      trendStore: [],
      optedVal: null,
      socialSource: null,
      avgSessionTime: null,
      bounceRate: null,
      organicSourceViews: null,
      directSourceViews: null
    };
  }

  getData = (arg) => {
    const arr = this.state.items;
    const arrLen = arr.length;
    let socialSource = 0;
    let avgSessionTime = 0;
    let bounceRate = 0;
    let organicSourceViews = 0;
    let directSourceViews = 0;
    let referralSourceViews = 0;
    let pageViews = 0;
    let users = 0;
    let newUsers = 0;
    // eslint-disable-next-line no-unused-vars
    let optedVal = null;
    let trendStore = [];
    let usersArr = [];
    for (let i = 0; i < arrLen; i++) {
      if (arg === arr[i]["month"]) {
        socialSource = arr[i].social_source;
        avgSessionTime = arr[i].avg_session_time;
        bounceRate = arr[i].bounce_rate;
        organicSourceViews = arr[i].organic_source;
        directSourceViews = arr[i].direct_source;
        referralSourceViews = arr[i].referral_source;
        pageViews = arr[i].page_views;
        users = arr[i].users;
        newUsers = arr[i].new_users;
        trendStore.push(
          {
            label: "Oraganic Source",
            value: arr[i].organic_source
          },
          {
            label: "Referral Source",
            value: arr[i].referral_source
          },
          {
            label: "Direct Source",
            value: arr[i].direct_source
          },
          {
            label: "Page Views",
            value: arr[i].page_views
          }
        );
        usersArr.push(
          {
            label: "Users",
            value: arr[i].users
          },
          {
            label: "New Users",
            value: arr[i].new_users
          }
        );
      }
    }
    optedVal = arg;

    this.setState({
      socialSource: socialSource,
      avgSessionTime: avgSessionTime,
      bounceRate: bounceRate,
      organicSourceViews: organicSourceViews,
      directSourceViews: directSourceViews,
      referralSourceViews: referralSourceViews,
      pageViews: pageViews,
      users: users,
      newUsers: newUsers,
      trendStore: trendStore,
      usersArr: usersArr
    });
  };

  updateDashboard = (event) => {
    this.getData(event.value);
    this.setState({ optedVal: event.value });
  };

  componentDidMount() {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let batchRowValues = data.valueRanges[0].values;

        const rows = [];

        for (let i = 1; i < batchRowValues.length; i++) {
          let rowObject = {};
          for (let j = 0; j < batchRowValues[i].length; j++) {
            rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
          }
          rows.push(rowObject);
        }

        // dropdown options
        let dropdownOptions = [];

        for (let i = 0; i < rows.length; i++) {
          dropdownOptions.push(rows[i].month);
        }

        dropdownOptions = Array.from(new Set(dropdownOptions)).reverse();
        this.setState(
          {
            items: rows,
            dropdownOptions: dropdownOptions,
            optedVal: "Jan 2018"
          },
          () => this.getData("Jan 2018")
        );
      });
  }

  render() {
    return (
      <div>
        <Container fluid>
          <Row className="TopHeader">
            <Col>
              <img height="50px" width="80px" src={logo} alt="Logo" />
            </Col>
            <Col>
              <Dropdown
                className="dropdown"
                options={this.state.dropdownOptions}
                onChange={this.updateDashboard}
                value={this.state.optedVal}
                placeholder="Select a month"
              />
            </Col>
          </Row>
        </Container>
        <br />
        <Container>
          <Row>
            <Col>
              <Widgettext
                title="Organic Source"
                value={this.state.organicSourceViews}
              />
            </Col>
            <Col>
              <Widgettext
                title="Referral Source"
                value={this.state.referralSourceViews}
              />
            </Col>
            <Col>
              <Widgettext
                title="Direct Source"
                value={this.state.directSourceViews}
              />
            </Col>
            <Col>
              <Widgettext title="Page Views" value={this.state.pageViews} />
            </Col>
          </Row>
        </Container>
        <br />
        <Container>
          <Row>
            <Col>
              <Widgettext description="In information technology, a dashboard is a user interface that, somewhat resembling an automobile's dashboard, organizes and presents information in a way that is easy to read. However, a computer dashboard is more likely to be interactive than an automobile dashboard (unless it is also computer-based)." />
            </Col>
          </Row>
        </Container>
        <br />
        <Container>
          <Row>
            <Col>
              <Widgettext title="Bounce Rate" value={this.state.bounceRate} />
            </Col>
            <Col>
              <Widgettext
                title="Page Views"
                value={this.state.avgSessionTime}
              />
            </Col>
            <Col>
              <Widgettext
                title="Social Source"
                value={this.state.socialSource}
              />
            </Col>
          </Row>
        </Container>
        <br />
        <Container>
          <Row>
            <Col>
              <Widgetcol
                title="Source Comparision"
                data={this.state.trendStore}
              />
            </Col>
            <Col>
              <Widgetdoughnut
                title="User Comparision"
                data={this.state.usersArr}
              />
            </Col>
          </Row>
        </Container>
        <br />
        <Container fluid>
          <Row>
            <Col>
              <WidgetMap />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Dashboard;
