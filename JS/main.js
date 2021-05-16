const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

window.addEventListener('scroll', _.throttle(function () {
  console.log('window.scrollY');
  if (window.scrollY > 500) {
    // 뱃지 숨기기
    // badgeEl.style.display = 'none'; 이건 애니메이션 효과 없이 그냥 뚝하고 사라져 버림
    gsap.to(badgeEl, .6, {
      opacity: 0,
      display: 'none' // display: none 으로 하는 게 css에선 자연스럽지만 js에서 문자는 반드시 '' 를 동반해야 한다
    });
    // gsap링크를 따왔을 때 사용할 수 있음
    // gsap.to(요소, 지속시간, 옵션); 
    // 첫 번째 옵션: opacity. 요소는 0.6초 동안 opacity가 점점 0으로 전환된다는 것. 
    // 그런데 opacity는 단순히 안보이게만 할 뿐이지 사라지게 하는 것이 아니다. 이는 만약 뱃지를 눌렀을 때 다른 링크로 넘어가도록 만들었다면 눈에 보이지는 않지만 뱃지 있는 영역을 누를 때 링크 타고 넘어갈 수 있다는 것을 의미함.
    // 두 번째 옵션: display: 'none' 진짜로 사라지게 만드는 기능을 한다.

    // 이후부터는 to-top 버튼을 나타나게 하는 작업
    gsap.to(toTopEl, .2, {
      x: 0
    }); 
  } else {
    // 뱃지 보이기
    // badgeEl.style.display = 'block';
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    });
    // 이후부터는 to-top 버튼을 숨기는 작업 (badge가 보일 때 to-top은 사라지고, badge가 사라질 때, to-top은 나타나므로)
    gsap.to(toTopEl, .2, {
      x: 100 
    }); 
  }
}, 300)); 
// window는 프로젝트가 나타나는 창. 윈도우 객체. 우리가 보고 있는 화면 그 자체
// 300은 0.3초를 의미함. 단위는 ms(밀리세컨드임). 화면을 스크롤 하면 한 번에 수십개가 실행되는데 그것을 0.3단위로 부하를 주는 것.  
// lodash를 가져왔을 때 사용할 수 있는 throttle. 스크롤의 부하를 가볍게 해주는 것
// _.throttle(함수, 시간) , window.scrollY 는 현재, 화면의 위치가 Y축으로 어디쯤인지를 나타내는 것

// 이후부터는 to-top 버튼을 누르면 최상단으로 이동하는 기능을 주는 작업
toTopEl.addEventListener('click', function() {
  gsap.to(window, .7, {
    scrollTo: 0 // 스크롤의 위치를 0px로 이동. 이 scrollTo라는 옵션을 사용하기 위해서 gsap에서 script를 따온 것
  }); 
});



// VISUAL

const fadeEls = document.querySelectorAll('.visual .fade-in');

fadeEls.forEach(function (fadeEl, index) { // .visual .fade-in이라는 클래스 요소를 지닌 것들이 나타났을 때 각각 다음과 같은 로직의 함수를 실행한다. 그때의 각각의 변수는 fadeEl이고, 반복되는 횟수-index만큼 실행한다.
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .7, // delay: 시간을 지연시켜서 재생할 것이다. .7: 0.7초의 시간의 지연을 줄 것이다. => 이렇게 까지만 하면 순차적인재생이 되지 않는다 / (index + 1) * 7 => 각 변수별로 받은 index는 제로베이스로 0부터 시작한다. 즉, 첫 번째 index(fade-in 중 순서적으로 가장 먼저 앞선 것)은 0.7s의 delay를 갖고 재생, 그 다음 건 1.4s 이런 식으로 진행되는 것
    opacity: 1 //  그  결과, opacity는 1이 된다
  });
}); 





// SWIPER (swiperjs 링크 따오는 것 필요)

new Swiper('.notice-line .swiper-container', {
  direction: 'vertical', // 넘어가는 방향 설정
  autoplay: true, // 자동으로 넘어가게 할 지를 설정
  loop: true // 반복재생 결정
}); 
 // new Swiper(선택자, 옵션);

