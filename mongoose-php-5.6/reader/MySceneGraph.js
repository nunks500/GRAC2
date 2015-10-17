
function MySceneGraph(filename, scene) {
	this.loadedOk = null;
	
	// Establish bidirectional references between scene and graph
	this.scene = scene;
	scene.graph=this;
		
	// File reading 
	this.reader = new CGFXMLreader();

	/*
	 * Read the contents of the xml file, and refer to this class for loading and error handlers.
	 * After the file is read, the reader calls onXMLReady on this object.
	 * If any error occurs, the reader calls onXMLError on this object, with an error message
	 */
	 
	this.reader.open('scenes/'+filename, this);  
}

/*
 * Callback to be executed after successful reading
 */
MySceneGraph.prototype.onXMLReady=function() 
{
	console.log("XML Loading finished.");
	var rootElement = this.reader.xmlDoc.documentElement;
	
	// Here should go the calls for different functions to parse the various blocks
	var error = this.parseGlobalsExample(rootElement);

	if (error != null) {
		this.onXMLError(error);
		return;
	}	

	this.loadedOk=true;
	
	// As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
	this.scene.onGraphLoaded();
		
};

//CGFlight


/*
 * Example of method that parses elements of one block and stores information in a specific data structure
 */
MySceneGraph.prototype.parseGlobalsExample= function(rootElement) {
		var x = rootElement.nodeName;

	if (x !== "scene" || x == null  || x.length==0) {
		return "scene element is missing.";
	}

	var y = rootElement.getElementsByTagName('initials');
	 if(y!== null){
	 		 this.fr = rootElement.getElementsByTagName('frustum');
	 	
		if(this.fr.length !== 0){
		var fru = this.fr[0];
		
		this.nearx = this.reader.getFloat(fru, 'near');
		this.farx = this.reader.getFloat(fru, 'far');
		
		}
		
		var z = rootElement.getElementsByTagName('translate');
		if(z.length !== 0){
		var translation = z[0];
		this.xtrans = this.reader.getFloat(translation, 'x');
		this.ytrans = this.reader.getFloat(translation, 'y');
		this.ztrans = this.reader.getFloat(translation, 'z');
		}
		var p = rootElement.getElementsByTagName('scale');
		if(p.length !== 0){
			var scala = p[0];
			this.scalax = this.reader.getFloat(scala, 'sx');
			this.scalay = this.reader.getFloat(scala, 'sy');
			this.scalaz = this.reader.getFloat(scala, 'sz');
		}
		this.q = rootElement.getElementsByTagName('reference');
		
		if (this.q.length !== 0){
			var ax = this.q[0];
			this.len = this.reader.getFloat(ax, 'length');
		}
		
		var q= rootElement.getElementsByTagName('rotation');
		if(q.length !== 0){
			var count = 0;
			for(count=0;count<q.length;count++){
				var ex = q[count];
				this.rotx = this.reader.getItem(ex, 'axis', ["x","y","z"]);
			if(this.rotx == 'x')
			this.rotxangle = this.reader.getFloat(ex, 'angle');
			else if(this.rotx == 'y')
		this.rotyangle = this.reader.getFloat(ex, 'angle');
		else if(this.rotx == 'z')
		this.rotzangle = this.reader.getFloat(ex, 'angle');
			}
		}


	 }

	 var il =  rootElement.getElementsByTagName('illumination');
	 if (il.length !== 0) {
		var il2 = rootElement.getElementsByTagName('ambient');
		if(il2 !== null){
		var ilum = il2[0];
		this.ambienter = this.reader.getFloat(ilum,'r');
		this.ambienteg = this.reader.getFloat(ilum,'g');
		this.ambienteb = this.reader.getFloat(ilum,'b');
		this.ambientea = this.reader.getFloat(ilum,'a');
		}
	
	var back =  rootElement.getElementsByTagName('background');
	 if (back.length !== 0) {
		var backg = back[0];
		this.backr = this.reader.getFloat(backg,'r');
		this.backgg = this.reader.getFloat(backg,'g');
		this.backb = this.reader.getFloat(backg,'b');
		this.backa = this.reader.getFloat(backg,'a');
	}

	}

	var luz = rootElement.getElementsByTagName('lights');
	{
		if (luz.length != 0){
			var luze = rootElement.getElementsByTagName('light');
			
			if(luze.length != 0)
			{
				var iterator = 0;
				this.arr = [];
				for(;iterator<luze.length;iterator++){
					
				var a = rootElement.getElementsByTagName('enable');
				var idz = luze[iterator].id;
				var ll = a[iterator];
				var en = this.reader.getInteger(ll,'value');
				var b = rootElement.getElementsByTagName('position');
				var poss = b[iterator];
				var posx = this.reader.getFloat(poss,'x');
				var posy = this.reader.getFloat(poss,'y');
				var posz = this.reader.getFloat(poss,'z');
				var posw = this.reader.getFloat(poss,'w');
				var c = rootElement.getElementsByTagName('ambient');
				var am = c[iterator];
				var amr = this.reader.getFloat(am,'r');
				var amg = this.reader.getFloat(am,'g');
				var amb = this.reader.getFloat(am,'b');
				var ama = this.reader.getFloat(am,'a');
				var d = rootElement.getElementsByTagName('diffuse');
				var dif = d[iterator];
				var difr = this.reader.getFloat(dif,'r');
				var difg = this.reader.getFloat(dif,'g');
				var difb = this.reader.getFloat(dif,'b');
				var difa = this.reader.getFloat(dif,'a');
				var e = rootElement.getElementsByTagName('specular');
				var spec = e[iterator];
				var specr = this.reader.getFloat(spec,'r');
				var specg = this.reader.getFloat(spec,'g');
				var specb = this.reader.getFloat(spec,'b');
				var speca = this.reader.getFloat(spec,'a');
				
				this.luzinha = new Lights(en,posx,posy,posz,posw,amr,amg,amb,ama,difr,difg,difb,difa,specr,specg,specb,speca,idz);
				


			//	console.log(this.reader.getInteger(ll,'enable'));
			//	this.light[iterator].enable =  this.reader.getInteger(ll,'enable');
			//	console.log(this.light[iterator].enable);
				this.arr.push(this.luzinha);
		
			}
			
			}
		}
	}

	var text = rootElement.getElementsByTagName('TEXTURES');
	if(text.length != 0){
		this.texturaz = [];
			var texturas = text[0].getElementsByTagName('TEXTURE');
				if(texturas.length != 0){
			for(var u=0;u <texturas.length; u++){
				var texturi = texturas[u];
					var textid = this.reader.getString(texturi,'id');
					var a = rootElement.getElementsByTagName('file');
					var textpath = this.reader.getString(a[0],'path');
					var b = rootElement.getElementsByTagName('amplif_factor');
					var amptexts = this.reader.getFloat(b[0],'s');
					var amptextt = this.reader.getFloat(b[0],'t');
					var text1 = new Texture(textid,textpath,amptexts,amptextt);
					this.texturaz.push(text1);
					

			}
					
				}
			}
	
	var leaves = rootElement.getElementsByTagName('leaves');
	if(leaves.length != 0){
		this.folhas=[];
	var leaf = rootElement.getElementsByTagName('LEAF');
		var i = 0;

		if(leaf.length != 0){

		for(;i<leaf.length;i++){

		leafi = leaf[i];
		var leafid = this.reader.getString(leafi,'id');
		var leaftype = this.reader.getString(leafi,'type');
		var coors = this.reader.getString(leafi, 'args');
		this.leafs = new Leaves(leafid,leaftype,coors);
		this.folhas.push(this.leafs);
		}
		}
		
	}
	this.nodes = [];
	var nodes = rootElement.getElementsByTagName('nodes');
	if (nodes.length != 0){
		var root = rootElement.getElementsByTagName('ROOT');
		this.rootid = this.reader.getString(root[0], 'id');
		if (root == null  || root.length==0) {
		return "root element is missing.";
	} 
	var nodex = rootElement.getElementsByTagName('NODE');
	for(var l=0;l<nodex.length;l++){
		this.currentnodeid = this.reader.getInteger(nodex[l], 'id');
		 var node1 = new Node(nodex[l].getAttribute('id'));
        node1.material = this.reader.getString(nodex[l].getElementsByTagName('MATERIAL')[0], 'id');
        node1.texture = this.reader.getString(nodex[l].getElementsByTagName('TEXTURE')[0], 'id');
      
		var translat = nodex[l].getElementsByTagName('TRANSLATION');
		for(var dd = 0;dd<translat.length;dd++){
		 			var trans = [];
                    trans.push(this.reader.getFloat(translat[dd], "x"));
                    trans.push(this.reader.getFloat(translat[dd], "y"));
                    trans.push(this.reader.getFloat(translat[dd], "z"));
                     console.log("trans: " + trans);
                    mat4.translate(node1.matrix, node1.matrix, trans);
			
		}

		var scali = nodex[l].getElementsByTagName('SCALE');
		if(scali.length != 0){
		for(var ss = 0;ss<translat.length;ss++){
		 			 var scale = [];
                    scale.push(this.reader.getFloat(scali[ss], "sx"));
                    scale.push(this.reader.getFloat(scali[ss], "sy"));
                    scale.push(this.reader.getFloat(scali[ss], "sz"));
                    // console.log("scale: " + scale);
                    mat4.scale(node1.matrix, node1.matrix, scale);
			
		}
		}
		var rot = nodex[l].getElementsByTagName('ROTATION');
		
		var deg2rad = Math.PI / 180;
		if(rot.length != 0){
		for(var xs = 0;xs<rot.length;xs++){
		 			var axis = this.reader.getItem(rot[xs], "axis", ["x", "y", "z"]);
                    var angle = this.reader.getFloat(rot[xs], "angle") * deg2rad;
                    var rot2 = [0, 0, 0];

                     console.log("rot: " + axis + " " + angle + " ");
                    rot2[["x", "y", "z"].indexOf(axis)] = 1;
                    mat4.rotate(node1.matrix, node1.matrix, angle, rot2);
			
		}
		}

		var desc = nodex[l].getElementsByTagName('DESCENDENTS');
		if(desc.length != 0){
		var desce = desc[0].getElementsByTagName('DESCENDENT');
		if(desce.length != 0){
			for(var t=0;t<desce.length;t++){
				node1.descendents.push(desce[t].getAttribute('id'));

			}
			
		}
		}
		this.nodes.push(node1);
	

	}	
	

	}
	
	
	var elems =  rootElement.getElementsByTagName('globals');
	if (elems == null) {
		return "globals element is missing.";
	}

	if (elems.length != 1) {
		return "either zero or more than one 'globals' element found.";
	}

	// various examples of different types of access
	var globals = elems[0];
	this.background = this.reader.getRGBA(globals, 'background');
	this.drawmode = this.reader.getItem(globals, 'drawmode', ["fill","line","point"]);
	this.cullface = this.reader.getItem(globals, 'cullface', ["back","front","none", "frontandback"]);
	this.cullorder = this.reader.getItem(globals, 'cullorder', ["ccw","cw"]);

	console.log("Globals read from file: {background=" + this.background + ", drawmode=" + this.drawmode + ", cullface=" + this.cullface + ", cullorder=" + this.cullorder + "}");
/*
	var tempList=rootElement.getElementsByTagName('list');

	if (tempList == null  || tempList.length==0) {
		return "list element is missing.";
	}
	
	this.list=[];
	// iterate over every element
	var nnodes=tempList[0].children.length;
	for (var i=0; i< nnodes; i++)
	{
		var e=tempList[0].children[i];

		// process each element and store its information
		this.list[e.id]=e.attributes.getNamedItem("coords").value;
		console.log("Read list item id "+ e.id+" with value "+this.list[e.id]);
	};
	*/	

};
	
/*
 * Callback to be executed on any read error
 */
 
MySceneGraph.prototype.onXMLError=function (message) {
	console.error("XML Loading Error: "+message);	
	this.loadedOk=false;
};

