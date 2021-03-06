import React from "react";
import styled from "styled-components";
import Tooltip from "@jonny/tooltip";
import InfoIcon from "./InfoIcon";
import getFlag from "./get-flag";

const Container = styled.div`
  flex-direction: row;
  display: flex;
  max-width: 900px;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  padding-top: 12px;
  padding-bottom: 12px;
  @media screen and (max-width: 800px) {
    flex-direction: column;
    padding-left: 30px;
  }
`;

const Fact = styled.div`
  flex: 1;
  text-align: left;
  @media screen and (max-width: 800px) {
    display: flex;
    flex-direction: row;
  }
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const Num = styled.div`
  font-size: 30px;
  font-weight: bold;
  font-family: "Roboto Condensed";
  @media screen and (max-width: 800px) {
    font-size: 14px;
    &:before {
      content: ": ";
    }
  }
`;

const getCountries = () =>
  fetch(
    `https://api.jonny.run/.netlify/functions/index/countries`
  ).then((response) => response.json());

const getAverageDistance = () =>
  fetch(
    `https://api.jonny.run/.netlify/functions/index/average-distance`
  ).then((response) => response.json());

export default class extends React.Component {
  state = {
    countries: null,
    distance: null,
  };
  componentDidMount() {
    getCountries().then((data) => {
      this.setState({
        countries: data.countries,
      });
    });

    getAverageDistance().then((data) => {
      this.setState({
        distance: data.distance,
      });
    });
  }
  render() {
    const { total } = this.props;
    return (
      <Container>
        <Fact>
          <Title>Days</Title>
          <Num>{total}</Num>
        </Fact>
        <Fact>
          <Title>Did run today yet</Title>
          <Num>No</Num>
        </Fact>
        <Fact>
          <Title>
            WR progress{" "}
            <Tooltip
              preferredPlacement="top"
              tip={
                <div>
                  The world record for running every day is 19'032 (52 years 39
                  days)
                  <br />
                  and is held by Ron Hill according to Streak Runners
                  International,
                </div>
              }
              style={{
                fontFamily: "Arial, Helvetica",
              }}
            >
              <span>
                <InfoIcon style={{ height: 14, width: 14, marginTop: -1 }} />
              </span>
            </Tooltip>
          </Title>
          <Num>{((total / 19032) * 100).toFixed(2)}%</Num>
        </Fact>
        <Fact>
          <Title>
            Countries{" "}
            <Tooltip
              preferredPlacement="bottom"
              tip={
                <div>
                  {this.state.countries
                    ? this.state.countries.map((c) => (
                        <div
                          key={c}
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src={getFlag(c)}
                            style={{ height: 20, marginRight: 5 }}
                            alt={c}
                          />
                          {c}
                        </div>
                      ))
                    : null}
                </div>
              }
              style={{
                display: this.state.countries ? "inline" : "none",
                fontFamily: "Arial, Helvetica",
              }}
            >
              <span>
                <InfoIcon style={{ height: 14, width: 14, marginTop: -1 }} />
              </span>
            </Tooltip>
          </Title>
          <Num>
            {this.state.countries ? this.state.countries.length : "..."}
          </Num>
        </Fact>
        <Fact>
          <Title>Avg. distance</Title>
          <Num>
            {this.state.distance
              ? (this.state.distance / 1000).toFixed(2) + "km"
              : "..."}
          </Num>
        </Fact>
      </Container>
    );
  }
}
