//Variáveis dos Idiomas

	//Line chart
	var line_chart_width = 900;
	var line_chart_height = 300;

	var svg_line_chart;
	var padding = 45;
	const lado_do_triangulo = 7;
	var country_triangles;

	//cores das linhas
		var colors = ["rgb(255, 164, 5)","rgb(43, 206, 72)","rgb(0, 117, 220)","rgb(194, 0, 136)",
		"rgb(255, 0, 16)","rgb(94, 241, 242)","rgb(116, 10, 255)","rgb(240, 163, 255)","rgb(157, 204, 0)","rgb(0, 153, 143)",
		"rgb(153, 0, 0)","rgb(66, 102, 0)"];
		var used_colors = [];
		function unused_colors() {return colors.filter(d => !used_colors.includes(d)) };

	var line_chart_xaxis;
	var line_chart_yaxis;

	var line_chart_xscale;
	var line_chart_xscale2;
	var line_chart_xscale_filtered;
	var line_chart_yscale;


	//Population pyramid
	var population_pyramid_width = 300;
	var population_pyramid_height = 350;

	var svg_pyramid_M;
	var svg_pyramid_F;
	var svg_pyramid_text;
	var population_pyramid_padding = 20;
	var population_pyramid_age_interval;
	var ydata_pyramid;

	var population_pyramid_xaxis;
	var population_pyramid_xaxis_invert;

	var population_pyramid_xscale_F;
	var population_pyramid_xscale_M;
	var population_pyramid_yscale;


	//Choropleth map
	var cmap_width = 850;
	var cmap_height = 531;
	var map_country_clicked;
	var percent_per_country = {};
	var map_coutries_names;		
		//legend
		var legend;
		var legend_width = 200;
		var divisions = 100;
		
    //represent countries in map
    var search_countries = [];

  //alluvial chart:
  var alluvial_chart_width =  400;//347;
  var alluvial_chart_height = 400;//350;

  //box plots:
  var box_plots_width =  300;//347;
  var box_plots_height = 300;//350;

  //Sports grid
  var sports_grid_width = 400;
  var sports_grid_height = 320;

  //events list
  var events_list_width =  400;
var events_list_height = 220;
var events_list_aux_width =  425;
var events_list_aux_height = 30;
var events_list_aux;
var events_list_permanent;
var events_list_scroll_count;
var events_list_yscale;
var tooltip_events_list;

  var height_min 
  var height_1  
  var height_2  
  var height_3  
  var height_max 
  var height_med 

//quantis dos pesos:

var weight_min 
var weight_1  
var weight_2  
var weight_3   
var weight_max 
var weight_med 
var BMI_min 
var BMI_1  
var BMI_2  
var BMI_3   
var BMI_max 
var BMI_med 

var box_plots_xscale_heights;

var box_plots_xscale_weights;

var box_plots_xscale_BMIs;

var box_plots_yscale;

//max_events:

var max_events_width =  350;
var max_events_height = 210;
var max_events_aux;

//Variáveis dos Datasets
var full_dataset; //dataset original
var dataset_line;
var dataset_cmap;
var dataset_cmap_aux_medals;
var dataset_pyramid;
var dataset_alluvial;
var dataset_box_plots;
var dataset_max_events;
var dataset_sports;
var dataset; //dataset filtrado - para ser usado no Boxplot, Sports Grid, Podium e Events

var countries_codes = {}; //Alpha3 e IOC de cada país
var countries_ioc_name = {}; //IOC e nome de cada país

var country_years_dataset; // host countries em cada season (independente dos participantes)

//var medals_won_per_country_Year_dataset; //pre processamento
//var dataset_pyramid;


//Variáveis das categorias de atributos selecionadas  medal_types = data.map(d => d.Medal).filter(unique).sort(); //guardar todas as seasons
var countries_2_view;
var selected_country;
var selected_countries;
var unselected_countries_line;
var unselected_countries_cmap;
var countries;

var map_countries;
var countries_in_map;
var available_countries;
var countries_with_participants;

var selected_year;
var selected_years;
var years;

var selected_season;
var selected_seasons;
var seasons;

var selected_bar;
var selected_bars = [];
var bars;

var selected_heights;
var selected_height_min;
var selected_height_max;
var height_min;
var height_max;
var heights;

var selected_weights;
var selected_weight_min;
var selected_weight_max;
var weight_min;
var weight_max;
var weights;

var selected_bmis;
var selected_BMI_min;
var selected_BMI_max;
var BMI_min;
var BMI_max;
var bmis;

var selected_medal_type;
var selected_medal_types;
var medal_types;

var selected_event_type; //individual or team
var selected_event_types;
var event_types;

var selected_event;
var selected_events;
var events;

var selected_sport;
var selected_sports;
var sports;



//Variáveis da função update
var changed_sex_pyramid = false;
var changed_age_pyramid = false;



//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//                                                                                                   DISPATCH
//===========================================================================================================
//Dispatch:
var dispatch = d3.dispatch("select_bar",
                           "click_sex_button",
                           "click_line_chart_year",
                           "click_season_line_chart",
                           "change_year_slider",
                           "select_country",
                           "click_reset_button",
                           "select_alluvial",
                           "click_max_events",
                           "events_list_scroll",
                           "events_list_click",
                           "events_list_scroll_bar",
                           "select_sport" );

dispatch.on("select_bar", function (bar) {
                        


                          selected_bar = d3.selectAll("rect")
                            .filter(function(d) {
                              if (d != undefined)  {
                              return d[0] == bar [0] && d[2]==bar[2]}}).nodes()[0];//{return d[0] == bar[0] && d[2] == bar[2] } );

                          //este if é "se selecionaste uma barra que nao a do meio:"
                          if ((selected_bar.id.slice(-1) == "M" || selected_bar.id.slice(-1) == "F") && selected_bar.id.slice(-2,-1) != "M" ) {

                                if (selected_bars == bars)
                                  {selected_bars = [selected_bar];
                                     }

                                else if ( selected_bars.includes(selected_bar) )
                                {selected_bars.splice(selected_bars.indexOf(selected_bar),1);
                                }

                                else { selected_bars.push(selected_bar)
                                		
                                		 }

                                if (selected_bars.length == 0)
                                  {selected_bars = bars;
                                  }

                          ;}
                          //agora é "se escolheste uma das barras do meio:"
                          //é basicamente o mesmo mas se como tivesses selecionado nas duas barras ao mesmo tempo
                          else {
                              var selected_bar_aux = d3.selectAll("rect")
                              .filter(function(d) {
                                if (d != undefined)  {
                                	return d[0] == selected_bar.id.slice(0,-2) && d[2] != "MF"}}).nodes()
                              //a barra masculina é selected_bars_aux[0] e a feminina selected_bars_aux[1]
                              
                              if (selected_bars == bars)
                              {selected_bars = [selected_bar_aux[0], selected_bar_aux[1]];
                              }

                              else if ( selected_bars.includes(selected_bar_aux[0]) && selected_bars.includes(selected_bar_aux[1]) )
                                {selected_bars.splice(selected_bars.indexOf(selected_bar_aux[0]),1);
                                 selected_bars.splice(selected_bars.indexOf(selected_bar_aux[1]),1);
                                }

                              else if ( selected_bars.includes(selected_bar_aux[0]) && !selected_bars.includes(selected_bar_aux[1]) )
                                { selected_bars.push(selected_bar_aux[1]);
                                 }

                              else if ( !selected_bars.includes(selected_bar_aux[0]) && selected_bars.includes(selected_bar_aux[1]) )
                                { selected_bars.push(selected_bar_aux[0]); 
                               }

                              else {selected_bars.push(selected_bar_aux[0]);
                                    selected_bars.push(selected_bar_aux[1]);
                              }
                              if (selected_bars.length == 0)
                                    {selected_bars = bars
                                    }

                          ;}
                          ;});

dispatch.on("click_sex_button", function(button){

  if (JSON.stringify(selected_bars) == JSON.stringify(bars.filter(function(d) { return d.id.slice(-1) == "M"})) && button.path[1].id.slice(-1) == "M")
     {selected_bars = bars}

  else if (JSON.stringify(selected_bars) == JSON.stringify(bars.filter(function(d) {return d.id.slice(-1) == "F"})) && button.path[1].id.slice(-1) == "F")
          {selected_bars = bars}

  else {selected_bars = bars.filter( function (d)
                                            {return d.id.slice(-1) == button.path[1].id.slice(-1) && d.id.slice(-2) != "M"})}
;})

dispatch.on("click_line_chart_year",function(button){


 selected_year = button.path[0].innerHTML
        //só vamos fazer alterações se o ano selecionado foi de facto um ano em que ocorreu um jogo:
        if (   years.includes(selected_year)  ) {

              if (selected_years == years){
                selected_years = [selected_year]
                ;}

              else if (selected_years.includes(selected_year)){
                selected_years.splice(selected_years.indexOf(selected_year),1)
                ;}
              else {selected_years.push(selected_year)}

              if (selected_years.length==0){
                selected_years = years
                ;}

          ;}
        else {svg_line_chart.append("text")
                            .attr("x",button.offsetX - 175)
                            .attr("y",button.offsetY - 200)
                            .attr("dy", "1em")
                            .attr("class", "label")
                            .attr("font-family", "verdana")
                            .attr("font-size","20px")
                            .attr("font-weight","bold")
                            .attr("id","temporary_text_click_on_year_line_chart" + String(selected_year))
                            .attr("fill","red")
                            .text("There were no Olympics held this year!");

              svg_line_chart.select("#temporary_text_click_on_year_line_chart"+ String(selected_year))
                            .transition()
                            .duration(500)
                            .attr("fill","rgba(100,100,100,0)")
                            .remove()


          }
  ;} )


dispatch.on("click_season_line_chart", function (season){
	

	selected_season = season.path[0].id.slice(6,12)
    if (selected_seasons.length == 1 &&  selected_seasons == selected_season ){
     selected_seasons = seasons
    ;}
    else{
    	selected_seasons = [selected_season];
    };

})

dispatch.on("change_year_slider",function(interval){
  
  var change_slider_aux0 = interval[0];
  var change_slider_aux1 = interval[1];

  if (interval[0] >1906){ change_slider_aux0 = change_slider_aux0 - 2 };
  if (interval[0] >1908){ change_slider_aux0 = change_slider_aux0 - 2 };
  if (interval[0] >1916){ change_slider_aux0 = change_slider_aux0 + 4 };
  if (interval[0] >1936){ change_slider_aux0 = change_slider_aux0 + 8 };
  if (change_slider_aux0 >1992){ change_slider_aux0 = change_slider_aux0 - (change_slider_aux0-1992)/2 };

  if (interval[1] >1906){ change_slider_aux1 = change_slider_aux1 - 2 };
  if (interval[1] >1908){ change_slider_aux1 = change_slider_aux1 - 2 };
  if (interval[1] >1916){ change_slider_aux1 = change_slider_aux1 + 4 };
  if (interval[1] >1936){ change_slider_aux1 = change_slider_aux1 + 8 };
  if (change_slider_aux1 >1992){ change_slider_aux1 = change_slider_aux1 - (change_slider_aux1-1992)/2 };

  if (change_slider_aux0 == 1896 && change_slider_aux1 == 2016) {selected_years = years}
  else{selected_years = years.filter(function(d){return d >= change_slider_aux0 && d <= change_slider_aux1;})}
  ;})

dispatch.on("select_country", function(country){


   if (selected_countries == countries)
                              { selected_countries = [selected_country];
                               }

                              else if (selected_countries.includes(selected_country)) //se o pais ja esta selecionado vamos retira-lo da lista de selecionados
                                        {selected_countries.splice(selected_countries.indexOf(selected_country),1);
                                          
                                        }
                              else { //caso contrario, vamos coloca-lo na lista de selecionados
                                selected_countries.push(selected_country);
                              }

                              if (selected_countries.length == 0)
                                {selected_countries = countries}

});

dispatch.on("click_reset_button", function(){
	var new_dataset;
	new_dataset = full_dataset.filter(d => d.Medal != "NA");

    dataset = full_dataset;
 	dataset_line = full_dataset;
  	dataset_cmap = full_dataset;
  	dataset_pyramid = new_dataset;
    dataset_alluvial = new_dataset;
    dataset_box_plots = new_dataset;
    dataset_max_events = new_dataset;
    dataset_sports = new_dataset;
    // valores default de todos os selected -> incluir tudo
  	selected_countries = countries;
    selected_years = years;
    selected_seasons = seasons;
    selected_bars = bars;
    selected_heights = heights;
    selected_height_max = height_max
    selected_height_min = height_min
    selected_weights = weights;
    selected_weight_max = weight_max
    selected_weight_min = weight_min
    selected_bmis = bmis;
    selected_BMI_max = BMI_max
    selected_BMI_min = BMI_min
    selected_medal_types = medal_types;
    selected_event_types = event_types;
    selected_events = events;
    selected_sports = sports;

    d3.select("#slider_year").remove()

    var sliderRange = d3
          .sliderBottom()
          .min(1896)
          .max(2032)
          .width(810)
          .ticks(0) 
          .step(2)
          .default([1896, 2032])
          .fill('#2196f3')
          .on('onchange', d => {dispatch.call("change_year_slider", this, d) 
                                update_dataset();
                                update_pyramid_from_year();
                                update_cmap_from_others();
                                update_alluvial_chart();
                                update_box_plots();
                                update_max_events();
                                update_sports_grid();
                                update_events_list();

                                //vamos por todos os retangulos nos anos invisiveis

                                for (i in years ){

                                  svg_line_chart.select("#tick_rect_line_chart"+String( years[i]) )
                                                .attr("visibility", "hidden")}
                                });
      var gRange = svg_line_chart
          .append('g')
          .attr('transform', 'translate(44,273)')
          .attr("id", "slider_year")
          .call(sliderRange);


    //reset zoom cmap
    var zoom_reset = d3.zoom()
      .scaleExtent([1, 8])
      .on('zoom', function(d) {
          svg_cmap.selectAll(".Country")
           .attr('transform', d.transform);
                             });

	svg_cmap.call(zoom_reset.transform, d3.zoomIdentity);

    update_pyramid_from_pyramid();
    update_pyramid_from_line();
    update_line_from_line();
    update_line_from_pyramid();
    update_line_from_year();
    update_line_from_season();
    update_cmap_from_countries();
    update_cmap_from_others();
    update_alluvial_chart();
    update_max_events();
    update_sports_grid();
    update_events_list(true);
    d3.selectAll(".selection").attr("width",0);
    update_box_plots();
    


});
	
dispatch.on("select_alluvial", function(rect){
  var choice = rect[2]
  if (medal_types.includes(choice)){
                              if(selected_medal_types.length == medal_types.length){selected_medal_types = [choice]}
                              else if(selected_medal_types.includes(choice)){selected_medal_types.splice(selected_medal_types.indexOf(choice),1)}
                              else{selected_medal_types.push(choice)}

                              if(selected_medal_types.length == 0) {selected_medal_types = medal_types}
                              else if (selected_medal_types.length == medal_types.length){selected_medal_types = medal_types}
                              }

  else if(seasons.includes(choice)){
                                    if (selected_seasons[0] == choice && selected_seasons.length == 1 ){selected_seasons = seasons}
                                    else{selected_seasons = [choice]}

                                    }
//caso em que selecionou um event_type:
  else{
    if (selected_event_types[0] == choice && selected_event_types.length == 1 ){selected_event_types = event_types}
    else{selected_event_types = [choice]}

      }
})

dispatch.on("click_max_events",function(number){


  if (selected_events[0] == max_events_aux[number][0] && selected_events.length == 1){selected_events = events;

    svg_max_events.select("#max_events_"+String(number+1)+"_1")
                .transition()
                .duration(300)
                .style("font-weight", "normal")
    svg_max_events.select("#max_events_"+String(number+1)+"_2")
                .transition()
                .duration(300)
                .style("font-weight", "normal")
  }
  else {selected_events = [max_events_aux[number][0]];

    svg_max_events.select("#max_events_"+String(number+1)+"_1")
                .transition()
                .duration(300)
                .style("font-weight", "bold")
    svg_max_events.select("#max_events_"+String(number+1)+"_2")
                .transition()
                .duration(300)
                .style("font-weight", "bold")

    if (number == 0){
    svg_max_events.select("#max_events_"+2+"_1")
          .transition()
          .duration(300)
          .style("font-weight", "normal")

    svg_max_events.select("#max_events_"+2+"_2")
          .transition()
          .duration(300)
          .style("font-weight", "normal")

    svg_max_events.select("#max_events_"+3+"_1")
          .transition()
          .duration(300)
          .style("font-weight", "normal")

    svg_max_events.select("#max_events_"+3+"_2")
          .transition()
          .duration(300)
          .style("font-weight", "normal")

    }
    else if (number == 1){
      svg_max_events.select("#max_events_"+1+"_1")
          .transition()
          .duration(300)
          .style("font-weight", "normal")

    svg_max_events.select("#max_events_"+1+"_2")
          .transition()
          .duration(300)
          .style("font-weight", "normal")

    svg_max_events.select("#max_events_"+3+"_1")
          .transition()
          .duration(300)
          .style("font-weight", "normal")

    svg_max_events.select("#max_events_"+3+"_2")
          .transition()
          .duration(300)
          .style("font-weight", "normal")
    }
    else{
     svg_max_events.select("#max_events_"+1+"_1")
          .transition()
          .duration(300)
          .style("font-weight", "normal")

    svg_max_events.select("#max_events_"+1+"_2")
          .transition()
          .duration(300)
          .style("font-weight", "normal")

    svg_max_events.select("#max_events_"+2+"_1")
          .transition()
          .duration(300)
          .style("font-weight", "normal")

    svg_max_events.select("#max_events_"+2+"_2")
          .transition()
          .duration(300)
          .style("font-weight", "normal")
    }

  }


})

dispatch.on("events_list_scroll",function(event){

    if(event.deltaY > 0){events_list_scroll_count += 1}
    else {events_list_scroll_count -= 1}

    if(events_list_scroll_count < 0){events_list_scroll_count = 0}
    else if (events_list_scroll_count > events_list_aux.length - 11){events_list_scroll_count = events_list_aux.length - 11}




})

dispatch.on("events_list_click",function(){

var ev = events_list_permanent[this.id.slice(17)][0]

if(selected_events.length == events.length){selected_events = [ev]}
else if (selected_events.includes(ev)) {selected_events.splice(selected_events.indexOf(ev),1)}
else {selected_events.push(ev)}

if (selected_events.length == 0) {selected_events = events}


})

dispatch.on("events_list_scroll_bar",function(){


  events_list_scroll_count = Math.ceil(events_list_aux.length * (event.offsetY/events_list_height))

  if(events_list_scroll_count < 0){events_list_scroll_count = 0}
  else if (events_list_scroll_count > events_list_aux.length - 11){events_list_scroll_count = events_list_aux.length - 11}

})


dispatch.on("select_sport",function(){

if (selected_sports == sports)
                              { selected_sports = [selected_sport];
                               }

                              else if (selected_sports.includes(selected_sport)) //se o pais ja esta selecionado vamos retira-lo da lista de selecionados
                                        {selected_sports.splice(selected_sports.indexOf(selected_sport),1);
                                          
                                        }
                              else { //caso contrario, vamos coloca-lo na lista de selecionados
                                selected_sports.push(selected_sport);
                              }

                              if (selected_sports.length == 0)
                                {selected_sports = sports}


})



//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//                                                                                         FUNÇÕES AUXILIARES
//===========================================================================================================

function represent_countries_in_map(c){
 //dicionario com IOC como chave e valores: nome do pais (NOC) + (IOC) (se esta disponivel no mapa) 
  var country_key;
  for (i in c){
  country_key = countries_ioc_name[c[i]]
  if (!countries_in_map.includes(c[i])){
    search_countries.push({name: String(country_key) + "*", ioc: c[i]})
    countries_ioc_name[c[i]] = countries_ioc_name[c[i]] + "*"
  }
  else{
    search_countries.push({name: String(country_key), ioc: c[i] })
} 
  
};

return search_countries};


function convert_code(code){
	if (countries_codes[code] == undefined){return code}
	else{return countries_codes[code]}
};

function remove_color(color){
					index = used_colors.indexOf(color);
					if (!(index == -1)){
						used_colors.splice(index,1)
					}
				};


function unique(value, index, self) {
  return self.indexOf(value) === index};

function selected_sex_ages(){
    var selected_sex_ages_aux2;
    var idadesF = [];
    var idadesM = [];
 
    for (i in selected_bars){

            if (selected_bars[i].id.slice(-1) == "F") {
              //[aux2 aux3[ são os limites do intervalo de idades desta barra
              selected_sex_ages_aux2 = selected_bars[i].id.slice(0,-1) * population_pyramid_age_interval
              const selected_sex_ages_aux3 = selected_sex_ages_aux2 + population_pyramid_age_interval;
              while (selected_sex_ages_aux2 < selected_sex_ages_aux3){
              idadesF.push(selected_sex_ages_aux2);
              selected_sex_ages_aux2 = selected_sex_ages_aux2 + 1;
            }
          }
            else {
              //[aux2 aux3[ são os limites do intervalo de idades desta barra
              selected_sex_ages_aux2 = selected_bars[i].id.slice(0,-1) * population_pyramid_age_interval
              const selected_sex_ages_aux3 = selected_sex_ages_aux2 + population_pyramid_age_interval;
              while (selected_sex_ages_aux2 < selected_sex_ages_aux3){
              idadesM.push(selected_sex_ages_aux2);
              selected_sex_ages_aux2 = selected_sex_ages_aux2 + 1;

            }
          }
      };
    //devolve [idadesF,idadesM]
    var selected_sex_ages_aux = [idadesF, idadesM];
    return selected_sex_ages_aux
  }


//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//                                                                                                    UPDATES
//===========================================================================================================
function update_dataset(){
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

var selected_sex_ages_aux = selected_sex_ages();
var idadesF = selected_sex_ages_aux[0];
var idadesM = selected_sex_ages_aux[1];
var dataset_aux;
var dataset_aux2;

dataset_aux = full_dataset.filter(function(d){
  //filtra a informação que todos os idiomas usam
  return (selected_events == events || selected_events.includes(d.Event))
  && (selected_sports == sports || selected_sports.includes(d.Sport))
  && ( (selected_height_min == height_min && selected_height_max == height_max) || (selected_height_min <= d.Height && selected_height_max >= d.Height) )
  && ( (selected_weight_min == weight_min && selected_weight_max == weight_max) || (selected_weight_min <= d.Weight && selected_weight_max >= d.Weight) )
  && ( (selected_BMI_min == BMI_min && selected_BMI_max == BMI_max) || (selected_BMI_min <= parseInt(d.BMI) && selected_BMI_max >= parseInt(d.BMI)) )
  
;});
 
dataset_aux2 = dataset_aux.filter(function(d){                                      //filtra também por countries e years       
  return (selected_countries == countries || selected_countries.includes(d.NOC))
  && (selected_years == years || selected_years.includes(d.Year))
;});

dataset_aux3 = full_dataset.filter(function(d){                //este não é para filtrar por eventos nem desportos
  return (selected_countries == countries || selected_countries.includes(d.NOC))
  && (selected_years == years || selected_years.includes(d.Year))
  && ( (d.Sex == "M" && idadesM.includes(parseInt(d.Age))) ||   (d.Sex == "F" && idadesF.includes(parseInt(d.Age))) )
  && (selected_seasons == seasons || selected_seasons.includes(d.Season))
  && (selected_medal_types == medal_types || selected_medal_types.includes(d.Medal))
  && (d.Medal != "NA")
  && (selected_event_types == event_types || selected_event_types.includes(d.Event_Type))  
  && ( (selected_height_min == height_min && selected_height_max == height_max) || (selected_height_min <= d.Height && selected_height_max >= d.Height) )
  && ( (selected_weight_min == weight_min && selected_weight_max == weight_max) || (selected_weight_min <= d.Weight && selected_weight_max >= d.Weight) )
  && ( (selected_BMI_min == BMI_min && selected_BMI_max == BMI_max) || (selected_BMI_min <= parseInt(d.BMI) && selected_BMI_max >= parseInt(d.BMI)) )
  
  ;});


dataset_box_plots = full_dataset.filter(function(d){                //este não é para filtrar as idades nem peso nem BMI
  return (selected_events == events || selected_events.includes(d.Event))
  && (selected_sports == sports || selected_sports.includes(d.Sport))
  && (selected_countries == countries || selected_countries.includes(d.NOC))
  && (selected_years == years || selected_years.includes(d.Year))
  && ( (d.Sex == "M" && idadesM.includes(parseInt(d.Age))) ||   (d.Sex == "F" && idadesF.includes(parseInt(d.Age))) )
  && (selected_seasons == seasons || selected_seasons.includes(d.Season))
  && (selected_medal_types == medal_types || selected_medal_types.includes(d.Medal))
  && (d.Medal != "NA")
  && (selected_event_types == event_types || selected_event_types.includes(d.Event_Type))

;});

dataset_max_events = dataset_aux3.filter(function(d){                //este não é para filtrar por eventos
  return (selected_sports == sports || selected_sports.includes(d.Sport))
  ;});

dataset_sports = dataset_aux3.filter(function(d){                //este não é para filtrar por sports
  return (selected_events == events || selected_events.includes(d.Event))
  ;});

 
dataset_alluvial = dataset_aux2.filter(function(d){                //filtrado por tudo excepto medal_type, season and event_type
  return ( (d.Sex == "M" && idadesM.includes(parseInt(d.Age)))
  ||   (d.Sex == "F" && idadesF.includes(parseInt(d.Age))) )
  && d.Medal != "NA"

});

dataset_pyramid = dataset_aux2.filter(function(d){                              //filtrado por tudo excepto age and sex
return (selected_seasons == seasons || selected_seasons.includes(d.Season))
  && (selected_medal_types == medal_types || selected_medal_types.includes(d.Medal))
  && (d.Medal != "NA")
  && (selected_event_types == event_types || selected_event_types.includes(d.Event_Type))
});

dataset_line = dataset_aux.filter(function(d){                                   //filtrado por tudo excepto countries, medal_type e years
return (selected_seasons == seasons || selected_seasons.includes(d.Season))
  && (selected_event_types == event_types || selected_event_types.includes(d.Event_Type))
  && ( (d.Sex == "M" && idadesM.includes(parseInt(d.Age)))
  ||   (d.Sex == "F" && idadesF.includes(parseInt(d.Age))))
});

dataset_cmap = dataset_line.filter(function(d){                         //filtrado por tudo excepto os countries e medal_type
	return (selected_years == years || selected_years.includes(d.Year))
});


dataset = dataset_cmap.filter(function(d){                                      //filtrado por tudo 
return (selected_countries == countries || selected_countries.includes(d.NOC))
	 && (selected_medal_types == medal_types || selected_medal_types.includes(d.Medal))
});

}



