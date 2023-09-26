import { useState } from "react"; //여러 export중 하나만 하는 경우 괄호를 쳐줘야함
import "./join.css";
import Input from "../util/InputFrm";
import axios from "axios";
import { Button1, Button2, Button3 } from "../util/Buttons";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const Join = () => {
  const [memberId, setMemberId] = useState("");
  const [memberPw, setMemberPw] = useState("");
  const [memberPwRe, setMemberPwRe] = useState("");
  const [memberName, setMemberName] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [checkIdMsg, setCheckIdMsg] = useState("");
  const [checkPwMsg, setCheckPwMsg] = useState("");
  const navigate = useNavigate();
  const idCheck = () => {
    const idReg = /^[a-zA-Z0-9]{4,8}$/;
    if (!idReg.test(memberId)) {
      //정규표현식 만족하지 못했을때
      setCheckIdMsg("아이디는 영어 대/소문자/숫자로 4~8글자 입니다.");
    } else {
      //정규표현식 만족했을 때 -> DB에 중복체크
      axios
        // .get("/member/checkId", { params: { memberId: memberId } })// 포스트타입도 같은 방식으로 값 전달
        .get("/member/checkId/" + memberId)
        .then((res) => {
          //function
          console.log(res.data); //응답 객체에 data속성이 controller에서 리턴한 데이터
          if (res.data == 0) {
            setCheckIdMsg("");
          } else {
            setCheckIdMsg("이미 사용중인 아이디입니다.");
          }
        })
        .catch(function (res) {
          //error
          console.log(res);
        });
      setCheckIdMsg("정규표현식 만족");
    }
  };
  const pwCheck = () => {
    if (memberPw !== memberPwRe) {
      setCheckPwMsg("비밀번호가 일치하지 않습니다.");
    } else {
      setCheckPwMsg("");
    }
  };
  const join = () => {
    if (checkIdMsg === "" && checkPwMsg === "") {
      /*const member = {
        memberId: memberId,
        memberPw: memberPw,
        memberName: memberName,
        memberPhone: memberPhone,
      };*/

      //새로운 문법
      const member = { memberId, memberPw, memberName, memberPhone };
      axios
        // .post("/member/join", null, { params: member })
        .post("/member/join", member)
        .then((res) => {
          if (res.data === 1) {
            navigate("/login");
          } else {
            Swal.fire("입력값을 확인해주세요.");
          }
        })
        .catch((res) => {
          console.log(res.data);
        });
    } else {
      Swal.fire("입력값을 확인하세요");
    }
  };
  //   const changeMemberPw = (e) => {
  //     const inputPw = e.currentTarget.value;
  //     setMemberPw(inputPw);
  //   };
  //   const changeMemberId = (e) => {
  //     const inputId = e.currentTarget.value;
  //     setMemberId(inputId);
  //   };
  return (
    <div className="join-wrap">
      <div className="join-title">회원가입</div>
      {/* <Input data={memberId} setData={setMemberId} type="text" /> */}
      {/* <input type="text" value={memberId} onChange={changeMemberId} /> */}
      <JoinInputWrap
        data={memberId}
        setData={setMemberId}
        type="type"
        content="memberId"
        label="아이디"
        checkMsg={checkIdMsg}
        blurEvent={idCheck}
      ></JoinInputWrap>
      <JoinInputWrap
        data={memberPw}
        setData={setMemberPw}
        type="password"
        content="memberPw"
        label="비밀번호"
      ></JoinInputWrap>
      <JoinInputWrap
        data={memberPwRe}
        setData={setMemberPwRe}
        type="password"
        content="memberPwRe"
        label="비밀번호 확인"
        checkMsg={checkPwMsg}
        blurEvent={pwCheck}
      ></JoinInputWrap>
      <JoinInputWrap
        data={memberName}
        setData={setMemberName}
        type="type"
        content="memberName"
        label="이름"
      ></JoinInputWrap>
      <JoinInputWrap
        data={memberPhone}
        setData={setMemberPhone}
        type="type"
        content="memberPhone"
        label="전화번호"
      ></JoinInputWrap>
      <div className="join-btn-box">
        <Button2 text="회원가입" clickEvent={join} />
      </div>
    </div>
  );
};
const JoinInputWrap = (props) => {
  const data = props.data;
  const setData = props.setData;
  const type = props.type;
  const content = props.content;
  const label = props.label;
  const blurEvent = props.blurEvent;
  const checkMsg = props.checkMsg;

  return (
    <div className="join-input-wrap">
      <div>
        <div className="label">
          <label htmlFor={content}>{label}</label>
        </div>
        <div className="input">
          <Input
            type={type}
            data={data}
            setData={setData}
            content={content}
            blurEvent={blurEvent}
          />
        </div>
      </div>
      <div className="check-msg">{checkMsg}</div>
    </div>
  );
};
export default Join;
