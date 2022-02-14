
/* eslint-disable */
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Alert, Nav } from 'react-bootstrap';
import {재고context} from './App.js';
import {CSSTransition} from 'react-transition-group';
import './Detail.css';
import {connect} from 'react-redux';

function Detail(props){

  let {id} = useParams();
  let history = useHistory();
  let 재고 = useContext(재고context);

  let [tab, setTab] = useState(0);
  let [tabSwitch, setTabSwitch] = useState(false);

  let found = props.shoes.find((e)=>{
    return e.id == id;
  });

  let [viewAlert, setViewAlert] = useState(true);

  // Detail 컴포넌트가 첫 등장하고나서 실행하고 싶은 코드
  useEffect(()=>{
    let timer = setTimeout(()=>{setViewAlert(false)}, 2000);

    // Detail 컴포넌트가 사라질 때 실행하고 싶은 코드는 리턴할 때 넣어야 함.
    return ()=>{ clearTimeout(timer) };
  }, [viewAlert]);

  return (
    <div className="container">
      {
        viewAlert
        ? <MyAlert/>
        : null
      }
      <div className="row">
        <div className="col-md-6">
          <img src={'https://codingapple1.github.io/shop/shoes'+ (parseInt(found.id) + 1) + '.jpg'} width="100%" />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{props.shoes[id].title}</h4>
          <p>{found.content}</p>
          <p>{found.price}원</p>
          <p>{재고}</p>
          <Info 재고={props.재고[id]}/>
          <button className="btn btn-danger" onClick={()=>{
            let cur재고 = props.재고[id] - 1;

            props.재고변경( cur재고 );
            props.dispatch({type:"addItem", payload:{id : 2, name : '새신발', quan : 1}});
            history.push("/cart");
            }}>주문하기</button>
          <button className="btn btn-danger" onClick={ ()=>{history.goBack()} }>뒤로가기</button>
        </div>
      </div>

      <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link eventKey="link-0" onClick={()=>{setTab(0); setTabSwitch(false)}}>Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={()=>{setTab(1); setTabSwitch(false)}}>Option 2</Nav.Link>
        </Nav.Item>
      </Nav>

      <CSSTransition in={tabSwitch} classNames="wow" timeout={500}>
        <TabContent tab={tab} setTabSwitch={setTabSwitch}/>
      </CSSTransition>

    </div>
  );
}

function MyAlert(){
  return (
  <Alert key='0' variant='primary'>
    재고가 얼마 남지 않았습니다.
  </Alert>
  );
}

function Info(props){
  return (
    <p>재고: {props.재고}</p>
  );
}

function TabContent(props){

  useEffect(()=>{
    props.setTabSwitch(true);
  });

  if (props.tab === 0){
    return <div>0번째 내용입니다.</div>;
  } else if (props.tab === 1){
    return <div>1번째 내용입니다.</div>;
  }
}

function stateProps (state){
  return {
      state: state.reducer,
      stateAlert: state.reducer2
  }
}

export default connect(stateProps)(Detail);