//funçoes de update:
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Atualiza a piramide quando a mesma é clicada

function update_pyramid_from_pyramid(){

  for (i in selected_bars) {

    d3.selectAll("rect")
      .filter(function(d) {
        if (d != undefined)  {
          return d[0]+d[2] == selected_bars[i].id }} )
      .transition()
      .duration(200)
      .attr("fill",
            function(d)
              {if (d[2] == "M") {return "Cornflowerblue"} else if (d[2] == "F") {return "pink"}    }    )

  }


  const unselected_bars = bars.filter(d =>  !selected_bars.includes(d) )
  for (i in unselected_bars ) {

    d3.selectAll("rect")
      .filter(function(d) {
        if (d != undefined)  {return d[0]+d[2] == unselected_bars[i].id }} )
      .transition()
      .duration(300)
      .attr("fill", "rgba(100,100,100,0.5)")

  }
  ;}


function update_line_from_pyramid(){

	if (dataset_line.length == 0){
	svg_line_chart.append("text")
				.attr("id", "line_error")
                .attr("dy", "1em")
                .attr("x", 290)
                .attr("y", 40)
                .attr("class", "label")
                .attr("font-family", "verdana")
                .attr("font-size","20px")
                .attr("font-weight","bold")
                .attr("fill","red")
                .text("There is no data to show");

}
else{
	d3.select("#line_error").remove();
    };
 
  function gerar_data_line_chart(countries){
    var r = [];
    var dataset_line_aux;
    var line_chart_medals = selected_medal_types;
    var index_medal = line_chart_medals.indexOf("NA");
	if (index_medal != -1) {line_chart_medals.splice(index_medal, 1)};
  if (line_chart_medals == []) {line_chart_medals = ["Gold", "Silver", "Bronze"]}

	var dataset_line_nest;
 	dataset_line_aux = dataset_line.filter(function(d){return line_chart_medals.includes(d.Medal)});
	dataset_line_nest = d3.rollup(dataset_line_aux, d => d.length, d => d.NOC, d => d.Year);

    for (j in countries){
    for (i in years){

      if ( !dataset_line_nest.has(countries[j]) || !dataset_line_nest.get(countries[j]).has(years[i]) || dataset_line_nest.get(countries[j]).get(years[i]) == undefined) {
    	r.push([ countries[j], years[i],0])}
	  else {r.push([ countries[j], years[i],dataset_line_nest.get(countries[j]).get(years[i])])}
    }
  };
  return r}

  data_line_chart = gerar_data_line_chart(countries_2_view);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//agora as escalas

line_chart_yscale = d3
  .scaleLinear()
  .domain([0,d3.max(data_line_chart, function (d) {return d[2];}),])
  .range([line_chart_height - padding - 15, padding, ]);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//o eixo:

    svg_line_chart.select("#line_chart_yaxis").remove()


    line_chart_yaxis = d3
    .axisLeft() 
    .scale(line_chart_yscale) 


    svg_line_chart
    .append("g") 
    .attr("transform", "translate(" + padding + ",0)")
    .attr("class", "yaxis")
    .attr("id","line_chart_yaxis")
    .call(line_chart_yaxis);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//novas linhas:
var line = d3.line()
               .x(function (d) {
          return line_chart_xscale2(d[1]);
        })
              .y(function (d) {
          return line_chart_yscale(d[2]);
        })
              .defined(function (d) {
          return d[2] !== null});


  for (i in countries){
    svg_line_chart.select("#path"+countries[i])
    .transition()
    .duration(200)
    .attr(
      "d",
      line(data_line_chart.filter(d => d[0] == countries[i])  ))


  ;}

  ;}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Atualiza a piramide quando o line chart foi filtrado
function update_pyramid_from_line(){

if (dataset_pyramid.length == 0){
	svg_pyramid_M.append("text")
				.attr("id", "pyramid_error1")
                .attr("dy", "1em")
                .attr("x", 10)
                .attr("y", 18)
                .attr("class", "label")
                .attr("font-family", "verdana")
                .attr("font-size","18px")
                .attr("font-weight","bold")
                .attr("fill","red")
                .text("There is no");

     svg_pyramid_text.append("text")
				.attr("id", "pyramid_error2")
                .attr("dy", "1em")
                .attr("x", 4)
                .attr("y", 18)
                .attr("class", "label")
                .attr("font-family", "verdana")
                .attr("font-size","18px")
                .attr("font-weight","bold")
                .attr("fill","red")
                .text("data");
      
     svg_pyramid_F.append("text")
				.attr("id", "pyramid_error3")
                .attr("dy", "1em")
                .attr("x", 5)
                .attr("y", 18)
                .attr("class", "label")
                .attr("font-family", "verdana")
                .attr("font-size","18px")
                .attr("font-weight","bold")
                .attr("fill","red")
                .text("to show");


}
else{
	d3.select("#pyramid_error1").remove();
	d3.select("#pyramid_error2").remove();
	d3.select("#pyramid_error3").remove();
    };


  ydata_pyramid_F = ydata_pyramid.map(  function( d ){return [d, dataset_pyramid.filter( function(data){return data.Sex == "F" && Math.floor(data.Age/population_pyramid_age_interval)==d;} ).length, "F" ];}  );
  ydata_pyramid_M = ydata_pyramid.map(  function( d ){return [d, dataset_pyramid.filter( function(data){return data.Sex == "M" && Math.floor(data.Age/population_pyramid_age_interval)==d;} ).length, "M" ];}  );
  ydata_pyramid_MF= ydata_pyramid.map(  function( d ){return [d, 0, "MF" ];}  );


  const max_value = d3.max([  Math.max.apply(Math,ydata_pyramid_M.map(d => d[1])) ,  Math.max.apply(Math,ydata_pyramid_F.map(d => d[1])) ]);

  const min_value = d3.min([  Math.min.apply(Math,ydata_pyramid_M.map(d => d[1])) ,  Math.min.apply(Math,ydata_pyramid_F.map(d => d[1])) ]);

  //novas escalhas:
  population_pyramid_xscale = d3 //esta é a escala onde vamos fazer as barras
  .scaleLinear()
  .domain([min_value,max_value] )
  .range([0, (population_pyramid_width-50)/2 - population_pyramid_padding]);

  population_pyramid_xscale_invert = d3 //esta é a escala onde vamos fazer as barras
  .scaleLinear()
  .domain([min_value,max_value] )
  .range([(population_pyramid_width-50)/2 ,population_pyramid_padding]);

  //novos eixos:
  population_pyramid_xaxis_invert = d3
    .axisBottom() 
    .scale(population_pyramid_xscale_invert) 
    .ticks(2)

  population_pyramid_xaxis = d3
    .axisBottom() 
    .scale(population_pyramid_xscale) 
    .ticks(2)

  
  svg_pyramid_M.select("g").remove();

  svg_pyramid_M
    .append("g") 
    .attr("transform", "translate(-3,55)")
    .attr("class", "xaxis") 
    .call(population_pyramid_xaxis_invert);

        svg_pyramid_M
          .selectAll("rect")
          .data(ydata_pyramid_M)
          .join("rect");

  svg_pyramid_F.select("g").remove();

  svg_pyramid_F
    .append("g") 
    .attr("transform", "translate(3,55)")
    .attr("class", "xaxis")
    .call(population_pyramid_xaxis)

    //aqui mmudamos as barras:
        svg_pyramid_M
          .selectAll("rect")
          .data(ydata_pyramid_M)
          .join("rect");

        svg_pyramid_M
          .selectAll("rect")
          .transition() 
          .duration(300)
          .attr("width", function (d) {return population_pyramid_xscale(d[1]) ;}) // each bar’s width depends on the total number of bars
          .attr("x", function (d) {return population_pyramid_padding - 3 + population_pyramid_xscale(max_value - d[1]) ;} )
          .attr("id",function(d) {return d[0]+"M"} )

        svg_pyramid_F
          .selectAll("rect")
          .data(ydata_pyramid_F)
          .join("rect");
        svg_pyramid_F
          .selectAll("rect")
          .transition()
          .duration(300)
          .attr("width", function (d) {return population_pyramid_xscale(d[1]) ;}) // each bar’s width depends on the total number of bars
          .attr("x", function (d) {return 3 + population_pyramid_xscale(min_value) ;} )
          .attr("id",function(d) {return d[0]+"F"})

  ;}
//atualizar as linhas quando se clica numa linha, só é necessário mudar as cores 
function update_line_from_line(){

if (dataset_line.length == 0){
	svg_line_chart.append("text")
				.attr("id", "line_error")
                .attr("dy", "1em")
                .attr("x", 290)
                .attr("y", 40)
                .attr("class", "label")
                .attr("font-family", "verdana")
                .attr("font-size","20px")
                .attr("font-weight","bold")
                .attr("fill","red")
                .text("There is no data to show");

}
else{
	d3.select("#line_error").remove();
    };


let color; 
if (selected_countries == countries){
	d3.selectAll(".country_lines")
	  .style("stroke", "black");    
	used_colors = [];
}
else if (selected_countries.includes(selected_country)){
	if (selected_countries.length == 1){
	//mudar a cor de todas as linhas para cinzento
	d3.selectAll(".country_lines")
	  .style("stroke", "rgba(100,100,100,0.2)")

	//mudar a cor do país selecionado para a desejada
	color = unused_colors()[0];
	d3.select("#path" + selected_country).style("stroke", color);
	used_colors.push(color);	
	}
	else if (selected_countries.length < 13){
		color = unused_colors()[0];
	    d3.select("#path" + selected_country).style("stroke", color);
	    used_colors.push(color);
	}
	else if (selected_countries.length == 13){
		for (i in selected_countries){
		 d3.select("#path" + selected_countries[i]).style("stroke", "black");
	    }
	}
	else {
		d3.select("#path" + selected_country).style("stroke", "black");
   }
}
else{
	color = d3.select("#path" + selected_country).style("stroke");
	d3.select("#path" + selected_country).style("stroke", "rgba(100,100,100,0.2)");
	if (selected_countries.length < 12){
		remove_color(color);
	}
	else if (selected_countries.length == 12){
		used_colors = [];
		for (i in selected_countries){
			color = unused_colors()[0];
			d3.select("#path" + selected_countries[i]).style("stroke", color);
			used_colors.push(color);
		}
	}
}
  //países não selecionados
  unselected_countries_line = countries.filter(d => !selected_countries.includes(d) );

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  //colocar triangulos:
  country_triangles = []
  if (selected_countries.length <= 12) {
        for (i in selected_countries)
        {
              var triangles_aux = country_years_dataset.filter(d => d.NOC == selected_countries[i])
              if (triangles_aux.length >0 ) {triangles_aux = triangles_aux[0]

                //isto da um erro se algum pais nao tiver ou em summer ou em winter, but i dont care

                      for (j in triangles_aux.summer_years )
                      {

                         
                            country_triangles.push(
                            [String(line_chart_xscale2(parseInt(triangles_aux.summer_years[j]))                  ) +  "," + String(line_chart_height - 28                      ) + " " +
                            String(line_chart_xscale2(parseInt(triangles_aux.summer_years[j]))+lado_do_triangulo) +  "," + String(line_chart_height - 28 + 2*lado_do_triangulo) + " " +
                            String(line_chart_xscale2(parseInt(triangles_aux.summer_years[j]))-lado_do_triangulo) +  "," + String(line_chart_height - 28 + 2*lado_do_triangulo) ,
                            svg_line_chart.select("#path"+selected_countries[i]).style("stroke"),
                            "black"]
                          )

                      ;}


                      for (j in triangles_aux.winter_years )
                      {

                        
                            country_triangles.push(
                            [String(line_chart_xscale2(parseInt(triangles_aux.winter_years[j]))                  ) +  "," + String(line_chart_height - 14                      ) + " " +
                             String(line_chart_xscale2(parseInt(triangles_aux.winter_years[j]))+lado_do_triangulo) +  "," + String(line_chart_height - 14 + 2*lado_do_triangulo) + " " +
                             String(line_chart_xscale2(parseInt(triangles_aux.winter_years[j]))-lado_do_triangulo) +  "," + String(line_chart_height - 14 + 2*lado_do_triangulo) ,
                            svg_line_chart.select("#path"+selected_countries[i]).style("stroke"),
                            "black"]
                          )

                      ;}
                ;}
        ;}
   ;}


  svg_line_chart.selectAll("#triangulo_de_host").remove()

  for (i in country_triangles){
    svg_line_chart.append("polygon")
                  .attr("points", country_triangles[i][0])
                  .attr("fill", country_triangles[i][1])
                  .attr("id","triangulo_de_host")
                  .style("stroke", country_triangles[i][2])
                  .style("strokeWidth", "15px");

  }

  ;}

function update_line_from_year(){
    if (selected_years.length != years.length){

            for (i in selected_years){


              svg_line_chart.select("#tick_rect_line_chart"+String( selected_years[i] ))
                            .attr("transform", "translate(-14,3)")
                            .transition()
                            .duration(300)
                            .attr("visibility", "visible")
              ;}

            for (i in years.filter(d => !selected_years.includes(d)) ){


               svg_line_chart.select("#tick_rect_line_chart"+String( years.filter(d => !selected_years.includes(d))[i] ))
                            .attr("transform", "translate(-1,-3)")
                            .transition()
                            .duration(300)
                            .attr("visibility", "hidden")
                ;}

            }

    else{

          for (i in years ){

          svg_line_chart.select("#tick_rect_line_chart"+String( years[i]) )
                      .attr("transform", "translate(-1,-3)")
                      .transition()
                      .duration(300)
                      .attr("visibility", "hidden")}

                      }


      ;}


function update_pyramid_from_year(){
  update_pyramid_from_line();
};

function update_line_from_season(){

if (selected_seasons.length == 1){
           svg_line_chart.select("#season"+selected_seasons[0])
                .transition()
                .duration(300)
                .style("font-weight", "bold")
           svg_line_chart.select("#season"+seasons.filter(x => !selected_seasons.includes(x))[0])
                .transition()
                .duration(300)
                .style("font-weight", "normal")
}
else {
		for (i in selected_seasons ){
	       svg_line_chart.select("#season"+selected_seasons[i])
                .transition()
                .duration(300)
                .style("font-weight", "normal")
              ;}

}
 update_line_from_pyramid();  
};

function update_pyramid_from_season(){
	update_pyramid_from_line();
}

function update_line_from_cmap(){
update_line_from_line();
  
}

function update_pyramid_from_cmap(){
  update_pyramid_from_line();
}

function update_cmap_from_countries(){ //quando se escolhem países no line_chart ou cmap
	for (i in available_countries){

		if (selected_countries != countries && selected_countries.includes(available_countries[i])){
		
		d3.select("#country"+available_countries[i])
		  .style("stroke", "black")
  		  .style("stroke-width",2)
  		  .raise();
	}
		else{
			d3.select("#country"+available_countries[i])
			  .style("stroke", "rgba(128, 127, 125, 0.5)")
			  .style("stroke-width", 1)
		}

	}

	
}

function update_cmap_from_others(){ //quando se fazem seleções noutros idiomas

data_cmap = gerar_data_cmap(countries_2_view);

var colorScale = function(d) {return d3.interpolatePurples(d/2+0.5)}

countries_with_participants = Array.from(d3.group(dataset_cmap,d => d.NOC).keys())
available_countries = countries_in_map.filter(d => countries_with_participants.includes(d))

medaled_events_per_country = d3.rollup(dataset_cmap_aux_medals, d => d.length, d => d.NOC, d => d.Event);

for (i in available_countries){
  percent_per_country[available_countries[i]] =+ data_cmap[available_countries[i]];
}


//atualizar o mapa
svg_cmap.selectAll(".Country")
 	    .transition()
        .duration(500)
        .attr("fill", function(d){

    		if (available_countries.includes(convert_code(d.id)) && percent_per_country[convert_code(d.id)] != undefined){
    			return colorScale(percent_per_country[convert_code(d.id)]); 
    		}
    		else{return "#998c6d"} //cor para países que não participaram nos jogos
            
        });
       

}

