(function ($) {
	$.fn.extend({
		Select: function (request,config) {
			const select = this;
			let inputValue = "";
			let areaInformation = {
				province: {
					name: "",
					id: "",
				},
				city: {
					name: "",
					id: "",
				},
				area: {
					name: "",
					id: "",
				},
			};
			
			let option = {
                expandTrigger:'click', // click / mouseover
                text:'请选择地区'
			}
			for(let i in config) option[i] = config[i];
            $(select).css('lineHeight',option.height).find('.choose').css('top', option.height)
            $(select).css(option);
            

			let content = `<label><span>${option.text}</span> <i id="Select_delete" class="iconfont icon-shanchu"></label></i><i id="choose_icon" class="iconfont icon-xiala "></i>`;
			let choose = `<div class="choose"><div class="choose-hide"><div class="class province"><ul></ul></div><div class="class city"><ul><li><span><span></li></ul></div><div class="class area"><ul></ul></div></div></div>`;
			$(select).append(content, choose);

			json.forEach((element) => {
				let str = ` <li id="${element.code}"><span>${element.name}</span> <i class="iconfont icon-fanhui"></i></li>`;
				$(select).find(".province ul").append(str);
            });
            
            
            $(select).mouseenter(function () {
                let text = $(select).find("label span");
                if(text.text() != option.text){
                    $(select).find('#Select_delete').css('opacity','1')
                }else {
                    console.log('已经是初始化状态');
                    return false;
                }
            });

            $(select).mouseleave(function () {
                $(select).find('#Select_delete').css('opacity','0')
             });

			// 显示省选项
			$(select).on("click", function (event) {
				event.stopPropagation();
				$(this).find(".choose").slideDown(200);
				$(this).find("#choose_icon").removeClass("icon-xiala").addClass("icon-shouqi");
			});

			//选择省显示市
			$(select).find(".province li").on(option.expandTrigger, function (event) {
					event.stopPropagation();

					let area = $(this).find("span").text();
					let areaID = $(this).attr("id");

					areaInformation.province.name = area;
					areaInformation.province.id = areaID;
					areaInformation.city = areaInformation.area = {};

					inputValue = "";
					inputValue = area + "/";
					$(select).find("label span").text(inputValue);
					$(select).find(".city ul,.area ul").empty();

					json.forEach((element) => {
						if (element.code == $(this).attr("id")) {
							element.city.forEach((item) => {
								let str = ` <li id="${item.code}"><span>${item.name}</span><i class="iconfont icon-fanhui"></i></li>`;
								$(select).find(".city ul").append(str);
							});
						}
					});

					$(select).find(".city li,.area li").removeClass("avtive");
					$(select).find(".city").css("display", "inline-block");
					$(select).find(".area").css("display", "none");
					$(this).addClass("avtive").siblings().removeClass("avtive");

					request(areaInformation);
				});

			//选择市显示区
			$(select).find(".city").on(option.expandTrigger, "li", function (event) {
					event.stopPropagation();
					let area = $(this).find("span").text();
					let areaID = $(this).attr("id");

					areaInformation.city.name = area;
					areaInformation.city.id = areaID;
					areaInformation.area = {};

					$(select).find(".area ul").empty();
					$(select).find(".area li").removeClass("avtive");
					inputValueText = inputValue.split("/");
					if (inputValueText.length >= 3) {
						inputValue = inputValueText[0] + "/";
					}
					inputValue = inputValue + $(this).find("span").text() + "/";
					$(select).find("label span").text(inputValue);
					$(this).addClass("avtive").siblings().removeClass("avtive");
					$(select).find(".area").css("display", "inline-block");

					json.forEach((element) => {
						if (element.code == areaInformation.province.id) {
							element.city.forEach((city) => {
								if (city.code == $(this).attr("id")) {
									city.area.forEach((item) => {
										let str = ` <li id="${item.code}"><span>${item.name}</span></li>`;
										$(select).find(".area ul").append(str);
									});
								}
							});
						}
                    });
                    
                   

					request(areaInformation);
                });

			// 选择区关闭下拉
			$(select).find(".area").on("click", "li", function (event) {
					event.stopPropagation();

					let area = $(this).find("span").text();
					let areaID = $(this).attr("id");

					areaInformation.area.name = area;
					areaInformation.area.id = areaID;

					$(this).addClass("avtive").siblings().removeClass("avtive");
					$(select).find("label span").text(inputValue + $(this).find("span").text());

					$(select).find(".choose").hide();
					$(select).find("#choose_icon").removeClass("icon-shouqi").addClass("icon-xiala");

					request(areaInformation);
                });
                
                // 清空
                $(select).find("#Select_delete").click(function(event){
                    event.stopPropagation();
                    $(select).find("label span").text(option.text)
                    
                    areaInformation = {
                        province: {
                            name: "",
                            id: "",
                        },
                        city: {
                            name: "",
                            id: "",
                        },
                        area: {
                            name: "",
                            id: "",
                        },
                    };

                    $(select).find(".choose").hide();
				    $(select).find("#choose_icon").removeClass("icon-shouqi").addClass("icon-xiala");
                    $(select).find('#Select_delete').css('opacity','0')

                    $(select).find(".city li,.area li,.province li").removeClass("avtive");
					$(select).find(".city").css("display", "none");
					$(select).find(".area").css("display", "none");
                    
                    request(areaInformation);
                })

			$("html").click(function () {
				$(select).find(".choose").hide();
				$(select).find("#choose_icon").removeClass("icon-shouqi").addClass("icon-xiala");
			});
		},
	});
})(jQuery);
