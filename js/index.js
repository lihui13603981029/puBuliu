window.onload = function () {
	imgLocation("content","box");
	//页面滚动时触发
	window.onscroll = function () {
		var jsonData = {"data":[{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"},{"src":"6.jpg"},{"src":"7.jpg"}]};
		var cparent = $("content");
		if (checkFlag()) {
			for (var i = 0; i < jsonData.data.length; i++) {
				var box = document.createElement("div");
				box.className = "box";
				cparent.appendChild(box);
				var box_img = document.createElement("div");
				box_img.className = "box_img";
				box.appendChild(box_img);
				var img = document.createElement("img");
				img.src = "img/"+ jsonData.data[i].src;
				box_img.appendChild(img);
			}
		}
		imgLocation("content","box");
	}
}
function checkFlag () {
	  var cparent = $("content");
		var contentArr = getChildElement(cparent,"box");
		var lastHeight = contentArr[contentArr.length - 1].offsetTop;
		var scrowTop = document.documentElement.scrollTop||document.body.scrollTop;
		var pageHeight = document.documentElement.clientHeight || document.body.clientHeight;
		if (lastHeight < scrowTop + pageHeight){
			return true;
			
		}
}
function imgLocation (parent,content) {
	var cparesent = document.getElementById(parent);
	var ccontent = getChildElement(cparesent,content);
	var imgWith = ccontent[0].offsetWidth;
	var num = Math.floor(document.documentElement.clientWidth / imgWith);
	cparesent.style.cssText = "width:"+imgWith *num+"px;margin: 0 auto;";
	
	var boxHeightArr= [];
	for (var i = 0; i < ccontent.length; i++) {
		if (i < num) {
			boxHeightArr.push(ccontent[i].offsetHeight);
			ccontent[i].style.float = "left";
		}else {
			var minHeight = Math.min.apply(null,boxHeightArr);
			var minIndex = getMinIndex(minHeight,boxHeightArr);
			ccontent[i].style.position = "absolute";
			ccontent[i].style.top = minHeight+"px";
			ccontent[i].style.left = ccontent[minIndex].offsetLeft + "px";
			
			boxHeightArr[minIndex] += ccontent[i].offsetHeight;
			
		}
	}
}
function getChildElement (parent,content) {
	var contentArr = [];
	var allContents = parent.getElementsByTagName("*");
	for (var i  = 0; i < allContents.length; i++) {
		if (allContents[i].className == content) {
			contentArr.push(allContents[i]);
		}
	}
	return contentArr;
}
function getMinIndex (minHeight,minHeightArr) {
	for(var i = 0; i < minHeightArr.length; i++) {
		if (minHeightArr[i] === minHeight){
			return i;
		}
	}
}
window.onresize = function(){
		var cparesent = $("content");
		var ccontent = getChildElement(cparesent,"box");
	for (var i = 0; i < ccontent.length; i++) {
		ccontent[i].style.cssText = "";
	}
	imgLocation("content","box");
}
function $(id){return document.getElementById(id);}
