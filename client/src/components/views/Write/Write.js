import React, { Component } from 'react';
import './Write.css'
import LikeSectionContent from './LikeSectionContent'
import ListSectionContent from './ListSectionContent'
import {NavLink} from 'react-router-dom'
import { Button } from 'antd';
import { DownCircleTwoTone,UpCircleTwoTone } from '@ant-design/icons';
import axios from 'axios'


var userId = localStorage.getItem('userId')

class WriteMain extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isToggleOn: true,
      user:'',
      bookTitle:[]
     }
  }
  onClickToggle = () => {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }
  componentDidMount() {
    this.setState({
      user: userId
    })
    axios.get('api/create/get-all-title',{params: { userId: userId }})
      .then(res => {
        console.log(res)
        console.log(res.data.bookTitle)
        this.setState({
          bookTitle:res.data.bookTitle
        })
      })
  }
  render() { 
    return ( 
      <div className="write_container">
        <div style={{fontSize:"13px", fontWeight:"700"}}>즐겨찾기</div>
        <br/>
        {this.state.isToggleOn ? <LikeSectionContent bookTitle={this.state.bookTitle}/> : ''}
        
        <div style={{textAlign:"center", marginTop:"-20px"}}>
        {this.state.isToggleOn ? <UpCircleTwoTone twoToneColor="#bfbfbf" onClick={this.onClickToggle} style={{fontSize:'25px'}}/> 
                              : <div style={{borderBottom:"1px solid lightgrey", marginTop:"10px", marginBottom:"20px"}}>
                                  <div style={{marginBottom:"-15px"}}>
                                    <DownCircleTwoTone twoToneColor="#bfbfbf" onClick={this.onClickToggle} style={{fontSize:'25px'}}/>
                                  </div>
                                </div>}
        
        </div>
        <NavLink to="/naming" exact ><Button type="primary" className="make_new_book" size="small">새로만들기</Button></NavLink> 
        <div className="book_list_container_in_write">
          <ListSectionContent bookTitle={this.state.bookTitle}/>
        </div>
      </div>
     );
  }
}
 
export default WriteMain;