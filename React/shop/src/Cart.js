import React from 'react';
import {Table, Button, Alert} from 'react-bootstrap';
import {connect, useDispatch, useSelector} from 'react-redux';

function Cart(props){
    let state = useSelector((state) => state);
    let dispatch = useDispatch();

    return (
        <div>
        <Table responsive>
            <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경</th>
            </tr>

            {state.reducer.map((a, i)=>{
                return (
                    <tr key={i}>
                        <td>{a.id}</td>
                        <td>{a.name}</td>
                        <td>{a.quan}</td>
                        <td>
                            <Button variant="primary" onClick={() => {dispatch({type: "inc", payload: {id: a.id}})}}>+</Button>
                            <Button variant="danger" onClick={() => {dispatch({type: "dec", payload: {id: a.id}})}}> - </Button>
                        </td>
                    </tr>
                );
            })    }

            {
                state.reducer2
                ? <Alert variant='primary'>
                    <p>재고가 얼마 남지 않았습니다.</p>
                    <Button onClick={()=>{dispatch({type: "disable"})}}>닫기</Button>
                </Alert>
                : null
            }

        </Table>
        </div>
    )
}

// function stateProps (state){
//     return {
//         state: state.reducer,
//         stateAlert: state.reducer2
//     }
// }

// export default connect(stateProps)(Cart);
export default Cart;
