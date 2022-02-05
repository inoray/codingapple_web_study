/* eslint-disable */
import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  let [modal, modal변경] = useState(false);

  let [post, changePost] = useState([
    {title: '남자 코드 추천', like: 0},
    {title: '강남 고기 맛집', like: 0},
    {title: '유튜브 추천', like: 0}
  ]);

  let [idxSelected, changeIdx] = useState(0);

  let [newTitle, changeNewTitle] = useState("");

  function addPost (){
    let newPost = [...post];
    newPost.unshift({title: newTitle, like: 0});
    changePost(newPost);
  }

  return (
    <div className="App">
      <div className='black-nav'>
        <div>개발 blog</div>
      </div>

      {
        post.map ( (a, i)=> {

          function incLike(i){
            let newPost = [...post];
            newPost[i].like = newPost[i].like + 1;
            changePost(newPost);
           }

          return (
            <div className="list" key={i}>
              <h3 onClick={ ()=>{ changeIdx(i) } }>{a.title} <span onClick={ ()=>{ incLike(i) } }>👍</span> {a.like} </h3>
              <p>2월 17일 발행</p>
              <hr/>
            </div>
          )
        })
      }

      <div className="publish">
        <input onChange={ (e)=>{ changeNewTitle(e.target.value) } }/>
        <button onClick={ ()=>{ addPost() } }>저장</button>
      </div>

      <button onClick={()=>{ modal변경( !modal ) }}>상세내용</button>

      {
        modal
        ? <Modal post={post} idx={idxSelected} />
        : null
      }

    </div>
  );
}

function Modal(props){
  return(
    <div className="modal">
      <h2>{props.post[props.idx].title}</h2>
      <p>날짜</p>
      <p>내용</p>
    </div>
  );
}

export default App;
