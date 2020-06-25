import React from "react";
import Axios from "axios";
import { Bar } from "react-chartjs-2";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataChart: null,
      ref: React.createRef()
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
        // const results = await doRequest(
        //   "https://covid19-brazil-api.now.sh/api/report/v1/countries"
        // );
        // console.log("per_country", results);
        // setRequestResults(results);
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
          console.log("brazil", results);
          console.log(typeof results);
          // setRequestResults(results);
          const dataChart = {
            labels: results.data.map((x) => `${x.state} ${x.uf}`),
            datasets: [
              { label: "Mortes", data: results.data.map((x) => x.deaths) },
              { label: "Casos", data: results.data.map((x) => x.cases) },
              { label: "Suspeitos", data: results.data.map((x) => x.suspects) },
              {
                label: "Descartados",
                data: results.data.map((x) => x.refuses),
              },
            ],
          };

          console.log("datachart", dataChart);

          this.setState({...this.state, datachart: dataChart})
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
        // const results = await doRequest(
        //   "https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/mg"
        // );
        // console.log("minas_gerais", results);
        // console.log(typeof results);
        // setRequestResults(results);
      },
    },
  ];

  Chart() {
    // return (
    //   <Bar
    //     options={{
    //       title: {
    //         display: true,
    //         text: "COVID",
    //       },
    //     }}
    //     width="600px"
    //     height="400px"
    //     // ref={this.state.ref}
    //     data={this.state.dataChart}
    //   />
    // );
    console.log(this)
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
                <this.Chart />
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
