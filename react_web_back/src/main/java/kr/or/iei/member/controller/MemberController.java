package kr.or.iei.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.iei.member.model.service.MemberService;
import kr.or.iei.member.model.vo.Member;

@RestController//비동기요청용 컨트롤러 @Responsebody 안붙여도 됨
@RequestMapping(value = "/member")
public class MemberController {
	@Autowired
	private MemberService memberService;
//	@GetMapping(value="/checkId")
//	public int checkId(String memberId) {
//		Member m = memberService.selectOneMember(memberId);
//		if(m == null) {
//			return 0;			
//		} else {
//			System.out.println(m);
//			return 1;	//return 값 = data
//		}
//	}
	@GetMapping(value = "/checkId/{memberId}")
	public int checkId(@PathVariable String memberId) {
		Member m = memberService.selectOneMember(memberId);
		if(m == null) {
			return 0;			
		} else {
			System.out.println(m);
			return 1;
		}
	}
	@PostMapping(value = "/join")
	public int join(@RequestBody Member member) {
		System.out.println(member);
		//service호출 시 메소드이름이 Member로 끝나면서 매개변수가 Member타입이면 비밀번호 암호화 수행
		int result = memberService.insertMember(member);
		return result;
	}
	@PostMapping(value = "/login")
	public String login(@RequestBody Member member) {
		String result = memberService.login(member);
		return result;
	}
	@PostMapping(value = "/getMember")
	public Member mypage(@RequestAttribute String memberId) {
		return memberService.selectOneMember(memberId);
	}
	@PostMapping(value = "/changePhone")
	public int changePhone(@RequestBody Member member) {
		return memberService.changePhone(member);
	}
	@PostMapping(value = "/delete")
	public int delete(@RequestAttribute String memberId) {
		return memberService.delete(memberId);
	}
	@PostMapping(value = "/pwCheck")
	public int pwCheck(@RequestBody Member member,@RequestAttribute String memberId) {
		member.setMemberId(memberId);
		return memberService.pwCheck(member);
	}
	@PostMapping(value = "/changePw")
	public int changePwMember(@RequestBody Member member, @RequestAttribute String memberId) {
		member.setMemberId(memberId);
		return memberService.changePwMember(member);
	}
}
