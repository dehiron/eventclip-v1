//Component
// import {useState} from 'react';
import {Navbar,Nav, NavDropdown} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
// import { getGeocode, getLatLng } from "use-places-autocomplete";
// import address from "./nextvitz.js";

function Header (props){

    //**************Seedアドレス取得用コード****************/
    // const results = []
    // const wait = (sec) => {
    //     return new Promise((resolve, reject) => {
    //       setTimeout(resolve, sec*1000);
    //       //setTimeout(() => {reject(new Error("エラー！"))}, sec*1000);
    //     });
    //   };

    // const generator = async () => {
    //     for (let i = 600; i < 800; i++){

    //         if (i % 200 === 0　&& i !== 0){
    //             console.log(results);
    //             await wait (60)
    //         }
    //         await wait(1)
    //         const geoCodeInfo = await getGeocode({address:address[i]});
    //         const {lat,lng} = await getLatLng(geoCodeInfo[0]);
    //         const result = {id:1010+1+i, event_name:`event${1010+1+i}`, start_date:'2021-01-20', end_date:'2031-06-20', date_detail:"開催期間についての補足情報", category:'スポット', start_time:'11:00', end_time:'17:00', time_detail:"開催時間についての補足情報", state:"関東", prefecture:'東京都', city:'渋谷区', address:address[i], latitude:lat, longitude:lng, facility_name:`event${1010+1+i}施設`, tel:'0300000000', description:'サンプル！', description_detail:"さらに詳しいイベントについての詳細説明",　park_spots:'有/30台',　park_price:'平日8:00~22:00 300円/10分 平日22:00~8:00 100円/60分 土日8:00~22:00 500円/10分 土日22:00~8:00 100円/60分', price_detail:"大人700円　子供300円", credit_card_info:"可", owner_id:'hide_owner', tag:["家族と","デートに","お一人様","癒されたい","ワクワクする"], link_to_hp:'XXXXXXXX.com', img1:'https://picsum.photos/600/400'}
            
    //         results.push(result);
    //     }
    //     console.log(results);
    // }
    //**************Seedアドレス取得用コード****************/


    const handleClickToOwnerPage = () => {
        props.history.push("/owner");
    }
    const handleClickToEventsPage = () => {
        props.history.push("/events");
    }
    


    return(
        <Navbar className="bootstrap-navbar" expand="md" fixed="top">
            <Navbar.Brand href="/" > <img src="../logo.png" alt="logo"/> </Navbar.Brand>
            {/* hrefでコードの見た目良くできるけど、イベント登録ページでのAPIでエラーが起きるのでonClickを使う。 */}
            <NavDropdown id="map-or-list" title={props.mapOrList}>
                <NavDropdown.Item onSelect={()=>props.setMapOrList("Mapで表示")}>Mapで表示</NavDropdown.Item>
                <NavDropdown.Item onSelect={()=>props.setMapOrList("一覧で表示")}>一覧で表示</NavDropdown.Item>
            </NavDropdown>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse className="justify-content-end">
                <Nav>
                    <Nav.Item>
                        <Nav.Link onClick={ handleClickToEventsPage }>イベント一覧</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={ handleClickToOwnerPage }>イベント登録</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Nav>
                    {/* <Nav.Item>
                        <Nav.Link onClick={ generator }>Seed用アドレス取得</Nav.Link>
                    </Nav.Item> */}
                </Nav>
                <Nav>
                    <Nav.Item>
                        <Nav.Link onClick={ null }>ログイン/新規登録</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};

export default withRouter(Header);