function update_alluvial_chart(){

	if (dataset_alluvial.length == 0){
	svg_alluvial_chart.append("text")
				.attr("id", "alluvial_error")
                .attr("dy", "1em")
                .attr("x", 45)
                .attr("y", 30)
                .attr("class", "label")
                .attr("font-family", "verdana")
                .attr("font-size","20px")
                .attr("font-weight","bold")
                .attr("fill","red")
                .text("There is no data to show");
}
else{
	d3.select("#alluvial_error").remove();
    };
  
  //criar as variaveis necessárias para desenhar as coisas
    var alluvial_total_count = dataset_alluvial.length;
    //fazer a informaçao para o eixos das medalhas:
    
    var alluvial_gold_count  = dataset_alluvial.filter(d => d.Medal == "Gold").length;
    var alluvial_silver_count= dataset_alluvial.filter(d => d.Medal == "Silver").length;
    var alluvial_bronze_count= dataset_alluvial.filter(d => d.Medal == "Bronze").length;
    //var alluvial_NA_count    = dataset_alluvial.filter(d => d.Medal == "NA").length;

    //fazer a informaçao para o eixos das seasons:

    var alluvial_summer_gold_count = dataset_alluvial.filter(d => d.Season == "Summer" && d.Medal == "Gold").length;
    var alluvial_summer_silver_count = dataset_alluvial.filter(d => d.Season == "Summer" && d.Medal == "Silver").length;
    var alluvial_summer_bronze_count = dataset_alluvial.filter(d => d.Season == "Summer" && d.Medal == "Bronze").length;
    //var alluvial_summer_NA_count = dataset_alluvial.filter(d => d.Season == "Summer" && d.Medal == "NA").length;



    var alluvial_summer_count = alluvial_summer_gold_count + alluvial_summer_silver_count +alluvial_summer_bronze_count //+alluvial_summer_NA_count
    

    var alluvial_winter_gold_count = dataset_alluvial.filter(d => d.Season == "Winter" && d.Medal == "Gold").length;
    var alluvial_winter_silver_count = dataset_alluvial.filter(d => d.Season == "Winter" && d.Medal == "Silver").length;
    var alluvial_winter_bronze_count = dataset_alluvial.filter(d => d.Season == "Winter" && d.Medal == "Bronze").length;
    //var alluvial_winter_NA_count = dataset_alluvial.filter(d => d.Season == "Winter" && d.Medal == "NA").length;


    var alluvial_winter_count =  alluvial_winter_gold_count + alluvial_winter_silver_count +alluvial_winter_bronze_count// +alluvial_winter_NA_count
    
    //fazer a informaçao para o eixos dos event types:

    var alluvial_ind_summer_gold_count = dataset_alluvial.filter(d => d.Event_Type == "Individual" && d.Season == "Summer" && d.Medal == "Gold").length;
    var alluvial_ind_summer_silver_count = dataset_alluvial.filter(d => d.Event_Type == "Individual" && d.Season == "Summer" && d.Medal == "Silver").length;
    var alluvial_ind_summer_bronze_count = dataset_alluvial.filter(d => d.Event_Type == "Individual" && d.Season == "Summer" && d.Medal == "Bronze").length;
    
    var alluvial_ind_winter_gold_count = dataset_alluvial.filter(d => d.Event_Type == "Individual" && d.Season == "Winter" && d.Medal == "Gold").length;
    var alluvial_ind_winter_silver_count = dataset_alluvial.filter(d => d.Event_Type == "Individual" && d.Season == "Winter" && d.Medal == "Silver").length;
    var alluvial_ind_winter_bronze_count = dataset_alluvial.filter(d => d.Event_Type == "Individual" && d.Season == "Winter" && d.Medal == "Bronze").length;
    
    
    var alluvial_ind_count = alluvial_ind_summer_gold_count + alluvial_ind_summer_silver_count + alluvial_ind_summer_bronze_count + alluvial_ind_winter_gold_count + alluvial_ind_winter_silver_count + alluvial_ind_winter_bronze_count
    
    var alluvial_team_summer_gold_count = dataset_alluvial.filter(d => d.Event_Type == "Team" && d.Season == "Summer" && d.Medal == "Gold").length;
    var alluvial_team_summer_silver_count = dataset_alluvial.filter(d => d.Event_Type == "Team" && d.Season == "Summer" && d.Medal == "Silver").length;
    var alluvial_team_summer_bronze_count = dataset_alluvial.filter(d => d.Event_Type == "Team" && d.Season == "Summer" && d.Medal == "Bronze").length;
    
    var alluvial_team_winter_gold_count = dataset_alluvial.filter(d => d.Event_Type == "Team" && d.Season == "Winter" && d.Medal == "Gold").length;
    var alluvial_team_winter_silver_count = dataset_alluvial.filter(d => d.Event_Type == "Team" && d.Season == "Winter" && d.Medal == "Silver").length;
    var alluvial_team_winter_bronze_count = dataset_alluvial.filter(d => d.Event_Type == "Team" && d.Season == "Winter" && d.Medal == "Bronze").length;
    
    
    var alluvial_team_count = alluvial_team_summer_gold_count + alluvial_team_summer_silver_count + alluvial_team_summer_bronze_count + alluvial_team_winter_gold_count + alluvial_team_winter_silver_count + alluvial_team_winter_bronze_count
    
    

    
    //dados para fazer os retangulos: cada retangulo vai ter a informaçao:
    //numero que representa
    //proporçao que representa
    //nome, pode ser um time de medlha, um tipo de season ou um tipo de event
    //a coordenada x onde se deve dar o retangulo,
    //a proporçao acumulativa das anteriores, para se saber o y onde começar este retangulo
    //o quanto o retangulo deve ser transladado para baixo para haver espaçamento entre os retangulos,
    //assim o y do rentagulo fica: alluvial_chart_yscale(d[4]) + d[5]
    var alluvial_data_aux = [];


      
    alluvial_data_aux.push([alluvial_gold_count, alluvial_gold_count/alluvial_total_count,"Gold",0,0,0])
    alluvial_data_aux.push([alluvial_silver_count, alluvial_silver_count/alluvial_total_count,"Silver",0,alluvial_gold_count/alluvial_total_count,10])
    alluvial_data_aux.push([alluvial_bronze_count, alluvial_bronze_count/alluvial_total_count,"Bronze",0,(alluvial_gold_count+alluvial_silver_count)/alluvial_total_count,20])
    //alluvial_data_aux.push([alluvial_NA_count,alluvial_NA_count/alluvial_total_count,"NA",0,(alluvial_gold_count+alluvial_silver_count+alluvial_bronze_count)/alluvial_total_count,30])


    alluvial_data_aux.push([alluvial_summer_count, alluvial_summer_count/alluvial_total_count,"Summer",alluvial_chart_width/2 - 25,0,0])
    alluvial_data_aux.push([alluvial_winter_count, alluvial_winter_count/alluvial_total_count,"Winter",alluvial_chart_width/2 - 25,alluvial_summer_count/alluvial_total_count,20])

    alluvial_data_aux.push([alluvial_ind_count, alluvial_ind_count/alluvial_total_count,"Individual",alluvial_chart_width-50,0,0])
    alluvial_data_aux.push([alluvial_team_count, alluvial_team_count/alluvial_total_count,"Team",alluvial_chart_width-50,alluvial_ind_count/alluvial_total_count,20])
    

  //a partir daqui são as scales
  //as escalhas vao de 0 a 1 porque nós para fazer o alluvial chart vamos fazer a altura dos retangulos singificar, por exemplo
  //"a proporçao de medalhas que foram de ouro". logo vai ser um numero entre 0 e 1

  alluvial_chart_xscale = d3 
  .scaleLinear()
  .domain([0,alluvial_chart_width] )
  .range([30,alluvial_chart_width-30] );


  alluvial_chart_yscale = d3
  .scaleLinear()
  .domain([0,1] )
  .range([0,alluvial_chart_height-100]);



var alluvial_rects = svg_alluvial_chart
    .selectAll("g") 
    .data(alluvial_data_aux)
    .join("g") // for each item, we are appending a rectangle
    

alluvial_rects.selectAll("rect").remove()
alluvial_rects.append("rect")
    .attr("id", function(d) {return "alluvial"+String(d[2]) } )
    .attr("width", function (d) {return 20 ;}) // each bar’s width depends on the total number of bars
    .attr("height", d => alluvial_chart_yscale(d[1])) // fit to our scale
    .attr("fill", function (d) {
                                if(selected_medal_types.includes(d[2]) || 
                                   selected_seasons.includes(d[2]) ||
                                   selected_event_types.includes(d[2])) {return "rgb(180,180,180)"}
                                else {return "rgb(220,220,220)"}
                                ;} )

    .attr("x", function (d) {return alluvial_chart_xscale(d[3]) ;} )
    .attr("y", function (d) {return 30 + alluvial_chart_yscale(d[4])+d[5] ;} )
    .style("stroke", function (d) {
                                  if(selected_medal_types.includes(d[2]) || 
                                    selected_seasons.includes(d[2]) ||
                                    selected_event_types.includes(d[2])) {return "rgb(0,0,0,1)"}
                                  else {return "rgb(0,0,0,0)"}
                                  ;} )
    .style("stroke-width", 1)
      

    alluvial_rects.selectAll("text").remove()
    if (dataset_alluvial.length > 0){
      alluvial_rects.append("text")
      .attr("x", function (d) {return alluvial_chart_xscale(d[3]) - 5 ;})
      .attr("y", function (d) {return 20 + alluvial_chart_yscale(d[1]/2 + d[4])+d[5] ;})
      .attr("dy", ".935em")
      .attr("font-family","verdana")
      .attr("font-size","10px")
      .attr("fill",function(d){
                               if(d[1] == 0){return "rgba(0,0,0,0)"}
                               else{return "rgba(0,0,0,1)"}
                              
                              } )
      
      .attr("transform", d => "rotate(-90," + 
      String(alluvial_chart_xscale(d[3]) - 5) +","+
       String(20 + alluvial_chart_yscale(d[1]/2 + d[4])+d[5])+")translate(-27,8)")
      .text(function(d){return d[2] })}



  //fazer os polígonos entre os retangulos:

  function build_polygon_data_1(){
    var r = []
    var gold = svg_alluvial_chart.select("#AlluvialGold").nodes()[0]
    var silver = svg_alluvial_chart.select("#AlluvialSilver").nodes()[0]
    var bronze = svg_alluvial_chart.select("#AlluvialBronze").nodes()[0]
    //var NA = svg_alluvial_chart.select("#AlluvialNA").nodes()[0]


    var summer = svg_alluvial_chart.select("#AlluvialSummer").nodes()[0]
    var winter = svg_alluvial_chart.select("#AlluvialWinter").nodes()[0]


    var ind = svg_alluvial_chart.select("#AlluvialIndividual").nodes()[0]
    var team = svg_alluvial_chart.select("#AlluvialTeam").nodes()[0]

    //os poligonos sao definidos pela ordem seguinte:
    //canto esquerdo inferior
    //canto esquero superior
    //canto direito superior
    //cando direito inferior


    //poligono que vai do ouro para o verao:
    r.push( [String(gold.x.baseVal.value + gold.width.baseVal.value) + "," +
             String(gold.y.baseVal.value + alluvial_chart_yscale(alluvial_summer_gold_count/alluvial_total_count))+ " " +

             String(gold.x.baseVal.value + gold.width.baseVal.value) + "," +
             String(gold.y.baseVal.value                            )+ " " +

             String(summer.x.baseVal.value                          ) + "," +
             String(summer.y.baseVal.value                           )+ " " +

             String(summer.x.baseVal.value                           ) + "," +
             String(summer.y.baseVal.value + alluvial_chart_yscale(alluvial_summer_gold_count/alluvial_total_count))

              ,"rgba(255,215,0,0.5)"]
          )

  //poligono que vai do ouro para o winter:
    r.push([String(gold.x.baseVal.value + gold.width.baseVal.value) + "," +
            String(gold.y.baseVal.value + gold.height.baseVal.value)+ " " +

            String(gold.x.baseVal.value + gold.width.baseVal.value) + "," +
            String(gold.y.baseVal.value + alluvial_chart_yscale(alluvial_summer_gold_count/alluvial_total_count))+ " " +

            String(winter.x.baseVal.value                          ) + "," +
            String(winter.y.baseVal.value                           )+ " " +

            String(winter.x.baseVal.value                           ) + "," +
            String(winter.y.baseVal.value + alluvial_chart_yscale(alluvial_winter_gold_count/alluvial_total_count))

     ,"rgba(255,215,0,0.5)"]
 )

 //poligono que vai de prata para summer:
 r.push([String(silver.x.baseVal.value + silver.width.baseVal.value) + "," +
 String(silver.y.baseVal.value + alluvial_chart_yscale(alluvial_summer_silver_count/alluvial_total_count))+ " " +

 String(silver.x.baseVal.value + silver.width.baseVal.value) + "," +
 String(silver.y.baseVal.value)+ " " +

 String(summer.x.baseVal.value                          ) + "," +
 String(summer.y.baseVal.value+ alluvial_chart_yscale(alluvial_summer_gold_count/alluvial_total_count))+ " " +

 String(summer.x.baseVal.value                           ) + "," +
 String(summer.y.baseVal.value + alluvial_chart_yscale((alluvial_summer_gold_count+alluvial_summer_silver_count)/alluvial_total_count))

,"rgba(211,211,211,0.7)"]
)

  //poligono que vai do prata para o winter:
  r.push([String(silver.x.baseVal.value + silver.width.baseVal.value) + "," +
  String(silver.y.baseVal.value + silver.height.baseVal.value)+ " " +

  String(silver.x.baseVal.value + silver.width.baseVal.value) + "," +
  String(silver.y.baseVal.value + alluvial_chart_yscale(alluvial_summer_silver_count/alluvial_total_count))+ " " +

  String(winter.x.baseVal.value                          ) + "," +
  String(winter.y.baseVal.value + alluvial_chart_yscale(alluvial_winter_gold_count/alluvial_total_count))+ " " +

  String(winter.x.baseVal.value                           ) + "," +
  String(winter.y.baseVal.value + alluvial_chart_yscale((alluvial_winter_gold_count + alluvial_winter_silver_count)/alluvial_total_count))

,"rgba(211,211,211,0.7)"]
)

 //poligono que vai de bronze para summer:
 r.push([String(bronze.x.baseVal.value + bronze.width.baseVal.value) + "," +
 String(bronze.y.baseVal.value + alluvial_chart_yscale(alluvial_summer_bronze_count/alluvial_total_count))+ " " +

 String(bronze.x.baseVal.value + bronze.width.baseVal.value) + "," +
 String(bronze.y.baseVal.value)+ " " +

 String(summer.x.baseVal.value                          ) + "," +
 String(summer.y.baseVal.value+ alluvial_chart_yscale((alluvial_summer_gold_count + alluvial_summer_silver_count)/alluvial_total_count))+ " " +

 String(summer.x.baseVal.value                           ) + "," +
 String(summer.y.baseVal.value + alluvial_chart_yscale((alluvial_summer_gold_count+alluvial_summer_silver_count + alluvial_summer_bronze_count)/alluvial_total_count))

,"rgba(205,127,50,0.5)"]
)


  //poligono que vai do bronze para o winter:
  r.push([String(bronze.x.baseVal.value + bronze.width.baseVal.value) + "," +
  String(bronze.y.baseVal.value + bronze.height.baseVal.value)+ " " +

  String(bronze.x.baseVal.value + bronze.width.baseVal.value) + "," +
  String(bronze.y.baseVal.value + alluvial_chart_yscale(alluvial_summer_bronze_count/alluvial_total_count))+ " " +

  String(winter.x.baseVal.value                          ) + "," +
  String(winter.y.baseVal.value + alluvial_chart_yscale((alluvial_winter_gold_count + alluvial_winter_silver_count)/alluvial_total_count))+ " " +

  String(winter.x.baseVal.value                           ) + "," +
  String(winter.y.baseVal.value + alluvial_chart_yscale((alluvial_winter_gold_count + alluvial_winter_silver_count+ alluvial_winter_bronze_count)/alluvial_total_count))

,"rgba(205,127,50,0.5)"]
)

 //poligono que vai do summer_gold para individual:


r.push( [String(summer.x.baseVal.value + summer.width.baseVal.value) + "," +
String(summer.y.baseVal.value + alluvial_chart_yscale(alluvial_ind_summer_gold_count/alluvial_total_count))+ " " +

String(summer.x.baseVal.value + summer.width.baseVal.value) + "," +
String(summer.y.baseVal.value                            )+ " " +

String(ind.x.baseVal.value                          ) + "," +
String(ind.y.baseVal.value                           )+ " " +

String(ind.x.baseVal.value                           ) + "," +
String(ind.y.baseVal.value + alluvial_chart_yscale(alluvial_ind_summer_gold_count/alluvial_total_count))

 ,"rgba(255,215,0,0.5)"]
)

 //poligono que vai do summer_gold para team:


 r.push( [String(summer.x.baseVal.value + summer.width.baseVal.value) + "," +
 String(summer.y.baseVal.value + alluvial_chart_yscale(alluvial_summer_gold_count/alluvial_total_count))+ " " +
 
 String(summer.x.baseVal.value + summer.width.baseVal.value) + "," +
 String(summer.y.baseVal.value + alluvial_chart_yscale(alluvial_ind_summer_gold_count/alluvial_total_count))+ " " +
 
 String(team.x.baseVal.value                          ) + "," +
 String(team.y.baseVal.value                           )+ " " +
 
 String(team.x.baseVal.value                           ) + "," +
 String(team.y.baseVal.value + alluvial_chart_yscale(alluvial_team_summer_gold_count/alluvial_total_count))
 
  ,"rgba(255,215,0,0.5)"]
 )


  //poligono que vai do summer_silver para individual:


r.push( [String(summer.x.baseVal.value + summer.width.baseVal.value) + "," +
String(summer.y.baseVal.value + alluvial_chart_yscale((alluvial_summer_gold_count+alluvial_ind_summer_silver_count)/alluvial_total_count))+ " " +

String(summer.x.baseVal.value + summer.width.baseVal.value) + "," +
String(summer.y.baseVal.value + alluvial_chart_yscale(alluvial_summer_gold_count/alluvial_total_count))+ " " +

String(ind.x.baseVal.value                          ) + "," +
String(ind.y.baseVal.value + alluvial_chart_yscale((alluvial_ind_summer_gold_count+alluvial_ind_winter_gold_count)/alluvial_total_count))+ " " +

String(ind.x.baseVal.value                           ) + "," +
String(ind.y.baseVal.value + alluvial_chart_yscale((alluvial_ind_summer_gold_count+alluvial_ind_winter_gold_count+alluvial_ind_summer_silver_count)/alluvial_total_count))

 ,"rgba(211,211,211,0.7)"]
)

 //poligono que vai do summer_silver para team:


 r.push( [String(summer.x.baseVal.value + summer.width.baseVal.value) + "," +
 String(summer.y.baseVal.value + alluvial_chart_yscale((alluvial_summer_gold_count+alluvial_summer_silver_count)/alluvial_total_count))+ " " +
 
 String(summer.x.baseVal.value + summer.width.baseVal.value) + "," +
 String(summer.y.baseVal.value + alluvial_chart_yscale((alluvial_summer_gold_count+alluvial_ind_summer_silver_count)/alluvial_total_count))+ " " +
 
 String(ind.x.baseVal.value                          ) + "," +
 String(team.y.baseVal.value + alluvial_chart_yscale((alluvial_team_summer_gold_count+alluvial_team_winter_gold_count)/alluvial_total_count))+ " " +
 
 String(ind.x.baseVal.value                           ) + "," +
 String(team.y.baseVal.value + alluvial_chart_yscale((alluvial_team_summer_gold_count+alluvial_team_winter_gold_count+alluvial_team_summer_silver_count)/alluvial_total_count))
 
  ,"rgba(211,211,211,0.7)"]
 )


   //poligono que vai do summer_bronze para individual:


r.push( [String(summer.x.baseVal.value + summer.width.baseVal.value) + "," +
String(summer.y.baseVal.value + alluvial_chart_yscale((alluvial_summer_gold_count+alluvial_summer_silver_count+alluvial_ind_summer_bronze_count)/alluvial_total_count))+ " " +

String(summer.x.baseVal.value + summer.width.baseVal.value) + "," +
String(summer.y.baseVal.value + alluvial_chart_yscale((alluvial_summer_gold_count+alluvial_summer_silver_count)/alluvial_total_count))+ " " +

String(ind.x.baseVal.value                          ) + "," +
String(ind.y.baseVal.value + alluvial_chart_yscale((alluvial_ind_summer_gold_count+alluvial_ind_winter_gold_count+alluvial_ind_summer_silver_count+alluvial_ind_winter_silver_count)/alluvial_total_count))+ " " +

String(ind.x.baseVal.value                           ) + "," +
String(ind.y.baseVal.value + alluvial_chart_yscale((alluvial_ind_summer_gold_count+alluvial_ind_winter_gold_count+alluvial_ind_summer_silver_count+alluvial_ind_winter_silver_count+alluvial_ind_summer_bronze_count)/alluvial_total_count))

 ,"rgba(205,127,50,0.5)"]
)

 //poligono que vai do summer_bronze para team:


 r.push( [String(summer.x.baseVal.value + summer.width.baseVal.value) + "," +
 String(summer.y.baseVal.value + alluvial_chart_yscale((alluvial_summer_count)/alluvial_total_count))+ " " +
 
 String(summer.x.baseVal.value + summer.width.baseVal.value) + "," +
 String(summer.y.baseVal.value + alluvial_chart_yscale((alluvial_summer_gold_count+alluvial_summer_silver_count+alluvial_ind_summer_bronze_count)/alluvial_total_count))+ " " +
 
 String(ind.x.baseVal.value                          ) + "," +
 String(team.y.baseVal.value + alluvial_chart_yscale((alluvial_team_summer_gold_count+alluvial_team_winter_gold_count+alluvial_team_summer_silver_count+alluvial_team_winter_silver_count)/alluvial_total_count))+ " " +
 
 String(ind.x.baseVal.value                           ) + "," +
 String(team.y.baseVal.value + alluvial_chart_yscale((alluvial_team_summer_gold_count+alluvial_team_winter_gold_count+alluvial_team_summer_silver_count+alluvial_team_winter_silver_count+alluvial_team_summer_bronze_count)/alluvial_total_count))
 
  ,"rgba(205,127,50,0.5)"]
 )
//#####################################################################################################################################

 //poligono que vai do winter_gold para individual:


 r.push( [String(winter.x.baseVal.value + winter.width.baseVal.value) + "," +
 String(winter.y.baseVal.value + alluvial_chart_yscale(alluvial_ind_winter_gold_count/alluvial_total_count))+ " " +
 
 String(winter.x.baseVal.value + winter.width.baseVal.value) + "," +
 String(winter.y.baseVal.value                            )+ " " +
 
 String(ind.x.baseVal.value                          ) + "," +
 String(ind.y.baseVal.value + alluvial_chart_yscale(alluvial_ind_summer_gold_count/alluvial_total_count))+ " " +
 
 String(ind.x.baseVal.value                           ) + "," +
 String(ind.y.baseVal.value + alluvial_chart_yscale((alluvial_ind_summer_gold_count+alluvial_ind_winter_gold_count)/alluvial_total_count))
 
  ,"rgba(255,215,0,0.5)"]
 )
 
  //poligono que vai do winter_gold para team:
 
 
  r.push( [String(winter.x.baseVal.value + winter.width.baseVal.value) + "," +
  String(winter.y.baseVal.value + alluvial_chart_yscale(alluvial_winter_gold_count/alluvial_total_count))+ " " +
  
  String(winter.x.baseVal.value + winter.width.baseVal.value) + "," +
  String(winter.y.baseVal.value + alluvial_chart_yscale(alluvial_ind_winter_gold_count/alluvial_total_count))+ " " +
  
  String(team.x.baseVal.value                          ) + "," +
  String(team.y.baseVal.value + alluvial_chart_yscale(alluvial_team_summer_gold_count/alluvial_total_count))+ " " +
  
  String(team.x.baseVal.value                           ) + "," +
  String(team.y.baseVal.value + alluvial_chart_yscale((alluvial_team_summer_gold_count+alluvial_team_winter_gold_count)/alluvial_total_count))
  
   ,"rgba(255,215,0,0.5)"]
  )
 
 
   //poligono que vai do winter_silver para individual:
 
 
 r.push( [String(winter.x.baseVal.value + winter.width.baseVal.value) + "," +
 String(winter.y.baseVal.value + alluvial_chart_yscale((alluvial_winter_gold_count+alluvial_ind_winter_silver_count)/alluvial_total_count))+ " " +
 
 String(winter.x.baseVal.value + winter.width.baseVal.value) + "," +
 String(winter.y.baseVal.value + alluvial_chart_yscale(alluvial_winter_gold_count/alluvial_total_count))+ " " +
 
 String(ind.x.baseVal.value                          ) + "," +
 String(ind.y.baseVal.value + alluvial_chart_yscale((alluvial_ind_summer_gold_count+alluvial_ind_winter_gold_count+alluvial_ind_summer_silver_count)/alluvial_total_count))+ " " +
 
 String(ind.x.baseVal.value                           ) + "," +
 String(ind.y.baseVal.value + alluvial_chart_yscale((alluvial_ind_summer_gold_count+alluvial_ind_winter_gold_count+alluvial_ind_summer_silver_count+alluvial_ind_winter_silver_count)/alluvial_total_count))
 
  ,"rgba(211,211,211,0.7)"]
 )
 
  //poligono que vai do winter_silver para team:
 
 
  r.push( [String(winter.x.baseVal.value + winter.width.baseVal.value) + "," +
  String(winter.y.baseVal.value + alluvial_chart_yscale((alluvial_winter_gold_count+alluvial_winter_silver_count)/alluvial_total_count))+ " " +
  
  String(winter.x.baseVal.value + winter.width.baseVal.value) + "," +
  String(winter.y.baseVal.value + alluvial_chart_yscale((alluvial_winter_gold_count+alluvial_ind_winter_silver_count)/alluvial_total_count))+ " " +
  
  String(ind.x.baseVal.value                          ) + "," +
  String(team.y.baseVal.value + alluvial_chart_yscale((alluvial_team_summer_gold_count+alluvial_team_winter_gold_count+alluvial_team_summer_silver_count)/alluvial_total_count))+ " " +
  
  String(ind.x.baseVal.value                           ) + "," +
  String(team.y.baseVal.value + alluvial_chart_yscale((alluvial_team_summer_gold_count+alluvial_team_winter_gold_count+alluvial_team_summer_silver_count+alluvial_team_winter_silver_count)/alluvial_total_count))
  
   ,"rgba(211,211,211,0.7)"]
  )
 
 
    //poligono que vai do winter_bronze para individual:
 
 
 r.push( [String(winter.x.baseVal.value + winter.width.baseVal.value) + "," +
 String(winter.y.baseVal.value + alluvial_chart_yscale((alluvial_winter_gold_count+alluvial_winter_silver_count+alluvial_ind_winter_bronze_count)/alluvial_total_count))+ " " +
 
 String(winter.x.baseVal.value + winter.width.baseVal.value) + "," +
 String(winter.y.baseVal.value + alluvial_chart_yscale((alluvial_winter_gold_count+alluvial_winter_silver_count)/alluvial_total_count))+ " " +
 
 String(ind.x.baseVal.value                          ) + "," +
 String(ind.y.baseVal.value + alluvial_chart_yscale((alluvial_ind_summer_gold_count+alluvial_ind_winter_gold_count+alluvial_ind_summer_silver_count+alluvial_ind_winter_silver_count+alluvial_ind_summer_bronze_count)/alluvial_total_count))+ " " +
 
 String(ind.x.baseVal.value                           ) + "," +
 String(ind.y.baseVal.value + alluvial_chart_yscale((alluvial_ind_summer_gold_count+alluvial_ind_winter_gold_count+alluvial_ind_summer_silver_count+alluvial_ind_winter_silver_count+alluvial_ind_summer_bronze_count+alluvial_ind_winter_bronze_count)/alluvial_total_count))
 
  ,"rgba(205,127,50,0.5)"]
 )
 
  //poligono que vai do winter_bronze para team:
 
 
  r.push( [String(winter.x.baseVal.value + winter.width.baseVal.value) + "," +
  String(winter.y.baseVal.value + alluvial_chart_yscale((alluvial_winter_count)/alluvial_total_count))+ " " +
  
  String(winter.x.baseVal.value + winter.width.baseVal.value) + "," +
  String(winter.y.baseVal.value + alluvial_chart_yscale((alluvial_winter_gold_count+alluvial_winter_silver_count+alluvial_ind_winter_bronze_count)/alluvial_total_count))+ " " +
  
  String(ind.x.baseVal.value                          ) + "," +
  String(team.y.baseVal.value + alluvial_chart_yscale((alluvial_team_summer_gold_count+alluvial_team_winter_gold_count+alluvial_team_summer_silver_count+alluvial_team_winter_silver_count+alluvial_team_summer_bronze_count)/alluvial_total_count))+ " " +
  
  String(ind.x.baseVal.value                           ) + "," +
  String(team.y.baseVal.value + alluvial_chart_yscale((alluvial_team_summer_gold_count+alluvial_team_winter_gold_count+alluvial_team_summer_silver_count+alluvial_team_winter_silver_count+alluvial_team_summer_bronze_count+alluvial_team_winter_bronze_count)/alluvial_total_count))
  
   ,"rgba(205,127,50,0.5)"]
  )


return r

    ;}

  poligono_1 = build_polygon_data_1()

  svg_alluvial_chart.selectAll("polygon")
                    .data(poligono_1)
                    .join("polygon")
                    .transition()
                    .duration(300)
                    .attr("points", d => d[0])
                    .attr("fill", d => d[1])



  }

