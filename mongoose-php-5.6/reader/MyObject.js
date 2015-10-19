/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyObject(scene) {
	CGFobject.call(this,scene);

	this.initBuffers();
};
function MyObject(scene,tx,ty,bx,by, minS, maxS, minT, maxT) {
	CGFobject.call(this,scene);
	   this.minS = minS;
    this.maxS = maxS;
    this.minT = minT;
    this.maxT = maxT;
	this.initBufferz(tx,ty,bx,by);
	
//this.initBuffers();
};

MyObject.prototype = Object.create(CGFobject.prototype);
MyObject.prototype.constructor=MyObject;

MyObject.prototype.initBuffers = function () {
	this.vertices = [
            -0.5, -0.5, 0,
            0.5, -0.5, 0,
            -0.5, 0.5, 0,
            0.5, 0.5, 0,
            -0.75,0.5,0,
			0.75,0.5,0,
			0,0.75,0
			];

	this.indices = [
            0, 1, 2, 
			3, 2, 1,
			4, 5, 6
        ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
MyObject.prototype.initBufferz = function (tx,ty,bx,by) {
	this.vertices = [
            tx, by, 0,
            tx, ty, 0,
            bx, by, 0,
            bx, ty, 0
			];

	this.indices = [
			1, 2, 3,
           2,1,0
        ];

        this.texCoords = [
 	 this.minS, this.maxT,
 	 this.maxS, this.maxT,
 	 this.minS, this.minT,
 	 this.maxS, this.minT
 	  ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
MyObject.prototype.updatest = function (s,t) {
	this.maxS=s;
	this.maxT=t;
	    this.texCoords = [
 	 this.minS, this.maxT,
 	 this.maxS, this.maxT,
 	 this.minS, this.minT,
 	 this.maxS, this.minT
 	  ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
	
};
