
function MySceneGraph(filename, scene) {
	this.loadedOk = null;
	
	// Establish bidirectional references between scene and graph
	this.scene = scene;
	scene.graph=this;
		
	// File reading 
	this.reader = new CGFXMLreader();
	this.reader2 = new CGFXMLreader();
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

};
	
/*
 * Callback to be executed on any read error
 */
 
MySceneGraph.prototype.onXMLError=function (message) {
	console.error("XML Loading Error: "+message);	
	this.loadedOk=false;
};

