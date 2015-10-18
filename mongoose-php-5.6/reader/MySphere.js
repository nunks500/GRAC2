/**
 * MySphere
 * @constructor
 */
 
 function MySphere(scene,raio, slices, stacks) {
 	CGFobject.call(this,scene);

	this.cil = new MyCilinder(scene,raio,slices,stacks, 1);
	this.cil2 = new MyCilinder(scene,raio,slices,stacks, -1);
 };
  
MySphere.prototype = Object.create(CGFobject.prototype);
MySphere.prototype.constructor = MySphere;

 MySphere.prototype.display = function() {
 	this.cil.display();
	this.cil2.display();
 };
