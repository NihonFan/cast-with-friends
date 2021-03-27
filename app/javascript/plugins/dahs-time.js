$(function(){
  var inputs = $('.mainti');
  var paras = $('.description-flex-container').find('p');
  inputs.mouseover(function(){
    var t = $(this),
        ind = t.index(),
        matchedPara = paras.eq(ind);

    t.add(matchedPara).addClass('active');
    inputs.not(t).add(paras.not(matchedPara)).removeClass('active');
  });
});
