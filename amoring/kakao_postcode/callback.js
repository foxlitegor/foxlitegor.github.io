window.addEventListener("message", onReceivedPostMessage, false);

function onReceivedPostMessage(event) {
  var action = event.data.action;
  var params = event.data.params;
  console.log("onReceivedPostMessage " + event);
}

function onReceivedActivityMessageViaJavascriptInterface(json) {
  var data = JSON.parse(json);
  var action = data.action;
  var params = data.params;
  console.log("onReceivedActivityMessageViaJavascriptInterface " + event);
}

function sendMessageToAndroid(postData) {
  try{
    console.log("send to Android: "+postData)
    Android.onSelect(postData);
  }catch(e){
    console.log("Callback Android.onSelect() not found")
  }
}

function buildPostData(data){
  var jibunAddress = "";

  if (data.jibunAddress == "") {
    jibunAddress = data.autoJibunAddress;
  } else if (data.autoJibunAddress == "") {
    jibunAddress = data.jibunAddress;
  }

  var postData = {
    address: data.address,
    jibunAddress: jibunAddress,
    sido: data.sido,
    sigungu: data.sigungu,
    sigunguCode: data.sigunguCode,
    sigunguEnglish: data.sigunguEnglish,
    bname: data.bname,
    zonecode: data.zonecode
  };
  return JSON.stringify(postData);
}

var element_layer = document.getElementById("layer");
function execDaumPostcode() {
  new daum.Postcode({
    oncomplete: function (data) {
      window.sendMessageToAndroid(buildPostData(data));
    },
    width: "100%",
    height: "100%",
    theme: {
      bgColor: "#1B1B1B", //바탕 배경색
      searchBgColor: "#1B1B1B", //검색창 배경색
      contentBgColor: "#1B1B1B", //본문 배경색(검색결과,결과없음,첫화면,검색서제스트)
      pageBgColor: "#1B1B1B", //페이지 배경색
      textColor: "#DFDFDF", //기본 글자색
      queryTextColor: "#DFDFDF", //검색창 글자색
      outlineColor: "#654B1D" //테두리
    }
  }).embed(element_layer);
  element_layer.style.display = "block";
  initLayerPosition();
}

function initLayerPosition() {
  var width = window.innerWidth || document.documentElement.clientWidth;
  var height =
  window.innerHeight || document.documentElement.clientHeight;
  element_layer.style.width = width + "px";
  element_layer.style.height = height + "px";
  element_layer.style.left = ((window.innerWidth || document.documentElement.clientWidth) -width) /2 +"px";
  element_layer.style.top =((window.innerHeight || document.documentElement.clientHeight) -height) /2 +"px";
}
