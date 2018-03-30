//  图片上传 
var files = [];
(function($, doc) {
	mui.init({
		swipeBack: true //启用右滑关闭功能
	});

	document.addEventListener("plusready", plusReady, false);

	function plusReady() {
		var wv = plus.webview.currentWebview();
		document.getElementById("addnew").addEventListener("tap", function() {
			showActionSheet(); //拍照还是相册  
		});
		//                  document.getElementById("platenum").value = wv.platenum;

		plus.nativeUI.closeWaiting();

	}
}(mui, document));

//  document.getElementById("saveBtn").addEventListener('tap', function() {
//         upload();
//  });
//
var uid = '';
window.addEventListener('newsId',function(o){
	uid=o.detail.uid;
	sid = o.detail.sid;
	if(sid!=null){
		mui.ajax({
			url:'http://192.168.3.7:8080/Store/storeactions!oneToOne.action?store.sid='+sid,
			type:'post',
			async: true,
		    dataType: 'json',
		    crossDomain: true, //强制使用5+跨域
		    timeout:'10000',
			success:function(data){
				if(data!=null){
					document.getElementById("assignment").value = data.img;
					document.getElementById("quyu").value = data.address;
					document.getElementById("mj").value = data.square;
					document.getElementById("zujin").value = data.price;
					document.getElementById("hy").value = data.shoptype;
					document.getElementById("phoness").value = data.theshortestlease;
					document.getElementById("diduan").value = data.detailedaddress;
					document.getElementById("zrf").value = data.transferfee;
					document.getElementById("ms").value = data.shopintroduction;
					document.getElementById("biaoti").value = data.sname;
					document.getElementById("lianxiren").value = data.monthlyrent;
					document.getElementById('but').innerText = '保存'
				}
			},
			error:function(xhr, type, errorThrown){
				mui.toast("网络延迟");
			}
		});
	}
})
// 上传文件
function upload() {
	var typead = document.getElementById("assignment").value;
	var quyu = document.getElementById("quyu").value;
	var mj = document.getElementById("mj").value;
	var zujin = document.getElementById("zujin").value;
	var leixing = document.getElementById("hy").value;
	var tel = document.getElementById("phoness").value;
	var diduan = document.getElementById("diduan").value;
	var zrf = document.getElementById("zrf").value;
	var ms = document.getElementById("ms").value;
	var title = document.getElementById("biaoti").value;
	var lianxiren = document.getElementById("lianxiren").value;
	if(quyu != '' && mj != ''  && leixing != '' && tel != '' && diduan != '' && ms != '' && biaoti != '' && lianxiren != '') {
		var data='?typead='+typead+'&quyu='+quyu+'&mj='+mj+'&zujin='+zujin+'&leixing='+leixing+'&tel='+tel+'&diduan='+diduan+ '&zrf='+zrf+'&ms='+ms+'&lianxiren='+lianxiren+'&title='+title+'&uid='+uid+'&mytop=2';
		var task = plus.uploader.createUpload('http://192.168.3.5/Store/Upload'+data, {
				method: "POST"
			},
			function(t, status) { //上传完成  
				if(status == 200) {
					var result = jQuery.parseJSON(t.responseText);
					//                          mui.toast(result.message);  

				} else {
					console.log("上传失败：" + status);
				}
			}
		);

	for(var i = 0; i < files.length; i++) {
			var f = files[i];
			task.addFile(f.path, {
				key: f.name
			});

		}
		task.start();
		mui.openWindow({
				url:'issue.html',
				id:'issue.html',
				style:{},
				show:{
					autoShow:true,
					aniShow:"slide-in-right,",
					duration:100
				},
				waiting:{
				    autoShow:true,
					title:"正在加载...",
					options:{
							//width:
							//height:
					}
				}			
			})
	}else{
		mui.toast("填写信息不完整，请补充完整再发布");
	}

}

// 添加文件  
var index = 1;
var newUrlAfterCompress;

function appendFile(p) {
	files.push({
		path: p,
		name: "uploadkey_" + index
	});
	index++;
}
// 产生一个随机数  
function getUid() {
	return Math.floor(Math.random() * 100000000 + 10000000).toString();
}

function galleryImgs() { // 从相册中选择图片  
	plus.gallery.pick(function(e) {
		//$(".dynamic_images ul li").remove(".pickimg");  
		console.log("选择了" + e.files.length + "个图片");
		for(var i = 0; i < e.files.length; i++) {
			if(i < 9) {
				$(".dynamic_images ul").prepend("<li class='pickimg'><img src='" + e.files[i] + "' /></li>");
				var dstname = "_downloads/" + getUid() + ".jpg"; //设置压缩后图片的路径  
				newUrlAfterCompress = compressImage(e.files[i], dstname);
				appendFile(dstname);
			}
		}
	}, function(e) {
		console.log("取消选择图片");
	}, {
		filter: "image",
		multiple: true
	});
}

//压缩图片，这个比较变态的方法，无法return  
function compressImage(src, dstname) {
	//var dstname="_downloads/"+getUid()+".jpg";  
	plus.zip.compressImage({
			src: src,
			dst: dstname,
			overwrite: true,
			quality: 20
		},
		function(event) {
			//console.log("Compress success:"+event.target);  
			return event.target;
		},
		function(error) {
			console.log(error);
			return src;
			//alert("Compress error!");  
		});
}

function showActionSheet() {
	var bts = [{
		title: "拍照"
	}, {
		title: "从相册选择"
	}];
	plus.nativeUI.actionSheet({
			cancel: "取消",
			buttons: bts
		},
		function(e) {
			if(e.index == 1) {
				getImage();
			} else if(e.index == 2) {
				galleryImgs();
			}
		}
	);
}
//拍照  
function getImage() {
	var cmr = plus.camera.getCamera();
	cmr.captureImage(function(p) {
		plus.io.resolveLocalFileSystemURL(p, function(entry) {
			var localurl = entry.toLocalURL(); //  
			//$(".dynamic_images ul li").remove(".pickimg");  
			$(".dynamic_images ul").prepend("<li class='pickimg'><img src='" + localurl + "' /></li>");
			var dstname = "_downloads/" + getUid() + ".jpg"; //设置压缩后图片的路径  
			newUrlAfterCompress = compressImage(localurl, dstname);
			appendFile(dstname);
		});
	});
}