 function MyPrism(scene, slices, stacks,height,botr,topr) {
 	CGFobject.call(this,scene);
	
	this.slices=slices;
	this.stacks=stacks;
	this.height=height;
	this.botr = botr;
	this.topr = topr;
 	this.initBuffers();
 };

 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;

 MyPrism.prototype.initBuffers = function() {

	this.indices = [
 	];
 	this.vertices = [
 	];
 	this.normals = [
 	];
	var test = this.botr;
	var x = 0;
	var angle = 2 * Math.PI / (this.slices);
	
	for (var stack = 0; stack < this.stacks + 1; stack++)
	{
		for (var slice = 0; slice < this.slices; slice++)
		{
		this.vertices.push(Math.cos(slice * angle) *test ,Math.sin(slice * angle) *test, stack/this.stacks * this.height);
		this.normals.push(Math.cos(slice * angle), Math.sin(slice * angle),0);
		
		}
		//test = test - (this.height/(this.stacks));
		
	test = test-((this.botr-this.topr)/this.height);

	
	}

	for (var stack = 0; stack < this.stacks; stack++)
	{
		for (var slice = 0; slice < this.slices; slice++)
		{
			if (slice == this.slices - 1)
			{
				this.indices.push((stack * this.slices + slice),  (stack * this.slices + slice) + 1 - this.slices, (((stack + 1) * this.slices + slice) + 1) - this.slices);
				this.indices.push((stack * this.slices + slice), (((stack + 1) * this.slices + slice) + 1) - this.slices, ((stack + 1) * this.slices + slice));
			}
			else
			{
				this.indices.push((stack * this.slices + slice), (stack * this.slices + slice) + 1, ((stack + 1) * this.slices + slice) + 1);
				this.indices.push((stack * this.slices + slice), ((stack + 1) * this.slices + slice) + 1, ((stack + 1) * this.slices + slice));
			}
		}
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 	


 };