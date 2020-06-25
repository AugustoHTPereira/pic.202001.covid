import React from "react";
import Axios from "axios";
import { Bar } from "react-chartjs-2";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
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

          this.setState({ ...this.state, data });

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

          this.setState({ ...this.state, data })

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

          const data = results;

          this.setState({ ...this.state, data });
          console.log('state', this.state)
        } catch (error) {
          console.error(error);
        }
      },
    },
  ];

  Chart() {

    // const data = this.state.datachart;
    const data = null;

    return (
      <>
        {/* <Bar
          data={data}
          options={{
            title: {
              display: true,
              text: "Valor do bolsa família distribuído por cidade",
            },
          }}
          width="600px"
          height="400px"
          ref={this.chartReference} /> */}
      </>
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
                <Bar data={this.state.data} />
              </div>
            </div>
          </div>
        </div>
        <div className="ds-cm"></div>
      </div>
    );
  }
}

// const Home = () => {
//   const [requestResults, setRequestResults] = useState([]);
//   const chartReference = React.createRef();
//   const [dataChart, setDataChart] = useState({});
//   const [Chart, setChart] = useState(null);

// const doRequest = async (uri) => {
//   const request = Axios.create();
//   try {
//     return (await request.get(uri)).data;
//   } catch (error) {
//     throw error;
//   }
// };

// const options = [
//   {
//     name: "MUNDO",
//     value: "per_country",
//     checked: true,
//     meta: async () => {
//       const results = await doRequest(
//         "https://covid19-brazil-api.now.sh/api/report/v1/countries"
//       );
//       console.log("per_country", results);
//       setRequestResults(results);
//     },
//   },
//   {
//     name: "BRASIL",
//     value: "brazil",
//     checked: false,
//     meta: async () => {
//       const results = await doRequest(
//         "https://covid19-brazil-api.now.sh/api/report/v1"
//       );
//       console.log("brazil", results);
//       console.log(typeof results);
//       setRequestResults(results);
//       const dataChart = {
//         labels: results.data.map((x) => `${x.state} ${x.uf}`),
//         datasets: [
//           { label: "Mortes", data: results.data.map((x) => x.deaths) },
//           { label: "Casos", data: results.data.map((x) => x.cases) },
//           { label: "Suspeitos", data: results.data.map((x) => x.suspects) },
//           { label: "Descartados", data: results.data.map((x) => x.refuses) },
//         ],
//       };

//       setChart(<Bar ref={chartReference} data={dataChart} />);
//     },
//   },
//   {
//     name: "MINAS GERAIS",
//     value: "minas_gerais",
//     checked: false,
//     meta: async () => {
//       const results = await doRequest(
//         "https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/mg"
//       );
//       console.log("minas_gerais", results);
//       console.log(typeof results);
//       setRequestResults(results);
//     },
//   },
//   ];
// };

export default Home;