function update_box_plots(){

if (dataset_alluvial.length == 0){
	svg_box_plots.append("text")
				.attr("id", "box_plot_error")
                .attr("dy", "1em")
                .attr("x", 8)
                .attr("y", 105)
                .attr("class", "label")
                .attr("font-family", "verdana")
                .attr("font-size","20px")
                .attr("font-weight","bold")
                .attr("fill","red")
                .text("There is no data to show");

}
else{
	d3.select("#box_plot_error").remove();
    };
//gerar dados:

heights = dataset_box_plots.map(d => d.Height).sort()
weights = dataset_box_plots.map(d => d.Weight).sort()
BMIs = dataset_box_plots.map(d => d.BMI.replace(",", ".")).sort()


//quantis das alturas:

height_min = d3.quantile(heights,0)
height_1   = d3.quantile(heights,0.25)
height_2   = d3.quantile(heights,0.5)
height_3   = d3.quantile(heights,0.75)
height_max = d3.quantile(heights,1)
height_med = d3.mean(heights)

//quantis dos pesos:

weight_min = d3.quantile(weights,0)
weight_1   = d3.quantile(weights,0.25)
weight_2   = d3.quantile(weights,0.5)
weight_3   = d3.quantile(weights,0.75)
weight_max = d3.quantile(weights,1)
weight_med = d3.mean(weights)

//quantis dos bmis:

BMI_min = d3.quantile(BMIs,0)
BMI_1   = d3.quantile(BMIs,0.25)
BMI_2   = d3.quantile(BMIs,0.5)
BMI_3   = d3.quantile(BMIs,0.75)
BMI_max = d3.quantile(BMIs,1)
BMI_med = d3.mean(BMIs)


  //a partir daqui são as scales
box_plots_xscale_heights = d3 
.scaleLinear()
.domain([height_min,height_max] )
.range([30,box_plots_width-30] );

box_plots_xscale_weights = d3 
.scaleLinear()
.domain([weight_min,weight_max] )
.range([30,box_plots_width-30] );

box_plots_xscale_BMIs = d3 
.scaleLinear()
.domain([BMI_min,BMI_max] )
.range([30,box_plots_width-30] );


box_plots_yscale = d3
.scaleLinear()
.domain([0,100] )
.range([30,box_plots_height-30]);

//gerar os box plots:
var Gen = d3.line();

svg_box_plots.select("#box_plot_height_rect")
               .transition()
               .duration(300)
               .attr("width", function (d) {
                                          if(height_1 == undefined) {return 0}
                                          else{
                                          return box_plots_xscale_heights(height_3) - box_plots_xscale_heights(height_1)} ;})

               .attr("x", function (d) {if(height_1 == undefined) {return 0}
               else{return box_plots_xscale_heights(height_1)} ;} )


  var points = [  
                [box_plots_xscale_heights(height_2), box_plots_yscale(10)],  
                 
                [box_plots_xscale_heights(height_2), box_plots_yscale(10) + 40]
                ]; 
   var pathOfLine = Gen(points); 

   svg_box_plots.select("#box_plots_height_median_line")
                .transition()
                .duration(300)
                .attr('d', pathOfLine)


  var points = [  
                  [box_plots_xscale_heights(height_med), box_plots_yscale(10)],  
                   
                  [box_plots_xscale_heights(height_med), box_plots_yscale(10) + 40]
                  ]; 
     var pathOfLine = Gen(points); 
     
     svg_box_plots.select("#box_plots_height_mean_line")
                  .transition()
                  .duration(300)
                  .attr('d', pathOfLine)


svg_box_plots.select("#box_plot_axis_height").remove()

box_plots_xaxis_height = d3
.axisBottom() 
.scale(box_plots_xscale_heights) 
.ticks(5)

svg_box_plots.append("g") 
.attr("transform", "translate(0,95)")
.attr("class", "xaxis")
.attr("id","box_plot_axis_height")
.call(box_plots_xaxis_height)

//###############################################################################################################################3
  //pesos:



  svg_box_plots.select("#box_plot_weight_rect")
               .transition()
               .duration(300)
               .attr("width", function (d) {
                if(weight_1 == undefined) {return 0}
                else{return box_plots_xscale_weights(weight_3) - box_plots_xscale_weights(weight_1)} ;})
               .attr("x", function (d) {
                if(weight_1 == undefined) {return 0}
                else{return box_plots_xscale_weights(weight_1)} ;} )

  var points = [  
                [box_plots_xscale_weights(weight_2), box_plots_yscale(50)],  
                 
                [box_plots_xscale_weights(weight_2), box_plots_yscale(50) + 40]
                ]; 

  var pathOfLine = Gen(points); 
  
  svg_box_plots.select("#box_plots_weight_median_line")
                .transition()
                .duration(300)
                .attr('d', pathOfLine)


  var points = [  
                  [box_plots_xscale_weights(weight_med), box_plots_yscale(50)],  
                   
                  [box_plots_xscale_weights(weight_med), box_plots_yscale(50) + 40]
                  ]; 
     var pathOfLine = Gen(points); 
     
     svg_box_plots.select("#box_plots_weight_mean_line")
                  .transition()
                  .duration(300)
                  .attr('d', pathOfLine)

svg_box_plots.select("#box_plot_axis_weight").remove()

//vamos fazer um eixo:
box_plots_xaxis_weight = d3
.axisBottom() 
.scale(box_plots_xscale_weights) 
.ticks(5)

svg_box_plots.append("g") 
.attr("transform", "translate(0,191)")
.attr("class", "xaxis")
.attr("id","box_plot_axis_weight")
.call(box_plots_xaxis_weight)


//###############################################################################################################################3
  //BMI:


  svg_box_plots.select("#box_plot_BMI_rect")
               .transition()
               .duration(300)
               .attr("width", function (d) {
                if(BMI_1 == undefined) {return 0}
                else{return box_plots_xscale_BMIs(BMI_3) - box_plots_xscale_BMIs(BMI_1)} ;})
               .attr("x", function (d) {
                if(BMI_1 == undefined) {return 0}
                else{return box_plots_xscale_BMIs(BMI_1)} ;} )

  var points = [  
                [box_plots_xscale_BMIs(BMI_2), box_plots_yscale(87)],  
                 
                [box_plots_xscale_BMIs(BMI_2), box_plots_yscale(87) + 40]
                ]; 

  var pathOfLine = Gen(points); 
  
  svg_box_plots.select("#box_plots_BMI_median_line")
                .transition()
                .duration(300)
                .attr('d', pathOfLine)


  var points = [  
                  [box_plots_xscale_BMIs(BMI_med), box_plots_yscale(87)],  
                   
                  [box_plots_xscale_BMIs(BMI_med), box_plots_yscale(87) + 40]
                  ]; 
     var pathOfLine = Gen(points); 
     
     svg_box_plots.select("#box_plots_BMI_mean_line")
                  .transition()
                  .duration(300)
                  .attr('d', pathOfLine)

svg_box_plots.select("#box_plot_axis_BMI").remove()

//vamos fazer um eixo:
box_plots_xaxis_BMI = d3
.axisBottom() 
.scale(box_plots_xscale_BMIs) 
.ticks(5)

svg_box_plots.append("g") 
.attr("transform", "translate(0,280)")
.attr("class", "xaxis") 
.attr("id","box_plot_axis_BMI")
.call(box_plots_xaxis_BMI)


}

function update_max_events(){

  //calcular os eventos maximais para o estado atual:
 var max_events_aux2 = d3.rollup(dataset_max_events, d => d.length, d => d.Event);

max_events_aux = []
max_events_aux.push(["No event", 0])
max_events_aux.push(["No event", 0])
max_events_aux.push(["No event", 0])
for (i in Array.from(max_events_aux2.keys())){
    let event_aux = Array.from(max_events_aux2.keys())[i]
  if(max_events_aux2.get(event_aux) > 0){
    max_events_aux.push([event_aux, max_events_aux2.get(event_aux)])
  }
  
}
  
  //agora colocamos por ordem:
  max_events_aux = max_events_aux.sort(function(a, b){return b[1]-a[1];})

 if (max_events_aux.length == 3){
  svg_max_events.append("text")
        .attr("id", "max_events_error")
                .attr("dy", "1em")
                .attr("x", 40)
                .attr("y", 30)
                .attr("class", "label")
                .attr("font-family", "verdana")
                .attr("font-size","20px")
                .attr("font-weight","bold")
                .attr("fill","red")
                .text("There is no data to show");

}
else{
  d3.select("#max_events_error").remove();
    };
    
 
//fazer o pódio:
const width_podio = 60
const height_1 = 100
const x_1 = 140

const height_2 = 70
const x_2 = 50

const height_3 = 40
const x_3 = 230
  
  //número 1:################################################################################################################
  var text_aux   = max_events_aux[0][0].split(" ");
  var text_aux_1 = text_aux.slice(0,Math.ceil(text_aux.length/2)).join(" ");
  var text_aux_2 = text_aux.slice(Math.ceil(text_aux.length/2)).join(" ");

  svg_max_events.select("text#max_events_1_1")
              .transition()
              .duration(500)
              .attr("x",x_1 + width_podio/2  - BrowserText.getWidth(text_aux_1, 12, "verdana")/2)
              .text(text_aux_1);

svg_max_events.select("text#max_events_1_2")
              .transition()
              .duration(500)
              .attr("x",x_1 + width_podio/2  - BrowserText.getWidth(text_aux_2, 12, "verdana")/2)
              .text(text_aux_2);
  
  //número 2:################################################################################################################
  
  var text_aux   = max_events_aux[1][0].split(" ");
  var text_aux_1 = text_aux.slice(0,Math.ceil(text_aux.length/2)).join(" ");
  var text_aux_2 = text_aux.slice(Math.ceil(text_aux.length/2)).join(" ");
  
  svg_max_events.select("text#max_events_2_1")
                .transition()
                .duration(500)
                .attr("x",x_2 + width_podio/2  - BrowserText.getWidth(text_aux_1, 12, "verdana")/2)
                .text(text_aux_1);
  
  svg_max_events.select("text#max_events_2_2")
                .transition()
                .duration(500)
                .attr("x",x_2 + width_podio/2  - BrowserText.getWidth(text_aux_2, 12, "verdana")/2)
                .text(text_aux_2);
          
  
  //número 3:################################################################################################################
  var text_aux   = max_events_aux[2][0].split(" ");
  var text_aux_1 = text_aux.slice(0,Math.ceil(text_aux.length/2)).join(" ");
  var text_aux_2 = text_aux.slice(Math.ceil(text_aux.length/2)).join(" ");
  
  svg_max_events.select("text#max_events_3_1")
                .transition()
                .duration(500)
                .attr("x",x_3 + width_podio/2  - BrowserText.getWidth(text_aux_1, 12, "verdana")/2)
                .text(text_aux_1);
  
  svg_max_events.select("text#max_events_3_2")
                .transition()
                .duration(500)
                .attr("x",x_3 + width_podio/2  - BrowserText.getWidth(text_aux_2, 12, "verdana")/2)
                .text(text_aux_2);
  }

function update_events_list(bol){

	if (dataset_max_events.length == 0){
	svg_events_list.append("text")
				.attr("id", "events_error")
                .attr("dy", "1em")
                .attr("x", 50)
                .attr("y", 20)
                .attr("class", "label")
                .attr("font-family", "verdana")
                .attr("font-size","20px")
                .attr("font-weight","bold")
                .attr("fill","red")
                .text("There is no data to show");

}
else{
	d3.select("#events_error").remove();
    };


  var events_list_aux2 = d3.rollup(dataset_max_events, d => d.length, d => d.Event);

  events_list_aux = []
  for (i in Array.from(events_list_aux2.keys())){
      let ev_aux = Array.from(events_list_aux2.keys())[i]
      events_list_aux.push([ev_aux, events_list_aux2.get(ev_aux)])
    
    
  }
  
  
  
  //agora colocamos por ordem:
  
  events_list_aux = events_list_aux.sort()
  var events_list_aux_events = events_list_aux.map(d => d[0])

//#############################################################################################################################

var tooltip_events_list = d3.select("body")
.append("div")
.style("position", "absolute")
.style("z-index", "10")
.style("visibility", "hidden")
.style("font-family", "verdana")
.style("background","rgba(210,210,210,0.9)")
.style("padding", "3px");

svg_events_list.select("#events_list_g")
            .on("mousewheel.zoom",function(){tooltip_events_list.remove()
                                            dispatch.call("events_list_scroll",this,event);
                                            update_events_list(false)})


if(bol){events_list_scroll_count = 0}
var j = 0
for (i in events_list_permanent){

  svg_events_list.select("#events_list_rect_" + String(i))
                .attr("y", function (d) {return  20*(j-events_list_scroll_count)})
                .attr("fill",function()
                        {if(!events_list_aux_events.includes(events_list_permanent[i][0])){return "rgba(220,220,220,0)"}
                        else if (selected_events.includes(events_list_permanent[i][0])&&selected_events.length!=events.length){return "rbga(180,180,180,0.5)"}
                        else {return "rgba(240,240,240,1)"}
                        
                        })
                 .on("mouseover",function(event,d){
                          tooltip_events_list.style("visibility", "visible")
                            .style("top", (event.pageY-10)+"px")
                             .style("left",(event.pageX+10)+"px")
                             .html("Event: " + events_list_aux[this.y.baseVal.value/20 + events_list_scroll_count][0] + "<br/>" + "Number of Medals: " +events_list_aux[this.y.baseVal.value/20 + events_list_scroll_count][1])})
                            //.html(events_list_permanent[this.id.slice(17)][0] +"<br>" + events_list_permanent[this.id.slice(17)][1] )})
                 .on("mouseout",function(){tooltip_events_list.style("visibility", "hidden");})
                 .on("click",function(){tooltip_events_list.remove()
                  dispatch.call("events_list_click",this)
                                        update_dataset();
                                        update_line_from_pyramid();
                                        update_pyramid_from_line();
                                        update_cmap_from_others();
                                        update_alluvial_chart();
                                        update_box_plots();
                                        update_events_list(false);
                                        update_sports_grid();})

  svg_events_list.select("#events_list_text_" + String(i))
                .attr("y",20*(j-events_list_scroll_count) + 2)
                .attr("fill",function()
                        {if(!events_list_aux_events.includes(events_list_permanent[i][0])){return "rgba(220,220,220,0)"}
                        else if (selected_events.includes(events_list_permanent[i][0])&&selected_events.length!=events.length){return "white"}
                        else {return "black"}
                        
                        })
                .on("mouseover",function(event,d){
                          tooltip_events_list.style("visibility", "visible")
                            .style("top", (event.pageY-10)+"px")
                             .style("left",(event.pageX+10)+"px")
                             .html("Event: " + events_list_aux[this.y.baseVal.value/20 + events_list_scroll_count][0] + "<br/>" + "Number of Medals: " +events_list_aux[this.y.baseVal.value/20 + events_list_scroll_count][1])})
                            //.html(events_list_permanent[this.id.slice(17)][0] +"<br>" + events_list_permanent[this.id.slice(17)][1] )})
                 .on("mouseout",function(){tooltip_events_list.style("visibility", "hidden");})
                 .on("click",function(){tooltip_events_list.remove()
                  dispatch.call("events_list_click",this)
                                        update_dataset();
                                        update_line_from_pyramid();
                                        update_pyramid_from_line();
                                        update_cmap_from_others();
                                        update_alluvial_chart();
                                        update_box_plots();
                                        update_events_list(false);
                                        update_sports_grid();})

;
if(events_list_aux_events.includes(events_list_permanent[i][0])){j=j+1}

}

box_plots_yscale = d3
.scaleLinear()
.domain([0,events_list_aux.length] )
.range([0,events_list_height]);

svg_events_list.select("#events_list_scroll_bar")
               .transition()
                .attr("height", (11/events_list_aux.length)*events_list_height)//box_plots_yscale(11)) 
                .attr("y", function (d) {return  box_plots_yscale(events_list_scroll_count)})

}

function update_sports_grid(){


	if (dataset_sports.length == 0){
	svg_sports_grid.append("text")
				.attr("id", "sports_error")
                .attr("dy", "1em")
                .attr("x", 50)
                .attr("y", 40)
                .attr("class", "label")
                .attr("font-family", "verdana")
                .attr("font-size","20px")
                .attr("font-weight","bold")
                .attr("fill","red")
                .text("There is no data to show");

}
else{
	d3.select("#sports_error").remove();
    };


	var convert_sport_name = {}
    for (i in sports){
    	convert_sport_name[remove_spaces_names(sports[i])] = sports[i]
    }

var tooltip_sports = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("font-family", "verdana")
    .style("background","rgba(210,210,210,0.9)")
    .style("padding", "3px");

	svg_sports_grid.selectAll('.cell_color').remove();
	svg_sports_grid.selectAll('.cell_image').remove();
	svg_sports_grid.selectAll('.cell_border').remove();
	 
	let data_sports_aux = d3.rollup(dataset_sports, d => d.length, d => d.Sport);
	var data_grid = []
		for (i in Array.from(data_sports_aux.keys())){
		    let sports_aux = Array.from(data_sports_aux.keys())[i]
		  if(data_sports_aux.get(sports_aux) > 0){
		    data_grid.push([sports_aux, data_sports_aux.get(sports_aux)])
		  }
		  
		}
	var relevant_sports;
	relevant_sports = Array.from(data_sports_aux.keys())	

	number_columns = Math.ceil(Math.sqrt(relevant_sports.length))

    remainder = relevant_sports.length%number_columns 
    number_rows = Math.ceil(relevant_sports.length/number_columns)

    let rect_x = 385/number_columns; //dimensoes dos retangulos
	let rect_y = 290/number_rows;

	
data_grid = data_grid.sort(function(a, b){return b[1]-a[1];})

 svg_sports_grid.selectAll(".cell_color")
			.data(d => data_grid)
	        .enter()
	        .append("rect")
	        .attr("id", d => "color"+ remove_spaces_names(d[0]))
	        .attr("width", rect_x)
		    .attr("height", rect_y)
		    .attr("x", (d,i) => position_in_grid(i,number_rows, number_columns)[0]*rect_x)
		    .attr("y", (d,i) => position_in_grid(i,number_rows, number_columns)[1]*rect_y)
		    .attr("transform", "translate(0,30)")
		    .attr("fill", d => "white")
		    .style("opacity", 0.4)
	        .attr("class", "cell_color")


	    svg_sports_grid.selectAll(".cell_image")
			.data(d => data_grid)
	        .enter()
	        .append('svg:image')
			.attr("xlink:href", function(d) {
				return "sports_icons/" + d[0] + ".png"})
	        .attr("id", d => "image"+ remove_spaces_names(d[0]))
	        .attr("width", rect_x)
		    .attr("height", rect_y)
		    .attr("x", (d,i) => position_in_grid(i,number_rows, number_columns)[0]*rect_x)
		    .attr("y", (d,i) => position_in_grid(i,number_rows, number_columns)[1]*rect_y)
		    .attr("transform", "translate(0,30)")
	        .attr("class", "cell_image");


	    svg_sports_grid.selectAll(".cell_border")
			.data(d => data_grid)
	        .enter()
	        .append('rect')
	        .attr("id", d => "border"+ remove_spaces_names(d[0]))
	        .attr("width", rect_x)
		    .attr("height", rect_y)
		    .attr("x", (d,i) => position_in_grid(i,number_rows, number_columns)[0]*rect_x)
		    .attr("y", (d,i) => position_in_grid(i,number_rows, number_columns)[1]*rect_y)
		    .attr("transform", "translate(0,30)")
	        .attr("class", "cell_border")
	        .attr("fill", "transparent")
	        .attr("stroke", "black")
	        .attr("stroke-width", (d) => {  if(selected_sports.includes(d[0]) && selected_sports != sports) { return 4} else {return 1}   });


	         svg_sports_grid.selectAll(".cell_border")

	    	.on('mousemove', function (d) {
	    			d3.select("#"+d.srcElement.id)
    			  .attr("stroke-width", 4);



		    	return tooltip_sports.style("visibility", "visible")
						  .style("top", (event.pageY-10)+"px")
						  .style("left",(event.pageX+10)+"px")
						  .html("Sport: " + convert_sport_name[d.srcElement.id.slice(6)] + "<br/>" + "Number of medals: " + data_sports_aux.get(convert_sport_name[d.srcElement.id.slice(6)]));
	    	
	    		
	      })

	         .on('mouseout', function (d) { 
	         	d3.select("#"+d.srcElement.id)
    			  .attr("stroke-width", 1);

    		if (selected_sports != sports && selected_sports.includes(convert_sport_name[d.srcElement.id.slice(6)])){
    			d3.select("#"+d.srcElement.id)
    			  .attr("stroke-width", 4);
    		}

    		else{
    			if (selected_sports == sports){
    				d3.select("#"+d.srcElement.id)
    			       .attr("stroke-width", 1);
    			}
    			


    		}

	         	tooltip_sports.style("visibility", "hidden");

	         	})
				       
	     
	    .on('click', function (d) {

	    	selected_sport = convert_sport_name[d.srcElement.id.slice(6)];
	
	    dispatch.call("select_sport", this);  
    			update_dataset();
	    		update_line_from_pyramid();
	   			update_pyramid_from_cmap();
	            update_cmap_from_others();
	            update_alluvial_chart();
	            update_box_plots();
	            update_max_events();
	            update_events_list(true);


	    })
	        

}
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//                                                                                                LER DATASET
//===========================================================================================================

Promise.all([
d3.dsv(";", "IOC_Alpha3_Name.csv"), //Dataset com nomes dos países e 3-letter code
d3.dsv(";", "where_olympics_were_held.csv"), //Dataset com informação acerca dos host countries e seasons nas quais foram host countries
d3.dsv(';',"olympic_events.csv"),  //Full dataset
d3.json("cmap.json")
  ]).then(([ioc, host, ev, choro_map]) => {
//guardar informação do primeiro dataset
ioc.forEach(function(d){ countries_codes[d.Alpha_3] = d.IOC });
ioc.forEach(function(d){ countries_ioc_name[d.IOC] = d.Name + " (" + d.IOC + ") "})

//guardar informação do segundo dataset
country_years_dataset = host

  for (i in country_years_dataset) {
    if (country_years_dataset[i].summer_years != undefined){
    country_years_dataset[i].summer_years = country_years_dataset[i].summer_years.split(",")
  }
    if (country_years_dataset[i].winter_years != undefined){
    country_years_dataset[i].winter_years = country_years_dataset[i].winter_years.split(",")
  }
  };

//guardar informação do terceiro dataset

  full_dataset = ev; // isto é o dataset todo
  dataset = full_dataset; // isto vai ser a variavel fundamental do nosso projeto, todos os idiomas mudam esta variavel, contem a informação
  //sobre "que parte do dataset é que está selecionado". todos os idiomas vão apenas mostrar este dataset (ou parte dele)
  dataset_line = full_dataset;
  dataset_cmap = full_dataset;

  dataset_aux = full_dataset.filter(d => d.Medal != "NA");

  dataset_pyramid = dataset_aux;
  dataset_alluvial = dataset_aux;
  dataset_box_plots = dataset_aux;
  dataset_max_events = dataset_aux;
  dataset_sports = dataset_aux;

  //guardar informação do quarto dataset
  map_countries = choro_map //informação sobre a localização e id dos países
  
  countries = Array.from(d3.group(full_dataset,d => d.NOC).keys()).sort(); //guardar todas as nacionalidades NOC
  selected_countries = countries;
  unselected_countries_line = [];
  unselected_countries_cmap = [];
  countries_2_view = countries; 

 
  years = Array.from(d3.group(full_dataset,d => d.Year).keys()).sort(); //guardar todos os anos que houve jogos
  selected_years = years;


  seasons = Array.from(d3.group(full_dataset,d => d.Season).keys());
  selected_seasons = seasons;

  medal_types = Array.from(d3.group(full_dataset,d => d.Medal).keys());
  selected_medal_types = medal_types;


  event_types = Array.from(d3.group(full_dataset,d => d.Event_Type).keys());
  selected_event_types = event_types;

  events = Array.from(d3.group(full_dataset,d => d.Event).keys()).sort();
  selected_events = events;

  sports = Array.from(d3.group(full_dataset,d => d.Sport).keys());
  selected_sports = sports;

  height_max = d3.max(full_dataset.map(d => d.Height));
  height_min = d3.min(full_dataset.map(d => d.Height));
  selected_height_max = height_max;
  selected_height_min = height_min;

  weight_max = d3.max(full_dataset.map(d => d.Weight));
  weight_min = d3.min(full_dataset.map(d => d.Weight));
  selected_weight_max = weight_max;
  selected_weight_min = weight_min;

  BMI_max = parseInt(d3.max(full_dataset.map(d => d.BMI)));
  BMI_min = parseInt(d3.min(full_dataset.map(d => d.BMI)));
  selected_BMI_max = BMI_max;
  selected_BMI_min = BMI_min;

  //gerar os idiomas
  generate_population_pyramid();
  generate_line_chart();
  generate_cmap();
  generate_alluvial_chart();
  generate_box_plots();
  generate_max_events();
  generate_events_list();
  generate_sports_grid();
  generate_buttonReset();
  represent_countries_in_map(countries);

bars = d3.selectAll("rect").filter(function(d){
if (d != undefined)  {
return d[2] == "M" || d[2] == "F"  }}).nodes();
selected_bars = bars;



  });






