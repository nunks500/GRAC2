
  function Lights(en,posx,posy,posz,posw,amr,amg,amb,ama,difr,difg,dib,difa,specr,specg,specb,speca,idz) {
    this.enable = en;
    this.px = posx;
    this.py = posy;
    this.pz = posz;
    this.pw = posw;
    this.ar = amr;
    this.ag = amg;
    this.ab = amb;
    this.aa = ama;
    this.difr = difr;
    this.difb = dib;
    this.difa = difa;
    this.specr = specr;
    this.specg = specg;
    this.specb = specb;
    this.speca = speca;
    this.id=idz;

    console.log(this.id);

   
  
  }



  Lights.prototype.getDesc = function() {
   // return this.name + ' ' + this.colour + ' ' + country;
  };
