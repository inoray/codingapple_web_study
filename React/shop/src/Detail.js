
/* eslint-disable */
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

function Detail(props){

  let {id} = useParams();
  let history = useHistory();

  let found = props.shoes.find((e)=>{
    return e.id == id;
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img src={'https://codingapple1.github.io/shop/shoes'+ (parseInt(found.id) + 1) + '.jpg'} width="100%" />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{props.shoes[id].title}</h4>
          <p>{found.content}</p>
          <p>{found.price}원</p>
          <button className="btn btn-danger">주문하기</button>
          <button className="btn btn-danger" onClick={ ()=>{history.goBack()} }>뒤로가기</button>
        </div>
      </div>
    </div>
  );
}

export default Detail;