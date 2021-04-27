// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
function onYouTubeIframeAPIReady() { // 이 함수 이름은 함부로 바꿔서는 안된다.2
  new YT.Player('player', { // <div id="player"></div>를 가져오는 것이며 #player로 따옴표 안에 넣으면 안됨.  
    videoId: 'An6LvWQuj_8', // 소스코드 복사해서 붙여 넣기를 하게 되면 내가 제어할 수 없음. 그렇기에 youtbue주소창에 watch?v= ~~~, ~~~가 곧 ID고 이것만을 가져와서 사용하면 된다. 최초 재생할 유튜브 영상 ID
    playerVars: { // Vars는 variation을 의미하고 영상을 제어하기 위한 여러가지 변수를 의미함
      autoplay: true, // 자동 재생 유무
      loop: true, // 반복 재생 유무
      playlist: 'An6LvWQuj_8' // 비디오를 반복 재생한다고 한다면 그 ID값을 지정해줘야 함. 다른 비디오로 재생이 가능. 반복 재생할 유튜브 영상 ID 목록
    },
    events: {
      onReady: function (event) { // 객체 데이터 내부에 함수가 할당되면 그것을 method라 부른다. 익명함수의 매개변수인 event. 동영상 플레이어가 on ready, 준비가 되면 그 때 이 함수를 실행한다. 그것을 함수 내에서 event라는 매개 변수로 받아서 활용하는 것
        event.target.mute() // 현재 taeget은 재생되는 영상 자체를 의미. 영상이 준비되면 음소거로 만들겠다는 의미.
      }
    } 
  });
}