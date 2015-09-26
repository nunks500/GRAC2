/**
 * MyLamp
 * @constructor
 */
 function MyLamp(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices=slices;
	this.stacks=stacks;

 	this.initBuffers();
 };

 MyLamp.prototype = Object.create(CGFobject.prototype);
 MyLamp.prototype.constructor = MyLamp;

 MyLamp.prototype.initBuffers = function() {

	this.indices = [
 	];
 	this.vertices = [
 	];
 	this.normals = [
 	];

	var angle = 2 * Math.PI / (this.slices);
	var angle_height = (Math.PI / 2)/this.stacks;
	
	// topo
	for (var stack = 0; stack < this.stacks; stack++)
	{
		for (var slice = 0; slice < this.slices; slice++)
		{
			this.vertices.push(Math.cos(slice * angle) * Math.cos(stack * angle_height), Math.sin(slice * angle) * Math.cos(stack * angle_height), Math.sin(stack * angle_height));
			this.normals.push(Math.cos(slice * angle) * Math.cos(stack * angle_height), Math.sin(slice * angle) * Math.cos(stack * angle_height), Math.sin(stack * angle_height));
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
	// base
	for (var slice = -1; slice < this.slices; slice++)
	{
		this.vertices.push(Math.cos(slice * angle), Math.sin(slice * angle), 0);
		this.normals.push(0, 0, -1);
	}

	for (var slice = 0; slice < this.slices; slice++)
	{
		if (slice + 1 >= this.slices)
		{
			this.indices.push(this.stacks * this.slices + 2 + slice, this.stacks * this.slices + 1, this.stacks * this.slices + 2);
		}
		else this.indices.push(this.stacks * this.slices + 2 + slice, this.stacks * this.slices + 1, this.stacks * this.slices + 3 + slice);
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
