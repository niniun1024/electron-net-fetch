let IsJson = function(opt){
  try{
    JSON.parse(opt);
    return true
  }catch(e){
    return false
  }

}

module.exports = IsJson





