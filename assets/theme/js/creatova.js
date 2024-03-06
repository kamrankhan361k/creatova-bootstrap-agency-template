(function ($) {
  "use strict";

  //Run function When Document Ready
  $(document).ready(function () {
    init_youtube_bg();
    init_popup();
    init_tooltip();
    init_back_to_top();
    init_btn_file();
    init_datepicker();
    init_contact_form();
  });

  //Run function When PACE (page loader) hide
  Pace.on('hide', function () {
    $('.wrapper').fadeIn('slow', function () {
      $('#tubular-container').fadeIn('slow');
      init_grid_masonry();
      init_parallax_bg();
      init_navbars();
      init_map_contact();
      var wow = new WOW(
              {
                boxClass: 'wow', // animated element css class (default is wow)
                animateClass: 'animated', // animation css class (default is animated)
                offset: 0, // distance to the element when triggering the animation (default is 0)
                mobile: false       // trigger animations on mobile devices (true is default)
              }
      );
      wow.init();
    });
  });

  //Run function When WIndow Resize
  $(window).resize(function () {
    init_parallax_bg();
  });

  //parallax background
  function init_parallax_bg() {
    $('.parallax-bg').each(function () {
      $(this).parallax("50%", 0.3);
    });
  }

  //Grid Masonry
  function init_grid_masonry() {
    if ($('.list-galery').length > 0) {
      var container = document.querySelector('.list-galery');
      var msnry = new Masonry(container, {});
      $('.list-galery .item').each(function (index, el) {
        var bg = $(el).data('bghold');
        $(el).css('background-image', 'url(' + bg + ')');
      });
    }

    if ($('.blog-grid').length > 0) {
      var container = document.querySelector('.blog-grid');
      var msnry = new Masonry(container, {});
    }
  }

  //Light Box
  function init_popup() {
    $('.list-galery').magnificPopup({
      delegate: 'a.galery-item',
      type: 'image',
      tLoading: 'Loading image #%curr%...',
      mainClass: 'mfp-img-mobile',
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
      },
      image: {
        tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
        titleSrc: function (item) {
          return item.el.attr('title');
        }
      }
    });

    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
      disableOn: 700,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false
    });
  }

  //Navbar 
  function init_navbars() {
    var mainbottom = $('.main-header').offset().top + $('.main-header').height() + 50;
    $(window).on('scroll', function () {
      var stop = Math.round($(window).scrollTop()) + 50;
      if (stop > mainbottom) {
        $('#main-navbar, .menu-area').addClass('nav-fixed');
      } else {
        $('#main-navbar, .menu-area').removeClass('nav-fixed');
      }
    });

  }

  //Background with Youtube Content
  function init_youtube_bg() {
    $('.header-home-video').tubular({videoId: 'dorZ3vag5PI', start: 0});
  }

  //Tooltip bootstrap
  function init_tooltip() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  //Datepicker
  function init_datepicker() {
    $('.has-datepicker').datetimepicker();
  }

  //BacktoTop
  function init_back_to_top() {
    $('.back-to-top').click(function () {
      $("html, body").animate({scrollTop: 0}, 1000);
      return false;
    });
  }

  //Tigger Custom Btn FIle
  function init_btn_file() {
    $(document).on('change', '.btn-file :file', function () {
      var input = $(this),
              numFiles = input.get(0).files ? input.get(0).files.length : 1,
              label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
      input.trigger('fileselect', [numFiles, label]);
    });

    $('.btn-file :file').on('fileselect', function (event, numFiles, label) {
      var input = $(this).parents('.input-group').find(':text'),
              log = numFiles > 1 ? numFiles + ' files selected' : label;
      if (input.length) {
        input.val(log);
      } else {
        if (log) {
          console.log(log);
        }
      }
    });
  }

  //Google Map
  function init_map_contact() {
    $('#map-contact').gmap({
      'center': '-6.597751, 106.798758',
      'zoom': 15,
      scrollwheel: false,
      'disableDefaultUI': false,
      'callback': function () {
        var self = this;
        self.addMarker({
          'position': this.get('map').getCenter(),
          icon: 'assets/theme/images/marker.png'
        }).click(function () {
          self.openInfoWindow({
            'content': $('.map-contact-body').html()
          }, this);
        });
      }
    });
  }

  //contact form submit
  function init_contact_form() {
    var $form = $('#contact_form'), $btn = $('#btnSubmit');
   
    $form.submit(function () {
      var $fullname = $('#fullname').val(),
          $email = $('#email').val(),
          $subject = $('#subject').val(),
          $message = $('#message').val();
      if ($fullname == "" || $email == "", $subject == "", $message == "") {
        alert('Please input the required fields');
      } else {
        $.ajax({
          method: "POST",
          url: "php/sendEmail.php",
          data: {fullname:$fullname, email:$email, subject: $subject, message: $message},
          beforeSend:function(){
            $btn.button('loading');
          }
        }).done(function (data) {
          if(data.status != ""){
            alert(data.status);
          }
          $form.trigger('reset');
          $btn.button('reset');
        });
      }
      return false;
    });
  }

})(jQuery);





