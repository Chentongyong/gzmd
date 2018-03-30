var uid = '';
var qiuzu = '';
var qiugou = '';
mui.plusReady(function(){
	window.addEventListener('newsId',function(s){
		uid=s.detail.uid;
		qiuzu=s.detail.qiuzu;
		qiugou=s.detail.qiugou;
		
		mui('.mui-input-group').on('tap', '#but', function(e) {
			var quyu = document.getElementById('quyu').value;
			var mianji = document.getElementById('mianji').value;
			var zujinyusuan = document.getElementById('zujinyusuan').value;
			inp.value;
			phone;
			var title1 = document.getElementById('title1').value;
			ms.value;
			var lianxiren = document.getElementById('lianxiren').value;
			if(quyu != '' && mianji != '' && zujinyusuan != '' && inp.value != '' && phone != '' && title1 != '' && ms.value != '' && lianxiren != '') {
				if(qiuzu=="商铺求租" && uid!=undefined){
					var urls='http://192.168.3.7:8080/Store/spApp!addApp.action?shopPurchase.region='+quyu
						+'&shopPurchase.acreage='+mianji+'&shopPurchase.purchaseBudget='+zujinyusuan+'&shopPurchase.type='+inp.value
						+'&shopPurchase.title='+title1+'&shopPurchase.describe='+ms.value
						+'&shopPurchase.contacts='+lianxiren+'&shopPurchase.tel='+phone
						+'&shopPurchase.typeid=2&shopPurchase.suser.uid='+uid
				}
				if(qiugou=="商铺求购" && uid!=undefined){
					var urls='http://192.168.3.7:8080/Store/spApp!addApp.action?shopPurchase.region='+quyu
						+'&shopPurchase.acreage='+mianji+'&shopPurchase.purchaseBudget='+zujinyusuan+'&shopPurchase.type='+inp.value
						+'&shopPurchase.title='+title1+'&shopPurchase.describe='+ms.value
						+'&shopPurchase.contacts='+lianxiren+'&shopPurchase.tel='+phone
						+'&shopPurchase.typeid=1&shopPurchase.suser.uid='+uid
				}
				mui.ajax({
					url:urls,
					type:'post',
					async: true,
				    dataType: 'json',
				    crossDomain: true, //强制使用5+跨域
				    timeout:'10000',
					success:function(data){
						if(data!=null){
							mui.openWindow({
								url:'issue.html',
								id:'issue',
								style:{}
					         })
						}
					},
					error:function(xhr, type, errorThrown){
						alert("提交失败","请先登录");
					}
				});
			}else{
				mui.toast("请填写所有");
			}
		});
	})
})

