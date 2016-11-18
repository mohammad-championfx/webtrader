define(["jquery","jquery-ui","color-picker","ddslick"],function(a){function b(){a(this).dialog("close"),a(this).find("*").removeClass("ui-state-error")}function c(c,e){var f=function(a,b,c,d){this.level=a,this.stroke=b,this.strokeWidth=c,this.dashStyle=d},g=[new f(30,"red",1,"Dash"),new f(70,"red",1,"Dash")];require(["text!charts/indicators/stochs/stochs.html","text!charts/indicators/indicators.json","css!charts/indicators/stochs/stochs.css"],function(f,h){f=a(f),f.appendTo("body"),h=JSON.parse(h);var i=h.stochs;f.attr("title",i.long_display_name),f.find(".stochs-description").html(i.description),f.find("input[type='button']").button(),f.find("#stochs_k_stroke,#stochs_d_stroke").each(function(){a(this).colorpicker({showOn:"click",position:{at:"right+100 bottom",of:"element",collision:"fit"},part:{map:{size:128},bar:{size:128}},select:function(b,c){a(this).css({background:"#"+c.formatted}).val(""),a(this).data("color","#"+c.formatted)},ok:function(b,c){a(this).css({background:"#"+c.formatted}).val(""),a(this).data("color","#"+c.formatted)}})}),a("#stochs_k_stroke").css("background","#1c1010"),a("#stochs_d_stroke").css("background","#cd0a0a");var j="Solid";a("#stochs_dashStyle").ddslick({imagePosition:"left",width:148,background:"white",onSelected:function(b){a("#stochs_dashStyle .dd-selected-image").css("max-height","5px").css("max-width","115px"),j=b.selectedData.value}}),a("#stochs_dashStyle .dd-option-image").css("max-height","5px").css("max-width","115px");var k=f.find("#stochs_levels").DataTable({paging:!1,scrollY:100,autoWidth:!0,searching:!1,info:!1,columnDefs:[{className:"dt-center",targets:[0,1,2,3]}],aoColumnDefs:[{bSortable:!1,aTargets:[1,3]}]});a.each(g,function(b,c){a(k.row.add([c.level,'<div style="background-color: '+c.stroke+';width:100%;height:20px;"></div>',c.strokeWidth,'<div style="width:50px;overflow:hidden;"><img src="images/dashstyle/'+c.dashStyle+'.svg" /></div>']).draw().node()).data("level",c).on("click",function(){a(this).toggleClass("selected")})}),f.find("#stochs_level_delete").click(function(){k.rows(".selected").indexes().length<=0?require(["jquery","jquery-growl"],function(a){a.growl.error({message:"Select level(s) to delete!"})}):k.rows(".selected").remove().draw()}),f.find("#stochs_level_add").click(function(){require(["indicator_levels"],function(b){b.open(c,function(b){a.each(b,function(b,c){a(k.row.add([c.level,'<div style="background-color: '+c.stroke+';width:100%;height:20px;"></div>',c.strokeWidth,'<div style="width:50px;overflow:hidden;"><img src="images/dashstyle/'+c.dashStyle+'.svg" /></div>']).draw().node()).data("level",c).on("click",function(){a(this).toggleClass("selected")})})})})}),f.dialog({autoOpen:!1,resizable:!1,width:350,height:400,modal:!0,my:"center",at:"center",of:window,dialogClass:"stochs-ui-dialog",buttons:[{text:"OK",click:function(){var c=!0;if(a(".stochs_input_width_for_period").each(function(){var b=a(this);return _.isInteger(_.toNumber(b.val()))&&_.inRange(b.val(),parseInt(b.attr("min")),parseInt(b.attr("max"))+1)?void 0:(require(["jquery","jquery-growl"],function(a){a.growl.error({message:"Only numbers between "+b.attr("min")+" to "+b.attr("max")+" is allowed for "+b.closest("tr").find("td:first").text()+"!"})}),b.val(b.prop("defaultValue")),void(c=!1))}),c){var e=[];a.each(k.rows().nodes(),function(){var b=a(this).data("level");b&&e.push({color:b.stroke,dashStyle:b.dashStyle,width:b.strokeWidth,value:b.level,label:{text:b.level}})});var g={fastKPeriod:parseInt(a("#stochs_fast_k_period").val()),slowKPeriod:parseInt(a("#stochs_slow_k_period").val()),slowDPeriod:parseInt(a("#stochs_slow_d_period").val()),fastKMaType:a("#stochs_fast_k_ma_type").val(),slowKMaType:a("#stochs_slow_k_ma_type").val(),slowDMaType:a("#stochs_slow_d_ma_type").val(),stroke:a("#stochs_k_stroke").css("background-color"),dStroke:a("#stochs_d_stroke").css("background-color"),strokeWidth:parseInt(a("#stochs_stroke_width").val()),dashStyle:j,appliedTo:parseInt(a("#stochs_applied_to").val()),levels:e};d&&d(),a(a(".stochs").data("refererChartID")).highcharts().series[0].addIndicator("stochs",g),b.call(f)}}},{text:"Cancel",click:function(){b.call(this)}}]}),f.find("select").each(function(b,c){a(c).selectmenu({width:150}).selectmenu("menuWidget").css("max-height","85px")}),"function"==typeof e&&e(c)})}var d=null;return{open:function(b,e){d=e||d;var f=function(){a(".stochs").data("refererChartID",b).dialog("open")};0==a(".stochs").length?c(b,this.open):f()}}});