//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//                                                                                              GERAR IDIOMAS
//===========================================================================================================
//Population Pyramid
function generate_population_pyramid(){ 

    population_pyramid_age_interval = 3 //intervalo para as barras

    //ydata tem a informação de em que barra está cada elemento.
   
    ydata_pyramid = dataset_pyramid.map(function(d){return Math.floor(d.Age/population_pyramid_age_interval) } ) ; //dividir a idade pelo intervalo

    ydata_pyramid = ydata_pyramid.filter(unique)
    ydata_pyramid = ydata_pyramid.sort(function(a, b){return a-b})
    ydata_pyramid = ydata_pyramid.slice(1,ydata_pyramid.length) //tirar as idades que são "-1"



    ydata_pyramid_F = ydata_pyramid.map(  function( d ){return [d, dataset_pyramid.filter( function(data){return data.Sex == "F" && Math.floor(data.Age/population_pyramid_age_interval)==d;} ).length, "F" ];}  );
    ydata_pyramid_M = ydata_pyramid.map(  function( d ){return [d, dataset_pyramid.filter( function(data){return data.Sex == "M" && Math.floor(data.Age/population_pyramid_age_interval)==d;} ).length, "M" ];}  );
    ydata_pyramid_MF= ydata_pyramid.map(  function( d ){return [d, 0, "MF" ];}  );


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Scales
    const max_value = d3.max([  Math.max.apply(Math,ydata_pyramid_M.map(d => d[1])) ,  Math.max.apply(Math,ydata_pyramid_F.map(d => d[1])) ]);

    const min_value = d3.min([  Math.min.apply(Math,ydata_pyramid_M.map(d => d[1])) ,  Math.min.apply(Math,ydata_pyramid_F.map(d => d[1])) ]);



    population_pyramid_xscale = d3 //esta é a escala onde vamos fazer as barras
    .scaleLinear()
    .domain([min_value,max_value] )
    .range([0, (population_pyramid_width-50)/2 - population_pyramid_padding] );

    population_pyramid_xscale_invert = d3 
    .scaleLinear()
    .domain([min_value,max_value] )
    .range([(population_pyramid_width-50)/2 ,  population_pyramid_padding]);

    population_pyramid_yscale = d3
    .scaleBand()
    .domain(ydata_pyramid_MF.map(d => d[0]) )
    .range([population_pyramid_padding + 50, population_pyramid_height - population_pyramid_padding]);




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//tooltip
var tooltip_population_pyramid = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("font-family", "verdana")
    .style("background","rgba(210,210,210,0.9)")
    .style("padding", "3px");


//vamos agora fazer as barras da esquerda referentes aos homens:

    svg_pyramid_M = d3
    .select("#population_pyramid")
    .append("svg") 
    .attr("width", (population_pyramid_width-50)/2)
    .attr("height", population_pyramid_height);

    svg_pyramid_M.append("text")
                 .attr("x",20)
                 .attr("y",0)
                 .attr("dy", "1em")
                 .attr("class", "label")
                 .attr("font-family", "verdana")
                 .attr("font-size","18px")
                 .attr("font-weight","bold")
                 .attr("id","population_pyramid_title")
                 .text("Medalists")


    svg_pyramid_M
    .selectAll("rect")
    .data(ydata_pyramid_M)
    .join("rect") 
    .attr("id", function(d) {return String(d[0])  + "M" } ) //colocar id
    .attr("width", function (d) {return population_pyramid_xscale(d[1]) ;}) 
    .attr("height", population_pyramid_yscale.bandwidth()) // fit to our scale
    .attr("fill", "CornflowerBlue")
    .attr("x", function (d) {return population_pyramid_padding - 3 +  population_pyramid_xscale( max_value - d[1]) ;} )
    .attr("y", function (d) {
      return population_pyramid_yscale(d[0]); 
    })
    .on("click", function click_on_pyramid_M(event,d)
    {
      dispatch.call("select_bar", this, d);
      update_dataset();
      update_pyramid_from_pyramid();
      update_line_from_pyramid();
      update_cmap_from_others();
      update_alluvial_chart();
      update_box_plots();
      update_max_events();
      update_sports_grid();
      update_events_list(true);
     })

     .on("mouseover",function(event,d){
       
      tooltip_population_pyramid.style("visibility", "visible")
        .style("top", (event.pageY-10)+"px")
         .style("left",(event.pageX+10)+"px")
         .html("Medalists: " + String(d[1]))
      })
    .on("mouseout", function(event,d){  
      tooltip_population_pyramid.style("visibility", "hidden"); })

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//vamos fazer um eixo:
population_pyramid_xaxis_invert = d3
.axisBottom() 
.scale(population_pyramid_xscale_invert) 
.ticks(2)


svg_pyramid_M
.append("g") 
.attr("transform", "translate(-3,55)")
.attr("class", "xaxis") 
.call(population_pyramid_xaxis_invert)


svg_pyramid_M
.append("text")
.attr("transform","translate(17,50)")
.attr("class", "label")
.attr("font-family", "verdana")
.attr("font-size","9px")
.text("Number of competitors");

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//aqui os textos entre as barras:
svg_pyramid_text = d3
    .select("#population_pyramid")
    .append("svg") 
    .attr("width", 50)
    .attr("font-family", "verdana")
    .attr("font-size","13px")
    .attr("height", population_pyramid_height);

    svg_pyramid_text.append("text")
                 .attr("x",5)
                 .attr("y",0)
                 .attr("dy", "1em")
                 .attr("class", "label")
                 .attr("font-family", "verdana")
                 .attr("font-size","18px")
                 .attr("font-weight","bold")
                 .attr("id","population_pyramid_title_2")
                 .text("per")

    const bars = svg_pyramid_text
    .selectAll("g")
    .data(ydata_pyramid_MF)
    .join("g")
    .attr("id", function(d) {String(d[0]) + "MF"}  )
    .on("click", function click_on_pyramid_text(event,d)
    {
      dispatch.call("select_bar", this, d);
      update_dataset();
      update_pyramid_from_pyramid();
      update_line_from_pyramid();
      update_cmap_from_others();
      update_alluvial_chart();
      update_box_plots();
      update_max_events();
      update_sports_grid();
      update_events_list(true);
      } ) 

    bars.append("rect")
    .attr("width", 0)
    .attr("height", 0) 
    .attr("fill", "black")
    .attr("id",function(d){ return d[0]+"MF"})
    .attr("x", 0)
    .attr("y", function (d) {
      return  population_pyramid_yscale(d[0]);
    })
    .append("title") 
    .text(function (d) {
      return d[1];})

  //colocar os textos no meio das barras:

      bars.append("text")
      .attr("x", population_pyramid_xscale(0)+4)
      .attr("y", function (d) {return population_pyramid_yscale(d[0])})
      .attr("dy", ".935em")
      .attr("font-family","verdana")
      .attr("font-size","12px")
      .attr("fill","gray")
      .text( function(d) {return String(d[0]*population_pyramid_age_interval) + " - "+ String((d[0]+1)*population_pyramid_age_interval - 1)  ;} )


  var botao_M = svg_pyramid_text.append("g")
                                .attr("id","buttonM")
                                .on("click", function(d){dispatch.call("click_sex_button", this, d);
                                                        update_dataset();
                                                        update_pyramid_from_pyramid();
                                                        update_line_from_pyramid();                                        
                                                        update_cmap_from_others();
                                                        update_alluvial_chart();
                                                        update_box_plots();
                                                        update_max_events();
                                                        update_sports_grid();
                                                        update_events_list(true)})

    botao_M.append("rect")
                    .attr("x",3)
                    .attr("y",0+45)
                    .attr("width",20)
                    .attr("height",20)
                    .attr("fill","CornflowerBlue")


    botao_M.append("text")
           .attr("x", 7)
           .attr("y", 15+45)
           .attr("fill","black")
           .text( "M")

    var botao_F = svg_pyramid_text.append("g")
           .attr("id","buttonF")
           .on("click", function(d){dispatch.call("click_sex_button", this, d);
                                      update_dataset();
                                      update_pyramid_from_pyramid();
                                      update_line_from_pyramid();
                                      update_cmap_from_others();
                                      update_alluvial_chart();
                                      update_box_plots();
                                      update_max_events();
                                      update_sports_grid();
                                      update_events_list(true)})

    botao_F.append("rect")
           .attr("x",50 - 20 - 3)
           .attr("y",0+45)
           .attr("width",20)
           .attr("height",20)
           .attr("fill","pink")
           

    botao_F.append("text")
           .attr("x", 50 - 20 - 3 + 6)
           .attr("y", 15+45)
           .attr("fill","black")
           .text( "F")


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//agora a das mulheres:

svg_pyramid_F = d3
.select("#population_pyramid")
.append("svg") 
.attr("width", (population_pyramid_width-50)/2)
.attr("height", population_pyramid_height);

svg_pyramid_F.append("text")
                 .attr("x",0)
                 .attr("y",0)
                 .attr("dy", "1em")
                 .attr("class", "label")
                 .attr("font-family", "verdana")
                 .attr("font-size","18px")
                 .attr("font-weight","bold")
                 .attr("id","population_pyramid_title_3")
                 .text("Age/Gender")



svg_pyramid_F
.selectAll("rect")
.data(ydata_pyramid_F)
.join("rect") 
.attr("id", function(d) {return String(d[0])  + "F"} )
.attr("width", function (d) {return population_pyramid_xscale(d[1]) ;}) 
.attr("height", population_pyramid_yscale.bandwidth()) 
.attr("fill", "Pink")
.attr("x", 3+population_pyramid_xscale(min_value) )
.attr("y", function (d) {
  return population_pyramid_yscale(d[0]);
})
.on("click", function click_on_pyramid_F(event,d)
{
  dispatch.call("select_bar", this, d);
  update_dataset();
  update_pyramid_from_pyramid();
  update_line_from_pyramid();
  update_cmap_from_others();
  update_alluvial_chart();
  update_box_plots();
  update_max_events();
  update_sports_grid();
  update_events_list(true);
  })
  .on("mouseover",function(event,d){
       
    tooltip_population_pyramid.style("visibility", "visible")
      .style("top", (event.pageY-10)+"px")
       .style("left",(event.pageX+10)+"px")
       .html("Medalists: " + String(d[1]))
     
    })
  .on("mouseout", function(event,d){  
    tooltip_population_pyramid.style("visibility", "hidden"); });

population_pyramid_xaxis = d3
.axisBottom() 
.scale(population_pyramid_xscale) 
.ticks(3)
.tickSizeOuter(5);

svg_pyramid_F
.append("g") 
.attr("transform", "translate(3,55)")
.attr("class", "xaxis")
.call(population_pyramid_xaxis)


// text label for the x axis
svg_pyramid_F
.append("text")
.attr("transform","translate(5,50)")
.attr("class", "label")
.attr("font-family","verdana")
.attr("font-size","9px")
.text("Number of competitors");


};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Line Chart
function generate_line_chart(){
//vamos calcular o dataset que aparece no line chart:
function gerar_data_line_chart(countries) {
  var r = [];
  var dataset_line_nest;
  dataset_line = dataset_line.filter(function(d){return d.Medal != "NA"});

  dataset_line_nest = d3.rollup(dataset_line, d => d.length, d => d.NOC, d => d.Year);


  for (j in countries){
  for (i in years)
  {

    if (!dataset_line_nest.has(countries[j]) || !dataset_line_nest.get(countries[j]).has(years[i]) || dataset_line_nest.get(countries[j]).get(years[i]) == undefined) {
    	r.push([ countries[j], years[i],0])}
	else {r.push([ countries[j], years[i],dataset_line_nest.get(countries[j]).get(years[i])])}
}

    }
;
return r ;} 

var data_line_chart;


data_line_chart = gerar_data_line_chart(countries_2_view);


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//agora as escalas

  var lista_de_anos_aux = parseInt(d3.min(data_line_chart.map(d => d[1])));
  var ano_max = parseInt(d3.max(data_line_chart.map(d => d[1])));
  var lista_de_anos = [ lista_de_anos_aux ];


  while (lista_de_anos_aux < ano_max) {lista_de_anos_aux = lista_de_anos_aux + 2; lista_de_anos.push(lista_de_anos_aux)    };

  line_chart_xscale = d3
    .scalePoint()
    .domain(lista_de_anos)
    .range([padding, line_chart_width - padding]);

  line_chart_xscale2 = d3
    .scalePoint()
    .domain(years)
    .range([padding, line_chart_width - padding]);

  var lista_de_anos_aux = parseInt(d3.min(data_line_chart.map(d => d[1])));
  var lista_de_anos_filtered = [ lista_de_anos_aux ];


  while (lista_de_anos_aux < ano_max) {lista_de_anos_aux = lista_de_anos_aux + 4; lista_de_anos_filtered.push(lista_de_anos_aux)    };
  


  line_chart_xscale_filtered = d3
    .scalePoint()
    .domain(lista_de_anos_filtered)
    .range([padding, line_chart_width - padding]);

  line_chart_yscale = d3
    .scaleLinear()
    .domain([0,d3.max(data_line_chart, function (d) {return d[2];}),])
    .range([line_chart_height - padding-15, padding ]);


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//agora vamos gerar o line chart:

svg_line_chart = d3
    .select("#line_chart")
    .append("svg") 
    .attr("width", line_chart_width)
    .attr("height", line_chart_height);

svg_line_chart.append("text")
              .attr("x",200)
              .attr("y",3)
              .attr("dy", "1em")
              .attr("class", "label")
              .attr("font-family", "verdana")
              .attr("font-size","24px")
              .attr("font-weight","bold")
              .attr("id","line_chart_title")
              .text("Number of Medals Won by Country")

var line_color;

var line = d3.line()
               .x(function (d) {
          return line_chart_xscale2(d[1]);
        })
              .y(function (d) {
          return line_chart_yscale(d[2]);
        })
              .defined(function (d) {
          return d[2] !== null});

 //tooltip
var tooltip_line_chart = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("font-family", "verdana")
    .style("background","rgba(210,210,210,0.9)")
    .style("padding", "3px");


    	
    for (i in countries) {
            if (selected_countries.includes(countries[i])) {line_color = "black"} else {line_color = "rgba(100,100,100,0.25)"}
            svg_line_chart
              .append("path")
              .attr("class", "country_lines")
              .attr("fill", "none")
              .attr("stroke", line_color)
              .attr("stroke-width", 1)
              .attr("id","path"+countries[i])
              .attr(
                "d",
                line(data_line_chart.filter(d => d[0] == countries[i])  )
              )

              .on("mouseover",function(event,d){
       
                tooltip_line_chart.style("visibility", "visible")
								  .style("top", (event.pageY-10)+"px")
					 			  .style("left",(event.pageX+10)+"px")
                  .html("Country: " + countries_ioc_name[event.path[0].id.slice(4,7)])
                        

			    d3.select(this).style("stroke-width", 3);

			    if(selected_countries == countries || !selected_countries.includes(event.path[0].id.slice(4,7))){ //testa se o país não está selecionado

			    if (selected_countries.length < 12 || selected_countries == countries){ //testa se já foram selecionados mais (ou igual) do que 12 países
			    	d3.select(this).style("stroke", unused_colors()[0]);
			    }
			    else{
			    	d3.select(this).style("stroke", "black");
			    }
			    }

			    d3.select("#country" + event.path[0].id.slice(4,7))
			      .style("stroke-width", 3)
			      .style("stroke", "black")
                            

                })
              .on("mouseout", function(event,d){  
                tooltip_line_chart.style("visibility", "hidden");
              	d3.select(this).style("stroke-width", 1); 


	            if (selected_countries != countries && selected_countries.includes(event.path[0].id.slice(4,7))){
	    			d3.select("#country" + event.path[0].id.slice(4,7))
	          		  .style("stroke-width",2)
	    		}

	    		else{ //testa se o país não está selecionado

	    			if (selected_countries == countries){ //testa se já foram selecionados mais (ou igual) do que 12 países
			    	d3.select(this).style("stroke", "black");
			        }
			    	else{
			    	d3.select(this).style("stroke", "rgba(100,100,100,0.2)");
			        }

	    			d3.select("#country" + event.path[0].id.slice(4,7))
	    			  .style("stroke", "rgba(128, 127, 125, 0.5)")
	    			  .style("stroke-width", 1)
	    			  .lower();
	    		}

	    		})

              
              .on("click", function click_on_line(event)
              {selected_country = event.path[0].id.slice(4,7);

                dispatch.call("select_country", this, data_line_chart.filter(d => d[0] == event.path[0].id.slice(4,7)));
                update_dataset();
                update_line_from_line();
                update_pyramid_from_line();
                update_cmap_from_countries();
                update_alluvial_chart();
                update_box_plots();
                update_max_events();
                update_sports_grid();
                update_events_list(true);
                ;})
          ;}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//fazer os eixos:
    line_chart_yaxis = d3
    .axisLeft() 
    .scale(line_chart_yscale) 

    svg_line_chart
    .append("g") 
    .attr("transform", "translate(" + padding + ",0)")
    .attr("class", "yaxis")
    .attr("id","line_chart_yaxis")
    .call(line_chart_yaxis);


    svg_line_chart
    .append("text")
    .attr("transform", "rotate(-90)translate(-63,0)")
    .attr("y", 0)
    .attr("x", 0 - 30-line_chart_height / 2)
    .attr("dy", "1em")
    .attr("class", "label")
    .attr("font-family","verdana")
    .text("Number of Medals Won");


    line_chart_xaxis = d3
    .axisBottom() 
    .scale(line_chart_xscale2)



    svg_line_chart
    .append("g") 
    .attr("transform", "translate(0," + (line_chart_height - padding-15) + ")")
    .attr("class", "xaxis") 
    .attr("id","line_chart_xaxis")
    .call(line_chart_xaxis);


  svg_line_chart
    .append("text")
    .attr(
      "transform",
      "translate(" + (line_chart_width / 2 - 30) + " ," + (line_chart_height - padding / 3 -17) + ")"
    )
    .attr("class", "label")
    .attr("font-family","verdana")
    .text("Year");


    svg_line_chart.select("#line_chart_xaxis")
                  .selectAll("g.tick")
                  .append("rect")
                  .attr("width",27)
                  .attr("height",12)
                  .attr("transform","translate(-23,2)")
                  .attr("fill","rbga(0,0,0,0)")//"red")
                  .attr("stroke","black")
                  .attr("stroke-width",2)
                  .attr("visibility", "hidden")
                  .attr("id", d => "tick_rect_line_chart"+String(d))//.innerHTML)

    svg_line_chart.select("#line_chart_xaxis")
                  .selectAll("text")
                  .attr("transform", "translate(-1,-3)")


    svg_line_chart.select("#line_chart_xaxis")
                  .selectAll("g.tick")
                  .on("click", function(d) {
                    dispatch.call("click_line_chart_year", this, d);
                    update_dataset();
                    update_line_from_year();
                    update_pyramid_from_year();
                    update_cmap_from_others();
                    update_alluvial_chart();
                    update_box_plots();
                    update_max_events();
                    update_sports_grid();
                    update_events_list(true);
                  })


    //colocar legenda:
    svg_line_chart
    .append("text")
    .attr("x",767)
    .attr("y",35)
    .attr("class", "label")
    .attr("font-size","13px")
    .attr("font-family","verdana")
    .text(":Host Country");

    svg_line_chart.append("polygon")
                .attr("points",
                String(760) +                    "," + String(22)                       + " " +
                String(760+lado_do_triangulo) +  "," + String(22 + 2*lado_do_triangulo) + " " +
                String(760-lado_do_triangulo) +  "," + String(22 + 2*lado_do_triangulo)
                )
                .attr("id","triangulo_legenda")
                .attr("fill", "white")
                .style("stroke", "black")
                .style("strokeWidth", "15px");


    //colocar as palavras "summer games:" e "winter games:"


    svg_line_chart
    .append("text")
    .attr(
      "transform",
      "translate(" + 0 + " ," + (line_chart_height - 2 - padding / 3+5) + ")"
    )
    .attr("class", "label")
    .attr("font-family","verdana")
    .attr("font-size","12px")
    .attr("id", "seasonSummer")
    .text("Summer:")
    .on("click",function(d) {
        dispatch.call("click_season_line_chart", this, d);
        update_dataset();
        update_pyramid_from_season();
        update_line_from_season();
        update_cmap_from_others();
        update_alluvial_chart();
        update_box_plots();
        update_max_events();
        update_sports_grid();
        update_events_list(true);
        });

    svg_line_chart
    .append("text")
    .attr(
      "transform",
      "translate(" + 0 + " ," + (line_chart_height + 13 - padding / 3+2) + ")"
    )
    .attr("class", "label")
    .attr("font-family","verdana")
    .attr("font-size","12px")
    .attr("id", "seasonWinter")
    .text("Winter:")
    .on("click",function(d) {
        dispatch.call("click_season_line_chart", this, d);
        update_dataset();
        update_pyramid_from_season();
        update_line_from_season();
        update_cmap_from_others();
        update_alluvial_chart();
        update_box_plots();
        update_max_events();
        update_sports_grid();
        update_events_list(true);
      });



      //Slider:

      var sliderRange = d3
          .sliderBottom()
          
          .min(1896)
          .max(2032)
          .width(810)
          .ticks(0)
          .step(4)
          .default([1896, 2032])
          .fill('#2196f3')
          .on('onchange', d => {dispatch.call("change_year_slider", this, d)
                                update_dataset();
                                update_pyramid_from_year();
                                update_cmap_from_others();
                                update_alluvial_chart();
                                update_box_plots();
                                update_max_events();
                                update_sports_grid();
                                update_events_list(true);

                                //vamos por todos os retangulos nos anos invisiveis

                                for (i in years ){

                                  svg_line_chart.select("#tick_rect_line_chart"+String( years[i]) )
                                                .attr("visibility", "hidden")}
                                });

      var gRange = svg_line_chart
          .append('g')
          .attr('transform', 'translate(44,273)')
          .attr("id", "slider_year")
          .call(sliderRange);

};




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//choropleth map:

function gerar_data_cmap(countries) {
  var r = {};
  var dataset_cmap_aux;
  var cmap_medals = selected_medal_types;
  var index_medal = cmap_medals.indexOf("NA");
  if (index_medal != -1) {cmap_medals.splice(index_medal, 1)};
  
  dataset_cmap_aux_medals = dataset_cmap.filter(function(d){return cmap_medals.includes(d.Medal)});
  dataset_cmap_nest_medals = d3.rollup(dataset_cmap_aux_medals, d => d.length, d => d.NOC);

  dataset_cmap_aux_everybody = dataset_cmap
  dataset_cmap_nest_everybody = d3.rollup(dataset_cmap_aux_everybody, d => d.length, d => d.NOC);
  
  for (j in countries){

  	if ( !dataset_cmap_nest_medals.has(countries[j]) || !dataset_cmap_nest_medals.get(countries[j]) == undefined) 
  			{r[countries[j]] =+ 0}
	  else 
	  	{r[countries[j]] =+ dataset_cmap_nest_medals.get(countries[j])/dataset_cmap_nest_everybody.get(countries[j])}

  }
;
return r ;}

function generate_cmap(){

selected_medal_type = ["Gold","Silver","Bronze"]


var data_cmap;





data_cmap = gerar_data_cmap(countries_2_view);

//definir a estrutura do mapa
var path = d3.geoPath();
var projection = d3.geoMercator()
  .scale(120)
  .center([0,50])
  .translate([cmap_width / 2, cmap_height / 2]);

var colorScale = function(d) {return d3.interpolatePurples(d/2+0.5)}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//agora vamos gerar o cmap:
svg_cmap = d3
    .select("#cmap")
    .append("svg")
    .attr("width", cmap_width)
    .attr("height", cmap_height);

var over_country;

//tooltip
var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("font-family", "verdana")
    .style("background","rgba(210,210,210,0.9)")
    .style("padding", "3px");


var medaled_events_per_country;

function get_number_of_medaled_events(over_country){

	medaled_events_per_country = d3.rollup(dataset_cmap_aux_medals, d => d.length, d => d.NOC, d => d.Event);
	if (medaled_events_per_country.get(over_country) == undefined) {return 0}
	else{
		return Array.from(medaled_events_per_country.get(over_country).keys()).length
     	}
}

countries_in_map = Array.from(d3.group(map_countries.features,d => convert_code(d.id)).keys())
countries_with_participants = Array.from(d3.group(dataset_cmap,d => d.NOC).keys())
available_countries = countries_in_map.filter(d => countries_with_participants.includes(d))

for (i in available_countries){
percent_per_country[available_countries[i]] =+ data_cmap[available_countries[i]];
}

//criar o mapa
svg_cmap.append("g")
    .selectAll("path")
    .data(map_countries.features.filter(d => d.id !== "ATA")) //Remove Antarctica
    .enter()
    .append("path")
    .attr("d", d3.geoPath().projection(projection))
    .attr("fill", function(d){

    		if (available_countries.includes(convert_code(d.id)) && percent_per_country[convert_code(d.id)] != undefined){
    			return colorScale(percent_per_country[convert_code(d.id)]); 
    		}
    		else{return "#998c6d"} //cor para países que não participaram nos jogos
            
        })
    .attr("id", d => "country" + convert_code(d.id))
    .attr("class", function(d){ return "Country" } )
    .style("stroke", "rgba(128, 127, 125, 0.5)")
    .style("stroke-width", 1);

   //LEGEND //////////////////////////////////////////
	legend = svg_cmap.append("g")
	.attr("class", "legend")
	.attr("transform", "translate(450,400)");

    var newData = [];
    var sectionWidth = Math.floor(legend_width / divisions);

    for (var i=0; i < legend_width; i+= sectionWidth ) {
        newData.push(i);
    }

    legend.selectAll('rect')
        .data(newData)
        .enter()
        .raise()
        .append('rect')
            .attr("x", function(d) { return d; })
            .attr("y", 120)
            .attr("height", 10)
            .attr("width", sectionWidth)
            .attr('fill', function(d, i) {return colorScale(newData[i]/legend_width)});

    legend.append("text")
          .text(function(){return (0).toFixed(1) + "%";})
          .attr("transform","translate(0,115)")
          .style("font-size", "10px")
          .style("font-family", "verdana");
    legend.append("text")
          .text(function(){return (100).toFixed(1) + "%";})
          .attr("transform","translate("+(legend_width-20)+",115)")
          .style("font-size", "10px")
          .style("font-family", "verdana")
          .attr("id", "max_percent_legend");

    //Legenda - no participants
    svg_cmap.append("rect")
    		.attr("x",legend_width + 20)
    		.attr("y", 120)
    		.attr("height", 10)
    		.attr("width", 10)
    		.attr("fill", "#998c6d")
    		.attr("transform", "translate(450,400)");

    svg_cmap.append("text")
    		.attr("x",legend_width + 32)
    		.attr("y", 129)
    		.attr("transform", "translate(450,400)")
    		.attr("font-family", "verdana")
    		.attr("font-size", "11px")
    		.text("No participants");
    		
	svg_cmap.append("text")
			.attr("x",50)
			.attr("y", 129)
			.attr("transform", "translate(0,400)")
			.attr("font-family", "verdana")
			.attr("font-size", "11px")
			.text("* Country not represented in map");


    svg_cmap.selectAll(".Country")
    .on("mouseover", function(d){
    	if (d.srcElement != null && d.srcElement.__data__ != undefined && d.srcElement.__data__.id != undefined && available_countries.includes(convert_code(d.srcElement.__data__.id))){
    	over_country = convert_code(d.srcElement.__data__.id);

    	d3.select(this).style("cursor", "pointer")
          .style("stroke", "black")
          .style("stroke-width", 3)
          .raise();

      	d3.select("#path" + over_country)
	      .style("stroke-width", 3);

         if (selected_countries.length < 12 || selected_countries == countries){
         	if (!selected_countries.includes(over_country) || selected_countries == countries){
         		d3.select("#path" + over_country)
         		  .style("stroke", unused_colors()[0]);
         	}
         }

         
    	}
         })
	.on("mousemove", function(d){
		if (d.srcElement != null && d.srcElement.__data__ != undefined && d.srcElement.__data__.id != undefined && available_countries.includes(convert_code(d.srcElement.__data__.id))){
		return tooltip.style("visibility", "visible")
					  .style("top", (event.pageY-10)+"px")
					  .style("left",(event.pageX+10)+"px")
					  .html("Country: " + countries_ioc_name[over_country] + "<br/>" + "Percentage: " + Math.round(percent_per_country[over_country]*1000)/10 + "%"
					  	+ "<br/>" + "Participants: " + d3.rollup(dataset_cmap, d => d.length, d => d.NOC).get(over_country) 
					  	+ "<br/>" + "Number of medaled events: "  + get_number_of_medaled_events(over_country));
		
		}						

		})
    .on("mouseout", function(d){
    	if (d.srcElement != null && d.srcElement.__data__ != undefined && d.srcElement.__data__.id != undefined && available_countries.includes(over_country)){
    		
          	d3.select("#path" + over_country)
		      .style("stroke-width", 1)


    		if (selected_countries != countries && selected_countries.includes(over_country)){
    			d3.select(this)
          		  .style("stroke-width",2)
    		}

    		else{
    			if (selected_countries == countries){
    				d3.select("#path" + over_country)
		               .style("stroke", "black")
    			}
    			else{
    				d3.select("#path" + over_country)
		               .style("stroke", "rgba(100,100,100,0.2)")
    			}

    			d3.select(this)
    			  .style("stroke", "rgba(128, 127, 125, 0.5)")
    			  .style("stroke-width", 1)
    			  .lower();
    		}
    	

    	return tooltip.style("visibility", "hidden");} } 
    	)

    .on("click", function click_on_country(d){

    	if (d.srcElement != null && d.srcElement.__data__ != undefined && d.srcElement.__data__.id != undefined && available_countries.includes(convert_code(d.srcElement.__data__.id))){
    		selected_country = convert_code(d.srcElement.__data__.id);
	
	    dispatch.call("select_country", this);  
    			update_dataset();
	    		update_line_from_cmap();
	   			update_pyramid_from_cmap();
	            update_cmap_from_countries();
	            update_alluvial_chart();
	            update_box_plots();
	            update_max_events();
	            update_sports_grid();
	            update_events_list(true);
    			
	    };
});

    var zoom = d3.zoom()
      .scaleExtent([1, 8])
      .on('zoom', function(d) {
          svg_cmap.selectAll(".Country")
           .attr('transform', d.transform);
                             });

	svg_cmap.call(zoom);

	svg_cmap.append("text")
          .attr("x",90)
          .attr("y",3)
          .attr("dy", "1em")
          .attr("class", "label")
          .attr("font-family", "verdana")
          .attr("font-size","24px")
          .attr("font-weight","bold")
          .attr("id","line_chart_title")
          .text("Percentage of Medals Won per Country Participants")

};


