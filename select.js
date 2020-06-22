(function (root, factory) {
	root.Select = factory();
})(this, function () {
	"use strict";

	let Select = {};

	Select.version = "0.1.0";

	Select.areaInformation = {
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
	Select.inputValue;

	Select.init = function (id, options) {
		this.id = id;
		let content = `<label>请选择地区</label><i id="choose_icon" class="layui-icon layui-icon-down "></i>`;
		let choose = `<div class="choose"><div class="choose-hide"><div class="class province"><ul></ul></div><div class="class city"><ul><li><span><span></li></ul></div><div class="class area"><ul></ul></div></div></div>`;
		$(this.id).append(content, choose);

		json.forEach((element) => {
			let str = ` <li id="${element.code}">
                            <span>${element.name}</span>
                            <i class="layui-icon layui-icon-right"></i>
                        </li>`;
			$(this.id).find(".province ul").append(str);
		});
	};

	Select.action = function (callback) {
		// 显示省选项
		$(this.id).on("click", function (event) {
			event.stopPropagation();
			$(this).find(".choose").slideDown(200);
			$(this)
				.find("#choose_icon")
				.removeClass("layui-icon-down")
				.addClass("layui-icon-up");
		});

		//选择省显示市
		$(this.id)
			.find(".province li")
			.on("click", function (event) {
				event.stopPropagation();

				let area = $(this).find("span").text();
				let areaID = $(this).attr("id");

				Select.areaInformation.province.name = area;
				Select.areaInformation.province.id = areaID;
				Select.areaInformation.city = Select.areaInformation.area = {};

				Select.inputValue = "";
				Select.inputValue = area + "/";
				$(Select.id).find("label").text(Select.inputValue);
				$(Select.id).find(".city ul,.area ul").empty();

				json.forEach((element) => {
					if (element.code == $(this).attr("id")) {
						element.city.forEach((item) => {
							let str = ` <li id="${item.code}">
                                        <span>${item.name}</span>
                                        <i class="layui-icon layui-icon-right"></i>
                                    </li>`;
							$(Select.id).find(".city ul").append(str);
						});
					}
				});

				$(Select.id).find(".city li,.area li").removeClass("avtive");
				$(Select.id).find(".city").css("display", "inline-block");
				$(Select.id).find(".area").css("display", "none");
				$(this).addClass("avtive").siblings().removeClass("avtive");

				callback(Select.areaInformation);
			});

		//选择市显示区
		$(this.id)
			.find(".city")
			.on("click", "li", function (event) {
				event.stopPropagation();
				let area = $(this).find("span").text();
				let areaID = $(this).attr("id");

				Select.areaInformation.city.name = area;
				Select.areaInformation.city.id = areaID;
				Select.areaInformation.area = {};

				$(Select.id).find(".area ul").empty();
				$(Select.id).find(".area li").removeClass("avtive");
				Select.inputValueText = Select.inputValue.split("/");
				if (Select.inputValueText.length >= 3) {
					Select.inputValue = Select.inputValueText[0] + "/";
				}
				Select.inputValue =
					Select.inputValue + $(this).find("span").text() + "/";
				$(Select.id).find("label").text(Select.inputValue);
				$(this).addClass("avtive").siblings().removeClass("avtive");
				$(Select.id).find(".area").css("display", "inline-block");

				json.forEach((element) => {
					if (element.code == Select.areaInformation.province.id) {
						element.city.forEach((city) => {
							if (city.code == $(this).attr("id")) {
								city.area.forEach((item) => {
									let str = ` <li id="${item.code}">
                                                <span>${item.name}</span>
                                            </li>`;
									$(Select.id).find(".area ul").append(str);
								});
							}
						});
					}
				});

				callback(Select.areaInformation);
			});

		// 选择区关闭下拉
		$(this.id)
			.find(".area")
			.on("click", "li", function (event) {
				event.stopPropagation();

				let area = $(this).find("span").text();
				let areaID = $(this).attr("id");

				Select.areaInformation.area.name = area;
				Select.areaInformation.area.id = areaID;

				$(this).addClass("avtive").siblings().removeClass("avtive");
				Select.inputValue =
					Select.inputValue + $(this).find("span").text();
				$(Select.id).find("label").text(Select.inputValue);

				$(Select.id).find(".choose").hide();
				$(Select.id)
					.find("#choose_icon")
					.removeClass("layui-icon-up")
					.addClass("layui-icon-down");

				callback(Select.areaInformation);
			});

		$("html").click(function () {
			$(Select.id).find(".choose").hide();
			$(Select.id)
				.find("#choose_icon")
				.removeClass("layui-icon-up")
				.addClass("layui-icon-down");
		});
	};

	return Select;
});
