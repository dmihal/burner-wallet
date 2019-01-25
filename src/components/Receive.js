import React from 'react';
import Ruler from "./Ruler";
import Balance from "./Balance";
import {CopyToClipboard} from "react-copy-to-clipboard";
import Blockies from 'react-blockies';
import RecentTransactions from './RecentTransactions';
import { scroller } from 'react-scroll'
const QRCode = require('qrcode.react');

export default class Receive extends React.Component {

  constructor(props) {
    super(props);
    let initialState = {
    }
  }
  render() {
    let {buttonStyle,ERC20TOKEN,address, balance, changeAlert, changeView, dollarDisplay, subBalanceDisplay,account} = this.props

    let url = window.location.protocol+"//"+window.location.hostname
    if(window.location.port&&window.location.port!=80&&window.location.port!=443){
      url = url+":"+window.location.port
    }
    let qrSize = Math.min(document.documentElement.clientWidth,512)-90
    let qrValue = url+"/"+address

    return (
      <div>
        <div className="send-to-address w-100">
          <CopyToClipboard text={address} onCopy={() => {
            changeAlert({type: 'success', message: 'Address copied to clipboard'})
          }}>
            <div className="content qr row" style={{cursor:"pointer"}}>
              <QRCode value={qrValue} size={qrSize}/>
              <div className="input-group">
                <input type="text" className="form-control" style={{color:"#999999"}} value={address} disabled/>
                <div className="input-group-append">
                  <span className="input-group-text"><i style={{color:"#999999"}}  className="fas fa-copy"/></span>
                </div>
              </div>
            </div>
          </CopyToClipboard>
          <RecentTransactions
            max={5}
            buttonStyle={buttonStyle}
            ERC20TOKEN={ERC20TOKEN}
            transactionsByAddress={ERC20TOKEN?this.props.fullTransactionsByAddress:this.props.transactionsByAddress}
            changeView={this.changeView}
            address={account}
            block={this.props.block}
            recentTxs={ERC20TOKEN?this.props.fullRecentTxs:this.props.recentTxs}
          />
        </div>
        <div name="theVeryBottom" className="text-center bottom-text">
          <span style={{padding:10}}>
            <a href="#" style={{color:"#FFFFFF"}} onClick={()=>{this.props.goBack()}}>
              <i className="fas fa-times"/> cancel
            </a>
          </span>
        </div>
      </div>
    )
  }
}