//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//   
function generate_alluvial_chart(){
  
  //criar as variaveis necessárias para desenhar as coisas
    var alluvial_total_count = dataset_alluvial.length;
    //fazer a informaçao para o eixos das medalhas:
    
    var alluvial_gold_count  = dataset_alluvial.filter(d => d.Medal == "Gold").length;
    var alluvial_silver_count= dataset_alluvial.filter(d => d.Medal == "Silver").length;
    var alluvial_bronze_count= dataset_alluvial.filter(d => d.Medal == "Bronze").length;
    //var alluvial_NA_count    = dataset_alluvial.filter(d => d.Medal == "NA").length;

    //fazer a informaçao para o eixos das seasons:

    var alluvial_summer_gold_count = dataset_alluvial.filter(d => d.Season == "Summer" && d.Medal == "Gold").length;
    var alluvial_summer_silver_count = dataset_alluvial.filter(d => d.Season == "Summer" && d.Medal == "Silver").length;
    var alluvial_summer_bronze_count = dataset_alluvial.filter(d => d.Season == "Summer" && d.Medal == "Bronze").length;
    //var alluvial_summer_NA_count = dataset_alluvial.filter(d => d.Season == "Summer" && d.Medal == "NA").length;



    var alluvial_summer_count = alluvial_summer_gold_count + alluvial_summer_silver_count +alluvial_summer_bronze_count //+alluvial_summer_NA_count
    

    var alluvial_winter_gold_count = dataset_alluvial.filter(d => d.Season == "Winter" && d.Medal == "Gold").length;
    var alluvial_winter_silver_count = dataset_alluvial.filter(d => d.Season == "Winter" && d.Medal == "Silver").length;
    var alluvial_winter_bronze_count = dataset_alluvial.filter(d => d.Season == "Winter" && d.Medal == "Bronze").length;
    //var alluvial_winter_NA_count = dataset_alluvial.filter(d => d.Season == "Winter" && d.Medal == "NA").length;


    var alluvial_winter_count =  alluvial_winter_gold_count + alluvial_winter_silver_count +alluvial_winter_bronze_count// +alluvial_winter_NA_count
    
    //fazer a informaçao para o eixos dos event types:

    var alluvial_ind_summer_gold_count = dataset_alluvial.filter(d => d.Event_Type == "Individual" && d.Season == "Summer" && d.Medal == "Gold").length;
    var alluvial_ind_summer_silver_count = dataset_alluvial.filter(d => d.Event_Type == "Individual" && d.Season == "Summer" && d.Medal == "Silver").length;
    var alluvial_ind_summer_bronze_count = dataset_alluvial.filter(d => d.Event_Type == "Individual" && d.Season == "Summer" && d.Medal == "Bronze").length;
    
    var alluvial_ind_winter_gold_count = dataset_alluvial.filter(d => d.Event_Type == "Individual" && d.Season == "Winter" && d.Medal == "Gold").length;
    var alluvial_ind_winter_silver_count = dataset_alluvial.filter(d => d.Event_Type == "Individual" && d.Season == "Winter" && d.Medal == "Silver").length;
    var alluvial_ind_winter_bronze_count = dataset_alluvial.filter(d => d.Event_Type == "Individual" && d.Season == "Winter" && d.Medal == "Bronze").length;
    
    
    var alluvial_ind_count = alluvial_ind_summer_gold_count + alluvial_ind_summer_silver_count + alluvial_ind_summer_bronze_count + alluvial_ind_winter_gold_count + alluvial_ind_winter_silver_count + alluvial_ind_winter_bronze_count
    
    var alluvial_team_summer_gold_count = dataset_alluvial.filter(d => d.Event_Type == "Team" && d.Season == "Summer" && d.Medal == "Gold").length;
    var alluvial_team_summer_silver_count = dataset_alluvial.filter(d => d.Event_Type == "Team" && d.Season == "Summer" && d.Medal == "Silver").length;
    var alluvial_team_summer_bronze_count = dataset_alluvial.filter(d => d.Event_Type == "Team" && d.Season == "Summer" && d.Medal == "Bronze").length;
    
    var alluvial_team_winter_gold_count = dataset_alluvial.filter(d => d.Event_Type == "Team" && d.Season == "Winter" && d.Medal == "Gold").length;
    var alluvial_team_winter_silver_count = dataset_alluvial.filter(d => d.Event_Type == "Team" && d.Season == "Winter" && d.Medal == "Silver").length;
    var alluvial_team_winter_bronze_count = dataset_alluvial.filter(d => d.Event_Type == "Team" && d.Season == "Winter" && d.Medal == "Bronze").length;
    
    
    var alluvial_team_count = alluvial_team_summer_gold_count + alluvial_team_summer_silver_count + alluvial_team_summer_bronze_count + alluvial_team_winter_gold_count + alluvial_team_winter_silver_count + alluvial_team_winter_bronze_count
    
    

    
    //dados para fazer os retangulos: cada retangulo vai ter a informaçao:
    //numero que representa
    //proporçao que representa
    //nome, pode ser um time de medlha, um tipo de season ou um tipo de event
    //a coordenada x onde se deve dar o retangulo,
    //a proporçao acumulativa das anteriores, para se saber o y onde começar este retangulo
    //o quanto o retangulo deve ser transladado para baixo para haver espaçamento entre os retangulos,
    //assim o y do rentagulo fica: alluvial_chart_yscale(d[4]) + d[5]
    var alluvial_data_aux = [];


      
    alluvial_data_aux.push([alluvial_gold_count, alluvial_gold_count/alluvial_total_count,"Gold",0,0,0])
    alluvial_data_aux.push([alluvial_silver_count, alluvial_silver_count/alluvial_total_count,"Silver",0,alluvial_gold_count/alluvial_total_count,10])
    alluvial_data_aux.push([alluvial_bronze_count, alluvial_bronze_count/alluvial_total_count,"Bronze",0,(alluvial_gold_count+alluvial_silver_count)/alluvial_total_count,20])
    //alluvial_data_aux.push([alluvial_NA_count,alluvial_NA_count/alluvial_total_count,"NA",0,(alluvial_gold_count+alluvial_silver_count+alluvial_bronze_count)/alluvial_total_count,30])


    alluvial_data_aux.push([alluvial_summer_count, alluvial_summer_count/alluvial_total_count,"Summer",alluvial_chart_width/2 - 25,0,0])
    alluvial_data_aux.push([alluvial_winter_count, alluvial_winter_count/alluvial_total_count,"Winter",alluvial_chart_width/2 - 25,alluvial_summer_count/alluvial_total_count,20])

    alluvial_data_aux.push([alluvial_ind_count, alluvial_ind_count/alluvial_total_count,"Individual",alluvial_chart_width-50,0,0])
    alluvial_data_aux.push([alluvial_team_count, alluvial_team_count/alluvial_total_count,"Team",alluvial_chart_width-50,alluvial_ind_count/alluvial_total_count,20])
    

  //a partir daqui são as scales
  //as escalhas vao de 0 a 1 porque nós para fazer o alluvial chart vamos fazer a altura dos retangulos singificar, por exemplo
  //"a proporçao de medalhas que foram de ouro". logo vai ser um numero entre 0 e 1

  alluvial_chart_xscale = d3 
  .scaleLinear()
  .domain([0,alluvial_chart_width] )
  .range([30,alluvial_chart_width-30] );


  alluvial_chart_yscale = d3
  .scaleLinear()
  .domain([0,1] )
  .range([0,alluvial_chart_height-100]);


  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var tooltip_alluvial_chart = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("font-family", "verdana")
    .style("background","rgba(210,210,210,0.9)")
    .style("padding", "3px");


//agora fazemos o alluvial chart:
svg_alluvial_chart = d3
    .select("#alluvial_chart")
    .append("svg") 
    .attr("width", alluvial_chart_width)
    .attr("height", alluvial_chart_height);


svg_alluvial_chart.append("text")
                  .attr("x",55)
                  .attr("y",-5)
                  .attr("dy", "1em")
	              .attr("class", "label")
	              .attr("font-family", "verdana")
	              .attr("font-size","24px")
	              .attr("font-weight","bold")
                  .attr("id","alluvial_chart_title")
                  .style("background-color", "white")
                  .text("Flow of Medals won");



//fazer os retangulos:
var alluvial_rects = svg_alluvial_chart
    .selectAll("g")
    .data(alluvial_data_aux)
    .join("g") 
    .attr("id", function(d) {return "g_alluvial"+String(d[2]) } ) //colocar id
    .on("click", function click_on_alluvial_chart(event,d)
    { d3.select("#alluvial_hover" + String(d[0])).remove();
      dispatch.call("select_alluvial", this, d);
      update_dataset();
      update_alluvial_chart();
      update_pyramid_from_line();
      update_line_from_pyramid();
      update_line_from_season();
      update_cmap_from_others();
      update_box_plots();
      update_max_events();
      update_sports_grid();
      update_events_list(true);

      ;})
      .on("mouseover",function(event,d){
       
        tooltip_alluvial_chart.style("visibility", "visible")
          .style("top", (event.pageY-10)+"px")
           .style("left",(event.pageX+10)+"px")
           .html("Medals won: " +String(d[2]) +" - "+ String(d[0]))

        })
      .on("mouseout", function(event,d){  
        tooltip_alluvial_chart.style("visibility", "hidden"); })

alluvial_rects.append("rect")
    .attr("id", function(d) {return "alluvial"+String(d[2]) } )
    .attr("width", function (d) {return 20 ;}) // each bar’s width depends on the total number of bars
    .attr("height", d => alluvial_chart_yscale(d[1])) // fit to our scale
    .attr("fill", function (d) {return "rgb(180,180,180)";
                                ;} )

    .attr("x", function (d) {return alluvial_chart_xscale(d[3]) ;} )
    .attr("y", function (d) {return 30 + alluvial_chart_yscale(d[4])+d[5] ;} )
    .style("stroke", "rgba(0,0,0,1)")
    .style("stroke-width", 1)
      


      alluvial_rects.append("text")
      
      .attr("x", function (d) {return alluvial_chart_xscale(d[3]) - 5 ;})
      .attr("y", function (d) {return 20 + alluvial_chart_yscale(d[1]/2 + d[4])+d[5] ;})
      .attr("dy", ".935em")
      .attr("font-family","verdana")
      .attr("font-size","10px")
      .attr("fill","gray")
      .attr("fill",function(d){
                               if(d[1] == 0){return "rgba(0,0,0,0)"}
                               else{return "rgba(0,0,0,1)"}
                              
                              } )
      .attr("transform", d => "rotate(-90," + 
      String(alluvial_chart_xscale(d[3]) - 5) +","+
       String(20 + alluvial_chart_yscale(d[1]/2 + d[4])+d[5])+")translate(-27,8)")
      .text(function(d){return d[2] })
      



  //fazer os polígonos entre os retangulos:

  function build_polygon_data_1(){
    var r = []
    var gold = svg_alluvial_chart.select("#AlluvialGold").nodes()[0]
    var silver = svg_alluvial_chart.select("#AlluvialSilver").nodes()[0]
    var bronze = svg_alluvial_chart.select("#AlluvialBronze").nodes()[0]
    //var NA = svg_alluvial_chart.select("#AlluvialNA").nodes()[0]


    var summer = svg_alluvial_chart.select("#AlluvialSummer").nodes()[0]
    var winter = svg_alluvial_chart.select("#AlluvialWinter").nodes()[0]


    var ind = svg_alluvial_chart.select("#AlluvialIndividual").nodes()[0]
    var team = svg_alluvial_chart.select("#AlluvialTeam").nodes()[0]

    //os poligonos sao definidos pela ordem seguinte:
    //canto esquerdo inferior
    //canto esquero superior
    //canto direito superior
    //cando direito inferior


    //poligono que vai do ouro para o verao:
    r.push( [String(gold.x.baseVal.value + gold.width.baseVal.value) + "," +
             String(gold.y.baseVal.value + alluvial_chart_yscale(alluvial_summer_gold_count/alluvial_total_count))+ " " +

             String(gold.x.baseVal.value + gold.width.baseVal.value) + "," +
             String(gold.y.baseVal.value                            )+ " " +

             String(summer.x.baseVal.value                          ) + "," +
             String(summer.y.baseVal.value                           )+ " " +

             String(summer.x.baseVal.value                           ) + "," +
             String(summer.y.baseVal.value + alluvial_chart_yscale(alluvial_summer_gold_count/alluvial_total_count))

              ,"rgba(255,215,0,0.5)"]
          )

  //poligono que vai do ouro para o winter:
    r.push([String(gold.x.baseVal.value + gold.width.baseVal.value) + "," +
            String(gold.y.baseVal.value + gold.height.baseVal.value)+ " " +

            String(gold.x.baseVal.value + gold.width.baseVal.value) + "," +
            String(gold.y.baseVal.value + alluvial_chart_yscale(alluvial_summer_gold_count/alluvial_total_count))+ " " +

            String(winter.x.baseVal.value                          ) + "," +
            String(winter.y.baseVal.value                           )+ " " +

            String(winter.x.baseVal.value                           ) + "," +
            String(winter.y.baseVal.value + alluvial_chart_yscale(alluvial_winter_gold_count/alluvial_total_count))

     ,"rgba(255,215,0,0.5)"]
 )

 //poligono que vai de prata para summer:
 r.push([String(silver.x.baseVal.value + silver.width.baseVal.value) + "," +
 String(silver.y.baseVal.value + alluvial_chart_yscale(alluvial_summer_silver_count/alluvial_total_count))+ " " +

 String(silver.x.baseVal.value + silver.width.baseVal.value) + "," +
 String(silver.y.baseVal.value)+ " " +

 String(summer.x.baseVal.value                          ) + "," +
 String(summer.y.baseVal.value+ alluvial_chart_yscale(alluvial_summer_gold_count/alluvial_total_count))+ " " +

 String(summer.x.baseVal.value                           ) + "," +
 String(summer.y.baseVal.value + alluvial_chart_yscale((alluvial_summer_gold_count+alluvial_summer_silver_count)/alluvial_total_count))

,"rgba(211,211,211,0.7)"]
)

  //poligono que vai do prata para o winter:
  r.push([String(silver.x.baseVal.value + silver.width.baseVal.value) + "," +
  String(silver.y.baseVal.value + silver.height.baseVal.value)+ " " +

  String(silver.x.baseVal.value + silver.width.baseVal.value) + "," +
  String(silver.y.baseVal.value + alluvial_chart_yscale(alluvial_summer_silver_count/alluvial_total_count))+ " " +

  String(winter.x.baseVal.value                          ) + "," +
  String(winter.y.baseVal.value + alluvial_chart_yscale(alluvial_winter_gold_count/alluvial_total_count))+ " " +

  String(winter.x.baseVal.value                           ) + "," +
  String(winter.y.baseVal.value + alluvial_chart_yscale((alluvial_winter_gold_count + alluvial_winter_silver_count)/alluvial_total_count))

,"rgba(211,211,211,0.7)"]
)

 //poligono que vai de bronze para summer:
 r.push([String(bronze.x.baseVal.value + bronze.width.baseVal.value) + "," +
 String(bronze.y.baseVal.value + alluvial_chart_yscale(alluvial_summer_bronze_count/alluvial_total_count))+ " " +

 String(bronze.x.baseVal.value + bronze.width.baseVal.value) + "," +
 String(bronze.y.baseVal.value)+ " " +

 String(summer.x.baseVal.value                          ) + "," +
 String(summer.y.baseVal.value+ alluvial_chart_yscale((alluvial_summer_gold_count + alluvial_summer_silver_count)/alluvial_total_count))+ " " +

 String(summer.x.baseVal.value                           ) + "," +
 String(summer.y.baseVal.value + alluvial_chart_yscale((alluvial_summer_gold_count+alluvial_summer_silver_count + alluvial_summer_bronze_count)/alluvial_total_count))

,"rgba(205,127,50,0.5)"]
)


  //poligono que vai do bronze para o winter:
  r.push([String(bronze.x.baseVal.value + bronze.width.baseVal.value) + "," +
  String(bronze.y.baseVal.value + bronze.height.baseVal.value)+ " " +

  String(bronze.x.baseVal.value + bronze.width.baseVal.value) + "," +
  String(bronze.y.baseVal.value + alluvial_chart_yscale(alluvial_summer_bronze_count/alluvial_total_count))+ " " +

  String(winter.x.baseVal.value                          ) + "," +
  String(winter.y.baseVal.value + alluvial_chart_yscale((alluvial_winter_gold_count + alluvial_winter_silver_count)/alluvial_total_count))+ " " +

  String(winter.x.baseVal.value                           ) + "," +
  String(winter.y.baseVal.value + alluvial_chart_yscale((alluvial_winter_gold_count + alluvial_winter_silver_count+ alluvial_winter_bronze_count)/alluvial_total_count))

,"rgba(205,127,50,0.5)"]
)

 //poligono que vai do summer_gold para individual:


r.push( [String(summer.x.baseVal.value + summer.width.baseVal.value) + "," +
String(summer.y.baseVal.value + alluvial_chart_yscale(alluvial_ind_summer_gold_count/alluvial_total_count))+ " " +

String(summer.x.baseVal.value + summer.width.baseVal.value) + "," +
String(summer.y.baseVal.value                            )+ " " +

String(ind.x.baseVal.value                          ) + "," +
String(ind.y.baseVal.value                           )+ " " +

String(ind.x.baseVal.value                           ) + "," +
String(ind.y.baseVal.value + alluvial_chart_yscale(alluvial_ind_summer_gold_count/alluvial_total_count))

 ,"rgba(255,215,0,0.5)"]
)

 //poligono que vai do summer_gold para team:


 r.push( [String(summer.x.baseVal.value + summer.width.baseVal.value) + "," +
 String(summer.y.baseVal.value + alluvial_chart_yscale(alluvial_summer_gold_count/alluvial_total_count))+ " " +
 
 String(summer.x.baseVal.value + summer.width.baseVal.value) + "," +
 String(summer.y.baseVal.value + alluvial_chart_yscale(alluvial_ind_summer_gold_count/alluvial_total_count))+ " " +
 
 String(team.x.baseVal.value                          ) + "," +
 String(team.y.baseVal.value                           )+ " " +
 
 String(team.x.baseVal.value                           ) + "," +
 String(team.y.baseVal.value + alluvial_chart_yscale(alluvial_team_summer_gold_count/alluvial_total_count))
 
  ,"rgba(255,215,0,0.5)"]
 )


  //poligono que vai do summer_silver para individual:


r.push( [String(summer.x.baseVal.value + summer.width.baseVal.value) + "," +
String(summer.y.baseVal.value + alluvial_chart_yscale((alluvial_summer_gold_count+alluvial_ind_summer_silver_count)/alluvial_total_count))+ " " +

String(summer.x.baseVal.value + summer.width.baseVal.value) + "," +
String(summer.y.baseVal.value + alluvial_chart_yscale(alluvial_summer_gold_count/alluvial_total_count))+ " " +

String(ind.x.baseVal.value                          ) + "," +
String(ind.y.baseVal.value + alluvial_chart_yscale((alluvial_ind_summer_gold_count+alluvial_ind_winter_gold_count)/alluvial_total_count))+ " " +

String(ind.x.baseVal.value                           ) + "," +
String(ind.y.baseVal.value + alluvial_chart_yscale((alluvial_ind_summer_gold_count+alluvial_ind_winter_gold_count+alluvial_ind_summer_silver_count)/alluvial_total_count))

 ,"rgba(211,211,211,0.7)"]
)

 //poligono que vai do summer_silver para team:


 r.push( [String(summer.x.baseVal.value + summer.width.baseVal.value) + "," +
 String(summer.y.baseVal.value + alluvial_chart_yscale((alluvial_summer_gold_count+alluvial_summer_silver_count)/alluvial_total_count))+ " " +
 
 String(summer.x.baseVal.value + summer.width.baseVal.value) + "," +
 String(summer.y.baseVal.value + alluvial_chart_yscale((alluvial_summer_gold_count+alluvial_ind_summer_silver_count)/alluvial_total_count))+ " " +
 
 String(ind.x.baseVal.value                          ) + "," +
 String(team.y.baseVal.value + alluvial_chart_yscale((alluvial_team_summer_gold_count+alluvial_team_winter_gold_count)/alluvial_total_count))+ " " +
 
 String(ind.x.baseVal.value                           ) + "," +
 String(team.y.baseVal.value + alluvial_chart_yscale((alluvial_team_summer_gold_count+alluvial_team_winter_gold_count+alluvial_team_summer_silver_count)/alluvial_total_count))
 
  ,"rgba(211,211,211,0.7)"]
 )


   //poligono que vai do summer_bronze para individual:


r.push( [String(summer.x.baseVal.value + summer.width.baseVal.value) + "," +
String(summer.y.baseVal.value + alluvial_chart_yscale((alluvial_summer_gold_count+alluvial_summer_silver_count+alluvial_ind_summer_bronze_count)/alluvial_total_count))+ " " +

String(summer.x.baseVal.value + summer.width.baseVal.value) + "," +
String(summer.y.baseVal.value + alluvial_chart_yscale((alluvial_summer_gold_count+alluvial_summer_silver_count)/alluvial_total_count))+ " " +

String(ind.x.baseVal.value                          ) + "," +
String(ind.y.baseVal.value + alluvial_chart_yscale((alluvial_ind_summer_gold_count+alluvial_ind_winter_gold_count+alluvial_ind_summer_silver_count+alluvial_ind_winter_silver_count)/alluvial_total_count))+ " " +

String(ind.x.baseVal.value                           ) + "," +
String(ind.y.baseVal.value + alluvial_chart_yscale((alluvial_ind_summer_gold_count+alluvial_ind_winter_gold_count+alluvial_ind_summer_silver_count+alluvial_ind_winter_silver_count+alluvial_ind_summer_bronze_count)/alluvial_total_count))

 ,"rgba(205,127,50,0.5)"]
)

 //poligono que vai do summer_bronze para team:


 r.push( [String(summer.x.baseVal.value + summer.width.baseVal.value) + "," +
 String(summer.y.baseVal.value + alluvial_chart_yscale((alluvial_summer_count)/alluvial_total_count))+ " " +
 
 String(summer.x.baseVal.value + summer.width.baseVal.value) + "," +
 String(summer.y.baseVal.value + alluvial_chart_yscale((alluvial_summer_gold_count+alluvial_summer_silver_count+alluvial_ind_summer_bronze_count)/alluvial_total_count))+ " " +
 
 String(ind.x.baseVal.value                          ) + "," +
 String(team.y.baseVal.value + alluvial_chart_yscale((alluvial_team_summer_gold_count+alluvial_team_winter_gold_count+alluvial_team_summer_silver_count+alluvial_team_winter_silver_count)/alluvial_total_count))+ " " +
 
 String(ind.x.baseVal.value                           ) + "," +
 String(team.y.baseVal.value + alluvial_chart_yscale((alluvial_team_summer_gold_count+alluvial_team_winter_gold_count+alluvial_team_summer_silver_count+alluvial_team_winter_silver_count+alluvial_team_summer_bronze_count)/alluvial_total_count))
 
  ,"rgba(205,127,50,0.5)"]
 )
//#####################################################################################################################################

 //poligono que vai do winter_gold para individual:


 r.push( [String(winter.x.baseVal.value + winter.width.baseVal.value) + "," +
 String(winter.y.baseVal.value + alluvial_chart_yscale(alluvial_ind_winter_gold_count/alluvial_total_count))+ " " +
 
 String(winter.x.baseVal.value + winter.width.baseVal.value) + "," +
 String(winter.y.baseVal.value                            )+ " " +
 
 String(ind.x.baseVal.value                          ) + "," +
 String(ind.y.baseVal.value + alluvial_chart_yscale(alluvial_ind_summer_gold_count/alluvial_total_count))+ " " +
 
 String(ind.x.baseVal.value                           ) + "," +
 String(ind.y.baseVal.value + alluvial_chart_yscale((alluvial_ind_summer_gold_count+alluvial_ind_winter_gold_count)/alluvial_total_count))
 
  ,"rgba(255,215,0,0.5)"]
 )
 
  //poligono que vai do winter_gold para team:
 
 
  r.push( [String(winter.x.baseVal.value + winter.width.baseVal.value) + "," +
  String(winter.y.baseVal.value + alluvial_chart_yscale(alluvial_winter_gold_count/alluvial_total_count))+ " " +
  
  String(winter.x.baseVal.value + winter.width.baseVal.value) + "," +
  String(winter.y.baseVal.value + alluvial_chart_yscale(alluvial_ind_winter_gold_count/alluvial_total_count))+ " " +
  
  String(team.x.baseVal.value                          ) + "," +
  String(team.y.baseVal.value + alluvial_chart_yscale(alluvial_team_summer_gold_count/alluvial_total_count))+ " " +
  
  String(team.x.baseVal.value                           ) + "," +
  String(team.y.baseVal.value + alluvial_chart_yscale((alluvial_team_summer_gold_count+alluvial_team_winter_gold_count)/alluvial_total_count))
  
   ,"rgba(255,215,0,0.5)"]
  )
 
 
   //poligono que vai do winter_silver para individual:
 
 
 r.push( [String(winter.x.baseVal.value + winter.width.baseVal.value) + "," +
 String(winter.y.baseVal.value + alluvial_chart_yscale((alluvial_winter_gold_count+alluvial_ind_winter_silver_count)/alluvial_total_count))+ " " +
 
 String(winter.x.baseVal.value + winter.width.baseVal.value) + "," +
 String(winter.y.baseVal.value + alluvial_chart_yscale(alluvial_winter_gold_count/alluvial_total_count))+ " " +
 
 String(ind.x.baseVal.value                          ) + "," +
 String(ind.y.baseVal.value + alluvial_chart_yscale((alluvial_ind_summer_gold_count+alluvial_ind_winter_gold_count+alluvial_ind_summer_silver_count)/alluvial_total_count))+ " " +
 
 String(ind.x.baseVal.value                           ) + "," +
 String(ind.y.baseVal.value + alluvial_chart_yscale((alluvial_ind_summer_gold_count+alluvial_ind_winter_gold_count+alluvial_ind_summer_silver_count+alluvial_ind_winter_silver_count)/alluvial_total_count))
 
  ,"rgba(211,211,211,0.7)"]
 )
 
  //poligono que vai do winter_silver para team:
 
 
  r.push( [String(winter.x.baseVal.value + winter.width.baseVal.value) + "," +
  String(winter.y.baseVal.value + alluvial_chart_yscale((alluvial_winter_gold_count+alluvial_winter_silver_count)/alluvial_total_count))+ " " +
  
  String(winter.x.baseVal.value + winter.width.baseVal.value) + "," +
  String(winter.y.baseVal.value + alluvial_chart_yscale((alluvial_winter_gold_count+alluvial_ind_winter_silver_count)/alluvial_total_count))+ " " +
  
  String(ind.x.baseVal.value                          ) + "," +
  String(team.y.baseVal.value + alluvial_chart_yscale((alluvial_team_summer_gold_count+alluvial_team_winter_gold_count+alluvial_team_summer_silver_count)/alluvial_total_count))+ " " +
  
  String(ind.x.baseVal.value                           ) + "," +
  String(team.y.baseVal.value + alluvial_chart_yscale((alluvial_team_summer_gold_count+alluvial_team_winter_gold_count+alluvial_team_summer_silver_count+alluvial_team_winter_silver_count)/alluvial_total_count))
  
   ,"rgba(211,211,211,0.7)"]
  )
 
 
    //poligono que vai do winter_bronze para individual:
 
 
 r.push( [String(winter.x.baseVal.value + winter.width.baseVal.value) + "," +
 String(winter.y.baseVal.value + alluvial_chart_yscale((alluvial_winter_gold_count+alluvial_winter_silver_count+alluvial_ind_winter_bronze_count)/alluvial_total_count))+ " " +
 
 String(winter.x.baseVal.value + winter.width.baseVal.value) + "," +
 String(winter.y.baseVal.value + alluvial_chart_yscale((alluvial_winter_gold_count+alluvial_winter_silver_count)/alluvial_total_count))+ " " +
 
 String(ind.x.baseVal.value                          ) + "," +
 String(ind.y.baseVal.value + alluvial_chart_yscale((alluvial_ind_summer_gold_count+alluvial_ind_winter_gold_count+alluvial_ind_summer_silver_count+alluvial_ind_winter_silver_count+alluvial_ind_summer_bronze_count)/alluvial_total_count))+ " " +
 
 String(ind.x.baseVal.value                           ) + "," +
 String(ind.y.baseVal.value + alluvial_chart_yscale((alluvial_ind_summer_gold_count+alluvial_ind_winter_gold_count+alluvial_ind_summer_silver_count+alluvial_ind_winter_silver_count+alluvial_ind_summer_bronze_count+alluvial_ind_winter_bronze_count)/alluvial_total_count))
 
  ,"rgba(205,127,50,0.5)"]
 )
 
  //poligono que vai do winter_bronze para team:
 
 
  r.push( [String(winter.x.baseVal.value + winter.width.baseVal.value) + "," +
  String(winter.y.baseVal.value + alluvial_chart_yscale((alluvial_winter_count)/alluvial_total_count))+ " " +
  
  String(winter.x.baseVal.value + winter.width.baseVal.value) + "," +
  String(winter.y.baseVal.value + alluvial_chart_yscale((alluvial_winter_gold_count+alluvial_winter_silver_count+alluvial_ind_winter_bronze_count)/alluvial_total_count))+ " " +
  
  String(ind.x.baseVal.value                          ) + "," +
  String(team.y.baseVal.value + alluvial_chart_yscale((alluvial_team_summer_gold_count+alluvial_team_winter_gold_count+alluvial_team_summer_silver_count+alluvial_team_winter_silver_count+alluvial_team_summer_bronze_count)/alluvial_total_count))+ " " +
  
  String(ind.x.baseVal.value                           ) + "," +
  String(team.y.baseVal.value + alluvial_chart_yscale((alluvial_team_summer_gold_count+alluvial_team_winter_gold_count+alluvial_team_summer_silver_count+alluvial_team_winter_silver_count+alluvial_team_summer_bronze_count+alluvial_team_winter_bronze_count)/alluvial_total_count))
  
   ,"rgba(205,127,50,0.5)"]
  )


return r

    ;}

  poligono_1 = build_polygon_data_1()

  svg_alluvial_chart.selectAll("polygon")
                    .data(poligono_1)
                    .join("polygon")
                    .attr("points", d => d[0])
                    .attr("fill", d => d[1])



  }