new Swiper('.promotion .swiper-container', {
  //  direction: 'horizental' <= 이게 기본값
  slidesPerView: 3, // 한 번에 보여 줄 슬라이드 개수
  spaceBetween: 10, // 슬라이드 사이 여백. 단위는 px
  centeredSlides: true, // 슬라이드 시작을 Center로 잡겠다는 의미. 1번 슬라이드가 가운데에 보임
  loop: true,
  autoplay: {
    delay: 5000 // 넘어가는 속도를 지정하는 것. 기본값은 3000
  },
  pagination: {
    el: '.promotion .swiper-pagination',
    clickable: true
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
});


new Swiper('.awards .swiper-container', {
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
});





// TOGGLE
const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');  
let isHidePromotion = false; // let으로 사용했으므로 어느 순간에는 hide promotion의 값이 true가 될 수 있음을 암시하는 것

promotionToggleBtn.addEventListener('click', function () {
  isHidePromotion = !isHidePromotion // !를 붙이는 것은 이 ! 뒤에 있는 값의 반대가 되게 해달라는 것. false의 반대값인 true가 되게 해달라는 것이다. 클릭 한 번으로 ture가 됐을 때 한 번더 클릭하면 그 반대값인 false가 된다. 이런 방식으로 반복해서 상황에 따라 반대에 해당하는 값을 주는 것
  if (isHidePromotion) {
    // 처음 실행이 됐을 경우, false에서 ture 값으로 바뀌니 여기에서는 숨김 처리를 해야 함. if에서는 ()값이 ture냐 flase냐에 따라서 작동이 되냐 안되냐가 결정됨. 
    promotionEl.classList.add('hide'); // .promotion .hide => hide라는 속성을 추가한 것이므로 사라지게 하는 것은 CSS 작업을 거쳐야 한다. 
  } else {
    // true인 상황에서 클릭하면 false가 됨. 여기에서는 보임 처리를 해야함
    promotionEl.classList.remove('hide'); 
  }
});
// 자바 스크립트로 보이고 안보이고를 제어하기 보다는 CSS 에서 하는 것이 좋다. gsap을 통해서 제어하는 것은 CSS에서 한계가 있는 것을 처리하는 것이고, 그저 보이고 안보이게 하는 정도는 무겁지 않게 간단하게 CSS로 해주는 것이 좋다.




// FLOATING

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floatingObject(selector, delay, size) {
//  gsap.to(요소, 시간, 옵션);
  gsap.to(
    selector, // 선택자 / 요소를 받는 부분에 검색한 요소 대신에 css선택자만 넣어도 gsap이 내부적으로 요소를 찾아서 넣어줬으면 활용하고 선택자만 넣으면 직접적으로 찾아 준다.  
    random(1.5, 2.5), // 애니메이션의 동작 시간. 랜덤을 통해서 웹페이지에 들어올 때마다 다른 시간성을 갖고, 각 floating 별로도 다른 값을 갖는다.
    { // 이하 옵션
      y: size, // y축으로 얼마만큼 움직이면서 애니메이션 처리를 할 것인가
      repeat: -1, // 무한 반복이 -1. 20축으로 내려가는 것을 반복
      yoyo: true, // yoyo란 한 번 재생된 애니메이션을 뒤로 재생해주는 것 => 이것을 통해 완벽하게 왔다갔다 하는 것
      ease: Power1.easeInOut, // gasap easing url("https://greensock.com/docs/v2/Easing")으로 검색해서 찾아냄. 이 함수를 통해서 움직임에 끊김이 없고 자연스러워짐. easein-out을 통해서 천천히 - 빠르게 - 천천히 순으로 반복 시키는 것. 
      delay: random(0, delay),
  });
}

floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);


// SCROLL MAGIC 

const spyEls = document.querySelectorAll('section.scroll-spy'); // scroll-spy라고 하는 속성이 section에 있으면 그것 모두 다

spyEls.forEach(function (spyEl) {
  new ScrollMagic // Scene이란 Scrollmagic을 통해서 특정 요소를 감지하는 옵션을 지정하는 method. 제어하려는 섹션이 보이는 지 안보이는 지를 감시하는 것
    .Scene({
      triggerElement: spyEl, // .scroll-spy라 붙어 있는 각각의 섹션은 spyEls에 다 들어가고 그것을 각각 반복적으로 처리할 텐데 처리할 때마다 spyEl라는 매개 변수의 값이 들어 있을 것이고 그것은 곧 내가 감시하고 있는 섹션 하나. 보여짐 여부를 감시할 요소를 지정.
      triggerHook: .8 // 뷰포트의 최상단을 0, 최하단을 1로 잡고 그것을 기준으로 .8 부분을 지정하는 것. 만약 .8 부분에 감시하고 있는 것이 걸리면 trigger, 밑에 있는 setClasToggle이란 methd를 실행한다는 의미
    })
    .setClassToggle(spyEl, 'show') // (Toggle할 요소, 그 요소의 클래스 이름) triggerHook으로 설정한 .8에 걸리면 class 'show'를 추가한다는 의미 
    .addTo(new ScrollMagic.Controller()); 
});
// 애니메이션 처리는 부하가 너무 걸리는 무거운 js 보다는 css를 사용해주고, 만약 복잡한 애니메이션을 구사해야 한다면 js로 처리한다.
