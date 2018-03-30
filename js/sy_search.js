var search_up = document.getElementById('search_up');
			var search_below = document.getElementById('search_below');
			var sea_inp = document.getElementById('sea_inp');
			var nav_righr = document.getElementById('nav_righr');
			mui('.mui-bar-nav').on('keyup','input',function(){
				if(sea_inp.value==''){
					search_up.style.display = 'block';
					search_below.style.display = 'none';
					nav_righr.innerText='取消';
				}else{
					search_below.style.display = 'block';
					search_up.style.display = 'none';
					nav_righr.className = 'mui-pull-right'
					nav_righr.innerText='确定';
				}
				
			})
			nav_righr.addEventListener('tap',function(){
				if(sea_inp.value==''){
//					mui.openWindow({  //页面切换（跳转到首页）
//						    url: 'sy.html',  
//						    id: 'sy.html',  
//						    styles: {},  
////						    extras: {  
////						        ..... //自定义扩展参数，可以用来处理页面间传值  
////						    }  
//						})
				}else{
						var ul_up = document.getElementById('ul_up');
		//				search_below.style.display = 'block';
		//				search_up.style.display = 'none';
						var li = "<li><a>"+sea_inp.value+"</a></li>";
						ul_up.innerHTML+=li; 
						/*
						 mui.openWindow({  
							url: 'serve3.html',  
							id: 'serve3.html',  
							styles: {},  
							extras: {  
								..... //自定义扩展参数，可以用来处理页面间传值  
								}  
							})
		                    	var i = /转让/g;
								var i2 = /出租/g;
								var i3 = /出售/g;
								var i4 = /求租/g;
								var i5 = /求购/g;
								var a = sea_inp.value;
							//	console.log(a.match(i),i)
								if(a.match(i)=='转让'){
									console.log(1111)
								}else if(a.match(i2)=='出租'){
									console.log(22222)
								}else if(a.match(i3)=='出售'){
									console.log(33333)
								}else if(a.match(i4)=='求租'){
									console.log(44444)
								}else if(a.match(i5)=='求购'){
									console.log(55555)
								}else{
									console.log(66666)
									mui.openWindow({  
									    url: 'sy.html',  
									    id: 'sy.html',  
									    styles: {},  
									    extras: {  
									        ..... //自定义扩展参数，可以用来处理页面间传值  
									    }  
									})
								}
						 * */
						}
			})