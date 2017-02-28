var gui;
var opAmps_ids;
var scenes_buses;

var pan_zoom_main;
var palette = chroma.brewer.Set1;
var vectors_array;
var scenes;
var buses;
var image;
var is_image;
document.body.style.backgroundColor = "#222";
document.body.style.overflow = "hidden";
document.body.style.fontFamily = "monospace";
document.body.style.color = "white";
// Snap.load()
var width;
width  = innerWidth;
width  = 800;
var height;	
height = innerWidth;
height = 600;
var paper = Snap(width,height);
paper.attr('id','paper');
var paper_svg = document.querySelector('svg');
paper_svg.style.position = 'absolute';
paper_svg.style.top      = '0px';
paper_svg.style.left     = '0px';
Snap.load("great scott 555.svg",init)
var vectors_layer;
var group_lines;
function init(argument) {
	// console.log("argument : ",argument);
	// var node = argument.node;
	// console.log("node : ",node);
	// document.body.appendChild(node);
	// var s = Snap(node);
	// paper.append(argument)
	var fragment = paper.append(argument);
	group_lines = paper.g();
	fragment.node.style.backgroundColor = '#222';
	/////////////////////////////////////////////////
	/////////////////////////////////////////////////
	/////////////////////////////////////////////////
	/////////////////////////////////////////////////
	is_image = true;
	is_image = false;
	image = paper.select("#image")
	if(!is_image&&image)image.attr("display","none");
	// console.log("children : ",children);
	var main = paper.select("#great_scott_555")
	// console.log("main : ",main);
	var children = main.children();
	children.forEach(function (argument) {
		// console.log("argument : ",argument);
		// body...
	})
	vectors_layer = main.select("#vectors");

	// vectors_layer.drag();
	// vectors_layer.attr('stroke','none');
	// vectors_layer.attr('fill','none');

	var ided = vectors_layer.selectAll("[id]");
	// var first_level = vectors_layer.selectAll("*");
	// console.log("first_level : ",first_level);
	// console.log("ided : ",ided.length);
	// console.log("ided : ",ided);
	// console.log("vectors_layer : ",vectors_layer);
	var vectors = vectors_layer.children();
	// console.log("vectors : ",vectors.length);
	// _.filter(vectors_layer,)
	var nulled=[];
	var children=[];
	ided.forEach(function (argument) {
		// console.log("argument : ",argument);
		var id = argument.attr('id');
		var node = argument.node;
		// console.log("id : ",id);		console.log("node : ",node);
		if(id){
			// console.log("id : ",id);
			children.push(argument);
			// console.log('---------------');
			if(argument.type==='g'){
				argument.children().forEach(function (child) {
					// console.log("child : ",child);
					// child.attr('stroke','white');
					// console.log("child : ",child.type);
					// if(child.type!=='path' && child.attr &&child.attr('stroke'))child.attr('stroke','white');
				})
			}
		}else{
			nulled.push(argument);
		}
	})
	// console.log("nulled : ",nulled);
	/*
	var vectors_layer_clone = vectors_layer.clone();
	console.log("vectors_layer_clone : ",vectors_layer_clone);
	vectors_layer_clone.attr('transform','translate(10,0)')
	vectors_layer_clone.attr('transform','scale(1.5,1.5)');
	vectors_layer_clone.drag();
	*/
	// paper.drag();
	vectors_array = _.filter(ided,function (argument) {
		return argument.type!=='tspan';
	})
	// console.log("vectors_array : ",vectors_array.length);
	// console.log("vectors_array : ",vectors_array);
	// gui.close();
	// paper.prepend(group_lines);
	// group_lines.drag();
	var paper_id = paper.attr('id');
	// console.log("paper_id : ",paper_id);

	draw_color(vectors_array,'white');
	var parts_timeline = new TimelineMax();
	// set_animation(group_lines,parts_timeline,vectors_array);
	/*
	var folder_all = gui.addFolder("all");
	add_gui();
	function add_gui() {
		vectors_array.forEach(function (element,j) {
			folder_all.add({f: (x)=> {
				var id = element.attr('id');
				console.log("id : ",id);
				var element_ = vectors_layer.select('#'+id);
				console.log("element_ : ",element_);
				element_.attr('strokeWidth','10px');
			}},'f').name(element.attr('id'));
		})
	}
	*/
	var by_type = _.groupBy(vectors_array,function (e,i,a) {
		// console.log("e : ",e);
		// console.log("i : ",i);
		return e.type; 
	});
	//To see if there are repeated ids
	var by_id = _.groupBy(vectors_array,function (e) {
		return e.attr('id');
	})
	var histogram = _.map(by_id,function (argument) {
		return _.size(argument);
	})
	// console.log("histogram : ",histogram);
	var keys = Object.keys(by_type);
	// console.log("by_type : ",by_type);
	// console.log("keys : ",keys);
	buses = vectors_layer.selectAll(".bus");
	// console.log("buses : ",buses);
	// buses.attr('stroke','red')
	buses.forEach(function (bus) {
		// bus.attr('stroke','red');
		// bus.attr('strokeWidth','s');
	})
	var junctions = vectors_layer.selectAll(".junction");
	junctions.forEach(function (junction) {
		// junction.attr('fill','green');
		// junction.attr('stroke','none');
		// var type = junction.type;
		// console.log("type : ",type);
		// junction.attr('r',8);
	})
	/////////////////////////////////////////////////
	/////////////////////////////////////////////////
	/////////////////////////////////////////////////
	/////////////////////////////////////////////////
	var guides = vectors_layer.selectAll('[id^=guide]')
	// console.log("guides : ",guides);
	var resistances = vectors_layer.selectAll('[id^=r]');
	// console.log("resistances : ",resistances);
	var resistances_ids = _.map(resistances,function (argument) {
		return argument.attr('id');
	})
	var labels;
	labels = vectors_layer.selectAll("[id~=label]");
	// console.log("labels_idss : ",labels);
	labels = vectors_layer.selectAll("[id|=label]");
	// console.log("labels : ",labels);
	labels = vectors_layer.selectAll("[id*=label]");
	// console.log("labels : ",labels);
	var guides_ids = _.map(guides,function (argument) {
		argument.attr('display','none')
		return argument.attr('id');
	})
	// console.log("guides_ids : ",guides_ids);
	var labels_ids = _.map(labels,function (argument) {
		return argument.attr('id');
	})
	// console.log("labels_ids : ",labels_ids);
	var buses_ids = _.map(buses,function (argument) {
		return argument.attr('id');
	})
	// console.log("buses_ids : ",buses_ids);
	var dif_r_b_l = _.difference(resistances_ids,buses_ids,labels_ids);
	// console.log("dif_r_b_l : ",dif_r_b_l);
	resistances_ids = dif_r_b_l;
	var opAmps = vectors_layer.selectAll("[id^=opAmp]");
	opAmps_ids = _.map(opAmps,function (argument) {
		return argument.attr('id');
	})
	var junctions = vectors_layer.selectAll('.junction')
	// console.log("junctions : ",junctions);
	var junctions_ids = _.map(junctions,function (argument) {
		return argument.attr('id');	
	})
	// console.log("junctions_ids : ",junctions_ids);

	opAmps_ids = _.difference(opAmps_ids,buses_ids,labels_ids,junctions_ids);
	// console.log("opAmps_ids : ",opAmps_ids);
	// console.log("resistances_ids : ",resistances_ids);
	// console.log("opAmps_ids : ",opAmps_ids);

	///////////////////////////////////
	///////////////////////////////////
	///////////////////////////////////
	///////////////////////////////////
	///////////////////////////////////
	var frame = vectors_layer.select('#frame');
	var title = vectors_layer.select('#title');
	// console.log("frame : ",frame);
	resistances = get_elements_from_ids(resistances_ids);
	opAmps = get_elements_from_ids(opAmps_ids);
	do_hide_all();
	r1_r2 = get_bus('r1-r2');
	var gnd_bus = get_bus('gnd');
	var vcc_bus = get_bus('vcc');
	// console.log("gnd_bus : ",gnd_bus);
	// console.log("r1_r2 : ",r1_r2);
	var pins_label = vectors_layer.selectAll("[id*=pin_label]");
	var pins_labels_ids = _.map(pins_label,function (argument) {
		return argument.attr('id');	
	})
	var introScene =[];

	introScene.push(frame);
	introScene.push(title);
	// frame.attr('display','inline');
	// title.attr('display','inline');
	var r1_r2 = select_one("r1-r2")
	var r2_r3 = select_one("r2-r3")
	// console.log("r2_r3 : ",r2_r3);
	// console.log("pins_labels_ids : ",pins_labels_ids);
	var vcc_pin_label = get_from('vcc',pins_label)
	var gnd_pin_label = get_from('gnd',pins_label)
	var pins = vectors_layer.selectAll("[id^=pin]")
	pins.forEach(function (argument) {
		introScene.push(argument);
	})
	
	var r1_label     = get_from('r1',labels);
	// console.log("r1_label : ",r1_label);
	function do_update_inkscape_text_element(element,new_content) {
		var text_span = element.select('tspan');
		text_span.node.innerHTML = new_content;
	}
	var label_clones=[];
	function do_clone_resistance_labels(element) {
		var element_clone = element.clone()
		do_update_inkscape_text_element(element_clone,"5");
		label_clones.push(element_clone)
		vectors_layer.append(element_clone);
		return element_clone
	}
	// var a = Snap(r1_element_clone.node.innerHTML)
	// console.log("a : ",a);

	var r2_label     = get_from('r2',labels);
	var r3_label     = get_from('r3',labels);
	var fives = [r1_label,r2_label,r3_label].map(function function_name(argument) {
		return do_clone_resistance_labels(argument);
	})
	var timeline_fives_time = 0.5;
	var timeline_fives = new TimelineLite();
	fives.forEach(function (element) {
		element.attr('stroke','white');
		// console.log("element : ",element.attr('y'));
		var tweened = {y:element.attr('y')}
		timeline_fives.add(TweenMax.to(element.node,timeline_fives_time,{y:-50,
			onUpdate:(argument)=> {
				// console.log("argument : ",argument);
				argument.attr('y',tweened.y);
				// console.log("tweened : ",tweened);
			},
			onUpdateParams:[element],
			onComplete:(argument)=> {
			var id = element.attr('id;');
			var s = id+ ' '+element.attr('y');
			// console.log("s : ",s);
			}
		}))

	})
	var targets = [0,0,0].map(function (argument) {
		return 200
	})
	targets=targets.map(function (argument,i) {
		return argument + i*20;
	})
	targets = [70,-10,-90];
	fives.forEach(function (element,i) {
			var xt = targets[i]
			// console.log("xt : ",xt);
		timeline_fives.add(TweenMax.to(element.node,timeline_fives_time,{x:xt}))
	})
	// do_clone_resistance_labels(r1_label);
	// do_clone_resistance_labels(r2_label);
	// do_clone_resistance_labels(r3_label);
	var label_a      = get_from('label_a',labels);
	var vd1_junction = get_from('vd1',junctions);
	var vd2_junction = get_from('vd2',junctions);
	var vcc_pin      = get_from('vcc',pins);
	var gnd_pin      = get_from('gnd',pins);
	var firstScene=[
		// r1_r2,
		// r2_r3,
		// gnd_bus,
		// vcc_bus,
		// vcc_pin_label,
		// gnd_pin_label,
		r1_label,
		r2_label,
		r3_label,
		vd1_junction,
		vd2_junction,
		// vcc_pin,
		// gnd_pin,
	]
	firstScene= firstScene.concat(resistances);
	firstScene= firstScene.concat(label_a);
	///////////////////////////////////
	///////////////////////////////////
	///////////////////////////////////
	///////////////////////////////////
	///////////////////////////////////
	var introScene_buses=[]
	var secondScene_buses=[]
	var thirdScene_buses=[]
	var fourthScene_buses=[]
	var fifthScene_buses=[]
	var sixthScene_buses=[]
	var firstScene_buses=[
		r1_r2,
		r2_r3,
		gnd_bus,
		vcc_bus,
		// vcc_pin_label,
		// gnd_pin_label,
		// r1_label,
		// r2_label,
		// r3_label,
		// vd1_junction,
		// vd2_junction,
		// vcc_pin,
		// gnd_pin,
	]
	
	///////////////////////////////////
	///////////////////////////////////
	///////////////////////////////////
	///////////////////////////////////
	///////////////////////////////////
	var trigger_label = get_from('trigger',labels);
	var secondScene = [
	];
	var trigger_label                   = add_to_scene('trigger',labels,secondScene) 
	var flipflop_set_label              = add_to_scene('flipflop_set',labels,secondScene);
	var flipflop_out_label              = add_to_scene('flipflop_out',labels,secondScene);
	// console.log("trigger_label : ",trigger_label);
	var opAmp1                          = add_to_scene('opAmp1',opAmps,secondScene) 
	// var opAmp1_bus                   = add_to_scene('opAmp1',buses,secondScene) 
	// var opAmp1_bus                   = add_to_scene('opAmp1',buses,secondScene) 
	// var flipflop_label               = add_to_scene('flipflop',labels,secondScene) 
	var flipflop_label                  = add_one_to_scene("flipflop_label",secondScene);
	// console.log("flipflop_label : ",flipflop_label);
	// var flipflop_label               = get_from	("flipflop",labels);
	// var flipflop_out_junction           = get_from('flipflop_out',junctions);
	var flipflop_out_junction           = add_to_scene('flipflop_out', junctions, secondScene);
	var vd1_label_b                     = add_one_to_scene("vd1_label_b",secondScene);
	var flipflop                        = add_one_to_scene("flipflop",secondScene);
	var output_driver                   = add_one_to_scene("output_driver",secondScene);
	var opAmp1_inverting_minus_label    = add_one_to_scene("opAmp1_inverting_minus_label",secondScene);
	var opAmp1_input_plus_label         = add_one_to_scene("opAmp1_input_plus_label",secondScene);
	/////////////////buses/////////////////////////////////////
	var opAmp1_inverting                = add_one_to_scene("opAmp1_inverting",secondScene_buses);
	var opAmp1_input_vd1                = add_one_to_scene("opAmp1_input-vd1",secondScene_buses);
	var opAmp1_output_flipflop_set      = add_one_to_scene("opAmp1_output-flipflop_set",secondScene_buses);
	var flipflop_out_output_driver_in   = add_one_to_scene("flipflop_out-output_driver_in",secondScene_buses);
	var output_driver_output            = add_one_to_scene("output_driver-output",secondScene_buses);
	// console.log("opAmp1_bus : ",opAmp1_bus);
	// console.log("trigger_label : ",trigger_label);
	// secondScene= secondScene.concat(resistances);
	///////////////////////////////////
	///////////////////////////////////
	///////////////////////////////////
	///////////////////////////////////
	///////////////////////////////////
	var thirdScene = [];
	var reset_label                     = add_to_scene('reset',labels,thirdScene) 
	var output_label                    = add_to_scene('output',labels,thirdScene) 
	var flipflop_reset_junction         = add_to_scene('flipflop_reset', junctions, thirdScene);
	/////////////////buses/////////////////////////////////////
	var flipflop_reset_reset            = add_one_to_scene("flipflop_reset-reset",thirdScene_buses);


	var fourthScene = [];
	var opAmp2                          = add_to_scene('opAmp2',                       opAmps, fourthScene);
	var cv_label                        = add_to_scene('cv',                           labels, fourthScene);
	var threshold_label                 = add_to_scene('threshold',                    labels, fourthScene);
	var opAmp2_inverting_minus_label    = add_to_scene('opAmp2_inverting_minus_label', labels, fourthScene);
	var vd2_label_b_label               = add_to_scene('vd2_label_b',                  labels, fourthScene);
	var opAmp2_cv                       = add_to_scene('opAmp2-cv',                    buses,  fourthScene_buses);
	
	var fifthScene = [];
	var opAmpInput_bus                  = add_to_scene('opAmpInput',                   buses,  fifthScene);
	var opAmp2Output_bus                = add_to_scene('opAmp2Output',                 buses,  fifthScene);
	var opAmp2_input_plus_label         = add_to_scene('opAmp2_input_plus',            labels, fifthScene);

	var sixthScene = [];
	// var opAmpInput_bus               = add_to_scene('opAmpInput',                   buses,  sixthScene);
	var opAmp2_inverting_vd2            = add_to_scene('opAmp2_inverting-vd2',           buses,         sixthScene_buses);
	var opAmp2_junction                 = add_to_scene('opAmp2',                         junctions,     sixthScene);
	var transistor_collector_discharge  = add_to_scene('transistor_collector-discharge', buses,         sixthScene_buses);
	var transistor_base_flipflop_out    = add_to_scene('transistor_base-flipflop_out',   buses,         sixthScene_buses);
	var transistor_emitter_gnd          = add_to_scene('transistor_emitter-gnd',         buses,         sixthScene_buses);
	var discharge_label                 = add_to_scene('discharge',                      labels,        sixthScene);
	var transistor                      = add_one_to_scene('transistor',                 sixthScene);

	///////////////////////////////////
	///////////////////////////////////
	///////////////////////////////////
	///////////////////////////////////
	///////////////////////////////////
	function do_show_all(argument) {
		do_show(introScene);
		do_show(firstScene);
		do_show(secondScene);
		do_show(thirdScene);
		do_show(fourthScene);
		do_show(fifthScene);
		do_show(sixthScene);
	}
	// do_show_all();
	///////////////////////////////////
	///////////////////////////////////
	///////////////////////////////////
	///////////////////////////////////
	///////////////////////////////////
	scenes={introScene,firstScene,secondScene,thirdScene,fourthScene,fifthScene,sixthScene};
	scenes_buses = {introScene_buses,firstScene_buses,secondScene_buses,thirdScene_buses,fourthScene_buses,fifthScene_buses,sixthScene_buses};
	// folder_animation.add(timeline_max,'group_lines').listen();

	
	// debugger
	// pan_zoom_main = svgPanZoom(paper.node,{zoomScaleSensitivity:0.6,minZoom: 0.1});
	// pan_zoom_main.fit();
	// pan_zoom_main.center();
	// pan_zoom_main.zoom(0.68);
	// pan_zoom_main.pan({x:-133,y:-56});
	set_dat();
}
///////////////////////////////////
///////////////////////////////////
/////////// functions /////////////
///////////////////////////////////
///////////////////////////////////
function add_one_to_scene(argument,scene) {
	var output = select_one(argument);
	scene.push(output);
	return output;
}
function do_show(elements) {
	elements.forEach(function (element) {
		do_show_element(element);
	})
}
function do_show_element(element) {
	element.attr('display','inline');
}
function select_one(argument) {
	return vectors_layer.select("#"+argument)
}
function get_bus(argument) {
	var output = _.filter(buses,(bus)=> {
		var id = bus.attr('id')
		return id===argument
	})
	if(output.length>1){
		throw output;
	}
	if(output.length===0){
		throw output;
	}
	return output[0];
}
function add_to_scene(argument,elements_set,scene) {
	var output = get_from(argument,elements_set)
	if (output.length>1){
		output.forEach((aelement)=>{
			scene.push(aelement)
		})
	}
	else 
	scene.push(output);
	return output;			
}
function get_from(id,elements) {
	var output = _.filter(elements,(element)=> {
		var id_ = element.attr('id')
		return id_.indexOf(id)>-1
	})
	if(output.length>1){
		return output;
	}
	if(output.length===0){
		throw output;
	}
	return output[0];
}
function get_elements_from_ids(ids_array) {
	return ids_array.map(function (argument) {
		return vectors_layer.select("#"+argument)
	})
}
function toggle_image(argument) {
	console.log('.........................');
	is_image=!is_image;
	var display_value;
	var color_value;
	if(!is_image){
		display_value = 'none';
		color_value= 'white';
	}
	else{
		display_value = 'inline';
		color_value= 'black';
	}
	if(image)image.attr("display",display_value);
	vectors_array.forEach(function (element) {
		if(!is_image){
				
			if(element.type!=='text')element.attr('stroke',color_value);
			if(element.type==='text')element.attr('fill',color_value);
			// if(element.type==='path')element.attr('stroke',color_value);
		}else{
			if(element.type==='text')element.attr('stroke','none');

		}
	})
}
// getPoints
// toPath
function deltaTransformPoint(matrix, point)  {

    var dx = point.x * matrix.a + point.y * matrix.c + 0;
    var dy = point.x * matrix.b + point.y * matrix.d + 0;
    return { x: dx, y: dy };
}
function decomposeMatrix(matrix) {

    // @see https://gist.github.com/2052247

    // calculate delta transform point
    var px = deltaTransformPoint(matrix, { x: 0, y: 1 });
    var py = deltaTransformPoint(matrix, { x: 1, y: 0 });

    // calculate skew
    var skewX = ((180 / Math.PI) * Math.atan2(px.y, px.x) - 90);
    var skewY = ((180 / Math.PI) * Math.atan2(py.y, py.x));

    return {

        translateX: matrix.e,
        translateY: matrix.f,
        scaleX: Math.sqrt(matrix.a * matrix.a + matrix.b * matrix.b),
        scaleY: Math.sqrt(matrix.c * matrix.c + matrix.d * matrix.d),
        skewX: skewX,
        skewY: skewY,
        rotation: skewX // rotation is the same as skew x
    };        
}
function get_animation_for_path_of_lines(group,element,color,duration,speed) {
	var timeline = new TimelineMax();
	if(element.type==='path'){
		var d = element.attr('d');
		// var id = element.attr('id');
		var abs = Snap.path.toAbsolute(d);
		var transform = element.attr('transform');
		if(transform.string){
			// console.log('----');
			abs= Snap.path.map(abs,transform.globalMatrix)
		}

		abs.forEach( (argument,i)=> {
			var x = argument[1]
			var y = argument[2]
			var instruction = argument[0];
			if(i===0)return
			////////////////
			/*
			var circle = group.circle(x,y,1);
			circle.attr('fill',color);
			circle.attr('stroke','none');
			*/
			var prev = abs[i-1];
			var px = prev[1];
			var py = prev[2];
			if(instruction==="Z"){
				x  = abs[0][1];
				y  = abs[0][2];
				px = abs[abs.length-2][1];
				py = abs[abs.length-2][2];
			}
			var line = group.line(px,py,px,py);
			line.attr('stroke',color);
			var x1=px;
			var y1=py;
			var tweened = {x:x1,y:y1};
			// return;
			timeline.to(tweened,duration,{x:x,y:y,onUpdate: (argument)=> {
				line.attr('x1',x1);
				line.attr('y1',y1);
				line.attr('x2',tweened.x);
				line.attr('y2',tweened.y);
			}})
		})
	}
	return timeline
}
function do_hide_all() {
	do_visibility(false);
}
function do_show_all() {
	do_visibility(true);
}
function do_visibility(is_visible) {
	vectors_layer.children().forEach(function (argument) {
		try{
			argument.attr('display',is_visible?'inline':'none');
		}catch(e){
		}
	})
}
function do_visibility_g(elements,is_visible) {
	elements.children().forEach(function (element) {
		try{
			element.attr('display',is_visible?'inline':'none');
		}catch(e){
		}
	})
}

