import React from "react";
import Axios from "axios";
import { Bar } from "react-chartjs-2";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      generateChart: false
    };
  }

  async doRequest(uri) {
    const request = Axios.create();
    try {
      return (await request.get(uri)).data;
    } catch (error) {
      throw error;
    }
  }

  options = [
    {
      name: "MUNDO",
      value: "per_country",
      checked: true,
      meta: async () => {
        try {
          const results = await this.doRequest(
            "https://covid19-brazil-api.now.sh/api/report/v1/countries"
          );

          const data = {
            labels: results.data.map((x) => `${x.country}`),
            datasets: [
              { label: "Mortes", data: results.data.map((x) => x.deaths), backgroundColor: "#e63946", fill: true },
              { label: "Casos", data: results.data.map((x) => x.cases), backgroundColor: "#a8dadc", fill: true },
              { label: "Suspeitos", data: results.data.map((x) => x.suspects), backgroundColor: "#e9c46a", fill: true },
              {
                label: "Descartados",
                data: results.data.map((x) => x.refuses), backgroundColor: "#e76f51", fill: true
              },
            ],
          };

          this.setState({ ...this.state, data, generateChart: true });

          console.log('state', this.state)
        } catch (error) {
          console.error(error);
        }
      },
    },
    {
      name: "BRASIL",
      value: "brazil",
      checked: false,
      meta: async () => {
        try {
          const results = await this.doRequest(
            "https://covid19-brazil-api.now.sh/api/report/v1"
          );

          const data = {
            labels: results.data.map((x) => `${x.state} ${x.uf}`),
            datasets: [
              { label: "Mortes", data: results.data.map((x) => x.deaths), backgroundColor: "#e63946", fill: true },
              { label: "Casos", data: results.data.map((x) => x.cases), backgroundColor: "#a8dadc", fill: true },
              { label: "Suspeitos", data: results.data.map((x) => x.suspects), backgroundColor: "#e9c46a", fill: true },
              {
                label: "Descartados",
                data: results.data.map((x) => x.refuses), backgroundColor: "#e76f51", fill: true
              },
            ],
          };

          this.setState({ ...this.state, data, generateChart: true })

          console.log('state', this.state);
        } catch (error) {
          console.error(error.message);
        }
      },
    },
    {
      name: "MINAS GERAIS",
      value: "minas_gerais",
      checked: false,
      meta: async () => {
        try {
          const results = await this.doRequest(
            "https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/mg"
          );

          const data = {
            labels: ['Minas Gerais'],
            datasets: [
              {
                label: 'Mortes', data: [results.deaths], fill: true, backgroundColor: "#e63946"
              },
              { label: 'Casos', data: [results.cases], fill: true, backgroundColor: "#a8dadc" },
              { label: 'Suspeitos', data: [results.suspects], fill: true, backgroundColor: "#e9c46a" },
              { label: 'Descartados', data: [results.refuses], fill: true, backgroundColor: "#e76f51" },
            ]
          };

          this.setState({ ...this.state, data: data, generateChart: true });
          console.log('state', this.state)
        } catch (error) {
          console.error(error);
        }
      },
    },
  ];

  RenderPanels({ data }) {
    // return (
    //   <pre>
    //     {JSON.stringify(data)}
    //   </pre>
    // )

    return (
      <>
        <ul className="cards-inline">
          <li className="card card-light">
            <div>
              {
                data.cases
              }
            </div>
            <div>
              CASOS
          </div>
          </li>
          <li className="card card-warn">
            <div>
              {
                data.suspects
              }
            </div>
            <div>
              SUSPEITOS
          </div>
          </li>
          <li className="card card-danger">
            <div>
              {
                data.deaths
              }
            </div>
            <div>
              MORTES
          </div>
          </li>
          <li className="card card-info">
            <div>
              {
                data.refuses
              }
            </div>
            <div>
              DESCARTADOS
          </div>
          </li>
        </ul>
      </>
    )
  }

  RenderChart({ data }) {
    console.log('data', data)
    return (
      <Bar data={data} />
    )
  }

  render() {
    return (
      <div className="page-content">
        <div className="content">
          <div className="header">
            <h1 className="app-title">COVID MONITOR</h1>
          </div>

          <div className="grid-content">
            <div className="card">
              <div className="card-content">
                <ul className="flex">
                  {this.options.map((opt) => (
                    <li key={opt.value}>
                      <span className="btn-check btn-primary">
                        <input
                          onChange={async (e) => {
                            opt.checked = true;
                            await opt.meta();
                          }}
                          type="radio"
                          name="cbOpts"
                          id={opt.value}
                        />
                        <label htmlFor={opt.value}>{opt.name}</label>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                {
                  this.state.generateChart ?
                    <this.RenderChart data={this.state.data} />
                    : !this.state.data ?
                      (<p>Selecione uma opção</p>)
                      : <this.RenderPanels data={this.state.data} />
                }

              </div>
            </div>
          </div>
        </div>
        <div className="ds-cm"></div>
      </div>
    );
  }
}

export default Home;
