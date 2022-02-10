
/* eslint-disable */
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import {재고context} from './App.js';

function Detail(props){

  let {id} = useParams();
  let history = useHistory();
  let 재고 = useContext(재고context);

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

            props.재고변경( cur재고 )
            }}>주문하기</button>
          <button className="btn btn-danger" onClick={ ()=>{history.goBack()} }>뒤로가기</button>
        </div>
      </div>
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

export default Detail;