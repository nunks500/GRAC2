var degToRad = Math.PI / 180.0;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.initCameras();

	this.initLights();

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	// Scene elements
	this.prism = new MyPrism(this, 8, 20);
	this.lamp = new MyLamp(this, 8, 20);
	this.cylinder = new MyCylinder(this, 8, 20);
	this.wall = new MyQuad(this, 0, 1, 0, 1);
	this.floor = new MyQuad(this, 0, 10, 0, 12);
	// Materials
	this.materialDefault = new CGFappearance(this);
	this.enableTextures(true);

	this.fagotice = new CGFappearance(this);
	//this.fagotice.setAmbient(0.3,0.3,0.3,1);
	this.fagotice.setDiffuse(1,1,1,1);
	this.fagotice.setSpecular(0,0,0,1);
	this.fagotice.setShininess(1);
	this.wallAppearance = new CGFappearance(this);
	this.wallAppearance.loadTexture("wall.png");
	this.wallAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	this.wallAppearance.setSpecular(0.2, 0.2, 0.2, 1);
	this.wallAppearance.setShininess(10);
	this.wallAppearance.setDiffuse(0.8, 0.8, 0.8, 1);
	this.floorAppearance = new CGFappearance(this);
	this.floorAppearance.loadTexture("floor.png");
	this.floorAppearance.setTextureWrap('REPEAT', 'REPEAT');
	this.floorAppearance.setSpecular(0.2, 0.2, 0.2, 1);
	this.floorAppearance.setShininess(10);
	this.floorAppearance.setDiffuse(0.8, 0.8, 0.8, 1);




};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0, 0 ,0, 1);

	this.shader.bind();
	
	// Positions for lights
	this.lights[0].setPosition(0, 2, -8, 1);
	this.lights[0].setVisible(true);

	this.lights[1].setPosition(0, 2, 8, 1);
	this.lights[1].setVisible(true);

	this.lights[2].setPosition(-8, 2, 0, 1);
	this.lights[2].setVisible(true);

	this.lights[3].setPosition(8, 2, 0, 1);
	this.lights[3].setVisible(true);

	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[0].enable();

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();

	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[2].enable();

	this.lights[3].setAmbient(0, 0, 0, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[3].enable();

	this.shader.unbind();
};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
}

LightingScene.prototype.display = function() {
	this.shader.bind();

	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup


	// ---- BEGIN Primitive drawing section

	// Prism
	this.pushMatrix();
	this.rotate(-Math.PI / 2, 1, 0, 0);
	this.scale(1, 1, 5);
//	this.prism.display();
	this.popMatrix();

	this.pushMatrix();
	this.translate(4, 0, 0);
	this.rotate(-Math.PI / 2, 1, 0, 0);
	this.scale(1, 1, 5);
//	this.cylinder.display();
	this.popMatrix();

	this.pushMatrix();
	this.translate(2, 6, 3);
	this.rotate(Math.PI / 2, 1, 0, 0);
	//this.scale(2, 2, 2);
//	this.lamp.display();
	//this.rotate(Math.PI, 1, 0, 0);
	//this.lamp.display();
	this.popMatrix();
/*
	this.pushMatrix();
	this.translate(6, 6, 3);
	this.rotate(Math.PI / 2, 1, 0, 0);
	this.lamp.display();
	this.rotate(Math.PI, 1, 0, 0);
	this.lamp.display();
	this.popMatrix();

	this.pushMatrix();
	this.translate(4, 6, 8);
	//this.rotate(Math.PI / 2, 1, 0, 0);
	this.lamp.display();
	this.popMatrix();

	this.pushMatrix();
	this.translate(4, 6, 3);
	//this.rotate(-Math.PI / 2, 1, 0, 0);
	this.scale(1, 1, 5);
	this.cylinder.display();
	this.popMatrix();
*/
	// ---- END Primitive drawing section
	this.pushMatrix();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);
		this.wallAppearance.apply();
		this.wall.display();
	this.popMatrix();
	this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		this.floorAppearance.apply();
		this.floor.display();
	this.popMatrix();
	this.shader.unbind();
};
