$(document).ready(function() {

    $('input, textarea').placeholder();

    $(document).on('click', '[data-modal]', function() {
        var $modal = $($(this).data('modal'));
        $.fancybox($modal);
    });

    /* Настройки fancybox
    ------------------------------------------------------------------------------- */

    $.extend($.fancybox.defaults, {
        afterShow: function() {
            $.fn.fullpage.setAllowScrolling(false)
        },
        beforeClose: function() {
            $.fn.fullpage.setAllowScrolling(true);
        },
        scrollOutside: false,
        padding: 0,
        openEffect: 'fade',
        closeEffect: 'fade',
        openSpeed: 200,
        closeSpeed: 200
        //aspectRatio: true
    });

    /* Инициализация fullPage.js
    ------------------------------------------------------------------------------- */

    $('#fullpage').fullpage({
        scrollOverflow: true,
        verticalCentered: false,
        resize: false,
        css3: true,
        scrollingSpeed: 400,
        keyboardScrolling: false
    });

    /* Слайдер сертификатов
    ------------------------------------------------------------------------------- */

    var $bCertificatesSlider = $('.b-certificates__slider');
    var certificatesSlider = new Sly($bCertificatesSlider.find('.b-certificates__slider__wrapper'), {
        horizontal: 1,
        itemNav: 'basic',
        touchDragging: 1,
        speed: 400,
        dynamicHandle: 1,
        nextPage: $bCertificatesSlider.find('.b-pagination__next'),
        prevPage: $bCertificatesSlider.find('.b-pagination__prev'),
    }).init();

    /* Слайдер клиентов
    ------------------------------------------------------------------------------- */

    var $bClientsSlider = $('.b-clients__slider');
    var clientsSlider = new Sly($bClientsSlider.find('.b-clients__slider__wrapper'), {
        horizontal: 1,
        itemNav: 'basic',
        touchDragging: 1,
        speed: 400,
        dynamicHandle: 1,
        nextPage: $bClientsSlider.find('.b-pagination__next'),
        prevPage: $bClientsSlider.find('.b-pagination__prev'),
    }).init();

    /* Портфолио
    ------------------------------------------------------------------------------- */

    $('.b-project__desc__more-link, .b-project__more-link, .b-project__ruller').click(function() {
        var $this = $(this);

        $.fancybox($this.parents('.b-project').find('.b-project-more'));
    });

    $('.b-project-more').each(function() {

        var $this        = $(this),
            $nextBtn     = $this.find('.b-pagination__next'),
            $prevBtn     = $this.find('.b-pagination__prev'),
            $nextProject = $this.parent('.b-project').next('.b-project'),
            $prevProject = $this.parent('.b-project').prev('.b-project');

        if ($nextProject.length) {
            $nextBtn.click(function() {
                $nextProject.find('.b-project__more-link').click();
            });
        } else {
            $nextBtn.addClass('disabled');
        }

        if ($prevProject.length) {
            $prevBtn.click(function() {
                $prevProject.find('.b-project__more-link').click();
            });
        } else {
            $prevBtn.addClass('disabled');
        }

    });

    $(window).resize(function() {
        
        if ($(window).width() > 1010) {
            $('.b-project-more__pagination')
                .removeClass('b-pagination--small')
                .addClass('b-pagination--big');
        } else {
            $('.b-project-more__pagination')
                .addClass('b-pagination--small')
                .removeClass('b-pagination--big');
        }

    });

    /* Обработка отправки форм
    ------------------------------------------------------------------------------- */
    
    $(document).on('submit', '.b-form', function(e) {
        $.fancybox($('.b-thanks'));

        e.preventDefault();
    });

    /* Скроллинг
    ------------------------------------------------------------------------------- */

    $(document).on('click', '[data-section]', function(e) {
        var $this    = $(this),
            section  = $(this).data('section');        
            $section = $(section);

        $.fn.fullpage.moveTo(section);

        if ($this.data('nicescroll')) {
            var $element = $section.find($this.data('nicescroll'));

            $section
                .find('.scrollable')
                .getNiceScroll()[0]
                .doScrollTop($element.prop('offsetTop') - parseInt($element.css('margin-top')));
        }

        e.preventDefault();
    });

    $(document).on('click', '.b-project-more__back-link', function(e) {
        $(this).parents('.fancybox-inner').animate({
            scrollTop: 0
        }, 800);

        e.preventDefault();
    });

    /* Шапка
    ------------------------------------------------------------------------------- */

    (function() {
        var $header      = $('.b-header'),
            $fixedHeader = $header.clone().appendTo('body').addClass('b-header--fixed');

        $(window).resize(function() {

            if ($(window).width() > 960 && $(window).height() > 500) {
                $header.css({ visibility: 'hidden'});
                $fixedHeader.show();
                $('.b-advantages').css({ marginTop: $fixedHeader.outerHeight() });

            } else {
                $header.css({ visibility: 'visible'});
                $fixedHeader.hide();
                $('.b-advantages').css({ marginTop: 0 });
            }

        }).trigger('resize');

   })();

});