function brush_box_plots_height({selection}){
  if (selection == undefined){selected_height_max = height_max; selected_height_min = height_min}
  
  else{selected_height_max = box_plots_xscale_heights.invert(selection[1]); 
       selected_height_min = box_plots_xscale_heights.invert(selection[0])}

  update_dataset();
  update_line_from_pyramid();
  update_pyramid_from_line();
  update_cmap_from_others();
  update_alluvial_chart();
  update_max_events();
  update_sports_grid();
  update_events_list(true);
  ;}

function brush_box_plots_weight({selection}){
  if (selection == undefined){selected_weight_max = weight_max; selected_weight_min = weight_min}
    
  else{selected_weight_max = box_plots_xscale_weights.invert(selection[1]); 
       selected_weight_min = box_plots_xscale_weights.invert(selection[0])}

  update_dataset();
  update_line_from_pyramid();
  update_pyramid_from_line();
  update_cmap_from_others();
  update_alluvial_chart();
  update_max_events();
  update_sports_grid();
  update_events_list(true);
  ;}

function brush_box_plots_BMI({selection}){
  if (selection == undefined){selected_BMI_max = BMI_max; selected_BMI_min = BMI_min}
  
  else{selected_BMI_max = box_plots_xscale_BMIs.invert(selection[1]); 
       selected_BMI_min = box_plots_xscale_BMIs.invert(selection[0])}
  update_dataset();
  update_line_from_pyramid();
  update_pyramid_from_line();
  update_cmap_from_others();
  update_alluvial_chart();
  update_max_events();
  update_sports_grid();
  update_events_list(true);
  ;}

function generate_box_plots(){
  //gerar dados:

  heights = dataset_box_plots.map(d => d.Height).sort()
  weights = dataset_box_plots.map(d => d.Weight).sort()
  BMIs = dataset_box_plots.map(d => d.BMI.replace(",", ".")).sort()

  //quantis das alturas:

  height_min = d3.quantile(heights,0)
  height_1   = d3.quantile(heights,0.25)
  height_2   = d3.quantile(heights,0.5)
  height_3   = d3.quantile(heights,0.75)
  height_max = d3.quantile(heights,1)
  height_med = d3.mean(heights)
  
  //quantis dos pesos:

  weight_min = d3.quantile(weights,0)
  weight_1   = d3.quantile(weights,0.25)
  weight_2   = d3.quantile(weights,0.5)
  weight_3   = d3.quantile(weights,0.75)
  weight_max = d3.quantile(weights,1)
  weight_med = d3.mean(weights)

  //quantis dos bmis:

  BMI_min = d3.quantile(BMIs,0)
  BMI_1   = d3.quantile(BMIs,0.25)
  BMI_2   = d3.quantile(BMIs,0.5)
  BMI_3   = d3.quantile(BMIs,0.75)
  BMI_max = d3.quantile(BMIs,1)
  BMI_med = d3.mean(BMIs)



    //a partir daqui são as scales
  box_plots_xscale_heights = d3 
  .scaleLinear()
  .domain([height_min,height_max] )
  .range([30,box_plots_width-30] );

  box_plots_xscale_weights = d3 
  .scaleLinear()
  .domain([weight_min,weight_max] )
  .range([30,box_plots_width-30] );

  box_plots_xscale_BMIs = d3 
  .scaleLinear()
  .domain([BMI_min,BMI_max] )
  .range([30,box_plots_width-30] );


  box_plots_yscale = d3
  .scaleLinear()
  .domain([0,100] )
  .range([30,box_plots_height-30]);

  //gerar os box plots:
  var Gen = d3.line(); 

  svg_box_plots = d3
  .select("#box_plots")
  .append("svg") 
  .attr("width", box_plots_width)
  .attr("height", box_plots_height);

  svg_box_plots.append("text")
              .attr("x",5)
              .attr("y",3)
              .attr("dy", "1em")
              .attr("class", "label")
              .attr("font-family", "verdana")
              .attr("font-size","20px")
              .attr("font-weight","bold")
              .attr("id","Box_plots_title")
              .text("Medalists' Body Measures");

  svg_box_plots.append("text")
              .attr("x",box_plots_width/2 - 30)
              .attr("y",30)
              .attr("dy", "1em")
              .attr("class", "label")
              .attr("font-family", "verdana")
              .attr("font-size","18px")
              .attr("font-weight","bold")
              .attr("id","Box_plots_title_height")
              .text("Height")

  svg_box_plots.append("text")
              .attr("x",box_plots_width/2 - 30)
              .attr("y",125)
              .attr("dy", "1em")
              .attr("class", "label")
              .attr("font-family", "verdana")
              .attr("font-size","18px")
              .attr("font-weight","bold")
              .attr("id","Box_plots_title_weight")
              .text("Weight")

  svg_box_plots.append("text")
              .attr("x",box_plots_width/2 - 85)
              .attr("y",215)
              .attr("dy", "1em")
              .attr("class", "label")
              .attr("font-family", "verdana")
              .attr("font-size","18px")
              .attr("font-weight","bold")
              .attr("id","Box_plots_title_BMI")
              .text("Body Mass Index")


  //legenda
  var points_legenda = [  
                  [240, 42],  
                  
                  [285, 42]
                  ]; 
     var pathOfLine_legenda = Gen(points_legenda); 
     
     svg_box_plots.append("text")
    		.attr("x",200)
    		.attr("y", 45)
    		.attr("font-family", "verdana")
    		.attr("font-size", "11px")
    		.text("mean:");

     svg_box_plots.append('path')
                  .attr('d', pathOfLine_legenda)
                  .attr("stroke", "black")
                  .attr("id","box_plots_legenda")
                  .attr("stroke-width", 2)
                  .attr("fill", "none");

            

  //###############################################################################################################################3
  //alturas:

  svg_box_plots.append("g")
               .attr("id","box_plot_height")
               .call( d3.brushX()                    
               .extent( [ 
                 [box_plots_xscale_heights(height_min),box_plots_yscale(10)-22], 
                 [box_plots_xscale_heights(height_max),box_plots_yscale(10)+42] ] )
              
                 .on("end", brush_box_plots_height)
                 
               )   
               

  svg_box_plots.select("#box_plot_height")
               .append("rect")
               .attr("id","box_plot_height_rect")
               .attr("width", function (d) {return box_plots_xscale_heights(height_3) - box_plots_xscale_heights(height_1) ;})
               .attr("height", 40) 
               .attr("fill", "rgb(150,150,150)")
               .attr("x", function (d) {return box_plots_xscale_heights(height_1) ;} )
               .attr("y", function (d) {return box_plots_yscale(10)})


   
               
  var points = [  
               [box_plots_xscale_heights(height_min), box_plots_yscale(10) + 20],  
                
               [box_plots_xscale_heights(height_max), box_plots_yscale(10) + 20]
               ]; 
  var pathOfLine = Gen(points); 
  
  svg_box_plots.select("#box_plot_height")
               .append('path')
               .attr('d', pathOfLine)
               .attr("id","box_plots_height_horizontal_line")
               .attr("stroke", "black")
               .attr("stroke-width", 1)
               .attr("fill", "none");; 

  var points = [  
                [box_plots_xscale_heights(height_2), box_plots_yscale(10)],  
                 
                [box_plots_xscale_heights(height_2), box_plots_yscale(10) + 40]
                ]; 
   var pathOfLine = Gen(points); 
   
   svg_box_plots.select("#box_plot_height")
                .append('path')
                .attr('d', pathOfLine)
                .attr("id","box_plots_height_median_line")
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("fill", "none");; 


  var points = [  
                  [box_plots_xscale_heights(height_med), box_plots_yscale(10)],  
                   
                  [box_plots_xscale_heights(height_med), box_plots_yscale(10) + 40]
                  ]; 
     var pathOfLine = Gen(points); 
     
     svg_box_plots.select("#box_plot_height")
                  .append('path')
                  .attr('d', pathOfLine)
                  .attr("stroke", "black")
                  .attr("id","box_plots_height_mean_line")
                  .attr("stroke-width", 2)
                  .attr("fill", "none");; 

       var points = [  
                    [box_plots_xscale_heights(height_min), box_plots_yscale(10)+10],  
                     
                    [box_plots_xscale_heights(height_min), box_plots_yscale(10) + 30]
                    ]; 
       var pathOfLine = Gen(points); 
       
       svg_box_plots.select("#box_plot_height")
                    .append('path')
                    .attr('d', pathOfLine)
                    .attr("stroke", "black")
                    .attr("id","box_plots_height_min_line")
                    .attr("stroke-width", 1)
                    .attr("fill", "none");; 

      var points = [  
                      [box_plots_xscale_heights(height_max), box_plots_yscale(10)+10],  
                       
                      [box_plots_xscale_heights(height_max), box_plots_yscale(10) + 30]
                      ]; 
         var pathOfLine = Gen(points); 
         
         svg_box_plots.select("#box_plot_height")
                      .append('path')
                      .attr('d', pathOfLine)
                      .attr("stroke", "black")
                      .attr("id","box_plots_height_max_line")
                      .attr("stroke-width", 1)
                      .attr("fill", "none");; 

//vamos fazer um eixo:
box_plots_xaxis_height = d3
.axisBottom() 
.scale(box_plots_xscale_heights) 
.ticks(5)

svg_box_plots.append("g") 
.attr("transform", "translate(0,95)")
.attr("class", "xaxis")
.attr("id","box_plot_axis_height")
.call(box_plots_xaxis_height)


//###############################################################################################################################3
  //pesos:

  svg_box_plots.append("g")
               .attr("id","box_plot_weight")
               .call( d3.brushX()                     
               .extent( [ 
                 [box_plots_xscale_weights(weight_min),box_plots_yscale(50)-22], 
                 [box_plots_xscale_weights(weight_max),box_plots_yscale(50)+42] ] )
              
                 .on("end", brush_box_plots_weight)
               )  

  svg_box_plots.select("#box_plot_weight")
               .append("rect")
               .attr("id","box_plot_weight_rect")
               .attr("width", function (d) {return box_plots_xscale_weights(weight_3) - box_plots_xscale_weights(weight_1) ;})
               .attr("height", 40) 
               .attr("fill", "rgb(150,150,150)")
               .attr("x", function (d) {return box_plots_xscale_weights(weight_1) ;} )
               .attr("y", function (d) {return box_plots_yscale(50)})

  svg_box_plots.select("#box_plot_weight")
               .append("text")
               .attr("x",50)
               .attr("y",box_plots_yscale(50) - 20)
               .attr("dy", "1em")
               .attr("class", "label")
               .attr("font-family", "verdana")
               .attr("font-size","12px")
               .attr("font-weight","bold")
               .attr("id","Box_plots_weight")
               .text("Weight")
  
               
  var points = [  
               [box_plots_xscale_weights(weight_min), box_plots_yscale(50) + 20],  
                
               [box_plots_xscale_weights(weight_max), box_plots_yscale(50) + 20]
               ]; 
  var pathOfLine = Gen(points); 
  
  svg_box_plots.select("#box_plot_weight")
               .append('path')
               .attr('d', pathOfLine)
               .attr("stroke", "black")
               .attr("id","box_plots_weight_horizontal_line")
               .attr("stroke-width", 1)
               .attr("fill", "none");; 

  var points = [  
                [box_plots_xscale_weights(weight_2), box_plots_yscale(50)],  
                 
                [box_plots_xscale_weights(weight_2), box_plots_yscale(50) + 40]
                ]; 
   var pathOfLine = Gen(points); 
   
   svg_box_plots.select("#box_plot_weight")
                .append('path')
                .attr('d', pathOfLine)
                .attr("stroke", "black")
                .attr("id","box_plots_weight_median_line")
                .attr("stroke-width", 1)
                .attr("fill", "none");; 


  var points = [  
                  [box_plots_xscale_weights(weight_med), box_plots_yscale(50)],  
                   
                  [box_plots_xscale_weights(weight_med), box_plots_yscale(50) + 40]
                  ]; 
     var pathOfLine = Gen(points); 
     
     svg_box_plots.select("#box_plot_weight")
                  .append('path')
                  .attr('d', pathOfLine)
                  .attr("stroke", "black")
                  .attr("id","box_plots_weight_mean_line")
                  .attr("stroke-width", 2)
                  .attr("fill", "none");


      var points = [  
                    [box_plots_xscale_weights(weight_min), box_plots_yscale(50)+10],  
                     
                    [box_plots_xscale_weights(weight_min), box_plots_yscale(50) + 30]
                    ]; 
       var pathOfLine = Gen(points); 
       
       svg_box_plots.select("#box_plot_weight")
                    .append('path')
                    .attr('d', pathOfLine)
                    .attr("stroke", "black")
                    .attr("id","box_plots_weight_min_line")
                    .attr("stroke-width", 1)
                    .attr("fill", "none");; 

      var points = [  
                      [box_plots_xscale_weights(weight_max), box_plots_yscale(50)+10],  
                       
                      [box_plots_xscale_weights(weight_max), box_plots_yscale(50) + 30]
                      ]; 
         var pathOfLine = Gen(points); 
         
         svg_box_plots.select("#box_plot_weight")
                      .append('path')
                      .attr('d', pathOfLine)
                      .attr("stroke", "black")
                      .attr("id","box_plots_weight_max_line")
                      .attr("stroke-width", 1)
                      .attr("fill", "none");; 
//vamos fazer um eixo:
box_plots_xaxis_weight = d3
.axisBottom() 
.scale(box_plots_xscale_weights) 
.ticks(5)

svg_box_plots.append("g")
.attr("transform", "translate(0,191)")
.attr("class", "xaxis") 
.attr("id","box_plot_axis_weight")
.call(box_plots_xaxis_weight)

//###############################################################################################################################3
  //BMIs:

  svg_box_plots.append("g")
               .attr("id","box_plot_BMI")
               .call( d3.brushX()                     
               .extent( [ 
                 [box_plots_xscale_BMIs(BMI_min),box_plots_yscale(87)-22], 
                 [box_plots_xscale_BMIs(BMI_max),box_plots_yscale(87)+42] ] )
              
                 .on("end", brush_box_plots_BMI)
               )  


  svg_box_plots.select("#box_plot_BMI")
               .append("rect")
               .attr("id","box_plot_BMI_rect")
               .attr("width", function (d) {return box_plots_xscale_BMIs(BMI_3) - box_plots_xscale_BMIs(BMI_1) ;})
               .attr("height", 40) 
               .attr("fill", "rgb(150,150,150)")
               .attr("x", function (d) {return box_plots_xscale_BMIs(BMI_1) ;} )
               .attr("y", function (d) {return box_plots_yscale(87)})
  
               
  var points = [  
               [box_plots_xscale_BMIs(BMI_min), box_plots_yscale(87) + 20],  
                
               [box_plots_xscale_BMIs(BMI_max), box_plots_yscale(87) + 20]
               ]; 
  var pathOfLine = Gen(points); 
  
  svg_box_plots.select("#box_plot_BMI")
               .append('path')
               .attr('d', pathOfLine)
               .attr("stroke", "black")
               .attr("id","box_plots_BMI_horizontal_line")
               .attr("stroke-width", 1)
               .attr("fill", "none");; 

  var points = [  
                [box_plots_xscale_BMIs(BMI_2), box_plots_yscale(87)],  
                 
                [box_plots_xscale_BMIs(BMI_2), box_plots_yscale(87) + 40]
                ]; 
   var pathOfLine = Gen(points); 
   
   svg_box_plots.select("#box_plot_BMI")
                .append('path')
                .attr('d', pathOfLine)
                .attr("stroke", "black")
                .attr("id","box_plots_BMI_median_line")
                .attr("stroke-width", 1)
                .attr("fill", "none");; 


  var points = [  
                  [box_plots_xscale_BMIs(BMI_med), box_plots_yscale(87)],  
                   
                  [box_plots_xscale_BMIs(BMI_med), box_plots_yscale(87) + 40]
                  ]; 
     var pathOfLine = Gen(points); 
     
     svg_box_plots.select("#box_plot_BMI")
                  .append('path')
                  .attr('d', pathOfLine)
                  .attr("stroke", "black")
                  .attr("id","box_plots_BMI_mean_line")
                  .attr("stroke-width", 2)
                  .attr("fill", "none");; 


        var points = [  
                    [box_plots_xscale_BMIs(BMI_min), box_plots_yscale(87)+10],  
                     
                    [box_plots_xscale_BMIs(BMI_min), box_plots_yscale(87) + 30]
                    ]; 
       var pathOfLine = Gen(points); 
       
       svg_box_plots.select("#box_plot_BMI")
                    .append('path')
                    .attr('d', pathOfLine)
                    .attr("stroke", "black")
                    .attr("id","box_plots_BMI_min_line")
                    .attr("stroke-width", 1)
                    .attr("fill", "none");; 

      var points = [  
                      [box_plots_xscale_BMIs(BMI_max), box_plots_yscale(87)+10],  
                       
                      [box_plots_xscale_BMIs(BMI_max), box_plots_yscale(87) + 30]
                      ]; 
         var pathOfLine = Gen(points); 
         
         svg_box_plots.select("#box_plot_BMI")
                      .append('path')
                      .attr('d', pathOfLine)
                      .attr("stroke", "black")
                      .attr("id","box_plots_BMI_max_line")
                      .attr("stroke-width", 1)
                      .attr("fill", "none");; 

//vamos fazer um eixo:
box_plots_xaxis_BMI = d3
.axisBottom() 
.scale(box_plots_xscale_BMIs) 
.ticks(5)

svg_box_plots.append("g") 
.attr("transform", "translate(0,280)")
.attr("class", "xaxis") 
.attr("id","box_plot_axis_BMI")
.call(box_plots_xaxis_BMI)

}

