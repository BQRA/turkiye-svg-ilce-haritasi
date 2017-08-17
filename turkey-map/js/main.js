
  function GetMap() {
    $.get('turkey-map/source/turkey.svg', function(data) {
      $('#turkey-map').append('<div class="map-container">' + data + '</div>');
      $('.map-container').append('<div class="map-title"><span class="map-close"></span><strong></strong></div>');

      $('#turkey-map[data-bg-color]').css('background-color', $('#turkey-map').attr('data-bg-color'));
      $('#turkey-map[data-map-color] #turkey > g > g > polygon, #turkey-map[data-map-color] #turkey > g > g > g, #turkey-map[data-map-color] #turkey > g > g > path').css('fill', $('#turkey-map').attr('data-map-color'));

      $.each($('#turkey > g'), function(index, val) {
        var e = $(this)[0].getBoundingClientRect(),
        trMapL = $('#turkey-map').offset().left,
        trMapT = $('#turkey-map').offset().top,
        trL = $('#turkey-map').width()/2 - (parseInt(e.left, 0) + parseInt(e.width/2, 0)) + trMapL,
        trT = $('#turkey-map').height()/2 - (parseInt(e.top, 0) + parseInt(e.height/2, 0)) + trMapT;
        $(this).attr('data-transform-left', trL);
        $(this).attr('data-transform-top', trT);
      });
      $('#turkey-map').append('<div class="map-tooltip"></div>')

      $.each($('#turkey-map color'), function(index, val) {
         $('#' + $(this).attr('id') + ' polygon, ' + ' #' + $(this).attr('id') + ' path, ' + ' #' + $(this).attr('id') + ' g').addClass($(this).attr('data-color'));
      });

    }, 'html');
  }

$(function() {

  GetMap();

  $(document).on({
    mouseenter: function() {
      var mapType = $('#turkey-map').attr('data-map') == 'districts' ? 
        $(this) : $('#turkey-map').attr('data-map') == 'city' ? 
        $(this).parent('g') : $(this).parent('g');
      var trX = mapType[0].getBoundingClientRect().left,
      trY = mapType[0].getBoundingClientRect().top,
      w = mapType[0].getBoundingClientRect().width / 2,
      trMapL = $('#turkey-map').offset().left,
      trMapT = $('#turkey-map').offset().top;


      $('.map-tooltip').html('<span>' + mapType.parent('g').attr('id') + '</span> ' + mapType.attr('id'));
      var w2 = parseInt($('.map-tooltip').outerWidth(true), 0) / 2;
      
      $('.map-tooltip').css({
        'transform': 'translate(' + (((trX + w) - w2) - trMapL) + 'px, ' + (trY - trMapT) + 'px)'
      }).addClass('hovered');
    }, 
    mouseleave: function(){
      $('.map-tooltip').text('').removeClass('hovered');
    },
    click: function() {
      $('#turkey-map svg g').removeClass('selected');
      $(this).parent('g').addClass('selected');
      $('#turkey-map svg').css({
        'transform': 'scale(3) translate(' + $(this).parent('g').attr('data-transform-left') + 'px, ' + $(this).parent('g').attr('data-transform-top') + 'px)',
      }).parents('#turkey-map').addClass('zoomed');
      $('#turkey-map .map-title strong').text($(this).parent('g').attr('id'));
    }
  }, '#turkey > g > g');


  $(document).on('click', '#turkey-map .map-title .map-close', function() {
    $('#turkey-map svg').css({
      'transform': 'scale(1) translate(0, 0)'
    }).parents('#turkey-map').removeClass('zoomed');
  });

});