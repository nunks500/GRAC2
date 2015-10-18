
  function Material(shininess,id,especularr,especularg,especularb,especulara,diffuser,diffuseg,diffuseb,diffusea,ambientir,ambientig,ambientib,ambientia,emissionr,emissiong,emissionb,emissiona) {
   this.shininess = shininess;
   this.especularr = especularr;
   this.especularg = especularg;
  this.especularb = especularb;
  this.especulara = especulara;
  this.diffuser = diffuser;
  this.diffuseg = diffuseg;
  this.diffuseb = diffuseb;
  this.diffusea = diffusea;
  this.ambientir = ambientir; 
  this.ambientig = ambientig;
  this.ambientib = ambientib;
  this.ambientia = ambientia;
  this.emissionr = emissionr;
  this.emissiong = emissiong;
  this.emissionb = emissionb;
  this.emissiona = emissiona;
  this.id = id;
   
  
  }



  Lights.prototype.getDesc = function() {
   // return this.name + ' ' + this.colour + ' ' + country;
  };
