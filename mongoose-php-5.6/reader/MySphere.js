/**
 * MySphere
 * @constructor
 */
 
 function MySphere(scene,raio, slices, stacks) {
 	CGFobject.call(this,scene);
	this.stacks = stacks;
	this.slices = slices;
	this.cil = new MyCilinder(scene,raio,slices,stacks, 1);
	this.cil2 = new MyCilinder(scene,raio,slices,stacks, -1);
	this.texCoords=[];
	this.raio =raio;
	
 };
  
MySphere.prototype = Object.create(CGFobject.prototype);
MySphere.prototype.constructor = MySphere;

 MySphere.prototype.display = function() {
 	this.cil.display();
	this.cil2.display();
 };
MySphere.prototype.updatest = function (s,t) {

	
};

