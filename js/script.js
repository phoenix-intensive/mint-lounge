$(document).ready(function () {

    $('.slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true
    });


    $('.reviewsSlider').slick({
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        variableWidth: true,
        dots: false,
        responsive: [
            {
                breakpoint: 1030,
                settings: {
                    dots: true
                }
            },

            {
                breakpoint: 990,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true
                }
            }
        ]
    });


    new WOW({
        animateClass: 'animate__animated',
    }).init();

    let phoneInput = $('#phone');
    phoneInput.inputmask({"mask": "+7 (999) 999-9999"});


    //Cкроллы по нажатию кнопок к нужным блокам
    $('#buttonMenu').click(function () {
        $('html, body').animate({
            scrollTop: $('.menu-title').offset().top
        }, 1000);
    });

    $('#buttonReservation').click(function () {
        $('html, body').animate({
            scrollTop: $('.order').offset().top
        }, 1000);
    });


//Меню Бюргер выходило по нажатию и скрывалось при нажатии на крестик и на пункты меню на адаптиве

    $('#burger').click(function () {
        $('#menu').fadeIn();
    });

    $('.close').click(function () {
        $('#menu').fadeOut();
    });

    $('#menu *').click(() => {
        $('#menu').fadeOut();
    });


    //Cкроллы по нажатию кнопок к нужным блокам на адаптиве в меню бургера

    $('#aboutBurger').click(function () {
        $('html, body').animate({
            scrollTop: $('.advantages').offset().top
        }, 1000);
    });


    $('#menuBurger').click(function () {
        $('html, body').animate({
            scrollTop: $('.menu-title').offset().top
        }, 1000);
    });


    $('#orderBurger').click(function () {
        $('html, body').animate({
            scrollTop: $('.order').offset().top
        }, 1000);
    });


    let buttonTime = $('.list-time');
    let formTime = $('.form-time');
    let nameInput = $('#name');
    let timeInput = $('#time');
    let inputExtra = $('#inputExtra');
    let errorExtra = $('#errorExtra');
    let loader = $('.loader');


    //При нажатии кнопки "Выбора времени" выпадает форма с выбором времени и меняется стиль кнопки, и также убирается меню со временем и возвращается к исходному стилю при повторном нажатии
    timeInput.click(function (e) {
        formTime.toggle();
        $(this).toggleClass("button-add");
        errorExtra.fadeOut();
        e.preventDefault();
    });

    //При нажатии кнопки выбранного времени например "22:00" в выпадающем меню, значение подставляется в кнопку выбор времени, далее меню с выбором времени убирается
    buttonTime.click((e) => {
        timeInput.text(($(e.target).parents('.form-item').find('.list-time').text()));
        inputExtra.val($(e.target).parents('.form-item').find('.list-time').text());
        formTime.fadeOut();
        timeInput.toggleClass("button-add");
        e.preventDefault();
    });

// Валидация формы
    $('#submit').click(function () {
        let hasError = false;

        $('.error-input').hide();

        if (!nameInput.val()) {
            nameInput.next().show()
            nameInput.css('border-color', 'red');
            hasError = true;
        } else nameInput.css('border-color', 'rgb(255, 255, 255)');


        if (!phoneInput.val()) {
            phoneInput.next().show()
            phoneInput.css('border-color', 'red');
            hasError = true;
        } else phoneInput.css('border-color', 'rgb(255, 255, 255)');

        if (!inputExtra.val()) {
            timeInput.next().show()
            timeInput.css('border-color', 'red');
            hasError = true;
        } else timeInput.css('border-color', 'rgb(255, 255, 255)');


        if (!hasError) {
            loader.css('display', 'flex');
            $.ajax({
                method: "POST",
                url: "https://testologia.ru/checkout",
                data: {name: nameInput.val(), phone: phoneInput.val(), time: inputExtra.val()}
            })
                .done(function (message) {
                    loader.hide();
                    if (message.success) {
                        $('#orderTitle').fadeOut();
                        $('#orderText').fadeOut();
                        $('#orderTitleSuccess').fadeIn();
                        $('#form')[0].reset();
                        $('#form').fadeOut();
                        setTimeout(() => {
                            $('#orderTitle').fadeIn();
                            $('#orderText').fadeIn();
                            $('#orderTitleSuccess').fadeOut();
                            $('#form').fadeIn();
                            timeInput.text('Выберите время');
                        }, 3000);
                    } else {
                        alert("Возникла ошибка при оформлении брони, позвоните нам для уточнения информации!");
                        $('#form')[0].reset();
                        timeInput.text('Выберите время');
                    }
                });
        }
    });

});
