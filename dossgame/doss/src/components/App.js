import React, { Component } from 'react';
import chart from '../logos/chart.png';
import btc from '../logos/btc.png';
import eth from '../logos/eth.png';
import link from '../logos/link.png';
import ada from '../logos/ada.png';
import xmr from '../logos/xmr.png';
import yfi from '../logos/yfi.png';
import lend from '../logos/lend.png';
import comp from '../logos/comp.png';
import uni from '../logos/uni.png';
import gnt from '../logos/gnt.png';
import "./App.css";
const axios = require("axios");

class App extends Component {

  async componentWillMount() {
    await this.getData()
  }

  //getting&setting cryptocurrencies data
  getData = () => {
    //getting ccurencies data
    axios({
      "method":"GET",
      "url":"https://coinpaprika1.p.rapidapi.com/tickers",
      "headers":{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"coinpaprika1.p.rapidapi.com",
        "x-rapidapi-key":"YOUR_RAPID_API_KEY",
        "useQueryString":true
      }
    })
    .then((response)=>{
      //assign all ccurencies data from API into variable
      const coins = response.data
      //declare ccurencies and their imgs
      const ccArray = [
        { name: 'Bitcoin', img: btc },
        { name: 'Ethereum', img: eth },
        { name: 'Chainlink', img: link },
        { name: 'Cardano', img: ada },
        { name: 'Monero', img: xmr },
        { name: 'yearn.finance', img: yfi },
        { name: 'Aave', img: lend },
        { name: 'Compound', img: comp },
        { name: 'Uniswap', img: uni },
        { name: 'Golem', img: gnt }
      ]

      /* search for chosen cryptocurrencies, then add them to the state */
      //get ccurency from ccArray 
      for(let j=0; j<ccArray.length; j++){
        //get ccurrency from API
        for (let i=0; i<coins.length; i++){
          //if current ccurrency API == current ccurrency from ccArray
          if(coins[i].name === ccArray[j].name){
            //add img to the ccurrency API data
            coins[i]['img'] = ccArray[j].img
            //set state with updated data
            this.setState({
              ccData: [...this.state.ccData, coins[i]]
            })
          }
        }
      }
      //sort ccurrencies by rank
      this.setState({
        ccData: this.state.ccData.sort((a,b) => a.rank-b.rank)
      })
    })
    .catch((error)=>{
      console.log(error)
    })

    //getting ccurrency market data
    axios({
      "method":"GET",
      "url":"https://coinpaprika1.p.rapidapi.com/global",
      "headers":{
      "content-type":"application/octet-stream",
      "x-rapidapi-host":"coinpaprika1.p.rapidapi.com",
      "x-rapidapi-key":"YOUR_RAPID_API_KEY",
      "useQueryString":true
      }
    })
    .then((response)=>{
      const globalData = response.data
      this.setState({ loading: true })
      //set state with updated global ccurency market cap
      this.setState({ ccGlobalMcap: globalData.market_cap_usd })
      this.setState({ loading: false })
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      ccData: [],
      ccGlobalMcap: '',
      loading: true
    }
  }

  render() {
    return (
      <div>
      <div className="login">
        <a href="" className="button1" rel="noopener">
          Log In
        </a>
      </div>
      <div className="signup">
      <a href="" className="button1"  rel="noopener">Sign UP</a>
      </div>
      <div>
      <div class="nav-wrapper">
  <div class="sl-nav">
    
    <ul>
      <li><b>Deutsch</b> <i class="fa fa-angle-down" aria-hidden="true"></i>
        <div class="triangle"></div>
        <ul>
          <li><div id="germany"></div> <span class="active">Deutsch</span></li>
          <li><div id="germany"></div> <span>Englisch</span></li>
        </ul>
      </li>
    </ul>
  </div>
</div>
      </div>
      <div className="navabar">
      <nav>
     
  <label for="drop" class="toggle">&#8801; Menu</label>
  <input type="checkbox" id="drop" />
  <ul class="menu">
  <img src={coin}></img>
    <li><a href="#">Cryptocurrencies</a></li>
    <li> 
     
      <label for="drop-1" class="toggle">Exchanges</label>
      <a href="#">Exchanges</a>
      <input type="checkbox" id="drop-1"/>
      <ul>
        <li><a href="#">Service 1</a></li>
        <li><a href="#">Service 2</a></li>
        <li><a href="#">Service 3</a></li>
      </ul>
    </li>
    <li> 
      
      
      <label for="drop-2" class="toggle">Community</label>
      <a href="#">Community</a>
      <input type="checkbox" id="drop-2"/>
      <ul>
        <li><a href="#">Portfolio 1</a></li>
        <li><a href="#">Portfolio 2</a></li>
        <li> 
          
        
          <label for="drop-3" class="toggle">Products</label>
          <a href="#">Products</a>
          <input type="checkbox" id="drop-3"/>
          <ul>
            <li><a href="#">HTML/CSS</a></li>
            <li><a href="#">jQuery</a></li>
            <li><a href="#">Python</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li><a href="#">Products</a></li>
    <li><a href="#">Learn</a></li>
    
  </ul>
</nav>


      </div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow text-monospace text-white">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
           
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={chart} width="30" height="30" className="d-inline-block align-top" alt="" />
            Crypt0 Track3r
          </a>
          {this.state.loading ? <div id="loader" className="nav-item text-nowrap d-none d-sm-none d-sm-block">Loading...</div> :
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small>global crypto market:</small>&nbsp;$
              <a
                className="text-white"
                href="https://coinpaprika.com/market-overview/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {(this.state.ccGlobalMcap).toLocaleString("fr-CH")}
              </a>&nbsp;
            </li>
          }
        </nav>
        &nbsp;
          <div className="container-fluid mt-5 w-50 p-3">
            <div className="row">
              <main role="main" className="col-lg-12 d-flex text-center">
                  <table className="table table-striped table-hover table-fixed table-bordered text-monospace">
                    <caption>Data Source: 
                      <a target="_blank" rel="noopener noreferrer" href="https://coinpaprika.com/">coinpaprika</a>
                    </caption>
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">Rank</th>
                        <th scope="col">Logo</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Market Cap</th>
                      </tr>
                    </thead>
                      <tbody>
                        {this.state.ccData.map((data, key) => {
                          return(
                            <tr key={key}>
                              <td>{data.rank}</td>
                              <td><img src={data.img} width="25" height="25" className="d-inline-block align-top" alt="" /></td>
                              <td><a target="_blank" rel="noopener noreferrer" href={"https://coinpaprika.com/coin/" + data.id}>{data.name}</a></td>
                              <td>${(data.quotes.USD.price).toFixed(2)}</td>
                              <td>${(data.quotes.USD.market_cap).toLocaleString("fr-CH")}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                  </table>
                }
              </main>
            </div>
          </div>
      </div>
    );
  }
}

export default App;