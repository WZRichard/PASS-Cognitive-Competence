
function Create(size,level) { 
  this.size = size;
  this.level = level;
  this.jump = this.createJump(this.level);
  this.grid = this.init(this.washList(this.createList(this.jump)));
  this.question = this.createQuestion(this.jump);
  this.angle = this.createAngle();
}
Create.prototype = {
  createJump(){
    var char = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    var numlist=[];
    if(this.level===1){
      var j = Math.floor(Math.random()*(100/this.size/2));
      numlist.push(j);
      for(var i = 0; i < this.size*2-1; i++){
        var x =j +  Math.floor(Math.random()*(100/this.size/2)+1);
        j=x;
        numlist.push(x);
      }
    }else if(this.level===2){
      var j = Math.floor(Math.random()*8);
      numlist.push(char[j]);
      for(var i = 0; i < this.size*2-1; i++){
        var x =j + Math.floor(Math.random()*2+1);
        j=x;
        numlist.push(char[x]);
      }
    }else{
      var j = Math.floor(Math.random()*(100/this.size));
      numlist.push(j);
      for(var i = 0; i < this.size-1; i++){
        var x =j +  Math.floor(Math.random()*(100/this.size)+1);
        j=x;
        numlist.push(x);
      }
      j = Math.floor(Math.random()*6);
      numlist.push(char[j]);
      for(var i = 0; i < this.size-1; i++){
        var x =j + Math.floor(Math.random()*5+1);
        j=x;
        numlist.push(char[x]);
      }
    }
    console.log(numlist);
   return numlist;
  },
  init(list) { // 填充数据
    var num =0 ;
    var grid = [];
    var numlist= list;
    for(var i = 0; i < this.size; i++) {
      grid[i] = [];
      for(var j = 0; j < this.size; j++) {
        //grid[i].push("");
        grid[i].push(numlist[num]);
        num++;
      }
    }
    return grid;
  },
  createList(list){
    var numlist=[];
    for(var i = 0; i < this.size*2; i++)
      numlist.push(list[i]);
    for(var i = 0; i < this.size*(this.size-2); i++)
      numlist.push("");
    return numlist;
  },
  washList(list){
    var numlist=list;
    var times = Math.floor(Math.random()*40);
    for(var i = 0; i < times; i++){
        var a = Math.floor(Math.random()*this.size*this.size);
        var b = Math.floor(Math.random()*this.size*this.size);
        var x;
        x=numlist[a];
        numlist[a]=numlist[b];
        numlist[b]=x;
    }
    var count = 0;
    for(var i = 0; i < this.size*2; i++){
      if(numlist[i]==="")
        count++;
    }
    if(count<this.size)
       this.washList(numlist);
    return numlist;
  },
  createAngle(){
    var que=[];
    for(var i = 0; i < this.size*this.size; i++){
      var ag = Math.floor(Math.random()*180-90);
      que.push(ag);
    }
    return que;
  },
  createQuestion(list){
    var que=[];
    for(var i = 0; i < this.size*2; i++){
      que.push(list[i]);  
    }
    return que;
  },
  
};

module.exports = Create;