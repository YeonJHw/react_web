import { useState } from "react";
import Input from "../util/InputFrm";
import "./memberChangePw.css";
import { Button1 } from "../util/Buttons";
import axios from "axios";
import Swal from "sweetalert2";
const MemberChangePw = (props) => {
  const [isPwauth, setIsPwauth] = useState(false);
  const [currPw, setCurrPw] = useState("");
  const [memberPw, setMemberPw] = useState("");
  const [memberPwRe, setMemberPwRe] = useState("");
  const setIsLogin = props.setIsLogin;
  const token = window.localStorage.getItem("token");
  const pwCheck = () => {
    axios
      .post(
        "/member/pwCheck",
        { memberPw: currPw },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        if (res.data == 1) {
          setIsPwauth(true);
        } else {
          Swal.fire({
            title: "비밀번호가 일치하지 않습니다.",
          });
        }
        console.log(res.data);
      })
      .catch((res) => {
        if (res.response.status === 403) {
          window.localStorage.removeItem("token");
          setIsLogin(false);
        }
      });
  };
  const changePw = () => {
    const token = window.localStorage.getItem("token");
    if (memberPw !== "" && memberPwRe === memberPw) {
      axios
        .post(
          "/member/changePw",
          { memberPw },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          // window.localStorage.removeItem("token");
          // setIsLogin(false);
          if (res.data === 1) {
            setIsPwauth(false);
            setCurrPw("");
            setMemberPw("");
            setMemberPwRe("");
            Swal.fire({
              icon: "success",
              title: "비밀번호가 변경되었습니다.",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "비밀번호가 변경 중 오류가 발생했습니다.",
            });
          }
        })
        .catch((res) => {
          if (res.response.status === 403) {
            window.localStorage.removeItem("token");
            setIsLogin(false);
          }
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "비밀번호가 일치하지 않습니다.",
      });
    }
  };
  return (
    <div className="my-content-wrap">
      <div className="my-content-title">비밀번호 변경</div>
      <div className="pw-auth">
        {isPwauth ? (
          <>
            <div className="new-pw-input-wrap">
              <div className="pw-input-wrap">
                <div>
                  <label htmlFor="memberPw">새 비밀번호</label>
                  <Input
                    type="password"
                    data={memberPw}
                    setData={setMemberPw}
                    content="memberPw"
                  />
                </div>
                <div>
                  <label htmlFor="memberPw">새 비밀번호 확인</label>
                  <Input
                    type="password"
                    data={memberPwRe}
                    setData={setMemberPwRe}
                    content="memberPwRe"
                  />
                </div>
              </div>
            </div>
            <div className="change-btn-box">
              <Button1 text="변경하기" clickEvent={changePw} />
            </div>
          </>
        ) : (
          <div className="pw-input-wrap">
            <div>
              <label htmlFor="currPw">현재 비밀번호</label>
              <Input
                data={currPw}
                setData={setCurrPw}
                type="password"
                content="currPw"
              />
              <Button1 text="확인" clickEvent={pwCheck} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default MemberChangePw;
