//E-mail Ajax Send
$("form").submit(function (e) { //Change
  var th = $(this);
  // var checker = false;
  // if (th.find(".s-checkboxes").length) {
  //   var checkboxes = th.find(".s-checkboxes input[type=checkbox]");
  //    checkboxes.each(function() {
  //     if ($(this).prop('checked') == true) {
  //       checker = true;
  //     }
  //   });
  // }
  // if (!checker) {
  //   e.preventDefault();
  //   alert("Ответьте хотя бы на один вопрос!");
  //   return
  // };
  // Работа с виджетом recaptcha
  // 1. Получить ответ гугл капчи
  // var captcha = grecaptcha.getResponse();
  // if (!($(this).hasClass("call-form"))) {
  //   captcha = "good";
  // };
  // 2. Если ответ пустой, то выводим сообщение о том, что пользователь не прошёл тест.
  // Такую форму не будем отправлять на сервер.
  // if (captcha.length) {
  $.ajax({
    type: "POST",
    url: "mail.php", //Change
    data: th.serialize()
  }).done(function () {
    $(".popup-block").hide();
    $("#popup-success").show();
    $(".popup").addClass("popup--show");
    setTimeout(function () {
      // Done Functions
      th.trigger("reset");
    }, 1000);
  });
  // }
  return false;
});

$(document).mouseleave(function (e) {
  if ((e.clientY < 10) && ($("#popup-leave").length)) {
    $(".popup-block").hide();
    $("#popup-leave").show();
    $(".popup").addClass("popup--show");
  }
});

$(document).scroll(function () {
  if ($(document).scrollTop() > 0) {
    $(".header-top").addClass("active");
  } else {
    $(".header-top").removeClass("active");
  }
});

$(document).ready(function () {
  var min = 5,
    sec = 0;

  setTimeout(function () {
    $(".popup-block").hide();
    $("#popup-banner").show();
    $(".popup").addClass("popup--show");
    var interval = setInterval(function () {
      sec--;
      if (sec == -1) {
        sec = 59;
        min--;
        if (min == -1) {
          min = 0;
          clearInterval(interval);
          return;
        }
      }
      if (sec > 9) {
        $(".seconds").text(sec);
      } else {
        $(".seconds").text("0" + sec);
      }
      if (min > 9) {
        $(".minutes").text(min);
      } else {
        $(".minutes").text("0" + min);
      }
    }, 1000);

  }, 40000);




  function get_name_browser() {
    // получаем данные userAgent
    var ua = navigator.userAgent;
    // с помощью регулярок проверяем наличие текста,
    // соответствующие тому или иному браузеру
    if (ua.search(/Chrome/) > 0) return 'Google Chrome';
    if (ua.search(/Firefox/) > 0) return 'Firefox';
    if (ua.search(/Opera/) > 0) return 'Opera';
    if (ua.search(/Safari/) > 0) return 'Safari';
    if (ua.search(/MSIE/) > 0) return 'Internet Explorer';

    return 'Не определен';
  }

  // пример использования
  var browser = get_name_browser();
  if (browser == 'Safari') {
    $(".r-navi").addClass("r-navi--safari");
  }



  $(".js-getcall").click(function () {
    if ($(this).data("type")) {
      $("#popup-type").text($(this).data("type"));
      $("#popup-more-link").attr("href", $(this).data("link"));
      $("#popup-more-link").show();
    } else {
      $("#popup-more-link").hide();
    }
    $(".popup-block").hide();
    $("#popup-getcall").show();
    $(".popup").addClass("popup--show");
  });

  $(".popup-close").click(function () {
    $(".popup").removeClass("popup--show");

    $("#popup-leave").remove();
  });
  $(".popup-bg").click(function () {
    $(".popup").removeClass("popup--show");
    $("#popup-leave").remove();
  });
  $(".js-popup-close").click(function () {
    $(".popup").removeClass("popup--show");
  });

  $(".js-anticrysis-more").click(function () {
    $(this).parents(".anticrysis__item_list").addClass("active");
    $(this).hide();
  });

  $(".js-n-list-open").click(function () {
    $(this).hide();
    $(this).parents(".n-list__item_description").find(".n-list__item_text").show(100);
  });

  $(".js-drop-open").click(function () {
    $(".menu-drop").toggleClass("active");
  });


  $(".js-butter").click(function () {
    $(".js-menu").addClass("menu--show");
  });
  $(".js-close").click(function () {
    $(".js-menu").removeClass("menu--show");
  });
  $(".js-menu a").click(function () {
    $(".js-menu").removeClass("menu--show");
  });


  $(".l-faq__quest").click(function () {
    $(this).toggleClass("active");
    $(this).next(".l-faq__answer").slideToggle(200);
  });


  if ($('.s-work').length > 0) {
    $('.s-work').lightGallery({
      thumbnail: true
    });

  }







  $('.js-slider').slick({
    arrows: true,
    infinite: true,
    // adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 5000
  });

  $('.js-slider-img').slick({
    arrows: false,
    infinite: false,
    fade: true,
    asNavFor: '.js-slider-content'
  });

  $('.js-slider-content').slick({
    arrows: true,
    infinite: false,
    fade: true,
    // adaptiveHeight: true,
    asNavFor: '.js-slider-img',
  });
  $('.js-slider-content').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    $(".newyear__title").html($(".newyear-slider__content_item:nth-child(" + (nextSlide + 1) + ") strong").html());
    $(".newyear__text").html($(".newyear-slider__content_item:nth-child(" + (nextSlide + 1) + ") p").html());
  });


  $('.js-anti-slider').slick({
    arrows: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    fade: true
  });


  function windowsSlider() {
    if (window.innerWidth >= 768) {
      if (($(".js-new-slider").length != 0) && !($(".js-new-slider").hasClass("slick-slider"))) {
        $('.js-new-slider').slick({
          arrows: true,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 3000,
          dots: true,
          fade: true
        });
      }
    } else {
      if (($(".js-new-slider").length != 0) && ($(".js-new-slider").hasClass("slick-slider"))) {
        $(".js-new-slider").slick('unslick');
      }
    }

  }
  windowsSlider();
  $(window).resize(function () {
    windowsSlider();
  });




  $("a[href^='#']").click(function () {
    var _href = $(this).attr("href");
    $("html, body").animate({
      scrollTop: $(_href).offset().top - 100
    });
    return false;
  });


  $(function () {
    // $("[type=tel]").mask("+7 (999) 999-99-99");
  });



});


const bannerZhiviesteni = document.getElementById('banner-zhiviesteni');
const close = document.getElementById('banner-zhiviesteni-popup-close');

close.addEventListener('click',() => {
  bannerZhiviesteni.style.display = "none"
});

setTimeout(() => {
  bannerZhiviesteni.style.display = "flex"
}, 5000)