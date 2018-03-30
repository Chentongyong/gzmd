        gallery.addEventListener('tap',function(){//相册
						hide_show.style.display = 'none'
						if(tu.innerHTML==''){
							mui.toast(1111)
							ul_xias.style.display = 'none'
						}else{
							mui.toast(2222)
							ul_xias.style.display = 'inline-block'
						}
						plus.gallery.pick(
							function(path){//成功
//								var task = plus.uploader.createUpload(
//									'url',//路径
//									{
//										method:"POST",//上传类型
////										blocksize:204800,//分片上传（服务器不支持可不写）
//										priority:100,//优先级（默认为0，只上传一个时，也可不写）
//									},
//									function(t,status){//回调函数，上传后返回值
//										console.log(json.stringify(t));
//										console.log(status);
//										mui.toast('上传成功');
//									}
//								)
								var img = "";
								for(var i in path.files){//循环图片张数
									img+= "<img width=100 height='100' src="+path.files[i]+">";
				//					tu.appendChild(img);
				                    tu.innerHTML+= img
			                    }
							},
							function(e){//失败
							    tu.innerHTML = e.message;
							},
							{
								filter:"image",//只选择图片
								multiple:true//可以选择多张图片
							}
						)
//						
						})
					
					  camera.addEventListener('tap',function(){//摄像头
					  	hide_show.style.display = 'none';
					  	if(tu.innerHTML==''){
							mui.toast(1111)
							ul_xias.style.display = 'none'
						}else{
							mui.toast(2222)
							ul_xias.style.display = 'inline-block'
						}
					  	var cm = plus.camera.getCamera(1);//1是主摄像头（后），2是副摄像头（前）
					  	cm.captureImage(function(path){
					  		var url = "file://"+plus.io.convertLocalFileSystemURL(path);
					  		var img = "<img width=100 height=150 src="+url+">";
					  		tu.innerHTML+= img;
			//		  		tu.appendChild(img);
					  	})
//					  	if(tu.innerText==''){
//							mui.toast(1111)
//							ul_xias.style.display = 'none'
//						}else{
//							mui.toast(2222)
//							ul_xias.style.display = 'inline-block'
//						}
					  })