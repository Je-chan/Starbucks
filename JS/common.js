// 기존에는 Main.js에서 작성한 것이나 signin이라는 브랜치를 만든 후, 로그인 페이지에서도 사용되는 js 내용들을 common으로 이동시킨 것



// HEADER

const searchEl = document.querySelector('.search'); //document는 html이라는 요소라 이해해도 됨
const searchInputEl = searchEl.querySelector('input'); //document.querySelector('.search input')으로 해도 되지만 너무 길어지니 왼쪽과 같이 바꿈

searchEl.addEventListener('click', function() {
  //핸들러 부분, logic을 입력함
  searchInputEl.focus(); 
});
// 해석: searchEl에(이는 곧, .search가 선택자로 처음 나오는 것에) click이 되면 searchEl안에 있는 input부분에 다음 로직(focus)를 적용한다.  
 
searchInputEl.addEventListener('focus', function () {
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색');
}); 
// 해석: input요소에 focus라는 event가 발생하면 .search가 있는 div요소에 focused라는 class를 더 부여하겠다
// 해석: 마찬가지로 input요소에 focus라는 event가 발생하면 input 요소에 html속성인 palceholder를 부여하고 그 이름은 통합검색이라고 지정하겠다. 

searchInputEl.addEventListener('blur', function () {
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
}); 
// 해석: input요소에 blur(focus 해제)라는 event가 발생하면 .search가 있는 div요소에서 focused라는 class를 제거한다
// 해석: 거기에 placeholder는 빈 공란으로 바꾼다


// DAY

const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear(); // 현재 연도를 반영함. this- year에 들어가게 됨.  
