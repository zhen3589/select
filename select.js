(function ($) {
	$.fn.extend({
		Select: function (request) {
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

			let content = `<label>请选择地区</label><i id="choose_icon" class="layui-icon layui-icon-down "></i>`;
			let choose = `<div class="choose"><div class="choose-hide"><div class="class province"><ul></ul></div><div class="class city"><ul><li><span><span></li></ul></div><div class="class area"><ul></ul></div></div></div>`;
			$(select).append(content, choose);

			json.forEach((element) => {
				let str = ` <li id="${element.code}"><span>${element.name}</span> <i class="layui-icon layui-icon-right"></i></li>`;
				$(select).find(".province ul").append(str);
			});

			// 显示省选项
			$(select).on("click", function (event) {
				event.stopPropagation();
				$(this).find(".choose").slideDown(200);
				$(this).find("#choose_icon").removeClass("layui-icon-down").addClass("layui-icon-up");
			});

			//选择省显示市
			$(select).find(".province li").on("click", function (event) {
					event.stopPropagation();

					let area = $(this).find("span").text();
					let areaID = $(this).attr("id");

					areaInformation.province.name = area;
					areaInformation.province.id = areaID;
					areaInformation.city = areaInformation.area = {};

					inputValue = "";
					inputValue = area + "/";
					$(select).find("label").text(inputValue);
					$(select).find(".city ul,.area ul").empty();

					json.forEach((element) => {
						if (element.code == $(this).attr("id")) {
							element.city.forEach((item) => {
								let str = ` <li id="${item.code}"><span>${item.name}</span><i class="layui-icon layui-icon-right"></i></li>`;
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
			$(select).find(".city").on("click", "li", function (event) {
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
					$(select).find("label").text(inputValue);
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
					inputValue = inputValue + $(this).find("span").text();
					$(select).find("label").text(inputValue);

					$(select).find(".choose").hide();
					$(select).find("#choose_icon").removeClass("layui-icon-up").addClass("layui-icon-down");

					request(areaInformation);
				});

			$("html").click(function () {
				$(select).find(".choose").hide();
				$(select).find("#choose_icon").removeClass("layui-icon-up").addClass("layui-icon-down");
			});
		},
	});
})(jQuery);
