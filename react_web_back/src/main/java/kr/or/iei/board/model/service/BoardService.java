package kr.or.iei.board.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.iei.PageInfo;
import kr.or.iei.Pagination;
import kr.or.iei.board.model.dao.BoardDao;

@Service
public class BoardService {
	@Autowired
	private BoardDao boardDao;
	@Autowired
	private Pagination pagination;
	
	public Map boardList(int reqPage) {
		//게시물 조회, 페이징에 필요한 데이터를 취합
		int numPerPage = 12; //한페이지당 게시물 수
		int pageNaviSize = 5;//페이지 네비게이션 길이
		int totalCount = boardDao.totalCount();//전체 게시물 수
		//페이징조회 및 페이지네비 제작에 필요한 데이터를 객체로 받아옴
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List boardList = boardDao.selectBoardList(pi);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("boardList", boardList);
		map.put("pi", pi);
		return map;
	}
}