function position_in_grid(array_pos,num_rows, num_cols){ //get the position in the grid given the position in an array
	let quotient = Math.floor(array_pos/num_cols)
	let remainder = array_pos%num_cols

	return [remainder,quotient]
}


function remove_spaces_names(name){
	return name.replace(/ /g, '');
}

function generate_sports_grid(){


    number_columns = Math.ceil(Math.sqrt(selected_sports.length))

    remainder = selected_sports.length%number_columns //vai ser util, agora nao, mas vai ser
    number_rows = Math.ceil(selected_sports.length/number_columns)

    let rect_x = 385/number_columns; //dimensions of the rectangles
	let rect_y = 290/number_rows;

	let data_sports_aux = d3.rollup(dataset_sports, d => d.length, d => d.Sport);
	var data_grid = []
		for (i in Array.from(data_sports_aux.keys())){
		    let sports_aux = Array.from(data_sports_aux.keys())[i]
		  if(data_sports_aux.get(sports_aux) > 0){
		    data_grid.push([sports_aux, data_sports_aux.get(sports_aux)])
		  }
		  
		}

    var convert_sport_name = {}
    for (i in sports){
    	convert_sport_name[remove_spaces_names(sports[i])] = sports[i]
    }

//agora colocamos por ordem:
data_grid = data_grid.sort(function(a, b){return b[1]-a[1];})


	//grid
    svg_sports_grid = d3.select("#sports_grid")
              .append("svg") 
              .attr("width", sports_grid_width-15)
              .attr("height", sports_grid_height)
              

    //título
    svg_sports_grid.append("text")
			    .attr("dy", "1em")
			    .attr("class", "label")
			    .attr("font-family", "verdana")
			    .attr("font-size","21px")
			    .attr("font-weight","bold")
			    .attr("id","Sports_grid_title")
			    .attr("x", 55)
			    .text("Medals won per Sport");



//tooltip
var tooltip_sports = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("font-family", "verdana")
    .style("background","rgba(210,210,210,0.9)")
    //.style("background","rgba(150,150,150,0.9)")
    .style("padding", "3px");


	    svg_sports_grid.selectAll(".cell_color")
			.data(d => data_grid)
	        .enter()
	        .append("rect")
	        .attr("id", d => "color"+ remove_spaces_names(d[0]))
	        .attr("width", rect_x)
		    .attr("height", rect_y)
		    .attr("x", (d,i) => position_in_grid(i,number_rows, number_columns)[0]*rect_x)
		    .attr("y", (d,i) => position_in_grid(i,number_rows, number_columns)[1]*rect_y)
		    .attr("transform", "translate(0,30)")
		    .attr("fill", d => "white")
		    .style("opacity", 0.4)
	        .attr("class", "cell_color")


	    svg_sports_grid.selectAll(".cell_image")
			.data(d => data_grid)
	        .enter()
	        .append('svg:image')
			.attr("xlink:href", function(d) {
				return "sports_icons/" + d[0] + ".png"})
	        .attr("id", d => "image"+ remove_spaces_names(d[0]))
	        .attr("width", rect_x)
		    .attr("height",  rect_y)
		    .attr("x", (d,i) => position_in_grid(i,number_rows, number_columns)[0]*rect_x)
		    .attr("y", (d,i) => position_in_grid(i,number_rows, number_columns)[1]*rect_y)
		    .attr("transform", "translate(0,30)")
	        .attr("class", "cell_image");


	    svg_sports_grid.selectAll(".cell_border")
			.data(d => data_grid)
	        .enter()
	        .append('rect')
	        .attr("id", d => "border"+ remove_spaces_names(d[0]))
	        .attr("width", rect_x)
		    .attr("height", rect_y)
		    .attr("x", (d,i) => position_in_grid(i,number_rows, number_columns)[0]*rect_x)
		    .attr("y", (d,i) => position_in_grid(i,number_rows, number_columns)[1]*rect_y)
		    .attr("transform", "translate(0,30)")
	        .attr("class", "cell_border")
	        .attr("fill", "transparent")
	        .attr("stroke", "black")
	        .attr("stroke-width", 1);

	        
	    svg_sports_grid.selectAll(".cell_border")

	    	.on('mousemove', function (d) {
	    			d3.select("#"+d.srcElement.id)
    			  .attr("stroke-width", 4);



		    	return tooltip_sports.style("visibility", "visible")
						  .style("top", (event.pageY-10)+"px")
						  .style("left",(event.pageX+10)+"px")
						  .html("Sport: " + convert_sport_name[d.srcElement.id.slice(6)] + "<br/>" + "Number of medals: " + data_sports_aux.get(convert_sport_name[d.srcElement.id.slice(6)]));
	    	
	    		
	      })

	         .on('mouseout', function (d) { 
	         	d3.select("#"+d.srcElement.id)
    			  .attr("stroke-width", 1);

    		if (selected_sports != sports && selected_sports.includes(convert_sport_name[d.srcElement.id.slice(6)])){
    			d3.select("#"+d.srcElement.id)
    			  .attr("stroke-width", 4);
    		}

    		else{
    			if (selected_sports == sports){
    				d3.select("#"+d.srcElement.id)
    			       .attr("stroke-width", 1);
    			}
    			else{
    				
    			}

    		}

	         	tooltip_sports.style("visibility", "hidden");

	         	})
				       
	     
	    .on('click', function (d) {

	    	selected_sport = convert_sport_name[d.srcElement.id.slice(6)];
	
	    dispatch.call("select_sport", this);  
    			update_dataset();
	    		update_line_from_pyramid();
	   			update_pyramid_from_cmap();
	            update_cmap_from_others();
	            update_alluvial_chart();
	            update_box_plots();
	            update_max_events();
	            update_events_list(true);



	    })
	        




};


var BrowserText = (function () {
  var canvas = document.createElement('canvas'),
      context = canvas.getContext('2d');

 
  function getWidth(text, fontSize, fontFace) {
      context.font = fontSize + 'px ' + fontFace;
      return context.measureText(text).width;
  }

  return {
      getWidth: getWidth
  };
})();


function generate_max_events(){

var max_events_aux2 = d3.rollup(dataset_max_events, d => d.length, d => d.Event);

max_events_aux = []
max_events_aux.push(["No event", 0])
max_events_aux.push(["No event", 0])
max_events_aux.push(["No event", 0])
for (i in Array.from(max_events_aux2.keys())){
    let event_aux = Array.from(max_events_aux2.keys())[i]
  if(max_events_aux2.get(event_aux) > 0){
    max_events_aux.push([event_aux, max_events_aux2.get(event_aux)])
  }
  
}

//agora colocamos por ordem:
max_events_aux = max_events_aux.sort(function(a, b){return b[1]-a[1];})

//tooltip
var tooltip_max_events = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("font-family", "verdana")
    .style("background","rgba(210,210,210,0.9)")
    .style("padding", "3px");


//fazer o svg
svg_max_events = d3
.select("#max_events")
.append("svg") 
.attr("width", max_events_width)
.attr("height", max_events_height);

svg_max_events.append("text")
            .attr("x",20)
            .attr("y",3)
            .attr("dy", "1em")
            .attr("class", "label")
            .attr("font-family", "verdana")
            .attr("font-size","21px")
            .attr("font-weight","bold")
            .attr("id","Box_plots_title")
            .text("Events with Most Medals");

//fazer o pódio:
const width_podio = 60
const height_1 = 100
const x_1 = 140

const height_2 = 70
const x_2 = 50

const height_3 = 40
const x_3 = 230
//número 1:################################################################################################################
svg_max_events.append("g")
             .attr("id","max_events_1") 

             .on("mouseover",function(event,d){
              num_medals = max_events_aux[0][1];
              
              tooltip_max_events.style("visibility", "visible")
                .style("top", (event.pageY-10)+"px")
                 .style("left",(event.pageX+10)+"px")
                 .html("Medals won: " + String(num_medals))
              })
            .on("mouseout", function(event,d){  
              tooltip_max_events.style("visibility", "hidden"); })

            .on("click",function(){dispatch.call("click_max_events",this,0)
                                    update_dataset();
                                    update_line_from_pyramid();
                                    update_pyramid_from_line();
                                    update_cmap_from_others();
                                    update_alluvial_chart();
                                    update_box_plots();
                                    update_sports_grid();
                                    update_events_list(false);
                                    });
                             


svg_max_events.select("#max_events_1")
             .append("rect")
             .attr("id","max_events_1_rect_1")
             .attr("width", function (d) {return width_podio  ;})
             .attr("height", height_1) 
             .attr("fill", "rgba(255,215,0,0.5)")
             .attr("x", function (d) {return x_1 ;} )
             .attr("y", function (d) {return max_events_height - height_1 - 10})

svg_max_events.select("#max_events_1")
             .append("rect")
             .attr("id","max_events_1_rect_2")
             .attr("width", function (d) {return width_podio + 20 ;})
             .attr("height", 10) 
             .attr("fill", "rgba(255,215,0,0.5)")
             .attr("x", function (d) {return x_1 - 10  ;} )
             .attr("y", function (d) {return max_events_height - 10})

svg_max_events.select("#max_events_1")
             .append("rect")
             .attr("id","max_events_1_rect_3")
             .attr("width", function (d) {return width_podio + 20 ;})
             .attr("height", 10) 
             .attr("fill", "rgba(255,215,0,0.5)")
             .attr("x", function (d) {return x_1 - 10 ;} )
             .attr("y", function (d) {return max_events_height - height_1 - 20})

svg_max_events.select("#max_events_1")
              .append("text")
              .attr("x",x_1 + width_podio/2 - 11)
              .attr("y",max_events_height - height_1/2 - 45)
              .attr("dy", "1em")
              .attr("class", "label")
              .attr("font-family", "verdana")
              .attr("font-size","32px")
              .attr("font-weight","bold")
              .attr("id","max_events_1")
              .text("1");

var text_aux   = max_events_aux[0][0].split(" ");
var text_aux_1 = text_aux.slice(0,Math.ceil(text_aux.length/2)).join(" ");
var text_aux_2 = text_aux.slice(Math.ceil(text_aux.length/2)).join(" ");

svg_max_events.select("#max_events_1")
              .append("text")
              .attr("x",x_1 + width_podio/2  - BrowserText.getWidth(text_aux_1, 12, "verdana")/2)
              .attr("y",max_events_height - height_1 - 55)
              .attr("dy", "1em")
              .attr("class", "label")
              .attr("font-family", "verdana")
              .attr("font-size","12px")
              .attr("id","max_events_1_1")
              .text(text_aux_1);

svg_max_events.select("#max_events_1")
              .append("text")
              .attr("x",x_1 + width_podio/2  - BrowserText.getWidth(text_aux_2, 12, "verdana")/2)
              .attr("y",max_events_height - height_1 - 40)
              .attr("dy", "1em")
              .attr("class", "label")
              .attr("font-family", "verdana")
              .attr("font-size","12px")
              .attr("id","max_events_1_2")
              .text(text_aux_2);


//número 2:################################################################################################################
svg_max_events.append("g")
             .attr("id","max_events_2")   
             .on("mouseover",function(event,d){
              num_medals = max_events_aux[1][1];
              
              tooltip_max_events.style("visibility", "visible")
                .style("top", (event.pageY-10)+"px")
                 .style("left",(event.pageX+10)+"px")
                 .html("Medals won: " + String(num_medals))
              })
            .on("mouseout", function(event,d){  
              tooltip_max_events.style("visibility", "hidden"); })

            .on("click",function(){dispatch.call("click_max_events",this,1)
                                    update_dataset();
                                    update_line_from_pyramid();
                                    update_pyramid_from_line();
                                    update_cmap_from_others();
                                    update_alluvial_chart();
                                    update_box_plots();
                                    update_sports_grid();
                                    update_events_list(false);
                                    });           


svg_max_events.select("#max_events_2")
             .append("rect")
             .attr("id","max_events_2_rect_1")
             .attr("width", function (d) {return width_podio  ;})
             .attr("height", height_2) 
             .attr("fill", "rgba(211,211,211,0.7)")
             .attr("x", function (d) {return x_2 ;} )
             .attr("y", function (d) {return max_events_height - height_2 - 10})

svg_max_events.select("#max_events_2")
             .append("rect")
             .attr("id","max_events_2_rect_2")
             .attr("width", function (d) {return width_podio + 20 ;})
             .attr("height", 10) 
             .attr("fill", "rgba(211,211,211,0.7)")
             .attr("x", function (d) {return x_2 - 10  ;} )
             .attr("y", function (d) {return max_events_height - 10})

svg_max_events.select("#max_events_2")
             .append("rect")
             .attr("id","max_events_2_rect_3")
             .attr("width", function (d) {return width_podio + 20 ;})
             .attr("height", 10) 
             .attr("fill", "rgba(211,211,211,0.7)")
             .attr("x", function (d) {return x_2 - 10 ;} )
             .attr("y", function (d) {return max_events_height - height_2 - 20})

svg_max_events.select("#max_events_2")
              .append("text")
              .attr("x",x_2 + width_podio/2 - 11)
              .attr("y",max_events_height - height_2/2 - 35)
              .attr("dy", "1em")
              .attr("class", "label")
              .attr("font-family", "verdana")
              .attr("font-size","32px")
              .attr("font-weight","bold")
              .attr("id","max_events_2")
              .text("2");

var text_aux   = max_events_aux[1][0].split(" ");
var text_aux_1 = text_aux.slice(0,Math.ceil(text_aux.length/2)).join(" ");
var text_aux_2 = text_aux.slice(Math.ceil(text_aux.length/2)).join(" ");

svg_max_events.select("#max_events_2")
              .append("text")
              .attr("x",x_2 + width_podio/2  - BrowserText.getWidth(text_aux_1, 12, "verdana")/2)
              .attr("y",max_events_height - height_2 - 55)
              .attr("dy", "1em")
              .attr("class", "label")
              .attr("font-family", "verdana")
              .attr("font-size","12px")
              .attr("id","max_events_2_1")
              .text(text_aux_1);

svg_max_events.select("#max_events_2")
              .append("text")
              .attr("x",x_2 + width_podio/2  - BrowserText.getWidth(text_aux_2, 12, "verdana")/2)
              .attr("y",max_events_height - height_2 - 40)
              .attr("dy", "1em")
              .attr("class", "label")
              .attr("font-family", "verdana")
              .attr("font-size","12px")
              .attr("id","max_events_2_2")
              .text(text_aux_2);
        

//número 3:################################################################################################################
svg_max_events.append("g")
             .attr("id","max_events_3")   

             .on("mouseover",function(event,d){
              num_medals = max_events_aux[2][1];
              
              tooltip_max_events.style("visibility", "visible")
                .style("top", (event.pageY-10)+"px")
                 .style("left",(event.pageX+10)+"px")
                 .html("Medals won: " + String(num_medals))
            
              })
            .on("mouseout", function(event,d){  
              tooltip_max_events.style("visibility", "hidden"); })

             .on("click",function(){dispatch.call("click_max_events",this,2)
                                    update_dataset();
                                    update_line_from_pyramid();
                                    update_pyramid_from_line();
                                    update_cmap_from_others();
                                    update_alluvial_chart();
                                    update_box_plots();
                                    update_sports_grid();
                                    update_events_list(false);
                                    })                      


svg_max_events.select("#max_events_3")
             .append("rect")
             .attr("id","max_events_3_rect_1")
             .attr("width", function (d) {return width_podio  ;})
             .attr("height", height_3) 
             .attr("fill", "rgba(205,127,50,0.5)")
             .attr("x", function (d) {return x_3 ;} )
             .attr("y", function (d) {return max_events_height - height_3 - 10})

svg_max_events.select("#max_events_3")
             .append("rect")
             .attr("id","max_events_3_rect_2")
             .attr("width", function (d) {return width_podio + 20 ;})
             .attr("height", 10) 
             .attr("fill", "rgba(205,127,50,0.5)")
             .attr("x", function (d) {return x_3 - 10  ;} )
             .attr("y", function (d) {return max_events_height - 10})

svg_max_events.select("#max_events_3")
             .append("rect")
             .attr("id","max_events_3_rect_3")
             .attr("width", function (d) {return width_podio + 20 ;})
             .attr("height", 10) 
             .attr("fill", "rgba(205,127,50,0.5)")
             .attr("x", function (d) {return x_3 - 10 ;} )
             .attr("y", function (d) {return max_events_height - height_3 - 20})

svg_max_events.select("#max_events_3")
              .append("text")
              .attr("x",x_3 + width_podio/2 - 11)
              .attr("y",max_events_height - height_3/2 - 30)
              .attr("dy", "1em")
              .attr("class", "label")
              .attr("font-family", "verdana")
              .attr("font-size","32px")
              .attr("font-weight","bold")
              .attr("id","max_events_3")
              .text("3");

var text_aux   = max_events_aux[2][0].split(" ");
var text_aux_1 = text_aux.slice(0,Math.ceil(text_aux.length/2)).join(" ");
var text_aux_2 = text_aux.slice(Math.ceil(text_aux.length/2)).join(" ");

svg_max_events.select("#max_events_3")
              .append("text")
              //.attr("x",x_2 + width_podio/2  - BrowserText.getWidth(max_events_aux[1][0], 12, "verdana")/2)
              .attr("x",x_3 + width_podio/2  - BrowserText.getWidth(text_aux_1, 12, "verdana")/2)
              .attr("y",max_events_height - height_3 - 55)
              .attr("dy", "1em")
              .attr("class", "label")
              .attr("font-family", "verdana")
              .attr("font-size","12px")
              .attr("id","max_events_3_1")
              .text(text_aux_1);

svg_max_events.select("#max_events_3")
              .append("text")
              .attr("x",x_3 + width_podio/2  - BrowserText.getWidth(text_aux_2, 12, "verdana")/2)
              .attr("y",max_events_height - height_3 - 40)
              .attr("dy", "1em")
              .attr("class", "label")
              .attr("font-family", "verdana")
              .attr("font-size","12px")
              .attr("id","max_events_3_2")
              .text(text_aux_2);
}


function generate_events_list(){


var events_list_aux2 = d3.rollup(dataset_max_events, d => d.length, d => d.Event);

events_list_aux = []

for (i in Array.from(events_list_aux2.keys())){
    let ev_aux = Array.from(events_list_aux2.keys())[i]
    events_list_aux.push([ev_aux, events_list_aux2.get(ev_aux)])
  
  
}

//var events_list_aux2 = dataset_max_events.map(d => d.Event).filter(unique)

//agora colocamos por ordem:
events_list_aux = events_list_aux.sort()
events_list_permanent = events_list_aux//(function(a, b){return b[1]-a[1];})


 //tooltip
              var tooltip_events_list = d3.select("body")
              .append("div")
              .style("position", "absolute")
              .style("z-index", "10")
              .style("visibility", "hidden")
              .style("font-family", "verdana")
              .style("background","rgba(210,210,210,0.9)")
              .style("padding", "3px");

//fazer o svg
svg_events_list_aux = d3
.select("#events_list_aux")
.append("svg") // we are appending an svg to the div 'line_chart'
.attr("width", events_list_aux_width)
.attr("height", events_list_aux_height);

svg_events_list_aux.append("text")
            .attr("x",75)
            .attr("y",3)
            .attr("dy", "1em")
            .attr("class", "label")
            .attr("font-family", "verdana")
            .attr("font-size","21px")
            .attr("font-weight","bold")
            .attr("id","events_list_title")
            .text("Medals won per Event");

//#############################################################################################################################
svg_events_list = d3
.select("#events_list")
.append("svg") // we are appending an svg to the div 'line_chart'
.attr("width", events_list_width)
.attr("height", events_list_height);

events_list_scroll_count = 0

svg_events_list.append("g")
            .attr("id","events_list_g") 
            .on("mousewheel.zoom",function(){tooltip_events_list.remove()
                                            dispatch.call("events_list_scroll",this,event);
                                            update_events_list(false)})
            
  for (i in events_list_permanent){

  svg_events_list.select("#events_list_g")
                .append("rect")
                .attr("id","events_list_rect_" + String(i))
                .attr("width", function (d) {return events_list_width - 40  ;})
                .attr("height", 20) 
                .attr("fill", "rgba(240,240,240,1)")
                .attr("x", function (d) {return 20 ;} )
                .attr("y", function (d) {return  20*(i-events_list_scroll_count)})
                .on("mouseover",function(event,d){
       
                  tooltip_events_list.style("visibility", "visible")
                    .style("top", (event.pageY-10)+"px")
                     .style("left",(event.pageX+10)+"px")
                     .html("Event: " + events_list_aux[this.id.slice(17)][0] + "<br/>" + "Number of medals: " +events_list_aux[this.id.slice(17)][1])})
                    //.html(events_list_permanent[this.id.slice(17)][0] +"<br>" + events_list_permanent[this.id.slice(17)][1] )})

                .on("mouseout",function(){tooltip_events_list.style("visibility", "hidden");})

                .on("click",function(){tooltip_events_list.remove()
                  dispatch.call("events_list_click",this)
                                        update_dataset();
                                        update_line_from_pyramid();
                                        update_pyramid_from_line();
                                        update_cmap_from_others();
                                        update_alluvial_chart();
                                        update_box_plots();
                                        update_events_list(false);
                                        update_sports_grid();})

  svg_events_list.select("#events_list_g")
                .append("text")
                .attr("x",30)
                .attr("y",20*(i-events_list_scroll_count) + 2)
                .attr("dy", "1em")
                .attr("class", "label")
                .attr("font-family", "verdana")
                .attr("font-size","12px")
                .attr("font-weight","bold")
                .attr("id","events_list_text_" + String(i))
                .text(events_list_permanent[i][0].slice(0,48))
                .on("click",function(){tooltip_events_list.remove()
                                        dispatch.call("events_list_click",this)
                                        update_dataset();
                                        update_line_from_pyramid();
                                        update_pyramid_from_line();
                                        update_cmap_from_others();
                                        update_alluvial_chart();
                                        update_box_plots();
                                        update_events_list(false);
                                        update_sports_grid();})
                .on("mouseover",function(event,d){
       
                   tooltip_events_list.style("visibility", "visible")
                                       .style("top", (event.pageY-10)+"px")
                                       .style("left",(event.pageX+10)+"px")
                                       .html("Event: " + events_list_permanent[this.id.slice(17)][0] + "<br/>" + "Number of Medals: " +events_list_permanent[this.id.slice(17)][1])})
                
                .on("mouseout",function(){tooltip_events_list.style("visibility", "hidden");})

}
//fazer a scroll bar:

box_plots_yscale = d3
.scaleLinear()
.domain([0,events_list_aux.length] )
.range([0,events_list_height - (11/events_list_aux.length)*events_list_height]);

svg_events_list.append("rect")
                .attr("id","events_list_scroll_bar")
                .attr("width", function (d) {return 16  ;})
                .attr("height", box_plots_yscale(11)) 
                .attr("fill", "rgb(0,0,0)")
                .attr("x", function (d) {return events_list_width-18 ;} )
                .attr("y", function (d) {return  box_plots_yscale(events_list_scroll_count)})


svg_events_list.append("rect")
                .attr("id","events_list_scroll_bar_aux")
                .attr("width", function (d) {return 22  ;})
                .attr("height", events_list_height) 
                .attr("fill", "rgba(0,0,0,0)")
                .attr("x", function (d) {return events_list_width-22 ;} )
                .attr("y", function (d) {return  0})
                .on("click",function(){tooltip_events_list.remove()
                                      dispatch.call("events_list_scroll_bar");
                                      update_events_list(false)})
                .on("mousewheel.zoom",function(){tooltip_events_list.remove()
                                      dispatch.call("events_list_scroll",this,event);
                                      update_events_list(false)})

}
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//===========================================================================================================
//                                                                                                     RESETS
//===========================================================================================================
//Gerar botão de reset:


function generate_buttonReset(){

d3.select("#RESET").on("click", function (){
	dispatch.call("click_reset_button")
});

};

