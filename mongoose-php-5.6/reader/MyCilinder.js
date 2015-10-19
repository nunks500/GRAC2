/**
 * MyCilinder
 * @constructor
 */
 function MyCilinder(scene,raio,slices, stacks, lado) {
 	CGFobject.call(this,scene);

	this.slices=slices;
	this.stacks=stacks;
	this.texCoords =[];
 	this.initBuffers(lado,raio);
 	this.raio = raio;
 };
 
 MyCilinder.prototype = Object.create(CGFobject.prototype);
 MyCilinder.prototype.constructor = MyCilinder;

 MyCilinder.prototype.initBuffers = function(lado,raio) {

	this.indices = [
 	];
 	this.vertices = [
 	];
 	this.normals = [
 	];
	var angle = 2 * Math.PI / (this.slices);
	var angle_height = (Math.PI / 2)/this.stacks;
	var tex_height = Math.PI * raio;
	var tex_length = 2 * Math.PI * raio / this.s;
	// topo
	for (var stack = 0; stack < this.stacks; stack++)
	{
		for (var slice = 0; slice < this.slices; slice++)
		{
			this.vertices.push(Math.cos(slice * angle) * Math.cos(stack * angle_height)*raio, Math.sin(slice * angle) * Math.cos(stack * angle_height) * lado *raio, Math.sin(stack * angle_height) * lado*raio);
			this.normals.push(Math.cos(slice * angle) * Math.cos(stack * angle_height) *raio, Math.sin(slice * angle) * Math.cos(stack * angle_height)*lado *raio, Math.sin(stack * angle_height) *lado*raio);
			
		}
	}

	this.vertices.push(0, 0, 1);
	this.normals.push(0, 0, 1);
	
	for (var stack = 0; stack < this.stacks - 1; stack++)
	{
		for (var slice = 0; slice < this.slices; slice++)
		{
			this.indices.push(stack * this.slices + slice, stack * this.slices + ((slice + 1) % this.slices), (stack + 1) * this.slices + ((slice + 1) % this.slices));
			this.indices.push(stack * this.slices + slice, (stack + 1) * this.slices + ((slice + 1) % this.slices), (stack + 1) * this.slices + slice);
		}
	}
	
	this.vertices.push(0, 0, 0);
	  for (j = 0; j < this.stacks; j++) {
        for (i = 0; i < this.slices; i++) {
        	// coordenadas textura
            this.texCoords.push(tex_length * (1 - i / this.slices), tex_height * j / this.stacks);
			this.texCoords.push(tex_length * (1 - (i + 1) / this.slices), tex_height * j / this.stacks);
			this.texCoords.push(tex_length * (1 - i / this.slices), tex_height * (j + 1) / this.stacks);
			this.texCoords.push(tex_length * (1 - (i + 1) / this.slices), tex_height * (j + 1) / this.stacks);
        }
	  }
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
 MySphere.prototype.updatest = function (s,t) {

 };