$(function() {

  //  Init
  // --------------------------------------------------

  var cards = ['A', 'K', 'Q', 'J', 'T', 9, 8, 7, 6, 5, 4, 3, 2]

  var probability

  $.getJSON('assets/probability.json', { async: false }, function(data){
    probability = data
    // Set default probability
    $('#result').html(probability['AAo'][0])

  })

  // Set card values
  _.each(cards, function(card) {
    $('.card select').append('<option>' + card + '</option>')
  })

  // Set player numbers
  for(i = 2; i < 10; i++) {
    $('#players').append('<option value="' + i + '">' + i + ' players</option>')
  }

  //  On Click
  // --------------------------------------------------

  // Change suited value when click suit
  $('.suit').click(function() {
    if(is_suited()) {
      $('#suited').val('o').change()
    }
    else {
      $('#suited').val('s').change()
    }
  })

  //  On Change
  // --------------------------------------------------

  // Suited checkbox
  $('#suited').change(function() {
    var suit
    if(is_suited()) {
      suit = '♠'
      $('#card-2').css('color', 'inherit')
    }
    else {
      suit = '♥'
      $('#card-2').css('color', 'red')
    }
    $('#card-2 .suit').html(suit)
  })

  // Anything
  $('.form-control').change(function() {
    // When value is the same force off-suit
    if(is_suited() && $('#card-1 select').val() == $('#card-2 select').val()) {
      // Set to off-suit then trigger change which will run this again
      $('#suited').val('o').change()
    }
    // Only lookup if above is false
    else {
      // Lookup value
      var lookup = $('#card-1 select').val() + $('#card-2 select').val() + $('#suited').val()
      // If undefined then reverse card order
      if(probability[lookup] === undefined) {
        lookup = $('#card-2 select').val() + $('#card-1 select').val() + $('#suited').val()
      }
      console.debug('Looking up ' + lookup)
      var result = probability[lookup][$('#players').val() - 2]
      $('#result').html(result)
      console.debug(result)
    }
  })

  //  Functions
  // --------------------------------------------------

  function is_suited() {
    // return $('#suited').is(':checked')
    return $('#suited').val() == 's'
  }

})
