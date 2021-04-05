// form validation
function validateRegister() {
    const nameReg = /[\u0041-\u005A\u0061-\u007A\u0621-\u064A ]{3,}/
    const emailReq = /\S+@\S+\.\S+/
    const phoneReq = /[\+]\d{3}[\-]\d{10}/

	var username, contactInput, contactType;

    username = $('#name-input').val();
    selectVal = $('.custom-option.selected').data('value');
    contactInput = $('[id$=contact-input]').val()
    contactType = $('#contact-input').get(0).type
	if (username == null || username == '' || username ==undefined) {
	    $('#regisErr').addClass('error').text('Name required');
	    $('#name').focus();
	    return false;
    }
    else if (!nameReg.test(username)) {
        $('#regisErr').addClass('error').text('Please add a valid name');
	    $('#name').focus();
	    return false;
    }
    else if (selectVal == null || selectVal == '' || selectVal == undefined) {
        $('#regisErr').addClass('error').text('Please select a contact method');
	    $('.custom-select__trigger').focus();
	    return false;
    }
    else if (contactInput == null || contactInput == '' || contactInput ==undefined) {
        $('#regisErr').addClass('error').text('Please fill in the informatio');
	    $('.custom-select__trigger').focus();
	    return false;
    }
    else if (contactType == "email" && !emailReq.test(contactInput)) {
        $('#regisErr').addClass('error').text('Please add a valid email');
	    $('.custom-select__trigger').focus();
	    return false;
    }
    else if (contactType == "tel" && !phoneReq.test(contactInput)) {
        $('#regisErr').addClass('error').text('Please add a valid phone number');
	    $('.custom-select__trigger').focus();
	    return false;
    }
    else {
        $('.errorBlock').hide()
    }	
}

$(function () {
    $(".mobile-botton-header").click(function () {
        $(".model").show();
    })
    $(".header-buttom").click(function () {
        $(".model").show();
    })
    $(".Mid-button").click(function () {
        $(".model").show();
    })
    $(".mobile-botton-header2").click(function () {
        $(".model").show();
    })
    $(".container3-button").click(function () {
        $(".model").show();
    })
    $(".button2").click(function () {
        $(".model").show();
    })
    $(".btn").click(function () {
        $(".model").show();
    })
    $(".Mid-button2").click(function () {
        $(".model").show();
    })
    $(".mobile-botton-header22").click(function () {
        $(".model").show();
    })



 
    
   
    $(".close").click(function () {
        $(".model").hide();
        $('.thankyouPage').hide();
        $('#form').show();
        $(".contact-input-div").hide();
        $('#form')[0].reset();
    })
    $(".more_info").click(function() {
        $('html, body').animate({
            scrollTop: $(".section_2").offset().top
        }, 500);
    });
    $('#form').submit(async function (e) {
        e.preventDefault();
        var  url=window.location.search
        var totalUrl = url.slice(1);
        console.log(totalUrl)
        const nameValue = $("#name-input").val();
        const selected = $('.custom-option.selected').data('value');
        const contactInputValue = $('[id$=contact-input]').val()
        let object = {
            name: nameValue,
            contactMethod: `${selected} ${contactInputValue} - Clinic :  Clinica UAE - Ajman -${totalUrl}`,
        };
        let response = await fetch(
            "https://gwhb7l31r0.execute-api.eu-central-1.amazonaws.com/default/clinicsMailerFunction",
            {
                method: "POST",
                body: JSON.stringify(object),
            }
        );
        if (response.status == 200) {
            $('#form').hide();
            fbq("track", "Lead");
            $(".thankyouPage").show();
            $('#form')[0].reset();
        }
        // $('#form').hide();
        // $(".thankyouPage").show();
        // $('#form')[0].reset();
        // console.log($('#contact-input').get(0).type)
    })

    //select value check line 118
    var val;

    document.querySelector('.custom-select-wrapper').addEventListener('click', function() {
        this.querySelector('.custom-select').classList.toggle('open');
        if (val == 'email') {
            $(".contact-input-div").show()
            // $('[id$=contact-label]').text("البريد الاكتروني");
            $("#defult").remove(); 
            $('[id$=contact-input]').attr("placeholder", "Email");
            $('[id$=contact-input]').css('direction', 'rtl');
            $('[id$=contact-input]').css('text-align', 'start');
            $('[id$=contact-input]').val('');
            $('#contact-input').get(0).type = "email"
        }
        else if (val == 'whats/app') {
            $(".contact-input-div").show()
            // $('[id$=contact-label]').text("واتس اب");
            $("#defult").remove(); 
            $('[id$=contact-input]').attr("placeholder", "+971-xxxxxxxxxx");
            $('#contact-input').get(0).type = "tel"
            $('[id$=contact-input]').val('');
            $('[id$=contact-input]').css('direction', 'ltr');
            $('[id$=contact-input]').css('text-align', 'end');
        }
        else if (val == 'phone') {
            $(".contact-input-div").show()
            // $('[id$=contact-label]').text("رقم الهاتف");
            $("#defult").remove(); 
            $('[id$=contact-input]').attr("placeholder", "+971-xxxxxxxxxx");
            $('[id$=contact-input]').css('direction', 'ltr');
            $('[id$=contact-input]').css('text-align', 'end');
            $('#contact-input').get(0).type = "tel"
            $('[id$=contact-input]').val('');
        }
    })
    for (const option of document.querySelectorAll(".custom-option")) {
        option.addEventListener('click', function() {
            if (!this.classList.contains('selected')) {
                this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
                this.classList.add('selected');
                this.closest('.custom-select').querySelector('.custom-select__trigger span').textContent = this.textContent;
                this.closest('.custom-select').querySelector('.custom-select__trigger').style.opacity = "1";
                val = $('.custom-option.selected').data('value')
            }
        })
    }
    $(window).click(function(e) {if (e.target == $(".model")[0]) {
        $(".model").hide();
        $('#form')[0].reset();
        $(".contact-input-div").hide()
        $('[id$=contact-input]').val('');   
    }})
});