/*
http://stackoverflow.com/questions/9153598/how-do-i-fetch-a-branch-on-someone-elses-fork-on-github
 */
// Snap.load('data/svg/monostable.svg',monostable);
var paper_monostable = Snap(1000,1000);
function monostable(fragment) {
	// console.log("fragment : ",fragment);
	var main_element = paper_monostable.append(fragment)
	// console.log("main_element : ",main_element);
	paper.transform('t-10000,0');
	// console.log("paper : ",paper);
	// paper.attr('display','none');
	var layers = paper_monostable.selectAll('[inkscape\\:label]')
	// console.log("layers : ",layers);
	layers.forEach(function (layer) {
		// console.log("layer : ",layer);
		var id = layer.attr('id')
		// console.log("id : ",id);
		// body...
	})
	paper_monostable.select('#image').attr('display','none');
	var path_set = paper_monostable.selectAll('path,rect,text');
	draw_color(path_set,'white')
	// console.log("path_set : ",path_set);
	var parts_timeline = new TimelineMax();
	var group_for_animation = paper_monostable.group();
	// set_animation(group_for_animation,parts_timeline,path_set);
}
function draw_color(elements_array,color) {
	elements_array.forEach(function (element,j) {
		if(!is_image){
				
			if(element.type!=='text')element.attr('stroke',color);
			if(element.type==='text')element.attr('fill'  ,color);
			if(element.type==='text')element.attr('stroke','none');
			if(element.type==='path')element.attr('stroke',color);
		}
	})
}
function set_animation(group,timeline,elements) {
	elements.forEach(function (element,j) {
		var color = palette[j%palette.length];
		var duration = 0.1;
		var speed = 4;
		timeline.add(get_animation_for_path_of_lines(group,element,color,duration,speed));
	})
}
function do_enter(argument) {
	var scene = scenes[argument];
	do_show(scene);
	var timeline_config = {yoyo:true,repeat:1};
	var timeline = new TimelineMax();
	scene.forEach(function (argument) {
		do_show_element(argument);
		timeline.add(TweenMax.from(argument.node,0.1,{scaleX:0,scaleY:0}))
	})
	return timeline;
}
function do_animation_scene(scenes,group,i){
	var parts_timeline = new TimelineMax();
	// console.log("i : ",i);
	var scene = scenes[i];
	// console.log("scene : ",scene);

	scene.forEach(function (element,j) {
		// console.log("element : ",element);
		var color = palette[j%palette.length];
		var duration = 0.1;
		parts_timeline.add(get_animation_for_path_of_lines(group,element,color,duration));
	})
	return parts_timeline;
}
function set_dat(argument) {
	gui = new dat.GUI();
	// console.log("gui : ",gui);
	gui.add(this,'toggle_image')
	var folder_obl = gui.addFolder('obl');
	// folder_obl.open();
	opAmps_ids.forEach(function (argument) {
		folder_obl.add({f:() => {
			console.log("argument : ",argument);
			var element_ = vectors_layer.select("#"+argument);
			console.log("element_ : ",element_);
			console.log("element_ : ",element_.type);
			element_.attr('transform','scale(3,3)');
		}},'f').name(argument);
	})
	gui.add(this,'do_hide_all')
	gui.add(this,'do_show_all')
	gui.add({f:function () {
		do_hide_all();
	}},'f').name('hide all');
	///////////////////////////////////
	///////////////////////////////////
	///////////////////////////////////
	///////////////////////////////////
	var folder_scenes = gui.addFolder('Scenes');
	// folder_scenes.open();
	_.each(scenes,function (e,i,a) {
		var timeline_all_scene = new TimelineMax();
		folder_scenes.add({f: ()=> {
			timeline_all_scene.add(do_enter(i));
			timeline_all_scene.add(do_animation_scene(scenes_buses,group_lines,i+"_buses"))
		}},'f').name(i);
	})
	///////////////////////////////////
	///////////////////////////////////
	///////////////////////////////////
	///////////////////////////////////
	///////////////////////////////////
	var folder_scenes2 = gui.addFolder('Scenes; busese');
	_.each(scenes_buses,function (e,i,a) {
		folder_scenes2.add({f: ()=> {
			do_animation_scene(scenes_buses,group_lines,i)
		}},'f').name(i);
	})
	gui.add({f:function () {
		var z = pan_zoom_main.getZoom();
		console.log("z : ",z);
		var p = pan_zoom_main.getPan();
		console.log("p : ",p);
		/*
		z :  0.684890627861023
		index.js:515 p :  Object {x: -133.86022434791502, y: -56.25715012150465}
		 */
	}},'f').name('pan xoom');
}
function add_timeline_gui(time_line) {
	
	console.log("time_line : ",time_line);
	var folder_animation = gui.addFolder('animation');
	folder_animation.open();
	folder_animation.add(time_line,'play')
	folder_animation.add(time_line,'stop')
	folder_animation.add(time_line,'resume')
	folder_animation.add(time_line,'pause')
	folder_animation.add(time_line,'repeat')
	folder_animation.add(time_line,'reverse');
	folder_animation.add(time_line,'restart');
	// folder_animation.add(time_line,'progress');
	var progress = {value:0}
	var slider = folder_animation.add(progress,'value',0,1)
	slider.step(0.01);
	slider.listen();
	slider.onChange(function (argument) {
	    // console.log("argument : ",argument);
	    time_line.pause();
	    time_line.progress(argument);

	})
	function updateSlider() {
		slider.updateValue
		// console.log(Math.random());
		// slider.setValue(time_line.progress());
	}    		

}
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
// set_timeline_parts_NOT_USED(group_lines); 
function set_timeline_parts_NOT_USED(group) {
	var timeline_max = new TimelineMax({onStart:function (argument) {
		// body...
		var children = group.children();
		children.forEach(function (argument) {
			var x1 = argument.attr('x1')
			var y1 = argument.attr('y1')
			var x2 = argument.attr('x2',x1)
			var x2 = argument.attr('y2',y1)
		})
	}});
	// group_lines.node.innerHTML = '';
	_.each(scenes,function (e,i,a) {timeline_max.add(do_animation_scene(a,group_lines,i));})
	add_timeline_gui(timeline_max);
}
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
function set_timeline_NOT_USED(group) {
	var timeline_max = new TimelineMax({paused:true,onRepeat:(argument) =>{
		group
	}});

	console.log("timeline_max : ",timeline_max);
	_.each(scenes,function (e,i,a) {
		var timeline = new TimelineLite({onUpdate:updateSlider});
		// var timeline = new TimelineLite(	);
		e.forEach(function (element) {
			timeline.add(TweenMax.from(element.node,0.1,{scaleX:0,scaleY:0}))
		})
		timeline_max.add(timeline)

	})
	add_timeline_gui(timeline_max);
}
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
function start_animation_NOT_USED(argument) {
	// body...
	var ti = Date.now();
	var t0 = 0;
		setInterval(function (argument) {
			// do_show(scenes[])
			var t1 = Date.now();
			var t = t1-ti;
			t*=0.001;
			t|=0;
			t0=t1;
			// console.log("t : ",t);
			// console.log("t0 : ",t0);
		})
}
